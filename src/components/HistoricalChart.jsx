/**
 * A reusable component that renders a responsive area chart using Recharts library.
 * @component
 **/

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart(props) {
  /**
   * Renders a responsive area chart.
   * @method
   * @param {object} props - The props object containing data to be plotted.
   * @param {Array<object>} props.data - The data to be plotted on the chart.
   * @returns {JSX.Element} - A responsive area chart.
   */
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={props.data}
        margin={{
          top: 30,
          right: 15,
          left: 15,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="resale_price"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
