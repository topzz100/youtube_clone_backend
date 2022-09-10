import { createError } from "../middleware/error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

//get User
export const getUser = async(req, res, next) => {
  try{
    const user = await User.findById(req.user.id)
    res.status(200).json(user)
  }catch(err){
    next(err)
  }
}

//update User
export const updateUser = async( req, res, next ) => {
  if(req.params.id === req.user.id){
    try{
       const newUser = await User.findByIdAndUpdate(req.params.id, 
      {
        $set: req.body,
      },
      { new: true })
      res.status(200).json(newUser)
    }catch(err){
      next(err)
    }
   
  }else{
    next(createError(403, "You can only update your account"))
  }
} 

//deleteUSer
export const deleteUser = async(rea, res, next) => {
  if(req.params.user === req.user.id){
    try{
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('delete successfull')
    }catch(err){
      next(err)
    }
  }else{
    return(next(createError(403, 'You can only delete your account')))
  }
}

//subscribe
export const subscribe = async(req, res, next) => {
  try{
    await User.findByIdAndUpdate(req.user.id, {
      $push: {subscribers: req.params.id}
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: {subscribers: 1},
    });
    res.status(200).json("Subscription successful")
    
  }catch(err){
    next(err)  
  }
}

//unsubscribe
export const unsubscribe = async(req, res, next) => {
  try{
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {subscribers: req.params.id}
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: {subscribers: -1},
    });
    res.status(200).json("unsubscription successful")
    
  }catch(err){
    next(err)  
  }
}

//like a video
export const like = async(req, res, next) => {
  // const id = req.user.id;
  // const videoId = req.params.videoId;
  try{
    await Video.findByIdAndUpdate(req.videoId, {
      $addToSet: {likes: req.user.id},
      $pull: {dislikes: req.user.id}
    })
    res.status(200).json('the video has been liked')
  }catch(err){
    next(err)
    
  }
}


//disike a video
export const dislike = async(req, res, next) => {
  // const id = req.user.id;
  // const videoId = req.params.videoId;
  try{
    await Video.findByIdAndUpdate(req.videoId, {
      $addToSet: {dislikes: req.user.id},
      $pull: {likes: req.user.id}
    })
    res.status(200).json('the video has been disliked')
  }catch(err){
    next(err)
    
  }
}