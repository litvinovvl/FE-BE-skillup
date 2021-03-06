import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import httpErrors from 'http-errors';
import * as logger from 'morgan';

import { graphqlUploadExpress } from 'graphql-upload';

import graphql from './graphql';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
  graphql,
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
