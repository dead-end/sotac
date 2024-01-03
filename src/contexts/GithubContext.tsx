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
    exists: () => boolean;
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
    exists: () => false,
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
  const exists = hasGitubRepo;

  return (
    <GithubContext.Provider value={[state, { load, save, exists }]}>
      {props.children}
    </GithubContext.Provider>
  );
};

export const useGithubContext = () => useContext(GithubContext);
