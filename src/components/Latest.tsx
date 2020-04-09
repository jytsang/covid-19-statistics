import React from 'react'

import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { getHighestIncrease } from 'utils/calculateStats'

const useStyles = makeStyles(theme => ({
  box: {
    height: '100%',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[900]
  },
  confirmed: {
    color: theme.palette.warning.light
  },
  deaths: {
    color: theme.palette.error.light
  },
  recovered: {
    color: theme.palette.success.light
  },
}))

type LatestProps = {
  data: any
}

export const Latest: React.FC<LatestProps> = ({
  data
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <div className={classes.box}>
      <Typography variant="h6" component="h3">{t('latest')} {`(${data[data.length - 1].date})`}</Typography>
      <List>
        <ListItem>
          <ListItemText
            primary={
              <>
                Confirmed: <Typography component="span" className={classes.confirmed}>{data[data.length - 1].confirmed}</Typography>
              </>
            }
            secondary={`Highest increase: ${getHighestIncrease('confirmed', data)}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                Deaths: <Typography component="span" className={classes.deaths}>{data[data.length - 1].deaths}</Typography>
              </>
            }
            secondary={`Highest increase: ${getHighestIncrease('deaths', data)}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <>
                Recovered: <Typography component="span" className={classes.recovered}>{data[data.length - 1].recovered}</Typography>
              </>
            }
            secondary={`Highest increase: ${getHighestIncrease('recovered', data)}`}
          />
        </ListItem>
      </List>
    </div>
  )
}
