import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

// multiple e save dile post korte hobe
// TODO: handleSave e response e shob data pabo shei response k abar modaltable value te set kore dibo
// tableStatus dropdoun na mile, active dile pay na amon

export default class InventoryInventoryTableComponent extends Component {
    @service store;

    @tracked keysName = ['type', 'description'];

    // to store inputfileds
    @tracked inputFieldNumbers = A([{ 'type': null, 'description': null }]);
    // input values
    @tracked inputValues = {};
    // create inventory
    // @tracked keysName;
    @tracked isActive = false;
    // dropdown value
    names = ['active', 'inactive'];
    @tracked selectedStatus = 'status';
    // to track multiple input value and keys obj.
    @tracked inputvalueobj = [];
    // active and inactive values from selected dropdown 
    @tracked statusValues = '';
    @tracked statusList = [];



    @tracked switch = false; 

    constructor() {
        super(...arguments);
    }


    // @action
    // handleInputType(event) {
    //     console.log(event.target.value);
    // }


    // to track selected status
    @action
    HandleStatus(item, value) {
        console.log(item, value);
        // this.statusList.push(value);
        // this.selectedStatus = '';
        // this.selectedStatus = value;

        set(item, 'status', value);

        let key = 'status';
        // to take true false value instead of active n inactive
        if (value == 'active') {
            this.inputValues[key] = true;
            console.log(this.inputValues);
        } else {
            let key = 'status';
            this.inputValues[key] = false;
            console.log(this.inputValues);
        }


        // arekta property toyri hobe ai key status nam e, input value active inactive diye.
        // console.log('inputvalueobj', this.inputvalueobj);
        if (this.inputvalueobj.length > 0) {
            let inputValuesCopy = Object.assign({}, this.inputValues);
            // Push the copy into this.ModalTableValue
            this.inputvalueobj.push(inputValuesCopy);
            // make changes to the UI
            this.inputvalueobj = this.inputvalueobj;
            console.log('inputvalueobj', this.inputvalueobj);
        }

        // // Iterate over each object in the array
        // this.inputFieldNumbers.forEach(obj => {
        //     // Set the status property of each object to the value from newObj
        //     obj.status = this.inputValues.status;
        // });
        // console.log(this.inputFieldNumbers);

        // console.log(this.inputValues.status);
        // this.inputFieldNumbers = this.inputFieldNumbers;
    }



    // input fields
    @action
    handleInputChange(key, event) {
        event.preventDefault();

        // console.log(item, item.type, event.target.value);

        // set(item, item.type, event.target.value);
        // console.log('item', item);

        console.log('key', key);
        this.inputValues[key] = event.target.value;
        console.log(this.inputValues);
    }



    @action
    handleDeleteInputField(item) {
        // const index = this.inputFieldNumbers.indexOf(item);
        // if (index > -1) {
        //     this.inputFieldNumbers.splice(index, 1);
        // }
        // this.inputFieldNumbers = this.inputFieldNumbers;
        // console.log(this.inputFieldNumbers);

        // if (this.inputFieldNumbers.length == 0) {
        //     this.inputValues = {};
        //     this.inputvalueobj = [];
        // }
        console.log(item);
        this.inputFieldNumbers.removeObject(item);
    }



    // + add new Inventory to the table
    @action
    handleAddInventory() {

        // console.log(this.inputValues);
        // console.log(Object.keys(this.inputValues).length);
        // if (Object.keys(this.inputValues).length != 3) {
        //     alert('insert data');
        //     return
        // }

        // console.log(this.inputFieldNumbers);
        // this.inputFieldNumbers.push({ 'type': '', 'description': '', "status": '' });
        // this.inputFieldNumbers = this.inputFieldNumbers;


        // Check if all values are null, show a alert
        // const allNull = Object.values(this.inputValues).every(value => value === null);
        // console.log(allNull);
        // if (allNull && this.inputFieldNumbers.length > 0) {
        //     console.log('inputValues', this.inputValues);
        //     alert("add input values!");
        //     return
        // }
        // if (this.inputvalueobj.length < 1 && Object.keys(this.inputValues).length > 0) {
        //     console.log('inputvalueobj is 0');
        //     let inputValuesCopy = Object.assign({}, this.inputValues);
        //     // Push the copy into this.ModalTableValue
        //     this.inputvalueobj.push(inputValuesCopy);
        //     // make changes to the UI
        //     this.inputvalueobj = this.inputvalueobj;
        //     console.log(this.inputvalueobj);
        //     // tarpar save korle push korbo main modaltablevalue te.
        // }


        // // this.inputFieldNumbers.pushObject({ 'type': '', 'description': '', "status": '' });

        // if (this.inputFieldNumbers.length == 0) {
        //     console.log('no input field existed');
        //     console.log('this.keysName', this.keysName);
        //     // TODO: ager obj/input filed khali thakle ai new create hobe nah 
        //     // Create an object with null values for each key
        //     const newObj = this.keysName.reduce((acc, key) => {
        //         acc[key] = '';
        //         return acc;
        //     }, {});
        //     console.log(newObj);
        //     // Push the new object into the inputFieldNumbers array, to show the blank input field.
        //     this.inputFieldNumbers.push(newObj);
        //     this.inputFieldNumbers = this.inputFieldNumbers;
        //     console.log('inputValues', this.inputValues);
        //     console.log('inputFieldNumbers', this.inputFieldNumbers);
        //     return
        // }
        // this.keysName = Object.keys(this.inputValues);
        // console.log('keysName', this.keysName);
        // // console.log(this.item);


        // // Create an object with null values for each key
        // const newObj = this.keysName.reduce((acc, key) => {
        //     acc[key] = '';
        //     return acc;
        // }, {});
        // console.log(newObj);
        // // Push the new object into the ModalTableValue array
        // this.inputFieldNumbers.push(newObj);
        // this.inputFieldNumbers = this.inputFieldNumbers;

        // // if last input field is blank then dont create another blank one.
        // this.inputValues = {};
    }



