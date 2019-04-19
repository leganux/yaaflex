const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: false, unique: true },
    email: { type: String, required: false },
    password: { type: String, required: false },
    dt_reg: { type: Date, required: true },
    provider_id: { type: String, required: true },
    provider: { type: String, required: true },
    provider_picture: { type: String, required: true },
    full_name: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    rieviewer: { type: Boolean, required: true, default: false },
    isNonUserEdited: { type: Boolean, required: true, default: true },
    gender: { type: String, required: false },
    lang: { type: String, required: false },
    age: { type: String, required: false },
    phone: { type: String, required: false },
    cellphone: { type: String, required: false },
    bio: { type: String, required: false },
    country: { type: Number, required: false },
    state: { type: Number, required: false },
    city: { type: String, required: false },
    adress: { type: String, required: false },
    zip_code: { type: String, required: false },
    facebook_uri: { type: String, required: false },
    instagram_uri: { type: String, required: false },
    twitter_uri: { type: String, required: false },
    youtube_uri: { type: String, required: false },

});

module.exports = mongoose.model('User', UserSchema);
