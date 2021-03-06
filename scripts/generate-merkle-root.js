const { program } = require('commander');
const fs = require('fs');
const { parseJson } = require('../src/json-to-tree.js');

// ts-node scripts/generate-merkle-root.ts --input scripts/test.json

program
  .version('0.0.0')
  .requiredOption(
    '--i, --input <path>',
    'input JSON file location containing a map of account addresses to string balances'
  )

program.parse(process.argv)

const json = JSON.parse(fs.readFileSync(program.opts().input, { encoding: 'utf8' }))
if (typeof json !== 'object') throw new Error('Invalid JSON')


console.log(JSON.stringify(parseJson(json)))
