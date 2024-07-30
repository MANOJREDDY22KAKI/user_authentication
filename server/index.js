import express from 'express';

import cors from 'cors';

import mongoose from 'mongoose';

import { PORT , Mongoose_url } from './config.js';

import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());

app.use(bodyParser.json())

app.use('/users',userRoutes)

mongoose.connect(Mongoose_url)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`server running at ${PORT}`)

        })
    })
    .catch((err)=>{
        console.log(err)
    })


