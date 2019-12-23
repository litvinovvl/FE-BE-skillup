import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import { Snackbar, SnackbarContent, IconButton, createStyles, WithStyles, withStyles } from "@material-ui/core";

interface IErrorMessageProps extends WithStyles<typeof styles> {
  open: boolean,
  onClose: () => void,
  errorMessage: string
}

const ErrorMessage:React.SFC<IErrorMessageProps> = ({ classes: { error, message, errorIcon, closeIcon }, open, onClose, errorMessage }) => (
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
    display: "flex",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 20
  }
});

export default withStyles(styles)(ErrorMessage);
