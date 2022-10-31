(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.window = global.window || {}));
}(this, (function (exports) { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /*!
   * Observer 3.10.4
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */
  var gsap,
      _coreInitted,
      _clamp,
      _win,
      _doc,
      _docEl,
      _body,
      _isTouch,
      _pointerType,
      ScrollTrigger,
      _root,
      _normalizer,
      _eventTypes,
      _getGSAP = function _getGSAP() {
    return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
  },
      _startup = 1,
      _observers = [],
      _scrollers = [],
      _proxies = [],
      _getTime = Date.now,
      _bridge = function _bridge(name, value) {
    return value;
  },
      _integrate = function _integrate() {
    var core = ScrollTrigger.core,
        data = core.bridge || {},
        scrollers = core._scrollers,
        proxies = core._proxies;
    scrollers.push.apply(scrollers, _scrollers);
    proxies.push.apply(proxies, _proxies);
    _scrollers = scrollers;
    _proxies = proxies;

    _bridge = function _bridge(name, value) {
      return data[name](value);
    };
  },
      _getProxyProp = function _getProxyProp(element, property) {
    return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
  },
      _isViewport = function _isViewport(el) {
    return !!~_root.indexOf(el);
  },
      _addListener = function _addListener(element, type, func, nonPassive, capture) {
    return element.addEventListener(type, func, {
      passive: !nonPassive,
      capture: !!capture
    });
  },
      _removeListener = function _removeListener(element, type, func, capture) {
    return element.removeEventListener(type, func, !!capture);
  },
      _scrollLeft = "scrollLeft",
      _scrollTop = "scrollTop",
      _onScroll = function _onScroll() {
    return _normalizer && _normalizer.isPressed || _scrollers.cache++;
  },
      _scrollCacheFunc = function _scrollCacheFunc(f, doNotCache) {
    var cachingFunc = function cachingFunc(value) {
      if (value || value === 0) {
        _startup && (_win.history.scrollRestoration = "manual");
        var isNormalizing = _normalizer && _normalizer.isPressed;
        value = cachingFunc.v = Math.round(value) || (_normalizer && _normalizer.iOS ? 1 : 0);
        f(value);
        cachingFunc.cacheID = _scrollers.cache;
        isNormalizing && _bridge("ss", value);
      } else if (doNotCache || _scrollers.cache !== cachingFunc.cacheID || _bridge("ref")) {
        cachingFunc.cacheID = _scrollers.cache;
        cachingFunc.v = f();
      }

      return cachingFunc.v + cachingFunc.offset;
    };

    cachingFunc.offset = 0;
    return f && cachingFunc;
  },
      _horizontal = {
    s: _scrollLeft,
    p: "left",
    p2: "Left",
    os: "right",
    os2: "Right",
    d: "width",
    d2: "Width",
    a: "x",
    sc: _scrollCacheFunc(function (value) {
      return arguments.length ? _win.scrollTo(value, _vertical.sc()) : _win.pageXOffset || _doc[_scrollLeft] || _docEl[_scrollLeft] || _body[_scrollLeft] || 0;
    })
  },
      _vertical = {
    s: _scrollTop,
    p: "top",
    p2: "Top",
    os: "bottom",
    os2: "Bottom",
    d: "height",
    d2: "Height",
    a: "y",
    op: _horizontal,
    sc: _scrollCacheFunc(function (value) {
      return arguments.length ? _win.scrollTo(_horizontal.sc(), value) : _win.pageYOffset || _doc[_scrollTop] || _docEl[_scrollTop] || _body[_scrollTop] || 0;
    })
  },
      _getTarget = function _getTarget(t) {
    return gsap.utils.toArray(t)[0] || (typeof t === "string" && gsap.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
  },
      _getScrollFunc = function _getScrollFunc(element, _ref) {
    var s = _ref.s,
        sc = _ref.sc;

    var i = _scrollers.indexOf(element),
        offset = sc === _vertical.sc ? 1 : 2;

    !~i && (i = _scrollers.push(element) - 1);
    return _scrollers[i + offset] || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport(element) ? sc : _scrollCacheFunc(function (value) {
      return arguments.length ? element[s] = value : element[s];
    })));
  },
      _getVelocityProp = function _getVelocityProp(value, minTimeRefresh, useDelta) {
    var v1 = value,
        v2 = value,
        t1 = _getTime(),
        t2 = t1,
        min = minTimeRefresh || 50,
        dropToZeroTime = Math.max(500, min * 3),
        update = function update(value, force) {
      var t = _getTime();

      if (force || t - t1 > min) {
        v2 = v1;
        v1 = value;
        t2 = t1;
        t1 = t;
      } else if (useDelta) {
        v1 += value;
      } else {
        v1 = v2 + (value - v2) / (t - t2) * (t1 - t2);
      }
    },
        reset = function reset() {
      v2 = v1 = useDelta ? 0 : v1;
      t2 = t1 = 0;
    },
        getVelocity = function getVelocity(latestValue) {
      var tOld = t2,
          vOld = v2,
          t = _getTime();

      (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
      return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1000;
    };

    return {
      update: update,
      reset: reset,
      getVelocity: getVelocity
    };
  },
      _getEvent = function _getEvent(e, preventDefault) {
    preventDefault && !e._gsapAllow && e.preventDefault();
    return e.changedTouches ? e.changedTouches[0] : e;
  },
      _getAbsoluteMax = function _getAbsoluteMax(a) {
    var max = Math.max.apply(Math, a),
        min = Math.min.apply(Math, a);
    return Math.abs(max) >= Math.abs(min) ? max : min;
  },
      _setScrollTrigger = function _setScrollTrigger() {
    ScrollTrigger = gsap.core.globals().ScrollTrigger;
    ScrollTrigger && ScrollTrigger.core && _integrate();
  },
      _initCore = function _initCore(core) {
    gsap = core || _getGSAP();

    if (gsap && typeof document !== "undefined" && document.body) {
      _win = window;
      _doc = document;
      _docEl = _doc.documentElement;
      _body = _doc.body;
      _root = [_win, _doc, _docEl, _body];
      _clamp = gsap.utils.clamp;
      _pointerType = "onpointerenter" in _body ? "pointer" : "mouse";
      _isTouch = Observer.isTouch = _win.matchMedia && _win.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
      _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
      setTimeout(function () {
        return _startup = 0;
      }, 500);

      _setScrollTrigger();

      _coreInitted = 1;
    }

    return _coreInitted;
  };

  _horizontal.op = _vertical;
  _scrollers.cache = 0;
  var Observer = function () {
    function Observer(vars) {
      this.init(vars);
    }

    var _proto = Observer.prototype;

    _proto.init = function init(vars) {
      _coreInitted || _initCore(gsap) || console.warn("Please gsap.registerPlugin(Observer)");
      ScrollTrigger || _setScrollTrigger();
      var tolerance = vars.tolerance,
          dragMinimum = vars.dragMinimum,
          type = vars.type,
          target = vars.target,
          lineHeight = vars.lineHeight,
          debounce = vars.debounce,
          preventDefault = vars.preventDefault,
          onStop = vars.onStop,
          onStopDelay = vars.onStopDelay,
          ignore = vars.ignore,
          wheelSpeed = vars.wheelSpeed,
          event = vars.event,
          onDragStart = vars.onDragStart,
          onDragEnd = vars.onDragEnd,
          onDrag = vars.onDrag,
          onPress = vars.onPress,
          onRelease = vars.onRelease,
          onRight = vars.onRight,
          onLeft = vars.onLeft,
          onUp = vars.onUp,
          onDown = vars.onDown,
          onChangeX = vars.onChangeX,
          onChangeY = vars.onChangeY,
          onChange = vars.onChange,
          onToggleX = vars.onToggleX,
          onToggleY = vars.onToggleY,
          onHover = vars.onHover,
          onHoverEnd = vars.onHoverEnd,
          onMove = vars.onMove,
          ignoreCheck = vars.ignoreCheck,
          isNormalizer = vars.isNormalizer,
          onGestureStart = vars.onGestureStart,
          onGestureEnd = vars.onGestureEnd,
          onWheel = vars.onWheel,
          onEnable = vars.onEnable,
          onDisable = vars.onDisable,
          onClick = vars.onClick,
          scrollSpeed = vars.scrollSpeed,
          capture = vars.capture,
          allowClicks = vars.allowClicks,
          lockAxis = vars.lockAxis,
          onLockAxis = vars.onLockAxis;
      this.target = target = _getTarget(target) || _docEl;
      this.vars = vars;
      ignore && (ignore = gsap.utils.toArray(ignore));
      tolerance = tolerance || 0;
      dragMinimum = dragMinimum || 0;
      wheelSpeed = wheelSpeed || 1;
      scrollSpeed = scrollSpeed || 1;
      type = type || "wheel,touch,pointer";
      debounce = debounce !== false;
      lineHeight || (lineHeight = parseFloat(_win.getComputedStyle(_body).lineHeight) || 22);

      var id,
          onStopDelayedCall,
          dragged,
          moved,
          wheeled,
          locked,
          axis,
          self = this,
          prevDeltaX = 0,
          prevDeltaY = 0,
          scrollFuncX = _getScrollFunc(target, _horizontal),
          scrollFuncY = _getScrollFunc(target, _vertical),
          scrollX = scrollFuncX(),
          scrollY = scrollFuncY(),
          limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown",
          isViewport = _isViewport(target),
          ownerDoc = target.ownerDocument || _doc,
          deltaX = [0, 0, 0],
          deltaY = [0, 0, 0],
          onClickTime = 0,
          clickCapture = function clickCapture() {
        return onClickTime = _getTime();
      },
          _ignoreCheck = function _ignoreCheck(e, isPointerOrTouch) {
        return (self.event = e) && ignore && ~ignore.indexOf(e.target) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
      },
          onStopFunc = function onStopFunc() {
        self._vx.reset();

        self._vy.reset();

        onStopDelayedCall.pause();
        onStop && onStop(self);
      },
          update = function update() {
        var dx = self.deltaX = _getAbsoluteMax(deltaX),
            dy = self.deltaY = _getAbsoluteMax(deltaY),
            changedX = Math.abs(dx) >= tolerance,
            changedY = Math.abs(dy) >= tolerance;

        onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY);

        if (changedX) {
          onRight && self.deltaX > 0 && onRight(self);
          onLeft && self.deltaX < 0 && onLeft(self);
          onChangeX && onChangeX(self);
          onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
          prevDeltaX = self.deltaX;
          deltaX[0] = deltaX[1] = deltaX[2] = 0;
        }

        if (changedY) {
          onDown && self.deltaY > 0 && onDown(self);
          onUp && self.deltaY < 0 && onUp(self);
          onChangeY && onChangeY(self);
          onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
          prevDeltaY = self.deltaY;
          deltaY[0] = deltaY[1] = deltaY[2] = 0;
        }

        if (moved || dragged) {
          onMove && onMove(self);
          onLockAxis && locked && onLockAxis(self);

          if (dragged) {
            onDrag(self);
            dragged = false;
          }

          moved = locked = false;
        }

        if (wheeled) {
          onWheel(self);
          wheeled = false;
        }

        id = 0;
      },
          onDelta = function onDelta(x, y, index) {
        deltaX[index] += x;
        deltaY[index] += y;

        self._vx.update(x);

        self._vy.update(y);

        debounce ? id || (id = requestAnimationFrame(update)) : update();
      },
          onTouchOrPointerDelta = function onTouchOrPointerDelta(x, y) {
        if (axis !== "y") {
          deltaX[2] += x;

          self._vx.update(x, true);
        }

        if (axis !== "x") {
          deltaY[2] += y;

          self._vy.update(y, true);
        }

        if (lockAxis && !axis) {
          self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
          locked = true;
        }

        debounce ? id || (id = requestAnimationFrame(update)) : update();
      },
          _onDrag = function _onDrag(e) {
        if (_ignoreCheck(e, 1)) {
          return;
        }

        e = _getEvent(e, preventDefault);
        var x = e.clientX,
            y = e.clientY,
            dx = x - self.x,
            dy = y - self.y,
            isDragging = self.isDragging;
        self.x = x;
        self.y = y;

        if (isDragging || Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum) {
          onDrag && (dragged = true);
          isDragging || (self.isDragging = true);
          onTouchOrPointerDelta(dx, dy);
          isDragging || onDragStart && onDragStart(self);
        }
      },
          _onPress = self.onPress = function (e) {
        if (_ignoreCheck(e, 1)) {
          return;
        }

        self.axis = axis = null;
        onStopDelayedCall.pause();
        self.isPressed = true;
        e = _getEvent(e);
        prevDeltaX = prevDeltaY = 0;
        self.startX = self.x = e.clientX;
        self.startY = self.y = e.clientY;

        self._vx.reset();

        self._vy.reset();

        _addListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, preventDefault, true);

        self.deltaX = self.deltaY = 0;
        onPress && onPress(self);
      },
          _onRelease = function _onRelease(e) {
        if (_ignoreCheck(e, 1)) {
          return;
        }

        _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);

        var wasDragging = self.isDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3),
            eventData = _getEvent(e);

        if (!wasDragging) {
          self._vx.reset();

          self._vy.reset();

          if (preventDefault && allowClicks) {
            gsap.delayedCall(0.08, function () {
              if (_getTime() - onClickTime > 300 && !e.defaultPrevented) {
                if (e.target.click) {
                  e.target.click();
                } else if (ownerDoc.createEvent) {
                  var syntheticEvent = ownerDoc.createEvent("MouseEvents");
                  syntheticEvent.initMouseEvent("click", true, true, _win, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
                  e.target.dispatchEvent(syntheticEvent);
                }
              }
            });
          }
        }

        self.isDragging = self.isGesturing = self.isPressed = false;
        onStop && !isNormalizer && onStopDelayedCall.restart(true);
        onDragEnd && wasDragging && onDragEnd(self);
        onRelease && onRelease(self, wasDragging);
      },
          _onGestureStart = function _onGestureStart(e) {
        return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
      },
          _onGestureEnd = function _onGestureEnd() {
        return (self.isGesturing = false) || onGestureEnd(self);
      },
          onScroll = function onScroll(e) {
        if (_ignoreCheck(e)) {
          return;
        }

        var x = scrollFuncX(),
            y = scrollFuncY();
        onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
        scrollX = x;
        scrollY = y;
        onStop && onStopDelayedCall.restart(true);
      },
          _onWheel = function _onWheel(e) {
        if (_ignoreCheck(e)) {
          return;
        }

        e = _getEvent(e, preventDefault);
        onWheel && (wheeled = true);
        var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win.innerHeight : 1) * wheelSpeed;
        onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
        onStop && !isNormalizer && onStopDelayedCall.restart(true);
      },
          _onMove = function _onMove(e) {
        if (_ignoreCheck(e)) {
          return;
        }

        var x = e.clientX,
            y = e.clientY,
            dx = x - self.x,
            dy = y - self.y;
        self.x = x;
        self.y = y;
        moved = true;
        (dx || dy) && onTouchOrPointerDelta(dx, dy);
      },
          _onHover = function _onHover(e) {
        self.event = e;
        onHover(self);
      },
          _onHoverEnd = function _onHoverEnd(e) {
        self.event = e;
        onHoverEnd(self);
      },
          _onClick = function _onClick(e) {
        return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
      };

      onStopDelayedCall = self._dc = gsap.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
      self.deltaX = self.deltaY = 0;
      self._vx = _getVelocityProp(0, 50, true);
      self._vy = _getVelocityProp(0, 50, true);
      self.scrollX = scrollFuncX;
      self.scrollY = scrollFuncY;
      self.isDragging = self.isGesturing = self.isPressed = false;

      self.enable = function (e) {
        if (!self.isEnabled) {
          _addListener(isViewport ? ownerDoc : target, "scroll", _onScroll);

          type.indexOf("scroll") >= 0 && _addListener(isViewport ? ownerDoc : target, "scroll", onScroll, preventDefault, capture);
          type.indexOf("wheel") >= 0 && _addListener(target, "wheel", _onWheel, preventDefault, capture);

          if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
            _addListener(target, _eventTypes[0], _onPress, preventDefault, capture);

            _addListener(ownerDoc, _eventTypes[2], _onRelease);

            _addListener(ownerDoc, _eventTypes[3], _onRelease);

            allowClicks && _addListener(target, "click", clickCapture, false, true);
            onClick && _addListener(target, "click", _onClick);
            onGestureStart && _addListener(ownerDoc, "gesturestart", _onGestureStart);
            onGestureEnd && _addListener(ownerDoc, "gestureend", _onGestureEnd);
            onHover && _addListener(target, _pointerType + "enter", _onHover);
            onHoverEnd && _addListener(target, _pointerType + "leave", _onHoverEnd);
            onMove && _addListener(target, _pointerType + "move", _onMove);
          }

          self.isEnabled = true;
          e && e.type && _onPress(e);
          onEnable && onEnable(self);
        }

        return self;
      };

      self.disable = function () {
        if (self.isEnabled) {
          _observers.filter(function (o) {
            return o !== self && _isViewport(o.target);
          }).length || _removeListener(isViewport ? ownerDoc : target, "scroll", _onScroll);

          if (self.isPressed) {
            self._vx.reset();

            self._vy.reset();

            _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
          }

          _removeListener(isViewport ? ownerDoc : target, "scroll", onScroll, capture);

          _removeListener(target, "wheel", _onWheel, capture);

          _removeListener(target, _eventTypes[0], _onPress, capture);

          _removeListener(ownerDoc, _eventTypes[2], _onRelease);

          _removeListener(ownerDoc, _eventTypes[3], _onRelease);

          _removeListener(target, "click", clickCapture, true);

          _removeListener(target, "click", _onClick);

          _removeListener(ownerDoc, "gesturestart", _onGestureStart);

          _removeListener(ownerDoc, "gestureend", _onGestureEnd);

          _removeListener(target, _pointerType + "enter", _onHover);

          _removeListener(target, _pointerType + "leave", _onHoverEnd);

          _removeListener(target, _pointerType + "move", _onMove);

          self.isEnabled = self.isPressed = self.isDragging = false;
          onDisable && onDisable(self);
        }
      };

      self.kill = function () {
        self.disable();

        var i = _observers.indexOf(self);

        i >= 0 && _observers.splice(i, 1);
        _normalizer === self && (_normalizer = 0);
      };

      _observers.push(self);

      isNormalizer && _isViewport(target) && (_normalizer = self);
      self.enable(event);
    };

    _createClass(Observer, [{
      key: "velocityX",
      get: function get() {
        return this._vx.getVelocity();
      }
    }, {
      key: "velocityY",
      get: function get() {
        return this._vy.getVelocity();
      }
    }]);

    return Observer;
  }();
  Observer.version = "3.10.4";

  Observer.create = function (vars) {
    return new Observer(vars);
  };

  Observer.register = _initCore;

  Observer.getAll = function () {
    return _observers.slice();
  };

  Observer.getById = function (id) {
    return _observers.filter(function (o) {
      return o.vars.id === id;
    })[0];
  };

  _getGSAP() && gsap.registerPlugin(Observer);

  /*!
   * ScrollTrigger 3.10.4
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */

  var gsap$1,
      _coreInitted$1,
      _win$1,
      _doc$1,
      _docEl$1,
      _body$1,
      _root$1,
      _resizeDelay,
      _toArray,
      _clamp$1,
      _time2,
      _syncInterval,
      _refreshing,
      _pointerIsDown,
      _transformProp,
      _i,
      _prevWidth,
      _prevHeight,
      _autoRefresh,
      _sort,
      _suppressOverwrites,
      _ignoreResize,
      _normalizer$1,
      _ignoreMobileResize,
      _baseScreenHeight,
      _baseScreenWidth,
      _fixIOSBug,
      _limitCallbacks,
      _startup$1 = 1,
      _getTime$1 = Date.now,
      _time1 = _getTime$1(),
      _lastScrollTime = 0,
      _enabled = 0,
      _pointerDownHandler = function _pointerDownHandler() {
    return _pointerIsDown = 1;
  },
      _pointerUpHandler = function _pointerUpHandler() {
    return _pointerIsDown = 0;
  },
      _passThrough = function _passThrough(v) {
    return v;
  },
      _round = function _round(value) {
    return Math.round(value * 100000) / 100000 || 0;
  },
      _windowExists = function _windowExists() {
    return typeof window !== "undefined";
  },
      _getGSAP$1 = function _getGSAP() {
    return gsap$1 || _windowExists() && (gsap$1 = window.gsap) && gsap$1.registerPlugin && gsap$1;
  },
      _isViewport$1 = function _isViewport(e) {
    return !!~_root$1.indexOf(e);
  },
      _getBoundsFunc = function _getBoundsFunc(element) {
    return _getProxyProp(element, "getBoundingClientRect") || (_isViewport$1(element) ? function () {
      _winOffsets.width = _win$1.innerWidth;
      _winOffsets.height = _win$1.innerHeight;
      return _winOffsets;
    } : function () {
      return _getBounds(element);
    });
  },
      _getSizeFunc = function _getSizeFunc(scroller, isViewport, _ref) {
    var d = _ref.d,
        d2 = _ref.d2,
        a = _ref.a;
    return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function () {
      return a()[d];
    } : function () {
      return (isViewport ? _win$1["inner" + d2] : scroller["client" + d2]) || 0;
    };
  },
      _getOffsetsFunc = function _getOffsetsFunc(element, isViewport) {
    return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function () {
      return _winOffsets;
    };
  },
      _maxScroll = function _maxScroll(element, _ref2) {
    var s = _ref2.s,
        d2 = _ref2.d2,
        d = _ref2.d,
        a = _ref2.a;
    return (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport$1(element) ? (_docEl$1[s] || _body$1[s]) - (_win$1["inner" + d2] || _docEl$1["client" + d2] || _body$1["client" + d2]) : element[s] - element["offset" + d2];
  },
      _iterateAutoRefresh = function _iterateAutoRefresh(func, events) {
    for (var i = 0; i < _autoRefresh.length; i += 3) {
      (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
    }
  },
      _isString = function _isString(value) {
    return typeof value === "string";
  },
      _isFunction = function _isFunction(value) {
    return typeof value === "function";
  },
      _isNumber = function _isNumber(value) {
    return typeof value === "number";
  },
      _isObject = function _isObject(value) {
    return typeof value === "object";
  },
      _callIfFunc = function _callIfFunc(value) {
    return _isFunction(value) && value();
  },
      _combineFunc = function _combineFunc(f1, f2) {
    return function () {
      var result1 = _callIfFunc(f1),
          result2 = _callIfFunc(f2);

      return function () {
        _callIfFunc(result1);

        _callIfFunc(result2);
      };
    };
  },
      _endAnimation = function _endAnimation(animation, reversed, pause) {
    return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
  },
      _callback = function _callback(self, func) {
    if (self.enabled) {
      var result = func(self);
      result && result.totalTime && (self.callbackAnimation = result);
    }
  },
      _abs = Math.abs,
      _left = "left",
      _top = "top",
      _right = "right",
      _bottom = "bottom",
      _width = "width",
      _height = "height",
      _Right = "Right",
      _Left = "Left",
      _Top = "Top",
      _Bottom = "Bottom",
      _padding = "padding",
      _margin = "margin",
      _Width = "Width",
      _Height = "Height",
      _px = "px",
      _getComputedStyle = function _getComputedStyle(element) {
    return _win$1.getComputedStyle(element);
  },
      _makePositionable = function _makePositionable(element) {
    var position = _getComputedStyle(element).position;

    element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
  },
      _setDefaults = function _setDefaults(obj, defaults) {
    for (var p in defaults) {
      p in obj || (obj[p] = defaults[p]);
    }

    return obj;
  },
      _getBounds = function _getBounds(element, withoutTransforms) {
    var tween = withoutTransforms && _getComputedStyle(element)[_transformProp] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap$1.to(element, {
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0
    }).progress(1),
        bounds = element.getBoundingClientRect();
    tween && tween.progress(0).kill();
    return bounds;
  },
      _getSize = function _getSize(element, _ref3) {
    var d2 = _ref3.d2;
    return element["offset" + d2] || element["client" + d2] || 0;
  },
      _getLabelRatioArray = function _getLabelRatioArray(timeline) {
    var a = [],
        labels = timeline.labels,
        duration = timeline.duration(),
        p;

    for (p in labels) {
      a.push(labels[p] / duration);
    }

    return a;
  },
      _getClosestLabel = function _getClosestLabel(animation) {
    return function (value) {
      return gsap$1.utils.snap(_getLabelRatioArray(animation), value);
    };
  },
      _snapDirectional = function _snapDirectional(snapIncrementOrArray) {
    var snap = gsap$1.utils.snap(snapIncrementOrArray),
        a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function (a, b) {
      return a - b;
    });
    return a ? function (value, direction, threshold) {
      if (threshold === void 0) {
        threshold = 1e-3;
      }

      var i;

      if (!direction) {
        return snap(value);
      }

      if (direction > 0) {
        value -= threshold;

        for (i = 0; i < a.length; i++) {
          if (a[i] >= value) {
            return a[i];
          }
        }

        return a[i - 1];
      } else {
        i = a.length;
        value += threshold;

        while (i--) {
          if (a[i] <= value) {
            return a[i];
          }
        }
      }

      return a[0];
    } : function (value, direction, threshold) {
      if (threshold === void 0) {
        threshold = 1e-3;
      }

      var snapped = snap(value);
      return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
    };
  },
      _getLabelAtDirection = function _getLabelAtDirection(timeline) {
    return function (value, st) {
      return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
    };
  },
      _multiListener = function _multiListener(func, element, types, callback) {
    return types.split(",").forEach(function (type) {
      return func(element, type, callback);
    });
  },
      _addListener$1 = function _addListener(element, type, func, nonPassive, capture) {
    return element.addEventListener(type, func, {
      passive: !nonPassive,
      capture: !!capture
    });
  },
      _removeListener$1 = function _removeListener(element, type, func, capture) {
    return element.removeEventListener(type, func, !!capture);
  },
      _wheelListener = function _wheelListener(func, el, scrollFunc) {
    return scrollFunc && scrollFunc.wheelHandler && func(el, "wheel", scrollFunc);
  },
      _markerDefaults = {
    startColor: "green",
    endColor: "red",
    indent: 0,
    fontSize: "16px",
    fontWeight: "normal"
  },
      _defaults = {
    toggleActions: "play",
    anticipatePin: 0
  },
      _keywords = {
    top: 0,
    left: 0,
    center: 0.5,
    bottom: 1,
    right: 1
  },
      _offsetToPx = function _offsetToPx(value, size) {
    if (_isString(value)) {
      var eqIndex = value.indexOf("="),
          relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;

      if (~eqIndex) {
        value.indexOf("%") > eqIndex && (relative *= size / 100);
        value = value.substr(0, eqIndex - 1);
      }

      value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
    }

    return value;
  },
      _createMarker = function _createMarker(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
    var startColor = _ref4.startColor,
        endColor = _ref4.endColor,
        fontSize = _ref4.fontSize,
        indent = _ref4.indent,
        fontWeight = _ref4.fontWeight;

    var e = _doc$1.createElement("div"),
        useFixedPosition = _isViewport$1(container) || _getProxyProp(container, "pinType") === "fixed",
        isScroller = type.indexOf("scroller") !== -1,
        parent = useFixedPosition ? _body$1 : container,
        isStart = type.indexOf("start") !== -1,
        color = isStart ? startColor : endColor,
        css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";

    css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
    (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
    matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
    e._isStart = isStart;
    e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
    e.style.cssText = css;
    e.innerText = name || name === 0 ? type + "-" + name : type;
    parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
    e._offset = e["offset" + direction.op.d2];

    _positionMarker(e, 0, direction, isStart);

    return e;
  },
      _positionMarker = function _positionMarker(marker, start, direction, flipped) {
    var vars = {
      display: "block"
    },
        side = direction[flipped ? "os2" : "p2"],
        oppositeSide = direction[flipped ? "p2" : "os2"];
    marker._isFlipped = flipped;
    vars[direction.a + "Percent"] = flipped ? -100 : 0;
    vars[direction.a] = flipped ? "1px" : 0;
    vars["border" + side + _Width] = 1;
    vars["border" + oppositeSide + _Width] = 0;
    vars[direction.p] = start + "px";
    gsap$1.set(marker, vars);
  },
      _triggers = [],
      _ids = {},
      _rafID,
      _sync = function _sync() {
    return _getTime$1() - _lastScrollTime > 34 && _updateAll();
  },
      _onScroll$1 = function _onScroll() {
    if (!_normalizer$1 || !_normalizer$1.isPressed || _normalizer$1.startX > _body$1.clientWidth) {
      _scrollers.cache++;
      _rafID || (_rafID = requestAnimationFrame(_updateAll));
      _lastScrollTime || _dispatch("scrollStart");
      _lastScrollTime = _getTime$1();
    }
  },
      _setBaseDimensions = function _setBaseDimensions() {
    _baseScreenWidth = _win$1.innerWidth;
    _baseScreenHeight = _win$1.innerHeight;
  },
      _onResize = function _onResize() {
    _scrollers.cache++;
    !_refreshing && !_ignoreResize && !_doc$1.fullscreenElement && !_doc$1.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win$1.innerWidth || Math.abs(_win$1.innerHeight - _baseScreenHeight) > _win$1.innerHeight * 0.25) && _resizeDelay.restart(true);
  },
      _listeners = {},
      _emptyArray = [],
      _media = [],
      _creatingMedia,
      _lastMediaTick,
      _onMediaChange = function _onMediaChange(e) {
    var tick = gsap$1.ticker.frame,
        matches = [],
        i = 0,
        index;

    if (_lastMediaTick !== tick || _startup$1) {
      _revertAll();

      for (; i < _media.length; i += 4) {
        index = _win$1.matchMedia(_media[i]).matches;

        if (index !== _media[i + 3]) {
          _media[i + 3] = index;
          index ? matches.push(i) : _revertAll(1, _media[i]) || _isFunction(_media[i + 2]) && _media[i + 2]();
        }
      }

      _revertRecorded();

      for (i = 0; i < matches.length; i++) {
        index = matches[i];
        _creatingMedia = _media[index];
        _media[index + 2] = _media[index + 1](e);
      }

      _creatingMedia = 0;
      _coreInitted$1 && _refreshAll(0, 1);
      _lastMediaTick = tick;

      _dispatch("matchMedia");
    }
  },
      _softRefresh = function _softRefresh() {
    return _removeListener$1(ScrollTrigger$1, "scrollEnd", _softRefresh) || _refreshAll(true);
  },
      _dispatch = function _dispatch(type) {
    return _listeners[type] && _listeners[type].map(function (f) {
      return f();
    }) || _emptyArray;
  },
      _savedStyles = [],
      _revertRecorded = function _revertRecorded(media) {
    for (var i = 0; i < _savedStyles.length; i += 5) {
      if (!media || _savedStyles[i + 4] === media) {
        _savedStyles[i].style.cssText = _savedStyles[i + 1];
        _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
        _savedStyles[i + 3].uncache = 1;
      }
    }
  },
      _revertAll = function _revertAll(kill, media) {
    var trigger;

    for (_i = 0; _i < _triggers.length; _i++) {
      trigger = _triggers[_i];

      if (!media || trigger.media === media) {
        if (kill) {
          trigger.kill(1);
        } else {
          trigger.revert();
        }
      }
    }

    media && _revertRecorded(media);
    media || _dispatch("revert");
  },
      _clearScrollMemory = function _clearScrollMemory() {
    return _scrollers.cache++ && _scrollers.forEach(function (obj) {
      return typeof obj === "function" && (obj.rec = 0);
    });
  },
      _refreshingAll,
      _refreshID = 0,
      _refreshAll = function _refreshAll(force, skipRevert) {
    if (_lastScrollTime && !force) {
      _addListener$1(ScrollTrigger$1, "scrollEnd", _softRefresh);

      return;
    }

    _refreshingAll = true;

    var refreshInits = _dispatch("refreshInit");

    _sort && ScrollTrigger$1.sort();
    skipRevert || _revertAll();

    _triggers.slice(0).forEach(function (t) {
      return t.refresh();
    });

    _triggers.forEach(function (t) {
      return t.vars.end === "max" && t.setPositions(t.start, _maxScroll(t.scroller, t._dir));
    });

    refreshInits.forEach(function (result) {
      return result && result.render && result.render(-1);
    });

    _clearScrollMemory();

    _resizeDelay.pause();

    _refreshID++;
    _refreshingAll = false;

    _dispatch("refresh");
  },
      _lastScroll = 0,
      _direction = 1,
      _primary,
      _updateAll = function _updateAll() {
    if (!_refreshingAll) {
      ScrollTrigger$1.isUpdating = true;
      _primary && _primary.update(0);

      var l = _triggers.length,
          time = _getTime$1(),
          recordVelocity = time - _time1 >= 50,
          scroll = l && _triggers[0].scroll();

      _direction = _lastScroll > scroll ? -1 : 1;
      _lastScroll = scroll;

      if (recordVelocity) {
        if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
          _lastScrollTime = 0;

          _dispatch("scrollEnd");
        }

        _time2 = _time1;
        _time1 = time;
      }

      if (_direction < 0) {
        _i = l;

        while (_i-- > 0) {
          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
        }

        _direction = 1;
      } else {
        for (_i = 0; _i < l; _i++) {
          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
        }
      }

      ScrollTrigger$1.isUpdating = false;
    }

    _rafID = 0;
  },
      _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
      _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]),
      _swapPinOut = function _swapPinOut(pin, spacer, state) {
    _setState(state);

    var cache = pin._gsap;

    if (cache.spacerIsNative) {
      _setState(cache.spacerState);
    } else if (pin.parentNode === spacer) {
      var parent = spacer.parentNode;

      if (parent) {
        parent.insertBefore(pin, spacer);
        parent.removeChild(spacer);
      }
    }
  },
      _swapPinIn = function _swapPinIn(pin, spacer, cs, spacerState) {
    if (pin.parentNode !== spacer) {
      var i = _propNamesToCopy.length,
          spacerStyle = spacer.style,
          pinStyle = pin.style,
          p;

      while (i--) {
        p = _propNamesToCopy[i];
        spacerStyle[p] = cs[p];
      }

      spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
      cs.display === "inline" && (spacerStyle.display = "inline-block");
      pinStyle[_bottom] = pinStyle[_right] = spacerStyle.flexBasis = "auto";
      spacerStyle.overflow = "visible";
      spacerStyle.boxSizing = "border-box";
      spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
      spacerStyle[_height] = _getSize(pin, _vertical) + _px;
      spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";

      _setState(spacerState);

      pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
      pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
      pinStyle[_padding] = cs[_padding];
      pin.parentNode.insertBefore(spacer, pin);
      spacer.appendChild(pin);
    }
  },
      _capsExp = /([A-Z])/g,
      _setState = function _setState(state) {
    if (state) {
      var style = state.t.style,
          l = state.length,
          i = 0,
          p,
          value;
      (state.t._gsap || gsap$1.core.getCache(state.t)).uncache = 1;

      for (; i < l; i += 2) {
        value = state[i + 1];
        p = state[i];

        if (value) {
          style[p] = value;
        } else if (style[p]) {
          style.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
        }
      }
    }
  },
      _getState = function _getState(element) {
    var l = _stateProps.length,
        style = element.style,
        state = [],
        i = 0;

    for (; i < l; i++) {
      state.push(_stateProps[i], style[_stateProps[i]]);
    }

    state.t = element;
    return state;
  },
      _copyState = function _copyState(state, override, omitOffsets) {
    var result = [],
        l = state.length,
        i = omitOffsets ? 8 : 0,
        p;

    for (; i < l; i += 2) {
      p = state[i];
      result.push(p, p in override ? override[p] : state[i + 1]);
    }

    result.t = state.t;
    return result;
  },
      _winOffsets = {
    left: 0,
    top: 0
  },
      _parsePosition = function _parsePosition(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation) {
    _isFunction(value) && (value = value(self));

    if (_isString(value) && value.substr(0, 3) === "max") {
      value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
    }

    var time = containerAnimation ? containerAnimation.time() : 0,
        p1,
        p2,
        element;
    containerAnimation && containerAnimation.seek(0);

    if (!_isNumber(value)) {
      _isFunction(trigger) && (trigger = trigger(self));
      var offsets = value.split(" "),
          bounds,
          localOffset,
          globalOffset,
          display;
      element = _getTarget(trigger) || _body$1;
      bounds = _getBounds(element) || {};

      if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
        display = element.style.display;
        element.style.display = "block";
        bounds = _getBounds(element);
        display ? element.style.display = display : element.style.removeProperty("display");
      }

      localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
      globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
      value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
      markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
      scrollerSize -= scrollerSize - globalOffset;
    } else if (markerScroller) {
      _positionMarker(markerScroller, scrollerSize, direction, true);
    }

    if (marker) {
      var position = value + scrollerSize,
          isStart = marker._isStart;
      p1 = "scroll" + direction.d2;

      _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body$1[p1], _docEl$1[p1]) : marker.parentNode[p1]) <= position + 1);

      if (useFixedPosition) {
        scrollerBounds = _getBounds(markerScroller);
        useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
      }
    }

    if (containerAnimation && element) {
      p1 = _getBounds(element);
      containerAnimation.seek(scrollerMax);
      p2 = _getBounds(element);
      containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
      value = value / containerAnimation._caScrollDist * scrollerMax;
    }

    containerAnimation && containerAnimation.seek(time);
    return containerAnimation ? value : Math.round(value);
  },
      _prefixExp = /(webkit|moz|length|cssText|inset)/i,
      _reparent = function _reparent(element, parent, top, left) {
    if (element.parentNode !== parent) {
      var style = element.style,
          p,
          cs;

      if (parent === _body$1) {
        element._stOrig = style.cssText;
        cs = _getComputedStyle(element);

        for (p in cs) {
          if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
            style[p] = cs[p];
          }
        }

        style.top = top;
        style.left = left;
      } else {
        style.cssText = element._stOrig;
      }

      gsap$1.core.getCache(element).uncache = 1;
      parent.appendChild(element);
    }
  },
      _getTweenCreator = function _getTweenCreator(scroller, direction) {
    var getScroll = _getScrollFunc(scroller, direction),
        prop = "_scroll" + direction.p2,
        lastScroll1,
        lastScroll2,
        getTween = function getTween(scrollTo, vars, initialValue, change1, change2) {
      var tween = getTween.tween,
          onComplete = vars.onComplete,
          modifiers = {};
      initialValue = initialValue || getScroll();
      change2 = change1 && change2 || 0;
      change1 = change1 || scrollTo - initialValue;
      tween && tween.kill();
      lastScroll1 = Math.round(initialValue);
      vars[prop] = scrollTo;
      vars.modifiers = modifiers;

      modifiers[prop] = function (value) {
        value = _round(getScroll());

        if (value !== lastScroll1 && value !== lastScroll2 && Math.abs(value - lastScroll1) > 2 && Math.abs(value - lastScroll2) > 2) {
          tween.kill();
          getTween.tween = 0;
        } else {
          value = initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio;
        }

        lastScroll2 = lastScroll1;
        return lastScroll1 = _round(value);
      };

      vars.onComplete = function () {
        getTween.tween = 0;
        onComplete && onComplete.call(tween);
      };

      tween = getTween.tween = gsap$1.to(scroller, vars);
      return tween;
    };

    scroller[prop] = getScroll;

    getScroll.wheelHandler = function () {
      return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
    };

    _addListener$1(scroller, "wheel", getScroll.wheelHandler);

    return getTween;
  };

  var ScrollTrigger$1 = function () {
    function ScrollTrigger(vars, animation) {
      _coreInitted$1 || ScrollTrigger.register(gsap$1) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
      this.init(vars, animation);
    }

    var _proto = ScrollTrigger.prototype;

    _proto.init = function init(vars, animation) {
      this.progress = this.start = 0;
      this.vars && this.kill(true, true);

      if (!_enabled) {
        this.update = this.refresh = this.kill = _passThrough;
        return;
      }

      vars = _setDefaults(_isString(vars) || _isNumber(vars) || vars.nodeType ? {
        trigger: vars
      } : vars, _defaults);

      var _vars = vars,
          onUpdate = _vars.onUpdate,
          toggleClass = _vars.toggleClass,
          id = _vars.id,
          onToggle = _vars.onToggle,
          onRefresh = _vars.onRefresh,
          scrub = _vars.scrub,
          trigger = _vars.trigger,
          pin = _vars.pin,
          pinSpacing = _vars.pinSpacing,
          invalidateOnRefresh = _vars.invalidateOnRefresh,
          anticipatePin = _vars.anticipatePin,
          onScrubComplete = _vars.onScrubComplete,
          onSnapComplete = _vars.onSnapComplete,
          once = _vars.once,
          snap = _vars.snap,
          pinReparent = _vars.pinReparent,
          pinSpacer = _vars.pinSpacer,
          containerAnimation = _vars.containerAnimation,
          fastScrollEnd = _vars.fastScrollEnd,
          preventOverlaps = _vars.preventOverlaps,
          direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical,
          isToggle = !scrub && scrub !== 0,
          scroller = _getTarget(vars.scroller || _win$1),
          scrollerCache = gsap$1.core.getCache(scroller),
          isViewport = _isViewport$1(scroller),
          useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed",
          callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack],
          toggleActions = isToggle && vars.toggleActions.split(" "),
          markers = "markers" in vars ? vars.markers : _defaults.markers,
          borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0,
          self = this,
          onRefreshInit = vars.onRefreshInit && function () {
        return vars.onRefreshInit(self);
      },
          getScrollerSize = _getSizeFunc(scroller, isViewport, direction),
          getScrollerOffsets = _getOffsetsFunc(scroller, isViewport),
          lastSnap = 0,
          lastRefresh = 0,
          scrollFunc = _getScrollFunc(scroller, direction),
          tweenTo,
          pinCache,
          snapFunc,
          scroll1,
          scroll2,
          start,
          end,
          markerStart,
          markerEnd,
          markerStartTrigger,
          markerEndTrigger,
          markerVars,
          change,
          pinOriginalState,
          pinActiveState,
          pinState,
          spacer,
          offset,
          pinGetter,
          pinSetter,
          pinStart,
          pinChange,
          spacingStart,
          spacerState,
          markerStartSetter,
          markerEndSetter,
          cs,
          snap1,
          snap2,
          scrubTween,
          scrubSmooth,
          snapDurClamp,
          snapDelayedCall,
          prevProgress,
          prevScroll,
          prevAnimProgress,
          caMarkerSetter,
          customRevertReturn;

      self.media = _creatingMedia;
      self._dir = direction;
      anticipatePin *= 45;
      self.scroller = scroller;
      self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
      scroll1 = scrollFunc();
      self.vars = vars;
      animation = animation || vars.animation;

      if ("refreshPriority" in vars) {
        _sort = 1;
        vars.refreshPriority === -9999 && (_primary = self);
      }

      scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
        top: _getTweenCreator(scroller, _vertical),
        left: _getTweenCreator(scroller, _horizontal)
      };
      self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];

      self.scrubDuration = function (value) {
        scrubSmooth = _isNumber(value) && value;

        if (!scrubSmooth) {
          scrubTween && scrubTween.progress(1).kill();
          scrubTween = 0;
        } else {
          scrubTween ? scrubTween.duration(value) : scrubTween = gsap$1.to(animation, {
            ease: "expo",
            totalProgress: "+=0.001",
            duration: scrubSmooth,
            paused: true,
            onComplete: function onComplete() {
              return onScrubComplete && onScrubComplete(self);
            }
          });
        }
      };

      if (animation) {
        animation.vars.lazy = false;
        animation._initted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.render(0, true, true);
        self.animation = animation.pause();
        animation.scrollTrigger = self;
        self.scrubDuration(scrub);
        snap1 = 0;
        id || (id = animation.vars.id);
      }

      _triggers.push(self);

      if (snap) {
        if (!_isObject(snap) || snap.push) {
          snap = {
            snapTo: snap
          };
        }

        "scrollBehavior" in _body$1.style && gsap$1.set(isViewport ? [_body$1, _docEl$1] : scroller, {
          scrollBehavior: "auto"
        });
        snapFunc = _isFunction(snap.snapTo) ? snap.snapTo : snap.snapTo === "labels" ? _getClosestLabel(animation) : snap.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap.directional !== false ? function (value, st) {
          return _snapDirectional(snap.snapTo)(value, _getTime$1() - lastRefresh < 500 ? 0 : st.direction);
        } : gsap$1.utils.snap(snap.snapTo);
        snapDurClamp = snap.duration || {
          min: 0.1,
          max: 2
        };
        snapDurClamp = _isObject(snapDurClamp) ? _clamp$1(snapDurClamp.min, snapDurClamp.max) : _clamp$1(snapDurClamp, snapDurClamp);
        snapDelayedCall = gsap$1.delayedCall(snap.delay || scrubSmooth / 2 || 0.1, function () {
          var scroll = scrollFunc(),
              refreshedRecently = _getTime$1() - lastRefresh < 500,
              tween = tweenTo.tween;

          if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
            var progress = (scroll - start) / change,
                totalProgress = animation && !isToggle ? animation.totalProgress() : progress,
                velocity = refreshedRecently ? 0 : (totalProgress - snap2) / (_getTime$1() - _time2) * 1000 || 0,
                change1 = gsap$1.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185),
                naturalEnd = progress + (snap.inertia === false ? 0 : change1),
                endValue = _clamp$1(0, 1, snapFunc(naturalEnd, self)),
                endScroll = Math.round(start + endValue * change),
                _snap = snap,
                onStart = _snap.onStart,
                _onInterrupt = _snap.onInterrupt,
                _onComplete = _snap.onComplete;

            if (scroll <= end && scroll >= start && endScroll !== scroll) {
              if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
                return;
              }

              if (snap.inertia === false) {
                change1 = endValue - progress;
              }

              tweenTo(endScroll, {
                duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
                ease: snap.ease || "power3",
                data: _abs(endScroll - scroll),
                onInterrupt: function onInterrupt() {
                  return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
                },
                onComplete: function onComplete() {
                  self.update();
                  lastSnap = scrollFunc();
                  snap1 = snap2 = animation && !isToggle ? animation.totalProgress() : self.progress;
                  onSnapComplete && onSnapComplete(self);
                  _onComplete && _onComplete(self);
                }
              }, scroll, change1 * change, endScroll - scroll - change1 * change);
              onStart && onStart(self, tweenTo.tween);
            }
          } else if (self.isActive && lastSnap !== scroll) {
            snapDelayedCall.restart(true);
          }
        }).pause();
      }

      id && (_ids[id] = self);
      trigger = self.trigger = _getTarget(trigger || pin);
      customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
      customRevertReturn && (customRevertReturn = customRevertReturn(self));
      pin = pin === true ? trigger : _getTarget(pin);
      _isString(toggleClass) && (toggleClass = {
        targets: trigger,
        className: toggleClass
      });

      if (pin) {
        pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding);
        self.pin = pin;
        vars.force3D !== false && gsap$1.set(pin, {
          force3D: true
        });
        pinCache = gsap$1.core.getCache(pin);

        if (!pinCache.spacer) {
          if (pinSpacer) {
            pinSpacer = _getTarget(pinSpacer);
            pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
            pinCache.spacerIsNative = !!pinSpacer;
            pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
          }

          pinCache.spacer = spacer = pinSpacer || _doc$1.createElement("div");
          spacer.classList.add("pin-spacer");
          id && spacer.classList.add("pin-spacer-" + id);
          pinCache.pinState = pinOriginalState = _getState(pin);
        } else {
          pinOriginalState = pinCache.pinState;
        }

        self.spacer = spacer = pinCache.spacer;
        cs = _getComputedStyle(pin);
        spacingStart = cs[pinSpacing + direction.os2];
        pinGetter = gsap$1.getProperty(pin);
        pinSetter = gsap$1.quickSetter(pin, direction.a, _px);

        _swapPinIn(pin, spacer, cs);

        pinState = _getState(pin);
      }

      if (markers) {
        markerVars = _isObject(markers) ? _setDefaults(markers, _markerDefaults) : _markerDefaults;
        markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
        markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
        offset = markerStartTrigger["offset" + direction.op.d2];

        var content = _getTarget(_getProxyProp(scroller, "content") || scroller);

        markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
        markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
        containerAnimation && (caMarkerSetter = gsap$1.quickSetter([markerStart, markerEnd], direction.a, _px));

        if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
          _makePositionable(isViewport ? _body$1 : scroller);

          gsap$1.set([markerStartTrigger, markerEndTrigger], {
            force3D: true
          });
          markerStartSetter = gsap$1.quickSetter(markerStartTrigger, direction.a, _px);
          markerEndSetter = gsap$1.quickSetter(markerEndTrigger, direction.a, _px);
        }
      }

      if (containerAnimation) {
        var oldOnUpdate = containerAnimation.vars.onUpdate,
            oldParams = containerAnimation.vars.onUpdateParams;
        containerAnimation.eventCallback("onUpdate", function () {
          self.update(0, 0, 1);
          oldOnUpdate && oldOnUpdate.apply(oldParams || []);
        });
      }

      self.previous = function () {
        return _triggers[_triggers.indexOf(self) - 1];
      };

      self.next = function () {
        return _triggers[_triggers.indexOf(self) + 1];
      };

      self.revert = function (revert) {
        var r = revert !== false || !self.enabled,
            prevRefreshing = _refreshing;

        if (r !== self.isReverted) {
          if (r) {
            self.scroll.rec || !_refreshing || !_refreshingAll || (self.scroll.rec = scrollFunc());
            prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0);
            prevProgress = self.progress;
            prevAnimProgress = animation && animation.progress();
          }

          markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
            return m.style.display = r ? "none" : "block";
          });
          r && (_refreshing = 1);
          self.update(r);
          _refreshing = prevRefreshing;
          pin && (r ? _swapPinOut(pin, spacer, pinOriginalState) : (!pinReparent || !self.isActive) && _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState));
          self.isReverted = r;
        }
      };

      self.refresh = function (soft, force) {
        if ((_refreshing || !self.enabled) && !force) {
          return;
        }

        if (pin && soft && _lastScrollTime) {
          _addListener$1(ScrollTrigger, "scrollEnd", _softRefresh);

          return;
        }

        !_refreshingAll && onRefreshInit && onRefreshInit(self);
        _refreshing = 1;
        lastRefresh = _getTime$1();

        if (tweenTo.tween) {
          tweenTo.tween.kill();
          tweenTo.tween = 0;
        }

        scrubTween && scrubTween.pause();
        invalidateOnRefresh && animation && animation.time(-0.01, true).invalidate();
        self.isReverted || self.revert();

        var size = getScrollerSize(),
            scrollerBounds = getScrollerOffsets(),
            max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction),
            offset = 0,
            otherPinOffset = 0,
            parsedEnd = vars.end,
            parsedEndTrigger = vars.endTrigger || trigger,
            parsedStart = vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"),
            pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer),
            triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0,
            i = triggerIndex,
            cs,
            bounds,
            scroll,
            isVertical,
            override,
            curTrigger,
            curPin,
            oppositeScroll,
            initted,
            revertedPins;

        while (i--) {
          curTrigger = _triggers[i];
          curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = 1);
          curPin = curTrigger.pin;

          if (curPin && (curPin === trigger || curPin === pin) && !curTrigger.isReverted) {
            revertedPins || (revertedPins = []);
            revertedPins.unshift(curTrigger);
            curTrigger.revert();
          }

          if (curTrigger !== _triggers[i]) {
            triggerIndex--;
            i--;
          }
        }

        _isFunction(parsedStart) && (parsedStart = parsedStart(self));
        start = _parsePosition(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation) || (pin ? -0.001 : 0);
        _isFunction(parsedEnd) && (parsedEnd = parsedEnd(self));

        if (_isString(parsedEnd) && !parsedEnd.indexOf("+=")) {
          if (~parsedEnd.indexOf(" ")) {
            parsedEnd = (_isString(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
          } else {
            offset = _offsetToPx(parsedEnd.substr(2), size);
            parsedEnd = _isString(parsedStart) ? parsedStart : start + offset;
            parsedEndTrigger = trigger;
          }
        }

        end = Math.max(start, _parsePosition(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation)) || -0.001;
        change = end - start || (start -= 0.01) && 0.001;
        offset = 0;
        i = triggerIndex;

        while (i--) {
          curTrigger = _triggers[i];
          curPin = curTrigger.pin;

          if (curPin && curTrigger.start - curTrigger._pinPush < start && !containerAnimation && curTrigger.end > 0) {
            cs = curTrigger.end - curTrigger.start;

            if ((curPin === trigger || curPin === pinnedContainer) && !_isNumber(parsedStart)) {
              offset += cs * (1 - curTrigger.progress);
            }

            curPin === pin && (otherPinOffset += cs);
          }
        }

        start += offset;
        end += offset;
        self._pinPush = otherPinOffset;

        if (markerStart && offset) {
          cs = {};
          cs[direction.a] = "+=" + offset;
          pinnedContainer && (cs[direction.p] = "-=" + scrollFunc());
          gsap$1.set([markerStart, markerEnd], cs);
        }

        if (pin) {
          cs = _getComputedStyle(pin);
          isVertical = direction === _vertical;
          scroll = scrollFunc();
          pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
          !max && end > 1 && ((isViewport ? _body$1 : scroller).style["overflow-" + direction.a] = "scroll");

          _swapPinIn(pin, spacer, cs);

          pinState = _getState(pin);
          bounds = _getBounds(pin, true);
          oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();

          if (pinSpacing) {
            spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
            spacerState.t = spacer;
            i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
            i && spacerState.push(direction.d, i + _px);

            _setState(spacerState);

            useFixedPosition && scrollFunc(prevScroll);
          }

          if (useFixedPosition) {
            override = {
              top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
              left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
              boxSizing: "border-box",
              position: "fixed"
            };
            override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
            override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
            override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
            override[_padding] = cs[_padding];
            override[_padding + _Top] = cs[_padding + _Top];
            override[_padding + _Right] = cs[_padding + _Right];
            override[_padding + _Bottom] = cs[_padding + _Bottom];
            override[_padding + _Left] = cs[_padding + _Left];
            pinActiveState = _copyState(pinOriginalState, override, pinReparent);
          }

          if (animation) {
            initted = animation._initted;

            _suppressOverwrites(1);

            animation.render(animation.duration(), true, true);
            pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
            change !== pinChange && useFixedPosition && pinActiveState.splice(pinActiveState.length - 2, 2);
            animation.render(0, true, true);
            initted || animation.invalidate();

            _suppressOverwrites(0);
          } else {
            pinChange = change;
          }
        } else if (trigger && scrollFunc() && !containerAnimation) {
          bounds = trigger.parentNode;

          while (bounds && bounds !== _body$1) {
            if (bounds._pinOffset) {
              start -= bounds._pinOffset;
              end -= bounds._pinOffset;
            }

            bounds = bounds.parentNode;
          }
        }

        revertedPins && revertedPins.forEach(function (t) {
          return t.revert(false);
        });
        self.start = start;
        self.end = end;
        scroll1 = scroll2 = scrollFunc();

        if (!containerAnimation) {
          scroll1 < prevScroll && scrollFunc(prevScroll);
          self.scroll.rec = 0;
        }

        self.revert(false);

        if (snapDelayedCall) {
          lastSnap = -1;
          self.isActive && scrollFunc(start + change * prevProgress);
          snapDelayedCall.restart(true);
        }

        _refreshing = 0;
        animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress, true).render(animation.time(), true, true);

        if (prevProgress !== self.progress || containerAnimation) {
          animation && !isToggle && animation.totalProgress(prevProgress, true);
          self.progress = prevProgress;
          self.update(0, 0, 1);
        }

        pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
        onRefresh && onRefresh(self);
      };

      self.getVelocity = function () {
        return (scrollFunc() - scroll2) / (_getTime$1() - _time2) * 1000 || 0;
      };

      self.endAnimation = function () {
        _endAnimation(self.callbackAnimation);

        if (animation) {
          scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
        }
      };

      self.labelToScroll = function (label) {
        return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
      };

      self.getTrailing = function (name) {
        var i = _triggers.indexOf(self),
            a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);

        return (_isString(name) ? a.filter(function (t) {
          return t.vars.preventOverlaps === name;
        }) : a).filter(function (t) {
          return self.direction > 0 ? t.end <= start : t.start >= end;
        });
      };

      self.update = function (reset, recordVelocity, forceFake) {
        if (containerAnimation && !forceFake && !reset) {
          return;
        }

        var scroll = self.scroll(),
            p = reset ? 0 : (scroll - start) / change,
            clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0,
            prevProgress = self.progress,
            isActive,
            wasActive,
            toggleState,
            action,
            stateChanged,
            toggled,
            isAtMax,
            isTakingAction;

        if (recordVelocity) {
          scroll2 = scroll1;
          scroll1 = containerAnimation ? scrollFunc() : scroll;

          if (snap) {
            snap2 = snap1;
            snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
          }
        }

        anticipatePin && !clipped && pin && !_refreshing && !_startup$1 && _lastScrollTime && start < scroll + (scroll - scroll2) / (_getTime$1() - _time2) * anticipatePin && (clipped = 0.0001);

        if (clipped !== prevProgress && self.enabled) {
          isActive = self.isActive = !!clipped && clipped < 1;
          wasActive = !!prevProgress && prevProgress < 1;
          toggled = isActive !== wasActive;
          stateChanged = toggled || !!clipped !== !!prevProgress;
          self.direction = clipped > prevProgress ? 1 : -1;
          self.progress = clipped;

          if (stateChanged && !_refreshing) {
            toggleState = clipped && !prevProgress ? 0 : clipped === 1 ? 1 : prevProgress === 1 ? 2 : 3;

            if (isToggle) {
              action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState];
              isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
            }
          }

          preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function (t) {
            return t.endAnimation();
          }));

          if (!isToggle) {
            if (scrubTween && !_refreshing && !_startup$1) {
              (containerAnimation || _primary && _primary !== self) && scrubTween.render(scrubTween._dp._time - scrubTween._start);

              if (scrubTween.resetTo) {
                scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
              } else {
                scrubTween.vars.totalProgress = clipped;
                scrubTween.invalidate().restart();
              }
            } else if (animation) {
              animation.totalProgress(clipped, !!_refreshing);
            }
          }

          if (pin) {
            reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);

            if (!useFixedPosition) {
              pinSetter(_round(pinStart + pinChange * clipped));
            } else if (stateChanged) {
              isAtMax = !reset && clipped > prevProgress && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);

              if (pinReparent) {
                if (!reset && (isActive || isAtMax)) {
                  var bounds = _getBounds(pin, true),
                      _offset = scroll - start;

                  _reparent(pin, _body$1, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
                } else {
                  _reparent(pin, spacer);
                }
              }

              _setState(isActive || isAtMax ? pinActiveState : pinState);

              pinChange !== change && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
            }
          }

          snap && !tweenTo.tween && !_refreshing && !_startup$1 && snapDelayedCall.restart(true);
          toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function (el) {
            return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
          });
          onUpdate && !isToggle && !reset && onUpdate(self);

          if (stateChanged && !_refreshing) {
            if (isToggle) {
              if (isTakingAction) {
                if (action === "complete") {
                  animation.pause().totalProgress(1);
                } else if (action === "reset") {
                  animation.restart(true).pause();
                } else if (action === "restart") {
                  animation.restart(true);
                } else {
                  animation[action]();
                }
              }

              onUpdate && onUpdate(self);
            }

            if (toggled || !_limitCallbacks) {
              onToggle && toggled && _callback(self, onToggle);
              callbacks[toggleState] && _callback(self, callbacks[toggleState]);
              once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0);

              if (!toggled) {
                toggleState = clipped === 1 ? 1 : 3;
                callbacks[toggleState] && _callback(self, callbacks[toggleState]);
              }
            }

            if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber(fastScrollEnd) ? fastScrollEnd : 2500)) {
              _endAnimation(self.callbackAnimation);

              scrubTween ? scrubTween.progress(1) : _endAnimation(animation, !clipped, 1);
            }
          } else if (isToggle && onUpdate && !_refreshing) {
            onUpdate(self);
          }
        }

        if (markerEndSetter) {
          var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
          markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
          markerEndSetter(n);
        }

        caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
      };

      self.enable = function (reset, refresh) {
        if (!self.enabled) {
          self.enabled = true;

          _addListener$1(scroller, "resize", _onResize);

          _addListener$1(isViewport ? _doc$1 : scroller, "scroll", _onScroll$1);

          onRefreshInit && _addListener$1(ScrollTrigger, "refreshInit", onRefreshInit);

          if (reset !== false) {
            self.progress = prevProgress = 0;
            scroll1 = scroll2 = lastSnap = scrollFunc();
          }

          refresh !== false && self.refresh();
        }
      };

      self.getTween = function (snap) {
        return snap && tweenTo ? tweenTo.tween : scrubTween;
      };

      self.setPositions = function (newStart, newEnd) {
        if (pin) {
          pinStart += newStart - start;
          pinChange += newEnd - newStart - change;
        }

        self.start = start = newStart;
        self.end = end = newEnd;
        change = newEnd - newStart;
        self.update();
      };

      self.disable = function (reset, allowAnimation) {
        if (self.enabled) {
          reset !== false && self.revert();
          self.enabled = self.isActive = false;
          allowAnimation || scrubTween && scrubTween.pause();
          prevScroll = 0;
          pinCache && (pinCache.uncache = 1);
          onRefreshInit && _removeListener$1(ScrollTrigger, "refreshInit", onRefreshInit);

          if (snapDelayedCall) {
            snapDelayedCall.pause();
            tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
          }

          if (!isViewport) {
            var i = _triggers.length;

            while (i--) {
              if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
                return;
              }
            }

            _removeListener$1(scroller, "resize", _onResize);

            _removeListener$1(scroller, "scroll", _onScroll$1);
          }
        }
      };

      self.kill = function (revert, allowAnimation) {
        self.disable(revert, allowAnimation);
        scrubTween && !allowAnimation && scrubTween.kill();
        id && delete _ids[id];

        var i = _triggers.indexOf(self);

        i >= 0 && _triggers.splice(i, 1);
        i === _i && _direction > 0 && _i--;
        i = 0;

        _triggers.forEach(function (t) {
          return t.scroller === self.scroller && (i = 1);
        });

        i || (self.scroll.rec = 0);

        if (animation) {
          animation.scrollTrigger = null;
          revert && animation.render(-1);
          allowAnimation || animation.kill();
        }

        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
          return m.parentNode && m.parentNode.removeChild(m);
        });
        _primary === self && (_primary = 0);

        if (pin) {
          pinCache && (pinCache.uncache = 1);
          i = 0;

          _triggers.forEach(function (t) {
            return t.pin === pin && i++;
          });

          i || (pinCache.spacer = 0);
        }

        vars.onKill && vars.onKill(self);
      };

      self.enable(false, false);
      customRevertReturn && customRevertReturn(self);
      !animation || !animation.add || change ? self.refresh() : gsap$1.delayedCall(0.01, function () {
        return start || end || self.refresh();
      }) && (change = 0.01) && (start = end = 0);
    };

    ScrollTrigger.register = function register(core) {
      if (!_coreInitted$1) {
        gsap$1 = core || _getGSAP$1();
        _windowExists() && window.document && ScrollTrigger.enable();
        _coreInitted$1 = _enabled;
      }

      return _coreInitted$1;
    };

    ScrollTrigger.defaults = function defaults(config) {
      if (config) {
        for (var p in config) {
          _defaults[p] = config[p];
        }
      }

      return _defaults;
    };

    ScrollTrigger.disable = function disable(reset, kill) {
      _enabled = 0;

      _triggers.forEach(function (trigger) {
        return trigger[kill ? "kill" : "disable"](reset);
      });

      _removeListener$1(_win$1, "wheel", _onScroll$1);

      _removeListener$1(_doc$1, "scroll", _onScroll$1);

      clearInterval(_syncInterval);

      _removeListener$1(_doc$1, "touchcancel", _passThrough);

      _removeListener$1(_body$1, "touchstart", _passThrough);

      _multiListener(_removeListener$1, _doc$1, "pointerdown,touchstart,mousedown", _pointerDownHandler);

      _multiListener(_removeListener$1, _doc$1, "pointerup,touchend,mouseup", _pointerUpHandler);

      _resizeDelay.kill();

      _iterateAutoRefresh(_removeListener$1);

      for (var i = 0; i < _scrollers.length; i += 3) {
        _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 1]);

        _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 2]);
      }
    };

    ScrollTrigger.enable = function enable() {
      _win$1 = window;
      _doc$1 = document;
      _docEl$1 = _doc$1.documentElement;
      _body$1 = _doc$1.body;

      if (gsap$1) {
        _toArray = gsap$1.utils.toArray;
        _clamp$1 = gsap$1.utils.clamp;
        _suppressOverwrites = gsap$1.core.suppressOverwrites || _passThrough;
        gsap$1.core.globals("ScrollTrigger", ScrollTrigger);

        if (_body$1) {
          _enabled = 1;
          Observer.register(gsap$1);
          ScrollTrigger.isTouch = Observer.isTouch;
          _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);

          _addListener$1(_win$1, "wheel", _onScroll$1);

          _root$1 = [_win$1, _doc$1, _docEl$1, _body$1];
          ScrollTrigger.matchMedia({
            "(orientation: portrait)": function orientationPortrait() {
              _setBaseDimensions();

              return _setBaseDimensions;
            }
          });

          _addListener$1(_doc$1, "scroll", _onScroll$1);

          var bodyStyle = _body$1.style,
              border = bodyStyle.borderTopStyle,
              bounds,
              i;
          bodyStyle.borderTopStyle = "solid";
          bounds = _getBounds(_body$1);
          _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
          _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
          border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
          _syncInterval = setInterval(_sync, 250);
          gsap$1.delayedCall(0.5, function () {
            return _startup$1 = 0;
          });

          _addListener$1(_doc$1, "touchcancel", _passThrough);

          _addListener$1(_body$1, "touchstart", _passThrough);

          _multiListener(_addListener$1, _doc$1, "pointerdown,touchstart,mousedown", _pointerDownHandler);

          _multiListener(_addListener$1, _doc$1, "pointerup,touchend,mouseup", _pointerUpHandler);

          _transformProp = gsap$1.utils.checkPrefix("transform");

          _stateProps.push(_transformProp);

          _coreInitted$1 = _getTime$1();
          _resizeDelay = gsap$1.delayedCall(0.2, _refreshAll).pause();
          _autoRefresh = [_doc$1, "visibilitychange", function () {
            var w = _win$1.innerWidth,
                h = _win$1.innerHeight;

            if (_doc$1.hidden) {
              _prevWidth = w;
              _prevHeight = h;
            } else if (_prevWidth !== w || _prevHeight !== h) {
              _onResize();
            }
          }, _doc$1, "DOMContentLoaded", _refreshAll, _win$1, "load", _refreshAll, _win$1, "resize", _onResize];

          _iterateAutoRefresh(_addListener$1);

          _triggers.forEach(function (trigger) {
            return trigger.enable(0, 1);
          });

          for (i = 0; i < _scrollers.length; i += 3) {
            _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 1]);

            _wheelListener(_removeListener$1, _scrollers[i], _scrollers[i + 2]);
          }
        }
      }
    };

    ScrollTrigger.config = function config(vars) {
      "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
      var ms = vars.syncInterval;
      ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
      "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger.isTouch === 1 && vars.ignoreMobileResize);

      if ("autoRefreshEvents" in vars) {
        _iterateAutoRefresh(_removeListener$1) || _iterateAutoRefresh(_addListener$1, vars.autoRefreshEvents || "none");
        _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
      }
    };

    ScrollTrigger.scrollerProxy = function scrollerProxy(target, vars) {
      var t = _getTarget(target),
          i = _scrollers.indexOf(t),
          isViewport = _isViewport$1(t);

      if (~i) {
        _scrollers.splice(i, isViewport ? 6 : 2);
      }

      if (vars) {
        isViewport ? _proxies.unshift(_win$1, vars, _body$1, vars, _docEl$1, vars) : _proxies.unshift(t, vars);
      }
    };

    ScrollTrigger.matchMedia = function matchMedia(vars) {
      var mq, p, i, func, result;

      for (p in vars) {
        i = _media.indexOf(p);
        func = vars[p];
        _creatingMedia = p;

        if (p === "all") {
          func();
        } else {
          mq = _win$1.matchMedia(p);

          if (mq) {
            mq.matches && (result = func());

            if (~i) {
              _media[i + 1] = _combineFunc(_media[i + 1], func);
              _media[i + 2] = _combineFunc(_media[i + 2], result);
            } else {
              i = _media.length;

              _media.push(p, func, result);

              mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
            }

            _media[i + 3] = mq.matches;
          }
        }

        _creatingMedia = 0;
      }

      return _media;
    };

    ScrollTrigger.clearMatchMedia = function clearMatchMedia(query) {
      query || (_media.length = 0);
      query = _media.indexOf(query);
      query >= 0 && _media.splice(query, 4);
    };

    ScrollTrigger.isInViewport = function isInViewport(element, ratio, horizontal) {
      var bounds = (_isString(element) ? _getTarget(element) : element).getBoundingClientRect(),
          offset = bounds[horizontal ? _width : _height] * ratio || 0;
      return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win$1.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win$1.innerHeight;
    };

    ScrollTrigger.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
      _isString(element) && (element = _getTarget(element));
      var bounds = element.getBoundingClientRect(),
          size = bounds[horizontal ? _width : _height],
          offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
      return horizontal ? (bounds.left + offset) / _win$1.innerWidth : (bounds.top + offset) / _win$1.innerHeight;
    };

    return ScrollTrigger;
  }();
  ScrollTrigger$1.version = "3.10.4";

  ScrollTrigger$1.saveStyles = function (targets) {
    return targets ? _toArray(targets).forEach(function (target) {
      if (target && target.style) {
        var i = _savedStyles.indexOf(target);

        i >= 0 && _savedStyles.splice(i, 5);

        _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap$1.core.getCache(target), _creatingMedia);
      }
    }) : _savedStyles;
  };

  ScrollTrigger$1.revert = function (soft, media) {
    return _revertAll(!soft, media);
  };

  ScrollTrigger$1.create = function (vars, animation) {
    return new ScrollTrigger$1(vars, animation);
  };

  ScrollTrigger$1.refresh = function (safe) {
    return safe ? _onResize() : (_coreInitted$1 || ScrollTrigger$1.register()) && _refreshAll(true);
  };

  ScrollTrigger$1.update = _updateAll;
  ScrollTrigger$1.clearScrollMemory = _clearScrollMemory;

  ScrollTrigger$1.maxScroll = function (element, horizontal) {
    return _maxScroll(element, horizontal ? _horizontal : _vertical);
  };

  ScrollTrigger$1.getScrollFunc = function (element, horizontal) {
    return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
  };

  ScrollTrigger$1.getById = function (id) {
    return _ids[id];
  };

  ScrollTrigger$1.getAll = function () {
    return _triggers.filter(function (t) {
      return t.vars.id !== "ScrollSmoother";
    });
  };

  ScrollTrigger$1.isScrolling = function () {
    return !!_lastScrollTime;
  };

  ScrollTrigger$1.snapDirectional = _snapDirectional;

  ScrollTrigger$1.addEventListener = function (type, callback) {
    var a = _listeners[type] || (_listeners[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  };

  ScrollTrigger$1.removeEventListener = function (type, callback) {
    var a = _listeners[type],
        i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  };

  ScrollTrigger$1.batch = function (targets, vars) {
    var result = [],
        varsCopy = {},
        interval = vars.interval || 0.016,
        batchMax = vars.batchMax || 1e9,
        proxyCallback = function proxyCallback(type, callback) {
      var elements = [],
          triggers = [],
          delay = gsap$1.delayedCall(interval, function () {
        callback(elements, triggers);
        elements = [];
        triggers = [];
      }).pause();
      return function (self) {
        elements.length || delay.restart(true);
        elements.push(self.trigger);
        triggers.push(self);
        batchMax <= elements.length && delay.progress(1);
      };
    },
        p;

    for (p in vars) {
      varsCopy[p] = p.substr(0, 2) === "on" && _isFunction(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
    }

    if (_isFunction(batchMax)) {
      batchMax = batchMax();

      _addListener$1(ScrollTrigger$1, "refresh", function () {
        return batchMax = vars.batchMax();
      });
    }

    _toArray(targets).forEach(function (target) {
      var config = {};

      for (p in varsCopy) {
        config[p] = varsCopy[p];
      }

      config.trigger = target;
      result.push(ScrollTrigger$1.create(config));
    });

    return result;
  };

  var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier(scrollFunc, current, end, max) {
    current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
    return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
  },
      _allowNativePanning = function _allowNativePanning(target, direction) {
    if (direction === true) {
      target.style.removeProperty("touch-action");
    } else {
      target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none";
    }

    target === _docEl$1 && _allowNativePanning(_body$1, direction);
  },
      _overflow = {
    auto: 1,
    scroll: 1
  },
      _nestedScroll = function _nestedScroll(_ref5) {
    var event = _ref5.event,
        target = _ref5.target,
        axis = _ref5.axis;

    var node = (event.changedTouches ? event.changedTouches[0] : event).target,
        cache = node._gsap || gsap$1.core.getCache(node),
        time = _getTime$1(),
        cs;

    if (!cache._isScrollT || time - cache._isScrollT > 2000) {
      while (node && node.scrollHeight <= node.clientHeight) {
        node = node.parentNode;
      }

      cache._isScroll = node && !_isViewport$1(node) && node !== target && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
      cache._isScrollT = time;
    }

    (cache._isScroll || axis === "x") && (event._gsapAllow = true);
  },
      _inputObserver = function _inputObserver(target, type, inputs, nested) {
    return Observer.create({
      target: target,
      capture: true,
      debounce: false,
      lockAxis: true,
      type: type,
      onWheel: nested = nested && _nestedScroll,
      onPress: nested,
      onDrag: nested,
      onScroll: nested,
      onEnable: function onEnable() {
        return inputs && _addListener$1(_doc$1, Observer.eventTypes[0], _captureInputs, false, true);
      },
      onDisable: function onDisable() {
        return _removeListener$1(_doc$1, Observer.eventTypes[0], _captureInputs, true);
      }
    });
  },
      _inputExp = /(input|label|select|textarea)/i,
      _inputIsFocused,
      _captureInputs = function _captureInputs(e) {
    var isInput = _inputExp.test(e.target.tagName);

    if (isInput || _inputIsFocused) {
      e._gsapAllow = true;
      _inputIsFocused = isInput;
    }
  },
      _getScrollNormalizer = function _getScrollNormalizer(vars) {
    _isObject(vars) || (vars = {});
    vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
    vars.type || (vars.type = "wheel,touch");
    vars.debounce = !!vars.debounce;
    vars.id = vars.id || "normalizer";

    var _vars2 = vars,
        normalizeScrollX = _vars2.normalizeScrollX,
        momentum = _vars2.momentum,
        allowNestedScroll = _vars2.allowNestedScroll,
        self,
        maxY,
        target = _getTarget(vars.target) || _docEl$1,
        smoother = gsap$1.core.globals().ScrollSmoother,
        content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smoother && smoother.get() && smoother.get().content()),
        scrollFuncY = _getScrollFunc(target, _vertical),
        scrollFuncX = _getScrollFunc(target, _horizontal),
        scale = 1,
        initialScale = (Observer.isTouch && _win$1.visualViewport ? _win$1.visualViewport.scale * _win$1.visualViewport.width : _win$1.outerWidth) / _win$1.innerWidth,
        wheelRefresh = 0,
        resolveMomentumDuration = _isFunction(momentum) ? function () {
      return momentum(self);
    } : function () {
      return momentum || 2.8;
    },
        skipTouchMove,
        lastRefreshID,
        inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll),
        resumeTouchMove = function resumeTouchMove() {
      return skipTouchMove = false;
    },
        scrollClampX = _passThrough,
        scrollClampY = _passThrough,
        updateClamps = function updateClamps() {
      maxY = _maxScroll(target, _vertical);
      scrollClampY = _clamp$1(_fixIOSBug ? 1 : 0, maxY);
      normalizeScrollX && (scrollClampX = _clamp$1(0, _maxScroll(target, _horizontal)));
      lastRefreshID = _refreshID;
    },
        ignoreDrag = function ignoreDrag() {
      if (skipTouchMove) {
        requestAnimationFrame(resumeTouchMove);

        var offset = _round(self.deltaY / 2),
            scroll = scrollClampY(scrollFuncY.v - offset);

        if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
          scrollFuncY.offset = scroll - scrollFuncY.v;
          content.style.transform = "translateY(" + -scrollFuncY.offset + "px)";
          content._gsap && (content._gsap.y = -scrollFuncY.offset + "px");
          scrollFuncY.cacheID = _scrollers.cache;

          _updateAll();
        }

        return true;
      }

      if (content) {
        content.style.transform = "translateY(0px)";
        scrollFuncY.offset = scrollFuncY.cacheID = 0;
        content._gsap && (content._gsap.y = "0px");
      }

      skipTouchMove = true;
    },
        tween,
        startScrollX,
        startScrollY,
        onStopDelayedCall,
        onResize = function onResize() {
      updateClamps();

      if (tween.isActive() && tween.vars.scrollY > maxY) {
        scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
      }
    };

    vars.ignoreCheck = function (e) {
      return _fixIOSBug && e.type === "touchmove" && ignoreDrag() || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
    };

    vars.onPress = function () {
      var prevScale = scale;
      scale = _round((_win$1.visualViewport && _win$1.visualViewport.scale || 1) / initialScale);
      tween.pause();
      prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
      skipTouchMove = false;
      startScrollX = scrollFuncX();
      startScrollY = scrollFuncY();
      updateClamps();
      lastRefreshID = _refreshID;
    };

    vars.onRelease = vars.onGestureStart = function (self, wasDragging) {
      if (content) {
        content.style.transform = "translateY(0px)";
        scrollFuncY.offset = scrollFuncY.cacheID = 0;
        content._gsap && (content._gsap.y = "0px");
      }

      if (!wasDragging) {
        onStopDelayedCall.restart(true);
      } else {
        _scrollers.cache++;
        var dur = resolveMomentumDuration(),
            currentScroll,
            endScroll;

        if (normalizeScrollX) {
          currentScroll = scrollFuncX();
          endScroll = currentScroll + dur * 0.05 * -self.velocityX / 0.227;
          dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
          tween.vars.scrollX = scrollClampX(endScroll);
        }

        currentScroll = scrollFuncY();
        endScroll = currentScroll + dur * 0.05 * -self.velocityY / 0.227;
        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
        tween.vars.scrollY = scrollClampY(endScroll);
        tween.invalidate().duration(dur).play(0.01);

        if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
          gsap$1.to({}, {
            onUpdate: onResize,
            duration: dur
          });
        }
      }
    };

    vars.onWheel = function () {
      tween._ts && tween.pause();

      if (_getTime$1() - wheelRefresh > 1000) {
        lastRefreshID = 0;
        wheelRefresh = _getTime$1();
      }
    };

    vars.onChange = function (self, dx, dy, xArray, yArray) {
      _refreshID !== lastRefreshID && updateClamps();
      dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self.startX - self.x) : scrollFuncX() + dx - xArray[1]));
      dy && scrollFuncY(scrollClampY(yArray[2] === dy ? startScrollY + (self.startY - self.y) : scrollFuncY() + dy - yArray[1]));

      _updateAll();
    };

    vars.onEnable = function () {
      _allowNativePanning(target, normalizeScrollX ? false : "x");

      _addListener$1(_win$1, "resize", onResize);

      inputObserver.enable();
    };

    vars.onDisable = function () {
      _allowNativePanning(target, true);

      _removeListener$1(_win$1, "resize", onResize);

      inputObserver.kill();
    };

    self = new Observer(vars);
    self.iOS = _fixIOSBug;
    _fixIOSBug && !scrollFuncY() && scrollFuncY(1);
    onStopDelayedCall = self._dc;
    tween = gsap$1.to(self, {
      ease: "power4",
      paused: true,
      scrollX: normalizeScrollX ? "+=0.1" : "+=0",
      scrollY: "+=0.1",
      onComplete: onStopDelayedCall.vars.onComplete
    });
    return self;
  };

  ScrollTrigger$1.sort = function (func) {
    return _triggers.sort(func || function (a, b) {
      return (a.vars.refreshPriority || 0) * -1e6 + a.start - (b.start + (b.vars.refreshPriority || 0) * -1e6);
    });
  };

  ScrollTrigger$1.observe = function (vars) {
    return new Observer(vars);
  };

  ScrollTrigger$1.normalizeScroll = function (vars) {
    if (typeof vars === "undefined") {
      return _normalizer$1;
    }

    if (vars === true && _normalizer$1) {
      return _normalizer$1.enable();
    }

    if (vars === false) {
      return _normalizer$1 && _normalizer$1.kill();
    }

    var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
    _normalizer$1 && _normalizer$1.target === normalizer.target && _normalizer$1.kill();
    _isViewport$1(normalizer.target) && (_normalizer$1 = normalizer);
    return normalizer;
  };

  ScrollTrigger$1.core = {
    _getVelocityProp: _getVelocityProp,
    _inputObserver: _inputObserver,
    _scrollers: _scrollers,
    _proxies: _proxies,
    bridge: {
      ss: function ss() {
        _lastScrollTime || _dispatch("scrollStart");
        _lastScrollTime = _getTime$1();
      },
      ref: function ref() {
        return _refreshing;
      }
    }
  };
  _getGSAP$1() && gsap$1.registerPlugin(ScrollTrigger$1);

  exports.ScrollTrigger = ScrollTrigger$1;
  exports.default = ScrollTrigger$1;

  if (typeof(window) === 'undefined' || window !== exports) {Object.defineProperty(exports, '__esModule', { value: true });} else {delete window.default;}

})));

},{}],2:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.window = global.window || {}));
}(this, (function (exports) { 'use strict';

	var emojiExp = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
	function getText(e) {
	  var type = e.nodeType,
	      result = "";

	  if (type === 1 || type === 9 || type === 11) {
	    if (typeof e.textContent === "string") {
	      return e.textContent;
	    } else {
	      for (e = e.firstChild; e; e = e.nextSibling) {
	        result += getText(e);
	      }
	    }
	  } else if (type === 3 || type === 4) {
	    return e.nodeValue;
	  }

	  return result;
	}

	/*!
	 * SplitText: 3.10.4
	 * https://greensock.com
	 *
	 * @license Copyright 2008-2022, GreenSock. All rights reserved.
	 * Subject to the terms at https://greensock.com/standard-license or for
	 * Club GreenSock members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	var _doc,
	    _win,
	    _coreInitted,
	    _stripExp = /(?:\r|\n|\t\t)/g,
	    _multipleSpacesExp = /(?:\s\s+)/g,
	    _initCore = function _initCore() {
	  _doc = document;
	  _win = window;
	  _coreInitted = 1;
	},
	    _getComputedStyle = function _getComputedStyle(element) {
	  return _win.getComputedStyle(element);
	},
	    _isArray = Array.isArray,
	    _slice = [].slice,
	    _toArray = function _toArray(value, leaveStrings) {
	  var type;
	  return _isArray(value) ? value : (type = typeof value) === "string" && !leaveStrings && value ? _slice.call(_doc.querySelectorAll(value), 0) : value && type === "object" && "length" in value ? _slice.call(value, 0) : value ? [value] : [];
	},
	    _isAbsolute = function _isAbsolute(vars) {
	  return vars.position === "absolute" || vars.absolute === true;
	},
	    _findSpecialChars = function _findSpecialChars(text, chars) {
	  var i = chars.length,
	      s;

	  while (--i > -1) {
	    s = chars[i];

	    if (text.substr(0, s.length) === s) {
	      return s.length;
	    }
	  }
	},
	    _divStart = " style='position:relative;display:inline-block;'",
	    _cssClassFunc = function _cssClassFunc(cssClass, tag) {
	  if (cssClass === void 0) {
	    cssClass = "";
	  }

	  var iterate = ~cssClass.indexOf("++"),
	      num = 1;

	  if (iterate) {
	    cssClass = cssClass.split("++").join("");
	  }

	  return function () {
	    return "<" + tag + _divStart + (cssClass ? " class='" + cssClass + (iterate ? num++ : "") + "'>" : ">");
	  };
	},
	    _swapText = function _swapText(element, oldText, newText) {
	  var type = element.nodeType;

	  if (type === 1 || type === 9 || type === 11) {
	    for (element = element.firstChild; element; element = element.nextSibling) {
	      _swapText(element, oldText, newText);
	    }
	  } else if (type === 3 || type === 4) {
	    element.nodeValue = element.nodeValue.split(oldText).join(newText);
	  }
	},
	    _pushReversed = function _pushReversed(a, merge) {
	  var i = merge.length;

	  while (--i > -1) {
	    a.push(merge[i]);
	  }
	},
	    _isBeforeWordDelimiter = function _isBeforeWordDelimiter(e, root, wordDelimiter) {
	  var next;

	  while (e && e !== root) {
	    next = e._next || e.nextSibling;

	    if (next) {
	      return next.textContent.charAt(0) === wordDelimiter;
	    }

	    e = e.parentNode || e._parent;
	  }
	},
	    _deWordify = function _deWordify(e) {
	  var children = _toArray(e.childNodes),
	      l = children.length,
	      i,
	      child;

	  for (i = 0; i < l; i++) {
	    child = children[i];

	    if (child._isSplit) {
	      _deWordify(child);
	    } else {
	      if (i && child.previousSibling && child.previousSibling.nodeType === 3) {
	        child.previousSibling.nodeValue += child.nodeType === 3 ? child.nodeValue : child.firstChild.nodeValue;
	        e.removeChild(child);
	      } else if (child.nodeType !== 3) {
	        e.insertBefore(child.firstChild, child);
	        e.removeChild(child);
	      }
	    }
	  }
	},
	    _getStyleAsNumber = function _getStyleAsNumber(name, computedStyle) {
	  return parseFloat(computedStyle[name]) || 0;
	},
	    _setPositionsAfterSplit = function _setPositionsAfterSplit(element, vars, allChars, allWords, allLines, origWidth, origHeight) {
	  var cs = _getComputedStyle(element),
	      paddingLeft = _getStyleAsNumber("paddingLeft", cs),
	      lineOffsetY = -999,
	      borderTopAndBottom = _getStyleAsNumber("borderBottomWidth", cs) + _getStyleAsNumber("borderTopWidth", cs),
	      borderLeftAndRight = _getStyleAsNumber("borderLeftWidth", cs) + _getStyleAsNumber("borderRightWidth", cs),
	      padTopAndBottom = _getStyleAsNumber("paddingTop", cs) + _getStyleAsNumber("paddingBottom", cs),
	      padLeftAndRight = _getStyleAsNumber("paddingLeft", cs) + _getStyleAsNumber("paddingRight", cs),
	      lineThreshold = _getStyleAsNumber("fontSize", cs) * (vars.lineThreshold || 0.2),
	      textAlign = cs.textAlign,
	      charArray = [],
	      wordArray = [],
	      lineArray = [],
	      wordDelimiter = vars.wordDelimiter || " ",
	      tag = vars.tag ? vars.tag : vars.span ? "span" : "div",
	      types = vars.type || vars.split || "chars,words,lines",
	      lines = allLines && ~types.indexOf("lines") ? [] : null,
	      words = ~types.indexOf("words"),
	      chars = ~types.indexOf("chars"),
	      absolute = _isAbsolute(vars),
	      linesClass = vars.linesClass,
	      iterateLine = ~(linesClass || "").indexOf("++"),
	      spaceNodesToRemove = [],
	      isFlex = cs.display === "flex",
	      prevInlineDisplay = element.style.display,
	      i,
	      j,
	      l,
	      node,
	      nodes,
	      isChild,
	      curLine,
	      addWordSpaces,
	      style,
	      lineNode,
	      lineWidth,
	      offset;

	  iterateLine && (linesClass = linesClass.split("++").join(""));
	  isFlex && (element.style.display = "block");
	  j = element.getElementsByTagName("*");
	  l = j.length;
	  nodes = [];

	  for (i = 0; i < l; i++) {
	    nodes[i] = j[i];
	  }

	  if (lines || absolute) {
	    for (i = 0; i < l; i++) {
	      node = nodes[i];
	      isChild = node.parentNode === element;

	      if (isChild || absolute || chars && !words) {
	        offset = node.offsetTop;

	        if (lines && isChild && Math.abs(offset - lineOffsetY) > lineThreshold && (node.nodeName !== "BR" || i === 0)) {
	          curLine = [];
	          lines.push(curLine);
	          lineOffsetY = offset;
	        }

	        if (absolute) {
	          node._x = node.offsetLeft;
	          node._y = offset;
	          node._w = node.offsetWidth;
	          node._h = node.offsetHeight;
	        }

	        if (lines) {
	          if (node._isSplit && isChild || !chars && isChild || words && isChild || !words && node.parentNode.parentNode === element && !node.parentNode._isSplit) {
	            curLine.push(node);
	            node._x -= paddingLeft;

	            if (_isBeforeWordDelimiter(node, element, wordDelimiter)) {
	              node._wordEnd = true;
	            }
	          }

	          if (node.nodeName === "BR" && (node.nextSibling && node.nextSibling.nodeName === "BR" || i === 0)) {
	            lines.push([]);
	          }
	        }
	      }
	    }
	  }

	  for (i = 0; i < l; i++) {
	    node = nodes[i];
	    isChild = node.parentNode === element;

	    if (node.nodeName === "BR") {
	      if (lines || absolute) {
	        node.parentNode && node.parentNode.removeChild(node);
	        nodes.splice(i--, 1);
	        l--;
	      } else if (!words) {
	        element.appendChild(node);
	      }

	      continue;
	    }

	    if (absolute) {
	      style = node.style;

	      if (!words && !isChild) {
	        node._x += node.parentNode._x;
	        node._y += node.parentNode._y;
	      }

	      style.left = node._x + "px";
	      style.top = node._y + "px";
	      style.position = "absolute";
	      style.display = "block";
	      style.width = node._w + 1 + "px";
	      style.height = node._h + "px";
	    }

	    if (!words && chars) {
	      if (node._isSplit) {
	        node._next = j = node.nextSibling;
	        node.parentNode.appendChild(node);

	        while (j && j.nodeType === 3 && j.textContent === " ") {
	          node._next = j.nextSibling;
	          node.parentNode.appendChild(j);
	          j = j.nextSibling;
	        }
	      } else if (node.parentNode._isSplit) {
	        node._parent = node.parentNode;

	        if (!node.previousSibling && node.firstChild) {
	          node.firstChild._isFirst = true;
	        }

	        if (node.nextSibling && node.nextSibling.textContent === " " && !node.nextSibling.nextSibling) {
	          spaceNodesToRemove.push(node.nextSibling);
	        }

	        node._next = node.nextSibling && node.nextSibling._isFirst ? null : node.nextSibling;
	        node.parentNode.removeChild(node);
	        nodes.splice(i--, 1);
	        l--;
	      } else if (!isChild) {
	        offset = !node.nextSibling && _isBeforeWordDelimiter(node.parentNode, element, wordDelimiter);
	        node.parentNode._parent && node.parentNode._parent.appendChild(node);
	        offset && node.parentNode.appendChild(_doc.createTextNode(" "));

	        if (tag === "span") {
	          node.style.display = "inline";
	        }

	        charArray.push(node);
	      }
	    } else if (node.parentNode._isSplit && !node._isSplit && node.innerHTML !== "") {
	      wordArray.push(node);
	    } else if (chars && !node._isSplit) {
	      if (tag === "span") {
	        node.style.display = "inline";
	      }

	      charArray.push(node);
	    }
	  }

	  i = spaceNodesToRemove.length;

	  while (--i > -1) {
	    spaceNodesToRemove[i].parentNode.removeChild(spaceNodesToRemove[i]);
	  }

	  if (lines) {
	    if (absolute) {
	      lineNode = _doc.createElement(tag);
	      element.appendChild(lineNode);
	      lineWidth = lineNode.offsetWidth + "px";
	      offset = lineNode.offsetParent === element ? 0 : element.offsetLeft;
	      element.removeChild(lineNode);
	    }

	    style = element.style.cssText;
	    element.style.cssText = "display:none;";

	    while (element.firstChild) {
	      element.removeChild(element.firstChild);
	    }

	    addWordSpaces = wordDelimiter === " " && (!absolute || !words && !chars);

	    for (i = 0; i < lines.length; i++) {
	      curLine = lines[i];
	      lineNode = _doc.createElement(tag);
	      lineNode.style.cssText = "display:block;text-align:" + textAlign + ";position:" + (absolute ? "absolute;" : "relative;");

	      if (linesClass) {
	        lineNode.className = linesClass + (iterateLine ? i + 1 : "");
	      }

	      lineArray.push(lineNode);
	      l = curLine.length;

	      for (j = 0; j < l; j++) {
	        if (curLine[j].nodeName !== "BR") {
	          node = curLine[j];
	          lineNode.appendChild(node);
	          addWordSpaces && node._wordEnd && lineNode.appendChild(_doc.createTextNode(" "));

	          if (absolute) {
	            if (j === 0) {
	              lineNode.style.top = node._y + "px";
	              lineNode.style.left = paddingLeft + offset + "px";
	            }

	            node.style.top = "0px";

	            if (offset) {
	              node.style.left = node._x - offset + "px";
	            }
	          }
	        }
	      }

	      if (l === 0) {
	        lineNode.innerHTML = "&nbsp;";
	      } else if (!words && !chars) {
	        _deWordify(lineNode);

	        _swapText(lineNode, String.fromCharCode(160), " ");
	      }

	      if (absolute) {
	        lineNode.style.width = lineWidth;
	        lineNode.style.height = node._h + "px";
	      }

	      element.appendChild(lineNode);
	    }

	    element.style.cssText = style;
	  }

	  if (absolute) {
	    if (origHeight > element.clientHeight) {
	      element.style.height = origHeight - padTopAndBottom + "px";

	      if (element.clientHeight < origHeight) {
	        element.style.height = origHeight + borderTopAndBottom + "px";
	      }
	    }

	    if (origWidth > element.clientWidth) {
	      element.style.width = origWidth - padLeftAndRight + "px";

	      if (element.clientWidth < origWidth) {
	        element.style.width = origWidth + borderLeftAndRight + "px";
	      }
	    }
	  }

	  isFlex && (prevInlineDisplay ? element.style.display = prevInlineDisplay : element.style.removeProperty("display"));

	  _pushReversed(allChars, charArray);

	  words && _pushReversed(allWords, wordArray);

	  _pushReversed(allLines, lineArray);
	},
	    _splitRawText = function _splitRawText(element, vars, wordStart, charStart) {
	  var tag = vars.tag ? vars.tag : vars.span ? "span" : "div",
	      types = vars.type || vars.split || "chars,words,lines",
	      chars = ~types.indexOf("chars"),
	      absolute = _isAbsolute(vars),
	      wordDelimiter = vars.wordDelimiter || " ",
	      space = wordDelimiter !== " " ? "" : absolute ? "&#173; " : " ",
	      wordEnd = "</" + tag + ">",
	      wordIsOpen = 1,
	      specialChars = vars.specialChars ? typeof vars.specialChars === "function" ? vars.specialChars : _findSpecialChars : null,
	      text,
	      splitText,
	      i,
	      j,
	      l,
	      character,
	      hasTagStart,
	      testResult,
	      container = _doc.createElement("div"),
	      parent = element.parentNode;

	  parent.insertBefore(container, element);
	  container.textContent = element.nodeValue;
	  parent.removeChild(element);
	  element = container;
	  text = getText(element);
	  hasTagStart = text.indexOf("<") !== -1;

	  if (vars.reduceWhiteSpace !== false) {
	    text = text.replace(_multipleSpacesExp, " ").replace(_stripExp, "");
	  }

	  if (hasTagStart) {
	    text = text.split("<").join("{{LT}}");
	  }

	  l = text.length;
	  splitText = (text.charAt(0) === " " ? space : "") + wordStart();

	  for (i = 0; i < l; i++) {
	    character = text.charAt(i);

	    if (specialChars && (testResult = specialChars(text.substr(i), vars.specialChars))) {
	      character = text.substr(i, testResult || 1);
	      splitText += chars && character !== " " ? charStart() + character + "</" + tag + ">" : character;
	      i += testResult - 1;
	    } else if (character === wordDelimiter && text.charAt(i - 1) !== wordDelimiter && i) {
	      splitText += wordIsOpen ? wordEnd : "";
	      wordIsOpen = 0;

	      while (text.charAt(i + 1) === wordDelimiter) {
	        splitText += space;
	        i++;
	      }

	      if (i === l - 1) {
	        splitText += space;
	      } else if (text.charAt(i + 1) !== ")") {
	        splitText += space + wordStart();
	        wordIsOpen = 1;
	      }
	    } else if (character === "{" && text.substr(i, 6) === "{{LT}}") {
	      splitText += chars ? charStart() + "{{LT}}" + "</" + tag + ">" : "{{LT}}";
	      i += 5;
	    } else if (character.charCodeAt(0) >= 0xD800 && character.charCodeAt(0) <= 0xDBFF || text.charCodeAt(i + 1) >= 0xFE00 && text.charCodeAt(i + 1) <= 0xFE0F) {
	      j = ((text.substr(i, 12).split(emojiExp) || [])[1] || "").length || 2;
	      splitText += chars && character !== " " ? charStart() + text.substr(i, j) + "</" + tag + ">" : text.substr(i, j);
	      i += j - 1;
	    } else {
	      splitText += chars && character !== " " ? charStart() + character + "</" + tag + ">" : character;
	    }
	  }

	  element.outerHTML = splitText + (wordIsOpen ? wordEnd : "");
	  hasTagStart && _swapText(parent, "{{LT}}", "<");
	},
	    _split = function _split(element, vars, wordStart, charStart) {
	  var children = _toArray(element.childNodes),
	      l = children.length,
	      absolute = _isAbsolute(vars),
	      i,
	      child;

	  if (element.nodeType !== 3 || l > 1) {
	    vars.absolute = false;

	    for (i = 0; i < l; i++) {
	      child = children[i];
	      child._next = child._isFirst = child._parent = child._wordEnd = null;

	      if (child.nodeType !== 3 || /\S+/.test(child.nodeValue)) {
	        if (absolute && child.nodeType !== 3 && _getComputedStyle(child).display === "inline") {
	          child.style.display = "inline-block";
	          child.style.position = "relative";
	        }

	        child._isSplit = true;

	        _split(child, vars, wordStart, charStart);
	      }
	    }

	    vars.absolute = absolute;
	    element._isSplit = true;
	    return;
	  }

	  _splitRawText(element, vars, wordStart, charStart);
	};

	var SplitText = function () {
	  function SplitText(element, vars) {
	    _coreInitted || _initCore();
	    this.elements = _toArray(element);
	    this.chars = [];
	    this.words = [];
	    this.lines = [];
	    this._originals = [];
	    this.vars = vars || {};
	     this.split(vars);
	  }

	  var _proto = SplitText.prototype;

	  _proto.split = function split(vars) {
	    this.isSplit && this.revert();
	    this.vars = vars = vars || this.vars;
	    this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;

	    var i = this.elements.length,
	        tag = vars.tag ? vars.tag : vars.span ? "span" : "div",
	        wordStart = _cssClassFunc(vars.wordsClass, tag),
	        charStart = _cssClassFunc(vars.charsClass, tag),
	        origHeight,
	        origWidth,
	        e;

	    while (--i > -1) {
	      e = this.elements[i];
	      this._originals[i] = e.innerHTML;
	      origHeight = e.clientHeight;
	      origWidth = e.clientWidth;

	      _split(e, vars, wordStart, charStart);

	      _setPositionsAfterSplit(e, vars, this.chars, this.words, this.lines, origWidth, origHeight);
	    }

	    this.chars.reverse();
	    this.words.reverse();
	    this.lines.reverse();
	    this.isSplit = true;
	    return this;
	  };

	  _proto.revert = function revert() {
	    var originals = this._originals;

	    if (!originals) {
	      throw "revert() call wasn't scoped properly.";
	    }

	    this.elements.forEach(function (e, i) {
	      return e.innerHTML = originals[i];
	    });
	    this.chars = [];
	    this.words = [];
	    this.lines = [];
	    this.isSplit = false;
	    return this;
	  };

	  SplitText.create = function create(element, vars) {
	    return new SplitText(element, vars);
	  };

	  return SplitText;
	}();
	SplitText.version = "3.10.4";

	exports.SplitText = SplitText;
	exports.default = SplitText;

	Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _SplitText = require("gsap/dist/SplitText");
var _swiper = _interopRequireWildcard(require("swiper"));
var _dSliderModels = _interopRequireDefault(require("./3dSliderModels"));
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
      this.models = new _dSliderModels.default(this.wrapper);
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
            return "\n                        <span class=\"".concat(className, "\">\n                            <span>\n                                <svg class=\"u-icon\" viewBox=\"0 0 12 19\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M6.18029 18.7476C9.98524 18.7476 11.5688 15.6579 11.5688 10.0807V8.66682C11.5688 3.08968 9.98524 0 6.18029 0H5.38851C1.60556 0 0 3.0635 0 8.66682V10.0807C0 15.6841 1.60556 18.7476 5.38851 18.7476H6.18029ZM5.47649 16.3387C3.34308 16.3387 2.30936 14.4272 2.30936 10.6044V8.14315C2.30936 4.32032 3.34308 2.4089 5.47649 2.4089H6.11431C8.24772 2.4089 9.28143 4.32032 9.28143 8.14315V10.6044C9.28143 14.4272 8.24772 16.3387 6.11431 16.3387H5.47649Z\"/>\n                                </svg>\n                            </span>\n                            <span>\n                                <svg class=\"u-icon\" viewBox=\"0 0 8 19\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M2.6973 1.57724L0.851562 0H7.27867L5.43294 1.57724V16.7863L7.27867 18.3635H0.851562L2.6973 16.7863V1.57724Z\"/>\n                                </svg>\n                            </span>\n                        </span>");
          }
        },
        navigation: {
          nextEl: next,
          prevEl: prev
        },
        on: {
          slideChange: function slideChange(swiper) {
            _this.animateTitles(swiper);
            _this.models.changeSlide(swiper.activeIndex, swiper.previousIndex);
          },
          afterInit: function afterInit(swiper) {
            _this.models.init();
            swiper.slides.forEach(function (slide, index) {
              return _this.models.initModel(slide, index);
            });
            _this.onScrollAnimation(swiper.slides[0], swiper);
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
        delay: 0.6,
        duration: 0.2,
        stagger: {
          each: 0.05,
          from: "center"
        }
      });
      _gsap.default.to(titleSecondaryChars, {
        visibility: "hidden",
        delay: 0.4,
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
  }, {
    key: "onScrollAnimation",
    value: function onScrollAnimation(firstSlide, swiper) {
      var _this2 = this;
      if (!firstSlide) return;
      _gsap.default.fromTo(firstSlide, {
        x: "100%",
        autoAlpha: 0
      }, {
        x: "0%",
        autoAlpha: 1,
        ease: "power4.out",
        duration: 1.2,
        scrollTrigger: {
          trigger: this.wrapper,
          start: "top 40%",
          end: "bottom bottom"
        },
        onStart: function onStart() {
          return _this2.animateTitles(swiper);
        }
      });
    }
  }]);
  return ThreeDSlider;
}();
exports.default = ThreeDSlider;

},{"./3dSliderModels":4,"gsap":"gsap","gsap/dist/SplitText":2,"swiper":"swiper"}],4:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var THREE = _interopRequireWildcard(require("three"));
var _DRACOLoader = require("three/examples/jsm/loaders/DRACOLoader");
var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader");
var _ScrollTrigger = _interopRequireDefault(require("gsap/ScrollTrigger"));
var _is_js = _interopRequireDefault(require("is_js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_ScrollTrigger.default);
var ThreeDSliderModels = /*#__PURE__*/function () {
  function ThreeDSliderModels(wrapper) {
    _classCallCheck(this, ThreeDSliderModels);
    this.DOM = {
      models: ".js-3d-slider-models",
      slide: ".js-3d-slider-slide"
    };
    this.models = wrapper.querySelector(this.DOM.models);

    // config
    this.config = {
      modelOffset: 6,
      modelScale: 1
    };
  }
  _createClass(ThreeDSliderModels, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!this.models) return;
      this.modelsArray = [];
      this.modelsWrapper = new THREE.Object3D();
      this.loader = new _GLTFLoader.GLTFLoader();

      // loader
      var dracoLoader = new _DRACOLoader.DRACOLoader();
      dracoLoader.setDecoderPath(window.dracoPath);
      dracoLoader.setDecoderConfig({
        type: "js"
      });
      this.loader.setDRACOLoader(dracoLoader);
      THREE.Cache.enabled = true;
      this.resizeModels();
      this.width = this.models.offsetWidth;
      this.height = this.models.offsetHeight;
      this.initCamera();
      this.initScene();
      this.initLights();
      this.initRenderer();
      this.animate();
      this.onScrollAnimation();
      if (!_is_js.default.mobile()) {
        this.mouseMove();
      }
      this.scene.add(this.modelsWrapper);

      // handle resize
      window.addEventListener("resize", function () {
        return _this.onWindowResize();
      }, false);
    }
  }, {
    key: "onScrollAnimation",
    value: function onScrollAnimation() {
      _gsap.default.timeline({
        scrollTrigger: {
          trigger: this.models,
          start: "top 30%",
          end: "bottom bottom"
        }
      }).add("start").fromTo(this.modelsWrapper.position, {
        y: -3
      }, {
        y: 0,
        ease: "power4.out",
        duration: 1
      }, "start").fromTo(this.modelsWrapper.rotation, {
        x: -3
      }, {
        x: 0,
        ease: "power4.out",
        duration: 1
      }, "start");
    }
  }, {
    key: "resizeModels",
    value: function resizeModels() {
      var _this2 = this;
      _ScrollTrigger.default.matchMedia({
        "(min-width: 1100px)": function minWidth1100px() {
          if (_this2.config.modelScale !== 0.9) {
            _this2.config.modelScale = 0.9;
          }
        },
        "(max-width: 801px)": function maxWidth801px() {
          if (_this2.config.modelScale !== 0.7) {
            _this2.config.modelScale = 0.7;
          }
        },
        "(max-width: 600px)": function maxWidth600px() {
          if (_this2.config.modelScale !== 0.6) {
            _this2.config.modelScale = 0.7;
          }
        },
        "(max-width: 475px)": function maxWidth475px() {
          if (_this2.config.modelScale !== 0.6) {
            _this2.config.modelScale = 0.7;
          }
        }
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove() {
      var _this3 = this;
      var halfHeight = this.height / 2;
      var singlePercentCoefficient = 0.05 / halfHeight;
      window.addEventListener("mousemove", function (ev) {
        var mouseY = ev.clientY;
        _gsap.default.to(_this3.yellowLight.position, {
          y: -1 - (mouseY - window.innerHeight) / 400
        });
        _gsap.default.to(_this3.blueLight.position, {
          y: -(mouseY - window.innerHeight) / 400
        });
        _gsap.default.to(_this3.modelsWrapper.rotation, {
          x: -singlePercentCoefficient * (halfHeight - ev.clientY),
          delay: 0.1
        });
      });
    }

    /**
     * camera setup
     */
  }, {
    key: "initCamera",
    value: function initCamera() {
      this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.5, 100);
      this.camera.position.set(0, 0, 6);
      this.camera.lookAt(0, 0, 0);
    }

    /**
     * scene setup
     */
  }, {
    key: "initScene",
    value: function initScene() {
      this.scene = new THREE.Scene();
    }

    /**
     * lights setup - because of performance > all in one object
     */
  }, {
    key: "initLights",
    value: function initLights() {
      var lightWrapper = new THREE.Object3D();
      this.yellowLight = new THREE.PointLight(0xfeb301, 5, 4);
      this.yellowLight.position.set(-1, 1, 2);
      this.blueLight = new THREE.PointLight(0x2400ff, 5, 2);
      this.blueLight.position.set(1, 0, 1);
      lightWrapper.add(this.blueLight);
      lightWrapper.add(this.yellowLight);
      this.scene.add(lightWrapper);
    }

    /**
     * renderer setup
     */
  }, {
    key: "initRenderer",
    value: function initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: true
      });
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setPixelRatio(window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.renderer.physicallyCorrectLights = true;
      this.models.appendChild(this.renderer.domElement);
    }

    /**
     * model setup and load call
     */
  }, {
    key: "initModel",
    value: function initModel(slide, index) {
      var _this4 = this;
      if (!slide) return;
      this.loader.load(slide.dataset.model, function (gltf) {
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.position.x = index * _this4.config.modelOffset;
        gltf.scene.scale.set(_this4.config.modelScale, _this4.config.modelScale, _this4.config.modelScale);
        gltf.scene.uuid = index;
        _this4.modelsArray.push(gltf.scene);
        _this4.modelsWrapper.add(gltf.scene);
      }, function (xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      }, function (error) {
        // console.log("An error happened");
      });
    }

    /**
     *
     */
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      var _this5 = this;
      this.resizeModels();
      this.modelsWrapper.children.forEach(function (model) {
        return model.scale.set(_this5.config.modelScale, _this5.config.modelScale, _this5.config.modelScale);
      });
      this.camera.aspect = this.models.offsetWidth / this.models.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.models.offsetWidth, this.models.offsetHeight);
    }

    /**
     * requestAnimationFrame
     */
  }, {
    key: "animate",
    value: function animate() {
      var _this6 = this;
      var raf = null;
      var animate = function animate() {
        _this6.renderer.render(_this6.scene, _this6.camera);
        if (_this6.renderer != null) {
          raf = requestAnimationFrame(animate);
        }
      };
      _ScrollTrigger.default.create({
        trigger: this.models,
        start: "top bottom",
        end: "bottom top",
        onEnter: function onEnter() {
          raf = requestAnimationFrame(animate);
        },
        onLeave: function onLeave() {
          cancelAnimationFrame(raf);
        },
        onEnterBack: function onEnterBack() {
          raf = requestAnimationFrame(animate);
        },
        onLeaveBack: function onLeaveBack() {
          cancelAnimationFrame(raf);
        }
      });
    }
  }, {
    key: "changeSlide",
    value: function changeSlide(index, prevIndex) {
      var model = this.modelsArray.find(function (model) {
        return model.uuid === index;
      });
      var prevModel = this.modelsArray.find(function (model) {
        return model.uuid === prevIndex;
      });
      var direction = prevIndex > index ? 1 : -1;
      _gsap.default.timeline().add("start").to(this.modelsWrapper.position, {
        x: -index * this.config.modelOffset,
        duration: 2,
        ease: "power4.out"
      }, "start").fromTo(model.rotation, {
        y: -Math.PI / 2 + 2.5 * direction
      }, {
        y: -Math.PI / 2,
        duration: 2,
        ease: "power4.out"
      }, "start").fromTo(prevModel.rotation, {
        y: -Math.PI / 2
      }, {
        y: -Math.PI / 2 + -2.5 * direction,
        duration: 2,
        ease: "power4.out"
      }, "start");
    }
  }]);
  return ThreeDSliderModels;
}();
exports.default = ThreeDSliderModels;

},{"gsap":"gsap","gsap/ScrollTrigger":"gsap/ScrollTrigger","is_js":"is_js","three":"three","three/examples/jsm/loaders/DRACOLoader":"three/examples/jsm/loaders/DRACOLoader","three/examples/jsm/loaders/GLTFLoader":"three/examples/jsm/loaders/GLTFLoader"}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var THREE = _interopRequireWildcard(require("three"));
var _DRACOLoader = require("three/examples/jsm/loaders/DRACOLoader");
var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader");
var _ScrollTrigger = _interopRequireDefault(require("gsap/ScrollTrigger"));
var _is_js = _interopRequireDefault(require("is_js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_ScrollTrigger.default);
var HeaderModel = /*#__PURE__*/function () {
  function HeaderModel() {
    _classCallCheck(this, HeaderModel);
    this.DOM = {
      wrapper: ".js-contact-model-wrapper"
    };
    this.wrapper = document.querySelector(this.DOM.wrapper);
    this.model = null;

    // config
    this.config = {
      modelOffset: 6,
      modelScale: 1
    };
  }
  _createClass(HeaderModel, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!this.wrapper) return;
      this.loader = new _GLTFLoader.GLTFLoader();

      // loader
      var dracoLoader = new _DRACOLoader.DRACOLoader();
      dracoLoader.setDecoderPath(window.dracoPath);
      dracoLoader.setDecoderConfig({
        type: "js"
      });
      this.loader.setDRACOLoader(dracoLoader);
      THREE.Cache.enabled = true;
      this.resizeModels();
      this.width = this.wrapper.offsetWidth;
      this.height = this.wrapper.offsetHeight;
      this.initCamera();
      this.initScene();
      this.initLights();
      this.initRenderer();
      this.animate();
      if (!_is_js.default.mobile()) {
        this.mouseMove();
      }
      this.initModel();

      // handle resize
      window.addEventListener("resize", function () {
        return _this.onWindowResize();
      }, false);
    }
  }, {
    key: "resizeModels",
    value: function resizeModels() {
      var _this2 = this;
      _ScrollTrigger.default.matchMedia({
        "(min-width: 1100px)": function minWidth1100px() {
          if (_this2.config.modelScale !== 0.9) {
            _this2.config.modelScale = 0.9;
          }
        },
        "(max-width: 801px)": function maxWidth801px() {
          if (_this2.config.modelScale !== 0.7) {
            _this2.config.modelScale = 0.7;
          }
        },
        "(max-width: 600px)": function maxWidth600px() {
          if (_this2.config.modelScale !== 0.6) {
            _this2.config.modelScale = 0.6;
          }
        },
        "(max-width: 475px)": function maxWidth475px() {
          if (_this2.config.modelScale !== 0.6) {
            _this2.config.modelScale = 0.6;
          }
        }
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove() {
      var _this3 = this;
      window.addEventListener("mousemove", function (ev) {
        var mouseY = ev.clientY;
        _gsap.default.to(_this3.yellowLight.position, {
          y: -1 - (mouseY - window.innerHeight) / 400
        });
        _gsap.default.to(_this3.blueLight.position, {
          y: -(mouseY - window.innerHeight) / 400
        });
      });
    }

    /**
     * camera setup
     */
  }, {
    key: "initCamera",
    value: function initCamera() {
      this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.5, 100);
      this.camera.position.set(0, -0.1, 3.5);
      this.camera.lookAt(0, -0.1, 0);
    }

    /**
     * scene setup
     */
  }, {
    key: "initScene",
    value: function initScene() {
      this.scene = new THREE.Scene();
    }

    /**
     * lights setup - because of performance > all in one object
     */
  }, {
    key: "initLights",
    value: function initLights() {
      var lightWrapper = new THREE.Object3D();
      this.yellowLight = new THREE.PointLight(0xfeb301, 5, 4);
      this.yellowLight.position.set(-1, 1, 2);
      this.blueLight = new THREE.PointLight(0x2400ff, 5, 2);
      this.blueLight.position.set(1, 0, 1);
      lightWrapper.add(this.blueLight);
      lightWrapper.add(this.yellowLight);
      this.scene.add(lightWrapper);
    }

    /**
     * renderer setup
     */
  }, {
    key: "initRenderer",
    value: function initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: true
      });
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setPixelRatio(window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.renderer.physicallyCorrectLights = true;
      this.wrapper.appendChild(this.renderer.domElement);
    }

    /**
     * model setup and load call
     */
  }, {
    key: "initModel",
    value: function initModel() {
      var _this$wrapper$dataset,
        _this$wrapper$dataset2,
        _this4 = this;
      if (((_this$wrapper$dataset = this.wrapper.dataset) === null || _this$wrapper$dataset === void 0 ? void 0 : _this$wrapper$dataset.model) === "" || ((_this$wrapper$dataset2 = this.wrapper.dataset) === null || _this$wrapper$dataset2 === void 0 ? void 0 : _this$wrapper$dataset2.model) === null) return;
      this.loader.load(this.wrapper.dataset.model, function (gltf) {
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.scale.set(_this4.config.modelScale, _this4.config.modelScale, _this4.config.modelScale);
        _this4.model = gltf.scene;
        _this4.scrollModelAnimation(gltf.scene);
        _this4.scene.add(gltf.scene);
      }, function (xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      }, function (error) {
        // console.log("An error happened");
      });
    }
  }, {
    key: "scrollModelAnimation",
    value: function scrollModelAnimation(model) {
      _gsap.default.fromTo(model.rotation, {
        y: "+=0.25",
        x: "-=0.1"
      }, {
        y: "-=0.5",
        x: "+=0.2",
        scrollTrigger: {
          trigger: this.wrapper,
          start: "top bottom",
          end: "top top",
          scrub: 0.8
        }
      });
    }

    /**
     *
     */
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.resizeModels();
      this.model.scale.set(this.config.modelScale, this.config.modelScale, this.config.modelScale);
      this.camera.aspect = this.wrapper.offsetWidth / this.wrapper.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.wrapper.offsetWidth, this.wrapper.offsetHeight);
    }

    /**
     * requestAnimationFrame
     */
  }, {
    key: "animate",
    value: function animate() {
      var _this5 = this;
      var raf = null;
      var animate = function animate() {
        _this5.renderer.render(_this5.scene, _this5.camera);
        if (_this5.renderer != null) {
          raf = requestAnimationFrame(animate);
        }
      };
      _ScrollTrigger.default.create({
        trigger: this.wrapper,
        start: "top bottom",
        end: "bottom top",
        onEnter: function onEnter() {
          raf = requestAnimationFrame(animate);
        },
        onLeave: function onLeave() {
          cancelAnimationFrame(raf);
        },
        onEnterBack: function onEnterBack() {
          raf = requestAnimationFrame(animate);
        },
        onLeaveBack: function onLeaveBack() {
          cancelAnimationFrame(raf);
        }
      });
    }
  }]);
  return HeaderModel;
}();
exports.default = HeaderModel;

},{"gsap":"gsap","gsap/ScrollTrigger":"gsap/ScrollTrigger","is_js":"is_js","three":"three","three/examples/jsm/loaders/DRACOLoader":"three/examples/jsm/loaders/DRACOLoader","three/examples/jsm/loaders/GLTFLoader":"three/examples/jsm/loaders/GLTFLoader"}],6:[function(require,module,exports){
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
      window.addEventListener("pointermove", function (ev) {
        if (!_this.moved) {
          _this.moved = true;
          _this.wrapper.classList.add("is-moved");
        }
        _gsap.default.set(_this.wrapper, {
          x: ev.clientX - offsetX,
          y: ev.clientY - offsetY
        });
      });
      window.addEventListener("mouseout", function (ev) {
        _this.moved = false;
        _this.wrapper.classList.remove("is-moved");
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

},{"gsap":"gsap","is_js":"is_js"}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _ScrollTrigger = _interopRequireDefault(require("gsap/dist/ScrollTrigger"));
var _SplitText = require("gsap/dist/SplitText");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_ScrollTrigger.default, _SplitText.SplitText);
var FlickeringText = /*#__PURE__*/function () {
  function FlickeringText() {
    _classCallCheck(this, FlickeringText);
    this.DOM = {
      wrapper: ".js-flickering-text"
    };
    this.wrappers = document.querySelectorAll(this.DOM.wrapper);
  }
  _createClass(FlickeringText, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (this.wrappers.length < 1) return;
      this.wrappers.forEach(function (wrapper) {
        return _this.singleWrapper(wrapper);
      });
    }
  }, {
    key: "singleWrapper",
    value: function singleWrapper(wrapper) {
      var split = new _SplitText.SplitText(wrapper, {
        type: "words",
        wordsClass: "u-split-text-word"
      });
      this.animateIn(split.words, wrapper);
      var texts = wrapper.querySelectorAll("b");
      if (texts.length < 1) return;
      texts.forEach(function (text) {
        _gsap.default.timeline({
          delay: 1,
          scrollTrigger: {
            trigger: text,
            start: "top 90%"
          }
        }).to(text, {
          classList: "is-serif",
          duration: 0.05
        }).to(text, {
          classList: "",
          duration: 0.05
        }).to(text, {
          classList: "is-serif",
          duration: 0.075
        }).to(text, {
          classList: "",
          duration: 0.075
        }).to(text, {
          classList: "is-serif",
          duration: 0.1
        });
      });
    }
  }, {
    key: "animateIn",
    value: function animateIn(words, wrapper) {
      _gsap.default.set(words, {
        autoAlpha: 0
      });
      _gsap.default.fromTo(words, {
        y: "20%",
        autoAlpha: 0
      }, {
        y: "0%",
        autoAlpha: 1,
        ease: "power4.out",
        stagger: 0.05,
        duration: 0.5,
        scrollTrigger: {
          trigger: wrapper,
          start: "top 90%",
          end: "bottom top"
        }
      });
    }
  }]);
  return FlickeringText;
}();
exports.default = FlickeringText;

},{"gsap":"gsap","gsap/dist/ScrollTrigger":1,"gsap/dist/SplitText":2}],8:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var THREE = _interopRequireWildcard(require("three"));
var _DRACOLoader = require("three/examples/jsm/loaders/DRACOLoader");
var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader");
var _ScrollTrigger = _interopRequireDefault(require("gsap/ScrollTrigger"));
var _is_js = _interopRequireDefault(require("is_js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_ScrollTrigger.default);
var HeaderModel = /*#__PURE__*/function () {
  function HeaderModel() {
    _classCallCheck(this, HeaderModel);
    this.DOM = {
      wrapper: ".js-header-model-wrapper",
      header: ".js-header"
    };
    this.wrapper = document.querySelector(this.DOM.wrapper);
    this.header = document.querySelector(this.DOM.header);
    this.model = null;

    // config
    this.config = {
      modelOffset: 6,
      modelScale: 1
    };
  }
  _createClass(HeaderModel, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (!this.wrapper) return;
      this.loader = new _GLTFLoader.GLTFLoader();

      // loader
      var dracoLoader = new _DRACOLoader.DRACOLoader();
      dracoLoader.setDecoderPath(window.dracoPath);
      dracoLoader.setDecoderConfig({
        type: "js"
      });
      this.loader.setDRACOLoader(dracoLoader);
      THREE.Cache.enabled = true;
      this.resizeModels();
      this.width = this.wrapper.offsetWidth;
      this.height = this.wrapper.offsetHeight;
      this.initCamera();
      this.initScene();
      this.initLights();
      this.initRenderer();
      this.animate();
      if (!_is_js.default.mobile()) {
        this.mouseMove();
      }
      this.initModel();

      // handle resize
      window.addEventListener("resize", function () {
        return _this.onWindowResize();
      }, false);
    }
  }, {
    key: "resizeModels",
    value: function resizeModels() {
      var _this2 = this;
      _ScrollTrigger.default.matchMedia({
        "(min-width: 1100px)": function minWidth1100px() {
          if (_this2.config.modelScale !== 0.9) {
            _this2.config.modelScale = 0.9;
          }
        },
        "(max-width: 801px)": function maxWidth801px() {
          if (_this2.config.modelScale !== 0.7) {
            _this2.config.modelScale = 0.7;
          }
        },
        "(max-width: 600px)": function maxWidth600px() {
          if (_this2.config.modelScale !== 0.6) {
            _this2.config.modelScale = 0.6;
          }
        },
        "(max-width: 475px)": function maxWidth475px() {
          if (_this2.config.modelScale !== 0.6) {
            _this2.config.modelScale = 0.6;
          }
        }
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove() {
      var _this3 = this;
      window.addEventListener("mousemove", function (ev) {
        var mouseY = ev.clientY;
        _gsap.default.to(_this3.yellowLight.position, {
          y: -1 - (mouseY - window.innerHeight) / 400
        });
        _gsap.default.to(_this3.blueLight.position, {
          y: -(mouseY - window.innerHeight) / 400
        });
      });
    }

    /**
     * camera setup
     */
  }, {
    key: "initCamera",
    value: function initCamera() {
      this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.5, 100);
      this.camera.position.set(0, 0, 6);
      this.camera.lookAt(0, 0, 0);
    }

    /**
     * scene setup
     */
  }, {
    key: "initScene",
    value: function initScene() {
      this.scene = new THREE.Scene();
    }

    /**
     * lights setup - because of performance > all in one object
     */
  }, {
    key: "initLights",
    value: function initLights() {
      var lightWrapper = new THREE.Object3D();
      this.yellowLight = new THREE.PointLight(0xfeb301, 5, 4);
      this.yellowLight.position.set(-1, 1, 2);
      this.blueLight = new THREE.PointLight(0x2400ff, 5, 2);
      this.blueLight.position.set(1, 0, 1);
      lightWrapper.add(this.blueLight);
      lightWrapper.add(this.yellowLight);
      this.scene.add(lightWrapper);
    }

    /**
     * renderer setup
     */
  }, {
    key: "initRenderer",
    value: function initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        alpha: true
      });
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setPixelRatio(window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.renderer.physicallyCorrectLights = true;
      this.wrapper.appendChild(this.renderer.domElement);
    }

    /**
     * model setup and load call
     */
  }, {
    key: "initModel",
    value: function initModel() {
      var _this$wrapper$dataset,
        _this$wrapper$dataset2,
        _this4 = this;
      if (((_this$wrapper$dataset = this.wrapper.dataset) === null || _this$wrapper$dataset === void 0 ? void 0 : _this$wrapper$dataset.model) === "" || ((_this$wrapper$dataset2 = this.wrapper.dataset) === null || _this$wrapper$dataset2 === void 0 ? void 0 : _this$wrapper$dataset2.model) === null) return;
      this.loader.load(this.wrapper.dataset.model, function (gltf) {
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.scale.set(_this4.config.modelScale, _this4.config.modelScale, _this4.config.modelScale);
        _this4.model = gltf.scene;
        _this4.scrollModelAnimation(gltf.scene);
        _this4.scene.add(gltf.scene);
      }, function (xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      }, function (error) {
        // console.log("An error happened");
      });
    }
  }, {
    key: "scrollModelAnimation",
    value: function scrollModelAnimation(model) {
      _gsap.default.fromTo(model.rotation, {
        y: "+=0.25",
        x: "-=0.1"
      }, {
        y: "-=0.5",
        x: "+=0.2",
        scrollTrigger: {
          trigger: this.header,
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      });
    }

    /**
     *
     */
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.resizeModels();
      this.model.scale.set(this.config.modelScale, this.config.modelScale, this.config.modelScale);
      this.camera.aspect = this.wrapper.offsetWidth / this.wrapper.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.wrapper.offsetWidth, this.wrapper.offsetHeight);
    }

    /**
     * requestAnimationFrame
     */
  }, {
    key: "animate",
    value: function animate() {
      var _this5 = this;
      var raf = null;
      var animate = function animate() {
        _this5.renderer.render(_this5.scene, _this5.camera);
        if (_this5.renderer != null) {
          raf = requestAnimationFrame(animate);
        }
      };
      _ScrollTrigger.default.create({
        trigger: this.wrapper,
        start: "top bottom",
        end: "bottom top",
        onEnter: function onEnter() {
          raf = requestAnimationFrame(animate);
        },
        onLeave: function onLeave() {
          cancelAnimationFrame(raf);
        },
        onEnterBack: function onEnterBack() {
          raf = requestAnimationFrame(animate);
        },
        onLeaveBack: function onLeaveBack() {
          cancelAnimationFrame(raf);
        }
      });
    }
  }]);
  return HeaderModel;
}();
exports.default = HeaderModel;

},{"gsap":"gsap","gsap/ScrollTrigger":"gsap/ScrollTrigger","is_js":"is_js","three":"three","three/examples/jsm/loaders/DRACOLoader":"three/examples/jsm/loaders/DRACOLoader","three/examples/jsm/loaders/GLTFLoader":"three/examples/jsm/loaders/GLTFLoader"}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gsap = _interopRequireDefault(require("gsap"));
var _ScrollTrigger = _interopRequireDefault(require("gsap/ScrollTrigger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
_gsap.default.registerPlugin(_ScrollTrigger.default);
/**
 * Marquee Controller
 */
var Marquee = /*#__PURE__*/function () {
  function Marquee() {
    _classCallCheck(this, Marquee);
    this.DOM = {
      item: ".js-scroll-marquee"
    };
    this.items = document.querySelectorAll(this.DOM.item);
  }
  _createClass(Marquee, [{
    key: "init",
    value: function init() {
      var _this = this;
      console.log("MarqueeController init()");
      if (this.items.length < 1) {
        return;
      }
      this.items.forEach(function (item, index) {
        _this.animateLine(item, index % 2 === 0);
      });
    }

    /**
     *
     * @param line
     * @param direction
     */
  }, {
    key: "animateLine",
    value: function animateLine(line, direction) {
      var start = -window.innerWidth / 4;
      var end = 0;
      if (direction) {
        start = 0;
        end = -window.innerWidth / 4;
      }
      _gsap.default.fromTo(line, {
        x: start
      }, {
        x: end,
        scrollTrigger: {
          trigger: line,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.2
        },
        ease: "none"
      });
    }
  }]);
  return Marquee;
}();
exports.default = Marquee;

},{"gsap":"gsap","gsap/ScrollTrigger":"gsap/ScrollTrigger"}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
      gridFixed: false,
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

},{}],12:[function(require,module,exports){
"use strict";

var _GridHelper = _interopRequireDefault(require("./helpers/GridHelper"));
var _NavigationController = _interopRequireDefault(require("./components/NavigationController"));
var _Cursor = _interopRequireDefault(require("./components/Cursor"));
var _dSlider = _interopRequireDefault(require("./components/3dSlider"));
var _HeaderModel = _interopRequireDefault(require("./components/HeaderModel"));
var _ContactModel = _interopRequireDefault(require("./components/ContactModel"));
var _Marquee = _interopRequireDefault(require("./components/Marquee"));
var _FlickeringText = _interopRequireDefault(require("./components/FlickeringText"));
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

  /**
   * HeaderModel
   * @type {HeaderModel}
   */
  var headerModel = new _HeaderModel.default();
  headerModel.init();

  /**
   * ContactModel
   * @type {ContactModel}
   */
  var contactModel = new _ContactModel.default();
  contactModel.init();
  var marquee = new _Marquee.default();
  marquee.init();
  var flickeringText = new _FlickeringText.default();
  flickeringText.init();
  setTimeout(function () {
    /**
     * Cursor
     * @type {Cursor}
     */
    var cursor = new _Cursor.default();
    cursor.init();
  }, 500);
});

},{"./components/3dSlider":3,"./components/ContactModel":5,"./components/Cursor":6,"./components/FlickeringText":7,"./components/HeaderModel":8,"./components/Marquee":9,"./components/NavigationController":10,"./helpers/GridHelper":11}]},{},[12])

//# sourceMappingURL=bundle.js.map
