import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-gl-opacity/dist/maplibre-gl-opacity.css";
import "./style.css";

import maplibregl from "maplibre-gl";
import OpacityControl from "maplibre-gl-opacity";
import { useGsiTerrainSource } from "maplibre-gl-gsi-terrain";
import { mouseClickEvent } from "./mouse-click";
import { mouseMoveEvent } from "./mouse-move";
import { trackUserLocation } from "./location";

const skhbUrl = new URL("./skhb/", import.meta.url);

const map = new maplibregl.Map({
  container: "map", // div要素のid
  zoom: 5, // 初期ズーム
  center: [138, 37], // 初期表示の中心
  minZoom: 5, // 最小ズーム
  maxZoom: 18, // 最大ズーム
  maxBounds: [122, 20, 154, 50], // 表示可能な範囲
  style: {
    version: 8,
    sources: {
      // 背景地図ソース
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        maxzoom: 19,
        tileSize: 256,
        attribution:
          '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
      skhb: {
        // 指定緊急避難場所ベクトルタイル
        type: "vector",
        tiles: [`${skhbUrl.href}/{z}/{x}/{y}.pbf`],
        minzoom: 5,
        maxzoom: 8,
        attribution:
          '<a href="https://www.gsi.go.jp/bousaichiri/hinanbasho.html" target="_blank">国土地理院:指定緊急避難場所データ</a>',
      },
      route: {
        // 現在位置と最寄りの避難施設をつなぐライン
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      },
      hazard_flood: {
        // 洪水浸水想定区域
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportaldata.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_hightide: {
        // 高潮浸水想定区域
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportaldata.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_tsunami: {
        // 津波浸水想定
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_data/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportaldata.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_doseki: {
        // 土砂災害警戒区域(土石流) ※全国
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportaldata.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_kyukeisha: {
        // 土砂災害警戒区域(急傾斜地の崩壊) ※全国
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportaldata.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
      hazard_jisuberi: {
        // 土砂災害警戒区域(地すべり) ※全国
        type: "raster",
        tiles: [
          "https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki/{z}/{x}/{y}.png",
        ],
        minzoom: 2,
        maxzoom: 17,
        tileSize: 256,
        attribution:
          '<a href="https://disaportaldata.gsi.go.jp/hazardmap/copyright/opendata.html">ハザードマップポータルサイト</a>',
      },
    },
    layers: [
      {
        id: "osm-layer",
        source: "osm",
        type: "raster",
      },
      {
        // 現在位置と最寄り施設のライン
        id: "route-layer",
        source: "route",
        type: "line",
        paint: {
          "line-color": "#33aaff",
          "line-width": 4,
        },
      },
      {
        id: "skhb-1-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": [
            // ズームレベルに応じた円の大きさ
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            2,
            14,
            6,
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "disaster1"],
        layout: { visibility: "none" },
      },
      {
        id: "skhb-2-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": [
            // ズームレベルに応じた円の大きさ
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            2,
            14,
            6,
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "disaster2"],
        layout: { visibility: "none" },
      },
      {
        id: "skhb-3-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": [
            // ズームレベルに応じた円の大きさ
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            2,
            14,
            6,
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "disaster3"],
        layout: { visibility: "none" },
      },
      {
        id: "skhb-4-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": [
            // ズームレベルに応じた円の大きさ
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            2,
            14,
            6,
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "disaster4"],
        layout: { visibility: "none" },
      },
      {
        id: "skhb-5-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": [
            // ズームレベルに応じた円の大きさ
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            2,
            14,
            6,
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "disaster5"],
      },
      {
        id: "skhb-6-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": [
            // ズームレベルに応じた円の大きさ
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            2,
            14,
            6,
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "disaster6"],
        layout: { visibility: "none" },
      },
      {
        id: "skhb-7-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": [
            // ズームレベルに応じた円の大きさ
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            2,
            14,
            6,
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "disaster7"],
        layout: { visibility: "none" },
      },
      {
        id: "skhb-8-layer",
        source: "skhb",
        "source-layer": "skhb",
        type: "circle",
        paint: {
          "circle-color": "#6666cc",
          "circle-radius": [
            // ズームレベルに応じた円の大きさ
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            2,
            14,
            6,
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
        filter: ["get", "disaster8"],
        layout: { visibility: "none" },
      },
      {
        id: "hazard_flood-layer",
        source: "hazard_flood",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
        layout: {
          visibility: "none",
        },
      },
      {
        id: "hazard_hightide-layer",
        source: "hazard_hightide",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
        layout: {
          visibility: "none",
        },
      },
      {
        id: "hazard_tsunami-layer",
        source: "hazard_tsunami",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
        layout: {
          visibility: "none",
        },
      },
      {
        id: "hazard_doseki-layer",
        source: "hazard_doseki",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
        layout: {
          visibility: "none",
        },
      },
      {
        id: "hazard_kyukeisha-layer",
        source: "hazard_kyukeisha",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
        layout: {
          visibility: "none",
        },
      },
      {
        id: "hazard_jisuberi-layer",
        source: "hazard_jisuberi",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
        layout: {
          visibility: "none",
        },
      },
    ],
  },
});

map.on("load", () => {
  // 背景地図・重ねるタイル地図のコントロール
  const opacity = new OpacityControl({
    baseLayers: {
      "hazard_flood-layer": "洪水浸水想定区域", // layer-id: レイヤー名
      "hazard_hightide-layer": "高潮浸水想定区域",
      "hazard_tsunami-layer": "津波浸水想定区域",
      "hazard_doseki-layer": "土石流警戒区域",
      "hazard_kyukeisha-layer": "急傾斜警戒区域",
      "hazard_jisuberi-layer": "地滑り警戒区域",
    },
  });
  map.addControl(opacity, "top-left"); // 第二引数で場所を指定できる
  const opacitySkhb = new OpacityControl({
    baseLayers: {
      "skhb-1-layer": "洪水",
      "skhb-2-layer": "崖崩れ/土石流/地滑り",
      "skhb-3-layer": "高潮",
      "skhb-4-layer": "地震",
      "skhb-5-layer": "津波",
      "skhb-6-layer": "大規模な火事",
      "skhb-7-layer": "内水氾濫",
      "skhb-8-layer": "火山現象",
    },
  });
  map.addControl(opacitySkhb, "top-right"); // 第二引数で場所を指定できる
  // NavigationControl
  let nc = new maplibregl.NavigationControl();
  map.addControl(nc, "top-left");

  map.on("click", (e) => mouseClickEvent(e, map));
  map.on("mousemove", (e) => mouseMoveEvent(e, map));

  trackUserLocation(map);
  /**
   * P.236
   */
  // 地形データ生成(地理院標高タイル)
  const gsiTerrainSource = useGsiTerrainSource(maplibregl.addProtocol);
  // 地形データ追加(type=raster-dem)
  map.addSource("terrain", gsiTerrainSource);
  map.addLayer(
    {
      id: "hillshade",
      source: "terrain", // type="raster-dem"のsourceを指定
      type: "hillshade", // 陰影図レイヤー
      paint: {
        "hillshade-illumination-anchor": "map", // 陰影の方向の基準
        "hillshade-exaggeration": 0.2, // 陰影の強さ
      },
    },
    "hazard_jisuberi-layer" // どのレイヤーの手前に追加するかIDで指定
  );
  // 3D地形
  map.addControl(
    new maplibregl.TerrainControl({
      source: "terrain", // type="raster-dom"のsourceのID
      exaggeration: 1, // 標高を強調する倍率
    })
  );
});
