import React from 'react'
import {
  Drawer,
  Hidden,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    [theme.breakpoints.up('sm')]: {
      width: 300
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

  return (
    <nav className={className}>
      <Hidden xsDown implementation="css">
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
