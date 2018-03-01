#!/usr/bin/env node
const fs = require('fs');

const [,, ...args] = process.argv;

fs.writeFileSync(`./views/${args[0]}.pug`, `extends shared/layout\n\nblock content\n\th1 ${args[0]}`);
