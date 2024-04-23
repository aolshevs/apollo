import styles from "./App.module.css";
import Todo from "./Todo/Todo.tsx";

function App() {
  return (
    <div className={styles.root}>
      <Todo />
    </div>
  );
}

export default App;
