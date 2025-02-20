require('dotenv').config()
require("express-async-errors")
require('./config/passport')

const express = require("express")
const app = express()
const connectDB = require("./db/connect")
const cookieParser = require("cookie-parser")
const cors = require('cors');
const passport = require('passport')
const session = require('express-session')
const User = require('./models/user')

// Essential Middlwares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin: ['http://localhost:5173', 'https://real-estate-theta-neon.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header', 'Access-Control-Allow-Credentials'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,  
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000
    }
}))

// Passport Initialization
app.use(passport.initialize())
app.use(passport.session())

// Routers
const listPropertyFormRouter = require('./routes/list-property-form')
const propertiesRouter = require('./routes/properties')
const authRouter = require('./routes/auth')

// Custom Middlewares
const notFoundMiddleware = require("./middleware/not-found-middleware")
const errorHandlerMiddleware = require('./middleware/error-handler-middleware')
const authenticationMiddleware = require("./middleware/authentication")
const { StatusCodes } = require('http-status-codes')
const user = require('./models/user')


//Routes
app.get("/", (req, res) => res.send("<h1>Real Estate API</h1><a href='/auth/google'>Login with Google</a>"))
app.use("/api/v1/list-property-form",authenticationMiddleware, listPropertyFormRouter)
app.use("/api/v1/properties", propertiesRouter)
app.use("/api/v1/auth", authRouter)

// Googl Oauth
app.get("/auth/google", passport.authenticate('google', { scope: ["email", "profile"]}))
app.get("/auth/google/callback", passport.authenticate('google', {
    successRedirect: "http://localhost:5173/user-profile",
    failureRedirect: '/auth/failure'
}))
app.get("/googleProtected", (req, res) => res.send("<h1>Oauth success</h1>" + JSON.stringify(req.user)))
app.get("/protected", authenticationMiddleware, (req, res) => res.send("Protected"))
app.get("/auth/failure", (req, res) => res.send("<h1>Oauth failure</h1>" + JSON.stringify(req.user)))
app.get("/auth/check", authenticationMiddleware, (req, res) => {
    if(req.isAuthenticated() && req.user) {
        return res.json({ isLoggedIn: true, user: req.user });
    }
    if (req.cookies?.token) {
        return verifyJWT(req, res, () => {
            return res.json({ isLoggedIn: true, user: req.user });
        });
    }
    res.json({ user: null, isLoggedIn: false });
})


app.get("/auth/userInfo", authenticationMiddleware, async(req, res) => {
    res.status(StatusCodes.OK).json({user: req.user})
})
app.get("/auth/logout", (req, res) => {
    console.log("In Logout")
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path:'/'
    })
    req.logout(err => {
        if(err){
            return next(err);
        }
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            console.log("Cookies and session destroyed!!")
            res.json({msg: "Logged Out Successfully"})
        })
    })
})

//Custom Middlewares (Using)
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
