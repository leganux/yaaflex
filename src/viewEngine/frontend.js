let LangGlobal = {};
const express = require('express');
const router = express.Router();
const RoutesConfig = require('./../config/routes.config');
LangGlobal.ES = require('./../config/lang/ES')
LangGlobal.EN = require('./../config/lang/EN')
const CheckSession = require('./../auth/checkSession')
const env = require('./../config/environment.config')
const cFunctions = require('./../helpers/common.functions')






router.get('/', CheckSession, async (req, res) => {
    res.render("front/home",
        {
            data: {},
            config: {
                theme: env.site_theme.toLowerCase(),
                lang: cFunctions.getUserLang(req),
                langTexts: LangGlobal[cFunctions.getUserLang(req)],
                path: RoutesConfig
            }
        });
});

router.get('/themePreview', CheckSession, async (req, res) => {
    res.render("front/themePreview",
        {
            data: {},
            config: {
                theme: env.site_theme.toLowerCase(),
                lang: cFunctions.getUserLang(req),
                langTexts: LangGlobal[cFunctions.getUserLang(req)],
                path: RoutesConfig
            }
        });
});



module.exports = router;

















