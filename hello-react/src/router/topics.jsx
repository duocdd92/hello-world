import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import React from 'react';

const Topic = ({match}) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

const Topics = ({match}) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li><Link to={match.url + '/topic-1'}>Topic 1</Link></li>
            <li><Link to={match.url + '/topic-2'}>Topic 2</Link></li>
            <li><Link to={match.url + '/topic-3'}>Topic 3</Link></li>
        </ul>

        <Route path={match.url + '/:topicId'} component={Topic} />
        <Route exact path={match.url} render={() => (<h3>Please select a topic</h3>)} />
    </div>
);

export default Topics;