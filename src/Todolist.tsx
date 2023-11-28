import React, { useState, ChangeEvent, KeyboardEvent } from "react";
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
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

  let [newTaskTitle, setNewTaskTitle] = useState('');


  const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.code === 'Enter') {
      if (newTaskTitle.trim() !== '') {
        props.addTask(newTaskTitle.trim())
        setNewTaskTitle('')
      }
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle('')
    }
  }
  const onClickAllHandler = () => props.changefilter('all')
  const onClickActiveHandler = () => props.changefilter('active')
  const onClickCompletedHandler = () => props.changefilter('completed')



  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        <input value={newTaskTitle}
          onChange={onChangeNewTaskTitleHandler}
          className="error"
          onKeyDown={onKeyDownHandler}
          placeholder="Enter new task..."
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map((t) => {

            const onClickRemoveTaskHandler = () => props.removeTask(t.id)
            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked)
            }

            return <li key={t.id}>
              <input type="checkbox"
                onChange={onChangeTaskStatusHandler}
                checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>
          })
        }
      </ul>
      <div>
        <button onClick={onClickAllHandler}>All</button>
        <button onClick={onClickActiveHandler}>Active</button>
        <button onClick={onClickCompletedHandler}>Completed</button>
      </div>
    </div>
  )
}