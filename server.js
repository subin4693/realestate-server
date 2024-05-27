const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const app = require('./app');

mongoose.connect(process.env.CONN_STR).then(() => {
    console.log('DB Connection Successful');
}).catch(err => {
    console.error('Error connecting to database:', err);
    process.exit(1); 
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log('server has started...');
})

 