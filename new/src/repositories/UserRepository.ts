import {User} from "../entities/User";
import es6PromiseLib = require('es6-promise');
const Promise = es6PromiseLib.Promise;
const UserScheme = require("../models/User");

export class UserRepository {

    public getAll(){
        return new Promise<any>((resolve, reject) => {
            UserScheme.find({}, (err, users) => {
                if(err){ reject(err); }
                resolve(users);
            })
        });
    }

    public create(body: User){
        return new Promise<any>((resolve, reject) => {
            console.log(body);
            if (!body.name) { reject("Can't add null-object into DB.") }
            UserScheme.create(body, (err) => {
                if(err){ reject(err); }
                resolve(`User with name '${body.name}' was created.`);
            })
        });
    }

    public update(id: number){
        return new Promise<any>((resolve, reject) => {
            resolve("All is ok");
        });
    }

}