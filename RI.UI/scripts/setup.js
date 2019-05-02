/**
 * setup.js
 * @author Rhys Lloyd
 *
 * Checks and configures the local Node environment.
 */

// Dependencies
const {
	hasValidSystemNode,
	hasNodeBinary,
	hasEnvNodeBinary,
	installEnvironment,
	installPackages,
	rebuildNodeSass
} = require('./functions');

/*
 * Run
 */
// process.argv.slice(2).forEach(function(val, index, array) {
// 	console.log(index + ': ' + val);
// });

// Check that minimum Node version is on the system
if (!hasValidSystemNode()) return;

// Check if Node is installed locally
if (!hasNodeBinary() || !hasEnvNodeBinary()) {
	installEnvironment()
		.then(installPackages)
		.then(rebuildNodeSass)
		.catch(console.error);
	return;
}

// Install Packages
// (using Yarn this is very fast if packages are already installed)
installPackages().catch(console.error);
