import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend
);

const LineCharts = ({ diagnosisHistory }) => {

    let timeline = [...diagnosisHistory].reverse();

    timeline = timeline.slice(-6);

    const data = {
        labels: timeline.map((item) => `${item.month} ${item.year}`),
        datasets: [
            {
                label: 'Systolic',
                data: timeline.map((item) => item.blood_pressure.systolic.value),
                borderColor: '#E66FD2',
                backgroundColor: '#E66FD2',
                tension: 0.5,
                pointRadius: 4,
                PointBackgroundColor: timeline.map(record => 
                    record.blood_pressure.systolic.levels === "Higher than Average" ? '#E66FD2' : 
                    record.blood_pressure.systolic.levels === "Lower than Average" ? 
                    '#8C6FE6' : '#E66FD2'
                ),
            },
            {
                label: 'Diastolic',
                data: timeline.map((item) => item.blood_pressure.diastolic.value),
                borderColor: '#8C6FE6',
                backgroundColor: '#8C6FE6',
                tension: 0.5,
                pointRadius: 4,
                PointBackgroundColor: timeline.map(record =>
                    record.blood_pressure.diastolic.levels === "Higher than Average" ?
                    '#8C6FE6' : record.blood_pressure.diastolic.levels === "Lower than Average" ? 
                    '#8C6FE6' : '#E66FD2'
                ),
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend:{
                display: false,
            },
            scales: {
                y: {
                    min: 60,
                    max: 180,
                    ticks: {
                        stepSize: 20,
                    }
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
        }
    }
  
    return (
        <div className="w-full h-[250px] p-4 bg-[#F4F0FE] rounded-lg">
        <Line options={options} data={data} />
        </div>
    );
};

export default LineCharts;