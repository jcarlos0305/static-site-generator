#!/usr/bin/env node
const fs = require('fs');

const [,, ...args] = process.argv;

if (args.length === 3 && args[1] === '--layout') {
  if (fs.existsSync(`./views/layouts/${args[2]}.pug`)) {
    fs.writeFileSync(`./views/${args[0]}.pug`, `extends layouts/${args[2]}\n\nblock content\n\th1 ${args[0]}`);
    console.log(`The ${args[0]} page was created successfully!`);
  } else {
    console.log(`Error: the selected layout: ${args[2]} doesn't exist`);
  }
} else if (args.length === 1) {
  fs.writeFileSync(`./views/${args[0]}.pug`, `block content\n\th1 ${args[0]}`);
} else {
  console.log('\n\nError: missing page name.\n');
}

