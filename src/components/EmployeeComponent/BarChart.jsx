import * as React from 'react';
import { ChartContainer, BarPlot } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [4, 7, 8, 10, 9.5, 7.9, 6.9,4, 7, 8, 10, 9.5, 7.9, 6.9];
const xLabels = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N'
];

export default function TinyBarChart() {
  return (
    // <ChartContainer
    //   width={400}
    //   height={300}
    //   series={[{ data: uData, label: 'uv', type: 'bar' }]}
    //   xAxis={[{ data: xLabels, scaleType: 'band' }]}
    // >
    <BarChart
      sx={{width:'100%'}}
      height={300}
      series={[
        { data: uData, label: 'no. of hours', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
    //   <BarPlot />
    // </ChartContainer>
  );
}

