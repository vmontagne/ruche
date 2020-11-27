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
// const API_URL = "http://ruche.msabarthes.fr/"

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
    getData()
    setInterval(getData, 300000)
  }, [])
  useLayoutEffect(() => {
    if (chartContainer.current) {
      setWidth(chartContainer.current.offsetWidth)
    }
  }, [])
  return (
    <Container className={styles.pageContainer}>
      <Grid container spacing={3} justify="space-between" gutterBottom>
        <Grid item xs="auto">
          <img src="/images/LogoAssoc.jpg" />
        </Grid>
        <Grid item xs="auto" >
          <Typography variant="h4" component="h1">
            Frejeville<br/>
            Tarn
          </Typography>
        </Grid>
      </Grid>
      <div className={styles.spacer} />
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
              suffix="Kg"
            />
            <StatValue
              picto={<AcUnit fontSize="large" />}
              label="Température extérieure"
              value={measure.temp_ext}
              suffix="°C"
            />
            <StatValue
              picto={<Home fontSize="large" />}
              label="Température intérieure"
              value={measure.temp_int}
              suffix="°C"
            />
          </Paper>
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper className={styles.paper}>
            <StatValue
              picto={<BrightnessLow fontSize="large" />}
              label="Luminosité"
              value={measure.luminosite}
              suffix="Lux"
            />
            <StatValue
              picto={<Opacity fontSize="large" />}
              label="Humidité"
              value={measure.humidite}
              suffix="%"
            />
            <StatValue
              picto={<Cloud fontSize="large" />}
              label="Pression athmosphérique"
              value={measure.pression_ath}
              suffix="mBars"
            />
          </Paper>
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper className={styles.paper}>
            <StatValue
              picto={<BatteryChargingFull fontSize="large" />}
              label="Tension"
              value={measure.tension / 10}
              suffix="Volts"
            />
            <StatValue
              picto={<BatteryChargingFull fontSize="large" />}
              label="Intensité"
              value={measure.intensite}
              suffix="mA"
            />
            <StatValue
              picto={<AccessAlarm fontSize="large" />}
              label="Heure"
              value={moment(measure.date).format('DD/MM/Y HH:mm')}
              suffix="T.U."
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.paper} ref={chartContainer}>
            <Typography variant="h4" component="h3" className={styles.textCenter}>
              Mesure sur 3 mois à 12h T.U.
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
