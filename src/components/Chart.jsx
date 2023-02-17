
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export default function Chart(props) {
  return (
    <AreaChart
      width={600}
      height={400}
      data={props.data}
      margin={{
        top: 30,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="resale_price" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
}
