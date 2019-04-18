let LangGlobal = {};
const express = require('express');
const router = express.Router();
const RoutesConfig = require('./../config/routes.config');
LangGlobal.ES = require('./../config/lang/ES')
LangGlobal.EN = require('./../config/lang/EN')
const CheckSession = require('./../auth/checkSession')
const env = require('./../config/environment.config')
const cFunctions = require('./../helpers/common.functions')
const assets = require('./../config/assets_site.config');



router.get('/', async (req, res) => {
    res.render("backoffice/backoffice", {
        data: {},
        config: {
            theme: env.site_theme.toLowerCase(),
            lang: cFunctions.getUserLang(req),
            langTexts: LangGlobal[cFunctions.getUserLang(req)],
            path: RoutesConfig,
            assets: assets
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
        routes: RoutesConfig
    });
});


router.get('/dashboard', CheckSession, async (req, res) => {
    ses = JSON.stringify(req.user.session);
    role = req.user.session.role;
    res.render("backoffice/dashboard", {
        role, ses, data: {},
        config: {
            theme: env.site_theme.toLowerCase(),
            lang: cFunctions.getUserLang(req),
            langTexts: LangGlobal[cFunctions.getUserLang(req)],
            path: RoutesConfig,
            assets: assets
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
        routes: RoutesConfig
    });
});

router.get('/administradores', CheckSession, async (req, res) => {
    ses = JSON.stringify(req.user.session);
    role = req.user.session.role;
    res.render("backoffice/administradores", {
        role, ses,
        data: {},
        config: {
            theme: env.site_theme.toLowerCase(),
            lang: cFunctions.getUserLang(req),
            langTexts: LangGlobal[cFunctions.getUserLang(req)],
            path: RoutesConfig,
            assets: assets
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
        routes: RoutesConfig
    });
});







module.exports = router;