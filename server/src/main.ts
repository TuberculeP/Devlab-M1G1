import dotenv from "dotenv";
import path from "path";
import express from "express";
import next from "next";
import { pgConnect } from "./config/db.config";
import { initializePassport } from "./config/passport.config";
import router from "./routes";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
// DEVONLY - Utile pour la partie scannette en local
import https from "https";
import fs from "fs";

// Load environment variables
const dev = process.env.NODE_ENV !== "production";
dotenv.config({
  path: [
    path.resolve(__dirname, `${dev ? "../" : ""}../.env.local`),
    path.resolve(__dirname, `${dev ? "../" : ""}../.env`),
  ],
});

// Init all configs
pgConnect();
initializePassport();

const { SESSION_SECRET } = process.env;

if (!SESSION_SECRET) {
  throw new Error("Please provide all the required environment variables");
}

// Next.js initialization
const app = next({ dev });
const handle = app.getRequestHandler();

// Express.js initialization
const server = express();
server
  .use(cookieParser())
  .use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  )
  .use(express.json())
  .use(passport.initialize())
  .use(passport.session());

// Express.js routing
server.use("/public", express.static(path.join(__dirname, "public")));
server.use(router);

// Start the server
app.prepare().then(() => {
  // Express.js routes and middleware go here
  server.use("/admin", (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }
    next();
  });

  // nextjs
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Comment if you want to use HTTP
  // server.listen(3000, () => {
  //   console.log("> Ready on http://localhost:3000");
  // });

  // DEVONLY - Utile pour la partie scannette en local
  const sslOptions = {
    key: fs.readFileSync("localhost.key"),
    cert: fs.readFileSync("localhost.crt"),
  };
  // Lancer le serveur HTTPS
  https.createServer(sslOptions, server).listen(3000, () => {
    console.log("HTTPS Server running at https://localhost:3000");
  });
});
