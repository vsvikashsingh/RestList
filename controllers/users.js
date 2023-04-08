import User from "../models/users.js";
import catchAsync from "../utils/catchAsync.js";

export const userRegistrationForm = (req, res)=>{
    res.render('./users/register');
}

export const userRegistration = catchAsync(async (req, res, next)=>{
    try{
    const {username, email, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password)
    req.login(registeredUser, err=>{
        if(err) return next(err)
    req.flash('success', 'welcome to restaurent app')
    res.redirect('/restaurent')
    })  
} catch(e) {
    req.flash('error', e.message)
    res.redirect('/register')
}
})

export const loginForm = (req, res)=>{
    res.render('users/login');
}

export const userLogIn = (req, res)=>{
    req.flash('success', 'Welcome');    
    const redirectUrl = req.session.returnTo || '/restaurent'
    delete req.session.returnTo
    res.redirect(redirectUrl);
}

export const userLogOut = (req, res, next)=>{
    req.logout((err)=>{
        if(err) {
            return next(err)
        }
        req.flash('success', 'successfully logged-out')
        res.redirect('/restaurent')
    })   
}