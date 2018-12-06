import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router, 
    Route, 
    Link
} from 'react-router-dom';

// import ReduxApp from './redux/index.jsx'
import './style/index.scss'

class Main extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Router>
                <div>
                    <h1>React app</h1>
                    <ul>
                        {/* <Link to='/redux'>Redux</Link> */}
                    </ul>
                    <hr />
                    {/* <Route path='/redux' component={ReduxApp}/> */}
                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('app')
)
