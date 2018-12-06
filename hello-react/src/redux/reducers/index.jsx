import { combineReducers } from 'redux'
import todos from './todos.jsx'
import visibilityFilter from './visibility_filer.jsx'

const todoApp = combineReducers({
    todos,
    visibilityFilter
})

export default todoApp