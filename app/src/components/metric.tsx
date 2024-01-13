interface MetricProps {
    svgElement : React.ReactElement;
    value : string;
}

export default function Metric(props: MetricProps) {
    return <div className="metric">
        <div className='metric--image-wrapper'>
            {props.svgElement}
        </div>        
        <p className="metric--value">{props.value}</p>
    </div>
}