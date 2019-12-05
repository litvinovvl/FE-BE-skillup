import React from 'react';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { FormField } from '../FormField';
import { formSchema } from './formSchema';

interface IAddFormProps extends WithStyles<typeof styles> {
  addPodcast: (input: any) => void,
  refetchLabels: (labelId: any) => void,
  refetchAuthors: (labelId: any) => void,
  genres: any[],
  authors: any[],
  labels: any[]
}

const init: any = {
  author: '',
  title: '',
  description: '',
  label: '',
  genre: '',
  bpm: '',
  duration: '',
  thumbnail: '',
  date: moment(),
}

const AddForm: React.SFC<IAddFormProps> = ({
  classes: { container, form, submitButton },
  addPodcast,
  genres,
  authors,
  labels,
  refetchLabels,
}) => {
  const onSubmit = (values: any) => {
    addPodcast({
      variables: {
        input: {
          ...values,
          bpm: Number(values.bpm),
          duration: Number(values.duration),
          label: values.label.id,
          author: values.author.id,
          genre: values.genre.id
        }
      }
    })
  }

  const refetch = (fieldName: any, value: any) => {
    if (fieldName === 'author') {
      refetchLabels({ labelId: value.label.id });
    }
  }

  const schema: any = formSchema(genres, authors, labels, refetch);

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
