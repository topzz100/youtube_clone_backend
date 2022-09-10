import express from 'express'
import { getUser, updateUser, deleteUser, unsubscribe, subscribe } from '../controllers/user.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

//get user
router.get('/:id', getUser)

//update user
router.put('/:id',verifyToken, updateUser)

//delete user
router.delete('/:id',verifyToken, deleteUser)

//subscribe 
router.put('/subscribe/:id', subscribe)

//unsubscribe
router.put('/unsubscibe/:id', unsubscribe)

//like
//router.delete('/:id', deleteUser)

//dislike
//router.delete('/:id', deleteUser)

// //google auth
// router.post('/google', googleAuth)

export default router;