import { ACT_TYPE, FILTER_TYPE } from '../../config/redux.jsx'

const visibilityFilter = (state = FILTER_TYPE.SHOW_ALL, action) => {
    switch(action.type){
        case ACT_TYPE.SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

export default visibilityFilter