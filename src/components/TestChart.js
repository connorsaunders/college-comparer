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

              // Below is extra data used for the onClick event
              datasetIndex: i
            };
          });

          // Pair each two legends into a single item.
          let pairLegends = [];
          for (let i = 0; i < legends.length; i += 2) {
            pairLegends.push({
              // Combine text from both legends
              text: `${legends[i].text}`,

              // Choose one color or mix as you prefer
              fillStyle: legends[i].fillStyle,

              hidden: legends[i].hidden,
              lineCap: legends[i].lineCap,
              lineDash: legends[i].lineDash,
              lineDashOffset: legends[i].lineDashOffset,
              lineJoin: legends[i].lineJoin,
              lineWidth: legends[i].lineWidth,
              strokeStyle: legends[i].strokeStyle,
              pointStyle: legends[i].pointStyle,

              // Keep the dataset indices
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
        // Toggle both datasets when the legend item is clicked
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
};

function generateProjection(y4) {
  const n = 16; // Number of years starting from 4 years post-graduation
  const r = 0.0766; // Annual growth rate

  let data = [];
  let currentYearSalary = y4;

  for (let x = 4; x <= n + 3; x += 1) {
    data.push(currentYearSalary);
    currentYearSalary *= (1 + r);
  }

  return data;
}

export function TestChart({ tableData }) {
  const labels = ['1 Year', '4 Years', '7 Years', '10 Years', '13 Years', '16 Years', '19 Years'];

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

  tableData.forEach((row, index) => {
    const color = colors[index % colors.length];

    // if neither year1_salary nor year4_salary is present, just continue to the next row
    if ((row.year1_salary === null || row.year1_salary === undefined) && (row.year4_salary === null || row.year4_salary === undefined)) {
      return;
    }

    let year1_salary = row.year1_salary;
    let year4_salary = row.year4_salary;

    // if year1_salary is not present, estimate it as year4_salary divided by a 9% increase over 3 years
    if (row.year1_salary === null || row.year1_salary === undefined) {
      year1_salary = year4_salary / Math.pow(1.0776, 3);
    }

    // if year4_salary is not present, estimate it as year1_salary increased by 9% over 3 years
    if (row.year4_salary === null || row.year4_salary === undefined) {
      year4_salary = year1_salary * Math.pow(1.0776, 3);
    }

    const logData = generateProjection(year4_salary);

    // Calculate the number of missing years to shift the line
    let missingYears = 0;
    if (row.year1_salary === null || row.year1_salary === undefined) {
      missingYears = 2; // If year1 is missing, we have 3 missing years
    }

    // solid line portion (from 1 to 4)
    data.datasets.push({
      label: `${row.input1}, ${row.input2}`,
      data: [year1_salary, year4_salary],
      borderColor: color,
      backgroundColor: `${color}`,
      fill: false,
      order: index,
    });

    // dotted line portion (projection starting from 4)
    data.datasets.push({
      label: `${row.input1}, ${row.input2}` + ' Projection',
      data: [null, ...logData.slice(0)],
      borderColor: color,
      backgroundColor: `${color}`,
      fill: false,
      borderDash: [5, 5],
      order: index,
      pointHitRadius: 0,
    });
  });

  const maxSalary = Math.max(...data.datasets.flatMap((dataset) => dataset.data));
  options.scales.y.max = Math.ceil(maxSalary / 100000) * 100000; // Set the maximum y-axis value

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          height: '500px',
          width: '100%',
          maxWidth: '1100px',
          padding: '0 20px',
          marginBottom: '10px',
          marginTop: '10px',
        }}
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
