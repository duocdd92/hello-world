import { ACT_TYPE } from '../../config/redux.jsx'

const todos = (state = [], action) => {
    switch(action.type){
        case ACT_TYPE.ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case ACT_TYPE.TOGGLE_TODO:
            return state.map(todo => {
                todo.completed = todo.id === action.id ? !todo.completed : todo.completed
                return todo
            })
        default:
            return state
    }
}

export default todos