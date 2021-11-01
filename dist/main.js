/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_example_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/example.mjs */ \"./src/scripts/example.mjs.js\");\n //let Canvas = require('./scripts/canvas.mjs');\n// breaks at Deck, solitaire, and product and doesn't add the event listener\n//let Deck = require('./scripts/deck.mjs');\n//let SolitaireCard = require('./scripts/solitaire_card.mjs');\n//let product = require('./scripts/utilities/cartesian_product');\n\nvar values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];\nvar suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];\n/*\r\nlet deck = new Deck();\r\nlet prod = product(repeat=1, values, suits);\r\nfor (let i = 0; i < prod.length; i++){\r\n    let card = new SolitaireCard(prod[i][0], prod[i][1]);\r\n    card.flip();\r\n    deck.addToBottom(card);\r\n    console.log(`\\x1b[34m  ⤷ added to deck: ${card.repr()}\\x1b[0m`);\r\n}\r\n*/\n//let canvas = new Canvas(document);\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  // This is the main for all HTML contenten to render\n  console.log(\"hello world!\");\n  var main = document.getElementById(\"main\");\n  new _scripts_example_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"](main);\n  var div = document.createElement('div');\n  div.textContent;\n  document.body.append(div);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Q0FDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLElBQUlDLE1BQU0sR0FBRyxDQUFDLEdBQUQsRUFBTSxDQUFOLEVBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmLEVBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCLENBQTNCLEVBQThCLEVBQTlCLEVBQWtDLE1BQWxDLEVBQTBDLE9BQTFDLEVBQW1ELE1BQW5ELENBQWI7QUFDQSxJQUFJQyxLQUFLLEdBQUcsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixVQUFyQixFQUFpQyxPQUFqQyxDQUFaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQUMsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNoRDtBQUNBQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaO0FBQ0EsTUFBTUMsSUFBSSxHQUFHSixRQUFRLENBQUNLLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBLE1BQUlSLDREQUFKLENBQVlPLElBQVo7QUFHQSxNQUFNRSxHQUFHLEdBQUdOLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0FELEVBQUFBLEdBQUcsQ0FBQ0UsV0FBSjtBQUNBUixFQUFBQSxRQUFRLENBQUNTLElBQVQsQ0FBY0MsTUFBZCxDQUFxQkosR0FBckI7QUFFSCxDQVhEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2FyZHMvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhhbXBsZSBmcm9tIFwiLi9zY3JpcHRzL2V4YW1wbGUubWpzXCJcclxuLy9sZXQgQ2FudmFzID0gcmVxdWlyZSgnLi9zY3JpcHRzL2NhbnZhcy5tanMnKTtcclxuXHJcbi8vIGJyZWFrcyBhdCBEZWNrLCBzb2xpdGFpcmUsIGFuZCBwcm9kdWN0IGFuZCBkb2Vzbid0IGFkZCB0aGUgZXZlbnQgbGlzdGVuZXJcclxuLy9sZXQgRGVjayA9IHJlcXVpcmUoJy4vc2NyaXB0cy9kZWNrLm1qcycpO1xyXG4vL2xldCBTb2xpdGFpcmVDYXJkID0gcmVxdWlyZSgnLi9zY3JpcHRzL3NvbGl0YWlyZV9jYXJkLm1qcycpO1xyXG4vL2xldCBwcm9kdWN0ID0gcmVxdWlyZSgnLi9zY3JpcHRzL3V0aWxpdGllcy9jYXJ0ZXNpYW5fcHJvZHVjdCcpO1xyXG5cclxuXHJcbmxldCB2YWx1ZXMgPSBbJ0EnLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgJ0phY2snLCAnUXVlZW4nLCAnS2luZyddO1xyXG5sZXQgc3VpdHMgPSBbJ0hlYXJ0cycsICdTcGFkZXMnLCAnRGlhbW9uZHMnLCAnQ2x1YnMnXVxyXG4vKlxyXG5sZXQgZGVjayA9IG5ldyBEZWNrKCk7XHJcbmxldCBwcm9kID0gcHJvZHVjdChyZXBlYXQ9MSwgdmFsdWVzLCBzdWl0cyk7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgcHJvZC5sZW5ndGg7IGkrKyl7XHJcbiAgICBsZXQgY2FyZCA9IG5ldyBTb2xpdGFpcmVDYXJkKHByb2RbaV1bMF0sIHByb2RbaV1bMV0pO1xyXG4gICAgY2FyZC5mbGlwKCk7XHJcbiAgICBkZWNrLmFkZFRvQm90dG9tKGNhcmQpO1xyXG4gICAgY29uc29sZS5sb2coYFxceDFiWzM0bSAg4qS3IGFkZGVkIHRvIGRlY2s6ICR7Y2FyZC5yZXByKCl9XFx4MWJbMG1gKTtcclxufVxyXG4qL1xyXG5cclxuLy9sZXQgY2FudmFzID0gbmV3IENhbnZhcyhkb2N1bWVudCk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICAvLyBUaGlzIGlzIHRoZSBtYWluIGZvciBhbGwgSFRNTCBjb250ZW50ZW4gdG8gcmVuZGVyXHJcbiAgICBjb25zb2xlLmxvZyhcImhlbGxvIHdvcmxkIVwiKVxyXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcclxuICAgIG5ldyBFeGFtcGxlKG1haW4pO1xyXG5cclxuXHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi50ZXh0Q29udGVudFxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoZGl2KVxyXG5cclxufSk7XHJcbiJdLCJuYW1lcyI6WyJFeGFtcGxlIiwidmFsdWVzIiwic3VpdHMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwibWFpbiIsImdldEVsZW1lbnRCeUlkIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwiYm9keSIsImFwcGVuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scripts/example.mjs.js":
/*!************************************!*\
  !*** ./src/scripts/example.mjs.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Example = /*#__PURE__*/function () {\n  function Example(ele) {\n    var _this = this;\n\n    _classCallCheck(this, Example);\n\n    this.ele = ele;\n    this.ele.innerHTML = \"<h1>I'm alive!</h1>\";\n    /* needs to bind\r\n    this.handleClick = this.handleClick.bind(this);\r\n    this.ele.addEventListener(\"click\", this.handleClick);\r\n     */\n    // arrow function already binds for us\n\n    this.ele.addEventListener(\"click\", function () {\n      return _this.handleClick();\n    });\n  }\n\n  _createClass(Example, [{\n    key: \"handleClick\",\n    value: function handleClick() {\n      this.ele.children[0].innerText = \"Ouch!\";\n    }\n  }]);\n\n  return Example;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Example);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9leGFtcGxlLm1qcy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0lBQU1BO0FBQ0YsbUJBQVlDLEdBQVosRUFBaUI7QUFBQTs7QUFBQTs7QUFDYixTQUFLQSxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQSxHQUFMLENBQVNDLFNBQVQsR0FBcUIscUJBQXJCO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFFUTs7QUFDQSxTQUFLRCxHQUFMLENBQVNFLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DO0FBQUEsYUFBTSxLQUFJLENBQUNDLFdBQUwsRUFBTjtBQUFBLEtBQW5DO0FBQ0g7Ozs7V0FFRCx1QkFBYTtBQUNULFdBQUtILEdBQUwsQ0FBU0ksUUFBVCxDQUFrQixDQUFsQixFQUFxQkMsU0FBckIsR0FBaUMsT0FBakM7QUFDSDs7Ozs7O0FBSUwsK0RBQWVOLE9BQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXJkcy8uL3NyYy9zY3JpcHRzL2V4YW1wbGUubWpzLmpzP2U4ZGUiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRXhhbXBsZXtcclxuICAgIGNvbnN0cnVjdG9yKGVsZSkge1xyXG4gICAgICAgIHRoaXMuZWxlID0gZWxlO1xyXG4gICAgICAgIHRoaXMuZWxlLmlubmVySFRNTCA9IFwiPGgxPkknbSBhbGl2ZSE8L2gxPlwiO1xyXG4gICAgICAgIC8qIG5lZWRzIHRvIGJpbmRcclxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUNsaWNrKTtcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgLy8gYXJyb3cgZnVuY3Rpb24gYWxyZWFkeSBiaW5kcyBmb3IgdXNcclxuICAgICAgICB0aGlzLmVsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5oYW5kbGVDbGljaygpKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDbGljaygpe1xyXG4gICAgICAgIHRoaXMuZWxlLmNoaWxkcmVuWzBdLmlubmVyVGV4dCA9IFwiT3VjaCFcIjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4YW1wbGUiXSwibmFtZXMiOlsiRXhhbXBsZSIsImVsZSIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGljayIsImNoaWxkcmVuIiwiaW5uZXJUZXh0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/example.mjs.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXJkcy8uL3NyYy9pbmRleC5zY3NzPzk3NDUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;