const fs = require('fs');
const fsExtra = require('fs-extra');
const pug = require('pug');
const yamlFront = require('yaml-front-matter');
const beautifyHtml = require('js-beautify').html;

fsExtra.ensureDirSync('./dist');
fsExtra.ensureDirSync('./dist/static/styles');
fsExtra.ensureDirSync('./dist/static/img');

try {
  fsExtra.copySync('./public/styles/main.css', './dist/static/styles/main.css');
  fsExtra.copySync('./public/styles/example.css', './dist/static/styles/example.css');
  const images = fs.readdirSync('./public/img');
  images.forEach((img) => {
    fsExtra.copySync(`./public/img/${img}`, `./dist/static/img/${img}`);
  });
} catch (err) {
  console.error(err);
}
const fileTree = fs.readdirSync('./views');

fileTree.forEach((file) => {
  if (file.substr(file.length - 4) === '.pug') {
    const filename = file.slice(0, -4);
    let frontMatter = yamlFront.loadFront('options/bootstrap.yml');
    frontMatter = Object.assign(frontMatter, yamlFront.loadFront('options/navigation.yml'));
    const compiledFunction = pug.compileFile(`views/${filename}.pug`);
    const html = compiledFunction(frontMatter);
    fs.writeFileSync(`./dist/${filename}.html`, beautifyHtml(html, {
      indent_size: 4,
    }));
  }
});

console.log('\nDone!');
