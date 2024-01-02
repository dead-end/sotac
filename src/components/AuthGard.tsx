import { useNavigate } from "@solidjs/router";
import { ParentComponent, createEffect } from "solid-js";

const AuthGard: ParentComponent = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  createEffect(() => {
    console.log("################", token);
    if (!token) {
      navigate("/login", { replace: true });
    }
  });

  return <div>{props.children}</div>;
};

export default AuthGard;
