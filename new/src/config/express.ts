import * as bodyParser from "body-parser";
import config from "./config";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import MongooseDB from '../core/db/mongooseDriver';

export default function() {
    var app: express.Express = express();

    // ---------------------------------------------------------
    // initialize db-connection
    // ---------------------------------------------------------
    let db : MongooseDB = new MongooseDB();
    db.connect();
    
    // ---------------------------------------------------------
    // models to work with db
    // ---------------------------------------------------------    
    for (let model of config.globFiles(config.models)) {
        require(path.resolve(model));
    }

    // ---------------------------------------------------------
    // view engine setup
    // ---------------------------------------------------------
    app.set("views", path.join(__dirname, "../views"));
    app.set("view engine", "jade");

    //app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "../public")));

    // ---------------------------------------------------------
    // load application routes
    // ---------------------------------------------------------
    for (let route of config.globFiles(config.routes)) {
        require(path.resolve(route)).default(app);
    }

    // ---------------------------------------------------------
    // error handlers
    // ---------------------------------------------------------
    app.use((req: express.Request, res: express.Response, next: Function): void => {
        let err: Error = new Error("Not Found");
        next(err);
    });

    if (app.get("env") === "development") {
        app.use((err: Error, req: express.Request, res: express.Response, next): void => {
            res.status(500).render("error", {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    app.use((err: any, req: express.Request, res: express.Response, next): void => {
        res.status(err.status || 500).render("error", {
            message: err.message,
            error: {}
        });
    });

    return app;
};