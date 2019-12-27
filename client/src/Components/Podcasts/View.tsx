import React from "react";

import { Button, List, Paper, Typography } from "@material-ui/core";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { ApolloError } from "apollo-client";
import { Link } from "react-router-dom";

import ErrorMessage from "../ErrorMessage";
import ListItem from "../ListItem";
import Spinner from "../Spinner";

import { IPodcast } from "../../types";

interface IPodcastsListProps extends WithStyles<typeof styles> {
  podcasts: IPodcast[]
  loading: boolean
  error: ApolloError
}

interface IPodcastsListState {
  errorOpen: boolean
}

class Podcasts extends React.Component<IPodcastsListProps, IPodcastsListState> {
  public readonly state = {
    errorOpen: false
  }

  public componentDidUpdate(prevProps: IPodcastsListProps): void {
    if (prevProps.error !== this.props.error && !this.state.errorOpen) {
      this.setState({ errorOpen: true });
    }
  }

  public renderPodcastsList = (): JSX.Element[] | JSX.Element => {
    const { podcasts, error } = this.props;

    if (podcasts.length) {
      return (
        podcasts.map((podcast: IPodcast) => (
          <ListItem key={podcast.id} podcast={podcast} />
        ))
      )
    }

    if (error) {
      return (
        <Typography align="center">
          Something went wrong. Failed to fetch podcasts list.
        </Typography>
      )
    }

    return (
      <Typography align="center">
        There are no podcasts yet
      </Typography>
    )
  }

  public handleCloseError = (): void => {
    this.setState({ errorOpen: false });
  };

  public render(): JSX.Element {
    const { classes, error: networkError, loading } = this.props;

    return (
      <>
        {networkError &&
          <ErrorMessage
            open={this.state.errorOpen}
            onClose={this.handleCloseError}
            errorMessage={networkError.message}
          />
        }
        {loading && <Spinner />}
        <Paper className={classes.container}>
          <div className={classes.top}>
            <h2>Podcasts</h2>
            <Link to="/podcasts/new" className={classes.link}>
              <Button color="primary" size="large">Add new podcast</Button>
            </Link>
          </div>
          <List className={classes.list}>
            {this.renderPodcastsList()}
          </List>
        </Paper>
      </>
    );
  }
}

const styles = createStyles({
  list: {
    width: "100%",
    maxWidth: "90%",
    margin: "auto"
  },
  container: {
    width: "50%",
    marginTop: "20px",
    margin: "auto",
    padding: "30px",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  link: {
    textDecoration: "none"
  }
});

export default withStyles(styles)(Podcasts);
