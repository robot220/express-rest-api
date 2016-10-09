import {Middleware, MiddlewareInterface} from "routing-controllers";

@Middleware()
export class Main implements MiddlewareInterface {

    use(request: any, response: any, next?: (err?: any) => any): any {
        console.log("do something...");
        next();
    }

    /*app.set("views", path.join(__dirname, "../views"));
    app.set("view engine", "jade");
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "../public")));*/

}