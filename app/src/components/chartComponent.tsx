import { Line } from 'react-chartjs-2' 

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ChartOptions
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
);

interface ChartProps {
    labels : Array<string>,
    values : Array<number>
}

export default function Chart(props: ChartProps) {
    const data = {
        labels: props.labels,
        datasets: [{
            label: "Numbers",
            data: props.values,
            borderColor: "#87CEEB",
            tension: 0.5
        }] 
    }

    const options : ChartOptions<"line"> = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                        weight: 'bold',
                    },
                },
            },
        },
        elements: {
            line: {
                borderWidth: 2,
            },
            point: {
                radius: 0,
            },
        },
    }
    return (
        <Line data={data} options={options}/>
    );
}
