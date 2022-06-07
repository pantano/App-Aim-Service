const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        companyName: {type: String, required: true},
        cuit: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        status: {type: Boolean, required: false, default: 0},
        rol: {type: Boolean, required: false, default: 0}
    },
    {
        timestamps: true
    }
);

const User = model('User', userSchema);

module.exports = User;
