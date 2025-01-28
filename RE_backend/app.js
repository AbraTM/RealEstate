require('dotenv').config()
require('express-async-errors')

const express = require("express")
const app = express()
const connectDB = require("./db/connect")
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header']
};
app.use(cors(corsOptions));
app.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(204).end();
});


const listPropertyFormRouter = require('./routes/list-property-form')
const propertiesRouter = require('./routes/properties')

const notFoundMiddleware = require("./middlware/not-found-middleware")
const errorHandlerMiddleware = require('./middlware/error-handler-middleware')
//Middlwares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Routes
app.use("/api/v1/list-property-form", listPropertyFormRouter)
app.use("/api/v1/properties", propertiesRouter)

//Custom Middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
        process.exit(-1)
    }
}

start()
