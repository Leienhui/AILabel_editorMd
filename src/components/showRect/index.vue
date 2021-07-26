<template>
  <div id="map"></div>
</template>
<script>
import AILabel from 'ailabel'
export default ({
  data () {
    return {
      Mode: 'drawRect',// 设置当前操作模式为‘drawRect’
      gFeatureLayer: '',
      gMap: '',
    }
  },
  methods: {
    setMode () {
      const currentMode = 'drawRect'
      const drawStyle = {
        strokeColor: '#0000FF',
        lineWeight: 2
      }
      this.Mode = currentMode
      this.gMap && this.gMap.setMode(currentMode, new AILabel.Style(drawStyle)) // 设置当前模式（模式名，样式）
    },

  },
  mounted () {
    this.gMap = new AILabel.Map('map', { zoom: 1080, cx: 0, cy: 0, zoomMax: 650 * 10, zoomMin: 650 / 10 })
    this.gImageLayer = new AILabel.Layer.Image('img', require('../../assets/word.png'), { w: 714, h: 669 }, { zIndex: 1 })
    this.gMap.addLayer(this.gImageLayer)
    this.gFeatureLayer = new AILabel.Layer.Feature('featureLayer', {
      zIndex: 2,
      transparent: true
    });
    this.gMap.addLayer(this.gFeatureLayer)
    // 矢量要素实例\添加
    const fea = new AILabel.Feature.Polygon('id', [{
      x: 10,
      y: 10
    },
    {
      x: 50,
      y: 10
    },
    {
      x: 40,
      y: 50
    },
    {
      x: 20,
      y: 60
    },
    {
      x: 10,
      y: 10
    }
    ], {
      name: '中国'
    }, this.gFetureStyle);
    this.gFeatureLayer.addFeature(fea);

    // 矢量要素实例\添加
    const fea1 = new AILabel.Feature.Polygon('id1', [{
      x: -488,
      y: 330
    }, {
      x: 427,
      y: 330
    }, {
      x: 427,
      y: 222
    }, {
      x: -488,
      y: 222
    }], {
      name: '中国'
    }, this.gFetureStyle);
    this.gFeatureLayer.addFeature(fea1);
    window.onresize = function () {
      this.gMap && this.gMap.resize();
    };
  },
})
</script>
<style scoped>
 #map {
  width: 500px;
  height: 400px;
  border: 1px solid red;
  position: relative;
  cursor: pointer;
}
</style>
