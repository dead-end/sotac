// @ts-nocheck
import { render } from "solid-js/web";
import { createStore } from "solid-js/store";
import { useForm } from "../ts/validation";
import type { Validator } from "../ts/validation";
import InputWrapper from "../components/InputWrapper";

const EMAILS = ["johnsmith@outlook.com", "mary@gmail.com", "djacobs@move.org"];

function fetchUserName(name) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(EMAILS.indexOf(name) > -1), 200);
  });
}

const ErrorMessage = (props) => (
  <span class="text-red-500 text-sm">{props.error}</span>
);

const Test = () => {
  const { validate, formSubmit, errors } = useForm();
  const [fields, setFields] = createStore();
  const fn = (form) => {
    // form.submit()
    console.log("Done");
  };
  const userNameExists: Validator = async ({ value }) => {
    if (await fetchUserName(value)) {
      return `${value} is already being used`;
    }
  };
  const matchesPassword: Validator = ({ value }) => {
    value === fields.password ? false : "Passwords must Match";
  };

  const requiredValidator: Validator = ({ value }) => {
    if (!value) {
      return "Please enter a value!";
    }
  };

  const minLenValidatorFactory = (min: number): Validator => {
    return ({ value }) => {
      if (typeof value === "string" && value.length < min) {
        return `Enter at least ${min} chars`;
      }
    };
  };

  return (
    <form use:formSubmit="">
      <h1>Sign Up</h1>

      <InputWrapper label="Eamil" name="email" errors={errors}>
        <input
          class="input-base"
          name="email"
          type="text"
          placeholder="Email"
          use:validate={[requiredValidator, userNameExists]}
        />
      </InputWrapper>

      <InputWrapper label="Password" name="password" errors={errors}>
        <input
          class="input-base"
          type="text"
          name="password"
          placeholder="Password"
          onInput={(e) => setFields("password", e.target.value)}
          use:validate={[requiredValidator, minLenValidatorFactory(4)]}
        />
      </InputWrapper>
      <InputWrapper label="Confirm" name="confirm" errors={errors}>
        <input
          class="input-base"
          type="text"
          name="confirm"
          placeholder="Confirm Password"
          use:validate={[requiredValidator, matchesPassword]}
        />
      </InputWrapper>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Test;
