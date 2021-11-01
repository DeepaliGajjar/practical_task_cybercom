const mongoose =  require('mongoose');

module.exports = categorySchema = new mongoose.Schema({
  name:{
    type:String
  },
  categoryId:{
    type:mongoose.Types.ObjectId,
    required:true
  },
  sku:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  created_at:{
    type: Date,
    default: Date.now
  }
})