import { ACT_TYPE } from '../../config/redux.jsx'

let todoId = 0

export const addTodo = text => ({ 
    type: ACT_TYPE.ADD_TODO, 
    id: todoId++,
    text 
})

export const toggleTodo = id => ({ 
    type: ACT_TYPE.TOGGLE_TODO, 
    id
})

export const setVisibilityFilter = filter => ({ 
    type: ACT_TYPE.SET_VISIBILITY_FILTER, 
    filter 
})