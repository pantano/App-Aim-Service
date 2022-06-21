const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        report: { type: Schema.Types.ObjectId, ref: 'Report' },
    },
    {
        timestamps: true
    }
);

const User = model('User', userSchema, 'users');

module.exports = User;
