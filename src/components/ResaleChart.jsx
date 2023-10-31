/**
ResaleChart component renders a bar chart using Recharts library to display the predicted resale value of a product.
@param {Object} props - The props object containing the predicted resale value of a product.
@param {number} props.resaleValue - The predicted resale value of the product.
@returns {JSX.Element} - The JSX element for the ResaleChart component.
*/

import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";

export default function ResaleChart(props) {
  const data = [{ price: props.resaleValue }];
  return (
    <ResponsiveContainer width="100%" height={400}>
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
