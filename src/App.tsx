import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ]);

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true}
        ]
    });


    function addTask(todolistId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;

        setTasks({...tasksObj})
    }

    function removeTask(todolistId: string, id: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId]= filteredTasks
        setTasks({...tasksObj})
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj});
        }

    }

    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter((el)=>el.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }


    return (
        <div className="App">

            {
                todolists.map((tl) => {
                    let tasksForTodoList = tasksObj[tl.id];
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
                    }
                    if (tl.filter === "active") {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
