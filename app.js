const express = require('express');
const mongoose = require('mongoose');
const campground = require('./models/campground');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected.");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen('3000', () => {
    console.log('Serving on Port 3000');
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/makecampground', async (req, res) => {
    const camp = new campground({
        title : 'Untitled Campground',
        description : 'N/A'
    })
    await camp.save();
    res.send(camp);
})