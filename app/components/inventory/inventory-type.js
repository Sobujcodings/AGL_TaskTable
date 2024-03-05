import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class InventoryInventoryTypeComponent extends Component {
  @service store;


  @tracked TableDropDownnames = ["true", "false"];

  @action handleEdit(item) {
    // console.log('item', item);
    set(item, 'isEdit', true)
  }

  @action handleCancel(item) {
    set(item, 'isEdit', false);
    item.rollbackAttributes()
  }

  @action handleSave(item) {
    // console.log('sfsjfsf', item);
    set(item, 'isEdit', false);
    item.save();
  }



  @action
  handleStatusChange(item, value) {
    console.log('jsfjdb', item);
    set(item, 'active_status', value)
  }


  inventoryTypeColumns = [
    {
      column_name: 'id',
      column_property: 'id',
    },
    {
      column_name: 'type',
      column_property: 'type',
    },
    {
      column_name: 'description',
      column_property: 'description',
    },
    {
      column_name: 'status',
      column_property: 'status',
    },
    {
      column_name: 'actions',
      column_property: 'actions',
    },
  ];

  @tracked items;
  constructor() {
    super(...arguments);

    const inventoryType = this.store.findAll('inventory/inventory-type');
    inventoryType.then(data => {
      let inventoryTypeObjects = data.map((element) => {
        return element
      })
      this.items = data;
    })

  }
}
