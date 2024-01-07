import { SetStoreFunction, createStore } from "solid-js/store";
import { TFormErrors, TFormValues, TInternals, TValidator } from "./types";

export const useForm = (
  form: TFormValues,
  setForm: SetStoreFunction<TFormValues>,
  fieldValidators: Record<string, TValidator[]>
) => {
  /**
   * The function calls the validators of a field and stops on the first error,
   */
  const validateField = (name: string, validators: TValidator[]) => {
    setErrors([name], "");
    for (const validator of validators) {
      const msg = validator(form[name], form);
      if (msg) {
        setErrors([name], msg);
        return false;
      }
    }
    return true;
  };

  /**
   * The function triggers the validation of all form fields which have
   * registred validators. The function returns false if at least one validator
   * returns an error.
   */
  const validateForm = () => {
    let ok = true;
    for (const name in fieldValidators) {
      if (!validateField(name, fieldValidators[name])) {
        ok = false;
      }
    }
    return ok;
  };

  const [errors, setErrors] = createStore<TFormErrors>({});

  return {
    validateForm,
    internals: {
      form,
      setForm,
      errors,
      setErrors,
    } as TInternals,
  };
};
