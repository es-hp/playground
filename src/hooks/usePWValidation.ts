import { useState } from "react";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])\S{6,12}$/;

export const usePWValidation = () => {
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validatePassword = (password: string): boolean => {
    const valid = passwordRegex.test(password);
    setIsValid(valid);
    setError(
      valid
        ? ""
        : "Password must be 6-12 characters, have at least 1 uppercase, number, and special character. Cannot have spaces."
    );
    return valid;
  };

  return { error, setError, validatePassword, isValid };
};
