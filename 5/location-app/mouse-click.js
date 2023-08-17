import { Map, Popup, MapGeoJSONFeature } from "maplibre-gl";
import { SKHB_LAYERS } from "./constants";

/**
 *
 * @param {MapGeoJSONFeature} feature
 * @returns string
 */
const createHTML = (feature) => {
  return `\
  <div style="font-weight:900;font-size:1rem;">${feature.properties.name}</div>\
  <div>${feature.properties.address}</div>\
  <div>${feature.properties.remarks ?? ""}</div>\
  <div>\
    <span ${
      feature.properties.disaster1 ? "" : ' style="color:#ccc;"'
    }>洪水</span>\
    <span ${
      feature.properties.disaster2 ? "" : ' style="color:#ccc;"'
    }>崖崩れ/土石流/地滑り</span>\
    <span ${
      feature.properties.disaster3 ? "" : ' style="color:#ccc;"'
    }>高潮</span>\
    <span ${
      feature.properties.disaster4 ? "" : ' style="color:#ccc;"'
    }>地震</span>\
    <span ${
      feature.properties.disaster5 ? "" : ' style="color:#ccc;"'
    }>津波</span>\
    <span ${
      feature.properties.disaster6 ? "" : ' style="color:#ccc;"'
    }>大規模な火事</span>\
    <span ${
      feature.properties.disaster7 ? "" : ' style="color:#ccc;"'
    }>内水氾濫</span>\
    <span ${
      feature.properties.disaster8 ? "" : ' style="color:#ccc;"'
    }>火山現象</span>\
  </div>`;
};

/**
 *
 * @param {MapGeoJSONFeature} feature
 * @returns {Popup}
 */
const createPopup = (feature) => {
  return new Popup()
    .setLngLat(feature.geometry.coordinates) // [lon, lat]
    .setHTML(createHTML(feature));
};
/**
 *
 * @param {Event} e
 * @param {Map} map
 * @returns
 */
export const mouseClickEvent = (e, map) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: SKHB_LAYERS,
  });

  if (features.length === 0) return; // 地物がなければ処理を終了

  const feature = features[0];
  createPopup(feature).addTo(map);
};
