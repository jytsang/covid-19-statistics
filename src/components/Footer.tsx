import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  footer: {
    minHeight: '30px',
    padding: theme.spacing(3)
  }
}))

export const Footer: React.FC = props => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>Created by Jeun Yun Tsang</footer>
  )
}
