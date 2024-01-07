import { createStore } from "solid-js/store";
import { useForm } from "../ts/validation/form";
import FromComponent from "../components/FormComponent";
import MyTextComponent from "../components/MyTextComponent";
import {
  requiredValidator,
  validateFieldEquals,
  validateMinMax,
} from "../ts/validation/validators";
import { useNavigate } from "@solidjs/router";
import { useGithubContext } from "../contexts/GithubContext";
import { TFormValues, TValidator } from "../ts/validation/types";

const SetupGithub = () => {
  const navigate = useNavigate();
  const [state, { save }] = useGithubContext();

  const [form, setForm] = createStore<TFormValues>({
    owner: state.owner,
    name: state.name,
    token: "",
    password: "",
    confirm: "",
  });

  const fieldValidators: Record<string, TValidator[]> = {
    owner: [requiredValidator],
    name: [requiredValidator],
    token: [requiredValidator],
    password: [requiredValidator, validateMinMax({ min: 3 })],
    confirm: [
      requiredValidator,
      validateFieldEquals("password", "Passwords do not match"),
    ],
  };

  const { validateForm, internals } = useForm(form, setForm, fieldValidators);

  const handleSubmit = async (event: Event): Promise<void> => {
    event.preventDefault();

    if (validateForm()) {
      console.log(
        "success",
        form.owner,
        form.name,
        form.token,
        form.password,
        form.confirm
      );

      await save(form.owner, form.name, form.token, form.password);
      navigate("/home", { replace: true });
    }
  };

  return (
    <div class="w-full max-w-xs m-auto">
      <FromComponent label="Setup Github" onSubmit={handleSubmit}>
        <MyTextComponent
          name="owner"
          label="Repository Owner"
          type="text"
          placeholder="Repository Owner"
          internals={internals}
        />

        <MyTextComponent
          name="name"
          label="Repository Name"
          type="text"
          placeholder="Repository Name"
          internals={internals}
        />

        <MyTextComponent
          name="token"
          label="Token"
          type="text"
          placeholder="Token"
          internals={internals}
        />

        <MyTextComponent
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          internals={internals}
        />

        <MyTextComponent
          name="confirm"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          internals={internals}
        />
      </FromComponent>
    </div>
  );
};

export default SetupGithub;
