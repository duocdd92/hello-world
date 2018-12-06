import React from 'react'

const Todo = ({ onTodoClick, completed, text }) => (
    <li
        onClick={onTodoClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
)

export default Todo