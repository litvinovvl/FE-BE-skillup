import React from 'react';
import { default as MUIListItem}  from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Spinner } from '../Spinner';
import { ErrorMessage } from '../ErrorMessage';

interface IListItemState {
  loading: boolean,
  errorOpen: boolean,
  errorMessage: string
}

interface IListItemProps {
  podcast: any,
  removePodcast: (vars: any) => { id: number }
}

class ListItem extends React.Component<IListItemProps, IListItemState> {
  public state = {
    loading: false,
    errorOpen: false,
    errorMessage: ""
  }

  public deletePodcast = async () => {
    const { podcast, removePodcast } = this.props;

    try {
      this.setState(() => ({ loading: true }));
      await removePodcast({ variables: { input: { id: podcast.id } } });
    } catch (e) {
      this.setState(() => ({ loading: false, errorOpen: true, errorMessage: e.message }));
      console.error(e);
    }
  }

  public handleCloseError = () => {
    this.setState({ errorOpen: false, errorMessage: "" });
  };

  render() {
    const { podcast } = this.props;

    return (
      <>
        {this.state.loading && <Spinner />}
        {this.state.errorOpen &&
          <ErrorMessage
            open={this.state.errorOpen}
            onClose={this.handleCloseError}
            errorMessage={this.state.errorMessage}
          />
        }
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
