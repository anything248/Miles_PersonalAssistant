'use strict';
// Standalone Node.js test runner, no dependencies.
// Extracts the same engine script used by index.html to prevent test-code drift.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const match = html.match(/<script id="app-code">([\s\S]*?)<\/script>/);
if (!match) throw new Error('Expected script#app-code missing');
const context = vm.createContext({});
vm.runInContext(match[1], context, { timeout: 10_000, filename: 'index.html#app-code' });
const tests = context.SGMilesEngine.runSelfTests();
for (const t of tests) console.log(`${t.pass ? 'PASS' : 'FAIL'} ${t.name}${t.error ? ': '+t.error : ''}`);
const passed = tests.filter(t => t.pass).length;
console.log(`\n${passed}/${tests.length} tests PASS`);
if (passed !== tests.length) process.exitCode = 1;
