'use strict';
var index = require('./pages/index');

module.exports = function(app) {
   app.use('/', index);

   app.use('/cssMod', function(req, res, next) {
      res.render('pages/cssModules');
   });

};