const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://FarziKumar:farzi123456789@cluster0.svwae.mongodb.net/sampledata?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

app.use((req, res, next) => {
    console.log('Request received!');
    next();
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/pose', (req, res, next) => {
    //console.log("Hello "+ JSON.stringify(req.body));
    // console.log(req.body[0]);
    let data = req.body[0];
    console.log(req.body)
    const db = mongoose.connection;
    db.collection('posenet').insertOne(data, (err, res) => {
        if(err) console.log(err);
        else{
            console.log("Data added: " + data);
        }
    });
    res.status(201).json({
        message: 'Thing created successfully!'
    });
    console.log('Thing created successfully!');
});

app.use('/api/lastPose', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'My first thing',
            description: 'All of the info about my first thing',
            imageUrl: '',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'My second thing',
            description: 'All of the info about my second thing',
            imageUrl: '',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    // const stuff = db.collection('posenet').find().limit(1);
    console.log(stuff)
    res.status(200).json(stuff);
    console.log('Response sent successfully!');
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Your request was successful!' });
    next();
});

app.use((req, res, next) => {
    console.log('Response sent successfully!');
});

module.exports = app;