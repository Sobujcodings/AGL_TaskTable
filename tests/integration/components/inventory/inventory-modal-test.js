import { module, test } from 'qunit';
import { setupRenderingTest } from 'library-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | inventory/inventory-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Inventory::InventoryModal />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Inventory::InventoryModal>
        template block text
      </Inventory::InventoryModal>
    `);

    assert.dom().hasText('template block text');
  });
});
