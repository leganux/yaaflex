const idDEV = false;
const Admin = require('../models/admin');
var originRedirect = '/lx_admin';

async function loggedIn(req, res, next) {

    next();
    return 0;

    var fullUrl = req.originalUrl;
    
}

module.exports = loggedIn;