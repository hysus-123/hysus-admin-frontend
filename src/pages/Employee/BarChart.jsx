import * as React from 'react';
import { ChartContainer, BarPlot } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 3590, 3495, 3390, 4490, 2490];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
  'Page H',
  'Page I',
  'Page J',
  'Page K',
  'Page L',
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
        { data: uData, label: 'uv', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
    //   <BarPlot />
    // </ChartContainer>
  );
}

