const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
require('dotenv').config();
// const dbUrl = "mongodb+srv://mohitkhandelwal290:WRTm8Km2L0LfXrdC@cluster0.us2md44.mongodb.net/?retryWrites=true&w=majority"; // Replace with your actual database URL
const Listing = require("./models/listing.js");
const Order = require("./models/order.js");
const multer = require('multer')
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });
const session = require("express-session");
const MongoStore=require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const { isLoggedIn } = require("./utils/middleware.js")
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const userRout = require('./routes/user.js');
const menuRout = require('./routes/listing.js');
const orderRout = require('./routes/order.js');
const reviewRout = require('./routes/review.js');
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line for JSON parsing
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));


const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:"SECRET",
    },
    touchAfter:24*3600,


});

store.on("error",()=>{
    console.log("Error in Mongo STORE",err);
});

// Session Configuration
const sessionOptions = {
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// Passport Configuration
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

// MongoDB Connection
main().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.error("Error connecting to DB:", err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

// Set local variables middleware
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.email = req.user ? req.user.email : null;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Routes
app.use("/", userRout, orderRout, reviewRout);
app.use('/menu', menuRout);


// app.use("", orderRout);
// Home
app.get("/home", (req, res) => {
    res.render("listings/home1.ejs");
});


// Error Handling Middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

// 404 Not Found Middleware
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Start the server
app.listen(8000, () => {
    console.log("Server is listening on port 3000");
});
