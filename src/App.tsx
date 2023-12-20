import React, { useState } from "react";
import './App.css';
import { TasksType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";


export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTask = tasks.filter(t => t.id !== id)
    tasksObj[todolistId] = filteredTask
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj })
  }


  function changefilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }


  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }
  }


  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'Learn :', filter: 'all' },
    { id: todolistId2, title: 'Movie :', filter: 'all' }
  ]);

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: false },
      { id: v1(), title: 'React', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Robocop', isDone: true },
      { id: v1(), title: 'Terminator', isDone: false },
      { id: v1(), title: 'Terminator-2', isDone: false },
    ]
  })


  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist)
    delete tasksObj[todolistId]
    setTasks(tasksObj);
  }

  return (
    <div className="app">
      <AddItemForm
        addTask={() => { }}
        id={'xx'} />
      {
        todolists.map((tl) => {

          let tasksForTodolist = tasksObj[tl.id];
          if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
          }

          if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
          }

          return <Todolist
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            addTask={addTask}
            changefilter={changefilter}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            key={tl.id}
            id={tl.id}
            removeTodolist={removeTodolist}
          />
        })
      }
    </div>
  )
}
export default App;