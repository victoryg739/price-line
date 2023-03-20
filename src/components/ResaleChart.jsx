import { PureComponent } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

export default function ResaleChart(props) {
  const data = [{ name: "Predicted Value", price: props.resaleValue }];
  return (
    <ResponsiveContainer  width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey = "name"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
