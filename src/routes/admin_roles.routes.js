const express = require('express');
const router = express.Router();
const CheckSession = require('./../auth/checkSession')
const BuildBasicQueries = require('./../helpers/general_query.helper')

//Model
const OBJModel = require('./../models/admin_roles.model');

//Other Models

//population
const _Population = [];

BuildBasicQueries(router, OBJModel, _Population, CheckSession)

module.exports = router;