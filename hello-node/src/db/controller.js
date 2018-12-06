const dbQuery = require('./query.js');

exports.getUsers = function(req, res, next) {
    console.log(req.body);
    res.json(req.body)
        // dbQuery.getUsers(data => {
        //     res.json(data);
        // }, err => console.error('getUsers error', JSON.stringify(err)));
}