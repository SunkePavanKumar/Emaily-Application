import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import keys from "../config/keys.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClentScrect,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(`Access Token : ${accessToken} , 
          refreshToken : ${refreshToken},
          Profile : ${JSON.stringify(profile)},
          Done  : ${done}
        `);
    }
  )
);
