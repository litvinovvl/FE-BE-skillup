import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

const styles = createStyles({
  wrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    opacity: 0.75,
    zIndex: 10000,
  }
})

interface ISpinnerProps extends WithStyles<typeof styles> {};

const Spinner: React.SFC<ISpinnerProps> = ({ classes: { wrapper } }): JSX.Element => (
  <div className={wrapper}>
    <CircularProgress />
  </div>
);

export default withStyles(styles)(Spinner);
