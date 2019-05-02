'use strict';

function _interopDefault(ex) {
	return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var tty = _interopDefault(require('tty'));
var util = _interopDefault(require('util'));

function createCommonjsModule(fn, module) {
	return (module = { exports: {} }), fn(module, module.exports), module.exports;
}

var hasFlag = function(flag, argv) {
	argv = argv || process.argv;

	var terminatorPos = argv.indexOf('--');
	var prefix = /^--/.test(flag) ? '' : '--';
	var pos = argv.indexOf(prefix + flag);

	return pos !== -1 && (terminatorPos !== -1 ? pos < terminatorPos : true);
};

var support = function(level) {
	if (level === 0) {
		return false;
	}

	return {
		level: level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
};

var supportLevel = (function() {
	if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
		return 0;
	}

	if (
		hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')
	) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (
		hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')
	) {
		return 1;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return 0;
	}

	if (process.platform === 'win32') {
		return 1;
	}

	if ('CI' in process.env) {
		if ('TRAVIS' in process.env || process.env.CI === 'Travis') {
			return 1;
		}

		return 0;
	}

	if ('TEAMCITY_VERSION' in process.env) {
		return process.env.TEAMCITY_VERSION.match(
			/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/
		) === null
			? 0
			: 1;
	}

	if (/^(screen|xterm)-256(?:color)?/.test(process.env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in process.env) {
		return 1;
	}

	if (process.env.TERM === 'dumb') {
		return 0;
	}

	return 0;
})();

if (supportLevel === 0 && 'FORCE_COLOR' in process.env) {
	supportLevel = 1;
}

var supportsColor = process && support(supportLevel);

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function(val, options) {
	options = options || {};
	var type = typeof val;
	if (type === 'string' && val.length > 0) {
		return parse(val);
	} else if (type === 'number' && isNaN(val) === false) {
		return options.long ? fmtLong(val) : fmtShort(val);
	}
	throw new Error(
		'val is not a non-empty string or a valid number. val=' +
			JSON.stringify(val)
	);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
	str = String(str);
	if (str.length > 100) {
		return;
	}
	var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
		str
	);
	if (!match) {
		return;
	}
	var n = parseFloat(match[1]);
	var type = (match[2] || 'ms').toLowerCase();
	switch (type) {
		case 'years':
		case 'year':
		case 'yrs':
		case 'yr':
		case 'y':
			return n * y;
		case 'weeks':
		case 'week':
		case 'w':
			return n * w;
		case 'days':
		case 'day':
		case 'd':
			return n * d;
		case 'hours':
		case 'hour':
		case 'hrs':
		case 'hr':
		case 'h':
			return n * h;
		case 'minutes':
		case 'minute':
		case 'mins':
		case 'min':
		case 'm':
			return n * m;
		case 'seconds':
		case 'second':
		case 'secs':
		case 'sec':
		case 's':
			return n * s;
		case 'milliseconds':
		case 'millisecond':
		case 'msecs':
		case 'msec':
		case 'ms':
			return n;
		default:
			return undefined;
	}
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
	var msAbs = Math.abs(ms);
	if (msAbs >= d) {
		return Math.round(ms / d) + 'd';
	}
	if (msAbs >= h) {
		return Math.round(ms / h) + 'h';
	}
	if (msAbs >= m) {
		return Math.round(ms / m) + 'm';
	}
	if (msAbs >= s) {
		return Math.round(ms / s) + 's';
	}
	return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
	var msAbs = Math.abs(ms);
	if (msAbs >= d) {
		return plural(ms, msAbs, d, 'day');
	}
	if (msAbs >= h) {
		return plural(ms, msAbs, h, 'hour');
	}
	if (msAbs >= m) {
		return plural(ms, msAbs, m, 'minute');
	}
	if (msAbs >= s) {
		return plural(ms, msAbs, s, 'second');
	}
	return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
	var isPlural = msAbs >= n * 1.5;
	return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

var common = function setup(env) {
	createDebug.debug = createDebug['default'] = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = ms;

	Object.keys(env).forEach(function(key) {
		createDebug[key] = env[key];
	});

	/**
	 * Active `debug` instances.
	 */
	createDebug.instances = [];

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	createDebug.names = [];
	createDebug.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */

	createDebug.formatters = {};

	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */

	function selectColor(namespace) {
		var hash = 0,
			i;

		for (i in namespace) {
			hash = (hash << 5) - hash + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}

	createDebug.selectColor = selectColor;

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function createDebug(namespace) {
		var prevTime;

		function debug() {
			// disabled?
			if (!debug.enabled) return;

			var self = debug;

			// set `diff` timestamp
			var curr = +new Date();
			var ms$$1 = curr - (prevTime || curr);
			self.diff = ms$$1;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			// turn the `arguments` into a proper Array
			var args = new Array(arguments.length);
			for (var i = 0; i < args.length; i++) {
				args[i] = arguments[i];
			}

			args[0] = createDebug.coerce(args[0]);

			if ('string' !== typeof args[0]) {
				// anything else let's inspect with %O
				args.unshift('%O');
			}

			// apply any `formatters` transformations
			var index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
				// if we encounter an escaped % then don't increase the array index
				if (match === '%%') return match;
				index++;
				var formatter = createDebug.formatters[format];
				if ('function' === typeof formatter) {
					var val = args[index];
					match = formatter.call(self, val);

					// now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			var logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		//debug.formatArgs = formatArgs;
		//debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if ('function' === typeof createDebug.init) {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		var index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		var i;
		var split = (typeof namespaces === 'string' ? namespaces : '').split(
			/[\s,]+/
		);
		var len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) continue; // ignore empty strings
			namespaces = split[i].replace(/\*/g, '.*?');
			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			var instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
		createDebug.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}
		var i, len;
		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}
		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
		if (val instanceof Error) return val.stack || val.message;
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
};

var node = createCommonjsModule(function(module, exports) {
	/**
	 * Module dependencies.
	 */

	/**
	 * This is the Node.js implementation of `debug()`.
	 */

	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;

	/**
	 * Colors.
	 */

	exports.colors = [6, 2, 3, 4, 5, 1];

	try {
		var supportsColor$$1 = supportsColor;
		if (
			supportsColor$$1 &&
			(supportsColor$$1.stderr || supportsColor$$1).level >= 2
		) {
			exports.colors = [
				20,
				21,
				26,
				27,
				32,
				33,
				38,
				39,
				40,
				41,
				42,
				43,
				44,
				45,
				56,
				57,
				62,
				63,
				68,
				69,
				74,
				75,
				76,
				77,
				78,
				79,
				80,
				81,
				92,
				93,
				98,
				99,
				112,
				113,
				128,
				129,
				134,
				135,
				148,
				149,
				160,
				161,
				162,
				163,
				164,
				165,
				166,
				167,
				168,
				169,
				170,
				171,
				172,
				173,
				178,
				179,
				184,
				185,
				196,
				197,
				198,
				199,
				200,
				201,
				202,
				203,
				204,
				205,
				206,
				207,
				208,
				209,
				214,
				215,
				220,
				221
			];
		}
	} catch (err) {
		// swallow - we only care if `supports-color` is available; it doesn't have to be.
	}

	/**
	 * Build up the default `inspectOpts` object from the environment variables.
	 *
	 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	 */

	exports.inspectOpts = Object.keys(process.env)
		.filter(function(key) {
			return /^debug_/i.test(key);
		})
		.reduce(function(obj, key) {
			// camel-case
			var prop = key
				.substring(6)
				.toLowerCase()
				.replace(/_([a-z])/g, function(_, k) {
					return k.toUpperCase();
				});

			// coerce string value into JS value
			var val = process.env[key];
			if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
			else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
			else if (val === 'null') val = null;
			else val = Number(val);

			obj[prop] = val;
			return obj;
		}, {});

	/**
	 * Is stdout a TTY? Colored output is enabled when `true`.
	 */

	function useColors() {
		return 'colors' in exports.inspectOpts
			? Boolean(exports.inspectOpts.colors)
			: tty.isatty(process.stderr.fd);
	}

	/**
	 * Adds ANSI color escape codes if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
		var name = this.namespace;
		var useColors = this.useColors;

		if (useColors) {
			var c = this.color;
			var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
			var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

			args[0] = prefix + args[0].split('\n').join('\n' + prefix);
			args.push(
				colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001b[0m'
			);
		} else {
			args[0] = getDate() + name + ' ' + args[0];
		}
	}

	function getDate() {
		if (exports.inspectOpts.hideDate) {
			return '';
		} else {
			return new Date().toISOString() + ' ';
		}
	}

	/**
	 * Invokes `util.format()` with the specified arguments and writes to stderr.
	 */

	function log() {
		return process.stderr.write(util.format.apply(util, arguments) + '\n');
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
		if (null == namespaces) {
			// If you set a process.env field to null or undefined, it gets cast to the
			// string 'null' or 'undefined'. Just delete instead.
			delete process.env.DEBUG;
		} else {
			process.env.DEBUG = namespaces;
		}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
		return process.env.DEBUG;
	}

	/**
	 * Init logic for `debug` instances.
	 *
	 * Create a new `inspectOpts` object in case `useColors` is set
	 * differently for a particular `debug` instance.
	 */

	function init(debug) {
		debug.inspectOpts = {};

		var keys = Object.keys(exports.inspectOpts);
		for (var i = 0; i < keys.length; i++) {
			debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
		}
	}

	module.exports = common(exports);

	var formatters = module.exports.formatters;

	/**
	 * Map %o to `util.inspect()`, all on a single line.
	 */

	formatters.o = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, ' ');
	};

	/**
	 * Map %O to `util.inspect()`, allowing multiple lines if needed.
	 */

	formatters.O = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts);
	};
});
var node_1 = node.init;
var node_2 = node.log;
var node_3 = node.formatArgs;
var node_4 = node.save;
var node_5 = node.load;
var node_6 = node.useColors;
var node_7 = node.colors;
var node_8 = node.inspectOpts;

var node$1 = node;

module.exports = node$1;
