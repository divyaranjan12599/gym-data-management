import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const DonutChartComponent = ({ data, dataKey, nameKey, title, colors }) => {
  return (
    <div>
      <h4 className="text-center my-3">{title}</h4>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default DonutChartComponent;
