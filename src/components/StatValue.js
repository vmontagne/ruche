import React from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './StatValue.module.css'
import Typography from '@material-ui/core/Typography'

const StatValue = ({ picto, label, value, suffix }) => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className={styles.container}
      spacing={2}
    >
      <Grid item>{picto}</Grid>
      <Grid item>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item>
        <Typography>:</Typography>
      </Grid>
      <Grid item>
        <Typography>
          {value} {suffix}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default StatValue
