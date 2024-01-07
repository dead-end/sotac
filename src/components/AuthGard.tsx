import { useNavigate } from "@solidjs/router";
import { ParentComponent, createEffect } from "solid-js";
import { useGithubContext } from "../contexts/GithubContext";

const AuthGard: ParentComponent = (props) => {
  const navigate = useNavigate();

  const [state, { needsSetup, isLogin }] = useGithubContext();

  createEffect(() => {
    if (needsSetup()) {
      navigate("/setup", { replace: true });
      console.log("navigate to: setup");
    } else if (!isLogin()) {
      navigate("/login", { replace: true });
      console.log("navigate to: login");
    }
  });

  return <div>{props.children}</div>;
};

export default AuthGard;
