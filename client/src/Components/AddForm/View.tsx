import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { FormField } from '../FormField';
import { Spinner } from '../Spinner';
import { formSchema } from './formSchema';
import { ErrorMessage } from '../ErrorMessage';
import { ValidationSchema } from './validationSchema';

interface IAddFormProps extends WithStyles<typeof styles> {
  addPodcast: (input: any) => any,
  refetchLabels: (labelId: any) => void,
  refetchAuthors: (labelId: any) => void,
  genres: any[],
  authors: any[],
  labels: any[],
  genresLoading: boolean,
  authorsLoading: boolean,
  labelsLoading: boolean,
  error: any
}

interface IAddFormState {
  loading: boolean,
  redirect: boolean,
  errorOpen: boolean,
  errorMessage: string
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
    redirect: false,
    errorOpen: false,
    errorMessage: ""
  }

  public componentDidUpdate(prevProps: any) {
    if (prevProps.error !== this.props.error && !this.state.errorOpen) {
      this.setState({ errorOpen: true });
    }
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
      this.setState(() => ({ loading: false, errorOpen: true, errorMessage: e.message }))
    }
  }

  public refetch = (fieldName: any, value: any) => {
    const { refetchLabels } = this.props;
    if (fieldName === 'author') {
      refetchLabels({ labelId: value.label.id });
    }
  }

  public renderForm = ({ isValid, values: { thumbnail } }: any) => {
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

        <Button variant="contained" color="primary" type="submit" className={submitButton} disabled={!isValid || !thumbnail}>
          Add podcast
        </Button>
      </Form>
    )
  }

  public handleCloseError = () => {
    this.setState({ errorOpen: false });
  };

  public render() {
    const { classes: { container, disable, note }, genresLoading, authorsLoading, labelsLoading, error: networkError } = this.props;
    const loading = genresLoading || authorsLoading || labelsLoading || this.state.loading;

    if (this.state.redirect) {
      return <Redirect to="/podcasts/" />
    }

    return (
      <>
        {(networkError || this.state.errorMessage) &&
          <ErrorMessage
            open={this.state.errorOpen}
            onClose={this.handleCloseError}
            errorMessage={networkError ? networkError.message : this.state.errorMessage}
          />
        }
        {loading && <Spinner />}
        <Paper className={container}>
          {networkError && <div className={disable} />}
          <h2>Add new podcast</h2>
          <p className={note}>* All fields are required</p>
          <Formik
            initialValues={init}
            onSubmit={this.onSubmit}
            validationSchema={ValidationSchema}
          >
            {this.renderForm}
          </Formik>
        </Paper>
      </>
    )
  }
}

const styles = createStyles({
  container: {
    position: "relative",
    width: "50%",
    marginTop: "20px",
    margin: "auto",
    padding: "30px"
  },
  disable: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    opacity: 0.75,
    zIndex: 1000,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submitButton: {
    marginTop: "20px"
  },
  note: {
    marginTop: -15,
    fontSize: 10
  }
});

export default withStyles(styles)(AddForm);
