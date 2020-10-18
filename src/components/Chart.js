import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,Legend } from 'recharts'
import styles from './StatValue.module.css'
import moment from 'moment'
const mockData = [
  {
    t: '2020-01-01',
    weight: 20,
    temp: 19,
  },
  {
    t: '2020-02-01',
    weight: 35,
    temp: 22,
  },
  {
    t: '2020-03-01',
    weight: 40,
    temp: 26,
  },
  {
    t: '2020-04-01',
    weight: 45,
    temp: 15,
  },
  {
    t: '2020-05-01',
    weight: 50,
    temp: 25,
  },
  {
    t: '2020-06-01',
    weight: 60,
    temp: 29,
  },
  {
    t: '2020-07-01',
    weight: 70,
    temp: 35,
  },
]

const Chart = ({ width, data, unitFormat }) => {
  const formatUnits = (value) => {
    return moment(value).format(unitFormat)
  }
  const tooltipFormatter = (value) => {
    return moment(value).format(unitFormat)
  }
  return (
    <LineChart width={width} height={width / 3} data={data}>
      <CartesianGrid stroke="#ccc" />
      <Line type="monotone" dataKey="poids" stroke="#8884d8" yAxisId="poids" name="poids" />
      <YAxis orientation="right" dataKey="poids" yAxisId="poids"/>
      <Line type="monotone" dataKey="temp_ext" stroke="#880000" name="temperature" />
      <YAxis orientation="left" dataKey="temp_ext" />
      <Legend verticalAlign="top" height={36} />
      <XAxis dataKey="date" tickFormatter={formatUnits} />
      <Tooltip labelFormatter={tooltipFormatter} />
    </LineChart>
  )
}

export default Chart
