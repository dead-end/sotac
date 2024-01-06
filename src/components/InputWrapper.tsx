import { ParentComponent, Show } from "solid-js";

const InputWrapper: ParentComponent<{
  label: string;
  name: string;
  errors: { [key: string]: string };
}> = (props) => {
  return (
    <div class="my-3">
      <label class="label-base mb-2">{props.label}</label>
      {props.children}
      <Show when={props.errors[props.name]}>
        <p class="text-xs text-red-600 pt-2">{props.errors[props.name]}</p>
      </Show>
    </div>
  );
};

export default InputWrapper;
