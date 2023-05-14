import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import dotenv from "dotenv";
import { createUserGoogle, getUserByEmail } from "@/services/user.services";

dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new passportGoogle.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await getUserByEmail(profile.emails?.[0].value);

      if (!user) {
        const newUser = await createUserGoogle({
          email: profile.emails?.[0].value,
          username: profile.displayName,
        });

        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )
);
