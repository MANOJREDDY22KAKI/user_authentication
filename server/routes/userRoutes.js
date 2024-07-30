import express from 'express';
import mongoose from 'mongoose';
import user from '../models/userModel.js';
import { RegisterUser , LoginUser } from '../controllers/userController.js';

const router =  express.Router()

router.post('/register',RegisterUser);

router.post('/login',LoginUser);

export default router;