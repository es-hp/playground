import axios from "axios";
import { useState, useEffect } from "react";
import type { Task, TodosResponse } from "../types/types";
import { Form } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set());

  // Paginate animation using framer-motion
  const [direction, setDirection] = useState<1 | -1>(1);

  const taskLimit = 3;

  useEffect(() => {
    let timerId: number | undefined;

    const getTasks = async (): Promise<void> => {
      setIsLoading(true);
      setShowLoading(false);

      timerId = window.setTimeout(() => {
        setShowLoading(true);
      }, 2000);

      try {
        const skip = (currentPage - 1) * taskLimit;

        const response = await axios.get<TodosResponse>(
          "https://dummyjson.com/todos",
          {
            params: { limit: taskLimit, skip: skip },
          }
        );
        setTasks(response.data.todos);
        setTotalPages(Math.ceil(response.data.total / taskLimit));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        setShowLoading(false);
        if (timerId) window.clearTimeout(timerId);
      }
    };

    getTasks();

    // Clean up timer for loading screen
    return () => {
      if (timerId) window.clearTimeout(timerId);
    };
  }, [currentPage]);

  const toggleCompleted = async (id: number): Promise<void> => {
    if (updatingIds.has(id)) return;

    const current = tasks.find((task) => task.id === id);
    if (!current) return;

    setUpdatingIds((prev) => new Set(prev).add(id));

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !current.completed } : task
      )
    );

    try {
      await axios.patch<Task>(`https://dummyjson.com/todos/${id}`, {
        completed: !current.completed,
      });
    } catch (err) {
      console.log(err);
      // Roleback UI if server fails
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: current.completed } : task
        )
      );
    } finally {
      setUpdatingIds((prev) => {
        const copy = new Set(prev);
        copy.delete(id);
        return copy;
      });
    }
  };

  // For animation
  const pageVariants = {
    enter: (dir: 1 | -1) => ({
      x: dir === 1 ? 250 : -250,
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
      width: "100%",
    },
    exit: (dir: 1 | -1) => ({
      x: dir === 1 ? -250 : 250,
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
  };

  return (
    <section
      id="dynamic-task-rendering"
      className="d-flex flex-column h-100 gap-4"
    >
      <h2 className="title m-0">Dynamic Task Rendering</h2>
      <div className="task-container">
        {showLoading && (
          <div className="loading-screen">
            {Array.from({ length: taskLimit }).map((_, i) => (
              <div key={i} className="skeleton task-card">
                <div className="skeleton-line w100" />
                <div className="skeleton-line w80" />
                <div className="skeleton-line w60" />
              </div>
            ))}
          </div>
        )}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            {tasks.map((task: Task) => (
              <div key={task.id} className="task-card">
                <p>
                  <strong>Task:</strong> {task.id}
                </p>
                <p>
                  <strong>Description:</strong> {task.todo}
                </p>
                <Form.Check
                  type="checkbox"
                  id={`completed-${task.id}`}
                  label="Completed"
                  checked={task.completed}
                  disabled={isLoading || updatingIds.has(task.id)}
                  onChange={() => toggleCompleted(task.id)}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="d-flex gap-4 align-items-center justify-content-center mt-auto">
        <button
          className="btn btn-secondary"
          onClick={() => {
            setDirection(-1);
            setCurrentPage(1);
          }}
          disabled={currentPage === 1 || isLoading}
        >
          First
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setDirection(-1);
            setCurrentPage((prev) => prev - 1);
          }}
          disabled={currentPage === 1 || isLoading}
        >
          ←
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setDirection(1);
            setCurrentPage((prev) => prev + 1);
          }}
          disabled={currentPage === totalPages || isLoading}
        >
          →
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setDirection(1);
            setCurrentPage(totalPages);
          }}
          disabled={currentPage === totalPages || isLoading}
        >
          Last
        </button>
      </div>
    </section>
  );
}
