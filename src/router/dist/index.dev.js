"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _aiLabel = _interopRequireDefault(require("../view/aiLabel"));

var _myEditorMd = _interopRequireDefault(require("../view/myEditorMd"));

var _editorMd = _interopRequireDefault(require("../view/editorMd"));

var _interViewTest = _interopRequireDefault(require("../view/interViewTest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var _default = new _vueRouter["default"]({
  routes: [{
    path: '/aiLabel',
    component: _aiLabel["default"]
  }, {
    path: '/myEditorMd',
    component: _myEditorMd["default"]
  }, {
    path: '/editorMd',
    component: _editorMd["default"]
  }, {
    path: '/interview',
    component: _interViewTest["default"]
  }]
});

exports["default"] = _default;
//# sourceMappingURL=index.dev.js.map
