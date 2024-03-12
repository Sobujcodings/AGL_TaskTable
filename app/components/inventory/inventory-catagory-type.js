import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class InventoryInventoryCatagoryTypeComponent extends Component {
  @service store;
  //  previous js data
  @tracked inputFieldNumbers = A([]);
  @tracked TableDropDownnames = ["true", "false"];
  @tracked inputValues = {};
  @tracked inputvalueobj = [];
  names = ['BD', 'USA', 'UK', 'CHINA', 'ENG', 'IND', 'PK'];
  // names = ['true', 'false'];
  @tracked isloading = true;
  @tracked isLoadingPOST;
  @tracked items;

  @tracked TableDropDownnames = [true, false];


  inventoryTypeColumns = [
    {
      column_name: 'SL',
      column_property: 'id',
    },
    {
      column_name: 'type',
      column_property: 'category_type',
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

    const inventoryType = this.store.findAll('inventory/inventory-category-type');
    inventoryType.then(data => {
      let inventoryTypeObjects = data.map((element) => {
        return element
      })
      this.items = data;
      if (data) {
        this.isloading = !this.isloading;
      }
    })
  }



  // multiple select
  @action
  handlemultipleSelection(item, value) {
    console.log(value);
    console.log(item);
    // without the array coz it becomes two array!
    set(item, 'country', value);
  }


  @action handleEdit(item) {
    console.log('item', item);
    set(item, 'isEdit', true)
  }

  @action handleCancel(item) {
    set(item, 'isEdit', false);
    item.rollbackAttributes()
  }


  // 
  @action handleSave(item) {
    console.log(item.country);
    // set(item, 'country', [item.country]);

    if (item.category_type == '' || item.country == '') {
      alert('Input field can not be empty');
    } else {
      set(item, 'isEdit', false);
      // if country is changed
      // set(item, 'country', item.country);
      console.log(item);
      item.save();
    }
    // item.country = [item.country];
    // set(item, 'isEdit', false);
    // item.save();
  }


  @action
  handlestatus(item, event) {
    item.active_status = event.target.value;
  }



  @action
  handleStatus(item) {
    console.log(item.active_status);
    set(item, 'active_status', !item.active_status);
    item.save();
  }


  // for power select dropdown ***

  @action
  handleStatusChange(item, event) {
    console.log('dropdown changed item', item);
    console.log('value of dropdown', event.target.value);
    set(item, 'active_status', !event.target.value)
  }


  @action
  handleInputType(inv_type, event) {
    console.log(event.target.value);
    console.log('type', inv_type);
  }



  //   @action handleCancel(item) {
  //     set(item, 'isEdit', false);
  //     item.rollbackAttributes()
  //   }


  //   @action handleSave(item) {
  //     // console.log('sfsjfsf', item);
  //     set(item, 'isEdit', false);
  //     item.save();
  //   }


  // to track selected status


  // @action
  // HandleStatus(item, value) {
  //   console.log(item, value);
  //   set(item, 'has_tables', value);
  //   console.log(item, value);
  // }



  // input fields
  @action
  handleInputChange() {
    console.log('inputchange', this.inputFieldNumbers);

    // // set(item, item.type, event.target.value);
    // // console.log('item', item);

    // console.log('key', key);
    // this.inputValues[key] = event.target.value;
    // console.log(this.inputValues);
  }



  @action
  handleDeleteInputField(item) {
    console.log(item);
    this.inputFieldNumbers.removeObject(item);
  }



  // + add new Inventory to the table
  @action
  handleAddInventory() {
    console.log(this.inputFieldNumbers);
    // validation
    const lastObject = this.inputFieldNumbers[this.inputFieldNumbers.length - 1];

    // to check if the input field has data.
    if (this.inputFieldNumbers.length == 0 || !Object.values(lastObject).some(value => value === null || value.length === 0)) {
      console.log('inserted');
      this.inputFieldNumbers.pushObject({ 'type': null, 'country': [] });
    } else {
      if (Object.values(lastObject).some(value => value === null || value === '' || value.length === 0)) {
        console.log('not inserted, alert!');
        alert('insert data');
      }
    }
  }



  // HandleSave
  @action
  async HandleSave() {
    // console.log(this.inputFieldNumbers);

    const lastObj = this.inputFieldNumbers[this.inputFieldNumbers.length - 1];

    if (this.inputFieldNumbers.length === 1) {
      if (this.inputFieldNumbers[0].type === null && this.inputFieldNumbers[0].country.length === 0 || this.inputFieldNumbers[0].type !== null && this.inputFieldNumbers[0].country.length === 0 || this.inputFieldNumbers[0].type === null && this.inputFieldNumbers[0].country.length !== 0) {
        alert("Please insert data");
        return
      }
    } else {
      console.log(lastObj.country.length);
      if (lastObj.type === null && lastObj.country.length !== 0 || lastObj.type !== null && lastObj.country.length === 0) {
        alert("Please insert data");
        return
      }
    }

    //  to remove the last extra obj, if last obj type country both are null
    if (lastObj.type === null && lastObj.country.length === 0) {
      this.inputFieldNumbers.removeObject(lastObj);
      // console.log("Removed object:", lastObj);
    }

    // finally post
    this.isLoadingPOST = true;
    const newInventoryType = await this.store.createRecord('inventory/inventory-category-type',
      {
        inventory_category_type: this.inputFieldNumbers.map((singleObj) => ({
          category_type: singleObj.type,
          // description: singleObj.description,
          country: singleObj.country,
        }))
      },
    );
    newInventoryType.save().then((savedInventory) => {
      // The record has been saved successfully
      // console.log(savedInventory);
      this.isLoadingPOST = false;
      this.inputFieldNumbers = A([]);
    })
      .catch((error) => {
        console.error('Error saving inventory:', error);
      });
  }
}




// const lastObject = this.inputFieldNumbers[this.inputFieldNumbers.length - 1];

// if (this.inputFieldNumbers.any(obj => obj.type === null)) {
//   alert('no type cant be null')
// }

// // if first obj type is null then return or if any of the inputfilednumbers type is null return
// if (this.inputFieldNumbers.length == 1 && this.inputFieldNumbers[0].type == null || this.inputFieldNumbers.any(obj => obj.type === null)) {
//   alert('insert data');
//   return
// }

// if (this.inputFieldNumbers.length == 0 || this.inputFieldNumbers == undefined) {
//   alert('insert input field data');
//   return
// } else {
//   if (lastObject.inv_type == null) {
//     this.inputFieldNumbers.removeObject(lastObject)
//   }
//   this.isLoadingPOST = true;
//   const newInventoryType = await this.store.createRecord('inventory/inventory-category-type',
//     {
//       inventory_category_type: this.inputFieldNumbers.map((singleObj) => ({
//         category_type: singleObj.type,
//         // description: singleObj.description,
//         country: [singleObj.country],
//       }))
//     },
//   );
//   newInventoryType.save().then((savedInventory) => {
//     // The record has been saved successfully
//     console.log(savedInventory);
//     this.isLoadingPOST = false;
//     this.inputFieldNumbers = A([]);
//   })
//     .catch((error) => {
//       console.error('Error saving inventory:', error);
//     });
// }


// 'inventory/inventory-category-type',
//   {
//     inventory_category_type: [
//       {
//         category_type: this.inputValues.type,
//         country: [this.inputValues.country],
//         // "created_by": {
//         //     "id": "...",
//         //     "name": "hhh",
//         //     "desg": "ttt"
//         // }
//       },
//     ],
//   },


//   //   // if ( this.isLoadingPOST == false) {
//   //   //   // blank the field
//   //   //   this.inputFieldNumbers = A([]);
//   //   // }

//   //   // console.log(this.inputValues);
//   //   // let isMissingProperty = false;
//   //   // // if no field has data then there will be no keys in that obj
//   //   // if (Object.keys(this.inputValues).length === 0) {
//   //   //     alert('Input values are empty!');
//   //   //     return;
//   //   // } else {
//   //   //     // prothom jodi kono field e data na dei tahole shetay blank save hobe
//   //   //     // Iterate over the keys of ModalTableHeaders
//   //   //     this.ModalTableHeaders.forEach((header) => {
//   //   //         // Iterate over the keys of the header object
//   //   //         Object.keys(header).forEach((key) => {
//   //   //             // Check if the key exists in inputValues
//   //   //             if (!this.inputValues.hasOwnProperty(key)) {
//   //   //                 // If the key is missing, add it to inputValues with a value of null
//   //   //                 isMissingProperty = true;
//   //   //             }
//   //   //         });
//   //   //     });
//   //   // }
//   //   // // inputvalueobj represent multiple values.
//   //   // if (!isMissingProperty) {
//   //   //     // if multiple value is existed.
//   //   //     if (this.inputvalueobj.length > 0) {
//   //   //         console.log('multiple saved inputvalueobj', this.inputvalueobj);
//   //   //         this.inputvalueobj.forEach((singleObj) => {
//   //   //             this.ModalTableValue.push(singleObj);
//   //   //         });
//   //   //         // multiple post ***
//   //   //         // TODO: response e shob data pabo shei response k abar modaltable value te set kore dibo
//   //   //         const newInventoryType = this.store.createRecord(
//   //   //             'inventory/inventory-type',
//   //   //             {
//   //   //                 inventory_types: this.inputvalueobj.map((singleObj) => ({
//   //   //                     // id: null, // Assuming you want to set the ID to null for new records
//   //   //                     inv_type: singleObj.type,
//   //   //                     description: singleObj.description,
//   //   //                     // has_tables: singleObj.has_tables,
//   //   //                 }))
//   //   //             },
//   //   //         );
//   //   //         console.log(newInventoryType);
//   //   //         newInventoryType
//   //   //             .save()
//   //   //             .then((savedInventory) => {
//   //   //                 // The record has been saved successfully
//   //   //                 // savedInventory is the JSON api response we get from the beckend server
//   //   //                 console.log('savedInventory:', savedInventory);
//   //   //                 this.typeCount = this.store.peekAll('inventory/inventory-type');
//   //   //                 this.ModalTableValue = this.ModalTableValue;
//   //   //             })
//   //   //             .catch((error) => {
//   //   //                 // Handle the error in case of failure
//   //   //                 console.error('Error saving inventory:', error);
//   //   //             });
//   //   //         this.ModalTableValue = this.ModalTableValue;

//   //   //     } else {
//   //   //         console.log('no missing, single save');
//   //   //         // if single value is existed and then save clicked.
//   //   //         // Create a copy of this.inputValues (to avoid the issue of object references in js),last r tar karone onno gulao update hoye jay
//   //   //         console.log('inputValues which needs to be push to the modaltableValue', this.inputValues,);
//   //   //         let inputValuesCopy = Object.assign({}, this.inputValues);
//   //   //         this.ModalTableValue.push(inputValuesCopy);
//   //   //         this.ModalTableValue = this.ModalTableValue;
//   //   //         // Push the copy into this.ModalTableValue
//   //   //         // TODO: response e shob data pabo shei response k abar modaltable value te set kore dibo
//   //   //         const newInventoryType = this.store.createRecord(
//   //   //             'inventory/inventory-type',
//   //   //             {
//   //   //                 inventory_types: [
//   //   //                     {
//   //   //                         inv_type: this.inputValues.type,
//   //   //                         description: this.inputValues.description,
//   //   //                         // "has_tables": this.inputValues.status,
//   //   //                         // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
//   //   //                     },
//   //   //                 ],
//   //   //             },
//   //   //         );
//   //   //         // console.log(newInventoryType);
//   //   //         newInventoryType
//   //   //             .save()
//   //   //             .then((savedInventory) => {
//   //   //                 // The record has been saved successfully
//   //   //                 // savedInventory is the JSON api response we get from the beckend server
//   //   //                 console.log('savedInventory:', savedInventory);
//   //   //                 // this.typeCount = this.store.peekAll('inventory/inventory-type');
//   //   //                 // console.log(this.inputValuesCopy.type);
//   //   //                 // this.typeCount.forEach(element => {
//   //   //                 //   if (element.inv_type == this.inputValuesCopy.type) {
//   //   //                 //     console.log(element);
//   //   //                 //   }
//   //   //                 // });
//   //   //                 // console.log('sfjssfsfd', this.store.peekAll('inventory/inventory-type'));
//   //   //                 this.ModalTableValue = this.ModalTableValue;
//   //   //             })
//   //   //             .catch((error) => {
//   //   //                 // Handle the error in case of failure
//   //   //                 console.error('Error saving inventory:', error);
//   //   //             });
//   //   //         this.ModalTableValue = this.ModalTableValue

//   //   //         // }

//   //   //         // // POST Inventory Catagory type
//   //   //         // else if (this.ModalHeader == 'Catagory type') {
//   //   //         //   console.log('Inventory Category type');
//   //   //         //   // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
//   //   //         //   const newInventoryCatagoryType = this.store.createRecord(
//   //   //         //     'inventory/inventory-category-type',
//   //   //         //     {
//   //   //         //       inventory_category_type: [
//   //   //         //         {
//   //   //         //           category_type: this.inputValues.type,
//   //   //         //           country: [this.inputValues.country],
//   //   //         //           // "created_by": {
//   //   //         //           //     "id": "...",
//   //   //         //           //     "name": "hhh",
//   //   //         //           //     "desg": "ttt"
//   //   //         //           // }
//   //   //         //         },
//   //   //         //       ],
//   //   //         //     },
//   //   //         //   );
//   //   //         //   console.log(newInventoryCatagoryType);
//   //   //         //   newInventoryCatagoryType
//   //   //         //     .save()
//   //   //         //     .then((savedInventory) => {
//   //   //         //       // The record has been saved successfully
//   //   //         //       // savedInventory is the JSON api response we get from the beckend server
//   //   //         //       console.log('savedInventory:', savedInventory);
//   //   //         //     })
//   //   //         //     .catch((error) => {
//   //   //         //       // Handle the error in case of failure
//   //   //         //       console.error('Error saving inventory:', error);
//   //   //         //     });
//   //   //         // }

//   //   //         // // POST Inventory Catagory
//   //   //         // else if (this.ModalHeader == 'Catagory') {
//   //   //         //   // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
//   //   //         //   const newInventoryCatagory = this.store.createRecord(
//   //   //         //     'inventory/inventory-catagory',
//   //   //         //     {
//   //   //         //       inventory_storage_type: [
//   //   //         //         {
//   //   //         //           inv_type: this.inputValues.type,
//   //   //         //           description: this.inputValues.des,
//   //   //         //           country: this.inputValues.country,
//   //   //         //           // "active_status": this.inputValues.status,
//   //   //         //           categories: this.inputValues.categories,
//   //   //         //           catagory_types: this.inputValues.c.types,
//   //   //         //           parent_categories: this.inputValues.parent_categories,
//   //   //         //           inventory_types: this.inputValues.inventory_types,
//   //   //         //           countries: this.inputValues.countries,
//   //   //         //           // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
//   //   //         //         },
//   //   //         //       ],
//   //   //         //     },
//   //   //         //   );
//   //   //         //   console.log(newInventoryCatagory);
//   //   //         //   newInventoryCatagory
//   //   //         //     .save()
//   //   //         //     .then((savedInventory) => {
//   //   //         //       // The record has been saved successfully
//   //   //         //       // savedInventory is the JSON api response we get from the beckend server
//   //   //         //       console.log('savedInventory:', savedInventory);
//   //   //         //     })
//   //   //         //     .catch((error) => {
//   //   //         //       // Handle the error in case of failure
//   //   //         //       console.error('Error saving inventory:', error);
//   //   //         //     });
//   //   //         // }

//   //   //         // // POST Storage type
//   //   //         // else if (this.ModalHeader == 'Storage type') {
//   //   //         //   // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
//   //   //         //   const newInventoryStorageType = this.store.createRecord(
//   //   //         //     'inventory/storage-type',
//   //   //         //     {
//   //   //         //       storage_types: [
//   //   //         //         {
//   //   //         //           storage_type: this.inputValues.type,
//   //   //         //           description: this.inputValues.description,
//   //   //         //           // "created_by": { "id": "...", "name": "hhh", "desg": "ttt" }
//   //   //         //         },
//   //   //         //       ],
//   //   //         //     },
//   //   //         //   );
//   //   //         //   console.log(newInventoryStorageType);
//   //   //         //   newInventoryStorageType
//   //   //         //     .save()
//   //   //         //     .then((savedInventory) => {
//   //   //         //       // The record has been saved successfully
//   //   //         //       // savedInventory is the JSON api response we get from the beckend server
//   //   //         //       console.log('savedInventory:', savedInventory);
//   //   //         //     })
//   //   //         //     .catch((error) => {
//   //   //         //       // Handle the error in case of failure
//   //   //         //       console.error('Error saving inventory:', error);
//   //   //         //     });
//   //   //         // }

//   //   //         // // POST Allocation type
//   //   //         // else if (this.ModalHeader == 'Allocation type') {
//   //   //         //   // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
//   //   //         //   const newAllocationType = this.store.createRecord(
//   //   //         //     'inventory/allocation-type',
//   //   //         //     {
//   //   //         //       allocation_types: [
//   //   //         //         {
//   //   //         //           alloc_type: this.inputValues.type,
//   //   //         //           description: this.inputValues.description,
//   //   //         //           // "active_status": this.inputValues.status,
//   //   //         //           // "country": this.inputValues.description,
//   //   //         //           // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
//   //   //         //         },
//   //   //         //       ],
//   //   //         //     },
//   //   //         //   );
//   //   //         //   console.log(newAllocationType);
//   //   //         //   newAllocationType
//   //   //         //     .save()
//   //   //         //     .then((savedInventory) => {
//   //   //         //       // The record has been saved successfully
//   //   //         //       // savedInventory is the JSON api response we get from the beckend server
//   //   //         //       console.log('savedInventory:', savedInventory);
//   //   //         //     })
//   //   //         //     .catch((error) => {
//   //   //         //       // Handle the error in case of failure
//   //   //         //       console.error('Error saving inventory:', error);
//   //   //         //     });
//   //   //         // }

//   //   //         // // POST Unit of Measure
//   //   //         // else if (this.ModalHeader == 'Unit Measure') {
//   //   //         //   // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
//   //   //         //   const newUnitMeasure = this.store.createRecord(
//   //   //         //     'inventory/unit-of-measure',
//   //   //         //     {
//   //   //         //       unit_of_measure: [
//   //   //         //         {
//   //   //         //           measure_type: this.inputValues.type,
//   //   //         //           short: this.inputValues.shorts,
//   //   //         //           // "active_status": this.inputValues.status,
//   //   //         //           // "country": this.inputValues.description,
//   //   //         //           // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
//   //   //         //         },
//   //   //         //       ],
//   //   //         //     },
//   //   //         //   );
//   //   //         //   console.log(newUnitMeasure);
//   //   //         //   newUnitMeasure
//   //   //         //     .save()
//   //   //         //     .then((savedInventory) => {
//   //   //         //       // The record has been saved successfully
//   //   //         //       // savedInventory is the JSON api response we get from the beckend server
//   //   //         //       console.log('savedInventory:', savedInventory);
//   //   //         //     })
//   //   //         //     .catch((error) => {
//   //   //         //       // Handle the error in case of failure
//   //   //         //       console.error('Error saving inventory:', error);
//   //   //         //     });
//   //   //         // } else {
//   //   //         //   console.log('none');
//   //   //         // }
//   //   //         // else if ('this.ModalHeader == 'Inventory Category') { }
//   //   //         // else if ('this.ModalHeader == 'Storage type') { }
//   //   //         // else if ('this.ModalHeader == 'Allocation type') { }
//   //   //         // else if ('this.ModalHeader == 'Unit of Measure') { }
//   //   //     }
//   //   // } else {
//   //   //     console.log('missing');
//   //   //     alert('Fill all the input fields');
//   //   //     return;
//   //   // }

//   //   // // *** to blank the input fields. atar value guloke null korlei input field khali hoye jabe, XXX
//   //   // this.inputValues = {};
//   //   // this.inputvalueobj = [];
//   //   // this.selectedStatus = null;
//   //   // // // Create a new object with keys from ModalTableHeaders and null values
//   //   // const newObj = {};
//   //   // Object.keys(this.ModalTableHeaders[0]).forEach((key) => {
//   //   //     newObj[key] = null;
//   //   // });
//   //   // console.log(newObj);
//   //   // // Assign the new object to inputFieldNumbers
//   //   // this.inputFieldNumbers = [newObj];
//   //   // // this.inputFieldNumbers = [{ "type": null, "description": null, "status": null }];
//   //   // console.log(this.ModalTableValue);
//   // }
// }



