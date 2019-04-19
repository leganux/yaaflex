const express = require('express');
const router = express.Router();
const CheckSession = require('./../auth/checkSession')
const BuildBasicQueries = require('./../helpers/general_query.helper')
const moment = require('moment');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//Model
const OBJModel = require('./../models/admin');

//Other Models

//population
const _Population = [];

// Special

const _Special = {
    post: [{
        path: 'dt_reg',
        value: moment().format(),
        inner: false
    }, {
        path: 'password',
        value: function (val) {
            const hash = bcrypt.hash(val, saltRounds);
            return hash;
        },
        inner: true
    }],
    put: [{
        path: 'password',
        value: function (val) {
            const hash = bcrypt.hash(val, saltRounds);
            return hash.then(value => { return value });
        },
        inner: true
    }]
}

BuildBasicQueries(router, OBJModel, _Population, CheckSession, _Special)

module.exports = router;