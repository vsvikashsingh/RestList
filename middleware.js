import { restaurentSchema, reviewSchema } from './utils/schemas.js';
import ExpressError from "./utils/ExpressError.js";
import Restaurent from "./models/restaurent.js";
import Review from './models/reviews.js';


export const isLoggedIn = (req, res, next)=>{    
    req.session.returnTo = req.originalUrl;
    if(!req.isAuthenticated()){
        req.flash('error', 'You must be logged-in!')
        return res.redirect('/login')
    }
    next();
}

//server-side restaurent validator middleware function
export const validateRestaurent =(req, res, next)=>{
    const {error} = restaurentSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(',');
        
        throw new ExpressError(msg, 400)
    } else{
        next();
    }

}

//server-side review validator middleware function
export const validateReview =(req, res, next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=>el.message).join(',');
        
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
}

//authorization middleware
export const isAuthorized = async (req, res, next)=>{
    const {id} = req.params;
    const restaurent = await Restaurent.findById(id)
    if(!restaurent.author.equals(req.user._id)){
        req.flash('error', 'You dont have permission')
        return res.redirect(`/restaurent/${id}`)
    }
    next();
}

export const isReviewAuthor = async(req, res, next)=>{
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId)
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You dont have permission')
        return res.redirect(`/restaurent/${id}`)
    }
    next();
}