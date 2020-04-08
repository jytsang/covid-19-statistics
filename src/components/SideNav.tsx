import React from 'react'
import { Link } from 'react-router-dom'
import {
  Drawer,
  Hidden,
  makeStyles,
  ListItemText,
  MenuItem,
  Typography
} from '@material-ui/core'

import { getGlobalLatest } from 'api/covidApi'

const useStyles = makeStyles(theme => ({
  confirmed: {
    color: theme.palette.warning.light
  },
  deaths: {
    color: theme.palette.error.light
  },
  recovered: {
    color: theme.palette.success.light
  },
  drawerPaper: {
    [theme.breakpoints.up('sm')]: {
      width: 300,
      height: 'calc(100% - 33px)',
      marginTop: '33px'
    }
  },
  header: {
    display: 'flex',
    zIndex: 2,
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: '6px 30px 6px 16px',
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
    backgroundColor: theme.palette.background.paper,
    '& > span': {
      width: '33.33%'
    }
  },
  stats: {
    display: 'flex',
    '& > span': {
      width: '33.33%'
    }
  },
  link: {
    display: 'block',
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:first-child': {
      borderTop: 'none'
    }
  }
}))

type SideNavProps = {
  className?: string
}

export const SideNav: React.FC<SideNavProps> = ({
  children,
  className = ''
}) => {
  const classes = useStyles()
  const [globalData, setGlobalData] = React.useState<any>(null)

  React.useEffect(
    () => {
      getGlobalLatest()
        .then(data => {
          setGlobalData(data)
        })
    },
    []
  )

  return (
    <nav className={className}>
      <Hidden xsDown implementation="css">
        <div className={classes.header}>
          <Typography variant="body2" component="span" className={classes.confirmed}>
            confirmed
          </Typography>
          <Typography variant="body2" component="span" className={classes.deaths}>
            deaths
          </Typography>
          <Typography variant="body2" component="span" className={classes.recovered}>
            recovered
          </Typography>
        </div>
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {globalData &&
            <Link to="/" className={classes.link}>
              <MenuItem button>
                <ListItemText
                  primary="Global"
                  secondary={
                    <span className={classes.stats}>
                      <Typography variant="body2" component="span" className={classes.confirmed}>
                        {globalData.confirmed}
                      </Typography>
                      <Typography variant="body2" component="span" className={classes.deaths}>
                        {globalData.deaths}
                      </Typography>
                      <Typography variant="body2" component="span" className={classes.recovered}>
                        {globalData.recovered}
                      </Typography>
                    </span>
                  }
                />
              </MenuItem>
            </Link>
          }
          {children}
        </Drawer>
      </Hidden>
    </nav>
  )
}
