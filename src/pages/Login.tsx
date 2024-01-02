import { Show, createSignal, onMount } from "solid-js";

const Login = () => {
  const [repository, setRepository] = createSignal("");
  const [repositoryError, setRepositoryError] = createSignal("");
  const [token, setToken] = createSignal("");
  const [tokenError, setTokenError] = createSignal("");

  onMount(() => {
    const repository = localStorage.getItem("repository");
    if (repository) {
      setRepository(repository);
    }

    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  });

  const handleSubmit = (event: Event): void => {
    event.preventDefault();

    let error = false;

    if (!repository()) {
      setRepositoryError("Please input a repository!");
      error = true;
    }

    if (!token()) {
      setTokenError("Please input a token!");
      error = true;
    }

    if (error) {
      return;
    }

    setRepositoryError("");
    setTokenError("");

    localStorage.setItem("repository", repository());
    localStorage.setItem("token", token());
  };

  return (
    <div class="w-full max-w-xs m-auto">
      <form class="bg-white p-6 rounded-sm shadow" onSubmit={handleSubmit}>
        <h3 class="text-lg pb-2 my-6 border-b">Login</h3>

        <div class="mb-6">
          <label class="label-base" for="repository">
            Repository
          </label>
          <input
            id="repository"
            placeholder="Repository"
            type="text"
            value={repository()}
            onChange={(e) => setRepository(e.target.value)}
            class="input-base"
          />
          <Show when={repositoryError()}>
            <p class="text-sm text-red-600">{repositoryError()}</p>
          </Show>
        </div>

        <div class="mb-6">
          <label class="label-base" for="token">
            Token
          </label>
          <input
            id="token"
            type="password"
            placeholder="Token"
            value={token()}
            onChange={(e) => setToken(e.target.value)}
            class="input-base"
          />
          <Show when={tokenError()}>
            <p class="text-sm text-red-600">{tokenError()}</p>
          </Show>
        </div>
        <button class="btn-base" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
