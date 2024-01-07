import { Component, Show } from "solid-js";

import { TInternals } from "../ts/validation/types";

const MyTextComponent: Component<{
  name: string;
  label: string;
  type?: "text" | "password";
  placeholder: string;
  internals: TInternals;
}> = ({ name, label, type = "text", placeholder, internals }) => {
  return (
    <div class="my-3">
      <label class="label-base mb-2">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        value={internals.form[name]}
        name={name}
        onChange={(e) => internals.setForm([name], e.target.value)}
        onBlur={() => internals.setErrors([name], "")}
        class="input-base"
      />
      <Show when={internals.errors[name]}>
        <p class="text-xs text-red-600 pt-2">{internals.errors[name]}</p>
      </Show>
    </div>
  );
};

export default MyTextComponent;
