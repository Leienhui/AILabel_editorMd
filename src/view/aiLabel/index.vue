<template>
  <div>
    <button @click="isDrawFun">画图</button>
    <button @click="isShowFun">显示</button>
    <drawRect v-if="isdraw"></drawRect>
    <showRect v-else></showRect>
  </div>
</template>
<script>
import drawRect from '../../components/drawRect/index.vue'
import showRect from '../../components/showRect/index.vue'
export default ({
  data () {
    return {
      isdraw: true
    }
  },
  methods: {
    isShowFun () {
      this.isdraw = false
    },
    isDrawFun () {
      this.isdraw = true
    }

  },
  components: {
    drawRect,
    showRect
  }
})
</script>
