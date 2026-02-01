import { useState, type FormEvent } from "react";

export function useValidation() {
  const [validated, setValidated] = useState<boolean>(false);

  const handleValidation = (
    e: FormEvent<HTMLFormElement>,
    onValid: () => void
  ) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    onValid();
  };

  return { validated, handleValidation };
}
