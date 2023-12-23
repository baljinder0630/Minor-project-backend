import express from 'express'
import getUserInfo from '../controller/profile/getUserInfo.js';

const router = express.Router()
router.post('/getUserInfo', getUserInfo);

export default router;