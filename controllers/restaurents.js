import Restaurent from '../models/restaurent.js';
import catchAsync from '../utils/catchAsync.js';

export const index = catchAsync(async (req, res, next)=>{
    const restaurents = await Restaurent.find({})
    res.render('restaurents/index', {restaurents});
})

export const restaurentAddForm = (req, res, next)=>{    
    res.render('restaurents/new')
}

export const postNewRestaurentForSave = catchAsync(async (req, res, next)=>{
    const restaurent = new Restaurent(req.body.restaurent)
    restaurent.author = req.user._id;
    await restaurent.save()
    req.flash('success', 'Successfully made a restaurent')
    res.redirect(`/restaurent/${restaurent._id}`)    
})

export const editRestaurent = catchAsync(async(req, res, next)=>{
    const restaurent = await Restaurent.findById(req.params.id)
    if(!restaurent){
        req.flash('error', 'Restaurent not found')
        return res.redirect('/restaurent')
    }
    res.render('restaurents/edit', {restaurent});
})

export const displayRestaurent = catchAsync(async (req, res, next)=>{
    await Restaurent.findByIdAndUpdate(req.params.id, {author: '642eff3fb3cccc71130fb185'})
    //populate review then its author then populate author of restaurent i.e. nested populate
    const restaurent = await Restaurent.findById(req.params.id).populate({path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    if(!restaurent){
    req.flash('error', 'Restaurent not found')
    return res.redirect('/restaurent');
    }
    res.render('restaurents/show', {restaurent})
})

export const updateRestaurent = catchAsync(async(req, res, next)=>{
    const {id} = req.params;
    const restaurent = await Restaurent.findByIdAndUpdate(id, {...req.body.restaurent}, {new : true})
    req.flash('success', 'Successfully edited a restaurent')
    res.redirect(`/restaurent/${restaurent._id}`)
})

export const deleteRestaurent = catchAsync(async(req, res, next)=>{
    const {id} = req.params
    await Restaurent.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted a restaurent')
    res.redirect('/restaurent');
})