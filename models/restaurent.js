import mongoose from "mongoose";
import Review from './reviews.js';
//shortcut for referencing mongoose.Schema later in
const Schema = mongoose.Schema;

const RestaurentSchema = new Schema({
    title: String,
    price: Number,
    rating: String,
    address: String,
    cuisine:String,
    location: String,
    image: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});
//mongoose query middleware
//note- findOneAndDelete works only with findByIdAndDelete method of mongoose
RestaurentSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

export default mongoose.model('Restaurent', RestaurentSchema);

