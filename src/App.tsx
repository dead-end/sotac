import { createSignal } from "solid-js";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <h2 class="text-lg font-bold">Hello Word!</h2>
      <button
        class="border border-indigo-500 rounded"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count()}
      </button>
    </>
  );
}

export default App;
