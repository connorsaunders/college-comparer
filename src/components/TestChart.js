////////////////////////////////////////////////////////////////////////////////////////
//                                  Imports
////////////////////////////////////////////////////////////////////////////////////////

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

////////////////////////////////////////////////////////////////////////////////////////
//                                  Table Options
////////////////////////////////////////////////////////////////////////////////////////

export const options = {
  responsive: true,
  
  plugins: {
    legend: {
      position: 'top',
      labels: {
        generateLabels: (chart) => {
          let legends = chart.data.datasets.map((dataset, i) => {
            return {
              text: dataset.label,
              fillStyle: dataset.borderColor,
              hidden: dataset.hidden ?? false,
              lineCap: dataset.borderCapStyle,
              lineDash: dataset.borderDash,
              lineDashOffset: dataset.borderDashOffset,
              lineJoin: dataset.borderJoinStyle,
              lineWidth: dataset.borderWidth,
              strokeStyle: dataset.borderColor,
              pointStyle: dataset.pointStyle,
              datasetIndex: i
            };
          });
          let pairLegends = [];
          for (let i = 0; i < legends.length; i += 2) {
            pairLegends.push({
              text: `${legends[i].text}`,

              fillStyle: legends[i].fillStyle,

              hidden: legends[i].hidden,
              lineCap: legends[i].lineCap,
              lineDash: legends[i].lineDash,
              lineDashOffset: legends[i].lineDashOffset,
              lineJoin: legends[i].lineJoin,
              lineWidth: legends[i].lineWidth,
              strokeStyle: legends[i].strokeStyle,
              pointStyle: legends[i].pointStyle,

              datasetIndices: [legends[i].datasetIndex, legends[i+1].datasetIndex]
            });
          }
          return pairLegends.map((legend) => {
            return {
              ...legend,
              hidden: legend.datasetIndices.every((datasetIndex) => chart.getDatasetMeta(datasetIndex).hidden)
            };
          });
        }
      },
      onClick: (evt, item, legend) => {
        let ci = legend.chart;
        item.datasetIndices.forEach((datasetIndex) => {
          let meta = ci.getDatasetMeta(datasetIndex);
          meta.hidden = meta.hidden === null ? !ci.data.datasets[datasetIndex].hidden : null;
        });
        ci.update();
      }
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
        text: 'Post Graduation:',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Median Salary:',
      },
      min: 0,
    
      stepSize: 20000,
      ticks: {
        callback: function(value, index, values) {
          return '$' + value.toLocaleString();
        },
      },
    },
  },
      // https://www.chartjs.org/docs/latest/configuration/animations.html      
};

////////////////////////////////////////////////////////////////////////////////////////
//                              Generating Projection
////////////////////////////////////////////////////////////////////////////////////////

function generateProjection(y1, y4) {
  const years = [1, 4, 10, 15, 20, 25, 30]; // New years array
  const r = 0.03;

  let data = [y1, y4]; // Start with y1 and y4

  let currentYearSalary = y4;

  for (let x = 2; x < years.length; x++) {
    // Compute the number of years to multiply the current salary by.
    const numYears = years[x] - years[x - 1];
    currentYearSalary *= Math.pow(1 + r, numYears);
    data.push(currentYearSalary);
  }

  return data;
}
////////////////////////////////////////////////////////////////////////////////////////
//                                  Table Data
////////////////////////////////////////////////////////////////////////////////////////

export function TestChart({ tableData }) {
  const labels = ['1 Year', '4 Years', '10 Years', '15 Years', '20 Years', '25 Years', '30 Years'];

  const colors = [
    'rgb(255, 99, 132)', // Red
    'rgb(54, 162, 235)', // Blue
    'rgb(255, 206, 86)', // Yellow
    'rgb(75, 192, 192)', // Green
  ];

  const data = {
    labels,
    datasets: [],
  };

////////////////////////////////////////////////////////////////////////////////////////
//                                  Implement Each Row
////////////////////////////////////////////////////////////////////////////////////////

  tableData.forEach((row, index) => {
    const color = colors[index % colors.length];

    // if neither year1_salary nor year4_salary is present, just continue to the next row
    if (
      (row.year1_salary === null || row.year1_salary === undefined) &&
      (row.year4_salary === null || row.year4_salary === undefined)
    ) {
      return;
    }

    let year1_salary = row.year1_salary;
    let year4_salary = row.year4_salary;

    // if year1_salary is not present, estimate it as year4_salary divided by a 9% increase over 3 years
    if (row.year1_salary === null || row.year1_salary === undefined) {
      year1_salary = year4_salary / Math.pow(1 + 0.03, 3);
    }

    // if year4_salary is not present, estimate it as year1_salary increased by 9% over 3 years
    if (row.year4_salary === null || row.year4_salary === undefined) {
      year4_salary = year1_salary * Math.pow(1 + 0.03, 3);
    }

    const logData = generateProjection(year1_salary, year4_salary);

    // solid line portion (from 1 to 4)
    data.datasets.push({
      label: `${row.input1}, ${row.input2}`,
      data: [year1_salary, year4_salary],
      borderColor: color,
      backgroundColor: `${color}`,
      fill: false,
      order: index,
    });

    // dotted line portion
    data.datasets.push({
      label: `${row.input1}, ${row.input2}` + ' 3% Annual Increase Projection',
      data: [...logData.slice(0)],
      borderColor: color,
      backgroundColor: `${color}`,
      fill: false,
      borderDash: [5, 10],
      order: index,
      pointHitRadius: 0,
    });
  });

////////////////////////////////////////////////////////////////////////////////////////
//                                  Return the Chart
////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ height: '500px', width: '100%', maxWidth: '1100px', padding: '0 20px', marginBottom: '10px', marginTop: '10px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
