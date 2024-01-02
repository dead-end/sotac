import { Component, Show } from "solid-js";

const TextComponent: Component<{
  label: string;
  placeholder: string;
  getValue: () => string;
  setValue: (value: string) => string;
  getError: () => string;
  type: string;
}> = (props) => {
  return (
    <div class="my-3">
      <label class="label-base mb-2">{props.label}</label>
      <input
        placeholder={props.placeholder}
        type="text"
        value={props.getValue()}
        onChange={(e) => props.setValue(e.target.value)}
        class="input-base"
      />
      <Show when={props.getError()}>
        <p class="text-xs text-red-600 pt-2">{props.getError()}</p>
      </Show>
    </div>
  );
};

export default TextComponent;
