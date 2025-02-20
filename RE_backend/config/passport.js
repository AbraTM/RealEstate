const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const user = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try{
        const existingUser = await User.findOne({ googleID: profile.id})
        if(existingUser){
            return done(null, existingUser)
        }
        const newUser = User({
            name: profile.displayName,
            email: profile.emails[0].value,
            isGoogleAuth: true,
            googleID: profile.id
        })
        await newUser.save()
        done(null, newUser)
    }catch(error){
        console.log(error)
        done(error, null)
    }
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.googleID)
})

passport.deserializeUser(async function(googleID, done) {
    try {
      const userData = await User.findOne({ googleID })
      if(!userData){
        return done(null, false)
      }
      done(null, userData)
    } catch (error) {
      done(error, null)
    }
})