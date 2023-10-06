import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import mongoose from "mongoose";
import User from "../models/user.js";
import keys from "../config/keys.js";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClentScrect,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(`Access Token : ${accessToken} , 
          refreshToken : ${refreshToken},
          Profile : ${JSON.stringify(profile)},
          Done  : ${done}
        `);

      try {
        const users = await User.find({ googleId: profile.id }).lean().exec();
        console.log(`The  avaliable use is ${users}`);
        if (users && users.length > 0) {
          console.log(`User already exist in the database`);
          done(null, users[0]);
        } else {
          const newUsers = await User.create({
            googleId: profile.id,
          });

          console.log(newUsers);
          done(null, newUsers);
        }
      } catch (error) {
        console.log(`Error while inserting the records ${error}`);
      }
    }
  )
);
