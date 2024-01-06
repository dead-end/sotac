import { SetStoreFunction, createStore } from "solid-js/store";

export type Validator = (element: HTMLInputElement) => string;

interface ElementValidators {
  element: HTMLInputElement;
  validators: Validator[];
}

interface ObjectStrStr {
  [key: string]: string;
}

function checkValid(
  { element, validators = [] }: ElementValidators,
  setErrors: SetStoreFunction<ObjectStrStr>
) {
  return async () => {
    for (const validator of validators) {
      const msg = await validator(element);
      if (msg) {
        setErrors({ [element.name]: msg });
        return false;
      }
    }

    return true;
  };
}

export function useForm() {
  const [errors, setErrors] = createStore<ObjectStrStr>({});
  const fields: { [key: string]: ElementValidators } = {};

  const validate = (element: HTMLInputElement, accessor: () => any) => {
    const value = accessor();
    const validators: Validator[] = Array.isArray(value) ? value : [];
    const config: ElementValidators = { element: element, validators };
    fields[element.name] = config;
    //
    // Call the validation when a user leaves an input field:
    //
    //ref.onblur = checkValid(config, setErrors);
    element.oninput = () => {
      if (!errors[element.name]) {
        return;
      }
      setErrors({ [element.name]: undefined });
    };
  };

  const formSubmit = (element: HTMLFormElement, accessor: () => any) => {
    const callback = accessor() || (() => {});
    element.onsubmit = async (e) => {
      e.preventDefault();
      let hasErrors = false;

      for (const k in fields) {
        const field = fields[k];
        const isValid = await checkValid(field, setErrors)();
        if (!hasErrors && !isValid) {
          field.element.focus();
          hasErrors = true;
        }
      }
      !hasErrors && callback(element);
    };
  };

  return { validate, formSubmit, errors };
}
