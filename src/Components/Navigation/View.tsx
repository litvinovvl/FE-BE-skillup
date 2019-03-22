import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { createStyles, withStyles } from '@material-ui/core/styles';

const styles = createStyles({
  grow: {
    flexGrow: 1,
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

const Navigation = ({ classes: { grow, link, activeLink } }: any) => {
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

export default withStyles(styles)(Navigation);

