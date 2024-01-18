import { EWindDirectionType } from '../models/EWindDirectionType'
import { getDirectionName, getDirectionDegree } from '../utils/windUtils'

import arrow from '../assets/arrow.svg'

interface WindCardProps {
    windDirection : EWindDirectionType,
    wind : number,
    hour : string
}

export default function WindCard(props: WindCardProps) {
    return <div className="wind">
        <p className="wind--hour">{props.hour}</p>
        <div className="wind--card">
            <p className="wind--card__value">{props.wind}</p>
            <p className="wind--card__direction">{getDirectionName(props.windDirection)}</p>
            <div className="wind--card__arrow">
                <img src={arrow} alt="" style={{
                    transform: `rotate(${getDirectionDegree(props.windDirection)}deg)`
                }}/>
            </div>
        </div>
    </div>
}