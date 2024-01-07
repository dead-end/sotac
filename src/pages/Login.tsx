import { useNavigate } from "@solidjs/router";
import FromComponent from "../components/FormComponent";
import { useGithubContext } from "../contexts/GithubContext";
import { createStore } from "solid-js/store";
import { TFormValues, TValidator } from "../ts/validation/types";
import { requiredValidator } from "../ts/validation/validators";
import MyTextComponent from "../components/MyTextComponent";
import { useForm } from "../ts/validation/form";

const Login = () => {
  const [state, { load }] = useGithubContext();

  const [form, setForm] = createStore<TFormValues>({
    password: "",
  });

  const fieldValidators: Record<string, TValidator[]> = {
    password: [requiredValidator],
  };

  const { validateForm, internals } = useForm(form, setForm, fieldValidators);

  const navigate = useNavigate();

  const handleSubmit = async (event: Event): Promise<void> => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await load(form.password);
    } catch (e) {
      internals.setErrors("password", "Password is not correct!");
      console.log(e);
      return;
    }

    navigate("/home", { replace: true });
  };

  return (
    <div class="w-full max-w-xs m-auto">
      <FromComponent label="Login" onSubmit={handleSubmit}>
        <MyTextComponent
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          internals={internals}
        />
      </FromComponent>
    </div>
  );
};

export default Login;
