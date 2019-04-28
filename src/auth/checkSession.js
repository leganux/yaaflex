
var originRedirect = '/';
const AdminAccess = require('./../models/routes_access_admin.model');
const UserAccess = require('./../models/routes_access_user.model');

const UserRoles = require('./../models/user_roles.model');
const AdminRoles = require('./../models/admin_roles.model')
const env = require('./../config/environment.config')


var ERR403 = function (req, res, next) {
    if (req.method == "GET") {
        return res.status(403).render('errors/err403');
    } else {
        return res.status(403).json({
            message: '403 Forbidden',
            error: err,
            success: false
        });
    }
}
var ERR500 = function (req, res, next) {
    if (req.method == "GET") {
        return res.status(500).render('errors/err500');
    } else {
        return res.status(500).json({
            message: '500 Internal Server error',
            error: err,
            success: false
        });
    }
}
var ERR404 = function (req, res, next) {
    if (req.method == "GET") {
        return res.status(404).render('errors/err404');
    } else {
        return res.status(404).json({
            message: '404 Not Found',
            error: err,
            success: false
        });
    }
}

var backToHome = function (req, res, next) {
    var reqURL = req.originalUrl;
    if (req.method == "GET" && (!reqURL.includes('?'))) {
        return res.status(404).redirect('/logout');
    } else {
        return res.status(403).json({
            message: '403 Forbidden',
            success: false
        });
    }
}

async function loggedIn(req, res, next) {
    //next(); return 0;
    var type = 'user';
    var role = env.default_no_loged_user_role_id;
    var reqURL = req.originalUrl;
    var myMethod = req.method;
    myMethod = myMethod.toUpperCase()

    console.log('REQUESTEDURL ', reqURL);
    if (reqURL == '/' || req == '/lx_admin' || req == '/logout') {
        console.log('Instant next ', reqURL);
        next();
        return true;
    }
    if (!req.user) {
        type = 'user';
        role = env.default_no_loged_user_role_id;
    } else {
        type = req.user.prop.kind;
        role = req.user.prop.role;
    }
    console.log('KINDUSER ', type);
    var query = {}
    if (type == 'admin') {
        query = AdminAccess.find().populate({
            path: 'roles',
            model: AdminRoles
        });
    } else if (type == 'user') {
        query = UserAccess.find().populate({
            path: 'roles',
            model: UserRoles
        });
    } else {
        return ERR403(req, res, next);
    }

    t = query.exec();

    t.then(roles => {

        if (!roles || roles.length == 0) {
            return ERR404(req, res, next);
        }
        console.log('queryResult', roles.length);

        for (var i = 0; i < roles.length; i++) {
            var item = roles[i];
            //console.log('THISISROL', item)

            for (var j = 0; j < item.roles.length; j++) {
                var jtem = item.roles[j];
                if (jtem._id.toString() == role) {
                    console.log('==compare==', jtem._id.toString(), role);

                    var metodsLS = item.method.split(',');
                    console.log('==metod==', metodsLS, myMethod);
                    if (metodsLS.includes(myMethod)) {
                        console.log('==PTHS==', item.path, reqURL);


                        if (item.path.includes(':') && (myMethod == 'GET' || myMethod == 'PUT' || myMethod == 'DELETE')) {


                            console.log('A');
                            if (reqURL.toLowerCase().trim().includes(item.path.split(':')[0].toLowerCase().trim())) {
                                console.log('C');
                                next();
                                return 1;
                            }
                        } else if (reqURL.includes('?') && myMethod == 'GET') {
                            console.log('PP');
                            if (reqURL.split('?')[0].toLowerCase().trim() == item.path.toLowerCase().trim()) {
                                console.log('PPP');
                                next();
                                return 1;
                            }
                        } else {
                            console.log('B');
                            if (item.path.toLowerCase().trim() == reqURL.toLowerCase().trim()) {
                                console.log('D');
                                next();
                                return 1;
                            }
                        }
                    }

                }
            }

        }


        console.log('BACKTOHOME')
        return backToHome(req, res, next);

    }).catch(err => {
        if (err) {
            console.error(err);
            return ERR500(req, res, next);
        }
    })

}

module.exports = loggedIn;