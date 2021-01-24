const Blog = require('../models/Blog') ;

const create = (blog) => Blog.create(blog) ;

const getAll = () => Blog.find({}).exec() ;

const getMyProfile = (query) => Blog.find(query).exec() ;

const getById = (id) => Blog.findById(id).exec() ;

const editOne = (id,editid, body) => Blog.updateOne({$and :[{_id:editid},{author:id}]},{$set : body}).exec() ;

const searchByTag = (tags) => Blog.find({tags}).exec() ;

const searchByTitle = (title) => Blog.find({title}).exec() ;

const deleteBlog = (id,deletedid) => Blog.find( {$and :[{_id:deletedid},{author:id}]} ).remove() ;


module.exports = {
  create,
  getAll,
  getById,
  editOne,
  searchByTag,
  searchByTitle,
  deleteBlog,
  getMyProfile
 
};
