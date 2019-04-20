
const express = require('express');
const router = express.Router();



router.use('/admin_roles', require('./admin_roles.routes'));
router.use('/admin', require('./admin.routes'));


module.exports = router;