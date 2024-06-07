const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
    origin: 'https://movie-shelf-nine.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};


app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json());
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/lists', listRoutes);


app.get("/", (req, res) => res.send("You are on Vercel"));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log(error));
console.log('Conneted to mongodb');

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});