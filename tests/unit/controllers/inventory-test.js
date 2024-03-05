import { module, test } from 'qunit';
import { setupTest } from 'library-app/tests/helpers';

module('Unit | Controller | inventory', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:inventory');
    assert.ok(controller);
  });
});
