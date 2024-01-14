import { ECircleType } from "../models/ECircleType";

interface TemperatureCircleProps {
    circletType : ECircleType;
    temperature : number;
    description? : string;
    hour? : string
}

export default function TemperatureCircle(props: TemperatureCircleProps) {
    return (<>
        {props.circletType === ECircleType.primaryCircle && <PrimaryTemperatureCircle 
            circletType={props.circletType}
            temperature={props.temperature}
            description={props.description}
        />}
        {props.circletType === ECircleType.secondaryCircle && <SecondaryTemperatureCircle 
            circletType={props.circletType}
            temperature={props.temperature}
            hour={props.hour}
        />}
        {props.circletType === ECircleType.shortCircle && <ShorttemperatureCircle 
            circletType={props.circletType}
            temperature={props.temperature}
        />}
    </>)
}

const PrimaryTemperatureCircle = (props : TemperatureCircleProps) => {
    return <div className="primary-circle">
        <p className="primary-circle--number">{props.temperature}°</p>
        <p className="primary-circle--type">{props.description}</p>
    </div>
}

const SecondaryTemperatureCircle = (props : TemperatureCircleProps) => {
    return <div className="secondary-circle">
        <div className="secondary-circle--circle">
            <p className="secondary-circle--circle__value">{props.temperature}°</p>
        </div>
        <p className="secondary-circle--hour">{props.hour}</p>
    </div>
}

const ShorttemperatureCircle = (props: TemperatureCircleProps) => {
    return <div className="short-circle">
        <p className="short-circle--number">{props.temperature}°</p>
    </div>
}