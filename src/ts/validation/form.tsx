import { createStore } from "solid-js/store";
import { TElementValidators, TErrors, TValidator } from "./types";

export const useForm = () => {
  const elementValidators: TElementValidators[] = [];

  const [errors, setErrors] = createStore<TErrors>({});

  const validateForm = () => {
    let ok = true;
    for (const elementValidator of elementValidators) {
      if (!validateElement(elementValidator)) {
        ok = false;
      }
    }

    return ok;
  };

  const validateElement = (elementValidators: TElementValidators) => {
    setErrors([elementValidators.element.name], "");

    for (const validator of elementValidators.validators) {
      const msg = validator(elementValidators.element);
      if (msg) {
        setErrors([elementValidators.element.name], msg);
        return false;
      }
    }

    return true;
  };

  const register = (validators: TValidator[]) => {
    return (element: HTMLInputElement) => {
      elementValidators.push({ element, validators });
    };
  };

  return {
    validateForm,
    register,
    errors,
    setErrors,
  };
};
