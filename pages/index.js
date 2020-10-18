import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import styles from './index.module.css'
import moment from 'moment'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { FitnessCenter, AcUnit, Speed, AccessAlarm, Home, BrightnessLow, Opacity, Cloud, BatteryChargingFull } from '@material-ui/icons'
import Chart from '../src/components/Chart'
import StatValue from '../src/components/StatValue'

const API_URL = "/"

export default function Index() {
  const [width, setWidth] = useState(null)
  const chartContainer = useRef(null)
  const [measure, setMeasure] = useState({})
  const [graph, setGraph] = useState([])

  const getData = () => {
    fetch(`${API_URL}api/index.php`, { mode: 'cors' }).then((response) =>
        response.json()
      )
      .then(data => {
        setMeasure(data.measure)
        setGraph(data.graphs)
      })
  }

  useEffect(() => {
    setInterval(getData, 1000)
  }, [])
  useLayoutEffect(() => {
    if (chartContainer.current) {
      setWidth(chartContainer.current.offsetWidth)
    }
  }, [])
  return (
    <Container maxWidth={false} className={styles.pageContainer}>
      <Grid container spacing={3} justify="center" gutterBottom>
        <Grid item md={4} className={styles.titleContainer}>
          <Typography variant="h4" component="h1">
            Ruche Connectée
          </Typography>
        </Grid>
      </Grid>
      <div className={styles.spacer} />
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <Paper className={styles.paper}>
            <StatValue
              picto={<FitnessCenter fontSize="large" />}
              label="Poids"
              value={measure.poids}
            />
            <StatValue
              picto={<AcUnit fontSize="large" />}
              label="Température extérieure"
              value={measure.temp_ext}
            />
            <StatValue
              picto={<Home fontSize="large" />}
              label="Température intérieure"
              value={measure.temp_int}
            />
          </Paper>
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper className={styles.paper}>
            <StatValue
              picto={<BrightnessLow fontSize="large" />}
              label="Luminosité"
              value={measure.luminosite}
            />
            <StatValue
              picto={<Opacity fontSize="large" />}
              label="Humidité"
              value={measure.humidite}
            />
            <StatValue
              picto={<Cloud fontSize="large" />}
              label="Pression athmosphérique"
              value={measure.pression_ath}
            />
          </Paper>
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper className={styles.paper}>
            <StatValue
              picto={<BatteryChargingFull fontSize="large" />}
              label="Tension"
              value={measure.tension}
            />
            <StatValue
              picto={<BatteryChargingFull fontSize="large" />}
              label="Intensité"
              value={measure.intensite}
            />
            <StatValue
              picto={<AccessAlarm fontSize="large" />}
              label="Heure"
              value={moment(measure.date).format('DD/MM/Y HH:mm')}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.paper} ref={chartContainer}>
            <Typography variant="h4" component="h3" className={styles.textCenter}>
              Mesure sur 3 mois
            </Typography>
            <Chart width={width} data={graph.month} unitFormat="DD/MM/Y" />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.paper} ref={chartContainer}>
            <Typography variant="h4" component="h3" className={styles.textCenter}>
              Mesure sur 24H
            </Typography>
            <Chart width={width} data={graph.day} unitFormat="HH:mm" />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
