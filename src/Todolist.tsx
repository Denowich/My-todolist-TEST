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
  removeTask: (taskId: string, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changefilter: (value: FilterValuesType, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  filter: FilterValuesType
  id: string
  removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

  let [newTaskTitle, setNewTaskTitle] = useState('');
  let [error, setError] = useState<string | null>(null);


  const onChangeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.ctrlKey && e.code === 'Enter') {
      if (newTaskTitle.trim() !== '') {
        props.addTask(newTaskTitle.trim(), props.id)
        setNewTaskTitle('')
      }
      setError('Title is required')
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim(), props.id)
      setNewTaskTitle('')
    }
    setError('Title is required')
  }
  const onClickAllHandler = () => props.changefilter('all', props.id)
  const onClickActiveHandler = () => props.changefilter('active', props.id)
  const onClickCompletedHandler = () => props.changefilter('completed', props.id)
  const removeTodolist = () => props.removeTodolist(props.id)

  return (
    <div>
      <h2>{props.title}<button onClick={removeTodolist}>x</button></h2>
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

            const onClickRemoveTaskHandler = () => props.removeTask(t.id, props.id)
            const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            }

            return <li key={t.id} className={t.isDone ? "is-done" : ''}>
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