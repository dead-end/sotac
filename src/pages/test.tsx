// @ts-nocheck
import { render } from "solid-js/web";
import { createStore } from "solid-js/store";
import { useForm } from "../ts/validation";
import type { TValidator } from "../ts/validation";

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
  const userNameExists: TValidator = async ({ value }) => {
    if (await fetchUserName(value)) {
      return `${value} is already being used`;
    }
  };
  const matchesPassword: TValidator = ({ value }) => {
    value === fields.password ? false : "Passwords must Match";
  };

  const reqiredValidator: TValidator = ({ value }) => {
    if (!value) {
      return "Please enter a value!";
    }
  };

  const minLenValidatorFactory = (min: number): TValidator => {
    return ({ value }) => {
      if (typeof value === "string" && value.length < min) {
        return `Enter at least ${min} chars`;
      }
    };
  };

  return (
    <form use:formSubmit="">
      <h1>Sign Up</h1>
      <div class="">
        <input
          class="input-base my-3"
          name="email"
          type="text"
          placeholder="Email"
          use:validate={[reqiredValidator, userNameExists]}
        />
        {errors.email && <ErrorMessage error={errors.email} />}
      </div>
      <div class="field-block">
        <input
          class="input-base my-3"
          type="text"
          name="password"
          placeholder="Password"
          onInput={(e) => setFields("password", e.target.value)}
          use:validate={[reqiredValidator, minLenValidatorFactory(4)]}
        />
        {errors.password && <ErrorMessage error={errors.password} />}
      </div>
      <div class="field-block">
        <input
          class="input-base my-3"
          type="text"
          name="confirmpassword"
          placeholder="Confirm Password"
          use:validate={[reqiredValidator, matchesPassword]}
        />
        {errors.confirmpassword && (
          <ErrorMessage error={errors.confirmpassword} />
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Test;
