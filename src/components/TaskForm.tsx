import { useState } from "react";
import axios from "axios";
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap";
import type { Task } from "../types/types";

export function TaskForm() {
  // form and UI state
  const [todo, setTodo] = useState<string>("");
  const [userIdInput, setUserIdInput] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  // feedback state
  const [addedUserId, setAddedUserId] = useState<number | null>(null);
  const [addedTask, setAddedTask] = useState<string>("");

  // form status
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  // form feedback UI
  const [show, setShow] = useState<boolean>(false);

  // handle functions
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    try {
      setIsLoading(true);

      const response = await axios.post<Task>(
        "https://dummyjson.com/todos/add",
        {
          todo: todo.trim(),
          completed: false,
          userId: userId,
        }
      );

      setAddedUserId(response.data.userId);
      setAddedTask(response.data.todo);
      setShow(true);

      setTodo("");
      setUserIdInput("");
      setUserId(null);
      setValidated(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormReset = () => {
    setAddedTask("");
    setAddedUserId(null);
    setValidated(false);
  };

  const handleModalClose = () => {
    setShow(false);
    handleFormReset();
  };

  return (
    <>
      <h2>Add New Task</h2>
      <Form
        className="d-flex flex-column gap-3 text-start"
        validated={validated}
        onSubmit={handleSubmit}
        noValidate
      >
        <Form.Group className="position-relative">
          <FloatingLabel label="User ID">
            <Form.Control
              type="text"
              inputMode="numeric"
              pattern="^[1-9][0-9]{0,3}$"
              maxLength={4}
              id="userId"
              aria-describedby="userId"
              value={userIdInput}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setUserIdInput(value);
                  setUserId(value === "" ? null : Number.parseInt(value, 10));
                }
              }}
              placeholder="User ID"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a vaid ID number (1-9999).
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <FloatingLabel label="Task">
            <Form.Control
              type="text"
              id="todo"
              aria-describedby="taskDescription"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Task"
              required
            />
            <Form.Control.Feedback type="invalid">
              Task cannot be empty.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <div className="d-flex gap-4 align-self-center mt-3">
          <Button type="button" variant="secondary" onClick={handleFormReset}>
            Reset
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            Add task
          </Button>
        </div>
      </Form>
      {addedUserId !== null && addedTask !== "" && (
        <Modal show={show} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>New task added successfully!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>User Id: {addedUserId}</p>
            <p>Task: {addedTask}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
