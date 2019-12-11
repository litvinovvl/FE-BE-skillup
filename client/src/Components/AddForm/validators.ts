import * as Yup from "yup";

export default {
  string: () =>
    Yup.string()
      .required(),
  number: () =>
    Yup.number()
      .required(),
  date: () =>
    Yup.date().required(),
  object: () => 
    Yup.object()
      .required()
};
