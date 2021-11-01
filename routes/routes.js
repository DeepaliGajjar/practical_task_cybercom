const express = require("express");
const router = express.Router();
const helper = require('../helpers/helpers');
const multer = require('multer');
const upload = multer({dest:'public/'})

router.route('/api/category/createCategory')
  .post(helper.createCategory)

router.route('/api/category/updateCategory/:_id')
  .put(helper.updateCategory)

router.route('/api/category/deleteCategory/:_id')
  .delete(helper.deleteCategory)

router.route('/api/products/createProduct')
  .post(upload.any(),helper.createProduct)

router.route('/api/products/updateProduct/:_id')
  .put(upload.any(),helper.updateProduct)

router.route('/api/products/deleteProduct/:_id')
  .delete(helper.deleteProduct)

module.exports = router;