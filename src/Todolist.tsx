import React from "react";

type PropsType = {
  title: string
}

export function Todolist (props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
    </div>
  )
}