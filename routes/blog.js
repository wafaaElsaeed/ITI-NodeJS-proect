const express = require('express');
const {
  create, getAll, getById, editOne, searchByTag, searchByTitle , deleteBlog , getMyProfile
} = require('../controllers/blog');
const router = express.Router();

const multer = require('multer') ;
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req ,file ,cb){
      cb(null, 'images/')
    },
    filename: function(req ,file ,cb){
      cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage : storage});

router.post('/',upload.single('photo'), async( req ,res ,next)=>{
  const { body, user: { id } } = req ;
  const _file = req.file.filename ;
  try {
    const blog = await create({...body,photo:_file,author: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

/*router.post('/',async( req ,res ,next)=>{
  const { body, user: { id } } = req;
  try {
    const blog = await create({ ...body ,author: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});*/


router.get('/', async (req, res, next) => {
    const { user: { id } } =  req ;
    try {
      const blogs = await getAll({ userId: id });
      res.json(blogs);
    } catch (e) {
      next(e);
    }
  });
  
  router.get('/myprofile', async (req, res, next) => {
    const {user: {id}} = req;
    try {
      const blog = await getMyProfile({author : id});
      res.json(blog);
    } catch (e) {
      next(e);
    }
  }); 

   router.get('/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const blog = await getById(id);
      res.json(blog);
    } catch (e) {
      next(e);
    }
  }); 

  router.patch('/:editid', async (req, res, next) => {
    const { user:{id} ,params: { editid }, body } = req;
    try {
      const blog = await editOne(id,editid, body);
      res.json(blog);
    } catch (e) {
      next(e);
    }
  });
  
  router.get('/tags/:tags', async (req, res, next) => {
    const { params: { tags } } = req;
    try {
      const blog = await searchByTag(tags);
      res.json(blog);
    } catch (e) {
      next(e);
    }
  }); 

  router.get('/title/:title', async (req, res, next) => {
    const { params: { title } } = req;
    try {
      const blog = await searchByTitle(title);
      res.json(blog);
    } catch (e) {
      next(e);
    }
  }); 

  router.delete('/:deletedid', async (req, res, next) => {
    const {user:{id} , params: { deletedid }} = req;
    try {
      const blog = await deleteBlog(id,deletedid);
      res.json(blog);
    } catch (e) {
      next(e);
    }
  });

  

  module.exports = router;