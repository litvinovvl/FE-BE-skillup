import React from 'react';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { FormField } from '../FormField';
import { schema } from './formSchema';

interface IAddFormProps extends WithStyles<typeof styles> {
  addPodcast: (input: any) => void
}

const init: any = {
  author: '',
  title: '',
  description: '',
  label: '',
  genre: '',
  // bpm: '',
  // duration: '',
  thumbnail: '',
  // date: moment(),
}

const AddForm: React.SFC<IAddFormProps> = ({ classes: { container, form, submitButton }, addPodcast }) => {
  const onSubmit = (values: any) => {
    console.log(values)
    addPodcast({
      variables: {
        input: values
      }
    })
  }

  const renderForm = () => (
    <Form className={form}>
      {Object.keys(schema).map((key, index) => (
        <Field
          key={index}
          name={key}
          component={FormField}
          {...schema[key]}
        />
      ))}

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
