import express from "express";
import db from "./database/database.js"
import 'dotenv/config'

import routes from "./routes.js";
import connectToDB from "./database/database.js";

const app = express();
connectToDB();

const port = process.env.APP_PORT || 8000;

app.use(express.json());
app.use(routes);
app.use(db);
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
});

