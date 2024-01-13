import { module, test } from 'qunit';
import { setupTest } from 'library-app/tests/helpers';

module('Unit | Service | my-service', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:my-service');
    assert.ok(service);
  });
});
