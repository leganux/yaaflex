const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    role: { type: String, required: false },
    dt_reg: { type: Date, required: true },
    active: { type: Boolean, required: true },
});

module.exports = mongoose.model('Admin', AdminSchema);
