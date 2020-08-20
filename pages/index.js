import React, { useRef, useLayoutEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import styles from './index.module.css'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Chart from '../src/components/Chart'

export default function Index() {
  const [width, setWidth] = useState(null)
  const chartContainer = useRef(null)
  console.log(chartContainer)
  useLayoutEffect(() => {
    if (chartContainer.current) {
      setWidth(chartContainer.current.offsetWidth)
    }
  }, [])
  return (
    <Container maxWidth={false} className={styles.pageContainer}>
      <Grid container spacing={3} justify="center" gutterBottom>
        <Grid item xs={4} className={styles.titleContainer}>
          <Typography variant="h4" component="h1">
            Ruche Connectée
          </Typography>
        </Grid>
      </Grid>
      <div className={styles.spacer} />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={styles.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={styles.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.paper} ref={chartContainer}>
            <Chart width={width} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
