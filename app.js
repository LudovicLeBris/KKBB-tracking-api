const express = require('express');
const path = require('path')
const morgan = require('morgan');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const baseUrl = 'https://www.kisskissbankbank.com/fr/projects/';

app.use(express.static('public'));

app.get('/:project/amount', async (req, res) => {
    const url = baseUrl + req.params.project;
    const scrap = await fetch(url);
    const text = await scrap.text();
    const $ = await cheerio.load(text);
    const amount = await $('div.kiss-Intro__infoBlockLine > div:last > div:first').text();
    res.render('index', { amount : amount});
});

app.use(({res}) => {
    const message = 'Unknown ressource, try an other url.';
    res.status(404).json({message});
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});