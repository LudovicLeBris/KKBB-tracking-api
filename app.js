const express = require('express');
const path = require('path')
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const baseUrl = 'https://www.kisskissbankbank.com/fr/projects/';

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/amount/:project', async (req, res) => {
    const project = req.params.project;
    const url = baseUrl + project;
    const scrap = await fetch(url);
    const text = await scrap.text();
    const $ = await cheerio.load(text);
    const amount = await $('div.kiss-Intro__infoBlockLine > div:last > div:first').text();
    res.render('amount', { amount : amount, project: project});
});

app.use(({res}) => {
    const message = 'Unknown ressource, try an other url.';
    res.status(404).json({message});
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});