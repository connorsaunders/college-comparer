import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Price vs. Time',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Years after Graduation',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Median Salary in $',
      },
      ticks: {
        callback: function(value, index, values) {
          // Convert the number to a string and add commas as thousand separators
          return '$' + value.toLocaleString();
        }
      }
    },
  },
};

const labels = ['1', '5', '10', '15', '20', '25', '30'];

export const data = {
  labels,
  datasets: [
    {
      label: 'University of Delaware, Computer Science',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 80000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'The Pennsylvania State University, Computer Science',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 80000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function TestChart() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ height: '500px', width: '100%', maxWidth: '1100px', padding: '0 20px', marginBottom: '10px', marginTop: '10px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
