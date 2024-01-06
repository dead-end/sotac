import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import FromComponent from "../components/FormComponent";
import TextComponent from "../components/TextComponent";
import { requiredStringValidatorFactory } from "../ts/validators";
import { useGithubContext } from "../contexts/GithubContext";
import { createStore } from "solid-js/store";

const Setup = () => {
  const [state, { save }] = useGithubContext();

  const [input, setInput] = createStore({
    owner: "",
    name: "",
    token: "",
    password: "",
    error: {
      owner: "",
      name: "",
      token: "",
      password: "",
    },
  });

  const [owner, setOwner] = createSignal("");
  const [ownerError, setOwnerError] = createSignal("");

  const [name, setName] = createSignal("");
  const [nameError, setNameError] = createSignal("");

  const [token, setToken] = createSignal("");
  const [tokenError, setTokenError] = createSignal("");

  const [password, setPassword] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");

  const [repeate, setRepeate] = createSignal("");
  const [repeateError, setRepeateError] = createSignal("");

  const navigate = useNavigate();

  const handleSubmit = async (event: Event): Promise<void> => {
    event.preventDefault();

    let error = false;

    const requiredStringValidator = requiredStringValidatorFactory();

    setOwnerError("");
    setNameError("");
    setTokenError("");
    setPasswordError("");
    setRepeateError("");

    if (!ownerError() && !requiredStringValidator(owner(), setOwnerError)) {
      error = true;
    }

    if (!nameError() && !requiredStringValidator(name(), setNameError)) {
      error = true;
    }

    if (!tokenError() && !requiredStringValidator(token(), setTokenError)) {
      error = true;
    }

    if (
      !passwordError() &&
      !requiredStringValidator(password(), setPasswordError)
    ) {
      error = true;
    }

    if (
      !repeateError() &&
      !requiredStringValidator(repeate(), setRepeateError)
    ) {
      error = true;
    }

    if (!passwordError() && password() !== repeate()) {
      setPasswordError("Passwords are not the same!");
      error = true;
    }

    if (!error) {
      await save(owner(), name(), token(), password());
      navigate("/home", { replace: true });
    }
  };

  return (
    <div class="w-full max-w-xs m-auto">
      <FromComponent label="Login" onSubmit={handleSubmit}>
        <TextComponent
          type="text"
          label="Repository Owner"
          placeholder="Repository Owner"
          getValue={() => input.owner}
          setValue={(value) => {
            setInput("owner", value);
            return value;
          }}
          getError={ownerError}
        />

        <TextComponent
          type="text"
          label="Repository Name"
          placeholder="Repository Name"
          getValue={name}
          setValue={setName}
          getError={nameError}
        />

        <TextComponent
          type="password"
          label="Token"
          placeholder="Token"
          getValue={token}
          setValue={setToken}
          getError={tokenError}
        />

        <TextComponent
          type="password"
          label="Password"
          placeholder="Password"
          getValue={password}
          setValue={setPassword}
          getError={passwordError}
        />

        <TextComponent
          type="password"
          label="Password"
          placeholder="Password"
          getValue={repeate}
          setValue={setRepeate}
          getError={repeateError}
        />
      </FromComponent>
    </div>
  );
};

export default Setup;
