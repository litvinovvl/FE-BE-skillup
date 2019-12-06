import React from 'react';
import { default as MUIListItem}  from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const ListItem = ({ podcast, removePodcast }: any) => {
  const deletePodcast = () => removePodcast({ variables: { input: { id: podcast.id } } });

  return (
    <MUIListItem key={podcast.id} button>
      <ListItemAvatar>
        <Avatar
          src={podcast.thumbnail}
        />
      </ListItemAvatar>
      <ListItemText primary={podcast.title} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" color="secondary" onClick={deletePodcast}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </MUIListItem>
  )
}

export default ListItem;
