import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Button, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

interface INavigationProps extends WithStyles<typeof styles> {}

export const Navigation: React.SFC<INavigationProps> = ({ classes: { grow, link, activeLink } }): JSX.Element => (
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
);

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

