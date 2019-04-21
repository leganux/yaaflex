
const express = require('express');
const router = express.Router();



router.use('/admin_roles', require('./admin_roles.routes'));
router.use('/user_roles', require('./user_roles.routes'));
router.use('/admin', require('./admin.routes'));
router.use('/user', require('./user.routes'));
router.use('/country', require('./country.routes'));
router.use('/state', require('./state.routes'));
router.use('/city', require('./city.routes'));
router.use('/i18n', require('./lang.routes'));


module.exports = router;