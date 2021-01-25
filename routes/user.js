const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {
  create, login, getAll, editOne, addfollowID ,removefollowID
} = require('../controllers/user');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await create(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.post('/login', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await login(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.patch('/edit',authMiddleware, async (req, res, next) => {
  const {  user:{id}, body } = req;
  try {
    const users = await editOne(id, body);
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.post('/follow/:ID' , authMiddleware, async (req,res,next)=> {
  const { user:{id} ,params:{ID} }= req ;
  try{
    const userfollowID = await addfollowID(id,ID);
    res.json(userfollowID) ;
  } catch(e){
    next(e);
  }
});

router.post('/unfollow/:ID' , authMiddleware, async (req,res,next)=> {
  const { user:{id} ,params:{ID} }= req ;
  try{
    const userfollowID = await removefollowID(id,ID);
    res.json(userfollowID) ;
  } catch(e){
    next(e);
  }
});


module.exports = router;
