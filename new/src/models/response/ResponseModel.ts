import {IResponseModel} from "./IResponseModel";

export class ResponseModel implements IResponseModel {

    public success: boolean = true;
    public data: any = {};
    public errors: string = "";
    public message: string = "";
    
    constructor(success: boolean = true, data: any = {}, errors: string = "", message: string = "") {
        this.data = data;
        this.errors = errors;
        this.success = success;
        this.message = message;
    }
    
}