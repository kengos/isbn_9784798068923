import { SKHB_LAYERS } from "./constants";

export const mouseMoveEvent = (e, map) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: SKHB_LAYERS,
  });

  if (features.length > 0) {
    // 地物が存在する場合はカーソルをpointerに変更
    map.getCanvas().style.cursor = "pointer";
  } else {
    map.getCanvas().style.cursor = "";
  }
};
