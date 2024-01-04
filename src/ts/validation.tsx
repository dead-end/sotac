import { SetStoreFunction, createStore } from "solid-js/store";

export type TValidator = (element: HTMLInputElement) => string;

interface InputElementValidator {
  element: HTMLInputElement;
  validators: TValidator[];
}

interface StringMap {
  [key: string]: string;
}

function checkValid(
  { element, validators = [] }: InputElementValidator,
  setErrors: SetStoreFunction<StringMap>
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
  const [errors, setErrors] = createStore<StringMap>({});
  const fields: any = {};

  const validate = (ref: HTMLInputElement, accessor: () => any) => {
    const accessorValue = accessor();
    const validators = Array.isArray(accessorValue) ? accessorValue : [];
    let config;
    fields[ref.name] = config = { element: ref, validators };
    //
    // Call the validation when a user leaves an input field:
    //
    //ref.onblur = checkValid(config, setErrors);
    ref.oninput = () => {
      if (!errors[ref.name]) {
        return;
      }
      setErrors({ [ref.name]: undefined });
    };
  };

  const formSubmit = (ref: HTMLFormElement, accessor: () => any) => {
    const callback = accessor() || (() => {});
    ref.onsubmit = async (e) => {
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
      !hasErrors && callback(ref);
    };
  };

  return { validate, formSubmit, errors };
}
