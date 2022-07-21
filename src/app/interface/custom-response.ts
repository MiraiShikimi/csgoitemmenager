import { csgoItem } from "./csgoItem";
import { userInventoryValues } from "./userInventoryValues";
import { userItem } from "./useritem";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: { csgoItems?: csgoItem[], csgoItem?: csgoItem, userItems?: userItem[], userItem?: userItem, response?: string, userInventoryValue?: userInventoryValues,  userInventoryValues?: userInventoryValues[]};
}