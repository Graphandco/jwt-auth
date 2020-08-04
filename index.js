const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const cors = require('cors');

dotenv.config();

//Import routes
const authRoute = require('./routes/auth');
const protectedRoute = require('./routes/protected');

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('** Connected to MongoDB **');
    }
);

//Middleware
app.use(cors());
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/protected', protectedRoute);

app.listen(3000, () => console.log('** Server started **'));
