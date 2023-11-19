import React, { useState } from "react";
import './App.css';
import { TasksType, Todolist } from "./Todolist";
import { v1 } from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed';


function App() {

  let [tasks, setTasks] = useState<Array<TasksType>>([
    { id: v1(), title: 'HTML', isDone: true },
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: false },
    { id: v1(), title: 'React', isDone: false },
  ]);

  let [filter, setfilter] = useState<FilterValuesType>('all');


  function removeTask(id: string) {
    let filteredTask = tasks.filter(t => t.id !== id)
    setTasks(filteredTask)
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }


  let tasksForTodolist = tasks;
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }

  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }
  function changefilter(value: FilterValuesType) {
    setfilter(value)
  }


  return (
    <div className="app">
      <Todolist title='What to learn :'
        tasks={tasksForTodolist}
        removeTask={removeTask}
        addTask={addTask}
        changefilter={changefilter}
      />
    </div>
  )
}
export default App;