import express from "express";
import {investorregisterController, startupregisterController, loginController, 
    testController, uploadfileController, detailsController, interestedController} from '../controllers/authController.js'
import { requireSignIn} from './../middlewares/authMiddleware.js';

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/investorregister', investorregisterController)

//REGISTER || METHOD POST
router.post('/startupregister', startupregisterController)

//LOGIN || POST
router.post('/login', loginController);

//file-upload
router.post('/upload-sales',uploadfileController)

//route to fetch startup details
router.get('/details',detailsController);

//Route to handle investor interestt
router.post('/interested', interestedController);

//Test routes
router.get('/test', requireSignIn, testController);

export default router