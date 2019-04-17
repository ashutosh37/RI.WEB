webpackHotUpdate(0,{

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Footer = __webpack_require__(/*! ./Footer */ \"./src/components/Footer.jsx\");\n\nvar _Footer2 = _interopRequireDefault(_Footer);\n\nvar _setname = __webpack_require__(/*! ../containers/setname */ \"./src/containers/setname.jsx\");\n\nvar _setname2 = _interopRequireDefault(_setname);\n\nvar _AddTodo = __webpack_require__(/*! ../containers/AddTodo */ \"./src/containers/AddTodo.jsx\");\n\nvar _AddTodo2 = _interopRequireDefault(_AddTodo);\n\nvar _VisibleTodoList = __webpack_require__(/*! ../containers/VisibleTodoList */ \"./src/containers/VisibleTodoList.jsx\");\n\nvar _VisibleTodoList2 = _interopRequireDefault(_VisibleTodoList);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar App = function App() {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(_AddTodo2.default, null),\n    _react2.default.createElement(_VisibleTodoList2.default, null),\n    _react2.default.createElement(_Footer2.default, null),\n    _react2.default.createElement(_setname2.default, null)\n  );\n};\n\nexports.default = App;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BcHAuanN4PzYwZWQiXSwibmFtZXMiOlsiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU07QUFBQSxTQUNWO0FBQUE7QUFBQTtBQUNFLGtDQUFDLGlCQUFELE9BREY7QUFFRSxrQ0FBQyx5QkFBRCxPQUZGO0FBR0Usa0NBQUMsZ0JBQUQsT0FIRjtBQUlFLGtDQUFDLGlCQUFEO0FBSkYsR0FEVTtBQUFBLENBQVo7O2tCQVNlQSxHIiwiZmlsZSI6Ii4vc3JjL2NvbXBvbmVudHMvQXBwLmpzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuL0Zvb3RlcidcclxuaW1wb3J0IFNldE5hbWUgZnJvbSAnLi4vY29udGFpbmVycy9zZXRuYW1lJ1xyXG5pbXBvcnQgQWRkVG9kbyBmcm9tICcuLi9jb250YWluZXJzL0FkZFRvZG8nXHJcbmltcG9ydCBWaXNpYmxlVG9kb0xpc3QgZnJvbSAnLi4vY29udGFpbmVycy9WaXNpYmxlVG9kb0xpc3QnXHJcblxyXG5jb25zdCBBcHAgPSAoKSA9PiAoXHJcbiAgPGRpdj5cclxuICAgIDxBZGRUb2RvIC8+XHJcbiAgICA8VmlzaWJsZVRvZG9MaXN0IC8+XHJcbiAgICA8Rm9vdGVyIC8+XHJcbiAgICA8U2V0TmFtZS8+XHJcbiAgPC9kaXY+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0FwcC5qc3giXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/App.jsx\n");

/***/ }),

/***/ "./src/containers/setname.jsx":
/*!************************************!*\
  !*** ./src/containers/setname.jsx ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _SetName = __webpack_require__(/*! ../components/SetName */ \"./src/components/SetName.jsx\");\n\nvar _SetName2 = _interopRequireDefault(_SetName);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    todos: state.todos\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, null)(_SetName2.default);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9zZXRuYW1lLmpzeD8xYTM2Il0sIm5hbWVzIjpbIm1hcFN0YXRlVG9Qcm9wcyIsInRvZG9zIiwic3RhdGUiLCJTZXROYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBQ0EsSUFBTUEsa0JBQWtCLFNBQWxCQSxlQUFrQjtBQUFBLFNBQVU7QUFDOUJDLFdBQU9DLE1BQU1EO0FBRGlCLEdBQVY7QUFBQSxDQUF4Qjs7a0JBSWlCLHlCQUNiRCxlQURhLEVBRWIsSUFGYSxFQUdiRyxpQkFIYSxDIiwiZmlsZSI6Ii4vc3JjL2NvbnRhaW5lcnMvc2V0bmFtZS5qc3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcbmltcG9ydCBTZXROYW1lIGZyb20gJy4uL2NvbXBvbmVudHMvU2V0TmFtZSdcclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKHtcclxuICAgIHRvZG9zOiBzdGF0ZS50b2Rvc1xyXG4gIH0pXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBudWxsXHJcbiAgKShTZXROYW1lKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250YWluZXJzL3NldG5hbWUuanN4Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/containers/setname.jsx\n");

/***/ })

})