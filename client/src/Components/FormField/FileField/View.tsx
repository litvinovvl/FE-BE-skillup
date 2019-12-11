import React from 'react';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class FileField extends React.Component<any, any> {
  public state = {
    btnClicked: false
  }

  public handleFileChange = (event: any) => {
    const { field, form: { setFieldValue } } = this.props;

    setFieldValue(field.name, event.currentTarget!.files![0]);
  }

  public handleBtnClick = () => this.setState({ btnClicked: true });

  public render() {
    const {
      field: { value = "", ...field},
      displayedValue,
      ...props
    } = this.props;

    const toShowError = !value.name && this.state.btnClicked;

    return (
      <>
        <TextField
          value={value.name || ''}
          margin="normal"
          variant="filled"
          error={Boolean(toShowError)}
          helperText={toShowError ? "thumbnail is required" : undefined}
          fullWidth
          {...field}
          {...props}
          type="text"
          disabled
        />
        <input
          {...field}
          {...props}
          onChange={this.handleFileChange}
          id={field.name}
          style={{ display: "none" }}
        />
        <label htmlFor={field.name}>
          <Button variant="contained" component="span" onClick={this.handleBtnClick}>
            Add thumbnail image
          </Button>
        </label>
      </>
    )
  }
}
