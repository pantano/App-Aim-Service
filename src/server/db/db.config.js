const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
const options = {
    maxPoolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(uri, options, (error) => {
    error ? console.log(error) : console.log('MongoDB + Atlas connected OK!');
})


