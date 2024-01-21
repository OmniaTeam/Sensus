import { EWindDirectionType } from "../models/enums/EWindDirectionType";

export const getDirectionName = (type : EWindDirectionType) => {
    switch (type) {
        case EWindDirectionType.N: return "С"
        case EWindDirectionType.NE: return "СВ"
        case EWindDirectionType.NW: return "СЗ"
        case EWindDirectionType.S: return "Ю"
        case EWindDirectionType.SE: return "ЮВ"
        case EWindDirectionType.SW: return "ЮЗ"
        case EWindDirectionType.E: return "В"
        case EWindDirectionType.W: return "З"
    }
}

export const getDirectionDegree = (type : EWindDirectionType) => {
    switch (type) {
        case EWindDirectionType.N: return 0
        case EWindDirectionType.NE: return 45
        case EWindDirectionType.NW: return -45
        case EWindDirectionType.S: return 180
        case EWindDirectionType.SE: return 135
        case EWindDirectionType.SW: return -135
        case EWindDirectionType.E: return 90
        case EWindDirectionType.W: return -90
    }
}