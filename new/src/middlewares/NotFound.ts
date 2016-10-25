import {ErrorMiddlewareInterface, MiddlewareGlobalAfter, MiddlewareInterface, Middleware} from "routing-controllers";
import {Request, Response} from "express";
import {NotFoundResponse} from "../models/response/NotFound";
import {ResponseModel} from "../models/response/ResponseModel";

const fs = require("fs");

@MiddlewareGlobalAfter({priority: 1})
export class NotFoundMiddleware {

    use(request: Request, response: Response, next?: (err?: any) => any): any {
        if (response.statusMessage == undefined) {
            let notFound = new NotFoundResponse();
            response.status(200).send(notFound).end();
        }
    }

}
