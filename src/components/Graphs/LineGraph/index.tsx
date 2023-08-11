import React from "react";
import { shape } from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function LineGraph({ data }: { data: object }) {
  return (
    <LineChart
      width={400}
      height={250}
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
      <Line
        type="monotone"
        dataKey="IN"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="OUT" stroke="#82ca9d" />
    </LineChart>
  );
}

/**
 * Prop types
 */
LineGraph.propTypes = {
  data: shape({}),
};

/**
 * Default Props
 */
LineGraph.defaultProps = {
  data: {},
};
