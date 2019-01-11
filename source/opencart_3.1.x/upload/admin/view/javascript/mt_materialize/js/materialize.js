/**
 * SimpleBar.js - v3.1.0-beta.5
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global.SimpleBar = factory());
}(this, (function () { 'use strict';

	var _isObject = function (it) {
		return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
		if (!_isObject(it)) throw TypeError(it + ' is not an object!');
		return it;
	};

	var _fails = function (exec) {
		try {
			return !!exec();
		} catch (e) {
			return true;
		}
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
		return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
		// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
		var global = module.exports = typeof window != 'undefined' && window.Math == Math
			? window : typeof self != 'undefined' && self.Math == Math ? self
				// eslint-disable-next-line no-new-func
				: Function('return this')();
		if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
		return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
		return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
		if (!_isObject(it)) return it;
		var fn, val;
		if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
		if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
		if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
		throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
		_anObject(O);
		P = _toPrimitive(P, true);
		_anObject(Attributes);
		if (_ie8DomDefine) try {
			return dP(O, P, Attributes);
		} catch (e) { /* empty */ }
		if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
		if ('value' in Attributes) O[P] = Attributes.value;
		return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
		return {
			enumerable: !(bitmap & 1),
			configurable: !(bitmap & 2),
			writable: !(bitmap & 4),
			value: value
		};
	};

	var _hide = _descriptors ? function (object, key, value) {
		return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
		object[key] = value;
		return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
		return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
		return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _core = createCommonjsModule(function (module) {
		var core = module.exports = { version: '2.5.7' };
		if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _redefine = createCommonjsModule(function (module) {
		var SRC = _uid('src');
		var TO_STRING = 'toString';
		var $toString = Function[TO_STRING];
		var TPL = ('' + $toString).split(TO_STRING);

		_core.inspectSource = function (it) {
			return $toString.call(it);
		};

		(module.exports = function (O, key, val, safe) {
			var isFunction = typeof val == 'function';
			if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
			if (O[key] === val) return;
			if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
			if (O === _global) {
				O[key] = val;
			} else if (!safe) {
				delete O[key];
				_hide(O, key, val);
			} else if (O[key]) {
				O[key] = val;
			} else {
				_hide(O, key, val);
			}
			// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
		})(Function.prototype, TO_STRING, function toString() {
			return typeof this == 'function' && this[SRC] || $toString.call(this);
		});
	});

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
		if (it == undefined) throw TypeError("Can't call method on  " + it);
		return it;
	};

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
		var SHARED = '__core-js_shared__';
		var store = _global[SHARED] || (_global[SHARED] = {});

		(module.exports = function (key, value) {
			return store[key] || (store[key] = value !== undefined ? value : {});
		})('versions', []).push({
			version: _core.version,
			mode: _library ? 'pure' : 'global',
			copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
		});
	});

	var _wks = createCommonjsModule(function (module) {
		var store = _shared('wks');

		var Symbol = _global.Symbol;
		var USE_SYMBOL = typeof Symbol == 'function';

		var $exports = module.exports = function (name) {
			return store[name] || (store[name] =
				USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
		};

		$exports.store = store;
	});

	var _fixReWks = function (KEY, length, exec) {
		var SYMBOL = _wks(KEY);
		var fns = exec(_defined, SYMBOL, ''[KEY]);
		var strfn = fns[0];
		var rxfn = fns[1];
		if (_fails(function () {
			var O = {};
			O[SYMBOL] = function () { return 7; };
			return ''[KEY](O) != 7;
		})) {
			_redefine(String.prototype, KEY, strfn);
			_hide(RegExp.prototype, SYMBOL, length == 2
				// 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
				// 21.2.5.11 RegExp.prototype[@@split](string, limit)
				? function (string, arg) { return rxfn.call(string, this, arg); }
				// 21.2.5.6 RegExp.prototype[@@match](string)
				// 21.2.5.9 RegExp.prototype[@@search](string)
				: function (string) { return rxfn.call(string, this); }
			);
		}
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace) {
		// 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
		return [function replace(searchValue, replaceValue) {
			var O = defined(this);
			var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
			return fn !== undefined
				? fn.call(searchValue, O, replaceValue)
				: $replace.call(String(O), searchValue, replaceValue);
		}, $replace];
	});

	var dP$1 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors && dP$1(FProto, NAME, {
		configurable: true,
		get: function () {
			try {
				return ('' + this).match(nameRE)[1];
			} catch (e) {
				return '';
			}
		}
	});

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match) {
		// 21.1.3.11 String.prototype.match(regexp)
		return [function match(regexp) {
			var O = defined(this);
			var fn = regexp == undefined ? undefined : regexp[MATCH];
			return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
		}, $match];
	});

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
		ArrayProto[UNSCOPABLES][key] = true;
	};

	var _iterStep = function (done, value) {
		return { value: value, done: !!done };
	};

	var _iterators = {};

	var toString = {}.toString;

	var _cof = function (it) {
		return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
		return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
		return _iobject(_defined(it));
	};

	var _aFunction = function (it) {
		if (typeof it != 'function') throw TypeError(it + ' is not a function!');
		return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
		_aFunction(fn);
		if (that === undefined) return fn;
		switch (length) {
			case 1: return function (a) {
				return fn.call(that, a);
			};
			case 2: return function (a, b) {
				return fn.call(that, a, b);
			};
			case 3: return function (a, b, c) {
				return fn.call(that, a, b, c);
			};
		}
		return function (/* ...args */) {
			return fn.apply(that, arguments);
		};
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
		var IS_FORCED = type & $export.F;
		var IS_GLOBAL = type & $export.G;
		var IS_STATIC = type & $export.S;
		var IS_PROTO = type & $export.P;
		var IS_BIND = type & $export.B;
		var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
		var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
		var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
		var key, own, out, exp;
		if (IS_GLOBAL) source = name;
		for (key in source) {
			// contains in native
			own = !IS_FORCED && target && target[key] !== undefined;
			// export native or passed
			out = (own ? target : source)[key];
			// bind timers to global for call from export context
			exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
			// extend global
			if (target) _redefine(target, key, out, type & $export.U);
			// export
			if (exports[key] != out) _hide(exports, key, exp);
			if (IS_PROTO && expProto[key] != out) expProto[key] = out;
		}
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
		return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
		return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
		index = _toInteger(index);
		return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
		return function ($this, el, fromIndex) {
			var O = _toIobject($this);
			var length = _toLength(O.length);
			var index = _toAbsoluteIndex(fromIndex, length);
			var value;
			// Array#includes uses SameValueZero equality algorithm
			// eslint-disable-next-line no-self-compare
			if (IS_INCLUDES && el != el) while (length > index) {
				value = O[index++];
				// eslint-disable-next-line no-self-compare
				if (value != value) return true;
				// Array#indexOf ignores holes, Array#includes - not
			} else for (;length > index; index++) if (IS_INCLUDES || index in O) {
				if (O[index] === el) return IS_INCLUDES || index || 0;
			} return !IS_INCLUDES && -1;
		};
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
		return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
		var O = _toIobject(object);
		var i = 0;
		var result = [];
		var key;
		for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
		// Don't enum bug & hidden keys
		while (names.length > i) if (_has(O, key = names[i++])) {
			~arrayIndexOf(result, key) || result.push(key);
		}
		return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
		'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
		return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
		_anObject(O);
		var keys = _objectKeys(Properties);
		var length = keys.length;
		var i = 0;
		var P;
		while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
		return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
		// Thrash, waste and sodomy: IE GC bug
		var iframe = _domCreate('iframe');
		var i = _enumBugKeys.length;
		var lt = '<';
		var gt = '>';
		var iframeDocument;
		iframe.style.display = 'none';
		_html.appendChild(iframe);
		iframe.src = 'javascript:'; // eslint-disable-line no-script-url
		// createDict = iframe.contentWindow.Object;
		// html.removeChild(iframe);
		iframeDocument = iframe.contentWindow.document;
		iframeDocument.open();
		iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
		iframeDocument.close();
		createDict = iframeDocument.F;
		while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
		return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
		var result;
		if (O !== null) {
			Empty[PROTOTYPE$1] = _anObject(O);
			result = new Empty();
			Empty[PROTOTYPE$1] = null;
			// add "__proto__" for Object.getPrototypeOf polyfill
			result[IE_PROTO$1] = O;
		} else result = createDict();
		return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
		if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
		Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
		_setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
		return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
		O = _toObject(O);
		if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
		if (typeof O.constructor == 'function' && O instanceof O.constructor) {
			return O.constructor.prototype;
		} return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
		_iterCreate(Constructor, NAME, next);
		var getMethod = function (kind) {
			if (!BUGGY && kind in proto) return proto[kind];
			switch (kind) {
				case KEYS: return function keys() { return new Constructor(this, kind); };
				case VALUES: return function values() { return new Constructor(this, kind); };
			} return function entries() { return new Constructor(this, kind); };
		};
		var TAG = NAME + ' Iterator';
		var DEF_VALUES = DEFAULT == VALUES;
		var VALUES_BUG = false;
		var proto = Base.prototype;
		var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
		var $default = $native || getMethod(DEFAULT);
		var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
		var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
		var methods, key, IteratorPrototype;
		// Fix native
		if ($anyNative) {
			IteratorPrototype = _objectGpo($anyNative.call(new Base()));
			if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
				// Set @@toStringTag to native iterators
				_setToStringTag(IteratorPrototype, TAG, true);
				// fix for some old engines
				if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
			}
		}
		// fix Array#{values, @@iterator}.name in V8 / FF
		if (DEF_VALUES && $native && $native.name !== VALUES) {
			VALUES_BUG = true;
			$default = function values() { return $native.call(this); };
		}
		// Define iterator
		if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
			_hide(proto, ITERATOR, $default);
		}
		// Plug for library
		_iterators[NAME] = $default;
		_iterators[TAG] = returnThis;
		if (DEFAULT) {
			methods = {
				values: DEF_VALUES ? $default : getMethod(VALUES),
				keys: IS_SET ? $default : getMethod(KEYS),
				entries: $entries
			};
			if (FORCED) for (key in methods) {
				if (!(key in proto)) _redefine(proto, key, methods[key]);
			} else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
		}
		return methods;
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
		this._t = _toIobject(iterated); // target
		this._i = 0;                   // next index
		this._k = kind;                // kind
		// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
		var O = this._t;
		var kind = this._k;
		var index = this._i++;
		if (!O || index >= O.length) {
			this._t = undefined;
			return _iterStep(1);
		}
		if (kind == 'keys') return _iterStep(0, index);
		if (kind == 'values') return _iterStep(0, O[index]);
		return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	var ITERATOR$1 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
		CSSRuleList: true, // TODO: Not spec compliant, should be false.
		CSSStyleDeclaration: false,
		CSSValueList: false,
		ClientRectList: false,
		DOMRectList: false,
		DOMStringList: false,
		DOMTokenList: true,
		DataTransferItemList: false,
		FileList: false,
		HTMLAllCollection: false,
		HTMLCollection: false,
		HTMLFormElement: false,
		HTMLSelectElement: false,
		MediaList: true, // TODO: Not spec compliant, should be false.
		MimeTypeArray: false,
		NamedNodeMap: false,
		NodeList: true,
		PaintRequestList: false,
		Plugin: false,
		PluginArray: false,
		SVGLengthList: false,
		SVGNumberList: false,
		SVGPathSegList: false,
		SVGPointList: false,
		SVGStringList: false,
		SVGTransformList: false,
		SourceBufferList: false,
		StyleSheetList: true, // TODO: Not spec compliant, should be false.
		TextTrackCueList: false,
		TextTrackList: false,
		TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
		var NAME$1 = collections[i];
		var explicit = DOMIterables[NAME$1];
		var Collection = _global[NAME$1];
		var proto = Collection && Collection.prototype;
		var key;
		if (proto) {
			if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
			if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME$1);
			_iterators[NAME$1] = ArrayValues;
			if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
		}
	}

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
		return function (that, pos) {
			var s = String(_defined(that));
			var i = _toInteger(pos);
			var l = s.length;
			var a, b;
			if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
			a = s.charCodeAt(i);
			return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
				? TO_STRING ? s.charAt(i) : a
				: TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
		};
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
		this._t = String(iterated); // target
		this._i = 0;                // next index
		// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
		var O = this._t;
		var index = this._i;
		var point;
		if (index >= O.length) return { value: undefined, done: true };
		point = $at(O, index);
		this._i += point.length;
		return { value: point, done: false };
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
		try {
			return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
			// 7.4.6 IteratorClose(iterator, completion)
		} catch (e) {
			var ret = iterator['return'];
			if (ret !== undefined) _anObject(ret.call(iterator));
			throw e;
		}
	};

	// check on default Array iterator

	var ITERATOR$2 = _wks('iterator');
	var ArrayProto$1 = Array.prototype;

	var _isArrayIter = function (it) {
		return it !== undefined && (_iterators.Array === it || ArrayProto$1[ITERATOR$2] === it);
	};

	var _createProperty = function (object, index, value) {
		if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
		else object[index] = value;
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
		try {
			return it[key];
		} catch (e) { /* empty */ }
	};

	var _classof = function (it) {
		var O, T, B;
		return it === undefined ? 'Undefined' : it === null ? 'Null'
			// @@toStringTag case
			: typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
				// builtinTag case
				: ARG ? _cof(O)
					// ES3 arguments fallback
					: (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$3 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
		if (it != undefined) return it[ITERATOR$3]
			|| it['@@iterator']
			|| _iterators[_classof(it)];
	};

	var ITERATOR$4 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
		var riter = [7][ITERATOR$4]();
		riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
		if (!skipClosing && !SAFE_CLOSING) return false;
		var safe = false;
		try {
			var arr = [7];
			var iter = arr[ITERATOR$4]();
			iter.next = function () { return { done: safe = true }; };
			arr[ITERATOR$4] = function () { return iter; };
			exec(arr);
		} catch (e) { /* empty */ }
		return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
		// 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
		from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
			var O = _toObject(arrayLike);
			var C = typeof this == 'function' ? this : Array;
			var aLen = arguments.length;
			var mapfn = aLen > 1 ? arguments[1] : undefined;
			var mapping = mapfn !== undefined;
			var index = 0;
			var iterFn = core_getIteratorMethod(O);
			var length, result, step, iterator;
			if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
			// if object isn't iterable or it's array with default iterator - use simple case
			if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
				for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
					_createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
				}
			} else {
				length = _toLength(O.length);
				for (result = new C(length); length > index; index++) {
					_createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
				}
			}
			result.length = index;
			return result;
		}
	});

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
		var A = {};
		var B = {};
		// eslint-disable-next-line no-undef
		var S = Symbol();
		var K = 'abcdefghijklmnopqrst';
		A[S] = 7;
		K.split('').forEach(function (k) { B[k] = k; });
		return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
		var T = _toObject(target);
		var aLen = arguments.length;
		var index = 1;
		var getSymbols = _objectGops.f;
		var isEnum = _objectPie.f;
		while (aLen > index) {
			var S = _iobject(arguments[index++]);
			var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
			var length = keys.length;
			var j = 0;
			var key;
			while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
		} return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

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

	var scrollbarWidth = createCommonjsModule(function (module, exports) {
		/*! scrollbarWidth.js v0.1.3 | felixexter | MIT | https://github.com/felixexter/scrollbarWidth */
		(function (root, factory) {
			{
				module.exports = factory();
			}
		}(commonjsGlobal, function () {

			function scrollbarWidth() {
				if (typeof document === 'undefined') {
					return 0
				}

				var
					body = document.body,
					box = document.createElement('div'),
					boxStyle = box.style,
					width;

				boxStyle.position = 'absolute';
				boxStyle.top = boxStyle.left = '-9999px';
				boxStyle.width = boxStyle.height = '100px';
				boxStyle.overflow = 'scroll';

				body.appendChild(box);

				width = box.offsetWidth - box.clientWidth;

				body.removeChild(box);

				return width;
			}

			return scrollbarWidth;
		}));
	});

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
		nativeMin = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
		return root.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
		var lastArgs,
			lastThis,
			maxWait,
			result,
			timerId,
			lastCallTime,
			lastInvokeTime = 0,
			leading = false,
			maxing = false,
			trailing = true;

		if (typeof func != 'function') {
			throw new TypeError(FUNC_ERROR_TEXT);
		}
		wait = toNumber(wait) || 0;
		if (isObject(options)) {
			leading = !!options.leading;
			maxing = 'maxWait' in options;
			maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
			trailing = 'trailing' in options ? !!options.trailing : trailing;
		}

		function invokeFunc(time) {
			var args = lastArgs,
				thisArg = lastThis;

			lastArgs = lastThis = undefined;
			lastInvokeTime = time;
			result = func.apply(thisArg, args);
			return result;
		}

		function leadingEdge(time) {
			// Reset any `maxWait` timer.
			lastInvokeTime = time;
			// Start the timer for the trailing edge.
			timerId = setTimeout(timerExpired, wait);
			// Invoke the leading edge.
			return leading ? invokeFunc(time) : result;
		}

		function remainingWait(time) {
			var timeSinceLastCall = time - lastCallTime,
				timeSinceLastInvoke = time - lastInvokeTime,
				result = wait - timeSinceLastCall;

			return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
		}

		function shouldInvoke(time) {
			var timeSinceLastCall = time - lastCallTime,
				timeSinceLastInvoke = time - lastInvokeTime;

			// Either this is the first call, activity has stopped and we're at the
			// trailing edge, the system time has gone backwards and we're treating
			// it as the trailing edge, or we've hit the `maxWait` limit.
			return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
				(timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
		}

		function timerExpired() {
			var time = now();
			if (shouldInvoke(time)) {
				return trailingEdge(time);
			}
			// Restart the timer.
			timerId = setTimeout(timerExpired, remainingWait(time));
		}

		function trailingEdge(time) {
			timerId = undefined;

			// Only invoke if we have `lastArgs` which means `func` has been
			// debounced at least once.
			if (trailing && lastArgs) {
				return invokeFunc(time);
			}
			lastArgs = lastThis = undefined;
			return result;
		}

		function cancel() {
			if (timerId !== undefined) {
				clearTimeout(timerId);
			}
			lastInvokeTime = 0;
			lastArgs = lastCallTime = lastThis = timerId = undefined;
		}

		function flush() {
			return timerId === undefined ? result : trailingEdge(now());
		}

		function debounced() {
			var time = now(),
				isInvoking = shouldInvoke(time);

			lastArgs = arguments;
			lastThis = this;
			lastCallTime = time;

			if (isInvoking) {
				if (timerId === undefined) {
					return leadingEdge(lastCallTime);
				}
				if (maxing) {
					// Handle invocations in a tight loop.
					timerId = setTimeout(timerExpired, wait);
					return invokeFunc(lastCallTime);
				}
			}
			if (timerId === undefined) {
				timerId = setTimeout(timerExpired, wait);
			}
			return result;
		}
		debounced.cancel = cancel;
		debounced.flush = flush;
		return debounced;
	}

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
		var leading = true,
			trailing = true;

		if (typeof func != 'function') {
			throw new TypeError(FUNC_ERROR_TEXT);
		}
		if (isObject(options)) {
			leading = 'leading' in options ? !!options.leading : leading;
			trailing = 'trailing' in options ? !!options.trailing : trailing;
		}
		return debounce(func, wait, {
			'leading': leading,
			'maxWait': wait,
			'trailing': trailing
		});
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
		var type = typeof value;
		return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
		return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
		return typeof value == 'symbol' ||
			(isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
		if (typeof value == 'number') {
			return value;
		}
		if (isSymbol(value)) {
			return NAN;
		}
		if (isObject(value)) {
			var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
			value = isObject(other) ? (other + '') : other;
		}
		if (typeof value != 'string') {
			return value === 0 ? value : +value;
		}
		value = value.replace(reTrim, '');
		var isBinary = reIsBinary.test(value);
		return (isBinary || reIsOctal.test(value))
			? freeParseInt(value.slice(2), isBinary ? 2 : 8)
			: (reIsBadHex.test(value) ? NAN : +value);
	}

	var lodash_throttle = throttle;

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT$1 = 'Expected a function';

	/** Used as references for various `Number` constants. */
	var NAN$1 = 0 / 0;

	/** `Object#toString` result references. */
	var symbolTag$1 = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim$1 = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary$1 = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal$1 = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt$1 = parseInt;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString$1 = objectProto$1.toString;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax$1 = Math.max,
		nativeMin$1 = Math.min;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now$1 = function() {
		return root$1.Date.now();
	};

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce$1(func, wait, options) {
		var lastArgs,
			lastThis,
			maxWait,
			result,
			timerId,
			lastCallTime,
			lastInvokeTime = 0,
			leading = false,
			maxing = false,
			trailing = true;

		if (typeof func != 'function') {
			throw new TypeError(FUNC_ERROR_TEXT$1);
		}
		wait = toNumber$1(wait) || 0;
		if (isObject$1(options)) {
			leading = !!options.leading;
			maxing = 'maxWait' in options;
			maxWait = maxing ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait) : maxWait;
			trailing = 'trailing' in options ? !!options.trailing : trailing;
		}

		function invokeFunc(time) {
			var args = lastArgs,
				thisArg = lastThis;

			lastArgs = lastThis = undefined;
			lastInvokeTime = time;
			result = func.apply(thisArg, args);
			return result;
		}

		function leadingEdge(time) {
			// Reset any `maxWait` timer.
			lastInvokeTime = time;
			// Start the timer for the trailing edge.
			timerId = setTimeout(timerExpired, wait);
			// Invoke the leading edge.
			return leading ? invokeFunc(time) : result;
		}

		function remainingWait(time) {
			var timeSinceLastCall = time - lastCallTime,
				timeSinceLastInvoke = time - lastInvokeTime,
				result = wait - timeSinceLastCall;

			return maxing ? nativeMin$1(result, maxWait - timeSinceLastInvoke) : result;
		}

		function shouldInvoke(time) {
			var timeSinceLastCall = time - lastCallTime,
				timeSinceLastInvoke = time - lastInvokeTime;

			// Either this is the first call, activity has stopped and we're at the
			// trailing edge, the system time has gone backwards and we're treating
			// it as the trailing edge, or we've hit the `maxWait` limit.
			return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
				(timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
		}

		function timerExpired() {
			var time = now$1();
			if (shouldInvoke(time)) {
				return trailingEdge(time);
			}
			// Restart the timer.
			timerId = setTimeout(timerExpired, remainingWait(time));
		}

		function trailingEdge(time) {
			timerId = undefined;

			// Only invoke if we have `lastArgs` which means `func` has been
			// debounced at least once.
			if (trailing && lastArgs) {
				return invokeFunc(time);
			}
			lastArgs = lastThis = undefined;
			return result;
		}

		function cancel() {
			if (timerId !== undefined) {
				clearTimeout(timerId);
			}
			lastInvokeTime = 0;
			lastArgs = lastCallTime = lastThis = timerId = undefined;
		}

		function flush() {
			return timerId === undefined ? result : trailingEdge(now$1());
		}

		function debounced() {
			var time = now$1(),
				isInvoking = shouldInvoke(time);

			lastArgs = arguments;
			lastThis = this;
			lastCallTime = time;

			if (isInvoking) {
				if (timerId === undefined) {
					return leadingEdge(lastCallTime);
				}
				if (maxing) {
					// Handle invocations in a tight loop.
					timerId = setTimeout(timerExpired, wait);
					return invokeFunc(lastCallTime);
				}
			}
			if (timerId === undefined) {
				timerId = setTimeout(timerExpired, wait);
			}
			return result;
		}
		debounced.cancel = cancel;
		debounced.flush = flush;
		return debounced;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject$1(value) {
		var type = typeof value;
		return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike$1(value) {
		return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol$1(value) {
		return typeof value == 'symbol' ||
			(isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber$1(value) {
		if (typeof value == 'number') {
			return value;
		}
		if (isSymbol$1(value)) {
			return NAN$1;
		}
		if (isObject$1(value)) {
			var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
			value = isObject$1(other) ? (other + '') : other;
		}
		if (typeof value != 'string') {
			return value === 0 ? value : +value;
		}
		value = value.replace(reTrim$1, '');
		var isBinary = reIsBinary$1.test(value);
		return (isBinary || reIsOctal$1.test(value))
			? freeParseInt$1(value.slice(2), isBinary ? 2 : 8)
			: (reIsBadHex$1.test(value) ? NAN$1 : +value);
	}

	var lodash_debounce = debounce$1;

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT$2 = 'Expected a function';

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
		genTag = '[object GeneratorFunction]';

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal$2 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	/** Detect free variable `self`. */
	var freeSelf$2 = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root$2 = freeGlobal$2 || freeSelf$2 || Function('return this')();

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
		return object == null ? undefined : object[key];
	}

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
		// Many host objects are `Object` objects that can coerce to strings
		// despite having improperly defined `toString` methods.
		var result = false;
		if (value != null && typeof value.toString != 'function') {
			try {
				result = !!(value + '');
			} catch (e) {}
		}
		return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
		funcProto = Function.prototype,
		objectProto$2 = Object.prototype;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root$2['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
		var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
		return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString$2 = objectProto$2.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
		funcToString.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
			.replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/* Built-in method references that are verified to be native. */
	var Map$1 = getNative(root$2, 'Map'),
		nativeCreate = getNative(Object, 'create');

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
		var index = -1,
			length = entries ? entries.length : 0;

		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
		this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
		return this.has(key) && delete this.__data__[key];
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
		var data = this.__data__;
		if (nativeCreate) {
			var result = data[key];
			return result === HASH_UNDEFINED ? undefined : result;
		}
		return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
		var data = this.__data__;
		return nativeCreate ? data[key] !== undefined : hasOwnProperty$1.call(data, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
		var data = this.__data__;
		data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
		return this;
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
		var index = -1,
			length = entries ? entries.length : 0;

		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
		this.__data__ = [];
	}

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
		var data = this.__data__,
			index = assocIndexOf(data, key);

		if (index < 0) {
			return false;
		}
		var lastIndex = data.length - 1;
		if (index == lastIndex) {
			data.pop();
		} else {
			splice.call(data, index, 1);
		}
		return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
		var data = this.__data__,
			index = assocIndexOf(data, key);

		return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
		return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
		var data = this.__data__,
			index = assocIndexOf(data, key);

		if (index < 0) {
			data.push([key, value]);
		} else {
			data[index][1] = value;
		}
		return this;
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
		var index = -1,
			length = entries ? entries.length : 0;

		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
		this.__data__ = {
			'hash': new Hash,
			'map': new (Map$1 || ListCache),
			'string': new Hash
		};
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
		return getMapData(this, key)['delete'](key);
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
		return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
		return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
		getMapData(this, key).set(key, value);
		return this;
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
		var length = array.length;
		while (length--) {
			if (eq(array[length][0], key)) {
				return length;
			}
		}
		return -1;
	}

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
		if (!isObject$2(value) || isMasked(value)) {
			return false;
		}
		var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
		return pattern.test(toSource(value));
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
		var data = map.__data__;
		return isKeyable(key)
			? data[typeof key == 'string' ? 'string' : 'hash']
			: data.map;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
		var value = getValue(object, key);
		return baseIsNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
		var type = typeof value;
		return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
			? (value !== '__proto__')
			: (value === null);
	}

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
		return !!maskSrcKey && (maskSrcKey in func);
	}

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
		if (func != null) {
			try {
				return funcToString.call(func);
			} catch (e) {}
			try {
				return (func + '');
			} catch (e) {}
		}
		return '';
	}

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
		if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
			throw new TypeError(FUNC_ERROR_TEXT$2);
		}
		var memoized = function() {
			var args = arguments,
				key = resolver ? resolver.apply(this, args) : args[0],
				cache = memoized.cache;

			if (cache.has(key)) {
				return cache.get(key);
			}
			var result = func.apply(this, args);
			memoized.cache = cache.set(key, result);
			return result;
		};
		memoized.cache = new (memoize.Cache || MapCache);
		return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
		return value === other || (value !== value && other !== other);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
		// The use of `Object#toString` avoids issues with the `typeof` operator
		// in Safari 8-9 which returns 'object' for typed array and other constructors.
		var tag = isObject$2(value) ? objectToString$2.call(value) : '';
		return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject$2(value) {
		var type = typeof value;
		return !!value && (type == 'object' || type == 'function');
	}

	var lodash_memoize = memoize;

	/**
	 * A collection of shims that provide minimal functionality of the ES6 collections.
	 *
	 * These implementations are not meant to be used outside of the ResizeObserver
	 * modules as they cover only a limited range of use cases.
	 */
	/* eslint-disable require-jsdoc, valid-jsdoc */
	var MapShim = (function () {
		if (typeof Map !== 'undefined') {
			return Map;
		}

		/**
		 * Returns index in provided array that matches the specified key.
		 *
		 * @param {Array<Array>} arr
		 * @param {*} key
		 * @returns {number}
		 */
		function getIndex(arr, key) {
			var result = -1;

			arr.some(function (entry, index) {
				if (entry[0] === key) {
					result = index;

					return true;
				}

				return false;
			});

			return result;
		}

		return (function () {
			function anonymous() {
				this.__entries__ = [];
			}

			var prototypeAccessors = { size: { configurable: true } };

			/**
			 * @returns {boolean}
			 */
			prototypeAccessors.size.get = function () {
				return this.__entries__.length;
			};

			/**
			 * @param {*} key
			 * @returns {*}
			 */
			anonymous.prototype.get = function (key) {
				var index = getIndex(this.__entries__, key);
				var entry = this.__entries__[index];

				return entry && entry[1];
			};

			/**
			 * @param {*} key
			 * @param {*} value
			 * @returns {void}
			 */
			anonymous.prototype.set = function (key, value) {
				var index = getIndex(this.__entries__, key);

				if (~index) {
					this.__entries__[index][1] = value;
				} else {
					this.__entries__.push([key, value]);
				}
			};

			/**
			 * @param {*} key
			 * @returns {void}
			 */
			anonymous.prototype.delete = function (key) {
				var entries = this.__entries__;
				var index = getIndex(entries, key);

				if (~index) {
					entries.splice(index, 1);
				}
			};

			/**
			 * @param {*} key
			 * @returns {void}
			 */
			anonymous.prototype.has = function (key) {
				return !!~getIndex(this.__entries__, key);
			};

			/**
			 * @returns {void}
			 */
			anonymous.prototype.clear = function () {
				this.__entries__.splice(0);
			};

			/**
			 * @param {Function} callback
			 * @param {*} [ctx=null]
			 * @returns {void}
			 */
			anonymous.prototype.forEach = function (callback, ctx) {
				var this$1 = this;
				if ( ctx === void 0 ) ctx = null;

				for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
					var entry = list[i];

					callback.call(ctx, entry[1], entry[0]);
				}
			};

			Object.defineProperties( anonymous.prototype, prototypeAccessors );

			return anonymous;
		}());
	})();

	/**
	 * Detects whether window and document objects are available in current environment.
	 */
	var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

	// Returns global object of a current environment.
	var global$1 = (function () {
		if (typeof global !== 'undefined' && global.Math === Math) {
			return global;
		}

		if (typeof self !== 'undefined' && self.Math === Math) {
			return self;
		}

		if (typeof window !== 'undefined' && window.Math === Math) {
			return window;
		}

		// eslint-disable-next-line no-new-func
		return Function('return this')();
	})();

	/**
	 * A shim for the requestAnimationFrame which falls back to the setTimeout if
	 * first one is not supported.
	 *
	 * @returns {number} Requests' identifier.
	 */
	var requestAnimationFrame$1 = (function () {
		if (typeof requestAnimationFrame === 'function') {
			// It's required to use a bounded function because IE sometimes throws
			// an "Invalid calling object" error if rAF is invoked without the global
			// object on the left hand side.
			return requestAnimationFrame.bind(global$1);
		}

		return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
	})();

	// Defines minimum timeout before adding a trailing call.
	var trailingTimeout = 2;

	/**
	 * Creates a wrapper function which ensures that provided callback will be
	 * invoked only once during the specified delay period.
	 *
	 * @param {Function} callback - Function to be invoked after the delay period.
	 * @param {number} delay - Delay after which to invoke callback.
	 * @returns {Function}
	 */
	var throttle$1 = function (callback, delay) {
		var leadingCall = false,
			trailingCall = false,
			lastCallTime = 0;

		/**
		 * Invokes the original callback function and schedules new invocation if
		 * the "proxy" was called during current request.
		 *
		 * @returns {void}
		 */
		function resolvePending() {
			if (leadingCall) {
				leadingCall = false;

				callback();
			}

			if (trailingCall) {
				proxy();
			}
		}

		/**
		 * Callback invoked after the specified delay. It will further postpone
		 * invocation of the original function delegating it to the
		 * requestAnimationFrame.
		 *
		 * @returns {void}
		 */
		function timeoutCallback() {
			requestAnimationFrame$1(resolvePending);
		}

		/**
		 * Schedules invocation of the original function.
		 *
		 * @returns {void}
		 */
		function proxy() {
			var timeStamp = Date.now();

			if (leadingCall) {
				// Reject immediately following calls.
				if (timeStamp - lastCallTime < trailingTimeout) {
					return;
				}

				// Schedule new call to be in invoked when the pending one is resolved.
				// This is important for "transitions" which never actually start
				// immediately so there is a chance that we might miss one if change
				// happens amids the pending invocation.
				trailingCall = true;
			} else {
				leadingCall = true;
				trailingCall = false;

				setTimeout(timeoutCallback, delay);
			}

			lastCallTime = timeStamp;
		}

		return proxy;
	};

	// Minimum delay before invoking the update of observers.
	var REFRESH_DELAY = 20;

	// A list of substrings of CSS properties used to find transition events that
	// might affect dimensions of observed elements.
	var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

	// Check if MutationObserver is available.
	var mutationObserverSupported = typeof MutationObserver !== 'undefined';

	/**
	 * Singleton controller class which handles updates of ResizeObserver instances.
	 */
	var ResizeObserverController = function() {
		this.connected_ = false;
		this.mutationEventsAdded_ = false;
		this.mutationsObserver_ = null;
		this.observers_ = [];

		this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
		this.refresh = throttle$1(this.refresh.bind(this), REFRESH_DELAY);
	};

	/**
	 * Adds observer to observers list.
	 *
	 * @param {ResizeObserverSPI} observer - Observer to be added.
	 * @returns {void}
	 */


	/**
	 * Holds reference to the controller's instance.
	 *
	 * @private {ResizeObserverController}
	 */


	/**
	 * Keeps reference to the instance of MutationObserver.
	 *
	 * @private {MutationObserver}
	 */

	/**
	 * Indicates whether DOM listeners have been added.
	 *
	 * @private {boolean}
	 */
	ResizeObserverController.prototype.addObserver = function (observer) {
		if (!~this.observers_.indexOf(observer)) {
			this.observers_.push(observer);
		}

		// Add listeners if they haven't been added yet.
		if (!this.connected_) {
			this.connect_();
		}
	};

	/**
	 * Removes observer from observers list.
	 *
	 * @param {ResizeObserverSPI} observer - Observer to be removed.
	 * @returns {void}
	 */
	ResizeObserverController.prototype.removeObserver = function (observer) {
		var observers = this.observers_;
		var index = observers.indexOf(observer);

		// Remove observer if it's present in registry.
		if (~index) {
			observers.splice(index, 1);
		}

		// Remove listeners if controller has no connected observers.
		if (!observers.length && this.connected_) {
			this.disconnect_();
		}
	};

	/**
	 * Invokes the update of observers. It will continue running updates insofar
	 * it detects changes.
	 *
	 * @returns {void}
	 */
	ResizeObserverController.prototype.refresh = function () {
		var changesDetected = this.updateObservers_();

		// Continue running updates if changes have been detected as there might
		// be future ones caused by CSS transitions.
		if (changesDetected) {
			this.refresh();
		}
	};

	/**
	 * Updates every observer from observers list and notifies them of queued
	 * entries.
	 *
	 * @private
	 * @returns {boolean} Returns "true" if any observer has detected changes in
	 *  dimensions of it's elements.
	 */
	ResizeObserverController.prototype.updateObservers_ = function () {
		// Collect observers that have active observations.
		var activeObservers = this.observers_.filter(function (observer) {
			return observer.gatherActive(), observer.hasActive();
		});

		// Deliver notifications in a separate cycle in order to avoid any
		// collisions between observers, e.g. when multiple instances of
		// ResizeObserver are tracking the same element and the callback of one
		// of them changes content dimensions of the observed target. Sometimes
		// this may result in notifications being blocked for the rest of observers.
		activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

		return activeObservers.length > 0;
	};

	/**
	 * Initializes DOM listeners.
	 *
	 * @private
	 * @returns {void}
	 */
	ResizeObserverController.prototype.connect_ = function () {
		// Do nothing if running in a non-browser environment or if listeners
		// have been already added.
		if (!isBrowser || this.connected_) {
			return;
		}

		// Subscription to the "Transitionend" event is used as a workaround for
		// delayed transitions. This way it's possible to capture at least the
		// final state of an element.
		document.addEventListener('transitionend', this.onTransitionEnd_);

		window.addEventListener('resize', this.refresh);

		if (mutationObserverSupported) {
			this.mutationsObserver_ = new MutationObserver(this.refresh);

			this.mutationsObserver_.observe(document, {
				attributes: true,
				childList: true,
				characterData: true,
				subtree: true
			});
		} else {
			document.addEventListener('DOMSubtreeModified', this.refresh);

			this.mutationEventsAdded_ = true;
		}

		this.connected_ = true;
	};

	/**
	 * Removes DOM listeners.
	 *
	 * @private
	 * @returns {void}
	 */
	ResizeObserverController.prototype.disconnect_ = function () {
		// Do nothing if running in a non-browser environment or if listeners
		// have been already removed.
		if (!isBrowser || !this.connected_) {
			return;
		}

		document.removeEventListener('transitionend', this.onTransitionEnd_);
		window.removeEventListener('resize', this.refresh);

		if (this.mutationsObserver_) {
			this.mutationsObserver_.disconnect();
		}

		if (this.mutationEventsAdded_) {
			document.removeEventListener('DOMSubtreeModified', this.refresh);
		}

		this.mutationsObserver_ = null;
		this.mutationEventsAdded_ = false;
		this.connected_ = false;
	};

	/**
	 * "Transitionend" event handler.
	 *
	 * @private
	 * @param {TransitionEvent} event
	 * @returns {void}
	 */
	ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
		var propertyName = ref.propertyName; if ( propertyName === void 0 ) propertyName = '';

		// Detect whether transition may affect dimensions of an element.
		var isReflowProperty = transitionKeys.some(function (key) {
			return !!~propertyName.indexOf(key);
		});

		if (isReflowProperty) {
			this.refresh();
		}
	};

	/**
	 * Returns instance of the ResizeObserverController.
	 *
	 * @returns {ResizeObserverController}
	 */
	ResizeObserverController.getInstance = function () {
		if (!this.instance_) {
			this.instance_ = new ResizeObserverController();
		}

		return this.instance_;
	};

	ResizeObserverController.instance_ = null;

	/**
	 * Defines non-writable/enumerable properties of the provided target object.
	 *
	 * @param {Object} target - Object for which to define properties.
	 * @param {Object} props - Properties to be defined.
	 * @returns {Object} Target object.
	 */
	var defineConfigurable = (function (target, props) {
		for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
			var key = list[i];

			Object.defineProperty(target, key, {
				value: props[key],
				enumerable: false,
				writable: false,
				configurable: true
			});
		}

		return target;
	});

	/**
	 * Returns the global object associated with provided element.
	 *
	 * @param {Object} target
	 * @returns {Object}
	 */
	var getWindowOf = (function (target) {
		// Assume that the element is an instance of Node, which means that it
		// has the "ownerDocument" property from which we can retrieve a
		// corresponding global object.
		var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

		// Return the local global object if it's not possible extract one from
		// provided element.
		return ownerGlobal || global$1;
	});

	// Placeholder of an empty content rectangle.
	var emptyRect = createRectInit(0, 0, 0, 0);

	/**
	 * Converts provided string to a number.
	 *
	 * @param {number|string} value
	 * @returns {number}
	 */
	function toFloat(value) {
		return parseFloat(value) || 0;
	}

	/**
	 * Extracts borders size from provided styles.
	 *
	 * @param {CSSStyleDeclaration} styles
	 * @param {...string} positions - Borders positions (top, right, ...)
	 * @returns {number}
	 */
	function getBordersSize(styles) {
		var positions = [], len = arguments.length - 1;
		while ( len-- > 0 ) positions[ len ] = arguments[ len + 1 ];

		return positions.reduce(function (size, position) {
			var value = styles['border-' + position + '-width'];

			return size + toFloat(value);
		}, 0);
	}

	/**
	 * Extracts paddings sizes from provided styles.
	 *
	 * @param {CSSStyleDeclaration} styles
	 * @returns {Object} Paddings box.
	 */
	function getPaddings(styles) {
		var positions = ['top', 'right', 'bottom', 'left'];
		var paddings = {};

		for (var i = 0, list = positions; i < list.length; i += 1) {
			var position = list[i];

			var value = styles['padding-' + position];

			paddings[position] = toFloat(value);
		}

		return paddings;
	}

	/**
	 * Calculates content rectangle of provided SVG element.
	 *
	 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
	 *      to be calculated.
	 * @returns {DOMRectInit}
	 */
	function getSVGContentRect(target) {
		var bbox = target.getBBox();

		return createRectInit(0, 0, bbox.width, bbox.height);
	}

	/**
	 * Calculates content rectangle of provided HTMLElement.
	 *
	 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
	 * @returns {DOMRectInit}
	 */
	function getHTMLElementContentRect(target) {
		// Client width & height properties can't be
		// used exclusively as they provide rounded values.
		var clientWidth = target.clientWidth;
		var clientHeight = target.clientHeight;

		// By this condition we can catch all non-replaced inline, hidden and
		// detached elements. Though elements with width & height properties less
		// than 0.5 will be discarded as well.
		//
		// Without it we would need to implement separate methods for each of
		// those cases and it's not possible to perform a precise and performance
		// effective test for hidden elements. E.g. even jQuery's ':visible' filter
		// gives wrong results for elements with width & height less than 0.5.
		if (!clientWidth && !clientHeight) {
			return emptyRect;
		}

		var styles = getWindowOf(target).getComputedStyle(target);
		var paddings = getPaddings(styles);
		var horizPad = paddings.left + paddings.right;
		var vertPad = paddings.top + paddings.bottom;

		// Computed styles of width & height are being used because they are the
		// only dimensions available to JS that contain non-rounded values. It could
		// be possible to utilize the getBoundingClientRect if only it's data wasn't
		// affected by CSS transformations let alone paddings, borders and scroll bars.
		var width = toFloat(styles.width),
			height = toFloat(styles.height);

		// Width & height include paddings and borders when the 'border-box' box
		// model is applied (except for IE).
		if (styles.boxSizing === 'border-box') {
			// Following conditions are required to handle Internet Explorer which
			// doesn't include paddings and borders to computed CSS dimensions.
			//
			// We can say that if CSS dimensions + paddings are equal to the "client"
			// properties then it's either IE, and thus we don't need to subtract
			// anything, or an element merely doesn't have paddings/borders styles.
			if (Math.round(width + horizPad) !== clientWidth) {
				width -= getBordersSize(styles, 'left', 'right') + horizPad;
			}

			if (Math.round(height + vertPad) !== clientHeight) {
				height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
			}
		}

		// Following steps can't be applied to the document's root element as its
		// client[Width/Height] properties represent viewport area of the window.
		// Besides, it's as well not necessary as the <html> itself neither has
		// rendered scroll bars nor it can be clipped.
		if (!isDocumentElement(target)) {
			// In some browsers (only in Firefox, actually) CSS width & height
			// include scroll bars size which can be removed at this step as scroll
			// bars are the only difference between rounded dimensions + paddings
			// and "client" properties, though that is not always true in Chrome.
			var vertScrollbar = Math.round(width + horizPad) - clientWidth;
			var horizScrollbar = Math.round(height + vertPad) - clientHeight;

			// Chrome has a rather weird rounding of "client" properties.
			// E.g. for an element with content width of 314.2px it sometimes gives
			// the client width of 315px and for the width of 314.7px it may give
			// 314px. And it doesn't happen all the time. So just ignore this delta
			// as a non-relevant.
			if (Math.abs(vertScrollbar) !== 1) {
				width -= vertScrollbar;
			}

			if (Math.abs(horizScrollbar) !== 1) {
				height -= horizScrollbar;
			}
		}

		return createRectInit(paddings.left, paddings.top, width, height);
	}

	/**
	 * Checks whether provided element is an instance of the SVGGraphicsElement.
	 *
	 * @param {Element} target - Element to be checked.
	 * @returns {boolean}
	 */
	var isSVGGraphicsElement = (function () {
		// Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
		// interface.
		if (typeof SVGGraphicsElement !== 'undefined') {
			return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
		}

		// If it's so, then check that element is at least an instance of the
		// SVGElement and that it has the "getBBox" method.
		// eslint-disable-next-line no-extra-parens
		return function (target) { return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function'; };
	})();

	/**
	 * Checks whether provided element is a document element (<html>).
	 *
	 * @param {Element} target - Element to be checked.
	 * @returns {boolean}
	 */
	function isDocumentElement(target) {
		return target === getWindowOf(target).document.documentElement;
	}

	/**
	 * Calculates an appropriate content rectangle for provided html or svg element.
	 *
	 * @param {Element} target - Element content rectangle of which needs to be calculated.
	 * @returns {DOMRectInit}
	 */
	function getContentRect(target) {
		if (!isBrowser) {
			return emptyRect;
		}

		if (isSVGGraphicsElement(target)) {
			return getSVGContentRect(target);
		}

		return getHTMLElementContentRect(target);
	}

	/**
	 * Creates rectangle with an interface of the DOMRectReadOnly.
	 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
	 *
	 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
	 * @returns {DOMRectReadOnly}
	 */
	function createReadOnlyRect(ref) {
		var x = ref.x;
		var y = ref.y;
		var width = ref.width;
		var height = ref.height;

		// If DOMRectReadOnly is available use it as a prototype for the rectangle.
		var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
		var rect = Object.create(Constr.prototype);

		// Rectangle's properties are not writable and non-enumerable.
		defineConfigurable(rect, {
			x: x, y: y, width: width, height: height,
			top: y,
			right: x + width,
			bottom: height + y,
			left: x
		});

		return rect;
	}

	/**
	 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
	 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
	 *
	 * @param {number} x - X coordinate.
	 * @param {number} y - Y coordinate.
	 * @param {number} width - Rectangle's width.
	 * @param {number} height - Rectangle's height.
	 * @returns {DOMRectInit}
	 */
	function createRectInit(x, y, width, height) {
		return { x: x, y: y, width: width, height: height };
	}

	/**
	 * Class that is responsible for computations of the content rectangle of
	 * provided DOM element and for keeping track of it's changes.
	 */
	var ResizeObservation = function(target) {
		this.broadcastWidth = 0;
		this.broadcastHeight = 0;
		this.contentRect_ = createRectInit(0, 0, 0, 0);

		this.target = target;
	};

	/**
	 * Updates content rectangle and tells whether it's width or height properties
	 * have changed since the last broadcast.
	 *
	 * @returns {boolean}
	 */


	/**
	 * Reference to the last observed content rectangle.
	 *
	 * @private {DOMRectInit}
	 */


	/**
	 * Broadcasted width of content rectangle.
	 *
	 * @type {number}
	 */
	ResizeObservation.prototype.isActive = function () {
		var rect = getContentRect(this.target);

		this.contentRect_ = rect;

		return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
	};

	/**
	 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
	 * from the corresponding properties of the last observed content rectangle.
	 *
	 * @returns {DOMRectInit} Last observed content rectangle.
	 */
	ResizeObservation.prototype.broadcastRect = function () {
		var rect = this.contentRect_;

		this.broadcastWidth = rect.width;
		this.broadcastHeight = rect.height;

		return rect;
	};

	var ResizeObserverEntry = function(target, rectInit) {
		var contentRect = createReadOnlyRect(rectInit);

		// According to the specification following properties are not writable
		// and are also not enumerable in the native implementation.
		//
		// Property accessors are not being used as they'd require to define a
		// private WeakMap storage which may cause memory leaks in browsers that
		// don't support this type of collections.
		defineConfigurable(this, { target: target, contentRect: contentRect });
	};

	var ResizeObserverSPI = function(callback, controller, callbackCtx) {
		this.activeObservations_ = [];
		this.observations_ = new MapShim();

		if (typeof callback !== 'function') {
			throw new TypeError('The callback provided as parameter 1 is not a function.');
		}

		this.callback_ = callback;
		this.controller_ = controller;
		this.callbackCtx_ = callbackCtx;
	};

	/**
	 * Starts observing provided element.
	 *
	 * @param {Element} target - Element to be observed.
	 * @returns {void}
	 */


	/**
	 * Registry of the ResizeObservation instances.
	 *
	 * @private {Map<Element, ResizeObservation>}
	 */


	/**
	 * Public ResizeObserver instance which will be passed to the callback
	 * function and used as a value of it's "this" binding.
	 *
	 * @private {ResizeObserver}
	 */

	/**
	 * Collection of resize observations that have detected changes in dimensions
	 * of elements.
	 *
	 * @private {Array<ResizeObservation>}
	 */
	ResizeObserverSPI.prototype.observe = function (target) {
		if (!arguments.length) {
			throw new TypeError('1 argument required, but only 0 present.');
		}

		// Do nothing if current environment doesn't have the Element interface.
		if (typeof Element === 'undefined' || !(Element instanceof Object)) {
			return;
		}

		if (!(target instanceof getWindowOf(target).Element)) {
			throw new TypeError('parameter 1 is not of type "Element".');
		}

		var observations = this.observations_;

		// Do nothing if element is already being observed.
		if (observations.has(target)) {
			return;
		}

		observations.set(target, new ResizeObservation(target));

		this.controller_.addObserver(this);

		// Force the update of observations.
		this.controller_.refresh();
	};

	/**
	 * Stops observing provided element.
	 *
	 * @param {Element} target - Element to stop observing.
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.unobserve = function (target) {
		if (!arguments.length) {
			throw new TypeError('1 argument required, but only 0 present.');
		}

		// Do nothing if current environment doesn't have the Element interface.
		if (typeof Element === 'undefined' || !(Element instanceof Object)) {
			return;
		}

		if (!(target instanceof getWindowOf(target).Element)) {
			throw new TypeError('parameter 1 is not of type "Element".');
		}

		var observations = this.observations_;

		// Do nothing if element is not being observed.
		if (!observations.has(target)) {
			return;
		}

		observations.delete(target);

		if (!observations.size) {
			this.controller_.removeObserver(this);
		}
	};

	/**
	 * Stops observing all elements.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.disconnect = function () {
		this.clearActive();
		this.observations_.clear();
		this.controller_.removeObserver(this);
	};

	/**
	 * Collects observation instances the associated element of which has changed
	 * it's content rectangle.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.gatherActive = function () {
		var this$1 = this;

		this.clearActive();

		this.observations_.forEach(function (observation) {
			if (observation.isActive()) {
				this$1.activeObservations_.push(observation);
			}
		});
	};

	/**
	 * Invokes initial callback function with a list of ResizeObserverEntry
	 * instances collected from active resize observations.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.broadcastActive = function () {
		// Do nothing if observer doesn't have active observations.
		if (!this.hasActive()) {
			return;
		}

		var ctx = this.callbackCtx_;

		// Create ResizeObserverEntry instance for every active observation.
		var entries = this.activeObservations_.map(function (observation) {
			return new ResizeObserverEntry(observation.target, observation.broadcastRect());
		});

		this.callback_.call(ctx, entries, ctx);
		this.clearActive();
	};

	/**
	 * Clears the collection of active observations.
	 *
	 * @returns {void}
	 */
	ResizeObserverSPI.prototype.clearActive = function () {
		this.activeObservations_.splice(0);
	};

	/**
	 * Tells whether observer has active observations.
	 *
	 * @returns {boolean}
	 */
	ResizeObserverSPI.prototype.hasActive = function () {
		return this.activeObservations_.length > 0;
	};

	// Registry of internal observers. If WeakMap is not available use current shim
	// for the Map collection as it has all required methods and because WeakMap
	// can't be fully polyfilled anyway.
	var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

	/**
	 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
	 * exposing only those methods and properties that are defined in the spec.
	 */
	var ResizeObserver = function(callback) {
		if (!(this instanceof ResizeObserver)) {
			throw new TypeError('Cannot call a class as a function.');
		}
		if (!arguments.length) {
			throw new TypeError('1 argument required, but only 0 present.');
		}

		var controller = ResizeObserverController.getInstance();
		var observer = new ResizeObserverSPI(callback, controller, this);

		observers.set(this, observer);
	};

	// Expose public methods of ResizeObserver.
	['observe', 'unobserve', 'disconnect'].forEach(function (method) {
		ResizeObserver.prototype[method] = function () {
			return (ref = observers.get(this))[method].apply(ref, arguments);
			var ref;
		};
	});

	var index = (function () {
		// Export existing implementation if available.
		if (typeof global$1.ResizeObserver !== 'undefined') {
			return global$1.ResizeObserver;
		}

		return ResizeObserver;
	})();

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var canUseDom = canUseDOM;

	var SimpleBar =
		/*#__PURE__*/
		function () {
			function SimpleBar(element, options) {
				var _this = this;

				_classCallCheck(this, SimpleBar);

				this.onScroll = function () {
					if (!_this.scrollXTicking) {
						window.requestAnimationFrame(_this.scrollX);
						_this.scrollXTicking = true;
					}

					if (!_this.scrollYTicking) {
						window.requestAnimationFrame(_this.scrollY);
						_this.scrollYTicking = true;
					}
				};

				this.scrollX = function () {
					_this.showScrollbar('x');

					_this.positionScrollbar('x');

					_this.scrollXTicking = false;
				};

				this.scrollY = function () {
					_this.showScrollbar('y');

					_this.positionScrollbar('y');

					_this.scrollYTicking = false;
				};

				this.onMouseEnter = function () {
					_this.showScrollbar('x');

					_this.showScrollbar('y');
				};

				this.onMouseMove = function (e) {
					_this.mouseX = e.clientX;
					_this.mouseY = e.clientY;

					if (_this.isWithinBounds(_this.axis.y.track.rect)) {
						_this.showScrollbar('y');
					}

					if (_this.isWithinBounds(_this.axis.x.track.rect)) {
						_this.showScrollbar('x');
					}
				};

				this.onMouseLeave = function () {
					_this.onMouseMove.cancel();

					_this.mouseX = -1;
					_this.mouseY = -1;
				};

				this.onWindowResize = function () {
					// Recalculate scrollbarWidth in case it's a zoom
					_this.scrollbarWidth = scrollbarWidth();

					_this.hideNativeScrollbar();
				};

				this.hideScrollbars = function () {
					_this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
					_this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();

					if (!_this.isWithinBounds(_this.axis.y.track.rect)) {
						_this.axis.y.scrollbar.el.classList.remove('visible');

						_this.axis.y.isVisible = false;
					}

					if (!_this.isWithinBounds(_this.axis.x.track.rect)) {
						_this.axis.x.scrollbar.el.classList.remove('visible');

						_this.axis.x.isVisible = false;
					}
				};

				this.onPointerEvent = function (e) {
					_this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
					_this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();

					var isWithinBoundsY = _this.isWithinBounds(_this.axis.y.track.rect);

					var isWithinBoundsX = isWithinBoundsY ? false : _this.isWithinBounds(_this.axis.x.track.rect); // If any pointer event is called on the scrollbar

					if (isWithinBoundsY || isWithinBoundsX) {
						// Preventing the event's default action stops text being
						// selectable during the drag.
						e.preventDefault(); // Prevent event leaking

						e.stopPropagation();

						if (e.type === 'mousedown') {
							if (isWithinBoundsY) {
								_this.onDragStart(e, 'y');
							}

							if (isWithinBoundsX) {
								_this.onDragStart(e, 'x');
							}
						}
					}
				};

				this.drag = function (e) {
					var eventOffset;
					var track = _this.axis[_this.draggedAxis].track;
					var trackSize = track.rect[_this.axis[_this.draggedAxis].sizeAttr];
					var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
					e.preventDefault();
					e.stopPropagation();

					if (_this.draggedAxis === 'y') {
						eventOffset = e.pageY;
					} else {
						eventOffset = e.pageX;
					} // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).


					var dragPos = eventOffset - track.rect[_this.axis[_this.draggedAxis].offsetAttr] - _this.axis[_this.draggedAxis].dragOffset; // Convert the mouse position into a percentage of the scrollbar height/width.

					var dragPerc = dragPos / track.rect[_this.axis[_this.draggedAxis].sizeAttr]; // Scroll the content by the same percentage.

					var scrollPos = dragPerc * _this.contentEl[_this.axis[_this.draggedAxis].scrollSizeAttr]; // Fix browsers inconsistency on RTL

					if (_this.draggedAxis === 'x') {
						scrollPos = _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted ? scrollPos - (trackSize + scrollbar.size) : scrollPos;
						scrollPos = _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted ? -scrollPos : scrollPos;
					}

					_this.contentEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
				};

				this.onEndDrag = function (e) {
					e.preventDefault();
					e.stopPropagation();
					document.removeEventListener('mousemove', _this.drag);
					document.removeEventListener('mouseup', _this.onEndDrag);
				};

				this.el = element;
				this.flashTimeout;
				this.contentEl;
				this.offsetEl;
				this.maskEl;
				this.globalObserver;
				this.mutationObserver;
				this.resizeObserver;
				this.scrollbarWidth;
				this.minScrollbarWidth = 20;
				this.options = Object.assign({}, SimpleBar.defaultOptions, options);
				this.isRtl;
				this.classNames = this.options.classNames;
				this.axis = {
					x: {
						scrollOffsetAttr: 'scrollLeft',
						sizeAttr: 'width',
						scrollSizeAttr: 'scrollWidth',
						offsetAttr: 'left',
						overflowAttr: 'overflowX',
						dragOffset: 0,
						isEnabled: true,
						isVisible: false,
						track: {},
						scrollbar: {}
					},
					y: {
						scrollOffsetAttr: 'scrollTop',
						sizeAttr: 'height',
						scrollSizeAttr: 'scrollHeight',
						offsetAttr: 'top',
						overflowAttr: 'overflowY',
						dragOffset: 0,
						isEnabled: true,
						isVisible: false,
						track: {},
						scrollbar: {}
					}
				};
				this.recalculate = lodash_throttle(this.recalculate.bind(this), 64);
				this.onMouseMove = lodash_throttle(this.onMouseMove.bind(this), 64);
				this.hideScrollbars = lodash_debounce(this.hideScrollbars.bind(this), this.options.timeout);
				this.onWindowResize = lodash_debounce(this.onWindowResize.bind(this), 64, {
					leading: true
				});
				SimpleBar.getRtlHelpers = lodash_memoize(SimpleBar.getRtlHelpers); // getContentElement is deprecated

				this.getContentElement = this.getScrollElement;
				this.init();
			}
			/**
			 * Static properties
			 */

			/**
			 * Helper to fix browsers inconsistency on RTL:
			 *  - Firefox inverts the scrollbar initial position
			 *  - IE11 inverts both scrollbar position and scrolling offset
			 */


			_createClass(SimpleBar, [{
				key: "init",
				value: function init() {
					// Save a reference to the instance, so we know this DOM node has already been instancied
					this.el.SimpleBar = this;
					this.initDOM(); // We stop here on server-side

					if (canUseDom) {
						// Recalculate scrollbarWidth in case it's a zoom
						this.scrollbarWidth = scrollbarWidth();
						this.recalculate();
						this.initListeners();
					}
				}
			}, {
				key: "initDOM",
				value: function initDOM() {
					var _this2 = this;

					// make sure this element doesn't have the elements yet
					if (Array.from(this.el.children).filter(function (child) {
						return child.classList.contains(_this2.classNames.wrapper);
					}).length) {
						// assume that element has his DOM already initiated
						this.wrapperEl = this.el.querySelector(".".concat(this.classNames.wrapper));
						this.contentEl = this.el.querySelector(".".concat(this.classNames.content));
						this.offsetEl = this.el.querySelector(".".concat(this.classNames.offset));
						this.maskEl = this.el.querySelector(".".concat(this.classNames.mask));
						this.placeholderEl = this.el.querySelector(".".concat(this.classNames.placeholder));
						this.heightAutoObserverWrapperEl = this.el.querySelector(".".concat(this.classNames.heightAutoObserverWrapperEl));
						this.heightAutoObserverEl = this.el.querySelector(".".concat(this.classNames.heightAutoObserverEl));
						this.axis.x.track.el = this.el.querySelector(".".concat(this.classNames.track, ".").concat(this.classNames.horizontal));
						this.axis.y.track.el = this.el.querySelector(".".concat(this.classNames.track, ".").concat(this.classNames.vertical));
					} else {
						// Prepare DOM
						this.wrapperEl = document.createElement('div');
						this.contentEl = document.createElement('div');
						this.offsetEl = document.createElement('div');
						this.maskEl = document.createElement('div');
						this.placeholderEl = document.createElement('div');
						this.heightAutoObserverWrapperEl = document.createElement('div');
						this.heightAutoObserverEl = document.createElement('div');
						this.wrapperEl.classList.add(this.classNames.wrapper);
						this.contentEl.classList.add(this.classNames.content);
						this.offsetEl.classList.add(this.classNames.offset);
						this.maskEl.classList.add(this.classNames.mask);
						this.placeholderEl.classList.add(this.classNames.placeholder);
						this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl);
						this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);

						while (this.el.firstChild) {
							this.contentEl.appendChild(this.el.firstChild);
						}

						this.offsetEl.appendChild(this.contentEl);
						this.maskEl.appendChild(this.offsetEl);
						this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
						this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
						this.wrapperEl.appendChild(this.maskEl);
						this.wrapperEl.appendChild(this.placeholderEl);
						this.el.appendChild(this.wrapperEl);
					}

					if (!this.axis.x.track.el || !this.axis.y.track.el) {
						var track = document.createElement('div');
						var scrollbar = document.createElement('div');
						track.classList.add(this.classNames.track);
						scrollbar.classList.add(this.classNames.scrollbar);

						if (!this.options.autoHide) {
							scrollbar.classList.add(this.classNames.visible);
						}

						track.appendChild(scrollbar);
						this.axis.x.track.el = track.cloneNode(true);
						this.axis.x.track.el.classList.add(this.classNames.horizontal);
						this.axis.y.track.el = track.cloneNode(true);
						this.axis.y.track.el.classList.add(this.classNames.vertical);
						this.el.appendChild(this.axis.x.track.el);
						this.el.appendChild(this.axis.y.track.el);
					}

					this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(".".concat(this.classNames.scrollbar));
					this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(".".concat(this.classNames.scrollbar));
					this.el.setAttribute('data-simplebar', 'init');
				}
			}, {
				key: "initListeners",
				value: function initListeners() {
					var _this3 = this;

					// Event listeners
					if (this.options.autoHide) {
						this.el.addEventListener('mouseenter', this.onMouseEnter);
					}

					['mousedown', 'click', 'dblclick', 'touchstart', 'touchend', 'touchmove'].forEach(function (e) {
						_this3.el.addEventListener(e, _this3.onPointerEvent);
					});
					this.el.addEventListener('mousemove', this.onMouseMove);
					this.el.addEventListener('mouseleave', this.onMouseLeave);
					this.contentEl.addEventListener('scroll', this.onScroll); // Browser zoom triggers a window resize

					window.addEventListener('resize', this.onWindowResize); // MutationObserver is IE11+

					if (typeof MutationObserver !== 'undefined') {
						// create an observer instance
						this.mutationObserver = new MutationObserver(function (mutations) {
							mutations.forEach(function (mutation) {
								if (mutation.target === _this3.el || !_this3.isChildNode(mutation.target) || mutation.addedNodes.length) {
									_this3.recalculate();
								}
							});
						}); // pass in the target node, as well as the observer options

						this.mutationObserver.observe(this.el, {
							attributes: true,
							childList: true,
							characterData: true,
							subtree: true
						});
					}

					this.resizeObserver = new index(this.recalculate);
					this.resizeObserver.observe(this.el);
				}
			}, {
				key: "recalculate",
				value: function recalculate() {
					var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
					this.elStyles = window.getComputedStyle(this.el);
					this.isRtl = this.elStyles.direction === 'rtl';
					this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft);
					this.contentEl.style.height = isHeightAuto ? 'auto' : '100%';
					this.placeholderEl.style.width = "".concat(this.contentEl.scrollWidth, "px");
					this.placeholderEl.style.height = "".concat(this.contentEl.scrollHeight, "px");
					this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
					this.axis.x.track.rect = this.axis.x.track.el.getBoundingClientRect();
					this.axis.y.track.rect = this.axis.y.track.el.getBoundingClientRect(); // Set isEnabled to false if scrollbar is not necessary (content is shorter than offset)

					this.axis.x.isEnabled = (this.scrollbarWidth ? this.contentEl.scrollWidth : this.contentEl.scrollWidth - this.minScrollbarWidth) > Math.ceil(this.axis.x.track.rect.width);
					this.axis.y.isEnabled = (this.scrollbarWidth ? this.contentEl.scrollHeight : this.contentEl.scrollHeight - this.minScrollbarWidth) > Math.ceil(this.axis.y.track.rect.height); // TODO this requires host to set overflow explicitely cause [data-simplebar] applies overflow: hidden...
					// Set isEnabled to false if user explicitely set hidden overflow

					this.axis.x.isEnabled = this.elStyles.overflowX === 'hidden' ? false : this.axis.x.isEnabled;
					this.axis.y.isEnabled = this.elStyles.overflowY === 'hidden' ? false : this.axis.y.isEnabled;
					this.axis.x.scrollbar.size = this.getScrollbarSize('x');
					this.axis.y.scrollbar.size = this.getScrollbarSize('y');
					this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px");
					this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px");
					this.positionScrollbar('x');
					this.positionScrollbar('y');
					this.toggleTrackVisibility('x');
					this.toggleTrackVisibility('y');
					this.hideNativeScrollbar();
				}
				/**
				 * Calculate scrollbar size
				 */

			}, {
				key: "getScrollbarSize",
				value: function getScrollbarSize() {
					var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'y';
					var contentSize = this.scrollbarWidth ? this.contentEl[this.axis[axis].scrollSizeAttr] : this.contentEl[this.axis[axis].scrollSizeAttr] - this.minScrollbarWidth;
					var trackSize = this.axis[axis].track.rect[this.axis[axis].sizeAttr];
					var scrollbarSize;

					if (!this.axis[axis].isEnabled && !this.options.forceVisible) {
						return;
					}

					var scrollbarRatio = trackSize / contentSize; // Calculate new height/position of drag handle.

					scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);

					if (this.options.scrollbarMaxSize) {
						scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
					}

					return scrollbarSize;
				}
			}, {
				key: "positionScrollbar",
				value: function positionScrollbar() {
					var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'y';
					var contentSize = this.scrollbarWidth ? this.contentEl[this.axis[axis].scrollSizeAttr] : this.contentEl[this.axis[axis].scrollSizeAttr] - this.minScrollbarWidth;
					var trackSize = this.axis[axis].track.rect[this.axis[axis].sizeAttr];
					var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
					var scrollbar = this.axis[axis].scrollbar;
					var scrollOffset = this.contentEl[this.axis[axis].scrollOffsetAttr];
					scrollOffset = axis === 'x' && this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted ? -scrollOffset : scrollOffset;
					var scrollPourcent = scrollOffset / (contentSize - hostSize);
					var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
					handleOffset = axis === "x" && this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted ? handleOffset + (trackSize - scrollbar.size) : handleOffset;

					if (this.axis[axis].isEnabled || this.options.forceVisible) {
						scrollbar.el.style.transform = axis === 'x' ? "translate3d(".concat(handleOffset, "px, 0, 0)") : "translate3d(0, ".concat(handleOffset, "px, 0)");
					}
				}
			}, {
				key: "toggleTrackVisibility",
				value: function toggleTrackVisibility() {
					var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'y';
					var track = this.axis[axis].track.el;
					var scrollbar = this.axis[axis].scrollbar.el;

					if (this.axis[axis].isEnabled || this.options.forceVisible) {
						track.style.visibility = 'visible';
						this.contentEl.style[this.axis[axis].overflowAttr] = 'scroll';
					} else {
						track.style.visibility = 'hidden';
						this.contentEl.style[this.axis[axis].overflowAttr] = 'hidden';
					} // Even if forceVisible is enabled, scrollbar itself should be hidden


					if (this.options.forceVisible) {
						if (this.axis[axis].isEnabled) {
							scrollbar.style.visibility = 'visible';
						} else {
							scrollbar.style.visibility = 'hidden';
						}
					}
				}
			}, {
				key: "hideNativeScrollbar",
				value: function hideNativeScrollbar() {
					this.offsetEl.style[this.isRtl ? 'left' : 'right'] = this.axis.y.isEnabled || this.options.forceVisible ? "-".concat(this.scrollbarWidth || this.minScrollbarWidth, "px") : 0;
					this.offsetEl.style.bottom = this.axis.x.isEnabled || this.options.forceVisible ? "-".concat(this.scrollbarWidth || this.minScrollbarWidth, "px") : 0; // If floating scrollbar

					if (!this.scrollbarWidth) {
						var paddingDirection = [this.isRtl ? 'paddingLeft' : 'paddingRight'];
						this.contentEl.style[paddingDirection] = "calc(".concat(this.elStyles[paddingDirection], " + ").concat(this.minScrollbarWidth, "px)");
						this.contentEl.style.paddingBottom = "calc(".concat(this.elStyles.paddingBottom, " + ").concat(this.minScrollbarWidth, "px)");
					}
				}
				/**
				 * On scroll event handling
				 */

			}, {
				key: "showScrollbar",

				/**
				 * Show scrollbar
				 */
				value: function showScrollbar() {
					var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'y';
					var scrollbar = this.axis[axis].scrollbar.el;
					this.hideScrollbars(); // Scrollbar already visible

					if (this.axis[axis].isVisible) {
						return;
					}

					if (this.axis[axis].isEnabled) {
						scrollbar.classList.add(this.classNames.visible);
						this.axis[axis].isVisible = true;
					}

					if (!this.options.autoHide) {
						return;
					}
				}
				/**
				 * Hide Scrollbar
				 */

			}, {
				key: "onDragStart",

				/**
				 * on scrollbar handle drag movement starts
				 */
				value: function onDragStart(e) {
					var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'y';
					var scrollbar = this.axis[axis].scrollbar.el; // Measure how far the user's mouse is from the top of the scrollbar drag handle.

					var eventOffset = axis === 'y' ? e.pageY : e.pageX;
					this.axis[axis].dragOffset = eventOffset - scrollbar.getBoundingClientRect()[this.axis[axis].offsetAttr];
					this.draggedAxis = axis;
					document.addEventListener('mousemove', this.drag);
					document.addEventListener('mouseup', this.onEndDrag);
				}
				/**
				 * Drag scrollbar handle
				 */

			}, {
				key: "getScrollElement",

				/**
				 * Getter for original scrolling element
				 */
				value: function getScrollElement() {
					return this.contentEl;
				}
			}, {
				key: "removeListeners",
				value: function removeListeners() {
					// Event listeners
					if (this.options.autoHide) {
						this.el.removeEventListener('mouseenter', this.onMouseEnter);
					}

					this.contentEl.removeEventListener('scroll', this.onScroll);
					window.removeEventListener('resize', this.onWindowResize);
					this.mutationObserver.disconnect();
					this.resizeObserver.disconnect();
				}
				/**
				 * UnMount mutation observer and delete SimpleBar instance from DOM element
				 */

			}, {
				key: "unMount",
				value: function unMount() {
					this.removeListeners();
					this.el.SimpleBar = null;
				}
				/**
				 * Recursively walks up the parent nodes looking for this.el
				 */

			}, {
				key: "isChildNode",
				value: function isChildNode(el) {
					if (el === null) return false;
					if (el === this.el) return true;
					return this.isChildNode(el.parentNode);
				}
				/**
				 * Check if mouse is within bounds
				 */

			}, {
				key: "isWithinBounds",
				value: function isWithinBounds(bbox) {
					return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
				}
			}], [{
				key: "getRtlHelpers",
				value: function getRtlHelpers() {
					var dummyDiv = document.createElement('div');
					dummyDiv.innerHTML = '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
					var scrollbarDummyEl = dummyDiv.firstElementChild;
					document.body.appendChild(scrollbarDummyEl);
					var dummyContainerChild = scrollbarDummyEl.firstElementChild;
					scrollbarDummyEl.scrollLeft = 0;
					var dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
					var dummyContainerChildOffset = SimpleBar.getOffset(dummyContainerChild);
					scrollbarDummyEl.scrollLeft = 999;
					var dummyContainerScrollOffsetAfterScroll = SimpleBar.getOffset(dummyContainerChild);
					return {
						// determines if the scrolling is responding with negative values
						isRtlScrollingInverted: dummyContainerOffset.left !== dummyContainerChildOffset.left && dummyContainerChildOffset.left - dummyContainerScrollOffsetAfterScroll.left !== 0,
						// determines if the origin scrollbar position is inverted or not (positioned on left or right)
						isRtlScrollbarInverted: dummyContainerOffset.left !== dummyContainerChildOffset.left
					};
				}
			}, {
				key: "initHtmlApi",
				value: function initHtmlApi() {
					this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this); // MutationObserver is IE11+

					if (typeof MutationObserver !== 'undefined') {
						// Mutation observer to observe dynamically added elements
						this.globalObserver = new MutationObserver(function (mutations) {
							mutations.forEach(function (mutation) {
								Array.from(mutation.addedNodes).forEach(function (addedNode) {
									if (addedNode.nodeType === 1) {
										if (addedNode.hasAttribute('data-simplebar')) {
											!addedNode.SimpleBar && new SimpleBar(addedNode, SimpleBar.getElOptions(addedNode));
										} else {
											Array.from(addedNode.querySelectorAll('[data-simplebar]')).forEach(function (el) {
												!el.SimpleBar && new SimpleBar(el, SimpleBar.getElOptions(el));
											});
										}
									}
								});
								Array.from(mutation.removedNodes).forEach(function (removedNode) {
									if (removedNode.nodeType === 1) {
										if (removedNode.hasAttribute('data-simplebar')) {
											removedNode.SimpleBar && removedNode.SimpleBar.unMount();
										} else {
											Array.from(removedNode.querySelectorAll('[data-simplebar]')).forEach(function (el) {
												el.SimpleBar && el.SimpleBar.unMount();
											});
										}
									}
								});
							});
						});
						this.globalObserver.observe(document, {
							childList: true,
							subtree: true
						});
					} // Taken from jQuery `ready` function
					// Instantiate elements already present on the page


					if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
						// Handle it asynchronously to allow scripts the opportunity to delay init
						window.setTimeout(this.initDOMLoadedElements);
					} else {
						document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
						window.addEventListener('load', this.initDOMLoadedElements);
					}
				} // Helper function to retrieve options from element attributes

			}, {
				key: "getElOptions",
				value: function getElOptions(el) {
					var options = Array.from(el.attributes).reduce(function (acc, attribute) {
						var option = attribute.name.match(/data-simplebar-(.+)/);

						if (option) {
							var key = option[1].replace(/\W+(.)/g, function (x, chr) {
								return chr.toUpperCase();
							});

							switch (attribute.value) {
								case 'true':
									acc[key] = true;
									break;

								case 'false':
									acc[key] = false;
									break;

								case undefined:
									acc[key] = true;
									break;

								default:
									acc[key] = attribute.value;
							}
						}

						return acc;
					}, {});
					return options;
				}
			}, {
				key: "removeObserver",
				value: function removeObserver() {
					this.globalObserver.disconnect();
				}
			}, {
				key: "initDOMLoadedElements",
				value: function initDOMLoadedElements() {
					document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
					window.removeEventListener('load', this.initDOMLoadedElements);
					Array.from(document.querySelectorAll('[data-simplebar]')).forEach(function (el) {
						if (!el.SimpleBar) new SimpleBar(el, SimpleBar.getElOptions(el));
					});
				}
			}, {
				key: "getOffset",
				value: function getOffset(el) {
					var rect = el.getBoundingClientRect();
					return {
						top: rect.top + (window.pageYOffset || document.documentElement.scrollTop),
						left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft)
					};
				}
			}]);

			return SimpleBar;
		}();
	/**
	 * HTML API
	 * Called only in a browser env.
	 */


	SimpleBar.defaultOptions = {
		autoHide: true,
		forceVisible: false,
		classNames: {
			content: 'simplebar-content',
			offset: 'simplebar-offset',
			mask: 'simplebar-mask',
			wrapper: 'simplebar-wrapper',
			placeholder: 'simplebar-placeholder',
			scrollbar: 'simplebar-scrollbar',
			track: 'simplebar-track',
			heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
			heightAutoObserverEl: 'simplebar-height-auto-observer',
			visible: 'visible',
			horizontal: 'horizontal',
			vertical: 'vertical'
		},
		scrollbarMinSize: 25,
		scrollbarMaxSize: 0,
		timeout: 1000
	};

	if (canUseDom) {
		SimpleBar.initHtmlApi();
	}

	return SimpleBar;

})));

