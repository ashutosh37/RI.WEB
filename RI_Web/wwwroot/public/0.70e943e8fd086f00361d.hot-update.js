webpackHotUpdate(0,{

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Footer = __webpack_require__(/*! ./Footer */ \"./src/components/Footer.jsx\");\n\nvar _Footer2 = _interopRequireDefault(_Footer);\n\nvar _setname = __webpack_require__(/*! ./setname */ \"./src/components/setname.jsx\");\n\nvar _setname2 = _interopRequireDefault(_setname);\n\nvar _AddTodo = __webpack_require__(/*! ../containers/AddTodo */ \"./src/containers/AddTodo.jsx\");\n\nvar _AddTodo2 = _interopRequireDefault(_AddTodo);\n\nvar _VisibleTodoList = __webpack_require__(/*! ../containers/VisibleTodoList */ \"./src/containers/VisibleTodoList.jsx\");\n\nvar _VisibleTodoList2 = _interopRequireDefault(_VisibleTodoList);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar App = function App() {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(_AddTodo2.default, null),\n    _react2.default.createElement(_VisibleTodoList2.default, null),\n    _react2.default.createElement(_Footer2.default, null),\n    _react2.default.createElement(_setname2.default, null)\n  );\n};\n\nexports.default = App;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BcHAuanN4PzYwZWQiXSwibmFtZXMiOlsiQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU07QUFBQSxTQUNWO0FBQUE7QUFBQTtBQUNFLGtDQUFDLGlCQUFELE9BREY7QUFFRSxrQ0FBQyx5QkFBRCxPQUZGO0FBR0Usa0NBQUMsZ0JBQUQsT0FIRjtBQUlFLGtDQUFDLGlCQUFEO0FBSkYsR0FEVTtBQUFBLENBQVo7O2tCQVNlQSxHIiwiZmlsZSI6Ii4vc3JjL2NvbXBvbmVudHMvQXBwLmpzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuL0Zvb3RlcidcclxuaW1wb3J0IFNldE5hbWUgZnJvbSAnLi9zZXRuYW1lJ1xyXG5pbXBvcnQgQWRkVG9kbyBmcm9tICcuLi9jb250YWluZXJzL0FkZFRvZG8nXHJcbmltcG9ydCBWaXNpYmxlVG9kb0xpc3QgZnJvbSAnLi4vY29udGFpbmVycy9WaXNpYmxlVG9kb0xpc3QnXHJcblxyXG5jb25zdCBBcHAgPSAoKSA9PiAoXHJcbiAgPGRpdj5cclxuICAgIDxBZGRUb2RvIC8+XHJcbiAgICA8VmlzaWJsZVRvZG9MaXN0IC8+XHJcbiAgICA8Rm9vdGVyIC8+XHJcbiAgICA8U2V0TmFtZS8+XHJcbiAgPC9kaXY+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0FwcC5qc3giXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/App.jsx\n");

/***/ }),

/***/ "./src/components/SetName.jsx":
false,

/***/ "./src/components/setname.jsx":
/*!************************************!*\
  !*** ./src/components/setname.jsx ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar SetName = function SetName(_ref) {\n  var text = _ref.text;\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      'span',\n      null,\n      'Show: '\n    ),\n    _react2.default.createElement(\n      'h1',\n      null,\n      text\n    )\n  );\n};\n\nexports.default = SetName;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zZXRuYW1lLmpzeD9mZjRkIl0sIm5hbWVzIjpbIlNldE5hbWUiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxVQUFVLFNBQVZBLE9BQVU7QUFBQSxNQUFFQyxJQUFGLFFBQUVBLElBQUY7QUFBQSxTQUNaO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FERjtBQUVFO0FBQUE7QUFBQTtBQUFLQTtBQUFMO0FBRkYsR0FEWTtBQUFBLENBQWhCOztrQkFPaUJELE8iLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9zZXRuYW1lLmpzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xyXG5cclxuY29uc3QgU2V0TmFtZSA9ICh7dGV4dH0pID0+IChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxzcGFuPlNob3c6IDwvc3Bhbj5cclxuICAgICAgPGgxPnt0ZXh0fTwvaDE+XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbiAgXHJcbiAgZXhwb3J0IGRlZmF1bHQgU2V0TmFtZVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL3NldG5hbWUuanN4Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/setname.jsx\n");

/***/ }),

/***/ "./src/containers/setname.jsx":
false

})