const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './.env' });

const port = process.env.PORT || 3000;

let DBUrl = process.env.DB_URL;

mongoose.connect(DBUrl)
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
});