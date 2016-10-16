import * as logger from "morgan";
import {Middleware, MiddlewareInterface} from "routing-controllers";

@Middleware()
export class LoggerMiddleware implements MiddlewareInterface {

    use(request: any, response: any, next?: (err?: any) => any): any {
        //console.log("do something...");
        //next();
        return logger("dev")(request, response, next);        
    }

}