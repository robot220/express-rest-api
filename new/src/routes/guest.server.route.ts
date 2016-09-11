import * as express from "express";

export default class GuestRoute {
    constructor(app : express.Express) {
        GuestRoute.activate(app);
    }

    public static activate (app : express.Express) : void {
        app.route("/").get((req: express.Request, res: express.Response, next: Function) => {
            res.json("Hello, world!");
        });
    }
}