const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors');

//import routes
const blogRoute = require('./routes/blog');
const userRoute = require('./routes/user');

//load config
dotenv.config({ path: '.env.development'})

//initialize app instance
const app = express();

//before use any middleware it executes
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:2400'
}));

// kind of middleware as routes get invoke the main logic write here
app.use('/blog', blogRoute);
app.use('/user', userRoute);

//routes
app.get('/', (req, res)=> {
    res.send('we are at home');
});

// db connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('connected to dbs')
})

//how to start listening to the server 

const PORT = process.env.PORT



app.listen(PORT, console.log(`connected port ${PORT}`))