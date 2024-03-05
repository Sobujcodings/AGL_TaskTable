import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class InventoryInventoryTypeComponent extends Component {
  @service store;

  // @tracked inputFieldNumbers = [{'type': null, 'description': null, 'status': null}];
  @tracked keysName;
  // modal size
  @tracked ModalSize;
  // track table values --> header contains table name and ModalTableValue contains the key and value pairs;
  @tracked ModalHeader = 'Inventory type';
  @tracked ModalTableHeaders = [];
  @tracked ModalTableValue = A([]);

  // to store inputfileds
  @tracked inputFieldNumbers = [];
  // input values
  @tracked inputValues = {};

  // create inventory
  @tracked keysName;
  @tracked isActive = false;

  // dropdown value
  names = ['active', 'inactive'];
  @tracked selectedStatus = 'status';
  // to track multiple input value and keys obj.
  @tracked inputvalueobj = [];
  // active and inactive values from selected dropdown
  @tracked statusValues = '';
  @tracked statusList = [];

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

    // const inventoryType = this.store.findAll('inventory/inventory-type');
    // inventoryType.then((data) => {
    //   let inventoryTypeObjects = data.map((element) => {
    //     return {
    //       // ID: element.id,
    //       id: element.id,
    //       type: element.inv_type,
    //       description: element.description,
    //       status: element.active_status,
    //     };
    //   });
    // this.items = data;
    // console.log(this.items);

    //
    //   this.ModalTableHeaders = [];
    //   this.ModalTableHeaders.push({
    //     type: null,
    //     description: null,
    //     status: 'inactive',
    //   });
    //   // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.)
    //   this.keysName = Object.keys({ type: null, description: null });
    //   console.log('this.keysName', this.keysName);
    //   // TODO: ager obj/input filed khali thakle ai new create hobe nah
    //   // Create an object with null values for each key
    //   const newObj = this.keysName.reduce((acc, key) => {
    //     acc[key] = null;
    //     return acc;
    //   }, {});
    //   console.log(newObj);
    //   // Push the new object into the inputFieldNumbers array, to show the blank input field.
    //   this.inputFieldNumbers.push(newObj);
    //   this.inputFieldNumbers = this.inputFieldNumbers;

    //   console.log(this.inputFieldNumbers);
  }
}
