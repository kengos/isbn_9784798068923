import "./style.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

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
        id: "hazard_flood-layer",
        source: "hazard_flood",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
      },
      {
        id: "hazard_hightide-layer",
        source: "hazard_hightide",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
      },
      {
        id: "hazard_tsunami-layer",
        source: "hazard_tsunami",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
      },
      {
        id: "hazard_doseki-layer",
        source: "hazard_doseki",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
      },
      {
        id: "hazard_kyukeisha-layer",
        source: "hazard_kyukeisha",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
      },
      {
        id: "hazard_jisuberi-layer",
        source: "hazard_jisuberi",
        type: "raster",
        paint: {
          "raster-opacity": 0.7,
        },
      },
    ],
  },
});
