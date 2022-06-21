const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reportSchema = new Schema(
    {
        client: {type: String, required: true},
        site: {type: String, required: true},
        adress: {type: String, required: true},
        description: {type: String, required: true},
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true
    }
);


const Report = model('Report', reportSchema, 'reports');

module.exports = Report;