import Joi from 'joi';

export const restaurentSchema = Joi.object({
    restaurent: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        rating: Joi.number().required(),
        image: Joi.string(),
        address: Joi.string().required(),
        cuisine: Joi.string(), 
        location: Joi.string()
    }).required()
})

export const reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required()
    }).required()
})

