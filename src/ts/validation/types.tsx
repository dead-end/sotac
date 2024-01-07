import { SetStoreFunction } from "solid-js/store";

export type TFormValues = Record<string, any>;
export type TFormErrors = Record<string, string>;
export type TValidator = (value: any, form: TFormValues) => string | void;

export type TInternals = {
  form: TFormValues;
  setForm: SetStoreFunction<TFormValues>;
  errors: TFormErrors;
  setErrors: SetStoreFunction<TFormErrors>;
};
