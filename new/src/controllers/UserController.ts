import {Request, Response} from "express";
import { JsonController, } from "routing-controllers";
import {Body, Req, Res, Param} from "routing-controllers";
import {Get, Post, Put} from "routing-controllers";
//let User = require("../models/User");
import {UserRepository} from "../repositories/UserRepository";
import {User} from "../entities/User";
import {HttpError} from "routing-controllers/error/http/HttpError";

@JsonController("/users")
export class UserController {

    private _userRepository: UserRepository;

    constructor(){
        this._userRepository = new UserRepository();
    }

    @Get("/")
    getAll(@Req() request: Request, @Res() response: Response){
        this._userRepository
            .getAll()
            .then((users) => {
                response.status(200).json(users);
            });
    }

    @Post("/")
    create(@Body() user: User, @Req() request: Request, @Res() response: Response){
        this._userRepository
            .create(user)
            .then((result) => {
                response.status(200).json(result);
            });
    }

    @Put("/:id")
    update(@Param("id") id: number, @Body() user: User, @Req() request: Request, @Res() response: Response){
        if (!id) { return new HttpError(403, "Id parameter is not defined.") }
        this._userRepository
            .update(id)
            .then((result) => {
                response.status(200).json(result);
            });
    }

    /*@Get("/")
    @Header("Test", "20")
    async getAll(@Req() request: Request, @Res() response: Response) {
        await User.find({}, function(err, users){
            response.status(200).json(users).end();
        });
    }*/

    /*async getAll(@Req() request: Request, @Res() response: Response) {
        let users = await User.find({"name": "Bob"});
        return users;
    }*/

}