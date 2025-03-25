const  express = require('express');

const cors = require('cors');
const process = require("process")
var bodyParser = require('body-parser');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const testimonials = require("./testimonials")
const projects = require("./projects")
const nodemailer = require('nodemailer');
const { resolve } = require('path');
require('dotenv').config()


const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'patrick.ikongha@gmail.com',
            pass: process.env.smtpassword,
         },
    secure: true,
    });





const app = express()

app.use(cors({ origin: '*'}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// cookie parser middleware
app.use(cookieParser());

app.get('/api/', async (req, res)=> {
    res.send("am alive")
})


app.get("/api/about", async(req, res)=> {
    var age =  new Date() -  new Date("2001-11-20")
     
    var myData = {
        age : parseInt(age / (1000 * 60 * 60 * 24 * 365)),
        degree : "Bachelor",
        phone : "+234 70644 22922",
        city : "Abeokuta, Nigeria",
        email : "patrick.ikongha@gmail.com",
        freelance : "Available",
        birthday : "20, Nov 2001",
    }
    res.json(myData)
})

app.get("/api/intrests", async(req, res)=> {
    var intrests = [
        ["Music", "ri-disc-line"],
        ["Writing", "ri-edit-fill"],
        ["Reading", "ri-calendar-todo-line"],
        ["History", "ri-ancient-gate-fill"],
        ["Mathematics","ri-pie-chart-fill"],
        ["Software Development", "ri-terminal-fill"],
        ["Poetry", "ri-file-list-3-line" ]
    ]
    res.json(intrests)
})

app.get("/api/testimonials", async(req, res)=> {
    res.json(testimonials)
})
app.get("/api/projects", async(req, res)=> {
        res.json(projects)
})
app.get("/api/projects/:id", async(req, res)=> {
    res.json(projects[Number(req.params.id)])
})

const contactHandler = async(req, res)=> {
    try {

        const mailData = {
            from: 'patrick.ikongha@gmail.com',  // sender address
              to: 'patrick.ikongha@gmail.com',   // list of receivers
              subject: "Portfolio message: " + req.body["subject"],
              text : `from :${req.body["name"]} : ${req.body["email"]} \n ${req.body["message"]}`,
              html: /* html */`
                <h1 style="color : #3898ec; text-align: center;">${req.body["subject"]}</h1>
                <p style="font-size : 20px; "> 
                    ${req.body["message"]} 
    
                    <br/>----------------------------------------------
                    <br/><small style="font-size : 12px; ">${req.body["name"]} <br/> ${req.body["email"]}</small>
                </p>
    
                `,
                
            };
        await new Promise((resolve, reject) =>transporter.sendMail(mailData, function (err, info) {
            if(err) reject(err)
            else resolve(info)       
        })).catch((error) => {
            console.log(error)
        });
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(200)
    }
    
}

app.post("/contact", contactHandler)
app.post("/api/contact", contactHandler)

app.use('/', express.static('./build'))

// Export the Express API
module.exports = app;
