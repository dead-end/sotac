import { createStore } from "solid-js/store";
import { useForm } from "../ts/validation/form";
import MyTextComponent from "../components/MyTextComponent";
import FromComponent from "../components/FormComponent";
import { requiredValidator } from "../ts/validation/validators";

const MyWay = () => {
  const [form, setForm] = createStore({
    user: "",
    password: "",
  });

  const { validateForm, register, errors, setErrors } = useForm();

  const handleSubmit = (event: Event): void => {
    event.preventDefault();

    if (validateForm()) {
      console.log("success", form.user, form.password);
    }
  };

  return (
    <div class="w-full max-w-xs m-auto">
      <FromComponent label="My Way" onSubmit={handleSubmit}>
        <MyTextComponent
          name="user"
          label="User"
          type="text"
          placeholder="User"
          validators={[requiredValidator]}
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          register={register}
        />

        <MyTextComponent
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          validators={[requiredValidator]}
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          register={register}
        />
      </FromComponent>
    </div>
  );
};

export default MyWay;
