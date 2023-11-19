import React, { useState } from "react";
import './App.css';
import { TasksType, Todolist } from "./Todolist";
import { v1 } from "uuid";


function App() {

  let [tasks, setTasks] = useState<Array<TasksType>>([
    { id: v1(), title: 'HTML', isDone: true },
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: false },
    { id: v1(), title: 'React', isDone: false },
  ]);


  function removeTask(id: string) {
    let filteredTask = tasks.filter(t => t.id !== id)
    setTasks(filteredTask)
  }

  function addTask (title: string) {
    let newTask = { id: v1(), title: title, isDone: false}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  return (
    <div className="app">
      <Todolist title='What to learn :'
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  )
}
export default App;