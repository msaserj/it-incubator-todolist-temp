import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolists: Array<TodolistType> = [
        {id: v1(), title: "What to learn", filter: "active"},
        {id: v1(), title: "What to buy", filter: "completed"}
    ]

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ]);

    console.log(tasks)

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }
    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t=> t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks]);
    }

    let tasksForTodoList = tasks;
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    }

    return (
        <div className="App">

            {
                todolists.map((tl)=> {
                    return(


                        <TodoList title={tl.title}
                                  tasks={tasksForTodoList}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeStatus}
                                  filter={tl.filter}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
