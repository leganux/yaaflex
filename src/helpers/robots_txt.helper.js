
const express = require('express');
const router = express.Router();

router.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /lx_admin/");
});

module.exports = router;