var PicoAudio = (function () {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(t, "prototype", {
      writable: !1
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeFunction(t) {
    try {
      return -1 !== Function.toString.call(t).indexOf("[native code]");
    } catch (n) {
      return "function" == typeof t;
    }
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }
  function _wrapNativeSuper(t) {
    var r = "function" == typeof Map ? new Map() : void 0;
    return _wrapNativeSuper = function (t) {
      if (null === t || !_isNativeFunction(t)) return t;
      if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== r) {
        if (r.has(t)) return r.get(t);
        r.set(t, Wrapper);
      }
      function Wrapper() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor);
      }
      return Wrapper.prototype = Object.create(t.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), _setPrototypeOf(Wrapper, t);
    }, _wrapNativeSuper(t);
  }

  /*
  argsObj {
      debug,
      audioContext,
      picoAudio,
      etc (this.settings.xxx)
  }
  */
  function picoAudioConstructor(argsObj) {
    this.debug = false;
    this.isStarted = false;
    this.isPlayed = false;
    this.settings = {
      masterVolume: 1,
      generateVolume: 0.15,
      tempo: 120,
      basePitch: 440,
      resolution: 480,
      isWebMIDI: false,
      WebMIDIWaitTime: 1000,
      // MIDIデバイスの待機時間 (ブラウザ画面がBG時callbackが1秒毎になるため、BG時でもちゃんと鳴らしたい場合は1秒にする)
      WebMIDIPortOutputs: null,
      WebMIDIPortOutput: null,
      WebMIDIPort: -1,
      // -1:auto
      WebMIDIPortSysEx: true,
      // MIDIデバイスのフルコントロールをするかどうか（SysExを使うかどうか）(httpsじゃないと使えない)
      isReverb: true,
      // リバーブONにするか
      reverbVolume: 1.5,
      initReverb: 10,
      isChorus: true,
      chorusVolume: 0.5,
      isCC111: true,
      loop: false,
      isSkipBeginning: false,
      // 冒頭の余白をスキップ
      isSkipEnding: true,
      // 末尾の空白をスキップ
      holdOnValue: 64,
      maxPoly: -1,
      // 同時発音数 -1:infinity
      maxPercPoly: -1,
      // 同時発音数(パーカッション) -1:infinity
      isOfflineRendering: false,
      // TODO 演奏データを作成してから演奏する
      isSameDrumSoundOverlap: false,
      // 同じドラムの音が重なることを許容するか
      baseLatency: -1,
      // レイテンシの設定 -1:auto
      soundQuality: 1,
      // Set the sound quality level: 0 for basic waveform, 1 for FM waveform
      preserveSmfData: false,
      // Preserve the SMF (Standard MIDI File) data during processing,
      globalReverb: false,
      instrumentAttenuation: 1,
      enableEqualizer: true
    };

    // argsObjで設定値が指定されていたら上書きする
    rewriteVar(this, argsObj, "debug");
    for (var key in this.settings) {
      rewriteVar(this.settings, argsObj, key);
    }
    this.events = [];
    this.trigger = {
      isNoteTrigger: true,
      play: function play() {},
      stop: function stop() {},
      noteOn: function noteOn() {},
      noteOff: function noteOff() {},
      songEnd: function songEnd() {}
    };
    this.states = {
      isPlaying: false,
      startTime: 0,
      stopTime: 0,
      stopFuncs: [],
      webMIDIWaitState: null,
      webMIDIStopTime: 0,
      playIndices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      updateBufTime: 100,
      updateBufMaxTime: 350,
      updateIntervalTime: 0,
      latencyLimitTime: 0
    };
    this.hashedDataList = [];
    this.hashedMessageList = [];
    this.playData = null;
    this.channels = [];
    this.tempoTrack = [{
      timing: 0,
      value: 120
    }, {
      timing: 0,
      value: 120
    }];
    this.cc111Time = -1;
    this.onSongEndListener = null;
    this.baseLatency = 0.01;

    // チャンネルの設定値（音色, 減衰, 音量） //
    for (var i = 0; i < 17; i++) {
      this.channels.push([0, 0, 1]);
    }

    // AudioContextがある場合はそのまま初期化、なければAudioContextを用いる初期化をinit()で
    if (argsObj && argsObj.audioContext) {
      this.init(argsObj);
    }
  }
  function rewriteVar(dist, src, vr) {
    if (src && src[vr] != null && dist && dist[vr] != null) {
      dist[vr] = src[vr];
    }
  }

  /**
   * 固定パターンの乱数を提供するクラス
   */
  var RandomUtil = /*#__PURE__*/function () {
    function RandomUtil() {
      _classCallCheck(this, RandomUtil);
    }
    return _createClass(RandomUtil, null, [{
      key: "resetSeed",
      value:
      /**
       * 乱数のシード値をリセットする
       */
      function resetSeed() {
        this.init = true;
        this.x = 123456789;
        this.y = 362436069;
        this.z = 521288629;
        this.w = 8867512;
      }

      /**
       * 乱数を返す
       * 
       *     Math.random() と違い、毎回固定パターンで乱数が返される
       * Xorshiftアルゴリズム
       * @returns {number} 乱数
       */
    }, {
      key: "random",
      value: function random() {
        if (!this.init) this.resetSeed();
        var t = this.x ^ this.x << 11;
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        var r = this.w = this.w ^ this.w >>> 19 ^ (t ^ t >>> 8);
        r = Math.abs(r) / 2147483648 % 2;
        return r;
      }
    }]);
  }();

  /**
   * 補間を提供するクラス
   */
  var InterpolationUtil = /*#__PURE__*/function () {
    function InterpolationUtil() {
      _classCallCheck(this, InterpolationUtil);
    }
    return _createClass(InterpolationUtil, null, [{
      key: "lerpWave",
      value:
      /**
       * 波形を線形補間する
       * @param {AudioBuffer} buffer 補間結果を入れるAudioBuffer
       * @param {Array} vtBufs 仮想音源の配列([Float32Array, Float32Array])
       */
      function lerpWave(buffer, vtBufs) {
        // 仮想サンプルレート音源を本番音源に変換する //
        var bufferSize = buffer.getChannelData(0).length;
        var vtBufsSize = vtBufs[0].length;
        if (bufferSize == vtBufsSize) {
          // 線形補間の必要なし //
          for (var ch = 0; ch < 2; ch++) {
            var data = buffer.getChannelData(ch);
            var vtBuf = vtBufs[ch];
            for (var i = 0; i < bufferSize; i++) {
              data[i] = vtBuf[i];
            }
          }
        } else {
          // 線形補間 //
          var ratio = vtBufsSize / bufferSize;
          for (var _ch = 0; _ch < 2; _ch++) {
            var _data = buffer.getChannelData(_ch);
            var _vtBuf = vtBufs[_ch];
            for (var _i = 0; _i < bufferSize; _i++) {
              // 線形補間しながら波形を作成 //
              // TODO 音がまだ少し違和感あるので、スプライン補正に変更した方がいいかも //
              var idxF = _i * ratio;
              var idx1 = Math.trunc(idxF);
              var idx2 = (idx1 + 1) % vtBufsSize;
              var idxR = idxF - idx1;
              var w = _vtBuf[idx1] * (1 - idxR) + _vtBuf[idx2] * idxR;
              _data[_i] = w;
            }
          }
        }
      }
    }, {
      key: "linearInterp",
      value: function linearInterp(xArray, valueArray, t) {
        // xArray: Array of x-coordinates, must be monotonically increasing
        // valueArray: Array of corresponding values for x-coordinates
        // t: The x-coordinate to interpolate

        // Check if the array lengths are equal
        if (xArray.length !== valueArray.length) {
          throw new Error("xArray and valueArray must have the same length");
        }

        // Use binary search to find the interval containing t
        var low = 0;
        var high = xArray.length - 1;
        var index = -1;
        while (low <= high) {
          var mid = Math.floor((low + high) / 2);
          if (xArray[mid] <= t) {
            index = mid;
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }

        // If t is out of xArray's range
        if (index === -1) {
          return valueArray[0];
        }
        if (index === xArray.length - 1) {
          return valueArray[xArray.length - 1];
        }

        // Calculate the interpolation ratio
        var t0 = (t - xArray[index]) / (xArray[index + 1] - xArray[index]);

        // Perform linear interpolation
        var result = valueArray[index] + (valueArray[index + 1] - valueArray[index]) * t0;
        return result;
      }
    }]);
  }();

  function miniFFT(re, im) {
    var N = re.length;
    for (var i = 0; i < N; i++) {
      var j = 0;
      for (var h = i, k = N; k >>= 1; h >>= 1) j = j << 1 | h & 1;
      if (j > i) {
        var _ref = [re[j], re[i]];
        re[i] = _ref[0];
        re[j] = _ref[1];
        var _ref2 = [im[j], im[i]];
        im[i] = _ref2[0];
        im[j] = _ref2[1];
      }
    }
    for (var hN = 1; hN * 2 <= N; hN *= 2) {
      for (var _i = 0; _i < N; _i += hN * 2) {
        for (var _j = _i; _j < _i + hN; _j++) {
          var cos = Math.cos(Math.PI * (_j - _i) / hN);
          var sin = Math.sin(Math.PI * (_j - _i) / hN);
          var tre = re[_j + hN] * cos + im[_j + hN] * sin;
          var tim = -re[_j + hN] * sin + im[_j + hN] * cos;
          re[_j + hN] = re[_j] - tre;
          im[_j + hN] = im[_j] - tim;
          re[_j] += tre;
          im[_j] += tim;
        }
      }
    }
  }
  function miniIFFT(re, im) {
    miniFFT(im, re);
    var N = re.length;
    for (var i = 0; i < N; i++) {
      re[i] /= N;
      im[i] /= N;
    }
  }
  var Waveform = /*#__PURE__*/function () {
    function Waveform(samples, sampleRate) {
      _classCallCheck(this, Waveform);
      this.samples = samples;
      this.sampleRate = sampleRate;
    }

    // Normalize the waveform to the range [-1, 1]
    return _createClass(Waveform, [{
      key: "norm",
      value: function norm() {
        var maxAmplitude = this.samples.reduce(function (p, c) {
          return Math.max(p, Math.abs(c));
        });
        if (maxAmplitude > 0) {
          this.samples = this.samples.map(function (sample) {
            return sample / maxAmplitude;
          });
        }
        return this;
      }

      // Apply a low-pass filter
    }, {
      key: "lowPass",
      value: function lowPass(cutoff) {
        var RC = 1 / (2 * Math.PI * cutoff);
        var dt = 1 / this.sampleRate;
        var alpha = dt / (RC + dt);
        var filtered = new Array(this.samples.length);
        filtered[0] = 0; // Initialize the first sample

        for (var i = 1; i < this.samples.length; i++) {
          filtered[i] = alpha * this.samples[i] + (1 - alpha) * filtered[i - 1];
        }
        this.samples = filtered;
        return this;
      }

      // Apply a high-pass filter
    }, {
      key: "highPass",
      value: function highPass(cutoff) {
        var RC = 1 / (2 * Math.PI * cutoff);
        var dt = 1 / this.sampleRate;
        var alpha = RC / (RC + dt);
        var filtered = new Array(this.samples.length);
        filtered[0] = 0; // Initialize the first sample

        for (var i = 1; i < this.samples.length; i++) {
          filtered[i] = alpha * (filtered[i - 1] + this.samples[i] - this.samples[i - 1]);
        }
        this.samples = filtered;
        return this;
      }

      // Generate white noise
    }], [{
      key: "WhiteNoise",
      value: function WhiteNoise(sampleRate, durationInSeconds) {
        var samples = Array.from({
          length: sampleRate * durationInSeconds
        }, function () {
          return Math.random() * 2 - 1;
        });
        return new Waveform(samples, sampleRate);
      }
    }]);
  }();

  var AudioUtil = /*#__PURE__*/function () {
    function AudioUtil() {
      _classCallCheck(this, AudioUtil);
    }
    return _createClass(AudioUtil, null, [{
      key: "roundPower2",
      value: function roundPower2(number) {
        if (number <= 0) {
          return 0;
        }
        var power = Math.floor(Math.log2(number)) + 1;
        return Math.pow(2, power);
      }
    }, {
      key: "fillAudioBuffer",
      value: function fillAudioBuffer(audioBuffer, channel, data) {
        audioBuffer.copyToChannel(new Float32Array(data), channel);
      }
    }]);
  }();

  function generatePinkNoise(length) {
    length = AudioUtil.roundPower2(length);
    var re = new Array(length).fill(0).map(function () {
      return Math.random() * 2 - 1;
    });
    var im = new Array(length).fill(0);
    miniFFT(re, im);
    for (var i = 1; i < length / 2; i++) {
      var scale = Math.sqrt(i);
      re[i] /= scale;
      im[i] /= scale;
      re[length - i] /= scale;
      im[length - i] /= scale;
    }
    miniIFFT(re, im);
    var max = re.reduce(function (p, c) {
      return Math.max(p, Math.abs(c));
    }, 0);
    return re.map(function (v) {
      return v / max;
    });
  }

  function init(argsObj) {
    if (this.isStarted) return;
    this.isStarted = true;
    var audioContext = argsObj && argsObj.audioContext;
    var picoAudio = argsObj && argsObj.picoAudio;

    // AudioContextを生成 //
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = audioContext ? audioContext : new AudioContext({
      latencyHint: "balanced"
    });

    // マスターボリューム //
    // リアルタイムで音量変更するためにdestination前にgainNodeを一つ噛ませる
    this.masterGainNode = this.context.createGain();
    this.masterGainNode.gain.value = this.settings.masterVolume;
    this.highFilter = this.context.createBiquadFilter();
    this.highFilter.frequency.value = 20;
    this.highFilter.type = 'highpass';

    // Add a dynamics compressor to prevent overloading
    this.compressor = this.context.createDynamicsCompressor();
    this.compressor.threshold.value = -12;

    // 仮想サンプルレート //
    var sampleRate = this.context.sampleRate;
    var sampleRateVT = sampleRate >= 48000 ? 48000 : sampleRate;

    // Noise generation
    var seLength = 1;
    var sampleLength = sampleRate * seLength;
    // ホワイトノイズ //
    if (picoAudio && picoAudio.whitenoise) {
      // 使いまわし
      this.whitenoise = picoAudio.whitenoise;
    } else {
      RandomUtil.resetSeed(); // 乱数パターンを固定にする（Math.random()を使わない）
      // 再生環境のサンプルレートによって音が変わってしまうので //
      // 一旦仮想サンプルレートで音源を作成する //
      var sampleLengthVT = sampleRateVT * seLength;
      var vtBufs = [];
      for (var ch = 0; ch < 2; ch++) {
        vtBufs.push(new Float32Array(sampleLengthVT));
        var vtBuf = vtBufs[ch];
        for (var i = 0; i < sampleLengthVT; i++) {
          var r = RandomUtil.random();
          vtBuf[i] = r * 2 - 1;
        }
      }
      // 仮想サンプルレート音源を本番音源に変換する //
      this.whitenoise = this.context.createBuffer(2, sampleLength, sampleRate);
      InterpolationUtil.lerpWave(this.whitenoise, vtBufs);
    }
    this.pinknoise = this.context.createBuffer(2, sampleLength, sampleRate);
    AudioUtil.fillAudioBuffer(this.pinknoise, 0, generatePinkNoise(sampleLength));
    AudioUtil.fillAudioBuffer(this.pinknoise, 1, generatePinkNoise(sampleLength));
    this.cymbalnoise = this.context.createBuffer(2, sampleLength, sampleRate);
    AudioUtil.fillAudioBuffer(this.cymbalnoise, 0, Waveform.WhiteNoise(sampleRate, 1).highPass(8000).norm().samples);
    AudioUtil.fillAudioBuffer(this.cymbalnoise, 1, Waveform.WhiteNoise(sampleRate, 1).highPass(8000).norm().samples);

    // Fill pre-calculated vibrato samples
    this.vibratoSamples = Array.from({
      length: sampleRate * 0.1
    }).map(function (e, i) {
      var t = i / sampleRate;
      return Math.sin(2 * Math.PI * 600 * t);
    });
    this.vibratoCache = [];

    // リバーブ用のインパルス応答音声データ作成（てきとう） //
    if (picoAudio && picoAudio.impulseResponse) {
      // 使いまわし
      this.impulseResponse = picoAudio.impulseResponse;
    } else {
      RandomUtil.resetSeed(); // 乱数パターンを固定にする（Math.random()を使わない）
      // 再生環境のサンプルレートによって音が変わってしまうので //
      // 一旦仮想サンプルレートで音源を作成する //
      var _seLength = 3.5;
      var _sampleLength = sampleRate * _seLength;
      var _sampleLengthVT = sampleRateVT * _seLength;
      var _vtBufs = [];
      for (var _ch = 0; _ch < 2; _ch++) {
        _vtBufs.push(new Float32Array(_sampleLengthVT));
        var _vtBuf = _vtBufs[_ch];
        for (var _i = 0; _i < _sampleLengthVT; _i++) {
          var v = (_sampleLengthVT - _i) / _sampleLengthVT;
          var s = _i / sampleRateVT;
          var d = (s < 0.030 ? 0 : v) * (s >= 0.030 && s < 0.031 ? v * 2 : v) * (s >= 0.040 && s < 0.042 ? v * 1.5 : v) * (s >= 0.050 && s < 0.054 ? v * 1.25 : v) * RandomUtil.random() * 0.2 * Math.pow(v - 0.030, 4);
          _vtBuf[_i] = d;
        }
      }
      // 仮想サンプルレート音源を本番音源に変換する //
      this.impulseResponse = this.context.createBuffer(2, _sampleLength, this.context.sampleRate);
      InterpolationUtil.lerpWave(this.impulseResponse, _vtBufs);
    }

    // リバーブ用のAudioNode作成・接続 //
    this.convolver = this.context.createConvolver();
    this.convolver.buffer = this.impulseResponse;
    this.convolver.normalize = true;
    this.convolverGainNode = this.context.createGain();
    this.convolverGainNode.gain.value = this.settings.reverbVolume;
    this.convolver.connect(this.convolverGainNode);
    this.convolverGainNode.connect(this.masterGainNode);

    // コーラス用のAudioNode作成・接続 //
    this.chorusDelayNode = this.context.createDelay();
    this.chorusGainNode = this.context.createGain();
    this.chorusOscillator = this.context.createOscillator();
    this.chorusLfoGainNode = this.context.createGain();
    this.chorusDelayNode.delayTime.value = 0.025;
    this.chorusLfoGainNode.gain.value = 0.010;
    this.chorusOscillator.frequency.value = 0.05;
    this.chorusGainNode.gain.value = this.settings.chorusVolume;
    this.chorusOscillator.connect(this.chorusLfoGainNode);
    this.chorusLfoGainNode.connect(this.chorusDelayNode.delayTime);
    this.chorusDelayNode.connect(this.chorusGainNode);
    this.chorusGainNode.connect(this.masterGainNode);
    this.masterGainNode.connect(this.highFilter);
    this.highFilter.connect(this.compressor);
    this.compressor.connect(this.context.destination);
    this.chorusOscillator.start(0);
    this.setGlobalReverb(this.settings.globalReverb);

    // レイテンシの設定 //
    this.baseLatency = this.context.baseLatency || this.baseLatency;
    if (this.settings.baseLatency != -1) {
      this.baseLatency = this.settings.baseLatency;
    }
  }

  var Performance = /*#__PURE__*/function () {
    function Performance() {
      _classCallCheck(this, Performance);
    }
    return _createClass(Performance, null, [{
      key: "now",
      value: function now() {
        // Unsupport performance.now()
        if (this._now == null) {
          if (typeof window.performance === "undefined") {
            this._now = function () {
              return window.Date.now();
            };
          } else {
            this._now = function () {
              return window.performance.now();
            };
          }
        }
        return this._now();
      }
    }]);
  }();
  var Number_MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;

  function setData(data) {
    if (this.debug) {
      var syoriTimeS = Performance.now();
    }
    if (this.states.isPlaying) this.stop();
    this.playData = data;
    this.settings.resolution = data.header.resolution;
    this.settings.tempo = data.tempo || 120;
    this.tempoTrack = data.tempoTrack;
    this.cc111Time = data.cc111Time;
    this.firstNoteOnTiming = data.firstNoteOnTiming;
    this.lastNoteOffTiming = data.lastNoteOffTiming;
    this.firstNoteOnTime = data.firstNoteOnTime;
    this.lastNoteOffTime = data.lastNoteOffTime;
    this.lastEventTiming = data.lastEventTiming;
    this.lastEventTime = data.lastEventTime;
    this.initStatus();
    if (this.debug) {
      var syoriTimeE = Performance.now();
      console.log("setData time", syoriTimeE - syoriTimeS);
    }
    return this;
  }

  function initStatus(isSongLooping, isLight) {
    // WebMIDI使用中の場合、initStatus()連打の対策 //
    if (this.settings.isWebMIDI) {
      if (this.states.webMIDIWaitState != null) return;
    }

    // 演奏中の場合、停止する //
    this.stop(isSongLooping);

    // statesを初期化 //
    this.states = {
      isPlaying: false,
      startTime: 0,
      stopTime: 0,
      stopFuncs: [],
      webMIDIWaitState: null,
      webMIDIStopTime: this.states.webMIDIStopTime,
      playIndices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      updateBufTime: this.states.updateBufTime,
      updateBufMaxTime: this.states.updateBufMaxTime,
      updateIntervalTime: this.states.updateIntervalTime,
      latencyLimitTime: this.states.latencyLimitTime,
      noteOnAry: [],
      noteOffAry: []
    };

    // WebMIDIの初期化・リセットメッセージ送信 //
    if (this.settings.isWebMIDI && !isLight) {
      if (isSongLooping) return;
      if (this.settings.WebMIDIPortOutput == null) {
        this.startWebMIDI();
        return;
      }
      if (this.settings.WebMIDIPortSysEx) {
        // GM1システム・オン
        this.settings.WebMIDIPortOutput.send([0xF0, 0x7E, 0x7F, 0x09, 0x01, 0xF7]);
      } else {
        // SysExの使用が拒否されているので、できる限り設定値を初期値に戻す
        for (var t = 0; t < 16; t++) {
          this.settings.WebMIDIPortOutput.send([0xC0 + t, 0]);
          this.settings.WebMIDIPortOutput.send([0xE0 + t, 0, 64]);
          // ピッチあたりのずれがひどくなる場合がある よくわからない
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 100, 0]);
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 101, 0]);
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 6, 2]); //pitchbend
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 100, 1]);
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 96, 0]);
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 97, 64]); //tuning?
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 7, 100]); // volume
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 10, 64]); // pan
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 11, 127]); // expression
          //this.settings.WebMIDIPortOutput.send([0xB0+t, 91, 40]); // リバーブ以外のエフェクトに設定される場合がありそうなのでコメントアウト
          //this.settings.WebMIDIPortOutput.send([0xB0+t, 93, 0]); // コーラス以外のエフェクトに設定されるのか音が出なくなる場合があるのでコメントアウト
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 98, 0]);
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 99, 0]);
          //this.settings.WebMIDIPortOutput.send([0xB0+t, 121, 0]);
          this.settings.WebMIDIPortOutput.send([0xB0 + t, 122, 0]);
        }
      }
    }
  }

  var ArrayUtil = /*#__PURE__*/function (_Array) {
    function ArrayUtil() {
      _classCallCheck(this, ArrayUtil);
      return _callSuper(this, ArrayUtil, arguments);
    }
    _inherits(ArrayUtil, _Array);
    return _createClass(ArrayUtil, null, [{
      key: "delete",
      value:
      /**
       * 配列から要素１つを削除する
       * 
       *     Array.splice(index, 1); を高速化する
       *     特に配列末尾、又は配列先頭を削除するときに高速処理が期待できる
       * @param {Array} array 配列
       * @param {number} index 添え字
       */
      function _delete(array, index) {
        if (index == array.length - 1) array.pop(); // 配列末尾をArray.pop()で削除すると高速化する
        else if (index == 0) array.shift(); // 配列先頭をArray.shift()で削除すると高速化する（あまり変わらない環境もある）
        else array.splice(index, 1); // 配列先頭・末尾以外を削除する場合はArray.splice()で削除する
      }
    }]);
  }( /*#__PURE__*/_wrapNativeSuper(Array));

  var ParseUtil = /*#__PURE__*/function () {
    function ParseUtil() {
      _classCallCheck(this, ParseUtil);
    }
    return _createClass(ParseUtil, null, [{
      key: "getInt",
      value:
      /**
       * バイト配列内に含まれる"データ長"を数値に変換する
       * @param {Uint8Array} arr バイト配列
       * @param {number} startIdx データ長の始点の場所(index)
       * @param {number} endIdx データ長の終点の場所(index) - 1
       * @returns {number} データ長
       */
      function getInt(arr, startIdx, endIdx) {
        var value = 0;
        for (var i = startIdx; i < endIdx; i++) {
          value = (value << 8) + arr[i];
        }
        return value;
      }

      /**
       * バイト配列内に含まれる"可変長のデータ長"を数値に変換する
       * @param {Uint8Array} arr バイト配列
       * @param {number} startIdx データ長の始点の場所(index)
       * @param {number} endIdx データ長の終点の場所(index) - 1 (終点の場所は多くてもかまわない)
       * @returns {Array} [データ長, "可変長のデータ長"のバイト数]
       */
    }, {
      key: "variableLengthToInt",
      value: function variableLengthToInt(arr, startIdx, endIdx) {
        var i = startIdx;
        var value = 0;
        while (i < endIdx - 1 && arr[i] >= 0x80) {
          if (i < startIdx + 4) value = (value << 7) + (arr[i] - 0x80);
          i++;
        }
        value = (value << 7) + arr[i];
        i++;
        return [value, i - startIdx];
      }

      /**
       * デルタタイムの順番になるように配列に挿入
       * @param {PicoAudio} that PicoAudioインスタンス
       * @param {number} ch チャンネル番号
       * @param {number} time デルタタイム
       * @param {number} p 対象のMIDIイベントの場所(SMFデータ内の位置)
       * @param {number} len MIDIイベントの長さ
       */
    }, {
      key: "chIndicesInsert",
      value: function chIndicesInsert(that, ch, time, p, len) {
        var indices = ch.indices;

        // デルタタイムの順番になるようにリスト配列に挿入 //
        if (ch.indicesLength >= 4 && time < indices[ch.indicesFoot]) {
          // Insert //
          while (ch.indicesCur != -1) {
            if (time < indices[ch.indicesCur]) {
              if (ch.indicesCur == ch.indicesHead) {
                ch.indicesHead = ch.indicesLength;
              } else {
                indices[ch.indicesPre + 3] = ch.indicesLength;
              }
              indices[ch.indicesLength] = time;
              indices[ch.indicesLength + 1] = len;
              indices[ch.indicesLength + 2] = p;
              indices[ch.indicesLength + 3] = ch.indicesCur;
              ch.indicesPre = ch.indicesLength;
              ch.indicesLength += 4;
              break;
            }
            ch.indicesPre = ch.indicesCur;
            ch.indicesCur = indices[ch.indicesCur + 3];
          }
        } else {
          // Push //
          if (ch.indicesLength >= 4) {
            indices[ch.indicesFoot + 3] = ch.indicesLength;
          } else {
            ch.indicesHead = 0;
          }
          ch.indicesFoot = ch.indicesLength;
          indices[ch.indicesLength] = time;
          indices[ch.indicesLength + 1] = len;
          indices[ch.indicesLength + 2] = p;
          indices[ch.indicesLength + 3] = -1;
          ch.indicesLength += 4;
        }
      }
    }]);
  }();

  var UpdateNote = /*#__PURE__*/function () {
    function UpdateNote() {
      _classCallCheck(this, UpdateNote);
    }
    return _createClass(UpdateNote, null, [{
      key: "init",
      value:
      /**
       * 1ms毎処理用の変数を初期化
       */
      function init(picoAudio, currentTime) {
        this.updatePreTime = Performance.now();
        this.pPreTime = Performance.now();
        this.cPreTime = picoAudio.context.currentTime * 1000;
        this.pTimeSum = 0;
        this.cTimeSum = 0;
        this.cnt = 0;
        this.initCurrentTime = currentTime;
      }

      /**
       * 再生中、1ms毎に呼ばれるコールバック
       * （ブラウザの制限で実際は最短4ms毎に呼ばれる）
       * @returns {number} 現在の時間
       */
    }, {
      key: "update",
      value: function update(picoAudio) {
        var _this = this;
        var context = picoAudio.context;
        var settings = picoAudio.settings;
        var states = picoAudio.states;
        var baseLatency = picoAudio.baseLatency;
        var updateNowTime = Performance.now();
        var updatePreTime = this.updatePreTime;
        var pPreTime = this.pPreTime;
        var cPreTime = this.cPreTime;
        var pTimeSum = this.pTimeSum;
        var cTimeSum = this.cTimeSum;
        var cnt = this.cnt;

        // サウンドが重くないか監視（フリーズ対策） //
        //   performance.now()とAudioContext.currentTimeの時間差を計算し
        //   AudioContext.currentTimeが遅れていたら処理落ちしていると判断する
        var updateBufTime = updateNowTime - updatePreTime;
        var pTime = updateNowTime;
        var cTime = context.currentTime * 1000;
        pTimeSum += pTime - pPreTime;
        cTimeSum += cTime - cPreTime;
        pPreTime = pTime;
        cPreTime = cTime;
        var latencyTime = pTimeSum - cTimeSum;
        states.latencyTime = latencyTime;

        // サウンドが重い場合、負荷軽減処理を発動するリミットを上げていく //
        if (latencyTime >= 100) {
          // currentTimeが遅い（サウンドが重い）
          states.latencyLimitTime += latencyTime;
          cTimeSum += 100;
        } else if (latencyTime <= -100) {
          // currentTimeが速い（誤差）
          cTimeSum = pTimeSum;
        } else {
          if (states.latencyLimitTime > 0) {
            // currentTimeが丁度いい
            states.latencyLimitTime -= updateBufTime * 0.003;
            if (states.latencyLimitTime < 0) states.latencyLimitTime = 0;
          }
        }

        // ノートを先読み度合いを自動調整（予約しすぎると重くなる） //
        states.updateIntervalTime = updateBufTime;
        if (states.updateBufTime < updateBufTime) {
          // 先読み遅れている場合
          states.updateBufTime = updateBufTime;
        } else {
          // 先読み量に余裕がある場合
          // 先読み量を少しずつ減らす //
          if (states.updateBufMaxTime > 350) {
            states.updateBufMaxTime -= states.updateBufMaxTime * 0.002;
          }
          // 先読み量を少しずつ増やす //
          if (states.updateBufTime < 20) {
            states.updateBufTime += states.updateBufTime * 0.0005;
          }
          if (states.updateBufMaxTime >= 10 && states.updateBufMaxTime < 340) {
            states.updateBufMaxTime += states.updateBufMaxTime * 0.002;
          }
        }
        // 先読み量が足りなくなった場合
        if (states.updateBufTime > states.updateBufMaxTime) {
          if (updateBufTime >= 900 && states.latencyLimitTime <= 150) {
            // バックグラウンドっぽくて重くない場合、バックグラウンド再生
            states.updateBufMaxTime += updateBufTime;
          } else {
            // 通常
            var tempTime = updateBufTime - states.updateBufMaxTime;
            states.updateBufTime = states.updateBufMaxTime;

            // 先読み量が小さい場合大きくする
            if (states.updateBufMaxTime < 10) {
              states.updateBufTime = states.updateBufMaxTime;
              states.updateBufMaxTime *= 1.25;
            } else {
              states.updateBufMaxTime += tempTime / 2;
            }
          }
          if (states.updateBufMaxTime > 1100) states.updateBufMaxTime = 1100;
        }

        // サウンドが重すぎる場合、先読み度合いを小さくして負荷軽減 //
        if (states.latencyLimitTime > 150) {
          cTimeSum = pTimeSum;
          states.latencyLimitTime -= 5;
          if (states.latencyLimitTime > 1000) states.latencyLimitTime = 1000;
          // ノート先読みをかなり小さくする（フリーズ対策）
          states.updateBufMaxTime = 1;
          states.updateBufTime = 1;
          updateBufTime = 1;
        }

        // 再生処理 //
        for (var ch = 0; ch < 16; ch++) {
          var notes = picoAudio.playData.channels[ch].notes;
          var idx = states.playIndices[ch];
          var _loop = function _loop() {
              var note = notes[idx];
              var curTime = cnt == 0 ? _this.initCurrentTime - states.startTime : context.currentTime - states.startTime;
              // 終わったノートは演奏せずにスキップ
              if (curTime >= note.stopTime) return 0; // continue
              // （シークバーで途中から再生時）startTimeが過ぎたものは鳴らさない
              if (cnt == 0 && curTime > note.startTime + baseLatency) return 0; // continue
              // 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始
              if (curTime < note.startTime - states.updateBufTime / 1000) return 1; // break

              // PicoAudio音源の再生処理 //
              if (!settings.isWebMIDI) {
                // 予約ノート数が急激に増えそうな時、先読み量を小さくしておく //
                if (states.stopFuncs.length >= 350 && states.updateBufTime < 1000) {
                  states.updateBufTime = 12;
                  states.updateBufMaxTime = states.updateBufTime;
                }

                // レトロモード（和音制限モード） //
                if (settings.maxPoly != -1 || settings.maxPercPoly != -1) {
                  var polyCnt = 0;
                  var percCnt = 0;
                  states.stopFuncs.forEach(function (tar) {
                    if (!tar.note) return;
                    if (tar.note.channel != 9) {
                      if (note.start >= tar.note.start && note.start < tar.note.stop) {
                        polyCnt++;
                      }
                    } else {
                      if (note.start == tar.note.start) {
                        percCnt++;
                      }
                    }
                  });
                  if (note.channel != 9 && polyCnt >= settings.maxPoly || note.channel == 9 && percCnt >= settings.maxPercPoly) {
                    return 0; // continue
                  }
                }

                // １ノート分の再生処理（WebAudioで再生） //
                var stopFunc = note.channel != 9 ? picoAudio.createNote(note) : picoAudio.createPercussionNote(note);
                if (!stopFunc) return 0; // continue
                // 無音の場合、処理しない
                picoAudio.pushFunc({
                  note: note,
                  stopFunc: stopFunc
                });
              }
              states.noteOnAry.push(note);
            },
            _ret;
          for (; idx < notes.length; idx++) {
            _ret = _loop();
            if (_ret === 0) continue;
            if (_ret === 1) break;
          }
          // notesのどこまで再生したかを記憶して、次回コールバック時にそこから処理を始める
          states.playIndices[ch] = idx;
        }

        // noteOnの時間になったか監視 //
        this.checkNoteOn(picoAudio);

        // noteOffの時間になったか監視 //
        this.checkNoteOff(picoAudio);

        // WebMIDIの再生処理 //
        if (settings.isWebMIDI && settings.WebMIDIPortOutput != null) {
          var messages = picoAudio.playData.messages;
          var smfData = picoAudio.playData.smfData;
          var _idx = states.playIndices[16]; // 17chはWebMIDI用
          for (; _idx < messages.length; _idx++) {
            var message = messages[_idx];
            var curTime = context.currentTime - states.startTime;

            // 終わったノートは演奏せずにスキップ
            if (curTime > message.time + settings.WebMIDIWaitTime / 1000) continue;
            // 演奏開始時間 - 先読み時間(ノート予約) になると演奏予約or演奏開始
            if (curTime < message.time - settings.WebMIDIWaitTime / 1000) break;

            // WebMIDIでMIDIメッセージを送信する処理 //
            var pLen = message.smfPtrLen;
            var p = message.smfPtr;
            var time = message.time;
            var state = smfData[p];
            if (state != 0xff) {
              try {
                if (state == 0xF0 || state == 0xF7) {
                  // sysExのMIDIメッセージ
                  if (settings.WebMIDIPortSysEx) {
                    // 長さ情報を取り除いて純粋なSysExメッセージにする
                    var lengthAry = ParseUtil.variableLengthToInt(smfData, p + 1, p + 1 + 4);
                    var sysExStartP = p + 1 + lengthAry[1];
                    var sysExEndP = sysExStartP + lengthAry[0];
                    var webMIDIMes = new Uint8Array(1 + lengthAry[0]);
                    webMIDIMes[0] = state;
                    var size = sysExEndP - sysExStartP;
                    for (var i = 0; i < size; i++) webMIDIMes[i + 1] = smfData[sysExStartP + i];
                    settings.WebMIDIPortOutput.send(webMIDIMes, (time - context.currentTime + Performance.now() / 1000 + states.startTime) * 1000);
                  }
                } else {
                  // sysEx以外のMIDIメッセージ
                  var sendMes = [];
                  for (var _i = 0; _i < pLen; _i++) sendMes.push(smfData[p + _i]);
                  settings.WebMIDIPortOutput.send(sendMes, (time - context.currentTime + Performance.now() / 1000 + states.startTime) * 1000);
                }
              } catch (e) {
                console.log(e, p, pLen, time, state);
              }
            }
          }
          // messagesのどこまで送信したかを記憶して、次回コールバック時にそこから処理を始める
          states.playIndices[16] = _idx;
        }

        // 1msコールバックが呼ばれた回数をカウント
        cnt++;

        // 変数を反映 //
        this.updatePreTime = updateNowTime;
        this.pPreTime = pPreTime;
        this.cPreTime = cPreTime;
        this.pTimeSum = pTimeSum;
        this.cTimeSum = cTimeSum;
        this.cnt = cnt;
      }

      /**
       * noteOnの時間になったか監視
       * @param {PicoAudio} picoAudio PicoAudioインスタンス
       */
    }, {
      key: "checkNoteOn",
      value: function checkNoteOn(picoAudio) {
        var context = picoAudio.context;
        var trigger = picoAudio.trigger;
        var states = picoAudio.states;
        var noteOnAry = picoAudio.states.noteOnAry;
        var noteOffAry = picoAudio.states.noteOffAry;
        for (var i = 0; i < noteOnAry.length; i++) {
          var tempNote = noteOnAry[i];
          var nowTime = context.currentTime - states.startTime;
          if (tempNote.startTime - nowTime <= 0) {
            ArrayUtil["delete"](noteOnAry, i); // noteOnAry.splice(i, 1); の高速化
            noteOffAry.push(tempNote);

            // イベント発火
            if (trigger.isNoteTrigger) trigger.noteOn(tempNote);
            picoAudio.fireEvent('noteOn', tempNote);
            i--;
          }
        }
      }

      /**
       * noteOffの時間になったか監視
       * @param {PicoAudio} picoAudio PicoAudioインスタンス
       */
    }, {
      key: "checkNoteOff",
      value: function checkNoteOff(picoAudio) {
        var context = picoAudio.context;
        var trigger = picoAudio.trigger;
        var states = picoAudio.states;
        var noteOffAry = picoAudio.states.noteOffAry;
        for (var i = 0; i < noteOffAry.length; i++) {
          var tempNote = noteOffAry[i];
          var nowTime = context.currentTime - states.startTime;
          if (tempNote.channel != 9 && tempNote.stopTime - nowTime <= 0 || tempNote.channel == 9 && tempNote.drumStopTime - nowTime <= 0) {
            ArrayUtil["delete"](noteOffAry, i); // noteOffAry.splice(i, 1); の高速化
            picoAudio.clearFunc("note", tempNote);

            // イベント発火
            if (trigger.isNoteTrigger) trigger.noteOff(tempNote);
            picoAudio.fireEvent('noteOff', tempNote);
            i--;
          }
        }
      }
    }]);
  }();

  function play(isSongLooping) {
    var _this = this;
    var context = this.context;
    var settings = this.settings;
    var trigger = this.trigger;
    var states = this.states;

    // Chrome Audio Policy 対策 //
    if (context.resume) context.resume();

    // 再生中の場合、処理しない //
    if (states.isPlaying) return;

    // WebMIDIの場合、少し待ってから再生する //
    if (settings.isWebMIDI && !isSongLooping) {
      // Web MIDI API使用時はstop()から800ms程待機すると音がバグりにくい
      if (states.webMIDIWaitState != "completed") {
        if (states.webMIDIWaitState != "waiting") {
          // play()連打の対策
          // stop()から1000ms後にplay()を実行
          states.webMIDIWaitState = "waiting";
          var waitTime = settings.WebMIDIWaitTime - (context.currentTime - states.webMIDIStopTime) * 1000;
          if (states.webMIDIStopTime == 0) waitTime = settings.WebMIDIWaitTime; // MIDI Portをopenして最初に呼び出すときも少し待つ
          setTimeout(function () {
            states.webMIDIWaitState = "completed";
            states.isPlaying = false;
            _this.play();
          }, waitTime);
        }
        return;
      } else {
        states.webMIDIWaitState = null;
      }
    }

    // 変数を用意 //
    var currentTime = context.currentTime;
    this.isPlayed = true;
    states.isPlaying = true;
    states.startTime = !states.startTime && !states.stopTime ? currentTime : states.startTime + currentTime - states.stopTime;
    states.stopFuncs = [];

    // 冒頭の余白をスキップ //
    if (settings.isSkipBeginning) {
      var firstNoteOnTime = this.firstNoteOnTime;
      if (-states.startTime + currentTime < firstNoteOnTime) {
        this.setStartTime(firstNoteOnTime + states.startTime - currentTime);
      }
    }

    // 曲終了コールバックを予約 //
    var reserveSongEnd;
    var reserveSongEndFunc = function reserveSongEndFunc() {
      _this.clearFunc("rootTimeout", reserveSongEnd);
      var finishTime = _this.getDuration();
      if (finishTime - context.currentTime + states.startTime <= 0) {
        // 予定の時間以降に曲終了
        trigger.songEnd();
        _this.onSongEnd();
        _this.fireEvent('songEnd');
      } else {
        // 処理落ちしたりしてまだ演奏中の場合、1ms後に曲終了コールバックを呼び出すよう予約
        reserveSongEnd = setTimeout(reserveSongEndFunc, 1);
        _this.pushFunc({
          rootTimeout: reserveSongEnd,
          stopFunc: function stopFunc() {
            clearTimeout(reserveSongEnd);
          }
        });
      }
    };
    var finishTime = this.getDuration();
    var reserveSongEndTime = (finishTime - context.currentTime + states.startTime) * 1000;
    reserveSongEnd = setTimeout(reserveSongEndFunc, reserveSongEndTime);
    this.pushFunc({
      rootTimeout: reserveSongEnd,
      stopFunc: function stopFunc() {
        clearTimeout(reserveSongEnd);
      }
    });

    // 再生開始をコールバックに通知 //
    trigger.play();
    this.fireEvent('play');

    // 1ms毎コールバックの準備 //
    UpdateNote.init(this, currentTime);

    // 1ms毎コールバックを開始 //
    var reserve = setInterval(function () {
      UpdateNote.update(_this);
    }, 1);
    this.pushFunc({
      rootTimeout: reserve,
      stopFunc: function stopFunc() {
        clearInterval(reserve);
      }
    });
  }
  function render() {
    var _this2 = this;
    var spanDuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var notes = [];
    var index = 0;
    var _iterator = _createForOfIteratorHelper(this.playData.channels),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var channel = _step.value;
        var _iterator2 = _createForOfIteratorHelper(channel.notes),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var note = _step2.value;
            notes.push(note);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    notes.sort(function (n1, n2) {
      return n1.start - n2.start;
    });
    var startRender = function startRender() {
      var note = notes[index];
      do {
        note = notes[index];
        if (note) note.channel != 9 ? _this2.createNote(note) : _this2.createPercussionNote(note);
        index++;
      } while (index < notes.length && note.startTime - _this2.context.currentTime <= spanDuration);
    };
    startRender();
    this.context.suspend(spanDuration);
    this.context.onstatechange = function (event) {
      if (_this2.context.state === 'suspended') {
        startRender();
        _this2.context.resume();
        _this2.context.suspend(_this2.context.currentTime + spanDuration)["catch"](function (e) {
          return console.warn(e);
        });
      }
    };
    return this.context.startRendering();
  }

  function stop(isSongLooping) {
    var _this = this;
    var states = this.states;
    var settings = this.settings;

    // 再生していない場合、何もしない //
    if (states.isPlaying == false) return;

    // ステータスを停止状態にする・終了処理を呼ぶ //
    states.isPlaying = false;
    states.stopTime = this.context.currentTime;
    states.stopFuncs.forEach(function (n) {
      // 再生中の音の停止関数を呼ぶ
      n.stopFunc();
    });
    states.stopFuncs = [];
    states.playIndices.forEach(function (n, i, ary) {
      ary[i] = 0;
    });
    states.noteOnAry = [];
    states.noteOffAry = [];

    // WebMIDIで再生中の場合、停止メッセージを送信 //
    if (this.settings.isWebMIDI) {
      if (isSongLooping) return;
      if (this.settings.WebMIDIPortOutput == null) return;
      states.webMIDIStopTime = this.context.currentTime;
      setTimeout(function () {
        for (var t = 0; t < 16; t++) {
          _this.settings.WebMIDIPortOutput.send([0xB0 + t, 120, 0]);
        }
      }, settings.WebMIDIWaitTime);
    }

    // 停止をコールバックに通知 //
    this.trigger.stop();
    this.fireEvent('pause');
    this.fireEvent('stop');
  }

  var instrumentData = 'IP7/5d/QjNbw7de+kcLb2b6ah6m9wKyrfqqtp5mhe6WeIPf/5vv33u7u1t3ek9vLwr+zt8OktbGTYI6DV65wlpWJIPr/ubrn59C54uzuwOTf7KfbxtWY0cLAkZi+q66Uba6EIP/978G6eLaJh5OQl2B1iIR5UXR2fmJQXWViV1JIWF1dIP/96s6gkZKPioiGg4F+fXx6eqx3oHBvbnBtbmtqaWlnIP/o2b2Gh4uIhorWkdZ5bmxpaWdnZV2ue7pATFVSWVZWIOn72Lv/3frB/abwxPz39KT04eGm5u/Ap8Td0bfR7b82IP/i6tnc4eTZy+Xp5Mzazri1nbN/raOjrayxkrm6uIa9IP+yoJaRiLiGgn58eHd0cnBvbmxrgGdmZWRjYoJfX15dIP+1oIt5uszLu6Sen6ftkNtwXXN/npucmXdscW/Da896IP+yoZaPsZiEgn99fXufbW5tbGtqgGdlZWRjYmxeX15eIP+9svSMZFJcXV9jZGp52nhjW1ZTT1dISkdGREJBQUE/IP+xpeVyeHlzd3nATFZZp1uqKMRwaGFfW1pdW11ZVlZaIP+zopmTiIaIgn9+fXNxcnFubYNnemhnZWVgYGRgXl1eIO+8ubm1/6n9ur6+mc9015iJh5CFhZF8e3p6eHl1dnR1IOr1//rd0NjhvcK0yteqya62uLC/oaKXnKB3aJ5vi1iAIP/pyfmm3o7boZ2cy3+Jg6iDhYCFf4V/n3V7dXZ1c3KBIMr/u6uZl5SQjImGhIJ/fnx6eHd1dHJxcG9ubWxra2loIP7V/9fn3c6+maiZjIWUh32BiXx2fIJ3dHl4dW91cHNuIM//4eyzw5nBrpyWpo+Slo6EaIeThn98iX59f4R5gXhxILv/7fPl287SqaiMsJSgiZeJkoCMQnFtjHh6Zmdlc3R+IPPy//7s6NjAycnAwKCdh5qoqK2ZkmVxjm5/kJyWgGx9IOTt/47vqM6ezNTJh8PVxD68dbmLsL2wg7W9o3ezPZpZIM7Q6v/lxNHP5N7S3szEtrWztbKgq6GQkkiWmaGclYxtIP/u+6rs0NSwzdGgqLuqwpqyooOPk5ykl4Vrf5uWf4ZgIP/lyNq6w9bRtZjAv7avtXS4jryorczGnLannJ+bU5+UIP/7ud/LyMOhjbiie56adIiLiIFubH2Cam5AZnB3YklfIPz16fn/8Nrj9tDH1/HIurTc3MTBysutt6nHsZ+nxp+xIMD/8N2/kod8aWlnaFlhWGJVUFRXUldDS1FKTUlJT0o9IP/l99/r4tuk5tfZ2cPH0ta+vb/B1r+028GXn6ClyLuwIP71+/b/q9ag6dTH2cXOwLqvtr3Dv7Co0sG8tZOawaakIJOKov+rhop1bXqc4Y1+iYNthI/GfkxsfWJpeLttO15WIPj/6Z7Sv5i3tJePjZmVj4GAiIuDZHV+f3tnbnV5bWJoIP3//u3Ut21pY36IkYd3f4NoXGl1hHRdcC1xbmlsaG9rIP///+/XuV+gpYmSjox7b3h6dXZxbnB4cHFlZnyFY4qHIOzj/+bMq4aKh4OBf3x5d3VzcnBubGxramlnZWdjY2JhIP/rzseNjo+bmJmbjbLNyo2/ecKBxsqse5KVg5F1aJ64IP/689mxnXLV4qLfzZpdjpeHxMGLt7yCnnKKfK2kcZ6pIP/OzcfS0tHRzcS5ubatoZGfmI19jId/c2R7dWxicGxoIPH/9vzj4NTNxbqzsrSqp5iin6GVjoyVj4x0fXuAd3BdIPf/zdvV4d3j3NnMwquOl6mjqJGGaoaUko2PeWSBh4+LIOL/5Nbs8e/k2tfUzLmlta6YtLm4qYqVlJCmqKidXY+ZIP/r2OXZ6efK5dLAyMa3wLPDtEKbpLrEpaCYpIC2vpilIP/94e//3t/S5bTh3tDU3NLKz83Ew76xsK+hnKGbl52aIOj/3eP/2+Di4tve3NPZzcXEwLCtq6Croqapm5GXl4eLIP/27LnRs8TItK6LkJmfdn50f2d6WnFqdFRLXmNQXVw+IP/c1dO9eceRpKd4d591e25fbH1nZHJhY2VfX2VdXFZbIP+xyaWngatamm9/d3Zrb2NkYGNgXGVaYVxcWVhUWU1VIP/39ubn9/DT2ubb0crPv6i8vLCfoKSrmpeLjY6fhlJ1IP/G4fbs6+7l2rXX0crU0J+yuoKunae3n5GnooibmY2RIP/h49K/rcC9tKalramenZuinpmXm5uZkY+VkY+LiY6PIP/h1c+xiq+2qZqaopyXkY2TlI6JjZCMhoWIhoOBgIGCIMD/26+KgXdygWBnZWdcVDtVPUA6JjFOLEs4MUUwNC0xIPz/reHEv5amtaaUg3uTkod7gYt+emV9bnFSX1pkXjw+IP/jvqqjopmdk5GNi4WHgIOAf35/fH14d3d0dHJwcnFvIP/W7tjh0suxxqDAs6GXoKiFkJuUlZicn5mgqI6amKlvIP/d1cjDxLnAv7u1urazr6y2sKiir6qmo6GooZuZo6CfIP/s39LFvLixqJ6YnZqQgH6LiH9scXh5c2BYaGxoSENXIP/d3+fh1szGuaaIlJB/dnJ8dXBzcGpycGttaWhnZGZoIP/Uzu+y273XpK3Yv8i6jb62xr2bqLHCt6ernbG1mpWdIP/lzrapkpeXm5CLg4qIhn18fX56dHJ3dnZycHFxcW1rIP/b8/Xu59Xd1tLHtLmtrbW0sbm0bp6be4GOopuLm5JtIP/m1NLHxsbDwsDAu7u8vr25vL6+u77AwL6+wMC+vL6+IP/79e3l3NbQx72zsaicjolXfIuSjYyLjY6PioN/iIV+IPG9/9rVwq6nwLrJkb2vvaWqqaypoqegp6OioaSemZ2gIPfp//jc5On04+n07Ofq3dLBs7jD0s3P0MXIxcbCusG4IP/e8t+y1NDY2NbRzcrFu7SvtbG1tLm4t7Gzr6ykn5iSIPre/P/n3OPl28nb3+Dn4djf3NPNwcK/sbm5urm1urq8IOXg//H8stTO183d39rYzsa/vKy0jaaOo4eSeZV7i3SGIOX/7LbBnritc6NqlJ5ng3mQiGWDZn+EaW9CfXJOYFZtIOD/+fW67fDt5dnLu6ydk4dYYWhpW2NbYV1fU1tTWVRYIP/B6brmtee44Xfpm9WrxqfGmcKLu6W+nrGBrJKpkox4IP/hvoKMjIKCgHt5eXZzdG1tamloZ2RmYmNiYGBfWl5bIP//5cGNgHhwd21mbGZiX15gX1dZVFVWVlFXS0dQSk1NIP+n4aXfmsCVvH+ihp9yj3uPbIFzg2p0bYNlZmZ9YVVjIPit/5/spZOU3W7Ni7tyu16ibqpRl2OdMYREj12AT4NGIP/P2bHVq7igqZelf6+Xfn6Qf6SOgmiOh4dzb3qCY4p0IPv/7dXEsKqyqqqIj5aia5GQi3+RflmRhnlth22Fi2hcIP+8tKumop6bk4qHg31+gX+Eg4F+fHZ1cm9vcG9xdHdyIP+4u5aQjYmIg399enl2dXJwb21samlpZ2ZlY2NhYWFgIP+44ZHPkciFuXekdqh2kEuYepRciHaZaZFtmG6TXJNoIP/L5+O1usrKm7i2t420qnyWrp6NnKeOlZyee5eWlHqWIP/TwJ+zi6uQfIN3gIZ7aXZ9dGtwdW5sbGlpaGdjY2VjIP/23s/OrKmlmJySl5qakoqMjI6Kf4OCg4F6f4F8d3d3IMbU9//z1efb9eXd0tzZ0dyVob+8ury+zMK3oa2tpZ2mIP/0+dfupeWm6aLKTr+LunTFdrZ9iXC0hK1wpGV6YaNnIP/p69zGnsPAuq+nq6qmo6CdnJycmJaWlZWRj5CRj42LIP/4/fHv9+Lc5dm82s/NyNG5tMKmrsi5orKflriyrKOuIP+0opiRjYmOxZXdloiAfHhzbbVxq353dHJwbm+DW2dqIP+7s6uoo5qblouGgoF/g32Fg4F9fHN5dW5tcW9zdHRzIP/L8+zn4tfWzsa8uraqp6CkppiRkIGHhHeEeXhxaGlhIP/0vPLw29O2w6KdraaZjoCUhoF5co+RfWWMhnNddn+AIP/GsavOqtSik5aVkq2Be4KAfnt7en15c290dG9xcG5sIP/M17TMr8eoz7CLiKibnXuwrpR1U4eOgpiNaop7ak1zIP7U/9P3xtXFxcOhuJippZufhqJ+j454mGV1fniKZm94IP/o3tfOu7jExLmzrbGtqqqfmp6fo5qWop+Zj4+Wko6SIP/e0ft5o52kjnODlIZ+enl+e3dydnh0b29yb21ra2prIP/xybXWu6G5t6icr72vr6W0pKeiiJ2moKBprIqTmZpyIPe18MHftfWt/sHrk/+Y+Kz3n/aM5ZTtgcBc33eteMp2IPjW36z/18TH9cOxm+HblafT36ygqcuqsK7HnKGiqZWTIP/o58zYla6DonHEi71txIS9Za5qs157CoBnm2WSbadrIP/K3IjOmrqQwHC4mLWBq4+kW6JFpoege5mOk3OLgZR5IP/s/fLev5ucl5CMiYeEg4F/fnt6eXh3dnR0cnFwb29uIP/ard6oyqK9oqKosKarnJubm5aSnaGho5ydmpKSn6KmIP/k+OPv6O2u0dLPqNzDys3HyMbI0Z+8ybaUus2th8eMIObk8P/99OLy8sDVzrbdy6/VwqrDn6HIqMiquKahlYaeIP/j7fH03v7/6sW83tDT5da6rNHUps/Uu5u/08yUw7mRINnz//TP5c7b5M/Jx7jLvMesvpqg0L1utqa+ubutnJaQIP+vnZSOhaiBr3qPdodvZ21bamhnZ2WWYYhfXV1cXFpbIOrw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OTguLTMzLSYtLCozIP/x2di4fo6ZjpqPfKfEwlyvM7Jmw8GnYoydiIh+cYSlIP3/8Mykq3jB3HPZ0kmaQ48ut7FMtrFGoT+MNJeaXI+gIP/gy9vZ083AvrCtop6VkIh7e3BwZWJaSU8/SDo9LSoiIOv//Pjd1822vKqroZmTkH2KdHd5XnRmQGxaaWBhX0daIP/7wuHj5uDbzsGlgbKssqeQfoaXmoF6aYGCaXdYbIB2IP/i+fLo15+bu7yhp5iemqmRjGeihZh6k3CRdIZrkHmDIP/05efv5e/hz8W/vLeex8GzyrC0qrK2u8O/po6zwa+xIPH77vH/1efk1dHl29rIy8nIwpC0sq2jkrKhoIileXZ5INz+8e//vO7j4dTY0tTGu7m5t6iir6qZg6iQln6jiodvIP/66qHRubaplZqCj3mGYnxEdDZtKmUyXyRcKlcrUjtVIP/YzdLAZrxklp2ER3NIa3IzRl9GQ003OT43OTczNDIvIP+Ww5GsfaJnkHFxY2JUWVdaUlVMVFFLSkZHP0hEQUVDIP/t9Obg9uuz1tXNrsC9qZipp555pKGRfZiQhGaMkYFaIP/u0fT26tTW0obLu5vAt4SkhJ+rn3+Yjoqaj2WQeISLIP/lvMaorqR8noCVhYuHgYZ6gXh9end3dHVwdHJwcm9tIP/mvMWkrZaNi3t8dm1yUnBKaFRgWU9UME8+SUlBTEJFIND/y4+GenZyampqaGFkYF9dXFtXXVdWVE5QT1dQTkxNIP/54MTArKKgpIihP5B6hX9kgHh1eGFzaGxyV25UYGpZIP/VmH9ya2xkZmJfWlpYWVhUUktPTU9MTEdDSURMREhAIPn/7vfp7+TX4NXb19bY0tbM08nNyMbJwsjFx8bDxbfCIP/x6+vj8uXX3dTa09fS1tDEz8PNwsvBs7+xvrC8r6euIP/w39PIv7apqZydkpGIhoFvdGloYV9RUElCRSVALDEpIP/48O3g0cGonHt5KmJOW0RKUUdSTkpITURGQzg/LzE7IP/e5PzB79DOtrPi09PAoK7K1LGrybbIvaLBubzGf6uqIP/mr62aipB7gXthdGZra2NoX2JiW19cXl5YWlhYWVhVIP/s9e/k1su+xsXKyr69qaiTpaOmnpKOiZGBl4KBd25xIPn/+//6+vPy7uzo597g1Nzc3eDh5OPn4eji6OPn49fiIP/56d7Nv6uZh5WRlJGNioB1c2BiUUxGRD5EMDgmFR0XIP/u4dvW08nGu8K3yLa4r7ejpJ+eiZqJj458iI16fnV/IP/y5dzB3+PNxsatv8K9w8G0ua2foo6VlYiJinVqgYODIP/YzdnV2NfNy8C2trK7truytaumm46Ea3xldFNyeHmGIP/vz93d3dvG2NfOzMy/urmjtK6xuLO2srSusqimo5CVIObm+P/67fXk4svIx5e2r6eJq3iXbphifWN9O4BseWp1IOf/7r65q8GgjKiKk6CHfX53i3Z6dIZRaX5pW3FtbmdlINn8/9zr8u/e1cCymo5rbkdPVlBKSkpMQjxDRE1MTUBTIP+luJXmjt6I1orZk8KcuZOuhZ6BgXB0dIBpf2ZwZ1xQIP/PlWxBOjQzIhIbGxQVABkLAAAMAAoAAAAIEgQAABAAIP/yyqBiVFdOPE4/RTlGO0Y6MCcpLSk2KywfNCMvLC83IP+h3IDbXrIVtEyZOJk9hkGDPnY4dzhsMmwyYzFiKlwkIP+X/qfymNpE1HLJeapqrGSbbZtoil6PWYVQiVJ7Y1dpIP+ezZTee8R8XmytaLpsbl+HaaM1cnx/XJQ1X3t9UX1HIPL/0s22vLCqsZmojaB/m36McpNphF2YcImGhWZ/jGp3IP+YeXpwYVE+UTlQSBE9F0krPz0ZADUqPTMrFx41JzYMIP+Nu3JsYFdTTUlHRUA/QDc7MjY0LTAxLysqKigqJy8lIP+L3IvGebRZqVSnaqZvpGugZp1hmWOVYZNhlFmVSYs9IP/c3uC2dsGznrC2qpurrJyVoZKKmJqTlZuMk5KWgYWNIP+7oIGfaodNbFBlQ1hEPT0+MEI0PTE9NDcsMiYjKhglIP/20rucq553opB/jGuCcmJ+TGdeW25UZmlaaV1kXlRiIKTI1f/r6ebo4tzMs6/Ev9O5vLWgkpaihZeMdXxif4GdIP/588/imd2R337II7NdwmmwaKU/dlekUaRFkjNqOYhLIP/pxsywsqialZiGkIWHh4GEfH99e3x5eXd1d3R0cnJyIPb1/8Hi6M3EzcefwrWfq5eZqKKbqqKJpalxnaaelaOMIP+LaVJWYWx8wWvehXRpYFdPO6c6qmVaVlRNTUt2N3JMIP+emIqGZWhPdGtlVU5MWmNWPiRSSVVUSytDSEhEQEgPIP/z9vLl39TExLG1sKeemYyIkYB6eXByb29iXlhgZ01DIP3/19/ZyZqbsKRqmJ17lXxxhFdob2o+ZWhIZ1FSXD1EIP+hio7MeMlyV1J0OZpUTCRUNFI5NUZCPEgWNiRCMzQoIP/L1KDRvsl9yrSRfJqQmXakqXCTdHCAWIyMVXxDd21RIO7W/9nv39y5n7eztJZtkqGoc2STjp5peZKIl1N/koOJIP/uu8K6nLKnh5OalHtok4hwjIaAjZGTiX2QiDuDfUeDIP/tq/efpnx+XG83ZDdURjtBLTdCKkcRPx9AITsmKyYdIP/o34PCusiwiZ/FtpihvKiVe6egqJiWna+Xipmoj3GEIP+U2J76oPqG5G3yQcVh2mSZWL1LfzOiOVcmfgA1DkstIOze3qP/1sWt78a7r8HZrJ7F0KyXm7ujb7GjqpiXm42kIP/y4crbpJp1oWzMU8N5zV2zbatQq16HR5AnigCWTpY/IP/BzKPFc8iRtoWvdLuSsJl6g5NrooWIgod9moOChWBpIP3/9+jHqohhWVVRTk9IRERIPkJFOjlAOjw6PTo2MTQ2IPP+3P/a8Nvd2dXUz9PN0dDKzcrPxc/Guca6xbnGuK+7IP/r7vPu6/PQ79a/0dXBxNvRy8/Yt6LCl7uYxbODb6+/IO3/9e7z59nl6bDNx7fPt6C3rLG2kaOre7uVdJmccop5INny9s//8srT3NLds8bbZ82krNLAsn+bxMiDiLKuxJ6LINL1//DW5tPO4tDSybLJwcmlwaKp1rCjsK27tLqwsZmZIP+Zin52caVtoGWEXohZWFdfUU5OSkmEToNKSUpFRkRDIMDGyv/p1sTWqaTJy9XZzNjIyLm7kKicnpySnYaclpKoIP/r08y+z8SasamYqK+cnpOCiJybkXx0co2YmIN5em+UIOvy/+nj8uvh4c6/xsXLvszExLKvioNkXZZ8eHeJm4qVINLY0q+37v/YyMCxrqunosKinaCZlZeVk5KSio6Mi4ybIGbtd8Vov378dZ53+HvcZ7Vx5mZrcvdq5maafP98mVnkILb/nN/aWNvcjMlOYbzRhtNVXICvW8JMNGfDVatXTj2cIMpB2UH/TMse3lKMKtNFoT1sP3w8vBWPNJo5XTynPHocIP/j19HKxcG9uba0sq+trKqop6Sjo6Gfnp2dm5uampmXIP+UiHV6b2dXWWRTTFxDS00/R01XS0MbRFI8ME1PPDk8IP/Xxry8u7i1sa6pp6Oin6Ccm5mZlpeWlpCSkpCPkJCNIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIMXFucusk9PijcC5+Mq8z+C/vtvbt8uz/8TKzerAmt/jIP+luoCRf4iZlniPeoaUgoN4nH5XgpaGhaxldIaKb5SSIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIF1hXV5eYmNlbWpvdHyZlv+WgnZuaGJnVVNRTUdJTERDIJvg/8Cyt4HEvJirqqXkcbWsZJvCmV6QkY2OhXWZl7mYIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIOr14+Hd69738u/m59La5eHT2O+8v8ni7vzU/93A297fIPb/5d3W+e3S5eLl6u3K5ffr7t/r4ergz/fW6Nnk3OXvIP/56L6uar3BrJePWo+VfHV7UXBvXWdwSmpiWlxWPkxZIP/e0rKxtb6rjaGAUn1/UYJDZEBSQ2krPjpJPFk9Rx9FIPn6/8ew1Kxrv6y3gKCjo2mXl4pwe4Nwa11+TF1CcHFJIP/627m5hJV1knWHUXJGcl5xVlJOYk1UKVZSRipMQVNGIP/uypVSY2BWVlVQVE1IR0dDQnRCdUI7Pjg/PDc5PTlBIP/s1KiGcGFeX1jEZMM/RlhEVEZIPkWHNZRDPR0+TTdFIP/n0pvu5Nui3+nHkM/fxZbN3ryRrMS8nbO1kYGkpaaIIP/m78fU2d3i1ti+x87AqLnEsI2crZ2NlKCJc3mCdXR0IP+Le3FqY6BfWlhVU1FTTEdLRUdGUkNDQ0BAPys/PT07IP+Ke3NvemxyeV9ZVEuiSrZWUU1LSUY9SUREQ0JFPj4/IP+Le3FqnI9fWlhUUlGLSUZIRkVEaEZDQT9APT47PDs7IP+Cb9l7cmxmY2BdXVxg0UJJSElHSEVIRENDQUJBPz8+IP+GgdpvamZeW2KqZFJNdEhsVphKR0JDQ0JIPEA9QzxCIP+GdmpkXFRYVVBOTUZFRURBQT89OTs7OTg5ODU1NC81IP+0vLev7ljrY2R3ebpN0ltOVVZOPHgpMTQrOzI3MUE6IP/w8O3zvcnIvdzW3WTEvs/csseWp7yxv6dToK61oKqtIP/DcOyEv4bXgIxwkHl2bqloamZvZmZjf2JZXlFaYVd4IKT/cGNXUU9PSUhEQUE+PDk3NzU2NTIzMjAtLC4vLS4qIP/xv7aSfWFwanNmZ19dV1VVUFJST1BRTUZOTUpVT0ZKIOr/4+SLxHm7ml1pnWNfcZhaWF+EWVhZb11RV1NZTVRvIOn/yufEvauvnqCWkH+Ee45RYEx9Rk1DcldbTVRPUFNTIO3+/83R282wkE2Wpp2QYjJyi4WDUVpYcn59L1dWZ3RyIPXx/47qd9N3yc/HeLfNvGWrYK5ZnbSsNJy1mlOSG5lMIP/09PPS1MzVzMbGx6Olq4ulo3+cnJWUiW1yb3pwd4OJIP/+9rDu09i3sKykmZ+Wg5unipR3k4WJhHx+V3BbY25dIP/hu7zOzt7Vr6mwnbiop7eXj5R2kKyng5+mU3yCX1iDIP/0iMS0vLF2aJ2DXn2GXBxrc1FVVWJaTFhLU0RPUERNIPz5/6735sXPpL+l0MayyrWpt6uLt7V7u7KQrax2qq5rIP/xyqSBaWdlXF5YWVRSUlFQTEhOTU1GS0BEQ0Q+SD8+IODt/8zZsci5zKSzkZ6sq7S1kYCWi4t5nZZ2hZyRg3VdIOvv/9jNxLi1vaekrYVdpaF+f3eaoJOPg4ySf4t8mpyhIGmVl/+Yg4KLeIaL2pyGfIl8hJHHloF6jH9/hbadiWp8IP/z2pq5m5mElXN+ZnxicCVkVF8ySExhTlU0TkZQNRA7IPH/7Majh3t+b3NwZlpGWVdkYFNKYjxVPU06WT8+RlJPINP/zY9uQl1vaFZwaERHIikCNRVAQDEyKEtBI0FONGZfIPX//s6jhHFkYF5cWlRVVVFSUU1NSUtISUJFPjxIRzY8IP/wxtW1eZ+jjZiLgZKwsUujSZhnrLKVcoOTeXBjgWeLIP//7celjljG0mnMyl2mXZo3rZYnpao+kluJQ4mEXI2KIP/16+LZz8W6sKadkYqEe3RtZmliYlhXU1FSTkxMRVRGIN/x/+HNvbaen4mOb3RscWBiOEdJTxsxP0JAKjIxNz4cIP/M7eLm3drLwZGFlZiZhk9/inJzR15veG9LRV9iXUdQIOz/68OvwrOos5+emICOk4GPi2+AcGF3bWx0UVhdSldVIP/v5ejl5d3S3ubKsczJx6fByba3rravqZO6tay1pJmSIPb//PL34+Tm5LrJw8usqa2+ro6Kn6WHd42hZFt8jm9S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';
  var defaultWave = {
    instrumentData: instrumentData
  };

  var quickfadeArray = [
  // Piano
  true,
  // 0: Acoustic Grand Piano
  true,
  // 1: Bright Acoustic Piano
  true,
  // 2: Electric Grand Piano
  true,
  // 3: Honky-tonk Piano
  true,
  // 4: Electric Piano 1
  true,
  // 5: Electric Piano 2
  true,
  // 6: Harpsichord
  true,
  // 7: Clavinet
  // Chromatic Percussion
  true,
  // 8: Celesta
  true,
  // 9: Glockenspiel
  true,
  // 10: Music Box
  true,
  // 11: Vibraphone
  true,
  // 12: Marimba
  true,
  // 13: Xylophone
  true,
  // 14: Tubular Bells
  true,
  // 15: Dulcimer
  // Organ
  false,
  // 16: Drawbar Organ
  false,
  // 17: Percussive Organ
  false,
  // 18: Rock Organ
  false,
  // 19: Church Organ
  false,
  // 20: Reed Organ
  false,
  // 21: Accordion
  false,
  // 22: Harmonica
  false,
  // 23: Tango Accordion
  // Guitar
  true,
  // 24: Acoustic Guitar (nylon)
  true,
  // 25: Acoustic Guitar (steel)
  true,
  // 26: Electric Guitar (jazz)
  true,
  // 27: Electric Guitar (clean)
  true,
  // 28: Electric Guitar (muted)
  false,
  // 29: Overdriven Guitar
  false,
  // 30: Distortion Guitar
  false,
  // 31: Guitar harmonics
  // Bass
  true,
  // 32: Acoustic Bass
  true,
  // 33: Electric Bass (finger)
  true,
  // 34: Electric Bass (pick)
  true,
  // 35: Fretless Bass
  true,
  // 36: Slap Bass 1
  true,
  // 37: Slap Bass 2
  true,
  // 38: Synth Bass 1
  false,
  // 39: Synth Bass 2
  // Strings
  false,
  // 40: Violin
  false,
  // 41: Viola
  false,
  // 42: Cello
  false,
  // 43: Contrabass
  false,
  // 44: Tremolo Strings
  true,
  // 45: Pizzicato Strings
  true,
  // 46: Orchestral Harp
  true,
  // 47: Timpani
  // Ensemble
  false,
  // 48: String Ensemble 1
  false,
  // 49: String Ensemble 2
  false,
  // 50: SynthStrings 1
  false,
  // 51: SynthStrings 2
  false,
  // 52: Choir Aahs
  false,
  // 53: Voice Oohs
  false,
  // 54: Synth Choir
  true,
  // 55: Orchestra Hit
  // Brass
  false,
  // 56: Trumpet
  false,
  // 57: Trombone
  false,
  // 58: Tuba
  false,
  // 59: Muted Trumpet
  false,
  // 60: French Horn
  false,
  // 61: Brass Section
  false,
  // 62: SynthBrass 1
  false,
  // 63: SynthBrass 2
  // Reed
  false,
  // 64: Soprano Sax
  false,
  // 65: Alto Sax
  false,
  // 66: Tenor Sax
  false,
  // 67: Baritone Sax
  false,
  // 68: Oboe
  false,
  // 69: English Horn
  false,
  // 70: Bassoon
  false,
  // 71: Clarinet
  // Pipe
  false,
  // 72: Piccolo
  false,
  // 73: Flute
  false,
  // 74: Recorder
  false,
  // 75: Pan Flute
  false,
  // 76: Blown Bottle
  false,
  // 77: Shakuhachi
  false,
  // 78: Whistle
  false,
  // 79: Ocarina
  // Synth Lead
  false,
  // 80: Lead 1 (square)
  false,
  // 81: Lead 2 (sawtooth)
  false,
  // 82: Lead 3 (calliope)
  false,
  // 83: Lead 4 (chiff)
  false,
  // 84: Lead 5 (charang)
  false,
  // 85: Lead 6 (voice)
  false,
  // 86: Lead 7 (fifths)
  false,
  // 87: Lead 8 (bass + lead)
  // Synth Pad
  false,
  // 88: Pad 1 (new age)
  false,
  // 89: Pad 2 (warm)
  false,
  // 90: Pad 3 (polysynth)
  false,
  // 91: Pad 4 (choir)
  false,
  // 92: Pad 5 (bowed)
  false,
  // 93: Pad 6 (metallic)
  false,
  // 94: Pad 7 (halo)
  false,
  // 95: Pad 8 (sweep)
  // Synth Effects
  true,
  // 96: FX 1 (rain)
  false,
  // 97: FX 2 (soundtrack)
  true,
  // 98: FX 3 (crystal)
  true,
  // 99: FX 4 (atmosphere)
  true,
  // 100: FX 5 (brightness)
  false,
  // 101: FX 6 (goblins)
  false,
  // 102: FX 7 (echoes)
  false,
  // 103: FX 8 (sci-fi)
  // Ethnic
  true,
  // 104: Sitar
  true,
  // 105: Banjo
  true,
  // 106: Shamisen
  true,
  // 107: Koto
  true,
  // 108: Kalimba
  false,
  // 109: Bagpipe
  false,
  // 110: Fiddle
  false,
  // 111:Shanai
  // Percussive
  true,
  // 112: Tinkle Bell
  true,
  // 113: Agogo
  true,
  // 114: Steel Drums
  true,
  // 115: Woodblock
  true,
  // 116: Taiko Drum
  true,
  // 117: Melodic Tom
  true,
  // 118: Synth Drum
  true,
  // 119: Reverse Cymbal
  // Sound effects
  true,
  // 120: Guitar Fret Noise
  true,
  // 121: Breath Noise
  false,
  // 122: Seashore
  true,
  // 123: Bird Tweet
  true,
  // 124: Telephone Ring
  false,
  // 125: Helicopter
  false,
  // 126: Applause
  true // 127: Gunshot
  ];
  var envelope = [[0, 1.16, 0.157, 0.252], [0, 1.58, 0.109, 0.276], [0, 1.56, 0.117, 0.136], [0.0232, 1.49, 0.111, 0.276], [0, 0.766, 0.0805, 0.0666], [0, 1.35, 0.0868, 0.0434], [0, 1.65, 0.134, 0.136], [0, 1.6, 0.129, 0.0434], [0, 1.09, 0.0605, 0.252], [0, 0.813, 0.0542, 0.159], [0, 0.766, 0.0224, 0.5], [0, 1.7, 0.217, 0.252], [0, 0.441, 0.0544, 0.0201], [0, 0.58, 0.0511, 0.0201], [0, 0.882, 0.0786, 0.5], [0, 1.56, 0.0909, 0.415], [0, 0.975, 0.721, 0.0666], [0, 0.0697, 0.94, 0.0898], [0, 0.139, 0.602, 0.0434], [0.0232, 0.0929, 0.802, 0.299], [0.0464, 0.627, 0.747, 0.136], [0.0464, 0.65, 0.492, 0.0898], [0.0464, 0.488, 0.715, 0.0201], [0.0232, 0.0929, 0.92, 0.159], [0, 1.6, 0.123, 0.0898], [0, 1.18, 0.052, 0.0434], [0, 1.07, 0.00299, 0.0201], [0, 1.07, 0.054, 0.0201], [0, 0.65, 0.051, 0.0201], [0, 0.163, 0.789, 0.136], [0, 0.139, 0.758, 0.136], [0, 2, 0.233, 0.0201], [0, 1.7, 0.15, 0.252], [0, 1.42, 0.0763, 0.0201], [0, 1.6, 0.124, 0.0434], [0, 1.56, 0.132, 0.0898], [0, 1.32, 0.0756, 0.136], [0, 0.766, 0.128, 0.0201], [0.0232, 0.418, 0.0556, 0.0201], [0.0464, 1.72, 0.0445, 0.0434], [0.0464, 2, 0.315, 0.276], [0.0464, 0.255, 0.77, 0.159], [0.116, 0.488, 0.859, 0.113], [0.0464, 0.163, 0.855, 0.252], [0.0929, 0.673, 0.651, 0.5], [0, 0.372, 0.0391, 0.0201], [0, 0.789, 0.0757, 0.5], [0, 1.58, 0.12, 0.5], [0.0464, 0.627, 0.682, 0.5], [0.163, 0.488, 0.944, 0.5], [0.0697, 0.0929, 0.962, 0.5], [0.0929, 0.743, 0.979, 0.5], [0.186, 2, 0.892, 0.276], [0.0464, 0.0929, 0.868, 0.113], [0.0697, 0.279, 0.255, 0.368], [0.0232, 0.395, 0.035, 0.0201], [0.139, 0.186, 0.962, 0.136], [0.0464, 0.72, 0.444, 0.0434], [0, 1.14, 0.334, 0.136], [0, 0.0929, 0.687, 0.0666], [0.0232, 0.627, 0.828, 0.485], [0.0232, 2, 0.861, 0.136], [0.0929, 0.186, 0.838, 0.136], [0.0464, 0.186, 0.556, 0.113], [0.0232, 0.0464, 0.965, 0.0898], [0.0232, 0.186, 0.661, 0.0898], [0.0232, 2, 0.871, 0.0201], [0, 2, 0.67, 0.0201], [0.0232, 0.0464, 0.992, 0.136], [0.0232, 0.0929, 1, 0.0434], [0, 2, 0.658, 0.0201], [0.0464, 0.116, 0.759, 0.0434], [0.0232, 0.116, 0.576, 0.0201], [0.0464, 0.139, 0.726, 0.0201], [0.0232, 0.255, 0.519, 0.136], [0, 0.0464, 0.712, 0.0898], [0.0929, 0.163, 0.378, 0.113], [0.0232, 0.325, 0.174, 0.0201], [0.116, 0.163, 0.987, 0.159], [0.0232, 0.302, 0.516, 0.0201], [0.0232, 2, 0.814, 0.0201], [0, 0.139, 0.683, 0.0201], [0.0464, 2, 0.284, 0.159], [0, 0.139, 0.769, 0.0201], [0, 0.627, 0.503, 0.0201], [0, 1.16, 0.646, 0.229], [0.0232, 1.72, 0.445, 0.5], [0, 0.0464, 0.905, 0.0434], [0, 0.627, 0.632, 0.5], [0.441, 2, 0.217, 0.461], [0.0464, 0.975, 0.704, 0.252], [0, 0.511, 0.66, 0.5], [0.0929, 2.02, 0.0269, 0.5], [0.186, 1.6, 0.103, 0.5], [0.116, 0.998, 0.626, 0.5], [0.418, 0.65, 0.681, 0.5], [0.0232, 1.6, 0.199, 0.136], [0.418, 0.441, 0.703, 0.5], [0.0232, 0.998, 0.0314, 0.461], [0.0929, 1.72, 0.123, 0.5], [0, 1.44, 0.241, 0.5], [0.534, 2, 0.584, 0.5], [0.0232, 2, 0.885, 0.5], [0.0929, 1.51, 0.327, 0.5], [0.0232, 1.86, 0.238, 0.5], [0, 1.14, 0.0565, 0.252], [0, 0.604, 0.0565, 0.5], [0, 0.464, 0.062, 0.5], [0, 0.488, 0.0529, 0.0201], [0, 0.0232, 0.998, 0.0434], [0.0464, 0.882, 0.532, 0.252], [0, 0.279, 0.678, 0.0898], [0, 1.42, 0.0644, 0.5], [0, 0.116, 0.00112, 0.0201], [0, 0.488, 0.051, 0.0201], [3, 2, 0, 0.0201], [0, 0.975, 0.0521, 0.368], [0, 0.279, 0.0387, 0.0201], [0, 0.836, 0.0509, 0.0201], [0.627, 1.88, 4.54e-08, 0.0201], [0.0697, 0.163, 0.0072, 0.0201], [0.116, 0.255, 0.328, 0.299], [1.44, 2, 0.976, 0.5], [0.0232, 0.139, 0.0105, 0.5], [0, 0.209, 0.917, 0.5], [0.906, 2, 0.654, 0.5], [0.279, 2, 0.999, 0.5], [0, 0.302, 0.0269, 0.0201]];
  var volumes = [1.5, 1, 1.05, 1.05, 1.1];
  var vibrato = [0.5, 0.6, 0.4, 0.7, 0.8, 0.9, 0.3, 1, 0.4, 0.2, 0.1, 3, 0.5, 0.3, 0.2, 0.6, 5, 4.5, 5.5, 1, 3, 4, 6, 4.5, 8, 8.5, 7, 6.5, 5, 9, 10, 2, 5, 4.5, 5, 7, 3, 3.5, 6, 6.5, 12, 11, 10, 8, 15, 0.5, 1, 0.2, 8, 7.5, 9, 9.5, 6, 6.5, 7, 0.1, 10, 9, 7, 8.5, 8, 7.5, 9.5, 10, 12, 11.5, 11, 10, 9, 8.5, 7.5, 10.5, 7, 6, 5, 4, 2, 5.5, 3, 2.5, 5, 6, 4, 3.5, 7, 6.5, 4.5, 5.5, 3, 3.5, 4, 5, 6, 2, 4.5, 3, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 7, 6, 5, 3, 9, 10, 7.5, 0.1, 0.2, 0.3, 0, 0, 0.5, 1, 0, 0, 0.5, 0, 0, 0, 0, 0, 0];
  function base64ToBuffer(base64String) {
    // Decode the base64 data
    var binaryData = atob(base64String);

    // Create a buffer to hold the binary data
    var buffer = new ArrayBuffer(binaryData.length);
    var view = new Uint8Array(buffer);

    // Copy the binary data into the buffer
    for (var i = 0; i < binaryData.length; i++) {
      view[i] = binaryData.charCodeAt(i);
    }
    return buffer;
  }
  function dequantize(uint8Arr) {
    return new Float32Array(uint8Arr).map(function (value) {
      if (value == 0) return 0;else if (value == 255) return 1;
      var dbValue = value * (80 / 255) - 80;
      return Math.pow(10, dbValue / 20);
    });
  }
  function parseInstruments(arrayBuffer) {
    var dataView = new DataView(arrayBuffer);
    var instruments = [];
    var offset = 0;
    for (var octave = 0; octave < 5; octave++) {
      var octaveData = [];
      instruments.push(octaveData);
      for (var program = 0; program < 128; program++) {
        var programData = {
          mul: 0,
          data: [],
          adsr: []
        };

        // const loudness = -(255 - dataView.getUint8(offset)) / 4;
        programData.mul = volumes[octave]; // Math.sqrt(10 ** (((-6) - loudness) / 20));//muls[octave];
        // offset++;

        programData.adsr = envelope[program];
        // for (let i = 0; i < 4; i++) {
        //     programData.adsr.push(dataView.getUint8(offset) / 255 * 5);
        //     offset++;
        // }

        var ampLen = dataView.getUint8(offset);
        offset++;
        programData.data = dequantize(new Uint8Array(arrayBuffer.slice(offset, offset + ampLen)));
        offset += ampLen;
        octaveData.push(programData);
      }
    }
    console.log(instruments);
    return instruments;
  }

  // Variable to store parsed instruments
  var instruments = null;

  // Function to load waves from a buffer
  function loadWaves(buffer) {
    // If no buffer is provided, load default periodic wave table
    if (!buffer) {
      var b = base64ToBuffer(defaultWave.instrumentData);
      instruments = parseInstruments(b);
    } else {
      try {
        // Parse instruments from the provided buffer
        instruments = parseInstruments(buffer);
      } catch (e) {
        // If an error occurs during parsing, load default waves
        loadWaves();
      }
    }
  }

  // Load waves initially
  loadWaves();

  // Generate a random phase value between -π and π
  function getRandomPhase() {
    return Math.random() * 2 * Math.PI - Math.PI;
  }

  // Create a waveform based on the instrument
  function createWave(inst) {
    // DC offset, should always be 0
    var real = [0];
    var imag = [0];
    // Generate the real and imaginary parts of the waveform
    inst.data.forEach(function (f) {
      var phase = getRandomPhase();
      real.push(f * Math.cos(phase));
      imag.push(f * Math.sin(phase));
    });
    // Return the waveform as an array of Float32Arrays
    return [new Float32Array(real), new Float32Array(imag)];
  }

  // Get the waveform for a specific instrument and octave (default octave is 2)
  function getWave(context, instId) {
    var octave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var inst = instruments[octave][instId];
    // Check if the waveform for the given instrument and octave is already cached
    if (inst.wave) {
      // If cached, return the cached waveform
      return inst;
    } else {
      // If not cached, create the waveform
      var samples = createWave(inst);
      // Create custom waveform using the context
      var customWaveform = context.createPeriodicWave(samples[0], samples[1]);
      // Cache the custom waveform for future use
      inst.wave = customWaveform;
      // Return the custom waveform
      return inst;
    }
  }
  function findClosestNumberIndex(target) {
    // Calculate the index based on the fixed sequence properties
    if (target <= 45) {
      return 0;
    } else if (target >= 93) {
      return 4;
    } else {
      return Math.round((target - 45) / 12);
    }
  }
  function getVolumeMul(note) {
    var val = (note - 45) / 12;
    if (val <= 0) return volumes[0];
    if (val >= volumes.length - 1) return volumes[volumes.length - 1];
    var i = Math.floor(val);
    return volumes[i] + (volumes[i + 1] - volumes[i]) * (val - i);
  }

  function createBaseNote(option, isBuffer, isExpression, nonChannel, nonStop) {
    var _this = this;
    // 最低限の変数を準備（無音の場合は処理終了するため） //
    var settings = this.settings;
    var context = this.context;
    var songStartTime = this.states.startTime;
    var baseLatency = this.baseLatency;
    var channel = nonChannel ? 0 : option.channel || 0;
    var velocity = option.velocity * Number(nonChannel ? 1 : this.channels[channel][2] != null ? this.channels[channel][2] : 1) * settings.generateVolume;
    var isGainValueZero = true;

    // 無音の場合は処理終了 //
    if (velocity <= 0) return {
      isGainValueZero: true
    };

    // 音量の変化を設定 //
    var expGainValue = velocity * ((option.expression ? option.expression[0].value : 100) / 127);
    var expGainNode = context.createGain();
    expGainNode.gain.value = expGainValue;
    if (isExpression) {
      option.expression ? option.expression.forEach(function (p) {
        var v = velocity * (p.value / 127);
        if (v > 0) isGainValueZero = false;
        var t = Math.max(0, p.time + songStartTime + baseLatency);
        expGainNode.gain.setValueAtTime(v, t);
      }) : false;
    } else {
      if (expGainValue > 0) {
        isGainValueZero = false;
      }
    }

    // 無音の場合は処理終了 //
    if (isGainValueZero) {
      // 音量が常に0なら音を鳴らさない
      return {
        isGainValueZero: true
      };
    }

    // 全ての変数を準備 //
    var start = option.startTime + songStartTime + baseLatency;
    var stop = option.stopTime + songStartTime + baseLatency;
    var pitch = settings.basePitch * Math.pow(Math.pow(2, 1 / 12), (option.pitch || 69) - 69);
    var oscillator = !isBuffer ? context.createOscillator() : context.createBufferSource();
    var panNode = context.createStereoPanner ? context.createStereoPanner() : context.createPanner ? context.createPanner() : {
      pan: {
        setValueAtTime: function setValueAtTime() {}
      }
    };
    var gainNode = context.createGain();
    var stopGainNode = context.createGain();

    // ドラムはホワイトノイズ、ドラム以外はoscillatorを設定 //
    // oscillatorはピッチ変動も設定 //
    if (!isBuffer) {
      oscillator.type = option.type || "sine";
      oscillator.detune.value = 0;
      oscillator.frequency.value = pitch;
      option.pitchBend ? option.pitchBend.forEach(function (p) {
        var t = Math.max(0, p.time + songStartTime + baseLatency);
        oscillator.frequency.setValueAtTime(settings.basePitch * Math.pow(Math.pow(2, 1 / 12), option.pitch - 69 + p.value), t);
      }) : false;
    } else {
      oscillator.loop = true;
      if (option.channel != 9) {
        var octave = findClosestNumberIndex(option.pitch);
        var baseNote = 45 + octave * 12;
        var basePitch = (option.pitch - baseNote) * 100;
        option.pitchBend ? option.pitchBend.forEach(function (p) {
          var t = Math.max(0, p.time + songStartTime + baseLatency);
          oscillator.detune.setValueAtTime(basePitch + p.value * 100, t);
        }) : false;
      }
      // oscillator.buffer = this.whitenoise;
    }

    // パンの初期値を設定 //
    var panValue = option.pan && option.pan[0].value != 64 ? option.pan[0].value / 127 * 2 - 1 : 0;
    initPanValue(context, panNode, panValue);

    // パンの変動を設定 //
    if (context.createStereoPanner || context.createPanner) {
      // StereoPannerNode or PannerNode がどちらかでも使える
      var firstNode = true;
      if (context.createStereoPanner) {
        // StereoPannerNode が使える
        option.pan ? option.pan.forEach(function (p) {
          if (firstNode) {
            firstNode = false;
            return;
          }
          var v = Math.min(1.0, p.value == 64 ? 0 : p.value / 127 * 2 - 1);
          var t = Math.max(0, p.time + songStartTime + baseLatency);
          panNode.pan.setValueAtTime(v, t);
        }) : false;
      } else if (context.createPanner) {
        // StereoPannerNode が未サポート、PannerNode が使える
        if (panNode.positionX) {
          // setValueAtTimeが使える
          // Old Browser
          var firstPan = true;
          option.pan ? option.pan.forEach(function (p) {
            if (firstPan) {
              firstPan = false;
              return;
            }
            var v = p.value == 64 ? 0 : p.value / 127 * 2 - 1;
            var posObj = convPosition(v);
            var t = Math.max(0, p.time + songStartTime + baseLatency);
            panNode.positionX.setValueAtTime(posObj.x, t);
            panNode.positionY.setValueAtTime(posObj.y, t);
            panNode.positionZ.setValueAtTime(posObj.z, t);
          }) : false;
        } else {
          // iOS
          // setValueAtTimeが使えないためsetTimeoutでパンの動的変更
          option.pan ? option.pan.forEach(function (p) {
            if (firstNode) {
              firstNode = false;
              return;
            }
            var reservePan = setTimeout(function () {
              _this.clearFunc("pan", reservePan);
              var v = Math.min(1.0, p.value == 64 ? 0 : p.value / 127 * 2 - 1);
              var posObj = convPosition(v);
              panNode.setPosition(posObj.x, posObj.y, posObj.z);
            }, (p.time + songStartTime + baseLatency - context.currentTime) * 1000);
            _this.pushFunc({
              pan: reservePan,
              stopFunc: function stopFunc() {
                clearTimeout(reservePan);
              }
            });
          }) : false;
        }
      }
      oscillator.connect(panNode);
      panNode.connect(expGainNode);
    } else {
      // StereoPannerNode、PannerNode が未サポート
      oscillator.connect(expGainNode);
    }

    // AudioNodeを接続 //
    expGainNode.connect(gainNode);
    gainNode.connect(stopGainNode);
    stopGainNode.connect(this.masterGainNode);
    // this.masterGainNode.connect(context.destination);

    // モジュレーションの変動を設定 //
    var modulationOscillator;
    var modulationGainNode;
    if (!isBuffer && option.modulation && (option.modulation.length >= 2 || option.modulation[0].value > 0)) {
      modulationOscillator = context.createOscillator();
      modulationGainNode = context.createGain();
      var _firstNode = true;
      option.modulation ? option.modulation.forEach(function (p) {
        if (_firstNode) {
          _firstNode = false;
          return;
        }
        var m = Math.min(1.0, p.value / 127);
        var t = Math.max(0, p.time + songStartTime + baseLatency);
        modulationGainNode.gain.setValueAtTime(pitch * 10 / 440 * m, t);
      }) : false;
      var m = Math.min(1.0, option.modulation ? option.modulation[0].value / 127 : 0);
      modulationGainNode.gain.value = pitch * 10 / 440 * m;
      modulationOscillator.frequency.value = 6;
      modulationOscillator.connect(modulationGainNode);
      modulationGainNode.connect(oscillator.frequency);
    }

    // リバーブの変動を設定 //
    if (this.settings.isReverb && option.reverb && (option.reverb.length >= 2 || option.reverb[0].value > 0)) {
      var convolver = this.convolver;
      var convolverGainNode = context.createGain();
      var _firstNode2 = true;
      option.reverb ? option.reverb.forEach(function (p) {
        if (_firstNode2) {
          _firstNode2 = false;
          return;
        }
        var r = Math.min(1.0, p.value / 127);
        var t = Math.max(0, p.time + songStartTime + baseLatency);
        convolverGainNode.gain.setValueAtTime(r, t);
      }) : false;
      var r = Math.min(1.0, option.reverb ? option.reverb[0].value / 127 : 0);
      convolverGainNode.gain.value = r;
      gainNode.connect(stopGainNode);
      stopGainNode.connect(convolverGainNode);
      convolverGainNode.connect(convolver);
    }

    // コーラスの変動を設定 //
    if (this.settings.isChorus && option.chorus && (option.chorus.length >= 2 || option.chorus[0].value > 0)) {
      var chorusDelayNode = this.chorusDelayNode;
      var chorusGainNode = context.createGain();
      var _firstNode3 = true;
      option.chorus ? option.chorus.forEach(function (p) {
        if (_firstNode3) {
          _firstNode3 = false;
          return;
        }
        var c = Math.min(1.0, p.value / 127);
        var t = Math.max(0, p.time + songStartTime + baseLatency);
        chorusGainNode.gain.setValueAtTime(c, t);
      }) : false;
      var c = Math.min(1.0, option.chorus ? option.chorus[0].value / 127 : 0);
      chorusGainNode.gain.value = c;
      gainNode.connect(stopGainNode);
      stopGainNode.connect(chorusGainNode);
      chorusGainNode.connect(chorusDelayNode);
    }

    // モジュレーションをスタート //
    if (modulationOscillator) {
      modulationOscillator.start(start);
      this.stopAudioNode(modulationOscillator, stop, modulationGainNode);
    }

    // oscillator又はホワイトノイズをスタート //
    oscillator.start(start);
    if (!isBuffer && !nonChannel && !nonStop) {
      this.stopAudioNode(oscillator, stop, stopGainNode);
    }

    // AudioNodeやパラメータを返す //
    return {
      start: start,
      stop: stop,
      pitch: pitch,
      channel: channel,
      velocity: velocity,
      oscillator: oscillator,
      panNode: panNode,
      gainNode: gainNode,
      stopGainNode: stopGainNode,
      isGainValueZero: false
    };
  }

  /**
   * パンの初期値を設定
   * @param {PannerNode | StereoPannerNode} panNode 
   * @param {number} panValue 
   */
  function initPanValue(context, panNode, panValue) {
    if (context.createStereoPanner) {
      if (panValue > 1.0) panValue = 1.0;
      panNode.pan.value = panValue;
    } else if (context.createPanner) {
      // iOS, Old Browser
      var posObj = convPosition(panValue);
      panNode.panningModel = "equalpower";
      panNode.setPosition(posObj.x, posObj.y, posObj.z);
    }
  }

  /**
   * pan値を基に、PannerNode用の値を{x, y, z}で返す
   * @param {number} panValue panの値
   * @returns Object{x, y, z}
   */
  function convPosition(panValue) {
    if (panValue > 1.0) panValue = 1.0;
    var obj = {};
    var panAngle = panValue * 90;
    obj.x = Math.sin(panAngle * (Math.PI / 180));
    obj.y = 0;
    obj.z = -Math.cos(panAngle * (Math.PI / 180));
    return obj;
  }

  var waveCache = _toConsumableArray(Array(6)).map(function () {
    return [];
  });
  var buffer = null;
  var pointers = [];

  /**
   * @param {AudioContext} ctx 
   * @param {ArrayBuffer} arrayBuffer 
   */
  function parseSamples(arrayBuffer) {
    buffer = arrayBuffer;
    var dataView = new DataView(arrayBuffer);
    var instruments = [];
    var off = 0;
    for (var o = 0; o < 5; o++) {
      var octaveData = [];
      instruments.push(octaveData);
      for (var i = 0; i < 128; i++) {
        var len = dataView.getInt32(off, true);
        off += 4;
        instruments[o][i] = [off, len];
        off += len;
      }
    }
    instruments.push([]);
    for (var _i = 0; _i < 128; _i++) {
      var _len = dataView.getInt32(off, true);
      off += 4;
      instruments[5][_i] = [off, _len];
      off += _len;
    }
    return instruments;
  }
  function loadSamples(buffer) {
    pointers = parseSamples(buffer);
    waveCache = _toConsumableArray(Array(6)).map(function () {
      return [];
    });
  }
  function decodeSample(_x, _x2, _x3) {
    return _decodeSample.apply(this, arguments);
  } // Get the waveform for a specific instrument and octave (default octave is 2)
  function _decodeSample() {
    _decodeSample = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(ctx, octave, instId) {
      var ptr, sample;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            ptr = pointers[octave][instId];
            sample = buffer.slice(ptr[0], ptr[0] + ptr[1]);
            return _context.abrupt("return", ctx.decodeAudioData(sample));
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.warn(_context.t0);
            return _context.abrupt("return", null);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 6]]);
    }));
    return _decodeSample.apply(this, arguments);
  }
  function getSample(_x4, _x5) {
    return _getSample.apply(this, arguments);
  }
  function _getSample() {
    _getSample = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(ctx, instId) {
      var octave,
        decoded,
        _args2 = arguments;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            octave = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 2;
            if (!(waveCache[octave] && waveCache[octave][instId])) {
              _context2.next = 3;
              break;
            }
            return _context2.abrupt("return", waveCache[octave][instId]);
          case 3:
            decoded = decodeSample(ctx, octave, instId);
            if (decoded) {
              waveCache[octave][instId] = decoded;
            }
            return _context2.abrupt("return", decoded);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _getSample.apply(this, arguments);
  }
  function getDrumSample(_x6, _x7) {
    return _getDrumSample.apply(this, arguments);
  }
  function _getDrumSample() {
    _getDrumSample = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(ctx, key) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", getSample(ctx, key, 5));
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return _getDrumSample.apply(this, arguments);
  }

  function createNote(option) {
    var _this = this;
    var isBuffer = this.settings.soundQuality == 3;
    var note = this.createBaseNote(option, isBuffer, true, false, true); // oscillatorのstopはこちらで実行するよう指定
    if (note.isGainValueZero) return null;
    var oscillator = note.oscillator;
    var gainNode = note.gainNode;
    var stopGainNode = note.stopGainNode;
    var isPizzicato = false;
    var isNoiseCut = false;
    var note2;

    // 音色の設定 //
    gainNode.gain.value *= this.settings.instrumentAttenuation; // Instrument volume attenuation

    switch (this.settings.soundQuality) {
      case -1:
        break;
      case 0:
        switch (this.channels[note.channel][0] * 1000 || option.instrument) {
          // Sine
          case 1000:
          case 6:
          case 15:
          case 24:
          case 26:
          case 46:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 82:
          case 85:
          case 86:
            {
              oscillator.type = "sine";
              gainNode.gain.value *= 1.5;
              break;
            }
          // Square
          case 2000:
          case 4:
          case 12:
          case 13:
          case 16:
          case 19:
          case 20:
          case 32:
          case 34:
          case 45:
          case 48:
          case 49:
          case 55:
          case 56:
          case 57:
          case 61:
          case 62:
          case 63:
          case 71:
          case 72:
          case 73:
          case 74:
          case 75:
          case 76:
          case 77:
          case 78:
          case 79:
          case 80:
          case 84:
            {
              oscillator.type = "square";
              gainNode.gain.value *= 0.8;
              break;
            }
          // Sawtooth
          case 3000:
          case 0:
          case 1:
          case 2:
          case 3:
          case 7:
          case 17:
          case 18:
          case 21:
          case 22:
          case 23:
          case 27:
          case 28:
          case 29:
          case 30:
          case 36:
          case 37:
          case 38:
          case 39:
          case 40:
          case 41:
          case 42:
          case 43:
          case 44:
          case 47:
          case 59:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
          case 70:
          case 87:
            {
              oscillator.type = "sawtooth";
              break;
            }
          // Triangle
          case 4000:
          case 8:
          case 9:
          case 10:
          case 11:
          case 14:
          case 25:
          case 31:
          case 33:
          case 35:
          case 58:
          case 60:
          case 83:
          case 88:
          case 89:
          case 90:
          case 91:
          case 92:
          case 93:
          case 94:
          case 95:
            {
              oscillator.type = "triangle";
              gainNode.gain.value *= 1.5;
              break;
            }
          // Other - Square
          default:
            {
              oscillator.type = "square";
            }
        }
        break;
      case 1:
        var inst = getWave(this.context, option.instrument, findClosestNumberIndex(option.pitch));
        oscillator.setPeriodicWave(inst.wave);
        if (this.settings.enableEqualizer) gainNode.gain.value *= getVolumeMul(option.pitch);
        break;
      case 3:
        oscillator.loop = !quickfadeArray[option.instrument];
        var octave = findClosestNumberIndex(option.pitch);
        getSample(this.context, option.instrument, octave).then(function (sample) {
          oscillator.buffer = sample;
        });
        var baseNote = 45 + octave * 12;
        oscillator.loopStart = 1;
        oscillator.basePitch = (option.pitch - baseNote) * 100;
        oscillator.detune.value = oscillator.basePitch;
        break;
    }

    // 音の終わりのプチプチノイズが気になるので、音の終わりに5ms減衰してノイズ軽減 //
    if ((oscillator.type == "sine" || oscillator.type == "triangle") && !isPizzicato && note.stop - note.start > 0.01) {
      isNoiseCut = true;
    }

    // 減衰の設定 //
    switch (this.settings.soundQuality) {
      case 0:
        switch (this.channels[note.channel][1] / 10 || option.instrument) {
          // ピッチカート系減衰
          case 0.2:
          case 12:
          case 13:
          case 45:
          case 55:
            {
              isPizzicato = true;
              gainNode.gain.value *= 1.1;
              gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
              gainNode.gain.linearRampToValueAtTime(0.0, note.start + 0.2);
              this.stopAudioNode(oscillator, note.start + 0.2, stopGainNode);
              break;
            }
          // ピアノ程度に伸ばす系
          case 0.3:
          case 0:
          case 1:
          case 2:
          case 3:
          case 6:
          case 9:
          case 11:
          case 14:
          case 15:
          case 32:
          case 36:
          case 37:
          case 46:
          case 47:
            {
              gainNode.gain.value *= 1.1;
              var decay = (128 - option.pitch) / 128;
              gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
              gainNode.gain.linearRampToValueAtTime(gainNode.gain.value * 0.85, note.start + decay * decay / 8);
              gainNode.gain.linearRampToValueAtTime(gainNode.gain.value * 0.8, note.start + decay * decay / 4);
              gainNode.gain.setTargetAtTime(0, note.start + decay * decay / 4, 5 * decay * decay);
              this.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
              break;
            }
          // ギター系
          case 0.4:
          case 24:
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
          case 30:
          case 31:
          case 34:
            {
              gainNode.gain.value *= 1.1;
              gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
              gainNode.gain.linearRampToValueAtTime(0.0, note.start + 1.0 + note.velocity * 4);
              this.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
              break;
            }
          // 減衰していくけど終わらない系
          case 0.5:
          case 4:
          case 5:
          case 7:
          case 8:
          case 10:
          case 33:
          case 35:
            {
              gainNode.gain.value *= 1.0;
              gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
              gainNode.gain.linearRampToValueAtTime(gainNode.gain.value * 0.95, note.start + 0.1);
              gainNode.gain.setValueAtTime(gainNode.gain.value * 0.95, note.start + 0.1);
              gainNode.gain.linearRampToValueAtTime(0.0, note.start + 2.0 + note.velocity * 10);
              this.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
              break;
            }
          case 119:
            // Reverse Cymbal
            {
              gainNode.gain.value = 0;
              this.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
              note2 = this.createBaseNote(option, true, true);
              if (note2.isGainValueZero) break;
              note2.oscillator.playbackRate.setValueAtTime((option.pitch + 1) / 128, note.start);
              note2.gainNode.gain.setValueAtTime(0, note.start);
              note2.gainNode.gain.linearRampToValueAtTime(1.3, note.start + 2);
              this.stopAudioNode(note2.oscillator, note.stop, note2.stopGainNode);
              break;
            }
          default:
            {
              gainNode.gain.value *= 1.1;
              gainNode.gain.setValueAtTime(gainNode.gain.value, note.start);
              this.stopAudioNode(oscillator, note.stop, stopGainNode, isNoiseCut);
            }
        }
        break;
      case -1:
      case 1:
        {
          var _inst = getWave(this.context, option.instrument, findClosestNumberIndex(option.pitch));
          // Apply envelope to note
          var _instEnvelope = _inst.adsr;
          var attack = _instEnvelope[0],
            _decay = _instEnvelope[1],
            sustain = _instEnvelope[2],
            _release = _instEnvelope[3];
          var isPluck = quickfadeArray[option.instrument];
          var _velocity = gainNode.gain.value;
          var attackClamped = Math.max(attack, 0.001);

          // Setup vibrato effect
          try {
            var vibratoSample;
            var songStartTime = this.states.startTime;

            // If expression data exists (for dynamic vibrato)
            if (option.expression) {
              var xArray = []; // Time points
              var valueArray = []; // Vibrato strength values

              // Prepare time and value arrays from expression data
              option.expression.forEach(function (element) {
                xArray.push(element.time - note.start + songStartTime);
                valueArray.push(Math.pow(element.value / 127, 2)); // Convert MIDI value to strength
              });

              // Create dynamic vibrato samples by interpolating expression values
              vibratoSample = this.vibratoSamples.map(function (e, i) {
                var t = i / _this.context.sampleRate * 100;
                return e * vibrato[option.instrument] * InterpolationUtil.linearInterp(xArray, valueArray, t);
              });
            }
            // If no expression data (static vibrato)
            else {
              // Use cached vibrato if available
              if (this.vibratoCache[option.instrument]) {
                vibratoSample = this.vibratoCache[option.instrument];
              }
              // Create new vibrato samples and cache them
              else {
                vibratoSample = this.vibratoSamples.map(function (e) {
                  return e * vibrato[option.instrument];
                });
                this.vibratoCache[option.instrument] = vibratoSample;
              }
            }

            // Apply the vibrato effect to the oscillator
            oscillator.detune.setValueCurveAtTime(vibratoSample, note.start, 10);
          } catch (e) {
            console.error(e); // Log any errors
          }
          gainNode.gain.setValueAtTime(0, note.start);
          // Attack phase
          gainNode.gain.setTargetAtTime(_velocity, note.start, attackClamped / 3);

          // Decay phase
          if (isPluck) {
            var decayTime = _decay * Math.pow(2, (69 - option.pitch) / 24);
            gainNode.gain.setTargetAtTime(0, note.start + attackClamped, decayTime / 2);
          } else {
            gainNode.gain.setTargetAtTime(_velocity * sustain, note.start + attackClamped, _decay / 2);
          }

          // Sustain phase (no explicit scheduling needed)

          // Release phase
          var _releaseClamped = Math.min(_release, 0.25);
          gainNode.gain.setTargetAtTime(0, note.stop, _releaseClamped / 3);
          this.stopAudioNode(oscillator, note.stop + _releaseClamped, stopGainNode, isNoiseCut);
        }
        break;
      case 3:
        var _inst2 = getWave(this.context, option.instrument, findClosestNumberIndex(option.pitch));
        // Apply envelope to note
        var instEnvelope = _inst2.adsr;
        var release = instEnvelope[3];
        var velocity = gainNode.gain.value * 1.5;
        gainNode.gain.setValueAtTime(velocity, note.start);

        // Release phase
        var releaseClamped = Math.min(release, 0.25);
        gainNode.gain.setTargetAtTime(0, note.stop, releaseClamped / 3);
        this.stopAudioNode(oscillator, note.stop + releaseClamped, stopGainNode, isNoiseCut);
    }

    // 音をストップさせる関数を返す //
    return function () {
      _this.stopAudioNode(oscillator, 0, stopGainNode, true);
      if (note2 && note2.oscillator) _this.stopAudioNode(note2.oscillator, 0, note2.stopGainNode, true);
    };
  }

  function createPercussionNote(option) {
    var _this = this;
    var note = this.createBaseNote(option, true, false);
    if (note.isGainValueZero) return null;
    var source = note.oscillator;
    // if (this.settings.soundQuality != 3) source.buffer = this.whitenoise;
    var gainNode = note.gainNode;
    var stopGainNode = note.stopGainNode;
    var start = note.start;
    var velocity = 1; // ドラム全体の音量調整用
    var note2 = this.createBaseNote(option, false, false, true);
    var oscillator = note2.oscillator;
    var gainNode2 = note2.gainNode;
    var stopGainNode2 = note2.stopGainNode;
    var nextSameNoteOnInterval = option.nextSameNoteOnInterval;

    // oscillator.frequency.setValueAtTime()がcurrentTimeより遅れると周波数設定がされないので対策
    if (start < this.context.currentTime) start = this.context.currentTime;
    var stopAudioTime = 0;
    var stopAudioTime2 = 0;
    switch (this.settings.soundQuality) {
      case 3:
        gainNode.gain.value = velocity * 1.5;
        gainNode2.gain.value = 0;
        source.loop = false;
        stopAudioTime = 2;
        stopAudioTime2 = 2;
        getDrumSample(this.context, option.pitch).then(function (sample) {
          source.buffer = sample;
        });
        break;
      case 1:
        {
          switch (option.pitch) {
            // 新しいパーカッション音源（旧音源の置き換え） //

            // Bass Drum
            case 35: // Acoustic Bass Drum
            case 36:
              // Bass Drum
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 0.25;
                gainNode.gain.setValueAtTime(0, start);
                gainNode.gain.linearRampToValueAtTime(velocity * 0.7, start + 0.004);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.008);
                stopAudioTime = 0.008;
                // s
                oscillator.frequency.setValueAtTime(option.pitch == 35 ? 90 : 160, start);
                oscillator.frequency.linearRampToValueAtTime(40, start + 0.08);
                gainNode2.gain.setValueAtTime(0, start);
                gainNode2.gain.linearRampToValueAtTime(velocity * 3, start + 0.02);
                gainNode2.gain.linearRampToValueAtTime(0, start + 0.08);
                stopAudioTime2 = 0.08;
                break;
              }
            case 38: // Acoustic Snare
            case 40:
              // Electric Snare
              {
                var len = option.pitch == 38 ? 0.2 : 0.25;
                // w
                source.buffer = this.pinknoise;
                source.playbackRate.value = 0.7;
                gainNode.gain.setValueAtTime(velocity * 2.4, start);
                gainNode.gain.setTargetAtTime(0, start, len * 0.4);
                stopAudioTime = len;
                // s
                oscillator.frequency.setValueAtTime(option.pitch == 38 ? 150 : 175, start);
                oscillator.frequency.setTargetAtTime(option.pitch == 38 ? 140 : 160, start, 0.07);
                gainNode2.gain.setValueAtTime(velocity * 3, start);
                gainNode2.gain.setTargetAtTime(0, start, 0.07);
                stopAudioTime2 = 0.2;
                break;
              }
            // Toms
            case 41: // Low Floor Tom
            case 43: // High Floor Tom
            case 45: // Low Tom
            case 47: // Low-Mid Tom
            case 48: // High-Mid Tom
            case 50:
              // High Tom
              {
                var _len = option.pitch - 41 + (option.pitch >= 48 ? 1 : 0);
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 0.3 + _len / 45;
                gainNode.gain.setValueAtTime(velocity * 1.5, start);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.02);
                stopAudioTime = 0.02;
                // s
                oscillator.frequency.setValueAtTime(90 + 15 * _len, start);
                oscillator.frequency.linearRampToValueAtTime(30 + 7.5 * _len, start + 0.5 - _len / 35);
                gainNode2.gain.setValueAtTime(velocity * 1.5, start);
                gainNode2.gain.linearRampToValueAtTime(0, start + 0.5 - _len / 35);
                stopAudioTime2 = 0.5 - _len / 35;
                break;
              }
            // Hi-hat
            case 42: // Closed High-Hat
            case 44:
              // Pedal High-Hat
              {
                // w
                source.buffer = this.cymbalnoise;
                source.playbackRate.value = 1;
                if (option.pitch == 42) {
                  gainNode.gain.setValueAtTime(velocity * 0.72, start);
                } else {
                  gainNode.gain.setValueAtTime(0, start);
                  gainNode.gain.linearRampToValueAtTime(velocity * 0.36, start + 0.014);
                }
                gainNode.gain.linearRampToValueAtTime(0, start + 0.08);
                stopAudioTime = 0.08;
                // s
                gainNode2.gain.value = 0;
                stopAudioTime2 = 0;
                break;
              }
            case 46:
              // Open Hihat
              {
                // w
                source.buffer = this.cymbalnoise;
                source.playbackRate.setValueAtTime(1.35, start);
                source.playbackRate.linearRampToValueAtTime(1.6, start + 0.1);
                source.playbackRate.linearRampToValueAtTime(1, start + 0.3);
                gainNode.gain.setValueAtTime(velocity * 1.2, start);
                gainNode.gain.setTargetAtTime(0, start, 0.3);
                stopAudioTime = 1.5;
                // s
                gainNode2.gain.value = 0;
                stopAudioTime2 = 0;
                break;
              }
            // Cymbal
            case 49: // Crash Cymbal 1
            case 57:
              // Crash Cymbal 2
              {
                // w
                source.buffer = this.cymbalnoise;
                var r = option.pitch == 49 ? 0.5 : 0.7;
                var r2 = option.pitch == 49 ? 0.6 : 0.9;
                source.playbackRate.setValueAtTime(r, start);
                source.playbackRate.linearRampToValueAtTime(r2, start + 0.15);
                source.playbackRate.linearRampToValueAtTime(0.9, start + 0.4);
                gainNode.gain.setValueAtTime(velocity * 1.3, start);
                gainNode.gain.setTargetAtTime(0, start, 0.35);
                stopAudioTime = 2;
                // s
                gainNode2.gain.value = 0;
                stopAudioTime2 = 0;
                break;
              }
            case 51: // Ride Cymbal 1
            case 59:
              // Ride Cymbal 2
              {
                // w
                source.buffer = this.cymbalnoise;
                source.playbackRate.value = 1;
                gainNode.gain.setValueAtTime(velocity * 1.1, start);
                gainNode.gain.setTargetAtTime(0, start, 0.35);
                stopAudioTime = 2;
                // s
                oscillator.type = "triangle";
                var f = option.pitch == 51 ? 372 : 400;
                oscillator.frequency.setValueAtTime(f, start);
                gainNode2.gain.setValueAtTime(velocity * 0.4, start);
                gainNode2.gain.setTargetAtTime(0, start, 0.35);
                stopAudioTime2 = 2;
                break;
              }
            case 52:
              // Chinese Cymbal
              {
                // w
                source.buffer = this.cymbalnoise;
                source.playbackRate.setValueAtTime(0.17, start);
                source.playbackRate.linearRampToValueAtTime(0.25, start + 0.1);
                source.playbackRate.linearRampToValueAtTime(0.5, start + 0.6);
                gainNode.gain.setValueAtTime(velocity * 1.5, start);
                gainNode.gain.setTargetAtTime(0, start, 0.35);
                stopAudioTime = 2;
                // s
                oscillator.type = "triangle";
                oscillator.frequency.setValueAtTime(382, start);
                gainNode2.gain.setValueAtTime(velocity * 0.2, start);
                gainNode2.gain.setTargetAtTime(0, start, 0.35);
                stopAudioTime2 = 2;
                break;
              }
            case 53:
              // Ride Bell
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.setValueAtTime(0.6, start);
                gainNode.gain.setValueAtTime(velocity, start);
                gainNode.gain.setTargetAtTime(0, start, 0.3);
                stopAudioTime = 2;
                // s
                oscillator.type = "triangle";
                oscillator.frequency.setValueAtTime(377, start);
                gainNode2.gain.setValueAtTime(velocity * 0.5, start);
                gainNode2.gain.setTargetAtTime(0, start, 0.35);
                stopAudioTime2 = 2;
                break;
              }
            case 55:
              // Splash Cymbal
              {
                // w
                source.buffer = this.cymbalnoise;
                source.playbackRate.setValueAtTime(0.5, start);
                source.playbackRate.linearRampToValueAtTime(0.8, start + 0.1);
                source.playbackRate.linearRampToValueAtTime(1, start + 0.6);
                gainNode.gain.setValueAtTime(velocity * 1.5, start);
                gainNode.gain.setTargetAtTime(0, start, 0.3);
                stopAudioTime = 1.75;
                // s
                gainNode2.gain.value = 0;
                stopAudioTime2 = 0;
                break;
              }
            case 56:
              // Cowbell
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.setValueAtTime(1, start);
                var v = option.pitch == 54 ? 1 : 0.4;
                var _len2 = option.pitch == 54 ? 0.01 : 0;
                gainNode.gain.setValueAtTime(velocity * v / 2, start);
                gainNode.gain.linearRampToValueAtTime(velocity * v, start + _len2);
                gainNode.gain.setTargetAtTime(0, start + _len2, 0.05);
                stopAudioTime = 0.3;
                // s
                oscillator.frequency.setValueAtTime(option.pitch == 54 ? 6000 : 495, start);
                v = option.pitch == 54 ? 1 : 2;
                gainNode2.gain.setValueAtTime(velocity * v / 2, start);
                gainNode2.gain.linearRampToValueAtTime(velocity * v, start + _len2);
                gainNode2.gain.setTargetAtTime(0, start + _len2, 0.05);
                stopAudioTime2 = 0.3;
                break;
              }
            case 80:
              // Mute Triangle
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 1;
                gainNode.gain.setValueAtTime(velocity * 0.5, start);
                gainNode.gain.setTargetAtTime(0, start, 0.015);
                stopAudioTime = 0.2;
                // s
                oscillator.type = "triangle";
                oscillator.frequency.setValueAtTime(6000, start);
                gainNode2.gain.setValueAtTime(velocity * 2.5, start);
                gainNode2.gain.setTargetAtTime(0, start, 0.02);
                stopAudioTime2 = 0.3;
                break;
              }
            case 81:
              // Open Triangle
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 5;
                gainNode.gain.setValueAtTime(velocity * 0.5, start);
                gainNode.gain.setTargetAtTime(0, start, 0.08);
                stopAudioTime = 0.75;
                // s
                oscillator.type = "triangle";
                oscillator.frequency.setValueAtTime(6000, start);
                gainNode2.gain.setValueAtTime(velocity * 2.5, start);
                gainNode2.gain.setTargetAtTime(0, start, 0.18);
                stopAudioTime2 = 1;
                break;
              }
            // Other Percussion
            case 60: // High Bongo
            case 61: // Low Bongo
            case 62: // Mute High Conga
            case 63: // Open High Conga
            case 64:
              // Low Conga
              {
                var p = option.pitch;
                var _r = p == 60 ? 700 : p == 61 ? 282 : p == 62 ? 385 : p == 63 ? 295 : 210;
                var _len3 = p == 60 ? 0.08 : p == 61 ? 0.1 : p == 62 ? 0.03 : p == 63 ? 0.12 : 0.15;
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 0.03;
                gainNode.gain.setValueAtTime(velocity * 1.2, start);
                stopAudioTime = 0.03;
                // s
                oscillator.frequency.setValueAtTime(_r * 0.97, start);
                oscillator.frequency.linearRampToValueAtTime(_r, start + _len3);
                gainNode2.gain.setValueAtTime(velocity * 1.8, start);
                gainNode2.gain.linearRampToValueAtTime(0, start + _len3);
                stopAudioTime2 = _len3;
                break;
              }
            case 75:
              // Claves
              {
                // w
                gainNode.gain.value = 0;
                stopAudioTime = 0;
                // s
                oscillator.frequency.setValueAtTime(2181, start);
                gainNode2.gain.setValueAtTime(0, start);
                gainNode2.gain.setValueAtTime(velocity * 2, start + 0.005);
                gainNode2.gain.linearRampToValueAtTime(velocity * 1, start + 0.015);
                gainNode2.gain.linearRampToValueAtTime(velocity * 1.5, start + 0.025);
                gainNode2.gain.linearRampToValueAtTime(0, start + 0.08);
                stopAudioTime2 = 0.1;
                break;
              }

            // 新しいパーカッション音源 //

            // Snare Drum
            case 37:
              // Side Stick
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 0.26;
                gainNode.gain.setValueAtTime(velocity * 1.5, start);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.041);
                stopAudioTime = 0.041;
                // s
                oscillator.frequency.setValueAtTime(330, start);
                oscillator.frequency.linearRampToValueAtTime(120, start + 0.02);
                gainNode2.gain.setValueAtTime(velocity, start);
                gainNode2.gain.linearRampToValueAtTime(0, start + 0.02);
                stopAudioTime2 = 0.02;
                break;
              }
            case 39:
              // Hand Clap
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 0.5;
                gainNode.gain.setValueAtTime(velocity * 1.3, start);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.010);
                gainNode.gain.setValueAtTime(velocity * 1.3, start + 0.0101);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.020);
                gainNode.gain.setValueAtTime(velocity * 1.3, start + 0.0201);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.09);
                stopAudioTime = 0.09;
                // s
                oscillator.type = "triangle";
                oscillator.frequency.setValueAtTime(180, start);
                gainNode2.gain.setValueAtTime(velocity * 0.8, start);
                gainNode2.gain.linearRampToValueAtTime(0, start + 0.010);
                gainNode2.gain.setValueAtTime(velocity * 0.8, start + 0.0101);
                gainNode2.gain.linearRampToValueAtTime(0, start + 0.020);
                gainNode2.gain.setValueAtTime(velocity * 0.8, start + 0.0201);
                gainNode2.gain.linearRampToValueAtTime(0, start + 0.030);
                stopAudioTime2 = 0.11;
                break;
              }
            // Bell
            case 54:
              // Tambourine
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.setValueAtTime(1, start);
                var _v = option.pitch == 54 ? 1 : 0.4;
                var _len4 = option.pitch == 54 ? 0.01 : 0;
                gainNode.gain.setValueAtTime(velocity * _v / 2, start);
                gainNode.gain.linearRampToValueAtTime(velocity * _v, start + _len4);
                gainNode.gain.setTargetAtTime(0, start + _len4, 0.05);
                stopAudioTime = 0.3;
                // s
                oscillator.frequency.setValueAtTime(option.pitch == 54 ? 6000 : 495, start);
                _v = option.pitch == 54 ? 1 : 2;
                gainNode2.gain.setValueAtTime(velocity * _v / 2, start);
                gainNode2.gain.linearRampToValueAtTime(velocity * _v, start + _len4);
                gainNode2.gain.setTargetAtTime(0, start + _len4, 0.05);
                stopAudioTime2 = 0.3;
                break;
              }
            case 58:
              // Vibraslap
              {
                // w s
                source.buffer = this.whitenoise;
                source.playbackRate.setValueAtTime(0.6, start);
                source.playbackRate.linearRampToValueAtTime(1, start + 0.8);
                var _len5 = 40;
                gainNode.gain.setValueAtTime(velocity * 1.5, start);
                gainNode2.gain.setValueAtTime(velocity * 0.5, start);
                for (var i = 0; i < _len5; i++) {
                  gainNode.gain.linearRampToValueAtTime(velocity * 0.1 * (_len5 - i) / _len5, start + i / _len5 * 0.8);
                  gainNode.gain.linearRampToValueAtTime(velocity * 1.5 * (_len5 - (i + 1)) / _len5, start + (i + 0.99) / _len5 * 0.8);
                  gainNode2.gain.linearRampToValueAtTime(velocity * 0.025 * (_len5 - i) / _len5, start + i / _len5 * 0.8);
                  gainNode2.gain.linearRampToValueAtTime(velocity * 0.25 * (_len5 - (i + 1)) / _len5, start + (i + 0.99) / _len5 * 0.8);
                }
                gainNode.gain.linearRampToValueAtTime(0, start + 0.8);
                gainNode2.gain.linearRampToValueAtTime(0, start + 0.8);
                stopAudioTime = 0.8;
                // s
                oscillator.type = "triangle";
                oscillator.frequency.setValueAtTime(1000, start);
                stopAudioTime2 = 0.8;
                break;
              }
            case 65: // High Timbale
            case 66:
              // Low Timbale
              {
                var _len6 = option.pitch == 65 ? 0.22 : 0.25;
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.setValueAtTime(option.pitch == 65 ? 0.25 : 0.22, start);
                source.playbackRate.linearRampToValueAtTime(option.pitch == 65 ? 0.2 : 0.18, start + _len6);
                gainNode.gain.setValueAtTime(velocity * 1.3, start);
                gainNode.gain.linearRampToValueAtTime(velocity * 0.2, start + _len6 / 3.5);
                gainNode.gain.linearRampToValueAtTime(0, start + _len6);
                stopAudioTime = _len6;
                // s
                oscillator.type = "triangle";
                oscillator.frequency.setValueAtTime(option.pitch == 65 ? 190 * 1.07 : 136 * 1.07, start);
                oscillator.frequency.linearRampToValueAtTime(option.pitch == 65 ? 190 : 136, start + 0.1);
                gainNode2.gain.setValueAtTime(velocity * 3.2, start);
                gainNode2.gain.setTargetAtTime(0, start, 0.08);
                stopAudioTime2 = 1;
                break;
              }
            case 67: // High Agogo
            case 68:
              // Low Agogo
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 1;
                gainNode.gain.setValueAtTime(velocity * 0.5, start);
                gainNode.gain.linearRampToValueAtTime(velocity * 0.1, start + 0.02);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.08);
                stopAudioTime = 0.08;
                // s
                oscillator.type = "triangle";
                oscillator.frequency.setValueAtTime(option.pitch == 67 ? 1430 : 1055, start);
                gainNode2.gain.setValueAtTime(velocity * 2, start);
                gainNode2.gain.setTargetAtTime(0, start, 0.06);
                stopAudioTime2 = 0.75;
                break;
              }
            case 69:
              // Cabasa
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 1;
                gainNode.gain.setValueAtTime(velocity * 0.3, start);
                gainNode.gain.linearRampToValueAtTime(velocity * 0.8, start + 0.03);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.08);
                stopAudioTime = 0.08;
                // s
                gainNode2.gain.value = 0;
                stopAudioTime2 = 0;
                break;
              }
            case 70:
              // Maracas
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 1;
                gainNode.gain.setValueAtTime(velocity * 1.2, start);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.06);
                stopAudioTime = 0.06;
                // s
                gainNode2.gain.value = 0;
                stopAudioTime2 = 0;
                break;
              }
            case 71: // Short Whistle
            case 72:
              // Long Whistle
              {
                // w
                gainNode.gain.value = 0;
                stopAudioTime = 0;
                // s
                var _len7 = option.pitch == 71 ? 0.07 : 0.4;
                oscillator.type = "triangle";
                oscillator.frequency.setValueAtTime(option.pitch == 71 ? 2408 : 2105, start);
                gainNode2.gain.setValueAtTime(0, start);
                for (var _i = 0; _i < _len7 * 74; _i++) {
                  gainNode2.gain.linearRampToValueAtTime(velocity * 2.5, start + (_i + 0.2) / 75);
                  gainNode2.gain.linearRampToValueAtTime(velocity * 0.5, start + (_i + 0.9) / 75);
                }
                gainNode2.gain.linearRampToValueAtTime(0, start + _len7);
                stopAudioTime2 = _len7;
                break;
              }
            case 73: // Short Guiro
            case 74:
              // Long Guiro
              {
                // w
                var _len8 = option.pitch == 73 ? 0.05 : 0.35;
                source.buffer = this.whitenoise;
                source.playbackRate.setValueAtTime(option.pitch == 73 ? 0.2 : 0.2, start);
                source.playbackRate.linearRampToValueAtTime(option.pitch == 73 ? 0.7 : 0.5, start + _len8);
                gainNode.gain.value = velocity * 0.2;
                for (var _i2 = 0; _i2 < _len8 * 100; _i2++) {
                  gainNode.gain.setValueAtTime(velocity * 0.4, start + _i2 / 100);
                  gainNode.gain.setValueAtTime(velocity * 0.9, start + (_i2 + 0.7) / 100);
                }
                stopAudioTime = _len8;
                // s
                gainNode2.gain.value = 0;
                stopAudioTime2 = 0;
                break;
              }
            case 76: // High Wood Block
            case 77:
              // Low Wood Block
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 0.1;
                gainNode.gain.setValueAtTime(velocity * 1.2, start);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.015);
                stopAudioTime = 0.015;
                // s
                oscillator.frequency.setValueAtTime(option.pitch == 76 ? 800 : 600, start);
                gainNode2.gain.setValueAtTime(0, start);
                gainNode2.gain.linearRampToValueAtTime(velocity * 3, start + 0.005);
                gainNode2.gain.setTargetAtTime(0, start + 0.005, 0.02);
                stopAudioTime2 = 0.2;
                break;
              }
            case 78: // Close Cuica
            case 79:
              // Open Cuica
              {
                // w
                gainNode.gain.value = 0;
                stopAudioTime = 0;
                // s
                var _len9 = 0.18;
                var _f = option.pitch == 78 ? 750 : 270;
                oscillator.frequency.setValueAtTime(_f, start);
                oscillator.frequency.linearRampToValueAtTime(_f, start + _len9 / 3);
                if (option.pitch == 78) oscillator.frequency.linearRampToValueAtTime(_f * 0.9, start + _len9);
                gainNode2.gain.setValueAtTime(0, start);
                gainNode2.gain.linearRampToValueAtTime(velocity * 1.5, start + 0.005);
                gainNode2.gain.linearRampToValueAtTime(velocity * 0.5, start + 0.02);
                gainNode2.gain.linearRampToValueAtTime(velocity * 3, start + 0.04);
                gainNode2.gain.linearRampToValueAtTime(velocity * 2, start + _len9 / 4 * 3);
                gainNode2.gain.linearRampToValueAtTime(0, start + _len9);
                stopAudioTime2 = _len9;
                break;
              }
            // GS, GM2
            case 27:
              // High Q
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 1;
                gainNode.gain.setValueAtTime(velocity * 1, start);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.002);
                stopAudioTime = 0.002;
                // s
                oscillator.frequency.setValueAtTime(1500, start);
                oscillator.frequency.linearRampToValueAtTime(280, start + 0.015);
                oscillator.frequency.linearRampToValueAtTime(0, start + 0.07);
                gainNode2.gain.setValueAtTime(velocity * 1.9, start);
                gainNode2.gain.linearRampToValueAtTime(0, start + 0.07);
                stopAudioTime2 = 0.07;
                break;
              }
            case 28:
              // Slap
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 1;
                gainNode.gain.setValueAtTime(velocity * 1.3, start);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.010);
                gainNode.gain.setValueAtTime(velocity * 1.1, start + 0.0101);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.020);
                gainNode.gain.setValueAtTime(velocity * 0.9, start + 0.0201);
                gainNode.gain.setTargetAtTime(0, start + 0.0201, 0.03);
                stopAudioTime = 0.2;
                // s
                gainNode2.gain.value = 0;
                stopAudioTime2 = 0;
                break;
              }
            case 29: // Scratch Push
            case 30:
              // Scratch Pull
              {
                var t1 = option.pitch == 29 ? 0.05 : 0.07;
                var t2 = option.pitch == 29 ? 0.06 : 0.09;
                var t3 = option.pitch == 29 ? 0.07 : 0.11;
                var t4 = option.pitch == 29 ? 0.1 : 0.15;
                var t5 = option.pitch == 29 ? 0.25 : 0.4;
                // w
                var r1 = option.pitch == 29 ? 0.1 : 0.06;
                var _r2 = option.pitch == 29 ? 0.3 : 0.2;
                var r3 = option.pitch == 29 ? 0.18 : 0.12;
                source.buffer = this.whitenoise;
                source.playbackRate.setValueAtTime(r1, start);
                source.playbackRate.linearRampToValueAtTime(_r2, start + t1);
                source.playbackRate.linearRampToValueAtTime(0, start + t2);
                source.playbackRate.linearRampToValueAtTime(_r2, start + t3);
                source.playbackRate.linearRampToValueAtTime(r3, start + t4);
                source.playbackRate.linearRampToValueAtTime(0, start + t5);
                gainNode.gain.setValueAtTime(0, start);
                gainNode.gain.linearRampToValueAtTime(velocity * 0.4, start + t1);
                gainNode.gain.linearRampToValueAtTime(velocity * 0.1, start + t3);
                gainNode.gain.linearRampToValueAtTime(velocity * 0.3, start + t4);
                gainNode.gain.linearRampToValueAtTime(0, start + t5);
                stopAudioTime = t5;
                // s
                var r4 = option.pitch == 29 ? 500 : 400;
                var r5 = option.pitch == 29 ? 1950 : 1200;
                var r6 = option.pitch == 29 ? 430 : 250;
                oscillator.frequency.setValueAtTime(r4, start);
                oscillator.frequency.linearRampToValueAtTime(r5, start + t1);
                oscillator.frequency.linearRampToValueAtTime(0, start + t2);
                oscillator.frequency.linearRampToValueAtTime(r5, start + t3);
                oscillator.frequency.linearRampToValueAtTime(r6, start + t4);
                oscillator.frequency.linearRampToValueAtTime(0, start + t5);
                gainNode2.gain.setValueAtTime(0, start);
                gainNode2.gain.linearRampToValueAtTime(velocity * 0.7, start + t1);
                gainNode2.gain.linearRampToValueAtTime(velocity * 0.2, start + t3);
                gainNode2.gain.linearRampToValueAtTime(velocity * 0.6, start + t4);
                gainNode2.gain.linearRampToValueAtTime(0, start + t5);
                stopAudioTime2 = t5;
                break;
              }
            case 31:
              // Sticks
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.setValueAtTime(0.4, start);
                source.playbackRate.linearRampToValueAtTime(0.5, start + 0.015);
                gainNode.gain.setValueAtTime(velocity * 1.2, start);
                gainNode.gain.setTargetAtTime(0, start, 0.035);
                stopAudioTime = 0.3;
                // s
                oscillator.frequency.setValueAtTime(3140, start);
                gainNode2.gain.setValueAtTime(velocity * 1.2, start);
                gainNode2.gain.setTargetAtTime(0, start, 0.012);
                stopAudioTime2 = 0.3;
                break;
              }
            case 32:
              // Square Click
              {
                // w
                gainNode.gain.value = 0;
                stopAudioTime = 0;
                // s
                oscillator.type = "square";
                oscillator.frequency.setValueAtTime(333, start);
                gainNode2.gain.setValueAtTime(0, start);
                gainNode2.gain.linearRampToValueAtTime(velocity * 4, start + 0.0016);
                gainNode2.gain.linearRampToValueAtTime(0, start + 0.0032);
                stopAudioTime2 = 0.0032;
                break;
              }
            case 33: // Metronome Click
            case 34:
              // Metronome Bell
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.setValueAtTime(0.17, start);
                source.playbackRate.linearRampToValueAtTime(0.22, start + 0.01);
                gainNode.gain.setValueAtTime(velocity * 1.5, start);
                gainNode.gain.setTargetAtTime(0, start, 0.015);
                stopAudioTime = 0.3;
                // s
                if (option.pitch == 34) {
                  oscillator.frequency.setValueAtTime(2040, start);
                  gainNode2.gain.setValueAtTime(velocity * 1, start);
                  gainNode2.gain.setTargetAtTime(0, start, 0.12);
                  stopAudioTime2 = 1.1;
                } else {
                  gainNode2.gain.value = 0;
                  stopAudioTime2 = 0;
                }
                break;
              }
            case 82:
              // Shaker
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 1;
                gainNode.gain.setValueAtTime(velocity * 0.5, start);
                gainNode.gain.linearRampToValueAtTime(velocity, start + 0.02);
                gainNode.gain.linearRampToValueAtTime(0, start + 0.07);
                stopAudioTime = 0.07;
                // s
                gainNode2.gain.value = 0;
                stopAudioTime2 = 0;
                break;
              }
            case 83:
              // Jingle Bell
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.value = 1;
                gainNode.gain.setValueAtTime(0, start);
                gainNode.gain.linearRampToValueAtTime(velocity * 1.2, start + 0.015);
                gainNode.gain.setTargetAtTime(0, start + 0.015, 0.06);
                stopAudioTime = 0.5;
                // s
                oscillator.type = "triangle";
                oscillator.frequency.setValueAtTime(2709, start);
                oscillator.frequency.linearRampToValueAtTime(2657, start + 0.3);
                gainNode2.gain.setValueAtTime(0, start);
                gainNode2.gain.linearRampToValueAtTime(velocity * 0.7, start + 0.025);
                gainNode2.gain.setTargetAtTime(0, start + 0.025, 0.07);
                stopAudioTime2 = 0.5;
                break;
              }
            case 84:
              // Bell Tree
              {
                // w s
                var invert = true;
                source.buffer = this.whitenoise;
                source.playbackRate.value = 1;
                for (var _i3 = 0; _i3 < 28; _i3++) {
                  gainNode.gain.setValueAtTime(velocity * 0.1, start + _i3 / 24 * 0.45);
                  gainNode.gain.setTargetAtTime(0, start + _i3 / 24 * 0.45, 0.01);
                  oscillator.frequency.setValueAtTime(1380 * (1 + (invert ? (24 - _i3) / 24 : _i3 / 24)), start + _i3 / 24 * 0.45);
                  gainNode2.gain.setValueAtTime(velocity * (0.2 + _i3 / 24), start + _i3 / 24 * 0.45);
                  gainNode2.gain.setTargetAtTime(0, start + _i3 / 24 * 0.45, _i3 == 27 ? 0.2 : 0.01);
                }
                stopAudioTime = 0.5;
                stopAudioTime2 = 1.5;
                break;
              }
            case 85:
              // Castanets
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.setValueAtTime(0.35, start);
                gainNode.gain.setValueAtTime(velocity * 1.3, start);
                gainNode.gain.setTargetAtTime(0, start, 0.01);
                stopAudioTime = 0.1;
                // s
                oscillator.frequency.setValueAtTime(1730, start);
                gainNode2.gain.setValueAtTime(velocity * 0.5, start);
                gainNode2.gain.setTargetAtTime(0, start, 0.01);
                stopAudioTime2 = 0.1;
                break;
              }
            case 86: // Mute Surdo
            case 87:
              // Open Surdo
              {
                // w
                source.buffer = this.whitenoise;
                source.playbackRate.setValueAtTime(0.020, start);
                source.playbackRate.linearRampToValueAtTime(0.015, start + 0.5);
                gainNode.gain.setValueAtTime(0, start);
                gainNode.gain.linearRampToValueAtTime(velocity * 2, start + 0.005);
                gainNode.gain.setTargetAtTime(0, start + 0.005, option.pitch == 86 ? 0.03 : 0.06);
                stopAudioTime = 0.5;
                // s
                oscillator.frequency.setValueAtTime(88, start);
                oscillator.frequency.linearRampToValueAtTime(86, start + 0.3);
                gainNode2.gain.setValueAtTime(velocity * 2.5, start);
                gainNode2.gain.setTargetAtTime(0, start, option.pitch == 86 ? 0.1 : 0.3);
                stopAudioTime2 = option.pitch == 86 ? 0.5 : 1.5;
                break;
              }
            default:
              {
                source.playbackRate.value = option.pitch / 69 * 2;
                stopAudioTime = 0.05;
                stopAudioTime2 = 0;
                break;
              }
          }
        }
        break;
      default:
        {
          source.buffer = this.whitenoise;
          switch (option.pitch) {
            //  元々のパーカッション音源 //
            // Bass drum
            case 35:
            case 36:
              // w
              gainNode.gain.value = velocity * 0.6;
              source.playbackRate.value = 0.02;
              stopAudioTime = 0.07;
              // s
              gainNode2.gain.value = velocity * 1.1;
              oscillator.frequency.setValueAtTime(120, start);
              oscillator.frequency.linearRampToValueAtTime(50, start + 0.07);
              stopAudioTime2 = 0.07;
              break;
            // Snare
            case 38:
            case 40:
              // w
              source.playbackRate.value = 0.7;
              stopAudioTime = 0.05;
              // s
              gainNode2.gain.setValueAtTime(velocity * 0.8, start);
              gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.05);
              oscillator.frequency.setValueAtTime(300, start);
              oscillator.frequency.linearRampToValueAtTime(200, start + 0.05);
              stopAudioTime2 = 0.05;
              break;
            // Toms
            case 41:
            case 43:
            case 45:
            case 47:
            case 48:
            case 50:
              // w
              source.playbackRate.value = 0.01;
              stopAudioTime = 0.1;
              // s
              oscillator.type = "square";
              gainNode2.gain.setValueAtTime(velocity, start);
              gainNode2.gain.linearRampToValueAtTime(0.01, start + 0.1);
              oscillator.frequency.setValueAtTime(150 + 20 * (option.pitch - 40), start);
              oscillator.frequency.linearRampToValueAtTime(50 + 20 * (option.pitch - 40), start + 0.1);
              stopAudioTime2 = 0.1;
              break;
            // Close Hihat
            case 42:
            case 44:
              source.playbackRate.value = 1.5;
              stopAudioTime = 0.02;
              stopAudioTime2 = 0;
              break;
            // Open Hihat
            case 46:
              source.playbackRate.value = 1.5;
              stopAudioTime = 0.3;
              gainNode.gain.setValueAtTime(velocity * 0.9, start);
              gainNode.gain.linearRampToValueAtTime(0.0, start + 0.3);
              stopAudioTime2 = 0;
              break;
            // Cymbal
            case 49:
            case 52:
            case 53:
            case 55:
            case 57:
              source.playbackRate.value = 1.2;
              stopAudioTime = 0.5;
              gainNode.gain.setValueAtTime(velocity * 1, start);
              gainNode.gain.linearRampToValueAtTime(0.0, start + 0.5);
              stopAudioTime2 = 0;
              break;
            // Cymbal2
            case 51:
              source.playbackRate.value = 1.1;
              stopAudioTime = 0.4;
              gainNode.gain.setValueAtTime(velocity * 0.8, start);
              gainNode.gain.linearRampToValueAtTime(0.0, start + 0.4);
              stopAudioTime2 = 0;
              break;
            // Cymbal3
            case 59:
              source.playbackRate.value = 1.8;
              stopAudioTime = 0.3;
              gainNode.gain.setValueAtTime(velocity * 0.5, start);
              gainNode.gain.linearRampToValueAtTime(0.0, start + 0.3);
              stopAudioTime2 = 0;
              break;
            // Bongo
            case 60:
            case 61:
              // w
              source.playbackRate.value = 0.03;
              stopAudioTime = 0.03;
              // s
              gainNode2.gain.setValueAtTime(velocity * 0.8, start);
              gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.1);
              oscillator.frequency.setValueAtTime(400 - 40 * (option.pitch - 60), start);
              oscillator.frequency.linearRampToValueAtTime(450 - 40 * (option.pitch - 60), start + 0.1);
              stopAudioTime2 = 0.1;
              break;
            // mute Conga
            case 62:
              // w
              source.playbackRate.value = 0.03;
              stopAudioTime = 0.03;
              // s
              gainNode2.gain.setValueAtTime(velocity, start);
              gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.03);
              oscillator.frequency.setValueAtTime(200, start);
              oscillator.frequency.linearRampToValueAtTime(250, start + 0.03);
              stopAudioTime2 = 0.03;
              break;
            // open Conga
            case 63:
            case 64:
              // w
              source.playbackRate.value = 0.03;
              stopAudioTime = 0.03;
              // s
              gainNode2.gain.setValueAtTime(velocity, start);
              gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.1);
              oscillator.frequency.setValueAtTime(200 - 30 * (option.pitch - 63), start);
              oscillator.frequency.linearRampToValueAtTime(250 - 30 * (option.pitch - 63), start + 0.1);
              stopAudioTime2 = 0.1;
              break;
            // Cowbell, Claves
            case 56:
            case 75:
              // w
              source.playbackRate.value = 0.01;
              stopAudioTime = 0.1;
              // s
              gainNode2.gain.setValueAtTime(velocity, start);
              gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.1);
              oscillator.frequency.setValueAtTime(1000 + 48 * (option.pitch - 56), start);
              stopAudioTime2 = 0.1;
              break;
            // mute triangle
            case 80:
              // w
              source.playbackRate.value = 5;
              gainNode.gain.setValueAtTime(velocity * 0.5, start);
              gainNode.gain.linearRampToValueAtTime(0.0, start + 0.2);
              stopAudioTime = 0.05;
              // s
              oscillator.type = "triangle";
              gainNode2.gain.setValueAtTime(velocity * 0.7, start);
              gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.2);
              oscillator.frequency.setValueAtTime(6000, start);
              stopAudioTime2 = 0.05;
              break;
            // open triangle
            case 81:
              // w
              source.playbackRate.value = 5;
              gainNode.gain.setValueAtTime(velocity * 0.9, start);
              gainNode.gain.linearRampToValueAtTime(0.0, start + 0.5);
              stopAudioTime = 0.5;
              // s
              oscillator.type = "triangle";
              gainNode2.gain.setValueAtTime(velocity * 0.8, start);
              gainNode2.gain.linearRampToValueAtTime(0.0, start + 0.3);
              oscillator.frequency.setValueAtTime(6000, start);
              stopAudioTime2 = 0.3;
              break;
          }
        }
    }
    // 同じドラムの音が重ならないようにする機能
    // ドラム再生中に次の同じドラムがすぐ鳴る場合、次が鳴る前に止めて音が重ならないようにする（同時発音数の増加を軽減する）
    if (!this.settings.isSameDrumSoundOverlap && nextSameNoteOnInterval != -1) {
      if (stopAudioTime > nextSameNoteOnInterval) {
        stopAudioTime = nextSameNoteOnInterval;
      }
      if (stopAudioTime2 > nextSameNoteOnInterval) {
        stopAudioTime2 = nextSameNoteOnInterval;
      }
    }
    // ドラム音停止時間を設定
    this.stopAudioNode(source, start + stopAudioTime, stopGainNode);
    this.stopAudioNode(oscillator, start + stopAudioTime2, stopGainNode2);
    // ドラム停止時間を設定
    option.drumStopTime = option.startTime + (stopAudioTime >= stopAudioTime2 ? stopAudioTime : stopAudioTime2);

    // 音をストップさせる関数を返す //
    return function () {
      _this.stopAudioNode(source, 0, stopGainNode, true);
      _this.stopAudioNode(oscillator, 0, stopGainNode2, true);
    };
  }

  function stopAudioNode(tar, time, stopGainNode, isNoiseCut) {
    var isImmed = time <= this.context.currentTime; // 即時ストップか？

    // 予約ストップ //
    var vol1Time = time - 0.005;
    var stopTime = time;

    // 時間設定 //
    if (isImmed) {
      // 即時ストップ
      if (!isNoiseCut) {
        stopTime = this.context.currentTime;
      } else {
        // ノイズカット
        vol1Time = this.context.currentTime;
        stopTime = this.context.currentTime + 0.005;
      }
    }

    // 音の停止 //
    try {
      // 通常の音停止処理
      if (!isNoiseCut) {
        tar.stop(stopTime);
      } else {
        // ノイズカット（音の終わりに短いフェードアウトを入れる）
        tar.stop(stopTime);
        stopGainNode.gain.cancelScheduledValues(0);
        stopGainNode.gain.setValueAtTime(1, vol1Time);
        stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
      }
    } catch (e) {
      // iOS用 (stopが２回以上使えないので、代わりにstopGainNodeでミュートにする)
      stopGainNode.gain.cancelScheduledValues(0);
      if (!isNoiseCut) {
        stopGainNode.gain.setValueAtTime(0, stopTime);
      } else {
        // ノイズカット（音の終わりに短いフェードアウトを入れる）
        stopGainNode.gain.setValueAtTime(1, vol1Time);
        stopGainNode.gain.linearRampToValueAtTime(0, stopTime);
      }
    }
  }

  function pushFunc(tar) {
    if (!tar.note && !tar.rootTimeout && !tar.pan && !this.trigger.isNoteTrigger) {
      return;
    }
    this.states.stopFuncs.push(tar);
  }

  function clearFunc(tar1, tar2) {
    if (tar1 != "note" && tar1 != "rootTimeout" && tar1 != "pan" && !this.trigger.isNoteTrigger) {
      return;
    }
    this.states.stopFuncs.some(function (n, i, ary) {
      if (n[tar1] == tar2) {
        ArrayUtil["delete"](ary, i); // ary.splice(i, 1); を高速化
        return true;
      }
    });
  }

  /**
   * tickからtime(秒)を求める
   * @param {number} tick
   * @returns {number} time(秒)
   */
  function getTime(tick) {
    var imid = -1;

    // tempo変更がある場合、tickを検索する //
    if (this.tempoTrack && this.tempoTrack.length >= 1) {
      // 最後のtickを超える場合、最後のtimeを返す //
      if (tick >= this.tempoTrack[this.tempoTrack.length - 1].timing) {
        return this.tempoTrack[this.tempoTrack.length - 1].time;
      }
      // 二分探索でtickを探す //
      var imin = 0;
      var imax = this.tempoTrack.length - 1;
      while (true) {
        imid = Math.floor(imin + (imax - imin) / 2);
        var tempTiming = this.tempoTrack[imid].timing;
        if (tick < tempTiming) {
          imax = imid - 1;
        } else if (tick > tempTiming) {
          imin = imid + 1;
        } else {
          break;
        }
        if (imin > imax) {
          if (tick < tempTiming) imid--;
          break;
        }
      }
    }
    var time = 0;
    var baseTiming = 0;
    var tempo = 120;
    if (imid >= 0) {
      // tickを探索して見つかった場合
      // 引数tickに一番近いtickを取得
      var tempoObj = this.tempoTrack[imid];
      time = tempoObj.time;
      baseTiming = tempoObj.timing;
      tempo = tempoObj.value;
    }

    // tickからtimeを算出する
    // 引数tickに一番近いtickのtime ＋ 引数tickから残りのtimeを算出 ＝ 現在のtime
    time += 60 / tempo / this.settings.resolution * (tick - baseTiming);
    return time;
  }

  /**
   * time(秒)からtickを求める
   * @param {number} time
   * @returns {number} tick
   */
  function getTiming(time) {
    var imid = -1;

    // tempo変更がある場合、timeを検索する //
    if (this.tempoTrack && this.tempoTrack.length >= 1) {
      // 最後のtimeを超える場合、最後のtickを返す
      if (time >= this.tempoTrack[this.tempoTrack.length - 1].time) {
        return this.tempoTrack[this.tempoTrack.length - 1].timing;
      }
      // 二分探索でtimeを探す
      var imin = 0;
      var imax = this.tempoTrack.length - 1;
      while (true) {
        imid = Math.floor(imin + (imax - imin) / 2);
        var tempTime = this.tempoTrack[imid].time;
        if (time < tempTime) {
          imax = imid - 1;
        } else if (time > tempTime) {
          imin = imid + 1;
        } else {
          break;
        }
        if (imin > imax) {
          if (time < tempTime) imid--;
          break;
        }
      }
    }
    var baseTime = 0;
    var tick = 0;
    var tempo = 120;
    if (imid >= 0) {
      // timeを探索して見つかった場合
      // 引数timeに一番近いtimeを取得
      var tempoObj = this.tempoTrack[imid];
      baseTime = tempoObj.time;
      tick = tempoObj.timing;
      tempo = tempoObj.value;
    }

    // timeからtickを算出する
    // 引数timeに一番近いtimeのtick ＋ 現在timeから残りのtickを算出 ＝ 現在のtick
    tick += (time - baseTime) / (60 / tempo / this.settings.resolution);
    return tick;
  }

  function parseHeader(info) {
    // 関数呼び出し元からデータをもらう //
    var smf = info.smf;

    // SMFのヘッダチャンクを解析 //
    var p = 4;
    var header = {};
    header.size = ParseUtil.getInt(smf, 4, 8);
    header.format = smf[9];
    header.trackcount = ParseUtil.getInt(smf, 10, 12);
    header.timemanage = smf[12];
    header.resolution = ParseUtil.getInt(smf, 12, 14); // TODO 0除算防止。15bit目1のとき、https://sites.google.com/site/yyagisite/material/smfspec#ConductorTrack
    p += 4 + header.size;

    // 変数を用意 //
    var channels = [];
    var chSize = this.settings.isWebMIDI || this.settings.preserveSmfData ? 17 : 16; // WebMIDI用に17chに全てのイベントを入れるため17ch分作る
    for (var i = 0; i < chSize; i++) {
      var channel = {};
      channels.push(channel);
      // smfを読む順番を記録した索引配列を作る //
      // 型付き配列をリスト構造の配列のように使う（リスト構造にすることで挿入処理を高速化する）
      // [tick, smfMesLength, smfPtr, nextIndicesPtr, ...]
      channel.indices = [];
      channel.indicesLength = 0;
      channel.indicesHead = -1; // 先頭のポインタ
      channel.indicesFoot = 0; // 末尾のポインタ
      channel.indicesCur = 0; // 現在のinsert用ポインタ
      channel.indicesPre = 0; // 前回のinsert用ポインタ
      channel.notes = [];
    }

    // 関数呼び出し元にデータを返す //
    info.p = p;
    info.header = header;
    info.channels = channels;
    return info;
  }

  function parseTrack(info) {
    // 関数呼び出し元からデータをもらう //
    var smf = info.smf;
    var p = info.p;
    var header = info.header;
    var channels = info.channels;

    // SMFのトラックチャンクの解析・"SMF読み込み順序配列"を作成 //
    //   全トラックを解析しながら、SMFを読む順番を記録した配列を作成する
    //   読み込む順番は、この解析でデルタタイム順になるようソートしておく
    //   SMFのMIDIイベント解析時は、上記配列から「次はMIDIファイルの何バイト目を見るか」を取得して解析する
    //   上記配列はリスト構造の配列のように使う（リスト構造にすることで配列のinsert処理を高速化する）
    // 
    // ■配列イメージ（json風）■
    // [
    //     {
    //         tick : このMIDIイベントのTick,
    //         smfMesLength : １つのMIDIイベントの長さ,
    //         smfPtr : このMIDIイベントはMIDIファイルの何バイト目にあるか,
    //         nextIndicesPtr : 次のオブジェクトはリスト配列の何番目にあるか
    //     },
    //     ...
    // ]
    // 
    // ■実際の配列イメージ■
    // [tick, smfMesLength, smfPtr, nextIndicesPtr, ...]

    var tempoTrack = [];
    var beatTrack = [];
    var songLength = 0;
    for (var t = 0; t < header.trackcount; t++) {
      // "MTrk"
      if (smf[p] != 77 || smf[p + 1] != 84 || smf[p + 2] != 114 || smf[p + 3] != 107) return "Irregular SMF.";
      p += 4;
      var endPoint = p + 4 + ParseUtil.getInt(smf, p, p + 4);
      p += 4;
      var tick = 0;
      var tempo = 120;
      var tempoCurTick = 0;
      var tempoCurTime = 0;
      var lastState = 1;
      var dt = void 0;
      while (p < endPoint) {
        // DeltaTime
        if (lastState != null) {
          var lengthAry = ParseUtil.variableLengthToInt(smf, p, p + 5);
          dt = lengthAry[0];
          tick += dt;
          p += lengthAry[1];
        }
        var cashP = p; // WebMIDI用
        // Events
        var mes0 = smf[p] >> 4; // Math.floor(smf[p] / 0x10)
        switch (mes0) {
          case 0x8: // Note OFF - 8[ch], Pitch, Velocity
          case 0x9: // Note ON - 9[ch], Pitch, Velocity
          case 0xA: // Polyfonic Key Pressure - A[ch], Pitch?, Velocity?
          case 0xB: // Control Change - B[ch],,
          case 0xE:
            // PitchBend Change - E[ch],,
            {
              // チャンネル毎に仕分けた後に解析する
              lastState = smf[p];
              var ch = channels[lastState & 0x0F];
              ParseUtil.chIndicesInsert(this, ch, tick, p, 3);
              p += 3;
              break;
            }
          case 0xC: // Program Change - C[ch],
          case 0xD:
            // Channel Pre - D[ch],
            {
              // チャンネル毎に仕分けた後に解析する
              lastState = smf[p];
              var _ch = channels[lastState & 0x0F];
              ParseUtil.chIndicesInsert(this, _ch, tick, p, 2);
              p += 2;
              break;
            }
          // SysEx Events or Meta Events - F[ch], ...
          case 0xF:
            {
              //lastState = smf[p]; <- ランニングステートは無い
              switch (smf[p]) {
                case 0xF0:
                case 0xF7:
                  {
                    // SysEx Events
                    var _lengthAry = ParseUtil.variableLengthToInt(smf, p + 1, p + 1 + 4);

                    // Master Volume
                    // 0xF0, size, 0x7f, 0x7f, 0x04, 0x01, 0xNN, volume, 0xF7
                    if (_lengthAry[0] >= 7 && smf[p + 2] == 0x7f && smf[p + 3] == 0x7f && smf[p + 4] == 0x04 && smf[p + 5] == 0x01) {
                      // 全チャンネルにMasterVolumeイベントを挿入する
                      for (var i = 0; i < 16; i++) {
                        var _ch2 = channels[i];
                        ParseUtil.chIndicesInsert(this, _ch2, tick, p, _lengthAry[0]);
                      }
                    }
                    p += 1 + _lengthAry[1] + _lengthAry[0];
                    break;
                  }
                case 0xF1:
                  p += 2;
                  break;
                case 0xF2:
                  p += 3;
                  break;
                case 0xF3:
                  p += 2;
                  break;
                case 0xF6:
                case 0xF8:
                case 0xFA:
                case 0xFB:
                case 0xFC:
                case 0xFE:
                  p += 1;
                  break;
                case 0xFF:
                  {
                    // Meta Events
                    switch (smf[p + 1]) {
                      case 0x00:
                      case 0x01:
                      case 0x02:
                      case 0x03:
                      case 0x04:
                      case 0x05:
                      case 0x06:
                      case 0x07:
                      case 0x20:
                        break;
                      case 0x2F:
                        tick += (this.settings.isSkipEnding ? 0 : header.resolution) - dt;
                        break;
                      case 0x51:
                        // Tempo
                        // 全チャンネルにTempoイベントを挿入する
                        for (var _i = 0; _i < 16; _i++) {
                          var _ch3 = channels[_i];
                          ParseUtil.chIndicesInsert(this, _ch3, tick, p, 6);
                        }
                        tempoCurTime += 60 / tempo / header.resolution * (tick - tempoCurTick);
                        tempoCurTick = tick;
                        tempo = 60000000 / (smf[p + 3] * 0x10000 + smf[p + 4] * 0x100 + smf[p + 5]);
                        tempoTrack.push({
                          timing: tick,
                          time: tempoCurTime,
                          value: tempo
                        });
                        break;
                      case 0x54:
                        break;
                      case 0x58:
                        // Beat
                        beatTrack.push({
                          timing: tick,
                          value: [smf[p + 3], Math.pow(2, smf[p + 4])]
                        });
                        break;
                    }
                    var _lengthAry2 = ParseUtil.variableLengthToInt(smf, p + 2, p + 2 + 4);
                    p += 2 + _lengthAry2[1] + _lengthAry2[0];
                    break;
                  }
              }
              break;
            }
          default:
            {
              if (lastState == null) return "Irregular SMF. (" + p + " byte addr)";
              p--;
              smf[p] = lastState; // 上書き
              lastState = null;
            }
        }
        // WebMIDIAPI
        if (this.settings.isWebMIDI || this.settings.preserveSmfData) {
          if (lastState != null) {
            // WebMIDI用に17chに全てのMIDIイベントを入れる
            ParseUtil.chIndicesInsert(this, channels[16], tick, cashP, p - cashP);
          }
        }
      }
      if (!this.settings.isSkipEnding && songLength < tick) songLength = tick;
      // リスト配列のポインタを初期化
      for (var _i2 = 0; _i2 < channels.length; _i2++) {
        channels[_i2].indicesCur = channels[_i2].indicesHead;
        channels[_i2].indicesPre = channels[_i2].indicesHead;
      }
    }

    // 関数呼び出し元にデータを返す //
    info.p = p;
    info.tempoTrack = tempoTrack;
    info.beatTrack = beatTrack;
    info.songLength = songLength;
    return info;
  }

  function parseEvent(info) {
    var _this = this;
    // 関数呼び出し元からデータをもらう //
    var smf = info.smf;
    var header = info.header;
    var channels = info.channels;
    var tempoTrack = info.tempoTrack;
    var songLength = info.songLength;

    // SMFのMIDIイベント解析 //
    var tempo;
    var tempoCurTick;
    var tempoCurTime;
    var cc111Tick = -1;
    var cc111Time = -1;
    var firstNoteOnTiming = Number_MAX_SAFE_INTEGER; // 最初のノートオンのTick
    var firstNoteOnTime = Number_MAX_SAFE_INTEGER;
    var lastNoteOffTiming = 0; // 最後のノートオフのTick
    var lastNoteOffTime = 0;
    var lastEventTiming = 0; // 最後のEventのTick
    var lastEventTime = 0;

    // Midi Events (0x8n - 0xEn) parse
    var _loop = function _loop() {
        var channel = channels[ch];
        var dataEntry = 2;
        var pitchBend = 0;
        var pan = 64;
        var expression = 127;
        var velocity = 100;
        var modulation = 0;
        var hold = 0;
        var reverb = _this.settings.initReverb;
        var chorus = 0;
        var rpnLsb = 127;
        var rpnMsb = 127;
        var instrument = 0;
        var masterVolume = 127;
        tempo = 120;
        tempoCurTick = 0;
        tempoCurTime = 0;
        var nowNoteOnIdxAry = [];
        var indIdx = channel.indicesHead;
        var indices = channel.indices;
        var nextNoteOnAry = new Array(128);
        var _loop3 = function _loop3() {
            var tick = indices[indIdx];
            var p = indices[indIdx + 2];
            var nextIdx = indices[indIdx + 3];
            var time = 60 / tempo / header.resolution * (tick - tempoCurTick) + tempoCurTime;

            // Events
            var mes0 = smf[p] >> 4; // Math.floor(smf[p] / 0x10)
            switch (mes0) {
              case 0x8: // Note OFF - 8[ch], Pitch, Velocity
              case 0x9:
                // Note ON - 9[ch], Pitch, Velocity
                if (mes0 == 0x9 && smf[p + 2] != 0) {
                  // ノートオン
                  // ノート情報が入ったオブジェクトを作成 //
                  var note = {
                    start: tick,
                    stop: null,
                    startTime: time,
                    stopTime: null,
                    pitch: smf[p + 1],
                    pitchBend: [{
                      timing: tick,
                      time: time,
                      value: pitchBend
                    }],
                    pan: [{
                      timing: tick,
                      time: time,
                      value: pan
                    }],
                    expression: [{
                      timing: tick,
                      time: time,
                      value: expression * (masterVolume / 127)
                    }],
                    velocity: smf[p + 2] / 127 * (velocity / 127),
                    modulation: [{
                      timing: tick,
                      time: time,
                      value: modulation
                    }],
                    holdBeforeStop: null,
                    reverb: [{
                      timing: tick,
                      time: time,
                      value: reverb
                    }],
                    chorus: [{
                      timing: tick,
                      time: time,
                      value: chorus
                    }],
                    instrument: instrument,
                    channel: ch,
                    nextSameNoteOnInterval: -1,
                    drumStopTime: 2 // 再生時に使う
                  };

                  // 前回鳴っていた同音ノートに次のノートオン時間を入れる //
                  // 同音ノートを二重再生したくない場合のために記録する //
                  var prevNote = nextNoteOnAry[smf[p + 1]];
                  if (prevNote) {
                    prevNote.nextSameNoteOnInterval = time - prevNote.startTime;
                  }
                  nextNoteOnAry[smf[p + 1]] = note;

                  // 同音ノートがノートオン中の場合、ノートオフにする //
                  nowNoteOnIdxAry.some(function (idx, i) {
                    var note = channel.notes[idx];
                    if (note.pitch == smf[p + 1] && note.stop == null) {
                      note.stop = tick;
                      note.stopTime = time;
                      ArrayUtil["delete"](nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
                    }
                  });

                  // ノートオン中配列に入れる
                  nowNoteOnIdxAry.push(channel.notes.length);
                  // notes一覧にnoteオブジェクトを入れる
                  channel.notes.push(note);

                  // 最初のノートオン時間を記録 //
                  if (tick < firstNoteOnTiming) {
                    firstNoteOnTiming = tick;
                    firstNoteOnTime = time;
                  }
                } else {
                  // ノートオフ
                  // ノートオン中配列から該当ノートを探し、ノートオフ処理をする //
                  nowNoteOnIdxAry.some(function (idx, i) {
                    var note = channel.notes[idx];
                    if (note.pitch == smf[p + 1] && note.stop == null) {
                      if (hold >= _this.settings.holdOnValue) {
                        // ホールドが効いている場合
                        if (note.holdBeforeStop == null) {
                          note.holdBeforeStop = [{
                            timing: tick,
                            time: time,
                            value: hold
                          }];
                        }
                      } else {
                        // ホールドしていない場合
                        note.stop = tick;
                        note.stopTime = time;
                        ArrayUtil["delete"](nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
                      }

                      // 最後のノートオフ時間を記録 //
                      if (tick > lastNoteOffTiming) {
                        lastNoteOffTiming = tick;
                        lastNoteOffTime = time;
                      }
                      return true;
                    }
                  });
                }
                break;
              // Polyfonic Key Pressure - A[ch], Pitch?, Velocity?
              case 0xA:
                break;
              // Control Change - B[ch],,
              case 0xB:
                switch (smf[p + 1]) {
                  case 1:
                    // modulation
                    modulation = smf[p + 2];
                    nowNoteOnIdxAry.forEach(function (idx) {
                      var note = channel.notes[idx];
                      note.modulation.push({
                        timing: tick,
                        time: time,
                        value: modulation
                      });
                    });
                    break;
                  case 6:
                    if (rpnLsb == 0 && rpnMsb == 0) {
                      // RLSB=0 & RMSB=0 -> 6はピッチ
                      dataEntry = smf[p + 2];
                      if (dataEntry > 24) {
                        dataEntry = 24;
                      }
                    }
                    break;
                  case 7:
                    velocity = smf[p + 2];
                    break;
                  case 10:
                    // Pan
                    pan = smf[p + 2];
                    nowNoteOnIdxAry.forEach(function (idx) {
                      var note = channel.notes[idx];
                      note.pan.push({
                        timing: tick,
                        time: time,
                        value: pan
                      });
                    });
                    break;
                  case 11:
                    // Expression
                    expression = smf[p + 2];
                    nowNoteOnIdxAry.forEach(function (idx) {
                      var note = channel.notes[idx];
                      note.expression.push({
                        timing: tick,
                        time: time,
                        value: expression * (masterVolume / 127)
                      });
                    });
                    break;
                  case 64:
                    // Hold1
                    hold = smf[p + 2];
                    if (hold < _this.settings.holdOnValue) {
                      for (var _i = nowNoteOnIdxAry.length - 1; _i >= 0; _i--) {
                        var idx = nowNoteOnIdxAry[_i];
                        var _note = channel.notes[idx];
                        if (_note.stop == null && _note.holdBeforeStop != null) {
                          _note.stop = tick;
                          _note.stopTime = time;
                          ArrayUtil["delete"](nowNoteOnIdxAry, _i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
                        }
                      }
                    }
                    break;
                  case 91:
                    // reverb
                    reverb = smf[p + 2];
                    nowNoteOnIdxAry.forEach(function (idx) {
                      var note = channel.notes[idx];
                      note.reverb.push({
                        timing: tick,
                        time: time,
                        value: reverb
                      });
                    });
                    break;
                  case 93:
                    // chorus
                    chorus = smf[p + 2];
                    nowNoteOnIdxAry.forEach(function (idx) {
                      var note = channel.notes[idx];
                      note.chorus.push({
                        timing: tick,
                        time: time,
                        value: chorus
                      });
                    });
                    break;
                  case 98:
                    smf[p + 2];
                    break;
                  case 99:
                    smf[p + 2];
                    break;
                  case 100:
                    rpnLsb = smf[p + 2];
                    break;
                  case 101:
                    rpnMsb = smf[p + 2];
                    break;
                  case 111:
                    // RPGツクール用ループ(CC111)
                    if (cc111Tick == -1) {
                      cc111Tick = tick;
                      cc111Time = time;
                    }
                    break;
                }
                break;
              // Program Change - C[ch],
              case 0xC:
                instrument = smf[p + 1];
                break;
              // Channel Pre - D[ch],
              case 0xD:
                break;
              // PitchBend Change - E[ch],,
              case 0xE:
                pitchBend = (smf[p + 2] * 128 + smf[p + 1] - 8192) / 8192 * dataEntry;
                nowNoteOnIdxAry.forEach(function (idx) {
                  var note = channel.notes[idx];
                  note.pitchBend.push({
                    timing: tick,
                    time: time,
                    value: pitchBend
                  });
                });
                break;
              case 0xF:
                //lastState = smf[p]; <- ランニングステートは無い
                switch (smf[p]) {
                  case 0xF0:
                  case 0xF7:
                    // Master Volume
                    if (smf[p + 1] == 0x7f && smf[p + 2] == 0x7f && smf[p + 3] == 0x04 && smf[p + 4] == 0x01) {
                      var vol = smf[p + 6];
                      if (vol > 127) vol = 127;
                      masterVolume = vol;
                      nowNoteOnIdxAry.forEach(function (idx) {
                        var note = channel.notes[idx];
                        note.expression.push({
                          timing: tick,
                          time: time,
                          value: expression * (masterVolume / 127)
                        });
                      });
                    }
                    break;
                  case 0xFF:
                    // Meta Events
                    switch (smf[p + 1]) {
                      case 0x51:
                        // Tempo
                        tempoCurTime += 60 / tempo / header.resolution * (tick - tempoCurTick);
                        tempoCurTick = tick;
                        tempo = 60000000 / (smf[p + 3] * 0x10000 + smf[p + 4] * 0x100 + smf[p + 5]);
                        break;
                    }
                    break;
                }
                break;
              default:
                {
                  return {
                    v: {
                      v: "Error parseSMF. "
                    }
                  };
                }
            }
            indIdx = nextIdx;

            // 最後のEventを記録
            if (tick > lastEventTiming) {
              lastEventTiming = tick;
              lastEventTime = time;
            }
          },
          _ret2;
        while (indIdx != -1) {
          _ret2 = _loop3();
          if (_ret2) return _ret2.v;
        }
        channel.nowNoteOnIdxAry = nowNoteOnIdxAry;
        if (!_this.debug) {
          delete channel.indices;
        }
      },
      _ret;
    for (var ch = 0; ch < 16; ch++) {
      _ret = _loop();
      if (_ret) return _ret.v;
    }

    // ホールドが効いてノートオンのままになったノートをノートオフする //
    for (var _ch = 0; _ch < 16; _ch++) {
      var channel = channels[_ch];
      var nowNoteOnIdxAry = channel.nowNoteOnIdxAry;
      var _loop2 = function _loop2() {
        var note = channel.notes[nowNoteOnIdxAry[i]];
        if (note.stop == null) {
          note.stop = lastNoteOffTiming;
          note.stopTime = lastNoteOffTime;
          // If (note.cc[x].timing > lastNoteOffTiming), delete note.cc[x]
          var nameAry = ["pitchBend", "pan", "expression", "modulation", "reverb", "chorus"];
          nameAry.forEach(function (name) {
            var ccAry = note[name];
            for (var i2 = ccAry.length - 1; i2 >= 1; i2--) {
              var obj = ccAry[i2];
              if (obj.timing > lastNoteOffTiming) {
                ArrayUtil["delete"](ccAry, i2); // ccAry.splice(i2, 1); を軽量化
              }
            }
          });
          ArrayUtil["delete"](nowNoteOnIdxAry, i); // nowNoteOnIdxAry.splice(i, 1); を軽量化
        }
      };
      for (var i = nowNoteOnIdxAry.length - 1; i >= 0; i--) {
        _loop2();
      }
      delete channel.nowNoteOnIdxAry;
    }
    if (this.settings.isSkipEnding) songLength = lastNoteOffTiming;
    if (this.settings.isCC111 && cc111Time != -1) songLength = lastEventTiming;
    tempoTrack.push({
      timing: songLength,
      time: 60 / tempo / header.resolution * (songLength - tempoCurTick) + tempoCurTime,
      value: 120
    });

    // WebMIDI用のMIDIメッセージを作成 //
    var messages = [];
    if (this.settings.isWebMIDI || this.settings.preserveSmfData) {
      var _channel = channels[16];
      var _tempo = 120;
      var _tempoCurTick = 0;
      var _tempoCurTime = 0;
      var indIdx = _channel.indicesHead;
      var indices = _channel.indices;
      while (indIdx != -1) {
        var tick = indices[indIdx];
        var pLen = indices[indIdx + 1];
        var p = indices[indIdx + 2];
        var nextIdx = indices[indIdx + 3];
        var time = 60 / _tempo / header.resolution * (tick - _tempoCurTick) + _tempoCurTime;
        // Events
        switch (smf[p]) {
          case 0xFF:
            // Meta Events
            switch (smf[p + 1]) {
              case 0x51:
                // Tempo
                _tempoCurTime += 60 / _tempo / header.resolution * (tick - _tempoCurTick);
                _tempoCurTick = tick;
                _tempo = 60000000 / (smf[p + 3] * 0x10000 + smf[p + 4] * 0x100 + smf[p + 5]);
                break;
            }
        }
        messages.push({
          time: time,
          tick: tick,
          smfPtr: p,
          smfPtrLen: pLen
        });
        indIdx = nextIdx;
      }
    }

    // 関数呼び出し元にデータを返す //
    info.songLength = lastEventTime;
    info.cc111Tick = cc111Tick;
    info.cc111Time = cc111Time;
    info.firstNoteOnTiming = firstNoteOnTiming;
    info.firstNoteOnTime = firstNoteOnTime;
    info.lastNoteOffTiming = lastNoteOffTiming;
    info.lastNoteOffTime = lastNoteOffTime;
    info.lastEventTiming = lastEventTiming;
    info.lastEventTime = lastEventTime;
    if (this.settings.isWebMIDI || this.settings.preserveSmfData) {
      info.messages = messages;
      info.smfData = new Uint8Array(smf); // lastStateを上書きしたsmfをコピー
    }
    return info;
  }

  function parseSMF(_smf) {
    if (this.debug) {
      console.log(_smf);
      var syoriTimeS1 = Performance.now();
    }

    // smf配列はデータ上書きするので_smfをディープコピーする
    var smf = new Uint8Array(_smf);

    // SMFのフォーマットかどうかチェック //
    // "MThd"
    if (smf[0] != 77 || smf[1] != 84 || smf[2] != 104 || smf[3] != 100) return "Not Sandard MIDI File.";

    // 関数間でデータをやり取りするためのObject //
    var info = {};
    info.smf = smf;

    // ヘッダー解析 //
    parseHeader.call(this, info);
    if (this.debug) {
      var syoriTimeS2 = Performance.now();
    }

    // トラック解析 //
    parseTrack.call(this, info);
    if (this.debug) {
      var syoriTimeS3 = Performance.now();
    }

    // MIDIイベント解析 //
    parseEvent.call(this, info);

    // return用のオブジェクトに情報を代入 //
    var data = {};
    data.header = info.header;
    data.tempoTrack = info.tempoTrack;
    data.beatTrack = info.beatTrack;
    data.channels = info.channels;
    data.songLength = info.songLength;
    data.cc111Tick = info.cc111Tick;
    data.cc111Time = info.cc111Time;
    data.firstNoteOnTiming = info.firstNoteOnTiming;
    data.firstNoteOnTime = info.firstNoteOnTime;
    data.lastNoteOffTiming = info.lastNoteOffTiming;
    data.lastNoteOffTime = info.lastNoteOffTime;
    data.lastEventTiming = info.lastEventTiming;
    data.lastEventTime = info.lastEventTime;
    if (this.settings.isWebMIDI || this.settings.preserveSmfData) {
      data.messages = info.messages;
      data.smfData = new Uint8Array(smf); // lastStateを上書きしたsmfをコピー
    }
    if (this.debug) {
      var syoriTimeE = Performance.now();
      console.log("parseSMF time", syoriTimeE - syoriTimeS1);
      console.log("parseSMF(0/2) time", syoriTimeS2 - syoriTimeS1);
      console.log("parseSMF(1/2) time", syoriTimeS3 - syoriTimeS2);
      console.log("parseSMF(2/2) time", syoriTimeE - syoriTimeS3);
      console.log(data);
    }
    return data;
  }

  function startWebMIDI() {
    var _this = this;
    if (!navigator.requestMIDIAccess) return;
    // 1回目：ブラウザにMIDIデバイスのフルコントロールを要求する(SysExの使用を要求)
    // 2回目：MIDIデバイスのフルコントロールがブロックされたら、SysEx無しでMIDIアクセスを要求する
    var sysEx = this.settings.WebMIDIPortSysEx;
    var midiAccessSuccess = function midiAccessSuccess(midiAccess) {
      var outputs = midiAccess.outputs;
      _this.settings.WebMIDIPortOutputs = outputs;
      var output;
      if (_this.settings.WebMIDIPort == -1) {
        _this.settings.WebMIDIPortOutputs.forEach(function (o) {
          if (!output) output = o;
        });
      } else {
        output = _this.settings.WebMIDIPortOutputs.get(_this.settings.WebMIDIPort);
      }
      _this.settings.WebMIDIPortOutput = output;
      _this.settings.WebMIDIPortSysEx = sysEx;
      if (output) {
        output.open();
        _this.initStatus(); // リセットイベント（GMシステム・オン等）を送るため呼び出す
      }
      return outputs;
    };
    var midiAccessFailure = function midiAccessFailure(err) {
      console.log(err);
      if (sysEx) {
        sysEx = false;
        navigator.requestMIDIAccess({
          sysex: sysEx
        }).then(midiAccessSuccess)["catch"](midiAccessFailure);
      }
    };
    navigator.requestMIDIAccess({
      sysex: sysEx
    }).then(midiAccessSuccess)["catch"](midiAccessFailure);
    // 終了時に鳴らしている音を切る
    window.addEventListener('unload', function () {
      for (var t = 0; t < 16; t++) {
        _this.settings.WebMIDIPortOutput.send([0xB0 + t, 120, 0]);
        for (var i = 0; i < 128; i++) {
          _this.settings.WebMIDIPortOutput.send([0x80 + t, i, 0]);
        }
      }
    });
  }

  var PicoAudio = /*#__PURE__*/function () {
    /**
     * PicoAudioクラスのコンストラクタ
     * @param {Object} argsObj
     */
    function PicoAudio(argsObj) {
      _classCallCheck(this, PicoAudio);
      picoAudioConstructor.call(this, argsObj);
    }

    /**
     * 初期化・準備
     * @param {Object} argsObj
     */
    return _createClass(PicoAudio, [{
      key: "init",
      value: function init$1(argsObj) {
        return init.call(this, argsObj);
      }

      /**
       * MIDIファイル(SMF)を解析する
       * @param {Uint8Array} smf MIDIファイルの内容が入ったUint8Arrayオブジェクト
       * @returns {Object} 再生用の情報が入ったオブジェクト
       */
    }, {
      key: "parseSMF",
      value: function parseSMF$1(smf) {
        return parseSMF.call(this, smf);
      }

      /**
       * 再生用のデータをセットする
       * @param {Object} data PicoAudio.parseSMF()で返されたオブジェクト
       */
    }, {
      key: "setData",
      value: function setData$1(data) {
        return setData.call(this, data);
      }

      /**
       * 再生
       * @param {boolean} _isSongLooping PicoAudio内部で使う引数
       */
    }, {
      key: "play",
      value: function play$1(_isSongLooping) {
        return play.call(this, _isSongLooping);
      }

      /**
       * 一時停止
       * @param {boolean} _isSongLooping PicoAudio内部で使う引数
       */
    }, {
      key: "pause",
      value: function pause(_isSongLooping) {
        return stop.call(this, _isSongLooping);
      }

      /**
       * 停止
       * @param {boolean} _isSongLooping PicoAudio内部で使う引数
       */
    }, {
      key: "stop",
      value: function stop$1(_isSongLooping) {
        return stop.call(this, _isSongLooping);
      }

      /**
       * リセット
       * @param {boolean} _isSongLooping PicoAudio内部で使う引数
       * @param {boolean} _isLight PicoAudio内部で使う引数
       */
    }, {
      key: "initStatus",
      value: function initStatus$1(_isSongLooping, _isLight) {
        return initStatus.call(this, _isSongLooping, _isLight);
      }
    }, {
      key: "setStartTime",
      value: function setStartTime(offset) {
        this.states.startTime -= offset;
      }

      // 時関関係 //
      /**
       * tickからtime(秒)を求める
       * @param {number} tick
       * @returns {number} time(秒)
       */
    }, {
      key: "getTime",
      value: function getTime$1(tick) {
        return getTime.call(this, tick);
      }
      /**
       * time(秒)からtickを求める
       * @param {number} time
       * @returns {number} tick
       */
    }, {
      key: "getTiming",
      value: function getTiming$1(time) {
        return getTiming.call(this, time);
      }

      // 再生・音源関係 //
      /**
       * 再生処理（Web Audio API の oscillator等で音を鳴らす）
       * @param {Object} option
       * @param {boolean} isDrum
       * @param {boolean} isExpression
       * @param {boolean} nonChannel
       * @param {boolean} nonStop
       * @returns {Object} AudioNodeやパラメータを返す
       */
    }, {
      key: "createBaseNote",
      value: function createBaseNote$1(option, isDrum, isExpression, nonChannel, nonStop) {
        return createBaseNote.call(this, option, isDrum, isExpression, nonChannel, nonStop);
      }
      /**
       * 音源（パーカッション以外）
       * @param {Object} option
       * @returns {Object} 音をストップさせる関数を返す
       */
    }, {
      key: "createNote",
      value: function createNote$1(option) {
        return createNote.call(this, option);
      }
      /**
       * パーカッション音源
       * @param {Object} option
       * @returns {Object} 音をストップさせる関数を返す
       */
    }, {
      key: "createPercussionNote",
      value: function createPercussionNote$1(option) {
        return createPercussionNote.call(this, option);
      }

      // 停止管理関係 //
    }, {
      key: "stopAudioNode",
      value: function stopAudioNode$1(tar, time, stopGainNode, isNoiseCut) {
        return stopAudioNode.call(this, tar, time, stopGainNode, isNoiseCut);
      }
    }, {
      key: "pushFunc",
      value: function pushFunc$1(tar) {
        return pushFunc.call(this, tar);
      }
    }, {
      key: "clearFunc",
      value: function clearFunc$1(tar1, tar2) {
        return clearFunc.call(this, tar1, tar2);
      }

      /**
       * Web MIDI API
       */
    }, {
      key: "startWebMIDI",
      value: function startWebMIDI$1() {
        return startWebMIDI.call(this);
      }

      // インターフェース関係 //
    }, {
      key: "addEventListener",
      value: function addEventListener(type, func) {
        // type = EventName (play, stop, noteOn, noteOff, songEnd)
        this.events.push({
          type: type,
          func: func
        });
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(type, func) {
        for (var i = this.events.length; i >= 0; i--) {
          if (event.type == type && event.func === func) {
            this.events.splice(i, 1);
          }
        }
      }
    }, {
      key: "removeAllEventListener",
      value: function removeAllEventListener(type) {
        for (var i = this.events.length; i >= 0; i--) {
          if (event.type == type) {
            this.events.splice(i, 1);
          }
        }
      }
    }, {
      key: "fireEvent",
      value: function fireEvent(type, option) {
        this.events.forEach(function (event) {
          if (event.type == type) {
            try {
              event.func(option);
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    }, {
      key: "setOnSongEndListener",
      value: function setOnSongEndListener(listener) {
        this.onSongEndListener = listener;
      }
    }, {
      key: "onSongEnd",
      value: function onSongEnd() {
        if (this.onSongEndListener) {
          var isStopFunc = this.onSongEndListener();
          if (isStopFunc) return;
        }
        if (this.settings.loop) {
          this.initStatus(true);
          if (this.settings.isCC111 && this.cc111Time != -1) {
            this.setStartTime(this.cc111Time);
          }
          this.play(true);
        }
      }
    }, {
      key: "getChannels",
      value: function getChannels() {
        return this.channels;
      }
    }, {
      key: "setChannels",
      value: function setChannels(channels) {
        var _this = this;
        channels.forEach(function (channel, idx) {
          _this.channels[idx] = channel;
        });
      }
    }, {
      key: "initChannels",
      value: function initChannels() {
        for (var i = 0; i < 16; i++) {
          this.channels[i] = [0, 0, 1];
        }
      }
    }, {
      key: "getMasterVolume",
      value: function getMasterVolume() {
        return this.settings.masterVolume;
      }
    }, {
      key: "setMasterVolume",
      value: function setMasterVolume(volume) {
        this.settings.masterVolume = volume;
        if (this.isStarted) {
          this.masterGainNode.gain.value = this.settings.masterVolume;
        }
      }
    }, {
      key: "isLoop",
      value: function isLoop() {
        return this.settings.loop;
      }
    }, {
      key: "setLoop",
      value: function setLoop(loop) {
        this.settings.loop = loop;
      }
    }, {
      key: "isWebMIDI",
      value: function isWebMIDI() {
        return this.settings.isWebMIDI;
      }
    }, {
      key: "setWebMIDI",
      value: function setWebMIDI(enable) {
        this.settings.isWebMIDI = enable;
      }
    }, {
      key: "isCC111",
      value: function isCC111() {
        return this.settings.isCC111;
      }
    }, {
      key: "setCC111",
      value: function setCC111(enable) {
        this.settings.isCC111 = enable;
      }
    }, {
      key: "isReverb",
      value: function isReverb() {
        return this.settings.isReverb;
      }
    }, {
      key: "setReverb",
      value: function setReverb(enable) {
        this.settings.isReverb = enable;
      }
    }, {
      key: "getReverbVolume",
      value: function getReverbVolume() {
        return this.settings.reverbVolume;
      }
    }, {
      key: "setReverbVolume",
      value: function setReverbVolume(volume) {
        this.settings.reverbVolume = volume;
      }
    }, {
      key: "isChorus",
      value: function isChorus() {
        return this.settings.isChorus;
      }
    }, {
      key: "setChorus",
      value: function setChorus(enable) {
        this.settings.isChorus = enable;
      }
    }, {
      key: "getChorusVolume",
      value: function getChorusVolume() {
        return this.settings.chorusVolume;
      }
    }, {
      key: "setChorusVolume",
      value: function setChorusVolume(volume) {
        this.settings.chorusVolume = volume;
      }
    }, {
      key: "render",
      value: function render$1() {
        return render.call(this);
      }

      /**  Deprecated */
    }, {
      key: "setGlobalReverb",
      value: function setGlobalReverb(value) {
        console.warn("setGlobalReverb() is deprecated");
      }
    }, {
      key: "loadWaves",
      value: function loadWaves$1(buffer) {
        loadWaves(buffer);
      }
    }, {
      key: "loadSamples",
      value: function loadSamples$1(buffer) {
        loadSamples(buffer);
      }
    }, {
      key: "getDuration",
      value: function getDuration() {
        var _this$playData$lastEv, _this$playData;
        return (_this$playData$lastEv = (_this$playData = this.playData) === null || _this$playData === void 0 ? void 0 : _this$playData.lastEventTime) !== null && _this$playData$lastEv !== void 0 ? _this$playData$lastEv : 0;
      }
    }]);
  }();

  return PicoAudio;

})();
