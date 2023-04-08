
import express from 'express';
const router = express.Router({mergeParams: true});

//server-side joi validator middleware for reviews
import { validateReview, isReviewAuthor } from '../middleware.js';

//import login middleware and controllers
import { isLoggedIn } from '../middleware.js';
import { createReviews, deleteReviews } from '../controllers/reviews.js';

//all reviews
router.post('/', isLoggedIn, validateReview, createReviews)

//delete reviews
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, deleteReviews)

export default router;