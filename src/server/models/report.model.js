const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ReportSchema = new Schema(
    {
        client: {type: String, required: true},
        description: {type: String, required: true},
    },
    {
        timestamps: true
    }
);

ReportSchema.index({client: 'text'});


const Report = model('Report', ReportSchema, 'reports');

module.exports = Report;