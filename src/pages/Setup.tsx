import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import FromComponent from "../components/FormComponent";
import TextComponent from "../components/TextComponent";
import { requiredStringValidatorFactory } from "../ts/validate";

const Setup = () => {
  const [user, setUser] = createSignal("");
  const [userError, setUserError] = createSignal("");

  const [name, setName] = createSignal("");
  const [nameError, setNameError] = createSignal("");

  const [token, setToken] = createSignal("");
  const [tokenError, setTokenError] = createSignal("");

  const [password, setPassword] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");

  const [repeate, setRepeate] = createSignal("");
  const [repeateError, setRepeateError] = createSignal("");

  const navigate = useNavigate();

  onMount(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  });

  const handleSubmit = (event: Event): void => {
    event.preventDefault();

    let error = false;

    const requiredStringValidator = requiredStringValidatorFactory();

    setUserError("");
    setNameError("");
    setTokenError("");
    setPasswordError("");
    setRepeateError("");

    if (!userError() && !requiredStringValidator(user(), setUserError)) {
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
      localStorage.setItem("token", token());

      navigate("/home", { replace: true });
    }
  };

  return (
    <div class="w-full max-w-xs m-auto">
      <FromComponent label="Login" onSubmit={handleSubmit}>
        <TextComponent
          type="text"
          label="Repository User"
          placeholder="Repository User"
          getValue={user}
          setValue={setUser}
          getError={userError}
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
