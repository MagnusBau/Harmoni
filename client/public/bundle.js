/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\src\\\\index.js: Unexpected token (11:12)\\n\\n\\u001b[0m \\u001b[90m  9 | \\u001b[39m    \\u001b[33mReactDOM\\u001b[39m\\u001b[33m.\\u001b[39mrender(\\u001b[0m\\n\\u001b[0m \\u001b[90m 10 | \\u001b[39m        \\u001b[33m<\\u001b[39m\\u001b[33mHashRouter\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 11 | \\u001b[39m            \\u001b[33m<\\u001b[39m\\u001b[33mdiv\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m            \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 12 | \\u001b[39m                \\u001b[33m<\\u001b[39m\\u001b[33mRoute\\u001b[39m exact path\\u001b[33m=\\u001b[39m\\u001b[32m'/'\\u001b[39m component\\u001b[33m=\\u001b[39m{\\u001b[33mAddRole\\u001b[39m} \\u001b[33m/\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 13 | \\u001b[39m            \\u001b[33m<\\u001b[39m\\u001b[33m/\\u001b[39m\\u001b[33mdiv\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 14 | \\u001b[39m        \\u001b[33m<\\u001b[39m\\u001b[33m/\\u001b[39m\\u001b[33mHashRouter\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[33m,\\u001b[39m\\u001b[0m\\n    at Object.raise (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:7012:17)\\n    at Object.unexpected (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8405:16)\\n    at Object.parseExprAtom (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9661:20)\\n    at Object.parseExprSubscripts (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9237:23)\\n    at Object.parseMaybeUnary (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9217:21)\\n    at Object.parseExprOps (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9083:23)\\n    at Object.parseMaybeConditional (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9056:23)\\n    at Object.parseMaybeAssign (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9015:21)\\n    at C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:2751:99\\n    at Object.forwardNoArrowParamsConversionAt (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:2254:16)\\n    at C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:2751:38\\n    at Object.tryParse (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8461:20)\\n    at Object.parseMaybeAssign (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:2749:26)\\n    at Object.parseExprListItem (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10331:18)\\n    at Object.parseCallExpressionArguments (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9434:22)\\n    at Object.parseSubscript (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9342:29)\\n    at Object.parseSubscript (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:2886:18)\\n    at Object.parseSubscripts (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9258:19)\\n    at Object.parseSubscripts (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:2848:18)\\n    at Object.parseExprSubscripts (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9247:17)\\n    at Object.parseMaybeUnary (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9217:21)\\n    at Object.parseExprOps (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9083:23)\\n    at Object.parseMaybeConditional (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9056:23)\\n    at Object.parseMaybeAssign (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9015:21)\\n    at Object.parseMaybeAssign (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:2774:18)\\n    at Object.parseExpression (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8965:23)\\n    at Object.parseStatementContent (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10819:23)\\n    at Object.parseStatement (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10690:17)\\n    at Object.parseStatement (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:2079:26)\\n    at Object.parseBlockOrModuleBlockBody (C:\\\\Users\\\\xFatx\\\\IdeaProjects\\\\harmoni\\\\client\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:11266:25)\");\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });