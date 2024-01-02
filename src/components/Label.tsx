import { Component } from "solid-js";

const Label: Component<{ text: string; for: string }> = (props) => {
  return (
    <label class="block text-gray-700 text-sm font-bold mb-2" for={props.for}>
      {props.text}
    </label>
  );
};

export default Label;
