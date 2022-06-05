const mongoose = require('mongoose');

// const user = 'app_admin';
// const password = 'GnBLey5A8OfZf42M';

mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('Base de datos conectada'))
.catch(e => console.log(e));


