import React, { useState, ChangeEvent, KeyboardEvent } from "react";



type AddItemFormPropsType = {
      addTask: (title: string, todolistId: string) => void
      id: string
}


export function AddItemForm(props: AddItemFormPropsType) {
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

      return <div>
            <input value={newTaskTitle}
                  onChange={onChangeNewTaskTitleHandler}
                  className={error ? "error" : ''}
                  onKeyDown={onKeyDownHandler}
                  placeholder="Enter new task..."
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
      </div>
}