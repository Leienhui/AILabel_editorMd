<template>
  <el-container>
    <el-header>欢迎使用vue测试系统</el-header>
    <el-container>
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import Aside from './components/aside'
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    Aside,
  }

}
</script>

<style lang="less">
a {
  text-decoration: none;
}
.el-container {
  height: 100vh;
  .el-header {
    background: #eff;
    line-height: 60px;
    font-size: 25px;
  }
  .el-aside {
    .el-menu {
      border: none;
    }
    border-right: 1px solid #ddd;
  }
  .el-main {
    background: #fff;
  }
}
</style>>

</style>