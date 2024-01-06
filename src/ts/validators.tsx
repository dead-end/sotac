export interface Validator<T> {
  (value: T, setError: (value: string) => void): boolean;
}

// TODO: not used
export const regexValidatorFactory = (pattern: string): Validator<string> => {
  return (value: string, setError: (value: string) => void) => {
    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      setError(`The value does not match the pattern ${pattern}`);
      return false;
    }
    return true;
  };
};

export const requiredStringValidatorFactory = (): Validator<string> => {
  return (value: string, setError: (value: string) => void) => {
    if (value === null || value.trim().length == 0) {
      setError("Please entern a string value!");
      return false;
    }
    return true;
  };
};
