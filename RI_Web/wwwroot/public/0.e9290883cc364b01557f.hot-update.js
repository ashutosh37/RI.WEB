webpackHotUpdate(0,{

/***/ "./src/components/setname.jsx":
/*!************************************!*\
  !*** ./src/components/setname.jsx ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"./node_modules/babel-runtime/core-js/object/get-prototype-of.js\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar SetName = function (_React$Component) {\n  (0, _inherits3.default)(SetName, _React$Component);\n\n  function SetName(props) {\n    (0, _classCallCheck3.default)(this, SetName);\n\n    var _this = (0, _possibleConstructorReturn3.default)(this, (SetName.__proto__ || (0, _getPrototypeOf2.default)(SetName)).call(this, props));\n\n    _this.state = {\n      todos: []\n    };\n\n    store.subscribe(function () {\n      // When state will be updated(in our case, when items will be fetched), \n      // we will update local component state and force component to rerender \n      // with new data.\n\n      _this.setState({\n        todos: store.getState().todos\n      });\n    });\n    return _this;\n  }\n\n  (0, _createClass3.default)(SetName, [{\n    key: 'render',\n    value: function render() {\n      return _react2.default.createElement(\n        'div',\n        null,\n        this.state.todos.map(function (item) {\n          return _react2.default.createElement(\n            'p',\n            null,\n            ' ',\n            item,\n            ' '\n          );\n        })\n      );\n    }\n  }]);\n  return SetName;\n}(_react2.default.Component);\n\n;\n\nexports.default = SetName;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zZXRuYW1lLmpzeD9mZjRkIl0sIm5hbWVzIjpbIlNldE5hbWUiLCJwcm9wcyIsInN0YXRlIiwidG9kb3MiLCJzdG9yZSIsInN1YnNjcmliZSIsInNldFN0YXRlIiwiZ2V0U3RhdGUiLCJtYXAiLCJpdGVtIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRU1BLE87OztBQUNGLG1CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsd0lBQ1hBLEtBRFc7O0FBR2pCLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxhQUFPO0FBREksS0FBYjs7QUFJQUMsVUFBTUMsU0FBTixDQUFnQixZQUFNO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQSxZQUFLQyxRQUFMLENBQWM7QUFDWkgsZUFBT0MsTUFBTUcsUUFBTixHQUFpQko7QUFEWixPQUFkO0FBR0QsS0FSRDtBQVBpQjtBQWdCbEI7Ozs7NkJBRVE7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNHLGFBQUtELEtBQUwsQ0FBV0MsS0FBWCxDQUFpQkssR0FBakIsQ0FBcUIsVUFBQ0MsSUFBRDtBQUFBLGlCQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUtBLGdCQUFMO0FBQUE7QUFBQSxXQUFWO0FBQUEsU0FBckI7QUFESCxPQURGO0FBS0Q7OztFQXpCaUJDLGdCQUFNQyxTOztBQTBCekI7O2tCQUVjWCxPIiwiZmlsZSI6Ii4vc3JjL2NvbXBvbmVudHMvc2V0bmFtZS5qc3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcclxuXHJcbmNsYXNzIFNldE5hbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgc3VwZXIocHJvcHMpO1xyXG4gIFxyXG4gICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIHRvZG9zOiBbXSxcclxuICAgICAgfTtcclxuICBcclxuICAgICAgc3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAvLyBXaGVuIHN0YXRlIHdpbGwgYmUgdXBkYXRlZChpbiBvdXIgY2FzZSwgd2hlbiBpdGVtcyB3aWxsIGJlIGZldGNoZWQpLCBcclxuICAgICAgICAvLyB3ZSB3aWxsIHVwZGF0ZSBsb2NhbCBjb21wb25lbnQgc3RhdGUgYW5kIGZvcmNlIGNvbXBvbmVudCB0byByZXJlbmRlciBcclxuICAgICAgICAvLyB3aXRoIG5ldyBkYXRhLlxyXG4gIFxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgdG9kb3M6IHN0b3JlLmdldFN0YXRlKCkudG9kb3NcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIHt0aGlzLnN0YXRlLnRvZG9zLm1hcCgoaXRlbSkgPT4gPHA+IHtpdGVtfSA8L3A+ICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBcclxuICBleHBvcnQgZGVmYXVsdCBTZXROYW1lXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvc2V0bmFtZS5qc3giXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/setname.jsx\n");

/***/ })

})