import { getKey, doEncrypt, doDecrypt, getSalt, getIv } from "./crypt";

export type GithubRepo = {
  readonly owner: string;
  readonly name: string;
  readonly token: string;
};

/**
 * The function checks if there github repository data in the local storage.
 */
export const hasGitubRepo = () => {
  return localStorage.getItem("github-repo") ? true : false;
};

/**
 * The function saves the github repository data in the local storage.
 */
export const saveGithubRepo = async (
  owner: string,
  name: string,
  token: string,
  pwd: string
) => {
  const base64 = await enctyptToken(token, pwd);

  const data: GithubRepo = {
    owner,
    name,
    token: base64,
  };

  localStorage.setItem("github-repo", JSON.stringify(data));
};

/**
 * The function loads the github repository data from the local storage.
 */
export const loadGithubRepo = async (pwd: string) => {
  const data = localStorage.getItem("github-repo");
  if (!data) {
    throw new Error("Github repository data not found!");
  }

  let tmp = JSON.parse(data);
  tmp.token = await dectyptToken(tmp.token, pwd);

  return tmp as GithubRepo;
};

/**
 * The function encryptes the token.
 */
const enctyptToken = async (token: string, pwd: string) => {
  const key = await getKey(pwd, getSalt());
  return await doEncrypt(key, getIv(), token);
};

/**
 * The function decryptes the token.
 */
const dectyptToken = async (base64: string, pwd: string) => {
  const key = await getKey(pwd, getSalt());
  return await doDecrypt(key, getIv(), base64);
};
