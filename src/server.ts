import express from 'express'
import dotenv from 'dotenv'
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/user";

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

app.post('/user', (request, response) => {
    response.send('Hello world.');
});
app.get('/user/:id', (request, response) => {
    response.send('Hello world.');
});
app.delete('/user/:id', (request, response) => {
    response.send('Hello world.');
});
app.listen(port, () => console.log(`Running on port ${port}`));