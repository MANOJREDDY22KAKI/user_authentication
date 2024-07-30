import bcrypt from 'bcrypt';

import mongoose from 'mongoose';

import express, { response } from 'express';

import user from '../models/userModel.js';

const RegisterUser = async (request,response)=>{
    const {email,password} = request.body;
    try{
        
        if(!email || !password){
            return response.status(400).send('please fill all details');
            console.log("please fill all the details")
        }

        const exist = await user.findOne({email});
        if(exist) {
            return response.status(400).send("already existed");

        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new user({email,password:hashPassword})
        await newUser.save();

        console.log("Registration success")

        console.log(newUser)
        response.status(200).send('user registration success')

    }
    catch (err) {
        response.status(500).send('internal Error')

    }
}

const LoginUser = async (request,response) =>{

    const {email,password} = request.body;
    try{
        if(!email || !password){
            console.log("pls fill all the details");
        }

        const exist = await user.findOne({email})
        if(!exist){
            return response.status(400).send("Invalid Credentials")
        }

        const match = await bcrypt.compare(password,exist.password);
        if(!match){
            return response.status(400).send("Invalid Credentials")
        }
        console.log("login sucessful")

        response.status(200).send('login success')
    }catch(err){
        console.log(err)
        response.status(500).send('internal Error')
    }
}

export {RegisterUser,LoginUser}