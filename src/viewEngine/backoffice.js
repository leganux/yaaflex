
const express = require('express');
const router = express.Router();
const RoutesConfig = require('./../config/routes.config');

const CheckSession = require('./../auth/checkSession')
const env = require('./../config/environment.config')
const cFunctions = require('./../helpers/common.functions')
const assets = require('./../config/assets_backoffice.config');



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

    res.render("backoffice/dashboard", {

        data: {},
        config: {
            langTexts: JSON.stringify(cFunctions.getUserLang(req)),
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
        i18n: cFunctions.getUserLang(req)
    });
});

router.get('/administradores', CheckSession, async (req, res) => {
    res.render("backoffice/administradores", {
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

router.get('/roles_admin', CheckSession, async (req, res) => {
    res.render("backoffice/roles_admin", {
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







module.exports = router;