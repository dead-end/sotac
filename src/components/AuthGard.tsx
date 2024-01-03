import { useNavigate } from "@solidjs/router";
import { ParentComponent, createEffect } from "solid-js";
import { useGithubContext } from "../contexts/GithubContext";

const AuthGard: ParentComponent = (props) => {
  const navigate = useNavigate();

  const [state, { exists }] = useGithubContext();

  createEffect(() => {
    if (!exists()) {
      navigate("/setup", { replace: true });
    } else if (!state.token) {
      navigate("/login", { replace: true });
    }
  });

  return <div>{props.children}</div>;
};

export default AuthGard;
