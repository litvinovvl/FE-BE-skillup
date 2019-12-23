import React from "react";
import Paper from "@material-ui/core/Paper";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

interface IHomeProps extends WithStyles<typeof styles> {}

const Home: React.SFC<IHomeProps> = ({ classes: { container, heading } }): JSX.Element => {
  const FE = ["Typescript", "React + Redux", "Formik"];
  const BE = ["Node JS", "Typescript", "Express", "Postgresql + Typeorm"];
  const tests = ["Jest + Enzyme", "Mocha", "Cypress"];

  return (
    <Paper className={container}>
      <h1 className={heading}>This is the spring skillup project.</h1>
      <p>This project was written to learn a several front-end and back-end libraries.</p>
      <span>
        <h4 className={heading}>For FE part is used:</h4>
        <ul>
          {FE.map((title, index) => (<li key={index}>{title}</li>))}
        </ul>
        <h4 className={heading}>For BE part is used:</h4>
        <ul>
          {BE.map((title, index) => (<li key={index}>{title}</li>))}
        </ul>
        <h4 className={heading}>For tests is used:</h4>
        <ul>
          {tests.map((title, index) => (<li key={index}>{title}</li>))}
        </ul>
      </span>
      <p>Use top navigation to go to Podcasts page and look how this stack works.</p>
    </Paper>
  )
}

const styles = createStyles({
  container: {
    width: "50%",
    marginTop: "20px",
    margin: "auto",
    padding: "30px"
  },
  heading: {
    color: "#3f51b5"
  }
});

export default withStyles(styles)(Home);
