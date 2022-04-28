const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { users } = require('./api/models');
const UserService = require('./api/services/UserServices');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/api/social/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {

        try {
            const email = profile.emails[0].value;
            const isUser = await UserService.isUser(email);
            var user;

            if (isUser) {
                user = await users.findOne({ where: { email: email, isDelete: false } });
            }

            else {
                const password = await bcrypt.hash("social-password", 12);
                user = await users.create({
                    name: profile.displayName,
                    email: email,
                    password: password
                });
            }

            return done(null, user);

        } catch (e) {
            return done(e);
        }
    }
));

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/api/social/facebook/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            const email = profile.username + "@facebook.com";
            const isUser = await UserService.isUser(email);
            var user;

            if (isUser) {
                user = await users.findOne({ where: { email: email, isDelete: false } });
            }

            else {
                const password = await bcrypt.hash("social-password", 12);
                user = await users.create({
                    name: profile.displayName,
                    email: email,
                    password: password
                });
            }

            return done(null, user);

        } catch (e) {
            return done(e);
        }
    }
));
