import { createSignal } from "solid-js";
import { tester } from "../ts/crypt";
import { useGithubContext } from "../contexts/GithubContext";

const Home = () => {
  const [count, setCount] = createSignal(0);
  const [state] = useGithubContext();

  return (
    <>
      <h2>Welcome Home</h2>
      <h2 class="text-lg font-bold">Hello Word!</h2>
      <button class="btn-base" onClick={() => setCount((count) => count + 1)}>
        count is {count()}
      </button>

      <p>{state.token}</p>

      <button class="btn-base" onClick={tester}>
        Tester
      </button>
    </>
  );
};
export default Home;
