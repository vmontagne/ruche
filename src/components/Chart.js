import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,Legend , Label} from 'recharts'
import styles from './StatValue.module.css'
import moment from 'moment'

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
      <YAxis orientation="right" dataKey="poids" yAxisId="poids" domain={['dataMin', 'dataMax']}>
        <Label position="insideTopRight" value="Kg" />
      </YAxis>
      <Line type="monotone" dataKey="temp_ext" stroke="#880000" name="temperature extérieure" yAxisId="temp_ext" />
      <YAxis orientation="left" dataKey="temp_ext" yAxisId="temp_ext" domain={['dataMin', 'dataMax']}>
        <Label position="insideTopLeft" value="°C" />
        </YAxis>
      <Legend verticalAlign="top" height={36} />
      <XAxis dataKey="date" tickFormatter={formatUnits} />
      <Tooltip labelFormatter={tooltipFormatter} />
    </LineChart>
  )
}

export default Chart
