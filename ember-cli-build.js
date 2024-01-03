'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
<<<<<<< HEAD
    'ember-bootstrap': {
      bootstrapVersion: 5,
      importBootstrapCSS: false,
    },
=======
    // Add options here
>>>>>>> origin/main
  });

  return app.toTree();
};
