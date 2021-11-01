const mongoose = require('mongoose');
const categorySchema = require('../models/categoryModel');
const categories = mongoose.model('categories',categorySchema);
const productSchema = require('../models/productModel');
const products = mongoose.model('products',productSchema);

async function createCategory(req,res){
  try{
    let valid = validCategory(req.body)
    let category = req.body;
    if(valid){
      categories.insertMany(category).then(data=>{
        res.json({
          code:200,
          message:"Successfully created!",
          data:data
        })
      }).catch(err => {
        if(err){
          console.log("error in create category => ", err);
          res.json({
            code:500,
            message:"Something went wrong",
            data:{}
          })
        }
      })
    }
    else{
      res.json({
        code: 200,
        message:"Category Details must be provided"
      })
    }
  }
  catch(exception){
    console.log("(inside catch)error in create category =>",exception);
    res.json({
      code:500,
      message:"Something went wrong",
      data:{}
    })
  }
}

async function updateCategory(req,res){
  try{
    let id = req.params._id;
    let query = {
      _id:mongoose.Types.ObjectId(id)
    }
    let updateQuery = {
      name:req.body.name
    }
    categories.findOneAndUpdate(query,updateQuery).then(data=>{
      res.json({
        code:200,
        message:"Successfully updated!",
        data:data
      })
    }).catch(err => {
      if(err){
        console.log("error in update category => ", err);
        res.json({
          code:500,
          message:"Something went wrong",
          data:{}
        })
      }
    })
  }
  catch(exception){
    console.log("(inside catch)error in update category =>",exception);
    res.json({
      code:500,
      message:"Something went wrong",
      data:{}
    })
  }
}

async function deleteCategory(req,res){
  try{
    let id = req.params._id;
    let query = {
      _id:mongoose.Types.ObjectId(id)
    }
    categories.remove(query).then(data=>{
      res.json({
        code:200,
        message:"Successfully deleted!",
        data:{}
      })
    }).catch(err => {
      if(err){
        console.log("error in delete category => ", err);
        res.json({
          code:500,
          message:"Something went wrong",
          data:{}
        })
      }
    })
  }
  catch(exception){
    console.log("(inside catch)error in delete category =>",exception);
    res.json({
      code:500,
      message:"Something went wrong",
      data:{}
    })
  }
}

async function createProduct(req,res){
  try{
    let valid = validProduct(req.body)
    if(valid){
      let product = req.body;
      let image = req.files[0].filename +'/'+ req.files[0].originalname
      let productsku = await products.findOne({},{sku:1}).sort({created_at:-1})
      let new_productsku

      if(productsku){
        let product_code = productsku.sku.replace('PROD',"")
        new_productsku = (productsku.sku ? (parseInt(product_code) + 1) : 1).toString().padStart(5, '0');
        new_productsku = 'PROD' + new_productsku
      }
      product['sku'] = productsku ? new_productsku : "PROD00001"
      product['image'] = image
      products.insertMany(product).then(data=>{
        res.json({
          code:200,
          message:"Successfully created!",
          data:data
        })
      }).catch(err => {
        if(err){
          console.log("error in create category => ", err);
          res.json({
            code:500,
            message:"Something went wrong",
            data:{}        
          })
        }
      })
    }
    else{
      req.json({
        code:200,
        message:"Enter valid details",
        data:{}
      })
    }
  }
  catch(exception){
    console.log("(inside catch)error in create category =>",exception);
    res.json({
      code:500,
      message:"Something went wrong",
      data:{}
    })
  }
}

async function updateProduct(req,res){
  try{
    let id = req.params._id;
    let query = { 
      _id:mongoose.Types.ObjectId(id)
    }
    let updateQuery = req.body
    if(req.files){
      let image = req.files[0].filename +'/'+ req.files[0].originalname
      updateQuery['image'] = image
    }
    products.findOneAndUpdate(query,updateQuery).then(data=>{
      res.json({
        code:200,
        message:"Successfully updated!",
        data:data
      })
    }).catch(err => {
      if(err){
        console.log("error in update product => ", err);
        res.json({
          code:500,
          message:"Something went wrong",
          data:{}
        })
      }
    })
  }
  catch(exception){
    console.log("(inside catch)error in update product =>",exception);
    res.json({
      code:500,
      message:"Something went wrong",
      data:{}
    })
  }
}

async function deleteProduct(req,res){
  try{
    let id = req.params._id;
    let query = {
      _id:mongoose.Types.ObjectId(id)
    }
    products.remove(query).then(data=>{
      res.json({
        code:200,
        message:"Successfully deleted!",
        data:{}
      })
    }).catch(err => {
      if(err){
        console.log("error in delete product => ", err);
        res.json({
          code:500,
          message:"Something went wrong",
          data:{}
        })
      }
    })
  }
  catch(exception){
    console.log("(inside catch)error in delete product =>",exception);
    res.json({
      code:500,
      message:"Something went wrong",
      data:{}
    })
  }
}

async function validCategory(data){
  if(data){  
    return true
  }
  else{
    return false
  }
}

async function validProduct(data){
  if(data){  
    if(!data.name || !data.categoryId || !data.price || !data.image){
      res.json({
        code : 200,
        message : "Enter Valid Details"
      })
    }
    return true
  }
  else{
    return false
  }
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct
}
