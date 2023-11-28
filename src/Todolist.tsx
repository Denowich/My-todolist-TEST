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
  filter: FilterValuesType
}

export function Todolist(props: PropsType) {

  let [newTaskTitle, setNewTaskTitle] = useState('');
  let [error, setError] = useState<string | null>(null);


  const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.ctrlKey && e.code === 'Enter') {
      if (newTaskTitle.trim() !== '') {
        props.addTask(newTaskTitle.trim())
        setNewTaskTitle('')
      }
      setError('Title is required')
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle('')
    }
    setError('Title is required')
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
          className={error ? "error" : ''}
          onKeyDown={onKeyDownHandler}
          placeholder="Enter new task..."
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
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
        <button className={props.filter === 'all' ? "active-filter" : ''} onClick={onClickAllHandler}>All</button>
        <button className={props.filter === 'active' ? "active-filter" : ''} onClick={onClickActiveHandler}>Active</button>
        <button className={props.filter === 'completed' ? "active-filter" : ''} onClick={onClickCompletedHandler}>Completed</button>
      </div>
    </div>
  )
}