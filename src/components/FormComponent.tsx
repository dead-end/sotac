import { ParentComponent } from "solid-js";

const FromComponent: ParentComponent<{
  label: string;
  onSubmit: (event: Event) => void;
}> = (props) => {
  return (
    <form class="bg-white p-6 rounded-sm shadow" onSubmit={props.onSubmit}>
      <h3 class="text-lg pb-2 my-6 border-b">{props.label}</h3>
      {props.children}

      <button class="btn-base my-4" type="submit">
        Submit
      </button>
    </form>
  );
};

export default FromComponent;
