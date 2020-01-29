const express = require('express');
const path = require('path');
const bodyParser =require('body-parser');
const indexRouter = require('./routes/index_routes');
const usersRouter = require('./routes/users');
const session = require('express-session');
const fileupload =require('express-fileupload');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({secret: 'fjcvcmvnreiorioepcvnnvc'}));
app.use(fileupload());


app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname,'public')));



app.use('/',indexRouter);
app.use('/users',usersRouter);
app.listen(3000);
console.log('http://localhost:3000');
console.log('hiii');


