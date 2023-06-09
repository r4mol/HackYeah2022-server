require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const { categoriesRouter } = require('./endpoints/category');
const { questionsRouter } = require('./endpoints/question');
const { testsRouter } = require('./endpoints/test');
const app = express();

app.use(bodyParser.json());

app.use(categoriesRouter);
app.use(questionsRouter);
app.use(testsRouter);

const start = async () => {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to database!');

    app.listen(process.env.PORT, () => {
        console.log(`App listening on port ${process.env.PORT}.`);
    });
};

start().catch((e) => console.error('Error while starting application.', e));