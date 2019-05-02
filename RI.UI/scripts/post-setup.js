/**
 * post-setup.js
 * @author Rhys Lloyd
 */

// Dependencies
const path = require('path');
const glob = require('./lib/tiny-glob-sync');
const fs = require('./lib/fs-extra');
const { compileTsLintRules, compileTypeDocTheme } = require('./functions');
const cwd = path.resolve(__dirname, '..');

/*
 * Compile framework TS
 */

// TSLint Rules
const tsLintDir = 'lib/tslint';
const tsLintTsFiles = glob(`${tsLintDir}/*.ts`, {
	filesOnly: true,
	cwd: cwd
});
const tsLintCompiledFiles = glob(`${tsLintDir}/*.js`, {
	filesOnly: true,
	cwd: cwd
});

if (tsLintCompiledFiles.length !== tsLintTsFiles.length) {
	compileTsLintRules();
}

// TypeDoc Theme
const typeDocThemeDir = 'lib/typedoc-theme-md';
const typeDocTsFiles = glob(`${typeDocThemeDir}/**/*.ts`, {
	filesOnly: true,
	cwd: cwd
});
const typeDocCompiledFiles = glob(`${typeDocThemeDir}/**/*.js`, {
	filesOnly: true,
	cwd: cwd
});

if (typeDocCompiledFiles.length !== typeDocTsFiles.length) {
	compileTypeDocTheme();
}