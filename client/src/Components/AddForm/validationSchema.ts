import * as Yup from "yup";
import validators from "./validators";

export const ValidationSchema = Yup.object<any>().shape({
  author: validators.object(),
  title: validators.string(),
  description: validators.string(),
  label: validators.object(),
  genre: validators.object(),
  bpm: validators.number(),
  duration: validators.number(),
  date: validators.date(),
});
