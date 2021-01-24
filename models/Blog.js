const mongoose = require('mongoose');
const { Schema } = mongoose;

//title, body, photo, author, and tags
const blogSchema = new Schema({
    title : {
        type : String ,
        required : true ,
        maxLength : 20,
        minlength : 5
    },
    body : {
        type : String 
    },
    author :{
        type : Schema.Types.ObjectId ,
        ref : 'User'
    },
    photo :{
        type : String 
    } ,
    tags : [String]
   
});

const blog = mongoose.model('Blog', blogSchema);
module.exports =  blog;

  