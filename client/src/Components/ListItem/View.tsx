import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { ListItem as MUIListItem, ListItemSecondaryAction, ListItemText, ListItemAvatar, Avatar, IconButton } from "@material-ui/core";

import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { Podcast } from "../../types";

interface IListItemState {
  loading: boolean
  errorOpen: boolean
  errorMessage: string
}

type RemovePodcastInput = {
  variables: {
    input: {
      id: number
    }
  }
}

interface IListItemProps {
  podcast: Podcast
  removePodcast: (input: RemovePodcastInput) => { id: number }
}

class ListItem extends React.Component<IListItemProps, IListItemState> {
  public readonly state = {
    loading: false,
    errorOpen: false,
    errorMessage: ""
  }

  public deletePodcast = async (): Promise<void> => {
    const { podcast, removePodcast } = this.props;

    try {
      this.setState(() => ({ loading: true }));
      await removePodcast({ variables: { input: { id: podcast.id } } });
    } catch (e) {
      this.setState(() => ({ loading: false, errorOpen: true, errorMessage: e.message }));
      console.error(e);
    }
  }

  public handleCloseError = (): void => {
    this.setState({ errorOpen: false, errorMessage: "" });
  };

  render(): JSX.Element {
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
