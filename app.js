const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const yamlFront = require('yaml-front-matter');
const fs = require('fs');

const app = express();
const indexFrontMatter = yamlFront.loadFront('content/index.md');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());

app.use('/static', express.static('public'));

const pages = fs.readdirSync(app.get('views'));

app.get('/', (req, res, next) => {
  res.render('index', indexFrontMatter);
});

pages.forEach((page) => {
  if (page.substr(page.length - 3) === 'pug' && page !== 'index.pug') {
    page = page.slice(0, -4);

    const frontMatter = yamlFront.loadFront(`content/${page}.md`);
    app.get(`/${page}.html`, (req, res, next) => {
      res.render(page, frontMatter);
    });
  }
});

app.listen(3001, () => {
  console.log('we are listening on port 3001');
});
