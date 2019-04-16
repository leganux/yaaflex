
const express = require('express');
const router = express.Router();

router.get('/logout', function (req, res) {
    req.session.destroy();
    req.logout();
    req.user = false;
    res.redirect('/');
  });

module.exports = router;