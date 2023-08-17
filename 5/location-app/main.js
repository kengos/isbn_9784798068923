import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-gl-opacity/dist/maplibre-gl-opacity.css";
import "./style.css";

import maplibregl from "maplibre-gl";
import OpacityControl from "maplibre-gl-opacity";

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
        id: "skhb-layer",
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
  // NavigationControl
  let nc = new maplibregl.NavigationControl();
  map.addControl(nc, "top-left");
});
