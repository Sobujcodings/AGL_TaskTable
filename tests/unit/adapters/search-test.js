import { module, test } from 'qunit';

import { setupTest } from 'library-app/tests/helpers';

module('Unit | Adapter | search', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:search');
    assert.ok(adapter);
  });
});
