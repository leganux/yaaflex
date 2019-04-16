const idDEV = false;
const Admin = require('../models/admin');
var originRedirect = '/controlPanel';

async function loggedIn(req, res, next) {

    next();
    return 0;

    var fullUrl = req.originalUrl;
    var cookies = req.cookies;
    var clientLang = 'EN'
    if (cookies.SJ_lang_client) {
        clientLang = cookies.SJ_lang_client;
    }
    res.cookie('SJ_lang_client', clientLang, { maxAge: 900000, httpOnly: false });
}

module.exports = loggedIn;