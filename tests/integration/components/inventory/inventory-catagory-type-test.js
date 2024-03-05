import { module, test } from 'qunit';
import { setupRenderingTest } from 'library-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | inventory/inventory-catagory-type',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<Inventory::InventoryCatagoryType />`);

      assert.dom().hasText('');

      // Template block usage:
      await render(hbs`
      <Inventory::InventoryCatagoryType>
        template block text
      </Inventory::InventoryCatagoryType>
    `);

      assert.dom().hasText('template block text');
    });
  }
);
