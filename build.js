const fs = require('fs');
const pug = require('pug');
const yamlFront = require('yaml-front-matter');
const beautifyHtml = require('js-beautify').html;

const fileTree = fs.readdirSync('./content');

fileTree.forEach((file) => {
  file = file.slice(0, -3);
  const frontMatter = yamlFront.loadFront(`./content/${file}.md`);
  const compiledFunction = pug.compileFile(`views/${file}.pug`);
  const html = compiledFunction(frontMatter);

  fs.writeFileSync(`./dist/${file}.html`, beautifyHtml(html, { indent_size: 4 }));
});
