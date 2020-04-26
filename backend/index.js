if(process.env.NODE_ENV !== 'development'){//production
    require('dotenv').config();
}

const express = require('express');
const morgan = require ('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');//comunicar dos servidores
//Initializations
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3600);

//Middlewares
app.use(morgan('dev'));
app.use(cors());
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),//potencialmente quitarle el ultimo /
    filename(req,file,cb){
        cb(null, new Date().getTime()+ path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image')); 
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//Routes
app.use('/api/books',require('./routes/books')); 


//static files
app.use(express.static(path.join(__dirname,'public')));

//start server
app.listen(app.get('port'),()=>{
    console.log('SERVER ON PORT', app.get('port'));
})