import cors from 'cors';
import 'reflect-metadata';
import 'express-async-errors'
import './database';
import  express  from "express";

import {routes} from './routes';
import { globalErrors } from './middlewares/globalErrors';




const app = express();


app.use(express.json());
app.use(cors());
app.use(routes);
app.use(globalErrors);


export { app }


