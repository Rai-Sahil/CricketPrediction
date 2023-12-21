import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import sesion from 'express-session';
import cors from 'cors';

import { Routes } from './server/routes';

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            next();
        });
        
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());

        this.app.use(sesion({secret: 'secret', resave: false, saveUninitialized: true, cookie: { secure: true }}));
        this.app.use(cors());
    }

    private mongoSetup(): void {
        mongoose.connect('mongodb://localhost:27777/users', { })
        .then(() => console.log('MongoDB connected…'))
        .catch(err => console.log(err))
    }
}

export default new App().app;