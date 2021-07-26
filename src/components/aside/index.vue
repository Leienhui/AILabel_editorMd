<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <router-link to="/aiLabel">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">alLabel</span>
      </el-menu-item>
    </router-link>
    <router-link to="/myEditorMd">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">myEditorMd.md</span>
      </el-menu-item>
    </router-link>
    <router-link to="/editorMd">
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">editor.md</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
export default {

}
</script>

<style>

</style>