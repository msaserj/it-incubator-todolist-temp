import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {

    let tasks1: Array<TaskType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 1, title: "JS", isDone: true},
        {id: 1, title: "React", isDone: false}
    ]

    let tasks2: Array<TaskType> = [
        {id: 1, title: "Terminator", isDone: true},
        {id: 1, title: "XXX", isDone: false},
        {id: 1, title: "Back To The Future", isDone: true}

    ]

    return (
        <div className="App">
            <TodoList title="What to learn" tasks={tasks1} />
            <TodoList title="Movies" tasks={tasks2} />
        </div>
    );
}

export default App;
