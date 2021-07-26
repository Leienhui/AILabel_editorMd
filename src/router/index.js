import Vue from 'vue'
import Router from 'vue-router'
import AiLabel from '../view/aiLabel'
import MyEditorMd from '../view/myEditorMd'
import EditorMd from '../view/editorMd'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/aiLabel',
      component: AiLabel
    },
    {
      path: '/myEditorMd',
      component: MyEditorMd
    },
    {
      path: '/editorMd',
      component: EditorMd
    }

  ]
})
