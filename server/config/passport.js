const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/userModel");

passport.use(new LocalStrategy(
    { usernameField: "email" },
    function (email, password, done) {
        // User tries to sign in, passport will look for a matching user
        userModel.findOne({ email }).then(dbUser => {
            // If the email is incorrect
            if (!dbUser) {
                return done(null, false, {
                    message: "There's no user with that email."
                });
            }
            // If the email is right but the password is wrong
            if (!dbUser.comparePassword(password)) {
                return done(null, false, {
                    message: "That password is invalid."
                });
                //If everything is right, return the user data
            }
            done(null, dbUser);
        }).catch(err => {
            done(err);
        })
    }
));

// Restore/remember authentication state across the HTTP requests during the user's session
// Serializing/deserializing the user data needs to happen
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id)
        .then(user => {
            done(null, user)
        })
        .catch(err => {
            return done(err)
        });
});

//Exporting the passport configuration for use in the server
module.exports = passport;