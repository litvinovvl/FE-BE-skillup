import React from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

interface INavigationProps extends WithStyles<typeof styles> {}

export const Navigation: React.SFC<INavigationProps> = ({ classes: { grow, link, activeLink } }) => {
  return (
    <CssBaseline>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" className={grow}>
            SkillCasts
          </Typography>
          <NavLink to="/" exact activeClassName={activeLink} className={link}><Button color="inherit">Home</Button></NavLink>
          <NavLink to="/podcasts" activeClassName={activeLink} className={link}><Button color="inherit">Podcasts</Button></NavLink>
        </Toolbar>
      </AppBar>
    </CssBaseline>
  )
}

const styles = createStyles({
  grow: {
    flexGrow: 1,
    color: "#AED6F1",
  },
  link: {
    color: "white",
    textDecoration: "none"
  },
  activeLink: {
    color: "#AED6F1",
    textDecoration: "none"
  }
});

export default withStyles(styles)(Navigation);
