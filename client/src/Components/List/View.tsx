import React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import ListItem from '../ListItem';
import { Spinner } from '../Spinner';

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

interface IAddFormProps extends WithStyles<typeof styles> {
  podcasts: any,
  loading: boolean
}

const PodcastsList: React.SFC<IAddFormProps> = ({ classes, podcasts, loading }) => {
  const renderPodcastsList = () => {
    if(podcasts.length) {
      return (
        podcasts.map((podcast: any) => (
          <ListItem key={podcast.id} podcast={podcast} />
        ))
      )
    }

    return (
      <Typography align="center">
        There are no podcasts yet
      </Typography>
    )
  }

  return (
    <>
      {loading && <Spinner />}
      <Paper className={classes.container}>
        <div className={classes.top}>
          <h2>Podcasts</h2>
          <Link to="/podcasts/new" className={classes.link}>
            <Button color="primary" size="large">Add new podcast</Button>
          </Link>
        </div>
        <List className={classes.list}>
          {renderPodcastsList()}
        </List>
      </Paper>
    </>
  );
}

export default withStyles(styles)(PodcastsList);
