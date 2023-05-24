import React from 'react';
import {XYPlot, XAxis, YAxis, LineSeries} from 'react-vis';

const data = [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
];

function LineChart() {
  return (
    <XYPlot width={300} height={300}>
      <XAxis />
      <YAxis />
      <LineSeries data={data} />
    </XYPlot>
  );
}

export default LineChart;
