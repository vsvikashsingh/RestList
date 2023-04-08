import dotenv from 'dotenv';
if(process.env.NODE_ENV !=='production'){
    dotenv.config();
}

import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import localStrategy from 'passport-local';
import User from './models/users.js';
import mongoSanitize from 'express-mongo-sanitize';

import mongoStore from 'connect-mongo';

//fake requests
import methodOverride from 'method-override';
import ExpressError from './utils/ExpressError.js';
import Restaurent from './models/restaurent.js';
//router defined
import restaurentRoutes from './routes/restaurent.js';
import reviewRoutes from './routes/reviews.js';
import authRoutes from './routes/users.js';

//define __dirname
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';

//define layouts for webpages at diff routes
import layout from 'ejs-mate';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/rest-db'
 

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", ()=>{
    console.log("database connected...")
})

//change engine of ejs
app.engine('ejs', layout)

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));

const store = mongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24*3600
})

//store session error
store.on("error", function(e) {
    console.log("SESSION STORE ERROR", e)
})

//configuring session
const sessionConfig = {
    store,
    secret: 'bettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly:true,
        expires: Date.now() + 1000*60*60*24,
        maxAge: 1000*60*60*24*7
    }
}

app.use(session(sessionConfig));
app.use(flash());

//configure passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to make flash messages accessible from any template
app.use((req, res, next)=>{   
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})


app.get('/', (req, res)=>{
    res.render('home');
})

//use restaurent routes
app.use('/restaurent', restaurentRoutes);
app.use('/restaurent/:id/reviews', reviewRoutes);
app.use('/', authRoutes);

//serve static assets
app.use(express.static(path.join(__dirname, 'public')))
//prevent mongo injection
app.use(mongoSanitize);

//basic 404 route
app.all('*', (req, res, next)=>{
    next(new ExpressError('Page not found', 404));
})

//express error handler
app.use((err, req, res, next)=>{
    const {statusCode=500, message='this did not work'} =err;
    
    res.status(statusCode).render('error', {err});
})

app.listen(3000, ()=>{
    console.log('server running on port:3000');
});

