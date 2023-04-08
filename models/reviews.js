import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
    body: String,
    rating: Number,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}); 

export default mongoose.model('Review', reviewSchema);