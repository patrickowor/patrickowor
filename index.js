const host = "0.0.0.0"
const port = process.env.port||4000

const app = require("./main.js")


app.listen(port,host,  ()=>{
    console.log(`running server at http://${host}:${port}`)
    console.log(`running server at http://192.168.86.86:${port}`)
})