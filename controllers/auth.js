import bcrypt from 'bcrypt'
import { createError } from '../middleware/error.js';
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

//sign up
export const signup = async (req, res, next) => {
  try{
    //const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({...req.body, password: hash})
    const user = await newUser.save()
    res.status(200).send(user)

  }catch(err){
    next(err)
  }
}

// sign in
export const signin = async (req, res, next) => {
  try{
    const user = await User.findOne({name: req.body.name})
    if(!user){
      return next(createError(404, "User not found"))
    }
    const isCorrect = await bcrypt.compare(req.body.password, user.password)
    if(!isCorrect){
      return next(createError(400, "Wrong Credentials"))
    }
    const token = jwt.sign({id: user._id}, process.env.JWT)
    const { password, ...others } = user._doc;
    // res
    // .cookie("access_token", token, {
    //   httpOnly: true,
    // })
    // .status(200)
    // .JSON(others);
    res
    .cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(others)
  }catch(err){
    next(err)
  }
}
