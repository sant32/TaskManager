import "./App.css";
import TaskForm from "./components/taskForm.jsx";
import TaskList from "./components/taskList.jsx";

function App() {
  return (
    <>
      <div className="App">
        <h1>Task Manager</h1>

        <TaskForm />

        <TaskList />
      </div>
    </>
  );
}

export default App;
