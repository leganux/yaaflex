let LangGlobal = {};
const express = require('express');
const router = express.Router();
const RoutesConfig = require('./../config/routes.config');
LangGlobal.ES = require('./../config/lang/ES')
LangGlobal.EN = require('./../config/lang/EN')
const CheckSession = require('./../auth/checkSession')



let clientLang = 'EN'




router.get('/', CheckSession, async (req, res) => {
    var cookies = req.cookies;
    if (cookies.SJ_lang_client) {
        clientLang = cookies.SJ_lang_client;
    }
    res.render("front/home", { data: {} });
});



module.exports = router;


var makeHastags = function (content) {

    if (content && content.includes('#')) {
        var exist = []
        var arr = content.match(/#[a-z_.,]+/g);
        for (var i = 0; i < arr.length; i++) {
            content = content.replace(arr[i] + ' ', '<a href="/hashtag/' + arr[i].replace('#', '').replace('.', '').replace(',', '') + '" target="_blank"> ' + arr[i] + ' </a>')
            if (i == arr.length - 1) {
                content = content.replace(arr[i], '<a href="/hashtag/' + arr[i].replace('#', '').replace(',', '').replace(',', '') + '" target="_blank"> ' + arr[i] + ' </a>')
            }
        }
    }
    return content;
}
var extractHastags = function (content) {

    if (content && content.includes('#')) {
        var exist = []
        var arr = content.match(/#[a-z_.,]+/g);

        for (var i = 0; i < arr.length; i++) {
            arr[i] = '<a href="/hashtag/' + arr[i].replace('#', '').replace('.', '').replace(',', '') + '" target="_blank"> ' + arr[i] + ' </a>'
        }
        return arr.join('  |  ');
    }
    return ''

}

var removeHastags = function (content) {

    if (content && content.includes('#')) {
        var exist = []
        var arr = content.match(/#[a-z_.,]+/g);
        for (var i = 0; i < arr.length; i++) {
            content = content.replace(arr[i] + ' ', '')
            if (i == arr.length - 1) {
                content = content.replace(arr[i], '')
            }
        }
    }
    return content;
}


var getKeyvideoYoutube = function (url) {
    return url.split('=')[1];
}


var empty = function (val) {

    // test results
    //---------------
    // []        true, empty array
    // {}        true, empty object
    // null      true
    // undefined true
    // ""        true, empty string
    // ''        true, empty string
    // 0         false, number
    // true      false, boolean
    // false     false, boolean
    // Date      false
    // function  false

    if (val === undefined)
        return true;

    if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
        return false;

    if (val == null || val.length === 0)        // null or 0 length array
        return true;

    if (typeof (val) == "object") {
        // empty object

        var r = true;

        for (var f in val)
            r = false;

        return r;
    }

    return false;
}


var remove_Html_tags = function (str) {
    return str.replace(/<(?:.|\n)*?>/gm, '');
}