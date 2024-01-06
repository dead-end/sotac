import { TValidator } from "./types";

export const requiredValidator: TValidator = ({ value }) => {
  if (!value) {
    return "Please enter a value!";
  }
};
