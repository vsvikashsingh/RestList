import {dbUrl} from '../app.js'

import mongoose from 'mongoose';
import Restaurent from '../models/restaurent.js';
import restaus from './restList.js';

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", ()=>{
    console.log("database connected...")
})
//seed data in rest-db independentally from restList
const seedDB = async ()=>{
    await Restaurent.deleteMany({});
    for (let k in restaus){
        
            const rest = new Restaurent({title: `${restaus[k]["Restaurant Name"]}`,
            author:'642eff3fb3cccc71130fb185',
        price: `${restaus[k]["Average Cost for two"]}`, 
    rating: `${restaus[k]["Aggregate rating"]}`,
address:`${restaus[k]["Address"]}`,
location:`{lat : ${restaus[k]["Latitude"]}, lon : ${restaus[k]["Longitude"]}}`,
cuisine: `${restaus[k]["Cuisines"]}`
// image:'C:\Users\vikashvssingh\Desktop\yelpcamp\RestaurentApp\images\istockphoto-868408746-170667a.jpg'
})

            await rest.save();
        }
    }

seedDB();