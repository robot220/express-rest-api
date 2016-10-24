import {ErrorMiddlewareInterface, MiddlewareGlobalAfter, MiddlewareInterface, Middleware} from "routing-controllers";

@MiddlewareGlobalAfter({priority: 2})
export class ErrorHandler implements MiddlewareInterface {

    error(error: any, request: any, response: any, next: (err?: any) => any): void {
        response.status(500).send(`Internal Server Error.`);
        next();
    }

}
