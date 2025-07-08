'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type CustomChartProps = {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
  height?: number;
  width?: number;
};

const CustomChart: React.FC<CustomChartProps> = ({ data, options, height = 400, width = 600 }) => {
  return (
    <div className="w-full">
      <Line data={data} options={options} height={height} width={width} />
    </div>
  );
};

export default CustomChart;
