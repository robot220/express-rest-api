import {Request, Response} from "express";
import {JsonController, QueryParam, UseBefore} from "routing-controllers";
import {Body, Req, Res, Param} from "routing-controllers";
import {Get, Post, Put} from "routing-controllers";
//let User = require("../models/User");
import {UserRepository} from "../repositories/UserRepository";
import {User} from "../entities/User";
import {HttpError} from "routing-controllers/error/http/HttpError";
import {UserService} from "../services/UserService";

@JsonController("/users")
export class UserController {

    private _userRepository: UserRepository;
    private _userService: UserService;

    constructor(){
        this._userRepository = new UserRepository();
        this._userService = new UserService();
    }

    @Get("/")
    async getAll(@Req() request: Request, @Res() response: Response){
        await this._userRepository
            .getAll()
            .then((result) => {
                var users = result.map((u) => new User(u.name));
                response.status(200).json(users);
            });
    }

    @Post("/")
    async create(@Body() user: User, @Req() request: Request, @Res() response: Response){
        await this._userRepository
            .create(user)
            .then((result) => {
                response.status(200).json(result);
            });
    }

    /*@Put("/:id")
    async update(@Param("id") id: number, @Body() user: User, @Req() request: Request, @Res() response: Response){
        if (!id) { return new HttpError(403, "Id parameter is not defined.") }
        await this._userRepository
            .update(id)
            .then((result) => {
                response.status(200).json(result);
            });
    }*/

    @Get("/test")
    async sortBy(@QueryParam("sort") sortDirection: number, @Req() request: Request, @Res() response: Response) {
        await this._userService
            .sortBy(sortDirection)
            .then((result) => {
                response.json(result);
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