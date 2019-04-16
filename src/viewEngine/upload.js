const express = require('express');
const router = express.Router();
const RoutesConfig = require('./../config/routes.config');
const CheckSession = require('./../auth/checkSession')
const moment = require('moment');

var fs = require('fs');
const path = require('path');

router.post('/image', CheckSession, async (req, res) => {
    if (Object.keys(req.files).length == 0) {
        res.status(200).json({
            message: 'File Not Uploaded',
            success: false
        })
    }
    for (var prop in req.files) {
        let myFile = req.files[prop];
        var today = moment().format('X');
        var ext = myFile.name.split('.');
        var le = ext.length;
        ext = ext[le - 1];
        var filename = 'ScentJ_' + prop + '_' + today + '_' + myFile.name.substring(0, 3).replace('.', '').replace(/[^\w\s]/gi, '').replace(ext, '').toLowerCase() + '.' + ext;
        myFile.mv(path.join(__dirname, "../public/files/images/") + filename, function (err) {
            if (err) {
                res.status(400).json({
                    message: 'File Not Uploaded',
                    success: false,
                    error: err,
                })
                return 0;
            }
            res.status(200).json({
                message: 'File Uploaded',
                file: RoutesConfig.UrlImages + '/' + filename,
                success: true
            })
            return 0;
        });
    }
});


module.exports = router;