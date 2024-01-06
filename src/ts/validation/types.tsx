export type TValidator = (element: HTMLInputElement) => string | void;

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
