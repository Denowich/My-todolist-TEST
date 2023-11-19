import React, { useState } from "react";
import { FilterValuesType } from "./App";

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TasksType>
  removeTask: (taskId: string) => void
  addTask: (title: string) => void
  changefilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {

  let [newTaskTitle, setNewTaskTitle] = useState('');

  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input value={newTaskTitle}
          onChange={(e) => { setNewTaskTitle(e.currentTarget.value) }}
          className="error"
          onKeyDown={(e) => {
            if (e.ctrlKey && e.code === 'Enter') {
              props.addTask(newTaskTitle)
              setNewTaskTitle('')
            }
          }}
          placeholder="Enter new task..."
        />
        <button onClick={() => {
          props.addTask(newTaskTitle)
          setNewTaskTitle('')
        }}>+</button>
      </div>
      <ul>
        {
          props.tasks.map((t) =>
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={() => { props.removeTask(t.id) }}>x</button>
            </li>
          )
        }
      </ul>
      <div>
        <button onClick={(e) => { props.changefilter('all') }}>All</button>
        <button onClick={(e) => { props.changefilter('active') }}>Active</button>
        <button onClick={(e) => { props.changefilter('completed') }}>Completed</button>
      </div>
    </div>
  )
}