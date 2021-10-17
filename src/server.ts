import express from 'express'
import dotenv from 'dotenv'
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/user";
import  userService  from "./service/user";
import path from 'path';
console.log(path.join(__dirname, '/entity/user.js'))
createConnection({
    type: "mysql",
    host: "localhost",
    port: 34678,
    username: "root",
    password: "12345",
    database: "dbforusers",
    entities: [
        User
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    console.log("best connection");
}).catch(error => console.log(error));

dotenv.config();
const app = express();
const port = process.env.PORT
app.get('/', (request, response) => {
    response.send('Hello world.');
});

app.post('/user', (req, res) => {
    userService.register(req.query.email, req.query.firstName, req.query.lastName)
        .then((result)=>{ res.send(result);})
        .catch((error)=>{ res.status(500).send(error);})
});
app.get('/user', (req, res) => {
    userService.getUserById(req.query.id)
        .then((result)=>{ res.send(result);})
        .catch((error)=>{ res.status(500).send(error);})
});
app.put('/user', (req, res) => {
    userService.updateUser(req.query.id,req.query.email, req.query.firstName, req.query.lastName)
        .then((result)=>{ res.send(result);})
        .catch((error)=>{ res.status(500).send(error);})
});
app.delete('/user', (req, res) => {
    userService.removeUserById(req.query.id)
        .then((result)=>{ res.send(result);})
        .catch((error)=>{ res.status(500).send(error);})
});
app.post('/user/:id/image', (req, res) => {
    response.send('Hello world.');
});
app.post('/user/:id/pdf', (req, res) => {
    response.send('Hello world.');
});
app.listen(port, () => console.log(`Running on port ${port}`));