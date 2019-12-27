import React from "react";

import { Button, TextField} from "@material-ui/core";
import { FieldProps } from "formik";

interface IFileFieldState {
  btnClicked: boolean
}

export default class FileField extends React.Component<FieldProps, IFileFieldState> {
  public readonly state = {
    btnClicked: false
  }

  public handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { field, form: { setFieldValue } } = this.props;

    setFieldValue(field.name, (event.currentTarget as HTMLInputElement).files![0]);
  }

  public handleBtnClick = (): void => this.setState({ btnClicked: true });

  public render(): JSX.Element {
    const {
      field: { value = "", ...field},
      ...props
    } = this.props;

    const toShowError = !value.name && this.state.btnClicked;

    return (
      <>
        <TextField
          value={value.name || ""}
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
          {...props as any}
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
