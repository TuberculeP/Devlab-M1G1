import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import usersService from "../domains/users/users.service";
import type { PgUser } from "../../../types/users";

function initializePassport() {
  const { GOOGLE_AUTH_CLIENT, GOOGLE_AUTH_SECRET, EXPRESS_URL } = process.env;

  if (!GOOGLE_AUTH_CLIENT || !GOOGLE_AUTH_SECRET || !EXPRESS_URL) {
    throw new Error("Please provide all the required environment variables");
  }

  // access passport login via /auth/google
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_AUTH_CLIENT,
        clientSecret: GOOGLE_AUTH_SECRET,
        callbackURL: `${EXPRESS_URL}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user: PgUser = await usersService.findOrCreateGoogleUser(
            profile
          );
          done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );

  // access pasport login via /auth/local
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, callback) => {
        try {
          const user = await usersService.findLocalUser({
            email,
            password,
          });
          callback(null, user);
        } catch (err) {
          callback(err, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, (user as PgUser).id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await usersService.findById(id);
      delete user.password;
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
}

export { initializePassport };
