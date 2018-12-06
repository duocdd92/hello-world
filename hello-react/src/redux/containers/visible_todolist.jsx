import { connect } from 'react-redux'
import { toggleTodo } from '../actions/index.jsx'
import { FILTER_TYPE } from '../../config/redux.jsx'
import TodoList from '../components/todo_list.jsx'

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case FILTER_TYPE.SHOW_COMPLETED:
            return todos.filter(t => t.completed)
        case FILTER_TYPE.SHOW_ACTIVE:
            return todos.filter(t => !t.completed)
        case FILTER_TYPE.SHOW_ALL:
            return todos
        default:
            return todos
    }
}

const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList