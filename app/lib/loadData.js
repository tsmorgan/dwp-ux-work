var globby      = require('globby'),
    _           = require('underscore'),
    merge       = require('merge'),
    fs          = require('fs'),    
    CSON        = require('cson');

var loadData = function(app)
{
  app.locals.data = [];
  var defaults = CSON.parse(fs.readFileSync(__dirname + '/../data/projects/defaults.cson').toString());
  _.each(globby.sync("app/data/projects/*"),function(el)
  {
      if (el == 'app/data/projects/defaults.cson') return;
      var file = fs.readFileSync(__dirname +'/../../'+ el).toString();
      try {
        var cson = merge(true,defaults,CSON.parse(file));
        cson.filename = el;
        app.locals.data.push(cson);
      } catch(err) {
        console.log(err);
      }
  });
}


module.exports = loadData;
