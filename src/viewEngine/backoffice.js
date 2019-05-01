
const express = require('express');
const router = express.Router();
const RoutesConfig = require('./../config/routes.config');

const CheckSession = require('./../auth/checkSession')
const env = require('./../config/environment.config')
const cFunctions = require('./../helpers/common.functions')
const assets = require('./../config/assets_backoffice.config');

const menuHelper = require('./../helpers/menuLinks.helper')



router.get('/', async (req, res) => {
    res.render("backoffice/backoffice", {
        data: {},
        config: {
            langTexts: JSON.stringify(cFunctions.getUserLang(req)),
            path: RoutesConfig,
            assets: assets,
            filesPath: RoutesConfig.FilesPath
        },
        seo: {
            title: 'YAAFLEX - Yet another amazing framework by leganux',
            description: 'YAAFLEX - yet another amazing framework by leganux',
            image: 'http://cdn.leganux.com/IMG/integrado.png',
            domain: req.get('host'),
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
            tw_posted_by: '@leganux',
            og_type: 'article',
        },
        i18n: cFunctions.getUserLang(req)

    });
});

router.get('/dashboard', CheckSession, async (req, res) => {
    var role = '';
    if (req.user && req.user.prop.role) {
        role = req.user.prop.role
    }
    var i18n = cFunctions.getUserLang(req);
    menuHelper.CP(role, i18n).then(menu => {
        //render Screen
        res.render("backoffice/dashboard", {
            data: {},
            config: {
                menu,
                langTexts: JSON.stringify(i18n),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX :: Dashboard',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: i18n
        });
    }).catch(err => {
        if (err) {
            console.error(err);
            res.code(500).render('errors/err500')
            return false;
        }
    });;
});

router.get('/administradores', CheckSession, async (req, res) => {
    var role = '';
    if (req.user && req.user.prop.role) {
        role = req.user.prop.role
    }
    var i18n = cFunctions.getUserLang(req);
    menuHelper.CP(role, i18n).then(menu => {
        res.render("backoffice/administradores", {
            data: {},
            config: {
                menu,
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX - Yet another amazing framework by leganux',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)

        });
    }).catch(err => {
        if (err) {
            console.error(err);
            res.code(500).render('errors/err500')
            return false;
        }
    });;

});

router.get('/users', CheckSession, async (req, res) => {
    var role = '';
    if (req.user && req.user.prop.role) {
        role = req.user.prop.role
    }
    var i18n = cFunctions.getUserLang(req);
    menuHelper.CP(role, i18n).then(menu => {
        res.render("backoffice/users", {
            data: {},
            config: {
                menu,
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX - Yet another amazing framework by leganux',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)

        });
    }).catch(err => {
        if (err) {
            console.error(err);
            res.code(500).render('errors/err500')
            return false;
        }
    });;

});

router.get('/roles_admin', CheckSession, async (req, res) => {
    var role = '';
    if (req.user && req.user.prop.role) {
        role = req.user.prop.role
    }
    var i18n = cFunctions.getUserLang(req);
    menuHelper.CP(role, i18n).then(menu => {
        res.render("backoffice/roles_admin", {
            data: {},
            config: {
                menu,
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX - Yet another amazing framework by leganux',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)

        });
    }).catch(err => {
        if (err) {
            console.error(err);
            res.code(500).render('errors/err500')
            return false;
        }
    });;

});

router.get('/roles_user', CheckSession, async (req, res) => {
    var role = '';
    if (req.user && req.user.prop.role) {
        role = req.user.prop.role
    }
    var i18n = cFunctions.getUserLang(req);
    menuHelper.CP(role, i18n).then(menu => {
        res.render("backoffice/roles_user", {
            data: {},
            config: {
                menu,
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX - Yet another amazing framework by leganux',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)

        });
    }).catch(err => {
        if (err) {
            console.error(err);
            res.code(500).render('errors/err500')
            return false;
        }
    });

});

router.get('/routes_access', CheckSession, async (req, res) => {
    var role = '';
    if (req.user && req.user.prop.role) {
        role = req.user.prop.role
    }
    var i18n = cFunctions.getUserLang(req);
    menuHelper.CP(role, i18n).then(menu => {
        res.render("backoffice/routes_access", {
            data: {},
            config: {
                menu,
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX - Yet another amazing framework by leganux',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)

        });
    }).catch(err => {
        if (err) {
            console.error(err);
            res.code(500).render('errors/err500')
            return false;
        }
    });

});

router.get('/routes_access_user', CheckSession, async (req, res) => {
    var role = '';
    if (req.user && req.user.prop.role) {
        role = req.user.prop.role
    }
    var i18n = cFunctions.getUserLang(req);
    menuHelper.CP(role, i18n).then(menu => {
        res.render("backoffice/routes_access_user", {
            data: {},
            config: {
                menu,
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX - Yet another amazing framework by leganux',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)

        });

    }).catch(err => {
        if (err) {
            console.error(err);
            res.code(500).render('errors/err500')
            return false;
        }
    });

});


router.get('/file_manager', CheckSession, async (req, res) => {
    var role = '';
    if (req.user && req.user.prop.role) {
        role = req.user.prop.role
    }
    var i18n = cFunctions.getUserLang(req);
    menuHelper.CP(role, i18n).then(menu => {
        res.render("backoffice/file_manager", {
            data: {},
            config: {
                menu,
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX - Yet another amazing framework by leganux',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)

        });
    }).catch(err => {
        if (err) {
            console.error(err);
            res.code(500).render('errors/err500')
            return false;
        }
    });

});

router.get('/articles', CheckSession, async (req, res) => {
    var role = '';
    if (req.user && req.user.prop.role) {
        role = req.user.prop.role
    }
    var i18n = cFunctions.getUserLang(req);
    menuHelper.CP(role, i18n).then(menu => {
        res.render("backoffice/articles", {
            data: {},
            config: {
                menu,
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX - Yet another amazing framework by leganux',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)

        });

    }).catch(err => {
        if (err) {
            console.error(err);
            res.code(500).render('errors/err500')
            return false;
        }
    });

});

router.get('/dinamic_pages', CheckSession, async (req, res) => {
    var role = '';
    if (req.user && req.user.prop.role) {
        role = req.user.prop.role
    }
    var i18n = cFunctions.getUserLang(req);
    menuHelper.CP(role, i18n).then(menu => {
        res.render("backoffice/dinamic_pages", {
            data: {},
            config: {
                menu,
                langTexts: JSON.stringify(cFunctions.getUserLang(req)),
                path: RoutesConfig,
                assets: assets,
                filesPath: RoutesConfig.FilesPath
            },
            seo: {
                title: 'YAAFLEX - Yet another amazing framework by leganux',
                description: 'YAAFLEX - yet another amazing framework by leganux',
                image: 'http://cdn.leganux.com/IMG/integrado.png',
                domain: req.get('host'),
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                tw_posted_by: '@leganux',
                og_type: 'article',
            },
            i18n: cFunctions.getUserLang(req)

        });
    }).catch(err => {
        if (err) {
            console.error(err);
            res.code(500).render('errors/err500')
            return false;
        }
    });

});

router.get('/leganuxWB/:id', CheckSession, async (req, res) => {
    var miID = req.params.id;
    res.render("backoffice/leganux_editor", {
        data: {
            id: miID,
            template: RoutesConfig.AssetsSite + '/bootswatch-dist/' + env.site_theme + '/bootstrap.css'
        },
        config: {
            langTexts: JSON.stringify(cFunctions.getUserLang(req)),
            path: RoutesConfig,
        },
        i18n: cFunctions.getUserLang(req)

    });
});


module.exports = router;