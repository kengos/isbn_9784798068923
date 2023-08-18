# コード写経

現場のプロがわかりやすく教える位置情報エンジニア養成講座
第 1 版第 2 刷
ISBN978-4-7980-6892-3

2023/08/18 時点の情報

## キーワード

### 基本用語

- 経緯度系(WGS84) EPSG:4236
- ウェブメルカトリ, EPSG:3857
- グリフ(glyph)

### lib 等

- leaflet
  - leaflet.markercluster
- maplibre-gl
- tippecanoe
- turf
  - `@turf/distance`
- QGIS
- OSRM, valhalla

### タイル等

- [地理院タイル](https://maps.gsi.go.jp/development/ichiran.html)
- [OpenStreetMap](http://openstreetmap.org/)
- [ハザードマップポータルサイト](https://disaportaldata.gsi.go.jp/hazardmap/)

## TODOs

- [ ] 4-2-10 地図上に大きな画像を表示する
  - QGIS でラスタータイル化をしたがうまく表示されない
- [ ] P.179 グリフ(glyph)の作り方が不明
- [ ] 5-2-3 避難所位置を表示する
  - tippecanoe で生成したベクトルタイルが半分しかない(東日本側?しかない)

## 誤植等

- p162: コード部分の表記がおかしい($1 が表示されている)
-
