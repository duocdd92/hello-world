import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Home from './home.jsx';
import About from './about.jsx';
import Contact from './contact.jsx';
import Topics from './topics.jsx';

const Test = ({match}) => (
    <div>
        {/* <Route path={match.url + '/contact'} component={Contact} /> */}
        id: {match.params.id}
    </div>
);

const Menu = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/topics">Topics</Link></li>
                {/* <li><Link to="/test">Test</Link></li> */}
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/topics" component={Topics} />
            {/* <Route path="/:id" component={Test} /> */}
        </div>
    </Router>
);

export default Menu;