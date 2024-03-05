import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class InventoryInventoryCatagoryTypeComponent extends Component {
  @service store;


  @tracked TableDropDownnames = [true, false];

  @action handleEdit(item) {
    console.log('item', item);
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
  handlestatus(item, event) {
    // console.log(item);
    // console.log(event.target.value);
    item.active_status = event.target.value;
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
      column_name: 'country',
      column_property: 'country',
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

    const inventoryType = this.store.findAll('inventory/catagory-type');
    inventoryType.then(data => {
      let inventoryTypeObjects = data.map((element) => {
        return element
      })
      this.items = data;
    })

  }
}
