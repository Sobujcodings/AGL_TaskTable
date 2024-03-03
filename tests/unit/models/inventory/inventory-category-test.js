import { module, test } from 'qunit';

import { setupTest } from 'library-app/tests/helpers';

module('Unit | Model | inventory/inventory category', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('inventory/inventory-category', {});
    assert.ok(model);
  });
});
