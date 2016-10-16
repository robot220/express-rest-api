import { List } from "linqts/linq";
import { UserRepository } from "../repositories/UserRepository";
import { Direction } from "../enums/Direction";

export class UserService {

    private _userRepository: UserRepository;

    constructor(){
        this._userRepository = new UserRepository();
    }
    
    getUsers() {
        return this._userRepository.getAll();
    }
    
    paginate(query?: string, from?: number, to?:number): void{
        this.getUsers()
            .then((users) => {

            });
    }

    sortBy(direction:Direction){
        if (direction == Direction.Desc) {
            return this.getUsers()
                .then((users) => {
                    return new Promise<any>((resolve, reject) => {
                        resolve(users.reverse());
                    });
                });
        } else {
            return this.getUsers();
        }
    }

}

const users = [
    {"name": "Bob", "age": "20"},
    {"name": "Tom", "age": "25"},
    {"name": "Sam", "age": "30"},
];

interface IInt {
    create<T>(entity: T);
}

class Inter implements IInt {
    collection;
    create<T>(entity: T) {
        this.collection = entity;
    };
}