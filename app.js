const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const yamlFront = require('yaml-front-matter');
const fs = require('fs');
const reload = require('reload');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());

app.use('/static', express.static('public'));

const pages = fs.readdirSync(app.get('views'));

let navigation = '---\npages: [';
pages.forEach((page) => {
  if (page.substr(page.length - 3) === 'pug') {
    const pageName = page.slice(0, -4);
    navigation += `{url: '${pageName}.html', name: '${pageName === 'index' ? ('Home') : (pageName.substr(0, 1).toUpperCase() + pageName.substr(1))}'}, `;
    let frontMatter = yamlFront.loadFront('content/navigation.yml');
    if (fs.existsSync(`content/${pageName}.md`)) {
      frontMatter = Object.assign(frontMatter, yamlFront.loadFront(`content/${pageName}.md`));
    }
    if (pageName === 'index') {
      app.get('/', (req, res, next) => {
        res.render(pageName, frontMatter);
      });

      app.get(`/${pageName}.html`, (req, res, next) => {
        res.render(pageName, frontMatter);
      });
    }
    app.get(`/${pageName}.html`, (req, res, next) => {
      res.render(pageName, frontMatter);
    });
  }
});
navigation = navigation.slice(0, -2);
navigation += ']\n---';
fs.writeFileSync('content/navigation.yml', navigation);

const server = http.createServer(app);

reload(app);

server.listen(3001, () => {
  console.log('we are listening on port 3001');
});
