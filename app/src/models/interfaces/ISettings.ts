import { ETemperatureMetric } from "../enums/ETemperatureMetric"

export interface ISettings {
    temperatureMetric : ETemperatureMetric,
    source : string
}