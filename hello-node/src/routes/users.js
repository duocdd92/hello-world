var express = require('express');
var router = express.Router();
const dbController = require('../db/controller.js');

router.get('/', dbController.getUsers);

module.exports = router;