    // HandleSave
    @action
    HandleSave() {
        if (this.inputvalueobj.length > 0) {
            const newInventoryType = this.store.createRecord(
                'inventory/inventory-type',
                {
                    inventory_types: this.inputvalueobj.map((singleObj) => ({
                        // id: null, // Assuming you want to set the ID to null for new records
                        inv_type: singleObj.type,
                        description: singleObj.description,
                        // has_tables: singleObj.has_tables,
                    }))
                },
            );
            newInventoryType.save().then((savedInventory) => {
                // The record has been saved successfully
                console.log(savedInventory);
                this.typeCount = this.store.peekAll('inventory/inventory-type');
            })
                .catch((error) => {
                    console.error('Error saving inventory:', error);
                });
            // newInventoryType.save()
        } else {
            const newInventoryType = this.store.createRecord(
                'inventory/inventory-type',
                {
                    inventory_types: [
                        {
                            inv_type: this.inputValues.type,
                            description: this.inputValues.description,
                        },
                    ],
                },
            );
            newInventoryType.save().then((savedInventory) => {
                // The record has been saved successfully
                console.log(savedInventory);
                this.typeCount = this.store.peekAll('inventory/inventory-type');
            })
                .catch((error) => {
                    console.error('Error saving inventory:', error);
                });
        }



        // blank the field
        this.inputFieldNumbers = [{ "type": null, "description": null, "status": null }];



        // console.log(this.inputValues);
        // let isMissingProperty = false;
        // // if no field has data then there will be no keys in that obj
        // if (Object.keys(this.inputValues).length === 0) {
        //     alert('Input values are empty!');
        //     return;
        // } else {
        //     // prothom jodi kono field e data na dei tahole shetay blank save hobe
        //     // Iterate over the keys of ModalTableHeaders
        //     this.ModalTableHeaders.forEach((header) => {
        //         // Iterate over the keys of the header object
        //         Object.keys(header).forEach((key) => {
        //             // Check if the key exists in inputValues
        //             if (!this.inputValues.hasOwnProperty(key)) {
        //                 // If the key is missing, add it to inputValues with a value of null
        //                 isMissingProperty = true;
        //             }
        //         });
        //     });
        // }
        // // inputvalueobj represent multiple values.
        // if (!isMissingProperty) {
        //     // if multiple value is existed.
        //     if (this.inputvalueobj.length > 0) {
        //         console.log('multiple saved inputvalueobj', this.inputvalueobj);
        //         this.inputvalueobj.forEach((singleObj) => {
        //             this.ModalTableValue.push(singleObj);
        //         });
        //         // multiple post ***
        //         // TODO: response e shob data pabo shei response k abar modaltable value te set kore dibo
        //         const newInventoryType = this.store.createRecord(
        //             'inventory/inventory-type',
        //             {
        //                 inventory_types: this.inputvalueobj.map((singleObj) => ({
        //                     // id: null, // Assuming you want to set the ID to null for new records
        //                     inv_type: singleObj.type,
        //                     description: singleObj.description,
        //                     // has_tables: singleObj.has_tables,
        //                 }))
        //             },
        //         );
        //         console.log(newInventoryType);
        //         newInventoryType
        //             .save()
        //             .then((savedInventory) => {
        //                 // The record has been saved successfully
        //                 // savedInventory is the JSON api response we get from the beckend server
        //                 console.log('savedInventory:', savedInventory);
        //                 this.typeCount = this.store.peekAll('inventory/inventory-type');
        //                 this.ModalTableValue = this.ModalTableValue;
        //             })
        //             .catch((error) => {
        //                 // Handle the error in case of failure
        //                 console.error('Error saving inventory:', error);
        //             });
        //         this.ModalTableValue = this.ModalTableValue;

        //     } else {
        //         console.log('no missing, single save');
        //         // if single value is existed and then save clicked.
        //         // Create a copy of this.inputValues (to avoid the issue of object references in js),last r tar karone onno gulao update hoye jay
        //         console.log('inputValues which needs to be push to the modaltableValue', this.inputValues,);
        //         let inputValuesCopy = Object.assign({}, this.inputValues);
        //         this.ModalTableValue.push(inputValuesCopy);
        //         this.ModalTableValue = this.ModalTableValue;
        //         // Push the copy into this.ModalTableValue
        //         // TODO: response e shob data pabo shei response k abar modaltable value te set kore dibo
        //         const newInventoryType = this.store.createRecord(
        //             'inventory/inventory-type',
        //             {
        //                 inventory_types: [
        //                     {
        //                         inv_type: this.inputValues.type,
        //                         description: this.inputValues.description,
        //                         // "has_tables": this.inputValues.status,
        //                         // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
        //                     },
        //                 ],
        //             },
        //         );
        //         // console.log(newInventoryType);
        //         newInventoryType
        //             .save()
        //             .then((savedInventory) => {
        //                 // The record has been saved successfully
        //                 // savedInventory is the JSON api response we get from the beckend server
        //                 console.log('savedInventory:', savedInventory);
        //                 // this.typeCount = this.store.peekAll('inventory/inventory-type');
        //                 // console.log(this.inputValuesCopy.type);
        //                 // this.typeCount.forEach(element => {
        //                 //   if (element.inv_type == this.inputValuesCopy.type) {
        //                 //     console.log(element);
        //                 //   }
        //                 // });
        //                 // console.log('sfjssfsfd', this.store.peekAll('inventory/inventory-type'));
        //                 this.ModalTableValue = this.ModalTableValue;
        //             })
        //             .catch((error) => {
        //                 // Handle the error in case of failure
        //                 console.error('Error saving inventory:', error);
        //             });
        //         this.ModalTableValue = this.ModalTableValue

        //         // }

        //         // // POST Inventory Catagory type
        //         // else if (this.ModalHeader == 'Catagory type') {
        //         //   console.log('Inventory Category type');
        //         //   // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
        //         //   const newInventoryCatagoryType = this.store.createRecord(
        //         //     'inventory/inventory-category-type',
        //         //     {
        //         //       inventory_category_type: [
        //         //         {
        //         //           category_type: this.inputValues.type,
        //         //           country: [this.inputValues.country],
        //         //           // "created_by": {
        //         //           //     "id": "...",
        //         //           //     "name": "hhh",
        //         //           //     "desg": "ttt"
        //         //           // }
        //         //         },
        //         //       ],
        //         //     },
        //         //   );
        //         //   console.log(newInventoryCatagoryType);
        //         //   newInventoryCatagoryType
        //         //     .save()
        //         //     .then((savedInventory) => {
        //         //       // The record has been saved successfully
        //         //       // savedInventory is the JSON api response we get from the beckend server
        //         //       console.log('savedInventory:', savedInventory);
        //         //     })
        //         //     .catch((error) => {
        //         //       // Handle the error in case of failure
        //         //       console.error('Error saving inventory:', error);
        //         //     });
        //         // }

        //         // // POST Inventory Catagory
        //         // else if (this.ModalHeader == 'Catagory') {
        //         //   // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
        //         //   const newInventoryCatagory = this.store.createRecord(
        //         //     'inventory/inventory-catagory',
        //         //     {
        //         //       inventory_storage_type: [
        //         //         {
        //         //           inv_type: this.inputValues.type,
        //         //           description: this.inputValues.des,
        //         //           country: this.inputValues.country,
        //         //           // "active_status": this.inputValues.status,
        //         //           categories: this.inputValues.categories,
        //         //           catagory_types: this.inputValues.c.types,
        //         //           parent_categories: this.inputValues.parent_categories,
        //         //           inventory_types: this.inputValues.inventory_types,
        //         //           countries: this.inputValues.countries,
        //         //           // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
        //         //         },
        //         //       ],
        //         //     },
        //         //   );
        //         //   console.log(newInventoryCatagory);
        //         //   newInventoryCatagory
        //         //     .save()
        //         //     .then((savedInventory) => {
        //         //       // The record has been saved successfully
        //         //       // savedInventory is the JSON api response we get from the beckend server
        //         //       console.log('savedInventory:', savedInventory);
        //         //     })
        //         //     .catch((error) => {
        //         //       // Handle the error in case of failure
        //         //       console.error('Error saving inventory:', error);
        //         //     });
        //         // }

        //         // // POST Storage type
        //         // else if (this.ModalHeader == 'Storage type') {
        //         //   // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
        //         //   const newInventoryStorageType = this.store.createRecord(
        //         //     'inventory/storage-type',
        //         //     {
        //         //       storage_types: [
        //         //         {
        //         //           storage_type: this.inputValues.type,
        //         //           description: this.inputValues.description,
        //         //           // "created_by": { "id": "...", "name": "hhh", "desg": "ttt" }
        //         //         },
        //         //       ],
        //         //     },
        //         //   );
        //         //   console.log(newInventoryStorageType);
        //         //   newInventoryStorageType
        //         //     .save()
        //         //     .then((savedInventory) => {
        //         //       // The record has been saved successfully
        //         //       // savedInventory is the JSON api response we get from the beckend server
        //         //       console.log('savedInventory:', savedInventory);
        //         //     })
        //         //     .catch((error) => {
        //         //       // Handle the error in case of failure
        //         //       console.error('Error saving inventory:', error);
        //         //     });
        //         // }

        //         // // POST Allocation type
        //         // else if (this.ModalHeader == 'Allocation type') {
        //         //   // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
        //         //   const newAllocationType = this.store.createRecord(
        //         //     'inventory/allocation-type',
        //         //     {
        //         //       allocation_types: [
        //         //         {
        //         //           alloc_type: this.inputValues.type,
        //         //           description: this.inputValues.description,
        //         //           // "active_status": this.inputValues.status,
        //         //           // "country": this.inputValues.description,
        //         //           // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
        //         //         },
        //         //       ],
        //         //     },
        //         //   );
        //         //   console.log(newAllocationType);
        //         //   newAllocationType
        //         //     .save()
        //         //     .then((savedInventory) => {
        //         //       // The record has been saved successfully
        //         //       // savedInventory is the JSON api response we get from the beckend server
        //         //       console.log('savedInventory:', savedInventory);
        //         //     })
        //         //     .catch((error) => {
        //         //       // Handle the error in case of failure
        //         //       console.error('Error saving inventory:', error);
        //         //     });
        //         // }

        //         // // POST Unit of Measure
        //         // else if (this.ModalHeader == 'Unit Measure') {
        //         //   // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
        //         //   const newUnitMeasure = this.store.createRecord(
        //         //     'inventory/unit-of-measure',
        //         //     {
        //         //       unit_of_measure: [
        //         //         {
        //         //           measure_type: this.inputValues.type,
        //         //           short: this.inputValues.shorts,
        //         //           // "active_status": this.inputValues.status,
        //         //           // "country": this.inputValues.description,
        //         //           // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
        //         //         },
        //         //       ],
        //         //     },
        //         //   );
        //         //   console.log(newUnitMeasure);
        //         //   newUnitMeasure
        //         //     .save()
        //         //     .then((savedInventory) => {
        //         //       // The record has been saved successfully
        //         //       // savedInventory is the JSON api response we get from the beckend server
        //         //       console.log('savedInventory:', savedInventory);
        //         //     })
        //         //     .catch((error) => {
        //         //       // Handle the error in case of failure
        //         //       console.error('Error saving inventory:', error);
        //         //     });
        //         // } else {
        //         //   console.log('none');
        //         // }
        //         // else if ('this.ModalHeader == 'Inventory Category') { }
        //         // else if ('this.ModalHeader == 'Storage type') { }
        //         // else if ('this.ModalHeader == 'Allocation type') { }
        //         // else if ('this.ModalHeader == 'Unit of Measure') { }
        //     }
        // } else {
        //     console.log('missing');
        //     alert('Fill all the input fields');
        //     return;
        // }

        // // *** to blank the input fields. atar value guloke null korlei input field khali hoye jabe, XXX
        // this.inputValues = {};
        // this.inputvalueobj = [];
        // this.selectedStatus = null;
        // // // Create a new object with keys from ModalTableHeaders and null values
        // const newObj = {};
        // Object.keys(this.ModalTableHeaders[0]).forEach((key) => {
        //     newObj[key] = null;
        // });
        // console.log(newObj);
        // // Assign the new object to inputFieldNumbers
        // this.inputFieldNumbers = [newObj];
        // // this.inputFieldNumbers = [{ "type": null, "description": null, "status": null }];
        // console.log(this.ModalTableValue);
    }






}
