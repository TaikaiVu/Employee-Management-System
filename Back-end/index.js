const mongoose = require("mongoose")
const express = require("express")
const app = express()


// get resolver and type defnition to init server
const resolvers = require("./resolvers")
const typeDefs = require("./typeDefs")

// Apollo server setup
const {ApolloServer, gql} = require("apollo-server-express")


// GraphQL setup

var {graphqlHTTP} = require("express-graphql")
var {buildSchema} = require("graphql")

// get mongodb model

const Employee = require('./models/Employees')
const User = require('./models/Users')

// MongoDB Connection

const SERVER_PORT = process.env.PORT || 8000

const DB_CONNECTION_STRING = "mongodb+srv://vudangdaiduong:Taikai1201@assignment1.ij06984.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority";

mongoose.connect(DB_CONNECTION_STRING)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));


// Apollo server initialization
const server = new ApolloServer({typeDefs, resolvers})

async function startServer(){
    await server.start();

    // Apply to run in express
    server.applyMiddleware({ 
        app,
        path: '/graphql' 
    });
    app.listen(SERVER_PORT, () => {
        console.log(`Server port running at: http://localhost:${SERVER_PORT}`)
    })
    
}

startServer()








