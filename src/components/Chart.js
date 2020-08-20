import React, { useRef } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const Chart = ({ width }) => {
  console.log(width, 'maxWidth')
  return (
    <LineChart width={width} height={width / 3} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" yAxisId="uv" />
      <YAxis orientation="right" dataKey="uv" yAxisId="uv" />
      <Line type="monotone" dataKey="pv" stroke="#880000" />
      <YAxis orientation="left" dataKey="pv" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <Tooltip />
    </LineChart>
  )
}

export default Chart
