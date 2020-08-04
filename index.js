const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to MongoDB');
    }
);

//Import routes
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server started !'));
