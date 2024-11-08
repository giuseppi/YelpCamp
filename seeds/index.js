const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected.");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground ({
            author : '638fcae2358283f6b82c79ad',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            image : 'https://source.unsplash.com/collection/483251',
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, ab, nostrum enim reiciendis voluptate doloribus excepturi deleniti quis minus tempore quo sed error placeat hic sapiente, corrupti aspernatur qui dolorem.',
            price : price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});