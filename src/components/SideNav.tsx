import React from 'react'
import {
  Drawer,
  Hidden
} from '@material-ui/core'

export const SideNav: React.FC = ({
  children
}) => {
  return (
    <nav>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          open
        >
          {children}
        </Drawer>
      </Hidden>
    </nav>
  )
}
