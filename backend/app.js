const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/db');
const routerUser = require('./routes/user');
const routerTest = require('./routes/test');
try {
    dbConnect()
} catch (error) {
    //Log to a file
    console.log(error)
}

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is alive!');
});

app.use('/users', routerUser);
app.use('/tests', routerTest);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});