import express from 'express';
import "./database"

import "./shared/container"


import swaggerUi from "swagger-ui-express"
import swaggerFile from "./swagger.json"

import { router } from './routes';


const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());

app.use(router)

app.listen(3333, () => console.log("Server is running!"));

