import catchAsync from "../utils/catchAsync.js";
import Restaurent from '../models/restaurent.js';
import Review from '../models/reviews.js';

export const createReviews = catchAsync(async (req, res, next)=>{
    const restaurent = await Restaurent.findById(req.params.id);
    const review = new Review(req.body.review)
    review.author = req.user._id;
    restaurent.reviews.push(review)
    await review.save()
    await restaurent.save();
    req.flash('success', 'successfully made a review')
    res.redirect(`/restaurent/${restaurent._id}`);
})

export const deleteReviews = catchAsync(async (req, res, next)=>{
    const {id, reviewId} = req.params;
    await Restaurent.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review')
    res.redirect(`/restaurent/${id}`);
})