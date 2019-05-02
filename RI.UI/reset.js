/**
 * reset.js
 * @author Ashutosh
 */

/*
 * Dependencies
 */
// Local Dependencies
const path = require('path');
const fs = require('./lib/fs-extra');
const glob = require('./lib/tiny-glob');
const { resetEnvironment } = require('./functions');
const cwd = path.resolve(__dirname, '..');

/*
 * Run
 */
resetEnvironment();

// TODO: Pull from config
fs.remove('./dist')
	.then(() => {
		console.log('Removed ./dist');
	})
	.catch(console.error);

// TODO: Pull from config
fs.remove('./styleguide')
	.then(() => {
		console.log('Removed ./styleguide');
	})
	.catch(console.error);

// TODO: Pull from config
fs.emptyDir('./public')
	.then(() => {
		fs.close(fs.openSync('./public/.gitkeep', 'w'));
		console.log('Removed ./public (contents)');
	})
	.catch(console.error);

// TODO: Pull from config
fs.emptyDir('./src/data')
	.then(() => {
		fs.close(fs.openSync('./src/data/.gitkeep', 'w'));
		console.log('Removed ./src/data (contents)');
	})
	.catch(console.error);

// TODO: Pull from config
fs.emptyDir('./src/docs/10-styles/reference')
	.then(() => {
		fs.close(fs.openSync('./src/docs/10-styles/reference/.gitkeep', 'w'));
		console.log('Removed ./src/docs/10-styles/reference (contents)');
	})
	.catch(console.error);

// TODO: Pull from config
fs.emptyDir('./src/docs/20-scripts/reference')
	.then(() => {
		fs.close(fs.openSync('./src/docs/20-scripts/reference/.gitkeep', 'w'));
		console.log('Removed ./src/docs/20-scripts/reference (contents)');
	})
	.catch(console.error);

// Clean TsLint Compiled Files
// TODO: Pull from env config
glob('lib/tslint/*.js', {
	filesOnly: true,
	cwd: cwd
})
	.then(files => {
		const promises = [];
		files.forEach(file => promises.push(fs.remove(file)));
		return Promise.all(promises);
	})
	.then(() => {
		console.log('Removed TSLint compiled rules');
	})
	.catch(console.error);

// Clean TypeDoc Compiled Files
// TODO: Pull from env config
glob('lib/typedoc-theme-md/**/*.{js,map}', {
	filesOnly: true,
	cwd: cwd
})
	.then(files => {
		const promises = [];
		files.forEach(file => promises.push(fs.remove(file)));
		return Promise.all(promises);
	})
	.then(() => {
		console.log('Removed TypeDoc compiled theme');
	})
	.catch(console.error);
