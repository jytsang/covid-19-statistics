import React from 'react'
import {
  Drawer,
  Hidden
} from '@material-ui/core'

type SideNavProps = {
  className?: string
}

export const SideNav: React.FC<SideNavProps> = ({
  children,
  className = ''
}) => {
  return (
    <nav className={className}>
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
