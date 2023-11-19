import React from "react";



type PropsType = {
  title: string
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
        <li><input type="checkbox" checked={false} /><span>HTML</span></li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}