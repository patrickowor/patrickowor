const  express = require('express');

const cors = require('cors');
const process = require("process")
var bodyParser = require('body-parser');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
require('dotenv').config()
const app = express()

app.use(cors({ origin: '*'}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// cookie parser middleware
app.use(cookieParser());

app.get('/api/', async (req, res)=> {
    res.send("am alive")
})










app.use('/', express.static('./build'))

// Export the Express API
module.exports = app;