import React, { useState } from "react";
import './App.css';
import { Todolist } from "./Todolist";


function App() {

  let tasks = [
    { id: 1, title: 'HTML', isDone: true },
    { id: 2, title: 'CSS', isDone: true },
    { id: 3, title: 'JS', isDone: false },
    { id: 4, title: 'React', isDone: false },
  ]

  return (
    <div className="app">
      <Todolist title='What to learn :' 
                tasks={tasks}/>
    </div>
  )
}
export default App;