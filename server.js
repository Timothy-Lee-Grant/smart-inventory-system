/*
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";
//import ree from './src/routes/ree.js';
import ree from './src/routes/ree.js';
//const ree = require('./src/routes/ree')
//import ree from './src/routes/ree.js';
//import { ree } from './src/routes/ree.js';





dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/ree', ree);

app.get('/', (req,res)=>res.send("this is my test! soieson;w"));

app.get('/ree', (req,res)=>res.send("you passed"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function function_declared(req, res)
{
    //const __dirname = path.dirname(__filename);
    const file_path = path.join(__dirname, "package.json");
    res.sendFile(file_path);
}


app.get('/function_callback', function_declared)

app.listen(PORT, ()=>console.log("listening right now hahah")) 
//this is a comment to test the connection on github

//console.log(process.env.PORT)
*/

// server.js
import express from 'express';
import dotenv from 'dotenv';
import hahaRoutes from './src/routes/haha.js';
import reeRoutes from './src/routes/ree.js';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/haha', hahaRoutes);
app.use('/ree', reeRoutes);
app.use(express.static('src/public'));


app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), './src/views'));


app.get('/index', (req, res) => {
    res.render('index', { title: "About Us", message: "Here's some info about us." });
});

app.get('/', (req, res) => {
    res.send('Welcome to my Node.js server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
