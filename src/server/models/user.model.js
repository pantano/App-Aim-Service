const mongoose = require('mongoose');

const Schema = mongoose;

const UserSchema = new Schema(
    {
        companyName: {type: String, required: true},
        cuit: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        status: {type: Boolean, required: false, default: 0}
    },
    {
        timestamps: true
    }
);


const User = mongoose.model('User', UserSchema);

module.exports = User;
