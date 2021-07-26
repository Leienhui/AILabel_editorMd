# vue_test
* editor.md的使用笔记来自     
  >博主：刘万林「liuwanlin」
## vue中使用editor.Md步骤
### 下载编辑器
* [github download](https://github.com/pandao/editor.md.git),下载该项目放入 `./static` 目录中
### 使用
 >把该编辑器继续用 Vue 封装了个组件
### 组件封装代码
* >组件：myEditor/index.vue文件
```
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
```
* 因为编辑器自带的代码高亮太简洁了，所以自己搜索下载了代码高亮 css 文件。放入到了 `./static/editor.md/css/google_code_prettify_themes/`目录中。代码高亮 css 库可以搜索 `google code prettify themes` 关键字查找。例如：这个感觉够用了。也可以自己去修改 css 配置相应的高亮规则。
* >配置文件：config/editor.md.js
```
const defaultConfig = {
  placeholder: '规范版本',
  width: "100%",
  height: "90vh",
  // 注意：这里的路径一定要是下载的那个项目的lib
  path: '/static/editor.md-master/lib/',
  // theme: "dark",
  // previewTheme: "dark",
  // editorTheme: "pastel-on-dark",
  markdown: "默认填充内容", // 默认填充内容
  lineWrapping: true, // 编辑框不换行
  codeFold: true, // 代码折叠
  syncScrolling: true,
  saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
  searchReplace: true,
  watch: true, // 实时预览
  // htmlDecode: "style,script,iframe|on*",      // 开启 HTML 标签解析，为了安全性，默认不开启
  toolbar: true, //工具栏
  previewCodeHighlight: true, // 预览 HTML 的代码块高亮，默认开启
  emoji: true,
  taskList: true,
  tocm: true, // Using [TOCM]
  tex: true, // 开启科学公式TeX语言支持，默认关闭
  flowChart: true, // 开启流程图支持，默认关闭
  sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
  // dialogLockScreen: false,      // 设置弹出层对话框不锁屏，全局通用，默认为true
  // dialogShowMask: false,        // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
  // dialogDraggable: false,       // 设置弹出层对话框不可拖动，全局通用，默认为true
  // dialogMaskOpacity: 0.4,       // 设置透明遮罩层的透明度，全局通用，默认值为0.1
  // dialogMaskBgColor: "#000",    // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
  // imageUpload: false,
  // imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
  // imageUploadURL: "./php/upload.php",
  // onload: function() {
  //    // this.fullscreen();
  //    // this.unwatch();
  //    // this.watch().fullscreen();
  //    // this.setMarkdown("#PHP");
  //    // this.width("100%");
  //    // this.height(480);
  //    // this.resize("100%", 640);
  // },
};
// const codeThemes = [{
//     label: 'monokai',
//     value: 'monokai.min.css',
//   },
//   {
//     label: 'atelier-cave-dark',
//     value: 'atelier-cave-dark.min.css',
//   },
//   {
//     label: 'atelier-cave-light',
//     value: 'atelier-cave-light.min.css',
//   },
//   {
//     label: 'atelier-dune-dark',
//     value: 'atelier-dune-dark.min.css',
//   },
//   {
//     label: 'atelier-dune-light',
//     value: 'atelier-dune-light.min.css',
//   },
//   {
//     label: 'atelier-estuary-dark',
//     value: 'atelier-estuary-dark.min.css',
//   },
//   {
//     label: 'atelier-estuary-light',
//     value: 'atelier-estuary-light.min.css',
//   },
//   {
//     label: 'atelier-forest-dark',
//     value: 'atelier-forest-dark.min.css',
//   },
//   {
//     label: 'atelier-forest-light',
//     value: 'atelier-forest-light.min.css',
//   },
//   {
//     label: 'atelier-heath-dark',
//     value: 'atelier-heath-dark.min.css',
//   },
//   {
//     label: 'atelier-heath-light',
//     value: 'atelier-heath-light.min.css',
//   },
//   {
//     label: 'atelier-lakeside-dark',
//     value: 'atelier-lakeside-dark.min.css',
//   },
//   {
//     label: 'atelier-lakeside-light',
//     value: 'atelier-lakeside-light.min.css',
//   },
//   {
//     label: 'atelier-plateau-dark',
//     value: 'atelier-plateau-dark.min.css',
//   },
//   {
//     label: 'atelier-plateau-light',
//     value: 'atelier-plateau-light.min.css',
//   },
//   {
//     label: 'atelier-savanna-dark',
//     value: 'atelier-savanna-dark.min.css',
//   },
//   {
//     label: 'atelier-savanna-light',
//     value: 'atelier-savanna-light.min.css',
//   },
//   {
//     label: 'atelier-seaside-dark',
//     value: 'atelier-seaside-dark.min.css',
//   },
//   {
//     label: 'atelier-seaside-light',
//     value: 'atelier-seaside-light.min.css',
//   },
//   {
//     label: 'atelier-sulphurpool-dark',
//     value: 'atelier-sulphurpool-dark.min.css',
//   },
//   {
//     label: 'atelier-sulphurpool-light',
//     value: 'atelier-sulphurpool-light.min.css',
//   },
//   {
//     label: 'github',
//     value: 'github.min.css',
//   },
//   {
//     label: 'github-v2',
//     value: 'github-v2.min.css',
//   },
//   {
//     label: 'hemisu-dark',
//     value: 'hemisu-dark.min.css',
//   },
//   {
//     label: 'hemisu-light',
//     value: 'hemisu-light.min.css',
//   },
//   {
//     label: 'tomorrow',
//     value: 'tomorrow.min.css',
//   },
//   {
//     label: 'tomorrow-night',
//     value: 'tomorrow-night.min.css',
//   },
//   {
//     label: 'tomorrow-night-blue',
//     value: 'tomorrow-night-blue.min.css',
//   },
//   {
//     label: 'tomorrow-night-bright',
//     value: 'tomorrow-night-bright.min.css',
//   },
//   {
//     label: 'tomorrow-night-eighties',
//     value: 'tomorrow-night-eighties.min.css',
//   },
//   {
//     label: 'tranquil-heart',
//     value: 'tranquil-heart.min.css',
//   },
//   {
//     label: 'vibrant-ink',
//     value: 'vibrant-ink.min.css',
//   },
// ];
export {
  defaultConfig,
  // codeThemes,
};

```
* >`path: '/static/editor.md-master/lib/'` 注意：这里的路径一定要是下载的那个项目的lib,否则会报错
