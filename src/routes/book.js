const express = require('express');
const router = express.Router();
const connectDatabase = require('../middlewares/connectDB');
const SchemaBook = require('../models/book');
const errorHandling = require('../functions/errorHandling');


router.post('/create', connectDatabase, async function(req, res, next) {
  try{
      // #swagger.tags = ['Book']
      let {title,synopsis, pages, isbn, publisher, img} = req.body;
      const resDB = await SchemaBook.create({title,synopsis, pages, isbn, publisher, img});

      res.status(200).json({
          status: "OK",
          statusMensagem: "Book created",
          response: resDB
      });
  }catch(error){
      return errorHandling(res, error);
  }
});

router.put('/edit/:id', connectDatabase, async function(req, res, next) {
  try{
      // #swagger.tags = ['Book']
      let idBook = req.params.id;
      let {title,synopsis, pages, isbn, publisher, img} = req.body;
      const checkBook = await SchemaBook.findOne({ _id: idBook});
      if(!checkBook) {
          throw new Error("Book not found.");
      }

      const updatedBook = await SchemaBook.updateOne({_id: idBook}, {title,synopsis, pages, isbn, publisher, img});

      if(updatedBook.modifiedCount > 0){
          const taskDate = await SchemaBook.findOne({_id: idBook});
          
          res.status(200).json({
              status: "OK",
              statusMensagem: "Book updated successfully.",
              response: taskDate
          });
      }
  }catch(error){
      return errorHandling(res, error);
  }
});

router.get('/get-books', connectDatabase, async function(req, res, next) {
  try{
      // #swagger.tags = ['Book']
      const resDB = await SchemaBook.find();

      res.status(200).json({
          status: "OK",
          statusMensagem: "Books listed in response successfully.",
          response: resDB
      });
  }catch(error){
      return errorHandling(res, error);
  }
});

router.get('/get-book/:id', connectDatabase, async function(req, res, next) {
  try{
      // #swagger.tags = ['Book']
      let idBook = req.params.id;

      const checkBook = await SchemaBook.findOne({ _id: idBook});
      if(!checkBook) {
          throw new Error("Book not found.");
      }

      const resDB = await SchemaBook.findOne({ _id: idBook});

      res.status(200).json({
          status: "OK",
          statusMensagem: "Books listed in response successfully.",
          response: resDB
      });
  }catch(error){
      return errorHandling(res, error);
  }
});

router.delete('/delete/:id', connectDatabase, async function(req, res, next) {
  try{
      // #swagger.tags = ['Book']
      let idBook = req.params.id;

      const checkBook = await SchemaBook.findOne({ _id: idBook});
      if(!checkBook) {
          throw new Error("Book not found.");
      }

      const resDB = await SchemaBook.deleteOne({ _id: idBook});

      res.status(200).json({
          status: "OK",
          statusMensagem: "Book successfully deleted",
          response: resDB
      });
  }catch(error){
      return errorHandling(res, error);
  }
});

module.exports = router;