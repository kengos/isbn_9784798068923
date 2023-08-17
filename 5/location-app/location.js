import distance from "@turf/distance";
import { GeolocateControl, Map, LayerSpecification } from "maplibre-gl";
import { SKHB_LAYERS } from "./constants";

/**
 *
 * @param {Map} map
 */
const getCurrentSkhbLayerFilter = (map) => {
  const style = map.getStyle();
  const skhbLayers = style.layers.filter((layer) =>
    SKHB_LAYERS.includes(layer.id)
  );
  const visibleSkhbLayers = skhbLayers.filter(
    (layer) => layer.layout.visibility === "visible"
  );

  if (visibleSkhbLayers.length === 0) {
    return null;
  }
  return visibleSkhbLayers[0].filter;
};

/**
 *
 * @param {Map} map
 * @param {LayerSpecification} filter
 * @param {*} userLocation
 */
const getNearestFeature = (features, userLocation) => {
  return features.reduce((minDistFeature, feature) => {
    const dist = distance(userLocation, feature.geometry.coordinates);

    if (minDistFeature === null || minDistFeature.properties.dist > dist) {
      return {
        ...feature,
        properties: {
          ...feature.properties,
          dist,
        },
      };
    } else {
      return minDistFeature;
    }
  }, null);
};

/**
 *
 * @param {Map} map
 * @returns
 */
const createRouteFeature = (map, userLocation) => {
  const filter = getCurrentSkhbLayerFilter(map);
  if (!filter) {
    return null;
  }

  const features = map.querySourceFeatures("skhb", {
    sourceLayer: "skhb",
    filter: filter,
  });

  if (features.length === 0) {
    return null;
  }

  const nearestFeature = getNearestFeature(features, userLocation);
  return {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [userLocation, nearestFeature._geometry.coordinates],
    },
  };
};

/**
 *
 * @param {Map} map
 */
export const trackUserLocation = (map) => {
  let userLocation = null;
  const geolocationControl = new GeolocateControl({
    trackUserLocation: true,
  });
  geolocationControl.on("geolocate", (e) => {
    userLocation = [e.coords.longitude, e.coords.latitude];
  });

  map.addControl(geolocationControl, "bottom-right");
  map.on("render", () => {
    if (geolocationControl._watchState === "OFF") userLocation = null;

    // ズームが一定値以下または現在地が計算されていない場合はラインを消去する
    if (map.getZoom() < 7 || userLocation === null) {
      map.getSource("route").setData({
        type: "FeatureCollection",
        features: [],
      });
      return;
    }

    const routeFeature = createRouteFeature(map, userLocation);
    if (routeFeature === null) {
      return;
    }
    map.getSource("route").setData({
      type: "FeatureCollection",
      features: [routeFeature],
    });
  });
};
