import { module, test } from 'qunit';

import { setupTest } from 'library-app/tests/helpers';

module('Unit | Serializer | contack', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('contack');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('contack', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
