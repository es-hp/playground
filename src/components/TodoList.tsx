import { useState } from "react";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTodo = (): void => {
    if (newTask.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        task: newTask,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setNewTask("");
    }
  };

  const toggleTodo = (id: number): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <h2 className="title">Your Todo List</h2>
      <div className="todo-list-container px-4 py-3 shadow rounded-3">
        {todos.length === 0 && <p>No tasks currently...</p>}
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="checkbox"
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.task}
            </span>
            <button
              className="btn btn-danger btn-sm ms-auto my-2"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="input-row d-flex w-100 mt-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
          placeholder="Input task here"
          className="me-3 form-control"
        />
        <button onClick={addTodo} className="btn btn-primary">
          Add
        </button>
      </div>
    </div>
  );
}
