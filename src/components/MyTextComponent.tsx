import { Component, Show } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { TErrors, TRegister, TValidator } from "../ts/validation/types";

const MyTextComponent: Component<{
  name: string;
  label: string;
  type?: "text" | "password";
  placeholder: string;
  form: any;
  setForm: SetStoreFunction<any>;
  errors: TErrors;
  setErrors: SetStoreFunction<TErrors>;
  register: TRegister;
  validators: TValidator[];
}> = ({
  name,
  label,
  type = "text",
  placeholder,
  form: values,
  setForm: setValues,
  errors,
  setErrors,
  register,
  validators,
}) => {
  return (
    <div class="my-3">
      <label class="label-base mb-2">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        value={values[name]}
        name={name}
        onChange={(e) => setValues([name], e.target.value)}
        onBlur={() => setErrors([name], "")}
        class="input-base"
        ref={register(validators)}
      />
      <Show when={errors[name]}>
        <p class="text-xs text-red-600 pt-2">{errors[name]}</p>
      </Show>
    </div>
  );
};

export default MyTextComponent;
