<template>
  <div class="markdown-editor-box">
    <!-- 这里不依赖index.html的css文件 -->
    <link
      rel="stylesheet"
      href="/static/editor.md-master/css/editormd.min.css"
    />
    <!-- <link
      rel="stylesheet"
      :href="'/static/editor.md/css/google_code_prettify_themes/' + codeTheme"
    /> -->
    <div :id="editorId"></div>
  </div>
</template>
<script>
import scriptjs from 'scriptjs';
import { defaultConfig } from '../../config/editor.md';
// import { defaultConfig, codeThemes } from '../../config/editor.md';
export default {
  props: {
    editorId: {
      'type': String,
      'default': 'markdown-editor',
    },
    onchange: { // 内容改变时回调，返回（html, markdown, text）
      type: Function
    },
    config: { // 编辑器配置
      type: Object
    },
    // codeTheme: { // 代码高亮主题
    //   'type': String,
    //   'default': 'vibrant-ink.min.css'
    // },
    initData: {
      'type': String
    },
    initDataDelay: {
      'type': Number, // 延迟初始化数据时间，单位毫秒
      'default': 0
    }
  },
  data: function () {
    return {
      editor: null,
      // codeThemes,
      editorLoaded: false,
    };
  },
  methods: {
    fetchScript: function (url) {
      return new Promise((resolve) => {
        scriptjs(url, () => {
          resolve();
        });
      });
    },
    getConfig: function () {
      return { ...defaultConfig, ...this.config };
    },
    initEditor: function () {
      (async () => {
        // 这里不依赖index.html的js文件
        await this.fetchScript('/static/editor.md-master/examples/js/jquery.min.js');
        await this.fetchScript('/static/editor.md-master/editormd.js');
        this.$nextTick(() => {
          let editor = window.editormd(this.editorId, this.getConfig());
          editor.on('load', () => {
            setTimeout(() => { // hack bug: 一个页面多个编辑器只能初始化其中一个数据问题
              this.editorLoaded = true;
              this.initData && editor.setMarkdown(this.initData);
            }, this.initDataDelay);
          });
          this.onchange && editor.on('change', () => {
            let html = editor.getPreviewedHTML();
            this.onchange({
              markdown: editor.getMarkdown(),
              html: html,
              text: window.$(html).text()
            });
          });
          this.editor = editor;
        });
      })();
    }
  },
  mounted: function () {
    this.initEditor();
  },
  watch: {
    'initData': function (newVal) {
      if (newVal) {
        this.editorLoaded && this.editor.setMarkdown(newVal);
      }
    }
  }
}
</script>