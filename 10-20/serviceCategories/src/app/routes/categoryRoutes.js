/*
CRUD CATEGORIES
*/
const router = require('express').Router();
const Category = require('../models/category'); 
var VerifyToken= require('./VerifyToken');



let logger = require('../../config/log');
const verifyToken = require('./VerifyToken');


//lista de catgegorias
router.get("/categories",VerifyToken,(req, res) => {

  const filter = {
    id,
    name,
    description,
    limit
  } = req.query;

  Category.searchCategory(filter, (err, data) => {
    res.json(data);
  });
});


//Crear Categoria
router.post("/categories",VerifyToken ,(req, res) => {
  logger.info("Begin insert category");
  const categoryData = {
    id: null,
    name: req.body.name,
    description: req.body.description
  };
  Category.insertCategory(categoryData, (err, data) => {
    Category.find( data.insertId.insertId , (err, data2) => {
      res.json(data2);
    });
  });
  logger.info("End insert category");

});

//Leer Categoria especifica
router.get("/categories/:id",VerifyToken, (req, res) => {
  logger.info("Begin list category");
  
  Category.find( req.params.id , (err, data) => {
    res.json(data);
  });
  logger.info("End list category");
});

//UPDATE - Category
router.put("/categories/:id",VerifyToken ,(req, res) => {
  logger.info("Begin update category");
  const categoryData = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description
  };
  Category.updateCategory(categoryData,VerifyToken ,(err, data) => {
    if (data && data.msg) {
      Category.find( data.id , (err, data2) => {
        res.json(data2);
      });
      logger.info("Category updated");
    } else {
      res.json({
        success: false,
        "msg": "error"
      })
      logger.info("The category was not updated");
    }
  })
  logger.info("End update category");
});

//DELETE - Category
router.delete("/categories/:id",VerifyToken  ,(req, res) => {
  logger.info("Begin delete category");
  Category.deleteCategory(req.params.id, (err, data) => {
    if (data && data.msg === 'deleted') {
      res.json({
        success: true,
        data: data
      })
      logger.info("Category deleted");
    } else {
      res.status(500).json({
        "msg": "error"
      })
      logger.info("The category was not deleted");
    }
  });
  logger.info("End delete category");
});

module.exports = router;