const mongoose  = require("mongoose")
const express = require("express")
const usersRoute = require("./routes/UserRoutes")
const employeeRoute = require("./routes/EmployeeRoutes")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const cors = require("cors")

// cross origin config

app.use(cors())

const SERVER_PORT = process.env.PORT || 8000


const DB_CONNECTION_STRING = "mongodb+srv://vudangdaiduong:Taikai1201@assignment1.ij06984.mongodb.net/comp3123_assignment?retryWrites=true&w=majority";

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.route("/").get((req, res) => {
    res.send("<h1>hello</h1>")
})

app.use("/api/v1/user", usersRoute)
app.use("/api/v1/emp", employeeRoute)


app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}`)
})



