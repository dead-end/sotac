import { SetStoreFunction, createStore } from "solid-js/store";
import { TElementValidators, TErrors, TInternals, TValidator } from "./types";

export const useForm = (form: any, setForm: SetStoreFunction<any>) => {
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
      const msg = validator(elementValidators.element.value, form);
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
    internals: {
      form,
      setForm,
      errors,
      setErrors,
      register,
    } as TInternals,
  };
};
