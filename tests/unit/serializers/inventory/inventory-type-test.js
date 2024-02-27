import { module, test } from 'qunit';

import { setupTest } from 'library-app/tests/helpers';

module('Unit | Serializer | inventory/inventory type', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('inventory/inventory-type');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('inventory/inventory-type', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
