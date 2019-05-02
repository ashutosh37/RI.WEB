/**
 * Setup Functions
 * @author Rhys Lloyd
 */

/*
 * Dependencies and Constants
 */
// Node Dependencies
const path = require('path');
const execSync = require('child_process').execSync;

// Local Dependencies
const fs = require('./lib/fs-extra');
const debug = require('./lib/debug');
const compareVersions = require('./lib/compare-versions');
const {
	MINIMUM_SYSTEM_NODE_VERSION,
	YARN_INSTALL_COMMAND,
	NODE_MODULES_BIN,
	ENV_DIR,
	NODE_MODULES_DIR,
	NODE_LINK_PATH,
	NODE_BINARY_PATH,
	LOCAL_NODE_DIR,
	TSLINT_RULES_PATH,
	TYPEDOC_THEME_PATH,
	YARN_SCRIPT,
	requiredNodeVersion,
	requiredYarnVersion,
	pkg
} = require('./config');

// Constants
const ENV_NODE_DIR = `${ENV_DIR}/node`;
const ENV_NODE = `${ENV_NODE_DIR}/bin/node`;
const ENV_YARN = `${ENV_NODE} ${YARN_SCRIPT}`;

// Logging Setup
const verbose = debug('setup:debug');

/*
 * Functions
 */

/**
 * Gets the current Node version by executing `node -v`
 * @returns {string | *}
 */
function getCurrentNodeVersion() {
	return execSync('node -v')
		.toString()
		.trim();
}

/**
 * Returns true if Node installed on the system is equal to or greater than
 * MINIMUM_SYSTEM_NODE_VERSION.
 * Renders an error to the console if the system version is invalid.
 * @returns {boolean}
 */
function hasValidSystemNode() {
	const systemVersion = getCurrentNodeVersion();
	const versionOkay =
		compareVersions(MINIMUM_SYSTEM_NODE_VERSION, systemVersion) < 1;

	verbose(`Minimum node version: ${MINIMUM_SYSTEM_NODE_VERSION}`);
	verbose(`System node version: ${systemVersion}`);
	verbose(`Valid system node: ${versionOkay}`);

	if (!versionOkay) {
		// prettier-ignore
		console.error(
			'\u001B[31m' + 'SETUP FAILURE' + '\u001B[39m\n' +
			'Unable to set up project as your Node version is unsupported.\n\n' +
			'Minimum: ' + '\u001B[36m' + MINIMUM_SYSTEM_NODE_VERSION + '\u001B[39m\n' +
			'Installed: ' + '\u001B[31m' + systemVersion + '\u001B[39m\n\n' +
			'You will need to upgrade Node to continue.\n' +
			'https://nodejs.org/en/'
		);
	}

	return versionOkay;
}

/**
 * Returns true if there's a file at NODE_SYMLINK_PATH
 * @returns {boolean}
 */
function hasNodeSymlink() {
	const exists = !!fs.existsSync(NODE_LINK_PATH);
	verbose(`NODE_SYMLINK_PATH: ${NODE_LINK_PATH}`);
	verbose(`hasNodeSymlink(): ${exists}`);
	return exists;
}

/**
 * Returns true if there's a file at NODE_BINARY_PATH
 * @returns {boolean}
 */
function hasNodeBinary() {
	const exists = !!fs.existsSync(NODE_BINARY_PATH);
	verbose(`NODE_BINARY_PATH: ${NODE_BINARY_PATH}`);
	verbose(`hasNodeBinary(): ${exists}`);
	return exists;
}

/**
 * Returns true if there's a file at NODE_BINARY_PATH
 * @returns {boolean}
 */
function hasEnvNodeBinary() {
	const exists = !!fs.existsSync(ENV_NODE);
	verbose(`ENV_NODE: ${ENV_NODE}`);
	verbose(`hasEnvNodeBinary(): ${exists}`);
	return exists;
}

/**
 * Copies required Environment files
 * @returns {PromiseLike<T | never> | Promise<T | never> | Promise | *}
 */
function copyEnvironmentFiles() {
	// Yarn removes the binary it's executing against which triggers an infinite loop
	// Need to copy the node binary to a temp directory and execute yarn using the temp
	// version - this should prevent yarn from removing the binaries we need
	verbose(`Create directory: ${ENV_DIR}`);

	return fs.mkdirs(path.normalize(ENV_DIR)).then(() => {
		verbose(`Copying from ${LOCAL_NODE_DIR} to ${ENV_NODE_DIR}`);

		return fs.copy(LOCAL_NODE_DIR, ENV_NODE_DIR);
	});
}

