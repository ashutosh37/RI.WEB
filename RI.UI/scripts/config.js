/**
 * Config for Setup
 * @author Ashutosh Nigam
 */

// Constants
const MINIMUM_SYSTEM_NODE_VERSION = 'v8.5.0';
const YARN_FILENAME = 'yarn-1.15.2.js';
const YARN_INSTALL_COMMAND = 'install --prefer-offline';
const ENV_DIR = './.dip_env';
const NODE_MODULES_DIR = './node_modules';
const NODE_MODULES_BIN = './node_modules/.bin';
const LOCAL_NODE_DIR = './node_modules/node';
const NODE_LINK_PATH = `${NODE_MODULES_BIN}/node`;
const NODE_BINARY_PATH = `${LOCAL_NODE_DIR}/bin/node`;
const YARN_SCRIPT = `./bin/${YARN_FILENAME}`;
const TSLINT_RULES_PATH = `./lib/tslint`;
const TYPEDOC_THEME_PATH = `./lib/typedoc-theme-md`;

// Determined
const pkg = require('../package.json');
const requiredNodeVersion = pkg.devDependencies.node;
const requiredYarnVersion = pkg.devDependencies.yarn;

module.exports = {
	MINIMUM_SYSTEM_NODE_VERSION,
	YARN_INSTALL_COMMAND,
	ENV_DIR,
	NODE_MODULES_DIR,
	NODE_MODULES_BIN,
	LOCAL_NODE_DIR,
	YARN_SCRIPT,
	NODE_LINK_PATH,
	NODE_BINARY_PATH,
	TSLINT_RULES_PATH,
	TYPEDOC_THEME_PATH,
	pkg,
	requiredNodeVersion,
	requiredYarnVersion
};
