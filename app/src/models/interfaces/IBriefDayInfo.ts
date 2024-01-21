import { ITemperature } from "./ITemperature"

export interface IBriefDayInfo {
    averageHumidity : number,
    averageWind : number,
    averagePressure : number,
    hourlyTemperature : Array<ITemperature>
}