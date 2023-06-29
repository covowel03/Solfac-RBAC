const express = require('express');
const Errorshandler = require('http-errors'); // createHttpErrors
const morgan = require('morgan');
const DatabaseM = require('mongoose');  // mongoose
require('dotenv').config();

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.send('Working');
});

////////////////////////////////////////////////////
// créer des erreurs - assez optionnel en fait
app.use((req, res, next) => {
    next(Errorshandler.NotFound());
});

app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.status(error.status);
    res.send(error);
});
////////////////////////////////////////////////////

const MyPORT = process.env.MyPORT || 3000;  // PORT
DatabaseM.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
}).then(()=> {
    console.log('connected...')
}).catch(err=>console.log(err.message));
app.listen(MyPORT, () => console.log(`on port ${MyPORT}`));