import React from 'react'
import {
  Drawer,
  Hidden,
  makeStyles,
  Typography
} from '@material-ui/core'

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
}))

type SideNavProps = {
  className?: string
}

export const SideNav: React.FC<SideNavProps> = ({
  children,
  className = ''
}) => {
  const classes = useStyles()

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
          {children}
        </Drawer>
      </Hidden>
    </nav>
  )
}
