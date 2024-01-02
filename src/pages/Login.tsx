import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import FromComponent from "../components/FormComponent";
import TextComponent from "../components/TextComponent";
import { requiredStringValidatorFactory } from "../ts/validate";

const Login = () => {
  const [password, setPassword] = createSignal("");
  const [passwordError, setPasswordError] = createSignal("");

  const navigate = useNavigate();

  const handleSubmit = (event: Event): void => {
    event.preventDefault();

    let error = false;

    const requiredStringValidator = requiredStringValidatorFactory();

    setPasswordError("");

    if (
      !passwordError() &&
      !requiredStringValidator(password(), setPasswordError)
    ) {
      error = true;
    }

    if (error) {
      return;
    }

    navigate("/home", { replace: true });
  };

  return (
    <div class="w-full max-w-xs m-auto">
      <FromComponent label="Login" onSubmit={handleSubmit}>
        <TextComponent
          type="password"
          label="Password"
          placeholder="Password"
          getValue={password}
          setValue={setPassword}
          getError={passwordError}
        />
      </FromComponent>
    </div>
  );
};

export default Login;
