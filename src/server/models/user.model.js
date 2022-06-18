const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        cuit: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isActive: {type: Boolean, required: false, default: 0},
        report: { type: Schema.Types.ObjectId, ref: 'Report' },
    },
    {
        timestamps: true
    }
);

const User = model('User', userSchema);

module.exports = User;
