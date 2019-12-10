import React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import ListItem from '../ListItem';
import { Spinner } from '../Spinner';
import { ErrorMessage } from '../ErrorMessage';

const styles = createStyles({
  list: {
    width: '100%',
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

interface IPodcastsListProps extends WithStyles<typeof styles> {
  podcasts: any,
  loading: boolean,
  error: any
}

interface IPodcastsListState {
  errorOpen: boolean,
}

class PodcastsList extends React.Component<IPodcastsListProps, IPodcastsListState> {
  public state = {
    errorOpen: false
  }

  public componentDidUpdate(prevProps: any) {
    if (prevProps.error !== this.props.error && !this.state.errorOpen) {
      this.setState({ errorOpen: true });
    }
  }

  public renderPodcastsList = () => {
    const { podcasts, error } = this.props;

    if (podcasts.length) {
      return (
        podcasts.map((podcast: any) => (
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

  public handleCloseError = () => {
    this.setState({ errorOpen: false });
  };

  render() {
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

export default withStyles(styles)(PodcastsList);
