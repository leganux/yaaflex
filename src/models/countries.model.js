const mongoose = require('mongoose');
const { Schema } = mongoose;

const CountrySchema = new Schema({
    id: { type: Number, required: false },
    shortname: { type: String, required: false },
    name: { type: String, required: false },
    phoneCode: { type: String, required: false },
});

module.exports = mongoose.model('Country', CountrySchema);