// noinspection FunctionWithMoreThanThreeNegationsJS
/**
 * Uses system Node to install Node and Yarn locally to the project.
 */
function installEnvironment() {
	console.log('\nInstalling Environment');
	const command = `npm install node@${requiredNodeVersion} --no-package-lock`;

	// Pre-clean
	return resetEnvironment()
		.then(() => {
			// Execute
			verbose(`Current Node Version: ${getCurrentNodeVersion()}`);
			verbose(`Executing: ${command}`);

			execSync(command, { stdio: [0, 1, 2] });
		})
		.then(copyEnvironmentFiles)
		.then(() => {
			const nodeReady = !!fs.existsSync(ENV_NODE);

			if (nodeReady) {
				verbose(`Verified Node at ${ENV_NODE}`);
			} else {
				throw new Error(`Node is missing at ${ENV_NODE}`);
			}

			verbose('Environment ready.');
		});
}

/**
 * Uses the local versions of Node and Yarn to install project packages.
 */
function installPackages() {
	const command = `${path.normalize(ENV_YARN)} ${YARN_INSTALL_COMMAND}`;
	console.log('\nInstalling Packages');

	verbose(`Executing: ${command}`);
	verbose(`Using Node Version: ${execSync(`${path.normalize(ENV_NODE)} -v`)}`);
	execSync(command, {
		stdio: [0, 1, 2]
	});

	return symlinkNodeBinary();
}

/**
 * Removes directories and files created
 * @returns {Promise}
 */
function resetEnvironment() {
	const removeNodeModulesPromise = fs
		.remove(NODE_MODULES_DIR)
		.then(() => console.log(`Removed ${NODE_MODULES_DIR}`));
	const removeEnvDirPromise = fs
		.remove(ENV_DIR)
		.then(() => console.log(`Removed ${ENV_DIR}`));

	return Promise.all([removeNodeModulesPromise, removeEnvDirPromise]);
}

/**
 * Creates a symlink from NODE_LINK_PATH to NODE_BINARY_PATH if one
 * doesn't already exist.
 */
function symlinkNodeBinary() {
	if (hasNodeSymlink()) {
		verbose('symlinkNodeBinary(): Bailing');
		return Promise.resolve();
	}

	if (!hasNodeBinary()) {
		return Promise.reject('EBINMISS');
	}

	console.log('\nSymlink local node');
	verbose(`Symlinking from ${NODE_BINARY_PATH} to ${NODE_LINK_PATH}`);

	let linkPromise;

	if (process.platform === 'win32') {
		verbose('Shimming symlink for Windows');
		linkPromise = require('@zkochan/cmd-shim')(
			NODE_BINARY_PATH,
			NODE_LINK_PATH
		);
	} else {
		linkPromise = new Promise((resolve, reject) => {
			fs.symlink(
				path.relative(NODE_MODULES_BIN, NODE_BINARY_PATH),
				NODE_LINK_PATH,
				err => {
					if (err) return reject(err);
					resolve();
				}
			);
		});
	}

	return linkPromise.then(() => {
		console.log('...linked');
	});
}

/**
 * Compiles TS Files in TSLint Rules directory
 */
function compileTsLintRules() {
	console.log('Compile TSLint rules');
	execSync(
		`${path.normalize(
			ENV_NODE
		)} ./node_modules/typescript/lib/tsc.js -p ${TSLINT_RULES_PATH}`
	);
}

/**
 * Compiles TS Files in TypeDoc theme directory
 */
function compileTypeDocTheme() {
	console.log('Compile TypeDoc theme');
	execSync(
		`${path.normalize(
			ENV_NODE
		)} ./node_modules/typescript/lib/tsc.js -p ${TYPEDOC_THEME_PATH}`
	);
}

/**
 * Uses the local versions of Node and Yarn to install project packages.
 */
function rebuildNodeSass() {
	const command = `npm rebuild node-sass`;
	const nodeVersion = execSync(`${path.normalize(ENV_NODE)} -v`).toString();

	console.log('\nCheck node-sass for Node ', nodeVersion);
	verbose(`Executing: ${command}`);
	verbose(`Using Node Version: ${nodeVersion}`);
	execSync(command, {
		stdio: [0, 1, 2]
	});
}

module.exports = {
	hasValidSystemNode,
	hasNodeSymlink,
	hasNodeBinary,
	hasEnvNodeBinary,
	installEnvironment,
	resetEnvironment,
	installPackages,
	symlinkNodeBinary,
	compileTsLintRules,
	compileTypeDocTheme,
	rebuildNodeSass
};
