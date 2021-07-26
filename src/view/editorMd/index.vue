<template>
  <div>
    <div id="layout">
      <div id="blog_editormd" style="margin-top: 5px">
        <textarea style="display: none"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogEditor: {}
    }
  },
  methods: {

  },
  created () {
    var _this = this;
    _this.$nextTick(() => {
      const blogEditor = editormd("blog_editormd", {
        placeholder: '易懂易学版本',
        width: "100%",
        height: "880",
        syncScrolling: "single",
        emoji: true,
        path: '/static/editor.md-master/lib/',
        //pluginPath:'/plugins',
        saveHTMLToTextarea: true,
        tocm: true,
        tex: true,
        flowChart: true,
        imageUpload: true,
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL: "",
        //crossDomainUpload : true
        // previewTheme: "dark"

        /**设置主题颜色*/
        /* editorTheme: "pastel-on-dark",
         theme: "gray",
         previewTheme: "dark"*/
      });
      //将刚刚定义的对象 存到vue中，用的时候再取出来
      _this.blogEditor = blogEditor;
    });
  }
}
  </script>
