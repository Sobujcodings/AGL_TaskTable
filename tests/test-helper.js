<<<<<<< HEAD
import Application from 'library-app/app';
import config from 'library-app/config/environment';
=======
import Application from 'agltask/app';
import config from 'agltask/config/environment';
>>>>>>> origin/main
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
