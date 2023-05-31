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
let datasetIndex = 0; // Global counter

export const options = {

  responsive: true,

    interaction: {
      mode: 'nearest',
      axis: 'x',
    },  
    plugins: {
      tooltip: {
        filter: function(item, data) {
          if (item.datasetIndex % 3 === 1) {
            return false;
          } else {
            return true;
          }
        },
      },

      legend: {
        position: 'top',
        labels: {
          generateLabels: (chart) => {
            const allDatasets = chart.data.datasets;
            let labels = [];
    
            allDatasets.forEach((dataset, i) => {
              if (i % 3 === 0) {
                const color = dataset.borderColor;
                const text = dataset.label;
                const isHidden = dataset.hidden;
    
                labels.push({
                  text: text,
                  fillStyle: color,
                  hidden: isHidden ?? false,
                  lineCap: dataset.borderCapStyle,
                  lineDash: dataset.borderDash,
                  lineDashOffset: dataset.borderDashOffset,
                  lineJoin: dataset.borderJoinStyle,
                  lineWidth: dataset.borderWidth,
                  strokeStyle: color,
                  pointStyle: dataset.pointStyle,
                  datasetIndex: i
                });
              }
            });
    
            return labels;
          }
        },
        onClick: (evt, item, legend) => {
          let ci = legend.chart;
          const allDatasets = ci.data.datasets;
    
          const clickedDatasetIndex = item.datasetIndex;
          const startIndexOfGroup = clickedDatasetIndex - (clickedDatasetIndex % 3);
    
          for (let i = startIndexOfGroup; i < startIndexOfGroup + 3; i++) {
            let meta = ci.getDatasetMeta(i);
            const isHidden = meta.hidden === null ? !allDatasets[i].hidden : null;
            meta.hidden = isHidden;
          }
    
          item.hidden = item.hidden === null ? !item.hidden : null;
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

  //using power-log to calculate salary projections
  const alpha = y1;
  const beta = (y4 - y1) / Math.log(4);

  //lower k-value for higher salaries to smooth projections
  let k;
  if (y1 > 100000){
    k = 1.2;
  }
  else {
    k = 1.8;
  }

  const y = (x) => alpha + beta * Math.pow(Math.log(x),k);

  let data = [y1, y4]; // Start with y1 and y4

  for (let x = 2; x < years.length; x++) {
    // Compute the number of years to multiply the current salary by.
    data.push(y(years[x]));
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
// The rest of your code remains the same...

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

// solid line portion (from 1 to 2)
data.datasets.push({
  label: `${row.input1}, ${row.input2}`,
  data: [{x: labels[0], y: year1_salary}, {x: labels[1], y: year4_salary}],
  borderColor: color,
  backgroundColor: `${color}`,
  fill: false,
  order: datasetIndex++,
  pointRadius: 4, // Adjust the value to change the size of the data points
  pointHoverRadius: 7, // Adjust the value to change the size of the hover effect on data points
  pointHoverBorderWidth: 5, // Adjust the value to change the border width of the hover effect on data points
});

// Dotted line portion with no hover effect (from 2 to 3)
data.datasets.push({
  data: [{x: labels[1], y: year4_salary}, {x: labels[2], y: logData[2]}],
  borderColor: color,
  backgroundColor: `${color}`,
  fill: false,
  borderDash: [5, 10],
  order: datasetIndex++,
});

// dotted line portion with hover effect (from 3 onward)
let logDataPoints = logData.slice(2).map((value, index) => {
  return {
    x: labels[index+2],
    y: value
  };
});

data.datasets.push({
  label: `${row.input1}, ${row.input2}` + ' 3% Annual Increase Projection',
  data: logDataPoints,
  borderColor: color,
  backgroundColor: `${color}`,
  fill: false,
  borderDash: [5, 10],
  order: datasetIndex++,
  pointRadius: 4, // Adjust the value to change the size of the data points
  pointHoverRadius: 7, // Adjust the value to change the size of the hover effect on data points
  pointHoverBorderWidth: 5, // Adjust the value to change the border width of the hover effect on data points
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
