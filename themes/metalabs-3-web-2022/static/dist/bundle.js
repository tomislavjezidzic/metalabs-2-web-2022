(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _SplitText = require("gsap/dist/SplitText");
var _swiper = _interopRequireWildcard(require("swiper"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_SplitText.SplitText);
var ThreeDSlider = /*#__PURE__*/function () {
  function ThreeDSlider() {
    _classCallCheck(this, ThreeDSlider);
    this.DOM = {
      wrapper: ".js-3d-slider-wrapper",
      slider: ".js-3d-slider",
      next: ".js-3d-slider-next",
      prev: ".js-3d-slider-prev",
      pagination: ".js-3d-slider-pagination",
      primaryTitle: ".js-slide-title-primary",
      secondaryTitle: ".js-slide-title-secondary"
    };
    this.wrapper = document.querySelector(this.DOM.wrapper);
  }
  _createClass(ThreeDSlider, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!this.wrapper) return;
      var slider = this.wrapper.querySelector(this.DOM.slider);
      var next = this.wrapper.querySelector(this.DOM.next);
      var prev = this.wrapper.querySelector(this.DOM.prev);
      var pagination = this.wrapper.querySelector(this.DOM.pagination);
      var swiper = new _swiper.default(slider, {
        modules: [_swiper.Navigation, _swiper.Pagination],
        loop: false,
        pagination: {
          el: pagination,
          clickable: false,
          renderBullet: function renderBullet(index, className) {
            return "<span class=\"".concat(className, "\"><span>0</span><span>1</span></span>");
          }
        },
        navigation: {
          nextEl: next,
          prevEl: prev
        },
        on: {
          slideChange: function slideChange(swiper) {
            return _this.animateTitles(swiper);
          },
          afterInit: function afterInit(swiper) {
            return setTimeout(function () {
              return _this.animateTitles(swiper);
            }, 100);
          }
        }
      });
      swiper.slides.forEach(function (slide) {
        var titlePrimary = slide.querySelector(_this.DOM.primaryTitle);
        var titleSecondary = slide.querySelector(_this.DOM.secondaryTitle);
        var splitPrimary = new _SplitText.SplitText(titlePrimary, {
          type: "chars",
          charsClass: "split-text-char"
        });
        var splitSecondary = new _SplitText.SplitText(titleSecondary, {
          type: "chars",
          charsClass: "split-text-char"
        });
        _gsap.default.set(splitPrimary.chars, {
          visibility: "hidden"
        });
      });
    }
  }, {
    key: "animateTitles",
    value: function animateTitles(swiper) {
      this.animateTitleIn(swiper.slides[swiper.activeIndex]);
      if (swiper.slides[swiper.previousIndex]) {
        this.animateTitleOut(swiper.slides[swiper.previousIndex]);
      }
    }
  }, {
    key: "animateTitleIn",
    value: function animateTitleIn(slide) {
      var titlePrimaryChars = slide.querySelector(this.DOM.primaryTitle).querySelectorAll(".split-text-char");
      var titleSecondaryChars = slide.querySelector(this.DOM.secondaryTitle).querySelectorAll(".split-text-char");
      _gsap.default.to(titlePrimaryChars, {
        visibility: "visible",
        delay: 0.4,
        duration: 0.2,
        stagger: {
          each: 0.05,
          from: "center"
        }
      });
      _gsap.default.to(titleSecondaryChars, {
        visibility: "hidden",
        delay: 0.5,
        duration: 0.2,
        stagger: {
          each: 0.05,
          from: "center"
        }
      });
    }
  }, {
    key: "animateTitleOut",
    value: function animateTitleOut(slide) {
      var titlePrimaryChars = slide.querySelector(this.DOM.primaryTitle).querySelectorAll(".split-text-char");
      var titleSecondaryChars = slide.querySelector(this.DOM.secondaryTitle).querySelectorAll(".split-text-char");
      _gsap.default.to(titlePrimaryChars, {
        visibility: "hidden"
      });
      _gsap.default.to(titleSecondaryChars, {
        visibility: "visible"
      });
    }
  }]);
  return ThreeDSlider;
}();
exports.default = ThreeDSlider;

},{"gsap":"gsap","gsap/dist/SplitText":"gsap/dist/SplitText","swiper":"swiper"}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _is_js = _interopRequireDefault(require("is_js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Cursor = /*#__PURE__*/function () {
  function Cursor() {
    _classCallCheck(this, Cursor);
    this.DOM = {
      wrapper: ".js-cursor"
    };
    this.wrapper = document.querySelector(this.DOM.wrapper);
    this.moved = false;
  }
  _createClass(Cursor, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!this.wrapper || _is_js.default.touchDevice()) return;
      var offsetY = this.wrapper.offsetHeight * 0.5;
      var offsetX = this.wrapper.offsetWidth * 0.05;
      window.addEventListener("mousemove", function (ev) {
        if (!_this.moved) {
          _this.moved = true;
          _this.wrapper.classList.add("is-moved");
        }
        _gsap.default.set(_this.wrapper, {
          x: ev.clientX - offsetX,
          y: ev.clientY - offsetY
        });
      });
      document.querySelectorAll("a").forEach(function (link) {
        _this.singleLink(link);
      });
      document.querySelectorAll(".has-hover").forEach(function (link) {
        _this.singleLink(link);
      });
    }
  }, {
    key: "singleLink",
    value: function singleLink(link) {
      var _this2 = this;
      link.addEventListener("mouseenter", function () {
        _this2.wrapper.classList.add("is-active");
      });
      link.addEventListener("mouseleave", function () {
        _this2.wrapper.classList.remove("is-active");
      });
    }
  }]);
  return Cursor;
}();
exports.default = Cursor;

},{"gsap":"gsap","is_js":"is_js"}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * Navigation controller
 * "smart" navigation which goes off screen when scrolling down for a better overview of content and UX
 * navigation appears when scrolling up
 */var NavigationController = /*#__PURE__*/function () {
  function NavigationController() {
    _classCallCheck(this, NavigationController);
    /**
     * Navigation DOM selectors
     * Navigation DOM state CSS classes
     * @type {{navigation: string, states: {navigationSlideUp: string, navigationScrolled: string, navigationFixed: string}}}
     */
    this.DOM = {
      navigation: ".js-navigation",
      states: {
        navigationScrolled: "has-scrolled",
        navigationFixed: "is-fixed",
        navigationSlideUp: "slide-up"
      }
    };

    /**
     * flag, state variable for scrolling event
     * @type {boolean}
     */
    this.scrolling = false;
    /**
     * amount of pixels to scroll from top for adding "has-scrolled" state class
     * @type {number}
     */
    this.scrollNavigationOffset = 200;
    /**
     * variable for storing amount of scroll from top position value
     * @type {number}
     */
    this.previousTop = 0;
    /**
     * variable for storing current scroll position value
     * @type {number}
     */
    this.currentTop = 0;
    this.scrollDelta = 0;
    this.scrollOffset = 0;

    /**
     * fetch navigation element DOM element
     * @type {Element}
     */
    this.navigation = document.querySelector(this.DOM.navigation);
  }

  //region methods

  /**
   *
   */
  _createClass(NavigationController, [{
    key: "init",
    value: function init() {
      if (this.navigation !== null) {
        console.log("Navigation init()");
        this.navigationController();
      } else {
        console.error("".concat(this.DOM.navigation, " does not exist in the DOM!"));
      }
    }

    /**
     *
     */
  }, {
    key: "navigationController",
    value: function navigationController() {
      var _this = this;
      document.addEventListener("scroll", function () {
        if (!_this.scrolling) {
          _this.scrolling = true;
          if (!window.requestAnimationFrame) {
            setTimeout(_this.checkScroll(), 250);
          } else {
            requestAnimationFrame(function () {
              return _this.checkScroll();
            });
          }
        }
      });
    }

    /**
     *
     */
  }, {
    key: "checkScroll",
    value: function checkScroll() {
      /**
       *
       * @type {number}
       */
      var currentTop = window.pageYOffset | document.body.scrollTop;
      this.changeNavigationState(currentTop);
      this.previousTop = currentTop;
      this.scrolling = false;
    }

    /**
     *
     * @param currentTop
     */
  }, {
    key: "changeNavigationState",
    value: function changeNavigationState(currentTop) {
      if (currentTop > this.scrollNavigationOffset) {
        this.navigation.classList.add(this.DOM.states.navigationScrolled);
      } else {
        this.navigation.classList.remove(this.DOM.states.navigationScrolled);
      }
      if (this.previousTop >= currentTop) {
        this.scrollingUp(currentTop);
      } else {
        this.scrollingDown(currentTop);
      }
    }

    /**
     *
     * @param currentTop
     */
  }, {
    key: "scrollingUp",
    value: function scrollingUp(currentTop) {
      if (currentTop < this.scrollNavigationOffset) {
        this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
      } else if (this.previousTop - currentTop > this.scrollDelta) {
        this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
      }
    }

    /**
     *
     * @param currentTop
     */
  }, {
    key: "scrollingDown",
    value: function scrollingDown(currentTop) {
      if (currentTop > this.scrollNavigationOffset + this.scrollOffset) {
        this.navigation.classList.add(this.DOM.states.navigationSlideUp);
      } else if (currentTop > this.scrollNavigationOffset) {
        this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
      }
    }

    //endregion
  }]);
  return NavigationController;
}();
exports.default = NavigationController;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * Grid helper
 * Show grid overlay when developing
 * Not included in production bundle JS file
 */var GridHelper = /*#__PURE__*/function () {
  function GridHelper() {
    _classCallCheck(this, GridHelper);
    /**
     * Grid DOM selector
     * @type {{grid: string}}
     */
    this.DOM = {
      grid: "grid"
    };

    /**
     * Grid options
     * @type {{
     * gutterFixed: boolean,
     * initialDisplay: string,
     * gridFixed: boolean,
     * gutterWidth: number,
     * gridColor: string,
     * columnCount: number,
     * gridWidth: number,
     * columnBgColor: string
     * }}
     */
    this.gridOptions = {
      initialDisplay: "none",
      // "flex" or "none" — initial display for the grid — string
      columnCount: 24,
      // number of grid columns — integer
      gridWidth: 1440,
      // base grid used in design; value in px — integer
      gridFixed: true,
      // should grid width be restricted to gridWidth or it should go full width a nd behave fluidly across all screen sizes
      gutterWidth: 0,
      // grid gutters value in px — integer
      gutterFixed: false,
      // should grid gutter be a fixed value (px) or fluid — integer
      gridColor: "rgb(255, 0, 255, 0.15)",
      // grid guides color — string of an rgba or hex value
      columnBgColor: "rgb(255, 0, 255, 0.025)" // grid columns background color — string of an rgba or hex value
    };

    var consoleLogStyle = ["background-color: #a6a6a6", "color: black", "display: block", "line-height: 24px", "text-align: center", "border: 1px solid #ffffff", "font-weight: bold"].join(";");
    console.info("toggle grid: %c Alt/Option + G ", consoleLogStyle);
    this.grid = null;
    this.columnWidth = (this.gridOptions.gridWidth - (this.gridOptions.columnCount - 1) * this.gridOptions.gutterWidth) / this.gridOptions.columnCount;
    this.columnWidthPercentage = "".concat(this.columnWidth / this.gridOptions.gridWidth * 100, "%");
    this.gutterWidthPercentage = "".concat(this.gridOptions.gutterWidth / this.gridOptions.gridWidth * 100, "%");
  }
  _createClass(GridHelper, [{
    key: "init",
    value: function init() {
      console.log("GridHelper init()");
      this.initGrid();
      this.keyboardShortcut();
    }
  }, {
    key: "initGrid",
    value: function initGrid() {
      // create grid overlay element
      this.grid = document.createElement("div");
      this.grid.id = this.DOM.grid;

      // style grid element
      this.grid.style.cssText = "\n            pointer-events: none;\n            display: ".concat(this.gridOptions.initialDisplay, ";\n            flex-direction: row;\n            width: 100%;\n            height: 100%;\n            position: fixed;\n            top: 0;\n            left: 50%;\n            transform: translateX(-50%);\n            z-index: 999;\n        ");
      if (this.gridOptions.gridFixed === true) {
        this.grid.style.maxWidth = "".concat(this.gridOptions.gridWidth, "px");
      }
      if (!this.gridOptions.gutterWidth > 0) {
        this.grid.style.borderLeft = "none";
      }

      // add grid container to page
      document.body.appendChild(this.grid);

      // add columns to grid
      for (var i = 0; i < this.gridOptions.columnCount; i++) {
        var column = document.createElement("i");
        this.grid.appendChild(column);
        column.style.cssText = "\n                height: auto;\n                flex-grow: 1;\n                background-color: ".concat(this.gridOptions.columnBgColor, ";\n                border-left: 1px solid ").concat(this.gridOptions.gridColor, ";\n            ");
        if (this.gridOptions.gutterWidth > 0) {
          column.style.borderRight = "1px solid ".concat(this.gridOptions.gridColor);
        } else {
          this.grid.style.borderRight = "1px solid ".concat(this.gridOptions.gridColor);
        }
        if (this.gridOptions.gutterFixed === true) {
          column.style.marginRight = "".concat(this.gridOptions.gutterWidth, "px");
        } else {
          column.style.marginRight = this.gutterWidthPercentage;
          column.style.width = this.columnWidthPercentage;
        }
      }
      this.grid.lastChild.style.marginRight = 0;
    }
  }, {
    key: "keyboardShortcut",
    value: function keyboardShortcut() {
      var _this = this;
      document.addEventListener("keyup", function (ev) {
        if (ev.keyCode === 71 && ev.altKey) {
          if (_this.grid.style.display === "none") {
            _this.grid.style.display = "flex";
          } else {
            _this.grid.style.display = "none";
          }
        }
      });
    }
  }]);
  return GridHelper;
}();
exports.default = GridHelper;

},{}],5:[function(require,module,exports){
"use strict";

var _GridHelper = _interopRequireDefault(require("./helpers/GridHelper"));
var _NavigationController = _interopRequireDefault(require("./components/NavigationController"));
var _Cursor = _interopRequireDefault(require("./components/Cursor"));
var _dSlider = _interopRequireDefault(require("./components/3dSlider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * MAIN JS FILE
 */

/**
 * Helpers
 * Imports of helper functions are stripped out of bundle
 * Include them within "start-strip-code" and "end-strip-code" comments
 */
/* start-strip-code */

/* end-strip-code */
/**
 * Components
 */

/**
 * Check if document is ready cross-browser
 * @param callback
 */
var ready = function ready(callback) {
  if (document.readyState !== "loading") {
    /**
     * Document is already ready, call the callback directly
     */
    callback();
  } else if (document.addEventListener) {
    /**
     * All modern browsers to register DOMContentLoaded
     */
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    /**
     * Old IE browsers
     */
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState === "complete") {
        callback();
      }
    });
  }
};

/**
 * Document ready callback
 */
ready(function () {
  /**
   * HELPERS INIT
   * Only init helpers if they exist
   * Will be undefined on production because of import stripping
   */
  if (typeof _GridHelper.default == "function") {
    var grid = new _GridHelper.default();
    grid.init();
  }
  var doc = document.documentElement;
  doc.style.setProperty("--win-height", "".concat(window.innerHeight, "px"));

  /**
   * COMPONENTS INIT
   */

  /**
   * Navigation
   * @type {NavigationController}
   */
  var navigation = new _NavigationController.default();
  navigation.init();

  /**
   * ThreeDSlider
   * @type {ThreeDSlider}
   */
  var threeDSlider = new _dSlider.default();
  threeDSlider.init();
  setTimeout(function () {
    /**
     * Cursor
     * @type {Cursor}
     */
    var cursor = new _Cursor.default();
    cursor.init();
  }, 500);
});

},{"./components/3dSlider":1,"./components/Cursor":2,"./components/NavigationController":3,"./helpers/GridHelper":4}]},{},[5])

//# sourceMappingURL=bundle.js.map
