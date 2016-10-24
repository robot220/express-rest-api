import {IResponseModel} from "./IResponseModel";

export class NotFoundResponse implements IResponseModel {

    public readonly success: boolean = false;
    public readonly data: any = {};
    public readonly errors: string = "";
    public readonly message: string = "Route is not found.";

}