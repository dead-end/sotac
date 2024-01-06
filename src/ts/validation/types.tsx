import { SetStoreFunction } from "solid-js/store";

export type TValidator = (value: any, form: any) => string | void;

export type TRegister = (
  validators: TValidator[]
) => (element: HTMLInputElement) => void;

export type TElementValidators = {
  element: HTMLInputElement;
  validators: TValidator[];
};

export type TErrors = {
  [key: string]: string;
};

export type TInternals = {
  form: any;
  setForm: SetStoreFunction<any>;
  errors: TErrors;
  setErrors: SetStoreFunction<TErrors>;
  register: TRegister;
};
