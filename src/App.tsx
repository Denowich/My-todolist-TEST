import React, { useState } from "react";
import './App.css';
import { TasksType, Todolist } from "./Todolist";


function App() {

  let [tasks, setTasks] = useState<Array<TasksType>> ([
    { id: 1, title: 'HTML', isDone: true },
    { id: 2, title: 'CSS', isDone: true },
    { id: 3, title: 'JS', isDone: false },
    { id: 4, title: 'React', isDone: false },
  ]);


  function removeTask (taskId: number){
    let resultTask = tasks.filter( t=> t.id !== taskId)
    setTasks(resultTask);
  }

  return (
    <div className="app">
      <Todolist title='What to learn :'
        tasks={tasks}
        removeTask={removeTask}
      />
    </div>
  )
}
export default App;