import express from 'express';
//import { storage, cloudinary} from '../cloudinary/index.js';

//file upload parser middleware
//import multer from 'multer';
//const upload = multer({dest: 'uploads/'})

//server-side validation schema(joi)
import {isAuthorized, validateRestaurent} from '../middleware.js';
import { isLoggedIn } from '../middleware.js';

const router = express.Router();

//controller imports
import { deleteRestaurent, displayRestaurent, editRestaurent, index, postNewRestaurentForSave, restaurentAddForm, updateRestaurent } from '../controllers/restaurents.js';

//restaurent list
router.get('/',index)

//post form data for save
router.post('/', validateRestaurent, postNewRestaurentForSave);

//form to add new restaurent
router.get('/new', isLoggedIn, restaurentAddForm)

//edit a restaurent
router.get('/:id/edit', isLoggedIn, isAuthorized, editRestaurent)

//dispaly individual restaurent 
router.get('/:id', displayRestaurent);

//update restaurent
router.patch('/:id', validateRestaurent, isAuthorized, updateRestaurent)

//delete restaurent
router.delete('/:id', isLoggedIn, isAuthorized, deleteRestaurent)

export default router;