import React from 'react';

import moment from '@date-io/moment';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Field, Form, Formik } from 'formik';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

import { TextField } from '../FormFields';
import { schema } from './formSchema';

interface IAddFormProps extends WithStyles<typeof styles> {}

const init: any = {
  author: '',
  title: '',
  description: '',
  label: '',
  genre: '',
  bpm: '',
  duration: '',
  thumbnail: '',
  date: '',
}

const AddForm: React.SFC<IAddFormProps> = ({ classes: { container, form, submitButton } }) => {
  const onSubmit = (values: any, actions: any) => {
    console.log({ values, actions });
  }

  const renderForm = ({ setFieldValue }: any) => (
    <Form className={form}>
      {Object.keys(schema).map((key, index) => (
        <Field
          key={index}
          name={key}
          component={TextField}
          {...schema[key]}
        />
      ))}
      
      <Field
        name="date"
        render={() => (
          <MuiPickersUtilsProvider utils={moment}>
            <DatePicker
              margin="normal"
              label="Released"
              value={"01/01/2001"}
              // tslint:disable-next-line
              onChange={(data) => console.log(data)}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        )}
      />
      <Button variant="contained" color="primary" type="submit" className={submitButton}>
        Add podcast
      </Button>
    </Form>
  )

  return (
    <Paper className={container}>
      <h2>Add new podcast</h2>

      <Formik
        initialValues={init}
        onSubmit={onSubmit}
        render={renderForm}
      />

    </Paper>
  )
}

const styles = createStyles({
  container: {
    width: "50%",
    marginTop: "20px",
    margin: "auto",
    padding: "30px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submitButton: {
    marginTop: "20px"
  }
});

export default withStyles(styles)(AddForm);
