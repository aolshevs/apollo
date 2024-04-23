import { useState } from "react";
import styles from "./Todo.module.css";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

function Todo() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo.trim() !== "") {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
  });

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const handleCompleteTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleClearCompleted = () => {
    const updatedTodos = todos.map((todo) => {
      todo.completed = false;
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className={styles.todosContainer}>
      <h1>todos</h1>

      <section className={styles.todoSearchAndResults}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e?.target?.value)}
          onKeyDown={handleKeyPress}
          placeholder="What needs to be done?"
        />
        <section>
          {/* TODO LIST */}
          {filteredTodos.length > 0 && (
            <ul>
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <div>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleCompleteTodo(todo.id)}
                    />
                    <span className={todo.completed ? styles.completed : ""}>
                      {todo.text}
                    </span>
                  </div>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    &#x2715;
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* FILTERS BAR */}
          {todos.length > 0 && (
            <div className={styles.filterBar}>
              <span>
                {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
              </span>
              <div className="filterButtons">
                <button
                  className={filter === "all" ? styles.selected : ""}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={filter === "active" ? styles.selected : ""}
                  onClick={() => setFilter("active")}
                >
                  Active
                </button>
                <button
                  className={filter === "completed" ? styles.selected : ""}
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </button>
              </div>
              {itemsLeft > 0 && (
                <button onClick={handleClearCompleted}>Clear completed</button>
              )}
            </div>
          )}
        </section>
      </section>
    </div>
  );
}

export default Todo;
