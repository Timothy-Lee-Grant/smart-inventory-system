import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from "url";



dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json())

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