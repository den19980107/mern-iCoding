const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const passport = require("passport");
const bodyParser = require('body-parser')
const authRoutes = require("./routes/auth-routes");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // parse cookie header
const expressValidator = require('express-validator');

// connect to mongodb
mongoose.connect(keys.MONGODB.MONGODB_URI, () => {
  console.log("connected to mongo db");
});

app.use(
  cookieSession({
    name: "session",
    keys: [keys.SESSION.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
);

// middleware
// parse cookies
app.use(cookieParser());
// express validator
app.use(expressValidator())
// body parser
app.use(bodyParser.json({ limit: '50mb' }));

// initalize passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport-setup')(passport)
// deserialize cookie from the browser

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// set up routes
app.use("/auth", authRoutes);
app.use('/user', require('./routes/user'))


// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));
