const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncSign = promisify(jwt.sign);

const User = require('../models/User');

const create = (user) => User.create(user) ;

const login = async ({ username, password }) => {
  const user = await User.findOne({ username }).exec();
  if (!user) {
    throw Error('UN_AUTHENTICATED');
  }

  const isVaildPass = await user.validatePassword(password);
  if (!isVaildPass) {
    throw Error('UN_AUTHENTICATED');
  }
  
  const token = await asyncSign({
    username: user.username,
    id: user.id,
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
  return { ...user.toJSON(), token };
};

const getAll = () => User.find({}).exec();

const editOne = (id,data) => User.findByIdAndUpdate(id,data, { new: true }).exec();

const addfollowID = async(id ,targetID)=>{
  const loggedUser = await User.findById(id).exec();
  if (!loggedUser.following.find(i => i== targetID) && targetID != id){
    User.updateOne( {_id:id},{ $push : {following : targetID} } ,{new:true} ).exec();
    User.updateOne( {_id:targetID},{ $push : {followers : id} } ,{new:true} ).exec();
    return {"status":"you followed new one sccessfully"};
  }else{
    throw new Error("This Id Not Found");
  }
}

const removefollowID = async(id ,targetID)=>{
  const loggedUser = await User.findById(id).exec();
    User.updateOne( {_id:id},{ $pull : {following : targetID} } ,{new:true} ).exec();
    User.updateOne( {_id:targetID},{ $pull : {followers : id} } ,{new:true} ).exec();
    return {"status":"you unfollowed this user sccessfully"} ;
}

module.exports = {
  create,
  login,
  getAll,
  editOne,
  addfollowID,
  removefollowID
};
/*const addfollowID = (id,targetId) => { User.updateOne({ _id : id }, { $push: {followers: targetId}}, {new:true}).exec();
    User.updateOne({ _id : targetId }, { $push: {following: id}}, {new:true}).exec();
    const pushfollowID = async(id, targetid)=>{
        const loggedUser = await User.findById(id).exec();
        if (targetid != id && !loggedUser.following.find(item => item == targetid)){
            User.updateOne({_id:id },{ $push : {following: targetid } } ,{new:true}).exec();
            User.updateOne({_id:targetid}, { $push: { followers: id } }, { new: true }).exec();
            return {"status":"followed"}
        } else {
            throw new Error("Id invalid");
        }
    }
 }*/