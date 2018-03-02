#!/usr/bin/env node
const fs = require('fs');

const [,, ...args] = process.argv;

console.log(args.length);

if (args.length === 3) {
  console.log(`using ${args[2]} template`);
  fs.writeFileSync(`./views/${args[0]}.pug`, `extends layouts/${args[2]}\n\nblock content\n\th1 ${args[0]}`);
} else {
  fs.writeFileSync(`./views/${args[0]}.pug`, `block content\n\th1 ${args[0]}`);
}

