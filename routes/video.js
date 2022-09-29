import express from 'express'
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, subVideos, trend, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../middleware/verifyToken.js';


const router = express.Router();

//add video
router.post("/", verifyToken, addVideo)

//update video
router.get('/:id', verifyToken, updateVideo)

//delete video
router.delete('/:id', verifyToken, deleteVideo)

//get video
router.get('/:id', getVideo)

//add to views
router.put('/:id', addView)

// get random video
router.get('/random', random)

//get trend video
router.get('/trend', trend)

//get subscribed videos
router.get('/subVideos', subVideos)

//tag videos
router.get('/tag', getByTag)

//search video
router.delete('/search', search)

export default router;