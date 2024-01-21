import { EWindDirectionType } from "../enums/EWindDirectionType";

export interface IWind {
    wind : number,
    direction : EWindDirectionType,
    hour : string
}