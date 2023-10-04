const express = require('express');
const router = express.Router();
const connectDatabase = require('../middlewares/connectDB');
const SchemaUser = require('../models/user');
const errorHandling = require('../functions/errorHandling');

router.post('/create', connectDatabase, async function(req, res, next) {
    try{
        // #swagger.tags = ['User']
        let {name, password} = req.body;
        const resDB = await SchemaUser.create({name, password});
  
        res.status(200).json({
            status: "OK",
            statusMensagem: "User created",
            response: resDB
        });
    }catch(error){
        return errorHandling(res, error);
    }
  });
  
  router.put('/edit/:id', connectDatabase, async function(req, res, next) {
    try{
        // #swagger.tags = ['User']
        let idUser = req.params.id;
        let {name, password} = req.body;
        const checkUser = await SchemaUser.findOne({ _id: idUser});
        if(!checkUser) {
            throw new Error("User not found.");
        }
  
        const updatedUser = await SchemaUser.updateOne({_id: idUser}, {name, password});
  
        if(updatedUser.modifiedCount > 0){
            const taskDate = await SchemaUser.findOne({_id: idUser});
            
            res.status(200).json({
                status: "OK",
                statusMensagem: "User updated successfully.",
                response: taskDate
            });
        }
    }catch(error){
        return errorHandling(res, error);
    }
  });
  
  router.get('/get-users', connectDatabase, async function(req, res, next) {
    try{
        // #swagger.tags = ['User']
        const resDB = await SchemaUser.find();
  
        res.status(200).json({
            status: "OK",
            statusMensagem: "Users listed in response successfully.",
            response: resDB
        });
    }catch(error){
        return errorHandling(res, error);
    }
  });
  
  router.get('/get-user/:id', connectDatabase, async function(req, res, next) {
    try{
        // #swagger.tags = ['User']
        let idUser = req.params.id;
  
        const checkUser = await SchemaUser.findOne({ _id: idUser});
        if(!checkUser) {
            throw new Error("User not found.");
        }
  
        const resDB = await SchemaUser.findOne({ _id: idUser});
  
        res.status(200).json({
            status: "OK",
            statusMensagem: "Users listed in response successfully.",
            response: resDB
        });
    }catch(error){
        return errorHandling(res, error);
    }
  });
  
  router.delete('/delete/:id', connectDatabase, async function(req, res, next) {
    try{
        // #swagger.tags = ['User']
        let idUser = req.params.id;
  
        const checkUser = await SchemaUser.findOne({ _id: idUser});
        if(!checkUser) {
            throw new Error("User not found.");
        }
  
        const resDB = await SchemaUser.deleteOne({ _id: idUser});
  
        res.status(200).json({
            status: "OK",
            statusMensagem: "User successfully deleted",
            response: resDB
        });
    }catch(error){
        return errorHandling(res, error);
    }
  });
  
  module.exports = router;