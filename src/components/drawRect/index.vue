<template>
  <div class="wrapper">
    <div id="map"></div>
    <br />
    <br />
    <el-button id="drawRect" type="info" @click="setMode('drawRect')"
      >矩形标注</el-button
    >
    <br />
    <br />
    <br />
    <el-button
      id="drawMask"
      type="info"
      @click="setMode('drawMask', '#FF0000', 5)"
      >红线</el-button
    >
    <br />
    <br />
    <br />
    <el-button id="clearMask" type="info" @click="setMode('clearMask')"
      >檫除</el-button
    >
    <!-- <router-link to="/show-rect">去rectshow</router-link> -->
  </div>
</template>

<script>
import AILabel from 'ailabel'
export default {
  components: {},
  props: {},
  data () {
    return {
      //   myPoints: { 'p1': [{ x: -488, y: 330 }, { x: 427, y: 330 }, { x: 427, y: 222 }, { x: -488, y: 222 }] },
      gMaskLayer: '',
      Mode: 'pan',
      gFeatureLayer: '',
      gMap: '',
      mappingStyles: {
        drawRect: {
          drawStyle: { strokeColor: '#FF0000', opacity: 1, lineWeight: 1 },
          featureStyle: { strokeColor: '#00FF00', fillColor: '#0000FF', opacity: 0.3, lineWeight: 1 }
        },
        drawMask: {
          drawStyle: { strokeColor: '#FF0000', fillColor: '#0000FF', opacity: 1, lineWeight: 1 },
          featureStyle: {}
        },
        clearMask: {
          drawStyle: { lineWeight: 10 },
          featureStyle: {}
        }
      }
    }
  },
  watch: {
  },
  updated () {
  },
  computed: {},
  methods: {
    setMode (mode, color, size) {
      const preCurrentMode = mode.indexOf('drawMask') === 0 ? 'drawMask' : (mode.indexOf('Roi') !== -1 ? 'drawRoi' : mode)
      const currentMode = preCurrentMode.indexOf('drawPolyline') === 0 ? 'drawPolyline' : preCurrentMode
      const drawStyle = this.mappingStyles[currentMode].drawStyle
      if (color) {
        if (currentMode === 'drawPolyline') {
          drawStyle.strokeColor = color
        } else {
          drawStyle.fillColor = color
        }
      }
      if (size) {
        drawStyle.lineWeight = size
      }
      this.Mode = currentMode
      this.gMap && this.gMap.setMode(currentMode, new AILabel.Style(drawStyle)) // 设置当前模式（模式名，样式）
      console.log(this.gMap.getMode())
    },
    getMapLayout () {
      this.gMap.events.on('mouseDown', xy => { console.log(xy) })
    }
  },
  created () { },
  mounted () {
    this.gMap = new AILabel.Map('map', { zoom: 1080, cx: 0, cy: 0, zoomMax: 650 * 10, zoomMin: 650 / 10 })
    this.gImageLayer = new AILabel.Layer.Image('img', require('../../assets/word.png'), { w: 714, h: 669 }, { zIndex: 1 })
    this.gMap.addLayer(this.gImageLayer)
    this.gFeatureLayer = new AILabel.Layer.Feature('featureLayer', { zIndex: 3, transparent: false })
    this.gMap.addLayer(this.gFeatureLayer)
    this.gMaskLayer = new AILabel.Layer.Mask('maskLayer', { zIndex: 2, opacity: 0.8 })
    this.gMap.addLayer(this.gMaskLayer)
    // 绘制完成时
    this.gMap.events.on('geometryDrawDone', (type, points) => {
      // 生成元素唯一标志（时间戳）
      const timestamp = new Date().getTime()
      const cMode = this.gMap.getMode()
      const featureStyle = this.mappingStyles[cMode].featureStyle
      // 元素添加展示
      if (type === 'rect') {
        const fea = new AILabel.Feature.Rect(`feature-${timestamp}`, points, {
          name: '中国'
        }, featureStyle, { activeColor: '#000', cross: true })
        this.gFeatureLayer.addFeature(fea)
      } else if (type === 'mask') {
        // 包含绘制&涂抹事件
        const maskAction = points
        console.log('--maskAction--', maskAction)
        maskAction.name = '标签A'
        this.gMaskLayer.addMaskAction(maskAction)
      }
    })
  }
}
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
