import { createSignal } from "solid-js";
import { tester } from "../ts/crypt";

const Home = () => {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <h2>Welcome Home</h2>
      <h2 class="text-lg font-bold">Hello Word!</h2>
      <button class="btn-base" onClick={() => setCount((count) => count + 1)}>
        count is {count()}
      </button>

      <button class="btn-base" onClick={tester}>
        Tester
      </button>
    </>
  );
};
export default Home;
