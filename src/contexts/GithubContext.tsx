import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import {
  GithubRepo,
  hasGitubRepo,
  loadGithubRepo,
  saveGithubRepo,
} from "../ts/token";

export type GithubContextValue = [
  state: GithubRepo,
  actions: {
    save: (owner: string, name: string, token: string, pwd: string) => void;
    load: (pwd: string) => void;
    needsSetup: () => boolean;
    isLogin: () => boolean;
  }
];

const defaultState = {
  owner: "",
  name: "",
  token: "",
};

const GithubContext = createContext<GithubContextValue>([
  defaultState,
  {
    load: () => undefined,
    save: () => undefined,
    needsSetup: () => false,
    isLogin: () => false,
  },
]);

export const GithubContextProvider: ParentComponent = (props) => {
  const [state, setState] = createStore(defaultState);

  const load = async (pwd: string) => {
    const githubRepo = await loadGithubRepo(pwd);
    setState("owner", githubRepo.owner);
    setState("name", githubRepo.name);
    setState("token", githubRepo.token);
  };

  const save = async (
    owner: string,
    name: string,
    token: string,
    pwd: string
  ) => {
    await saveGithubRepo(owner, name, token, pwd);
    setState("owner", owner);
    setState("name", name);
    setState("token", token);
  };

  const needsSetup = () => !hasGitubRepo();
  const isLogin = () => {
    return state.token ? true : false;
  };

  return (
    <GithubContext.Provider
      value={[state, { load, save, needsSetup, isLogin }]}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export const useGithubContext = () => useContext(GithubContext);
