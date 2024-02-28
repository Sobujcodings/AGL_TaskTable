'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
  });

  app.import('node_modules/jquery/dist/jquery.js');
  app.import('node_modules/popper.js/dist/umd/popper.js');
  app.import('node_modules/popper.js/dist/umd/popper-utils.js');
  app.import('node_modules/bootstrap/dist/js/bootstrap.js');

  return app.toTree();
};
