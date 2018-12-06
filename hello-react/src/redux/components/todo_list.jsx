import React from 'react'
import Todo from './todo.jsx'

const todoList = ({ todos, onTodoClick }) => (
    <ul>
        {
            todos.map(todo => (
                <Todo key={todo.id} {...todo} onTodoClick={() => onTodoClick(todo.id)} />
            ))
        }
    </ul>
)

export default todoList