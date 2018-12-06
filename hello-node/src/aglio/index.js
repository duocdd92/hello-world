var aglio = require('aglio');
var blueprint = '# Some API Blueprint string';
var options = {
    themeVariables: 'default'
};

aglio.render('test.apib', options, function(err, html, warnings) {
    if (err) return console.log(err);
    if (warnings) console.log(warnings);

    console.log(html);
});

// aglio.renderFile('test.apib', 'test.html', options, function(err, warnings) {
//     if (err) return console.log(err);
//     if (warnings) console.log(warnings);
// });