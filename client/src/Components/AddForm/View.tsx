import React from 'react';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { FormField } from '../FormField';
import { Spinner } from '../Spinner';
import { formSchema } from './formSchema';
import { Redirect } from 'react-router';

interface IAddFormProps extends WithStyles<typeof styles> {
  addPodcast: (input: any) => any,
  refetchLabels: (labelId: any) => void,
  refetchAuthors: (labelId: any) => void,
  genres: any[],
  authors: any[],
  labels: any[],
  genresLoading: boolean,
  authorsLoading: boolean,
  labelsLoading: boolean
}

interface IAddFormState {
  loading: boolean,
  redirect: boolean
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

class AddForm extends React.Component<IAddFormProps, IAddFormState> {
  public state = {
    loading: false,
    redirect: false
  }

  public onSubmit = async (values: any) => {
    const { addPodcast } = this.props;

    try {
      this.setState(() => ({ loading: true }))
      const podcast = await addPodcast({
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

      if (podcast.data.addPodcast.title) {
        this.setState(() => ({ loading: false, redirect: true }))
      }
    } catch (e) {
      this.setState(() => ({ loading: false }))
      console.log(e)
    }
  }

  public refetch = (fieldName: any, value: any) => {
    const { refetchLabels } = this.props;
    if (fieldName === 'author') {
      refetchLabels({ labelId: value.label.id });
    }
  }

  public renderForm = () => {
    const { classes: { form, submitButton }, genres, authors, labels } = this.props;

    const schema: any = formSchema(genres, authors, labels, this.refetch);

    return (
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
  }

  public render() {
    const { classes: { container }, genresLoading, authorsLoading, labelsLoading } = this.props;
    const loading = genresLoading || authorsLoading || labelsLoading || this.state.loading;

    if (this.state.redirect) {
      return <Redirect to="/podcasts/" />
    }

    return (
      <>
        {loading && <Spinner />}
        <Paper className={container}>
          <h2>Add new podcast</h2>

          <Formik
            initialValues={init}
            onSubmit={this.onSubmit}
            render={this.renderForm}
          />

        </Paper>
      </>
    )
  }
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
