◯ A16-15_00_DID.geojson

[国土数値情報 - 人口集中地区データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-A16-v2_3.html)

◯ N02-22_Station.geojson

[国土数値情報 - 鉄道データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-v3_0.html)

◯ p29-13_01.geojson

[国土数値情報 - 学校データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-P29-v2_0.html)

◯ N03-23_230101

[国土数値情報 - 行政区域データ](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-v3_1.html) - N03-20230101_GML.zip

`tippecanoe -e tiles data/N03-23_230101.geojson -l admin -ab -z8 -pC -P` でタイル化したもの

◯ mtfuji.jpg
◯ lakebiwa.jpg

◯ 10m-natural-earth-2

https://www.naturalearthdata.com/downloads/10m-raster-data/10m-natural-earth-2/

ラスタータイル化(QGIS -> ラスターツール -> XYZ タイルを生成)

```json
{
  'BACKGROUND_COLOR': QColor(0, 0, 0, 0),
  'DPI': 96,
  'EXTENT': '-180.000000000,180.000000000,-90.000000000,90.000000000 [EPSG:3857]',
  'HTML_ATTRIBUTION': '',
  'HTML_OSM': False,
  'HTML_TITLE': '',
  'METATILESIZE': 4,
  'QUALITY': 75,
  'TILE_FORMAT': 0,
  'TILE_HEIGHT': 256,
  'TILE_WIDTH': 256,
  'TMS_CONVENTION': False,
  'ZOOM_MAX': 5,
  'ZOOM_MIN': 0
}
```
