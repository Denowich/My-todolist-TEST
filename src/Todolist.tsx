import React from "react";

export type TasksType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TasksType>
}

export function Todolist(props: PropsType) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {
          props.tasks.map((t) =>
            <li><input type="checkbox" checked={t.isDone} /><span>{t.title}</span></li>
          )
        }
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}