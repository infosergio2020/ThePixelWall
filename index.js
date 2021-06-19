require('dotenv').config()
const path = require('path'); //para poder acceder a sistema de archivos
const morgan = require('morgan'); //debug de las rutas del servidor
const { format } = require('timeago.js');//script para formatear fechas indicando hae cuanto que fue subido x archivo
const methodOverride = require('method-override');
//-----------------DATABASE-------------------------------
const { connection,mongoose } = require('./database');//se ejecuta la rutina de configuración para mongodb
const Grid = require('gridfs-stream'); 
//-----------------INIT INSTANCE EXPRESS-------------------------------
const express = require('express');
const app = express();

//-----------------SETTINGS-------------------------------
app.set('port',process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//Midlewares (funciones que procesan cosas antes de llegar a la ruta)
//-----------------MIDLEWARES-------------------------------
app.use(morgan('dev')) //aplicaion utiliza el modulo de morgan
app.use(express.urlencoded({extended: false}))//me permite entender los datos que se estan mandando desde los formularios
app.use(methodOverride('_method'));
//-----------------INIT GRID ENGINE-------------------------------
connection.once('open',_ => {
    const gfs = Grid(connection.db,mongoose.mongo);
    gfs.collection('uploads');
    app.locals.gfs = gfs;
    console.log("GRID has been creted");
});

//Global variables
app.use((req,res,next)=>{
    // sintaxys app.locals.(nombre de la vairable globlal)
    app.locals.format = format;
    // colocar next para que continue con la ejecucion luego del middleware
    next();
});

//--------------------ROUTES----------------------------
indexRouter = require('./routes/index');
app.use('/',indexRouter);

//-----------------START SERVER-------------------------
app.listen(app.get('port'), ()=>{
    console.log('Server on port '+ app.get('port'));
    console.log('Please visit --> http://localhost:'+ app.get('port'));
});