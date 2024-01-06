import { ParentComponent } from "solid-js";

const FromComponent: ParentComponent<{
  label: string;
  onSubmit: (event: Event) => void;
}> = ({ label, onSubmit, children }) => {
  return (
    <form class="bg-white p-6 rounded-sm shadow" onSubmit={onSubmit}>
      <h3 class="text-lg pb-2 my-6 border-b">{label}</h3>
      {children}

      <button class="btn-base my-4" type="submit">
        Submit
      </button>
    </form>
  );
};

export default FromComponent;
