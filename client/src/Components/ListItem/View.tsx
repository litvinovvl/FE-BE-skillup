import React from 'react';
import { default as MUIListItem}  from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Spinner } from '../Spinner';

interface IListItemState {
  loading: boolean
}

interface IListItemProps {
  podcast: any,
  removePodcast: (vars: any) => { id: number }
}

class ListItem extends React.Component<IListItemProps, IListItemState> {
  public state = {
    loading: false
  }

  public deletePodcast = async () => {
    const { podcast, removePodcast } = this.props;

    try {
      this.setState(() => ({ loading: true }));
      await removePodcast({ variables: { input: { id: podcast.id } } });
    } catch (e) {
      this.setState(() => ({ loading: false }));
      console.log(e)
    }
  }

  render() {
    const { podcast } = this.props;

    return (
      <>
        {this.state.loading && <Spinner />}
        <MUIListItem key={podcast.id} button>
          <ListItemAvatar>
            <Avatar
              src={podcast.thumbnail}
            />
          </ListItemAvatar>
          <ListItemText primary={podcast.title} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete" color="secondary" onClick={this.deletePodcast}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </MUIListItem>
      </>
    )
  }
}

export default ListItem;
