import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
// @ts-ignore
import { VectorMap } from '@south-paw/react-vector-maps'
import worldLowRes from 'data/maps/world-low-res.json'

const useStyles = makeStyles(theme => ({
  box: {
    height: '100%',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[900]
  },
  map: {
    stroke: theme.palette.grey[900],
    '& path': {
      fill: theme.palette.grey[600],
      '&:hover': {
        fill: theme.palette.action.active,
        cursor: 'pointer'
      }
    }
  }
}))

export const WorldMap: React.FC = props => {
  const classes = useStyles()
  const history = useHistory()

  const onClick = React.useCallback(
    ({ target }) => {
      history.push(`/${target.attributes.isoCode.value}`)
    },
    [history]
  )

  return (
    <div className={classes.box}>
      <VectorMap
        {...worldLowRes}
        layerProps={{ onClick }}
        className={classes.map}
      />
    </div>
  )
}
