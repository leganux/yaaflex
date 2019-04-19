const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const CheckSession = require('./../auth/checkSession')
const moment = require('moment');

// User Model
const Admin = require('../models/admin');

// GET all Admins
router.get('/', CheckSession, async (req, res) => {
    const { sort, search, paginate } = req.body;
    let order = {};
    let busqueda = {};

    if (search) {
        for (const [key, val] of Object.entries(search)) {
            busqueda[key] = new RegExp(val, "i");
        }
    }
    let query = Admin.find(busqueda);
    if (paginate && paginate.limit && (paginate.page || Number(paginate.page === 0))) {
        await query.limit(paginate.limit).skip(paginate.page * paginate.limit);
    }
    if (sort) {
        for (const [key, val] of Object.entries(sort)) {
            order[key] = val;
        }
    }
    await query.sort(order).exec((err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Administrador no encontrado ',
                error: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'Administrador encontrado',
            data: data,
            count: data.length,
            success: true
        })
    });
});

// GET a one Admin
router.get('/:id', CheckSession, async (req, res) => {
    await Admin.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(404).json({
                message: 'Admin no encontrado ',
                error: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'Admin encontrado',
            data: data,
            success: true
        })
    });

});

// ADD a new Admin
router.post('/', CheckSession, async (req, res) => {
    const { username, email, password, active, role } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    const admin = new Admin({ username, email, password: hash, dt_reg: moment().format(), active: eval(active), role });
    await admin.save((err, data) => {
        if (err) {

            res.status(500).json({
                message: 'Error al guardar el documento',
                errror: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'Administrador correctamente guardado',
            data: data,
            success: true
        })
    });
});

// UPDATE a new 
router.put('/:id', CheckSession, async (req, res) => {
    const { username, email, password, dt_reg, active, role } = req.body;
    const SAdmin = {};
    if (username) { SAdmin.username = username }
    if (email) { SAdmin.email = email }
    if (dt_reg) { SAdmin.dt_reg = dt_reg }
    if (role) { SAdmin.role = role }
    if (password) {
        const hash = await bcrypt.hash(password, saltRounds);
        SAdmin.password = hash
    }
    if (active === false || active === 0 || active === '0' || active === 'false') { SAdmin.active = false }
    if (active === true || active === 'true') { SAdmin.active = true }
    await Admin.findByIdAndUpdate(req.params.id, { $set: SAdmin }, (err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Error al actualizar el documento',
                errror: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'Usuario correctamente Actualizado',
            data: data,
            success: true
        })
    });
});

router.delete('/:id', CheckSession, async (req, res) => {
    await Admin.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Error al eliminar el usuario',
                errror: err,
                success: false
            })
        }
        res.status(200).json({
            message: 'Usuario correctamente eliminado',
            data: data,
            success: true
        })
    });
});
module.exports = router;