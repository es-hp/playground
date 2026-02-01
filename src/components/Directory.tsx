// React
import { useState, useEffect } from "react";

// Bootstrap
import Card from "react-bootstrap/Card";

// Components
import { PersonComponent } from "./PersonComponent";
import { Status } from "./ui/Status";
import { Header } from "./ui/Header";
import { CustomButton } from "./ui/CustomButton";
import { Dropdown } from "./ui/Dropdown";

// Types
import type { Person, ProfileProps } from "../models/Person.model";
import {
  type Size,
  DEFAULT_SIZE,
  SIZE_OPTIONS,
  type Variant,
  DEFAULT_VARIANT,
  VARIANT_OPTIONS,
} from "../types/types";

export function Directory() {
  // Count button and result
  const [count, setCount] = useState<number>(0);
  const [studentIndex, setStudentIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  // UI Theme States
  const [size, setSize] = useState<Size>(DEFAULT_SIZE);
  const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT);
  const [isDisabled, SetIsDisabled] = useState<boolean>(false);

  const handleClick = () => {
    setCount((c) => c + 1);
    if (studentIndex < students.length - 1) {
      setStudentIndex((c) => c + 1);
    } else {
      setStudentIndex(0);
    }
  };

  useEffect(() => {
    setMessage(`You clicked ${count} times.`);
  }, [count]);

  useEffect(() => {
    SetIsDisabled(variant === "disabled");
  }, [variant]);

  const students: Person[] = [
    {
      name: "Helen",
      age: 35,
      email: "helen@example.com",
      isLoggedIn: false,
    },
    { name: "John", age: 16, email: "john@example.com", isLoggedIn: false },
    { name: "Steph", age: 23, isLoggedIn: false },
  ];

  const profileData: ProfileProps = {
    person: students[studentIndex],
    message: "This is a message from the parent component.",
  };

  return (
    <div className="d-flex flex-column gap-3">
      <Header>Directory</Header>
      <Card>
        <Card.Body>
          <PersonComponent {...profileData} />
        </Card.Body>
      </Card>
      <Status status="loading" />
      <h5 className="text-start mb-4">Change button size and style:</h5>
      <div className="dropdown-container d-flex gap-4">
        <Dropdown value={size} onChange={setSize} options={SIZE_OPTIONS} />
        <Dropdown
          value={variant}
          onChange={setVariant}
          options={VARIANT_OPTIONS}
        />
      </div>
      <CustomButton
        onClick={handleClick}
        size={size}
        variant={variant}
        disabled={isDisabled}
      >
        Click me
      </CustomButton>
      <p>{message}</p>
    </div>
  );
}
