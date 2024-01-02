import { ParentComponent } from "solid-js";

const App: ParentComponent = (props) => {
  return (
    <div class="text-gray-700 max-w-screen-xl m-auto bg-gray-50">
      <h1 class="text-lg font-bold">Sotac 1.0</h1>
      {props.children}
    </div>
  );
};

export default App;
