import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

interface IErrorMessageProps extends WithStyles<typeof styles> {
  open: boolean,
  onClose: () => void,
  errorMessage: string
}

const ErrorMessage:React.SFC<IErrorMessageProps> = ({ classes: { error, message, errorIcon, closeIcon }, open, onClose, errorMessage }: any) => (
  <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    open={open}
  >
    <SnackbarContent
      className={error}
      message={
        <span className={message}>
          <ErrorIcon className={errorIcon} />
          {errorMessage}
        </span>
      }
      action={[
        <IconButton key="close" color="inherit" onClick={onClose}>
          <CloseIcon className={closeIcon} />
        </IconButton>,
      ]}
      />
    </Snackbar>
);

const styles = createStyles({
  error: {
    backgroundColor: "red",
  },
  errorIcon: {
    fontSize: 20,
    marginRight: 10
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 20
  }
});

export default withStyles(styles)(ErrorMessage);
