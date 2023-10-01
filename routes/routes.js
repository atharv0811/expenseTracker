const express = require('express');
const controller = require('../controller/controller');
const data = require('../model/model');
const router = express.Router();

router.get('/', controller.getIndex);

router.post('/post-data', controller.postData);

router.get('/getdata', controller.getData);

router.post('/delete-user', controller.deleteExpense);

router.post('/getdatasingle', controller.getSingleData);

router.post('/editdata', controller.updateData);

module.exports = router;