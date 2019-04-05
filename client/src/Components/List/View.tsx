import React from 'react';

import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

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
});

interface IAddFormProps extends WithStyles<typeof styles> {}

const PList: React.SFC<IAddFormProps> = ({ classes }) => {
  return (
    <Paper className={classes.container}>
      <h2>Add new podcast</h2>
      <List className={classes.list}>
      {[0, 1, 2, 3].map(value => (
        <ListItem key={value} button>
          <ListItemAvatar>
            <Avatar
              alt={`Avatar n°${value + 1}`}
              src={`/static/images/avatar/${value + 1}.jpg`}
            />
          </ListItemAvatar>
          <ListItemText primary={`Line item ${value + 1}`} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
    </Paper>
    
  );
}

export default withStyles(styles)(PList);
