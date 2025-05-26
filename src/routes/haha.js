// src/routes/haha.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('You reached the /haha endpoint!');
});

export default router;
