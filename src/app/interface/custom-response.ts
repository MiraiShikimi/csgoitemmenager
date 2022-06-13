import { csgoItem } from "./csgoItem";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: { csgoItems?: csgoItem[], csgoItem?: csgoItem };
}