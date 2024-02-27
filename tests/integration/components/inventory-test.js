import { module, test } from 'qunit';
import { setupRenderingTest } from 'library-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | inventory', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Inventory />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Inventory>
        template block text
      </Inventory>
    `);

    assert.dom().hasText('template block text');
  });
});