/*!
  * Waves v0.6.4
  * http://fian.my.id/Waves
  *
  * Copyright 2014 Alfiana E. Sibuea and other contributors
  * Released under the MIT license
  * https://github.com/fians/Waves/blob/master/LICENSE
  */
!function(t){"use strict";var e=e||{},n=document.querySelectorAll.bind(document);function a(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e+=n+":"+t[n]+";");return e}var i={duration:750,show:function(t,e){if(2===t.button)return!1;var n=e||this,o=document.createElement("div");o.className="waves-ripple",n.appendChild(o);var r,s,u,d,c,l,m,f=(l={top:0,left:0},m=(r=n)&&r.ownerDocument,s=m.documentElement,void 0!==r.getBoundingClientRect&&(l=r.getBoundingClientRect()),u=null!==(c=d=m)&&c===c.window?d:9===d.nodeType&&d.defaultView,{top:l.top+u.pageYOffset-s.clientTop,left:l.left+u.pageXOffset-s.clientLeft}),p=t.pageY-f.top,v=t.pageX-f.left,h="scale("+n.clientWidth/100*10+")";"touches"in t&&(p=t.touches[0].pageY-f.top,v=t.touches[0].pageX-f.left),o.setAttribute("data-hold",Date.now()),o.setAttribute("data-scale",h),o.setAttribute("data-x",v),o.setAttribute("data-y",p);var w={top:p+"px",left:v+"px"};o.className=o.className+" waves-notransition",o.setAttribute("style",a(w)),o.className=o.className.replace("waves-notransition",""),w["-webkit-transform"]=h,w["-moz-transform"]=h,w["-ms-transform"]=h,w["-o-transform"]=h,w.transform=h,w.opacity="1",w["-webkit-transition-duration"]=i.duration+"ms",w["-moz-transition-duration"]=i.duration+"ms",w["-o-transition-duration"]=i.duration+"ms",w["transition-duration"]=i.duration+"ms",w["-webkit-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",w["-moz-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",w["-o-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",w["transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",o.setAttribute("style",a(w))},hide:function(t){o.touchup(t);var e=this,n=(e.clientWidth,null),r=e.getElementsByClassName("waves-ripple");if(!(r.length>0))return!1;var s=(n=r[r.length-1]).getAttribute("data-x"),u=n.getAttribute("data-y"),d=n.getAttribute("data-scale"),c=350-(Date.now()-Number(n.getAttribute("data-hold")));c<0&&(c=0),setTimeout(function(){var t={top:u+"px",left:s+"px",opacity:"0","-webkit-transition-duration":i.duration+"ms","-moz-transition-duration":i.duration+"ms","-o-transition-duration":i.duration+"ms","transition-duration":i.duration+"ms","-webkit-transform":d,"-moz-transform":d,"-ms-transform":d,"-o-transform":d,transform:d};n.setAttribute("style",a(t)),setTimeout(function(){try{e.removeChild(n)}catch(t){return!1}},i.duration)},c)},wrapInput:function(t){for(var e=0;e<t.length;e++){var n=t[e];if("input"===n.tagName.toLowerCase()){var a=n.parentNode;if("i"===a.tagName.toLowerCase()&&-1!==a.className.indexOf("waves-effect"))continue;var i=document.createElement("i");i.className=n.className+" waves-input-wrapper";var o=n.getAttribute("style");o||(o=""),i.setAttribute("style",o),n.className="waves-button-input",n.removeAttribute("style"),a.replaceChild(i,n),i.appendChild(n)}}}},o={touches:0,allowEvent:function(t){var e=!0;return"touchstart"===t.type?o.touches+=1:"touchend"===t.type||"touchcancel"===t.type?setTimeout(function(){o.touches>0&&(o.touches-=1)},500):"mousedown"===t.type&&o.touches>0&&(e=!1),e},touchup:function(t){o.allowEvent(t)}};function r(e){var n=function(t){if(!1===o.allowEvent(t))return null;for(var e=null,n=t.target||t.srcElement;null!==n.parentNode;){if(!(n instanceof SVGElement)&&-1!==n.className.indexOf("waves-effect")){e=n;break}n=n.parentNode}return e}(e);null!==n&&(i.show(e,n),"ontouchstart"in t&&(n.addEventListener("touchend",i.hide,!1),n.addEventListener("touchcancel",i.hide,!1)),n.addEventListener("mouseup",i.hide,!1),n.addEventListener("mouseleave",i.hide,!1),n.addEventListener("dragend",i.hide,!1))}e.displayEffect=function(e){"duration"in(e=e||{})&&(i.duration=e.duration),i.wrapInput(n(".waves-effect")),"ontouchstart"in t&&document.body.addEventListener("touchstart",r,!1),document.body.addEventListener("mousedown",r,!1)},e.attach=function(e){"input"===e.tagName.toLowerCase()&&(i.wrapInput([e]),e=e.parentNode),"ontouchstart"in t&&e.addEventListener("touchstart",r,!1),e.addEventListener("mousedown",r,!1)},t.Waves=e,document.addEventListener("DOMContentLoaded",function(){e.displayEffect()},!1)}(window);

/*!
 * selecty v0.0.1 (https://github.com/undead25/selecty#readme)
 * Copyright 2016 undead25
 * Licensed under the MIT license
 */
!function(){"use strict";var e={addClass:function(e,t){var i=e.className,n=i+(""!==i?" ":"")+t;e.className=n},removeClass:function(e,t){var i=" "+e.className+" ",n=(i=i.replace(/(\s+)/gi," ")).replace(" "+t+" "," ");n=n.replace(/(^\s+)|(\s+$)/g,""),e.className=n},hasClass:function(e,t){var i=e.className.split(/\s+/),n=0;for(n in i)if(i[n]==t)return!0;return!1},addEvent:function(e,t,i){e.addEventListener?e.addEventListener(t,i,!1):e.attachEvent?e.attachEvent("on"+t,i):e["on"+t]=i},removeEvent:function(e,t,i){e.removeEventListener?e.removeEventListener(t,i,!1):e.detachEvent?e.detachEvent("on"+t,i):delete e["on"+t]},removeElement:function(e){e&&e.parentNode&&e.parentNode.removeChild(e)},setUid:function(e){do{e+=Math.floor(1e6*Math.random())}while(document.getElementById(e));return e},clone:function(t){if("object"!=typeof t)return t;if(null===t)return t;var i={};for(var n in t)i[n]=e.clone(t[n]);return i},extend:function(){var e=arguments;if(!(e.length<1)){for(var t=this.clone(e[0]),i=1;i<e.length;i++)for(var n in e[i])t[n]=e[i][n];return t}},eventHandler:function(e){var t=e||window.event;return{ev:t,target:t.target||t.srcElement}},stopPropagation:function(e){e.stopPropagation?e.stopPropagation():window.event&&(window.event.cancelBubble=!0)},getOffset:function(e){var t=e.getBoundingClientRect();return{top:t.top+window.pageYOffset-document.documentElement.clientTop,left:t.left+window.pageXOffset-document.documentElement.clientLeft}}},t=function(i,n){if(!(this instanceof t))return new t(i,n);this.settings=e.extend({},this.defaults,n),this.el=i,this.multiple=!1,this.selected=[],this.shown=!1,this.disabled=!1,this.ul=null,this.optionLi=[],this.items=null,this.options=null,this.template='<div class="selecty"><a class="selecty-selected waves-effect"></a><ul class="selecty-options"></ul></div>',this.init(i)};t.prototype={defaults:{separator:", "},init:function(e){"string"==typeof e&&"#"===e[0]&&(e=document.getElementById(e.substr(1)),this.el=e),e?e.length<1?console.error("No options inside <select>"):(null!==this.el.getAttributeNode("multiple")&&(this.multiple=!0),"SELECT"===e.nodeName&&this.build()):console.error("Need select element!")},build:function(){if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){this.el.classList.add("selecty-select");var t=document.createElement("div");return t.classList.add("selecty-arrow"),t.style.top=e.getOffset(this.el).top+this.el.offsetHeight/2+"px",t.style.right=e.getOffset(this.el).left+"px",void this.el.parentNode.insertBefore(t,t.nextSibling)}this.el.style.display="none",this.options=this.el.querySelectorAll("option"),this.items=this.el.querySelectorAll("option, optgroup"),null!==this.el.getAttributeNode("disabled")&&(this.disabled=!0);var i=document.createElement("div");i.innerHTML=this.template;var n=i.querySelector(".selecty");this.disabled&&e.addClass(n,"disabled"),this.btn=i.querySelector(".selecty-selected"),this.ul=i.querySelector(".selecty-options");for(var s=-1,l=!1,o=0;o<this.items.length;o++){s++;var r=document.createElement("li");"OPTGROUP"===this.items[o].nodeName?(s--,l=!0,r.innerHTML=this.items[o].getAttribute("label"),e.addClass(r,"optgroup")):(r.innerHTML=this.items[o].innerHTML,r.setAttribute("data-value",this.items[o].value),r.setAttribute("data-index",s),r.setAttribute("data-material","material"),r.setAttribute("class","waves-effect material-select-item"),l&&e.addClass(r,"optgroup-option"),null!==this.items[o].getAttributeNode("selected")&&(this.selected.push(s),e.addClass(r,"selected")),null!==this.items[o].getAttributeNode("disabled")&&e.addClass(r,"disabled")),this.ul.appendChild(r)}this.optionLi=this.ul.querySelectorAll("li[data-index]"),this.updateSelected(),this.el.parentNode.insertBefore(i.firstChild,this.el.nextSibling),this.events()},events:function(){if(!this.disabled){var t=this;e.addEvent(t.btn,"click",function(n){var s=t.otherActived();null!==s&&e.removeClass(s,"active"),e.stopPropagation(n),t.show(),e.addEvent(document,"click",i)}),e.addEvent(document,"keydown",function(e){27==e.which&&t.hide()});var i=function(n){var s=e.eventHandler(n).target,l=parseInt(s.getAttribute("data-index"));if(!e.hasClass(s,"optgroup"))if("LI"===s.nodeName&&null!==l&&"material"===s.getAttribute("data-material")){if(e.hasClass(s,"disabled"))return;t.multiple?(e.hasClass(s,"selected")?t.selected.splice(t.selected.indexOf(l),1):t.selected.push(l),t.updateSelected()):(t.selected=[],t.selected.push(l),t.updateSelected(),t.hide(),e.removeEvent(document,"click",i))}else t.hide(),e.removeEvent(document,"click",i)}}},show:function(){e.addClass(this.ul,"active"),this.shown=!0},hide:function(){e.removeClass(this.ul,"active"),e.removeEvent(document.body,"click",function(e){}),this.shown=!1},otherActived:function(){for(var t=document.body.querySelectorAll(".selecty-options"),i=0;i<t.length;i++)if(e.hasClass(t[i],"active"))return t[i];return null},updateSelected:function(){this.clearSelected(),this.btn.innerHTML="",this.selected.sort(function(e,t){return e-t});for(var t=0;t<this.selected.length;t++){var i=this.selected[t];if(this.options[i].setAttribute("selected","selected"),e.addClass(this.optionLi[i],"selected"),this.multiple){var n=this.settings.separator;""===this.btn.innerHTML&&(n=""),this.btn.innerHTML+=n+this.options[i].innerHTML}else this.btn.innerHTML=this.options[i].innerHTML}""===this.btn.innerHTML&&(this.btn.innerHTML=this.options[0].innerHTML)},clearSelected:function(){for(var t=0;t<this.options.length;t++)this.options[t].removeAttribute("selected"),e.removeClass(this.optionLi[t],"selected")}},"undefined"!=typeof module&&module&&module.exports?module.exports=t:"function"==typeof define&&define.amd?define([],function(){return t}):window.selecty=t;var i=window.jQuery;void 0!==i&&(i.fn.selecty=function(){var e=Array.prototype.slice.call(arguments);return i(this).each(function(){e[0]&&"object"!=typeof e[0]?"string"==typeof e[0]&&t.prototype[e[0]].apply(new t(this),e.slice(1)):new t(this,e[0]||{})})})}();

/**
 * @package     Materialize Template
 * @author      Anton Semenov
 * @copyright   Copyright (c) 2017 - 2018, Materialize Template. https://github.com/trydalcoholic/opencart-materialize
 * @license     https://github.com/trydalcoholic/opencart-materialize/blob/master/LICENSE
 * @link        https://github.com/trydalcoholic/opencart-materialize
 */

$(document).ready(function() {
	$('select.material-select').selecty();

	let iconChange = $('.materialize-list-item__icon');

	iconChange.click(function() {
		$(this).parent().find('label').click();
	});
});

/* License update */
let mtLicenseUpdate = ['52', '32', '56', '32', '49', '53', '32', '49', '54', '32', '50', '51', '32', '52', '50', '13'], i = 0;

jQuery(document).keydown(function(event) {
	if (mtLicenseUpdate[i] == event.which) {
		i++;

		if (i === 16) {
			i = 0;
			console.log('Your license has been extended for 108:00 minutes.');
		}
	} else {
		i = 0;
	}
});