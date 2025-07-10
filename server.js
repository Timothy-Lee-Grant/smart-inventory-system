// server.js
import express from 'express';
import dotenv from 'dotenv';
import hahaRoutes from './src/routes/haha.js';
import reeRoutes from './src/routes/ree.js';
import handlerRoutes from './src/routes/handler.js'
import path from 'path';
//import mongoose from "mongoose"; 
import userRoutes from "./src/routes/userRoutes.js";
import "./db.js";
import cors from "cors";
import peopleRoutes from "./src/routes/peopleRoutes.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
import db_sql from "./db_sql.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/haha', hahaRoutes);
app.use('/ree', reeRoutes);
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: true }));
//const cors = require("cors");
app.use(cors());

/*
//setting up swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API", 
            version: "1.0.0",
            description: "API documention for my project",
        },
        servers: [{url: "http://localhost:5000"}],
    },
    apis: ["./routes/*.js"], //path to route files with JSDoc comments
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
*/
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my project",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./server.js", "src/routes/*.js"], // Path to your route files with JSDoc comments
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), './src/views'));

app.use((req, res, next)=>{
    //console.log("I am in my middlewear function");
    next();
});


/**
 * @swagger
 * /index:
 *   get:
 *     summary: Returns a greeting
 *     responses:
 *       200:
 *         description: A successful response
 */
app.get('/index', (req, res) => {
    console.log("inside of the index one");
    res.render('index', { title: "About Us", message: "Here's some info about us." });
});

app.get('/', (req, res) => {
    console.log("inside of the second / get one");
    res.send('Welcome to my Node.js server!');
});

app.get('/secondPage', (req, res)=>{
    res.render('another', {title: "Crazy", message: "You have mail"});
})

app.get('/myform', (req, res)=>{
    res.render('form');
})

app.get('/myform2', (req, res)=>{
    res.render('form2');
})

app.post('/submit', (req, res)=>{
    //const {name, message} = req.body;
    //console.log(`You got a response of name: ${req.body.name} and message: ${req.body.message}`);
    //console.log(`the optional text was ${req.body.my_optional_text}`);
    console.log(`my second form ${req.body.username}`)
    res.send("You got it! :D ")
})

app.get('/mongoDb_Test', (req, res)=>{
    res.render('mongoDb_test_ejs');
})

app.use("/users", userRoutes);

app.use("/people", peopleRoutes);
app.use("/company", companyRoutes);

app.use("/createEntity", handlerRoutes);

app.get("/entitySubmit", (req, res)=>{
    res.render('people_company_address');
})

//addding a testing endpoint to add data into an sql database (mysql)
/**
 * @swagger
 * /register_sql:
 *   post:
 *     summary: Register a new user in the MySQL database
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alice
 *               email:
 *                 type: string
 *                 example: alice@example.com
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Alice
 *                 email:
 *                   type: string
 *                   example: alice@example.com
 *       500:
 *         description: Server error or database failure
 */

app.post('/register_sql', async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await db_sql.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    console.log("78787");
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    console.log("bad news");
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
