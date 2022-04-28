import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(props.id, newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
        // props.addTask(newTaskTitle)
        // setNewTaskTitle("")
    }
    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")

    const removeTodolist = () => {
      props.removeTodolist(props.id);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={removeTodolist}>X</button>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message" >Field is required</div>}
            </div>
            <ul>
                {
                    // map - это метод массива, который на основе каждого элемента в массиве создает новый элемент
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(props.id, t.id);
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)
                        }
                        return (
                            <li className={t.isDone ? "is-done" : ""} key={t.id}>
                                <input onChange={onChangeHandler} type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}