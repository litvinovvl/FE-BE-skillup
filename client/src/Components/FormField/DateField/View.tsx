import React from "react";
import { FieldProps } from "formik";
import { DatePicker } from "@material-ui/pickers";

const DateField: React.SFC<FieldProps> = ({ field, form }): JSX.Element => (
  <DatePicker
    {...field as any}
    format="DD MM YYYY"
    onChange={(date: Date) => form.setFieldValue(field.name, date, true)}
    fullWidth
  />
);

export default DateField;
