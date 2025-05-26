//const express = require('express');
//const router = express.Router();
import express from 'express';
const router = express.Router();

router.get('/ree', (req, res)=>res.send("inside fo the ree file"));
router.get('/', (req, res)=>res.send("Nothing to send"));
//module.exports = router;
export default router;