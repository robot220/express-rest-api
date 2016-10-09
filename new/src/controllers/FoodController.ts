import {Request, Response} from "express";
import {Controller, Req, Res, Get} from "routing-controllers";

@Controller("/foods")
export class FoodController {

    @Get("/")
    getAll(@Req() request: Request, @Res() response: Response) {
        response.send("Hello from food!");
    }

}