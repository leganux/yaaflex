const express = require('express');
const router = express.Router();
const RoutesConfig = require('./../config/routes.config');
const CheckSession = require('./../auth/checkSession')



router.get('/', async (req, res) => {
    res.render("backoffice/backoffice", { data: {}, routes: RoutesConfig });
});


router.get('/dashboard', CheckSession, async (req, res) => {
    ses = JSON.stringify(req.user.session);
    role = req.user.session.role;
    res.render("backoffice/dashboard", { role, ses, data: {}, routes: RoutesConfig });
});

router.get('/administradores', CheckSession, async (req, res) => {
    ses = JSON.stringify(req.user.session);
    role = req.user.session.role;
    res.render("backoffice/administradores", { role, ses, data: {}, routes: RoutesConfig });
});







module.exports = router;