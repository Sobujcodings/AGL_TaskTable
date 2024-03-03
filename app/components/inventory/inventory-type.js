import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class InventoryInventoryTypeComponent extends Component {
    @service store;

    // modal size
    @tracked ModalSize;
    // track table values --> header contains table name and ModalTableValue contains the key and value pairs;
    @tracked ModalHeader;
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




    // open modal function for inventorries
    @action
    openInventoryModel() {
        $('#warehouseModalCenter').modal('show');
    }

    @action
    openCreateInventoryModal() {
        $('#openCreateInventory').modal('show');
    }

    // open modal for create inventory
    CloseCreateInventoryModal() {
        $('#openCreateInventory').modal('hide');
    }





    // input fields
    @action
    handleInputChange(key, event) {
        // TODO: jei value shei key ta padhte hobe!
        console.log('key', key);
        this.inputValues[key] = event.target.value;
        console.log(this.inputValues);
    }



    @action
    HandleStatus(value) {
        this.statusList.push(value);
        // console.log(this.statusList);

        let key = 'status';
        this.selectedStatus = '';
        this.selectedStatus = value;

        // arekta property toyri hobe ai key status nam e, input value active inactive diye.
        this.inputValues[key] = value;

        // this.ModalTableHeaders.push(this.inputValues[key] = value);

        // inputvalueobj e age theke value thakle tokhon dropdown select r shomoy e push kore dibo
        // multiple inputs. inputvalueobj na thakle push korbo, if multiple input found push to that
        console.log(this.inputValues);
        console.log(this.inputFieldNumbers);
        console.log(this.inputvalueobj);
        // console.log('inputvalueobj', this.inputvalueobj);
        if (this.inputvalueobj.length > 0) {
            let inputValuesCopy = Object.assign({}, this.inputValues);
            // Push the copy into this.ModalTableValue
            this.inputvalueobj.push(inputValuesCopy);
            // make changes to the UI
            this.inputvalueobj = this.inputvalueobj;
            console.log('inputvalueobj', this.inputvalueobj);
        }


        // Iterate over each object in the array
        this.inputFieldNumbers.forEach(obj => {
            // Set the status property of each object to the value from newObj
            obj.status = this.inputValues.status;
        });
        console.log(this.inputFieldNumbers);

        // arekta array te shob gula rekhe inputfield k update kore dibo segulo diye.
        // this.inputFieldNumbers = [];
        // this.inputFieldNumbers = [...this.inputFieldNumbers, this.inputValues];
        // console.log('inputFieldNumbers...', this.inputFieldNumbers);



        // set the dropdown values from inputvalueobj (multiple obj) (to store all active inactive values)
        // this.statusValues = [];
        // this.inputvalueobj.forEach(singleObj => {
        //     console.log(singleObj);
        //     console.log('singleObj.status', singleObj.status);
        //     this.statusValues.push(singleObj.status);
        //     console.log(this.statusValues);
        //     // this.statusValues = this.statusValues;
        // })

        // // console.log(this.inputFieldNumbers);
        // // Iterate over both arrays and update the status property
        // for (let i = 0; i < this.inputFieldNumbers.length; i++) {
        //     this.inputFieldNumbers[i].status = this.statusValues[i];
        // }
        // this.inputFieldNumbers = this.inputFieldNumbers;
        // // Now arrayOfObjects will have the status property updated
        // console.log(this.inputFieldNumbers);


        // // TODO:
        // console.log(this.selectedStatus);
        // this.statusValues.forEach(element => {
        //     this.selectedStatus = element;
        // });
        console.log(this.inputValues.status);
        this.inputFieldNumbers = this.inputFieldNumbers;

    }




    // + add new Inventory to the table
    @action
    handleAddInventory() {

        // Check if all values are null, show a alert
        // jokhon input field thakbe/shob null hobe tokhon alert dibo
        console.log('inputFieldNumbers', this.inputFieldNumbers);
        console.log(this.inputValues);
        // this.inputValues = {};
        const allNull = Object.values(this.inputValues).every(value => value === null);
        console.log(allNull);
        if (allNull && this.inputFieldNumbers.length > 0) {
            console.log('inputValues', this.inputValues);
            alert("add input values!");
            return
        }




        // jokhon shob delete kore abar add korbo tokhon invalueobj e kichu add hobe  nah
        // // multiple inputs/inputvalueobj na thakle push korbo akta, if multiple input found push to that.
        // inputvalaue obj thakle hobe nah, thakle upore handlestatus e push hoye jabe.
        console.log(this.inputValues);

        console.log(this.inputvalueobj);
        if (this.inputvalueobj.length < 1 && Object.keys(this.inputValues).length > 0) {
            console.log('inputvalueobj is 0');
            let inputValuesCopy = Object.assign({}, this.inputValues);
            // Push the copy into this.ModalTableValue
            this.inputvalueobj.push(inputValuesCopy);
            // make changes to the UI
            this.inputvalueobj = this.inputvalueobj;
            console.log(this.inputvalueobj);
            // tarpar save korle push korbo main modaltablevalue te.
        }




        // TODO: jokhon inputfield shob khali thakbe/shob input field delete kore dibo tokhon abar add korte chaile khali input filed add hobe as before like button click n open model 
        // shudhu jokhon shob khali kore dibo input filed tokhon ai part tuk kaj korbe abar akta khali input create kore key name onuyai totota
        // console.log(this.ModalTableHeaders);
        // console.log(this.inputValues);
        // console.log('inputFieldNumbers', this.inputFieldNumbers);
        if (this.inputFieldNumbers.length == 0) {
            console.log('no input field existed');
            console.log('this.keysName', this.keysName);
            // TODO: ager obj/input filed khali thakle ai new create hobe nah 
            // Create an object with null values for each key
            const newObj = this.keysName.reduce((acc, key) => {
                acc[key] = null;
                return acc;
            }, {});
            console.log(newObj);
            // Push the new object into the inputFieldNumbers array, to show the blank input field.
            this.inputFieldNumbers.push(newObj);
            this.inputFieldNumbers = this.inputFieldNumbers;
            console.log('inputValues', this.inputValues);
            console.log('inputFieldNumbers', this.inputFieldNumbers);
            return
        }



        // ai bakituk hobe normal add korar jonno shob data insert korar por normal add
        // TODO:***ekhane input value te jotogula ache totogula niye toyri hocche kintu ekhane shob header value niye toyri hobe, input akta kom thakleo sheta considerable na
        // to create the blank input field again, by taking the keys to know how many keys/input field will be there.
        // ai [0] dile kaw r prothom e 2ta input filed create korte parbe nah, modaltable e data thaklei/save korlei then porer ta add hobe.
        this.keysName = Object.keys(this.inputValues);
        console.log('keysName', this.keysName);
        // console.log(this.item);

        // TODO: ager obj/input filed khali thakle ai new create hobe nah 
        // Create an object with null values for each key
        const newObj = this.keysName.reduce((acc, key) => {
            acc[key] = null;
            return acc;
        }, {});
        console.log(newObj);
        // Push the new object into the ModalTableValue array
        this.inputFieldNumbers.push(newObj);
        this.inputFieldNumbers = this.inputFieldNumbers;


        // if last input field is blank then dont create another blank one.
        this.inputValues = {};
        // modaltdable e arekta obj push kore dibo jodi shei shob input gulay data entry thake
        // add korle arekta null obj ekhane push hobe

        // console.log(this.inputFieldNumbers);
    }



    @action
    handleDeleteInputField(item) {
        // console.log(item);

        const index = this.inputFieldNumbers.indexOf(item);
        if (index > -1) {
            this.inputFieldNumbers.splice(index, 1);
        }
        this.inputFieldNumbers = this.inputFieldNumbers;
        console.log(this.inputFieldNumbers);


        if (this.inputFieldNumbers.length == 0) {
            this.inputValues = {};
            this.inputvalueobj = [];
        }
    }


    // HandleSave
    @action
    HandleSave() {
        console.log(this.inputValues);

        let isMissingProperty = false;
        // if no field has data then there will be no keys in that obj
        if (Object.keys(this.inputValues).length === 0) {
            alert('Input values are empty!');
            return
        } else {
            // prothom jodi kono field e data na dei tahole shetay blank save hobe
            // Iterate over the keys of ModalTableHeaders
            this.ModalTableHeaders.forEach(header => {
                // Iterate over the keys of the header object
                Object.keys(header).forEach(key => {
                    // Check if the key exists in inputValues
                    if (!this.inputValues.hasOwnProperty(key)) {
                        // If the key is missing, add it to inputValues with a value of null
                        isMissingProperty = true;
                    }
                });
            });
        }

        // if no property is missing then push all the input fields to the modaltabel to show in
        // inputvalueobj represent multiple values.
        if (!isMissingProperty) {
            // if multiple value is existed.
            if (this.inputvalueobj.length > 0) {
                console.log('multiple saved inputvalueobj', this.inputvalueobj);
                this.inputvalueobj.forEach(singleObj => {
                    this.ModalTableValue.push(singleObj);
                    // API TODO: POST (ai multiple object guloke amra post/create kore dibo)
                    // 
                });
                this.ModalTableValue = this.ModalTableValue;
            } else {
                console.log('no missing, single save');
                // if single value is existed and then save clicked.
                // Create a copy of this.inputValues (to avoid the issue of object references in js),last r tar karone onno gulao update hoye jay
                let inputValuesCopy = Object.assign({}, this.inputValues);
                // Push the copy into this.ModalTableValue
                this.ModalTableValue.push(inputValuesCopy);
                // make changes to the UI
                this.ModalTableValue = this.ModalTableValue;
                // console.log(this.ModalTableValue);
                // console.log(this.inputValues.type);
                // console.log(this.ModalHeader);



                // alada alada condition dite hobe jei modal ta open ache shetar jonno alada kore fetch korte hobe
                // karon api endpoint dynamically korleo post data bhinno hobe tai
                // wrapped korle payload paccehe nah wrapped na korle server e jacehe nah 
                if (this.ModalHeader == 'Inventory type') {
                    // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
                    let hasTable;
                    if (this.inputValues.status == 'active') {
                        hasTable = true;
                    } else {
                        hasTable = true;
                    }
                    const newInventoryType = this.store.createRecord('inventory/inventory-type', {
                        inventory_types:
                            [
                                {
                                    "inv_type": this.inputValues.type,
                                    "description": this.inputValues.description,
                                    "has_tables": hasTable,
                                    // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
                                }
                            ]
                    });
                    console.log(newInventoryType);
                    newInventoryType
                        .save()
                        .then((savedInventory) => {
                            // The record has been saved successfully
                            // savedInventory is the JSON api response we get from the beckend server
                            console.log('savedInventory:', savedInventory);
                        })
                        .catch((error) => {
                            // Handle the error in case of failure
                            console.error('Error saving inventory:', error);
                        });
                }


                // POST Inventory Catagory type
                else if (this.ModalHeader == 'Inventory Category type') {
                    // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
                    let hasTable;
                    if (this.inputValues.status == 'active') {
                        hasTable = true;
                    } else {
                        hasTable = true;
                    }
                    const newInventoryCatagoryType = this.store.createRecord('inventory/inventory-catagory-type', {
                        inventory_storage_type:
                            [
                                {
                                    "inv_type": this.inputValues.type,
                                    "country": this.inputValues.country,
                                    "has_tables": hasTable,
                                    // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
                                }
                            ]
                    });
                    console.log(newInventoryCatagoryType);
                    newInventoryCatagoryType
                        .save()
                        .then((savedInventory) => {
                            // The record has been saved successfully
                            // savedInventory is the JSON api response we get from the beckend server
                            console.log('savedInventory:', savedInventory);
                        })
                        .catch((error) => {
                            // Handle the error in case of failure
                            console.error('Error saving inventory:', error);
                        });
                }


                // POST Inventory Catagory
                else if (this.ModalHeader == 'Inventory Category') {
                    // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
                    let hasTable;
                    if (this.inputValues.status == 'active') {
                        hasTable = true;
                    } else {
                        hasTable = true;
                    }
                    const newInventoryCatagory = this.store.createRecord('inventory/inventory-catagory', {
                        inventory_storage_type:
                            [
                                {
                                    "inv_type": this.inputValues.type,
                                    "description": this.inputValues.des,
                                    "country": this.inputValues.country,
                                    "has_tables": hasTable,
                                    "categories": this.inputValues.categories,
                                    "catagory_types": this.inputValues.c.types,
                                    "parent_categories": this.inputValues.parent_categories,
                                    "inventory_types": this.inputValues.inventory_types,
                                    "countries": this.inputValues.countries,
                                    // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
                                }
                            ]
                    });
                    console.log(newInventoryCatagory);
                    newInventoryCatagory
                        .save()
                        .then((savedInventory) => {
                            // The record has been saved successfully
                            // savedInventory is the JSON api response we get from the beckend server
                            console.log('savedInventory:', savedInventory);
                        })
                        .catch((error) => {
                            // Handle the error in case of failure
                            console.error('Error saving inventory:', error);
                        });
                }


                // POST Storage type
                else if (this.ModalHeader == 'Storage type') {
                    // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
                    let hasTable;
                    if (this.inputValues.status == 'active') {
                        hasTable = true;
                    } else {
                        hasTable = true;
                    }
                    const newInventoryCatagoryType = this.store.createRecord('inventory/storage-type', {
                        inventory_storage_type:
                            [
                                {
                                    "inv_type": this.inputValues.type,
                                    "has_tables": hasTable,
                                    // "country": this.inputValues.description,
                                    // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
                                }
                            ]
                    });
                    console.log(newInventoryCatagoryType);
                    newInventoryCatagoryType
                        .save()
                        .then((savedInventory) => {
                            // The record has been saved successfully
                            // savedInventory is the JSON api response we get from the beckend server
                            console.log('savedInventory:', savedInventory);
                        })
                        .catch((error) => {
                            // Handle the error in case of failure
                            console.error('Error saving inventory:', error);
                        });
                }


                // POST Allocation type
                else if (this.ModalHeader == 'Allocation type') {
                    // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
                    let hasTable;
                    if (this.inputValues.status == 'active') {
                        hasTable = true;
                    } else {
                        hasTable = true;
                    }
                    const newAllocationType = this.store.createRecord('inventory/Allocation-type', {
                        inventory_Allocation_type:
                            [
                                {
                                    "inv_type": this.inputValues.type,
                                    "description": this.inputValues.description,
                                    "has_tables": hasTable,
                                    // "country": this.inputValues.description,
                                    // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
                                }
                            ]
                    });
                    console.log(newAllocationType);
                    newAllocationType
                        .save()
                        .then((savedInventory) => {
                            // The record has been saved successfully
                            // savedInventory is the JSON api response we get from the beckend server
                            console.log('savedInventory:', savedInventory);
                        })
                        .catch((error) => {
                            // Handle the error in case of failure
                            console.error('Error saving inventory:', error);
                        });
                }


                // POST Unit of Measure
                else if (this.ModalHeader == 'Unit of Measure') {
                    // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
                    let hasTable;
                    if (this.inputValues.status == 'active') {
                        hasTable = true;
                    } else {
                        hasTable = true;
                    }
                    const newUnitMeasure = this.store.createRecord('inventory/Unit-of-Measure', {
                        inventory_Unit_of_Measure:
                            [
                                {
                                    "inv_type": this.inputValues.type,
                                    "shorts": this.inputValues.description,
                                    "has_tables": hasTable,
                                    // "country": this.inputValues.description,
                                    // "created_by": { "id": "asdfas", "name": "hsdfashh", "desg": "tsdfasdftt" }
                                }
                            ]
                    });
                    console.log(newUnitMeasure);
                    newUnitMeasure
                        .save()
                        .then((savedInventory) => {
                            // The record has been saved successfully
                            // savedInventory is the JSON api response we get from the beckend server
                            console.log('savedInventory:', savedInventory);
                        })
                        .catch((error) => {
                            // Handle the error in case of failure
                            console.error('Error saving inventory:', error);
                        });
                }

                else { console.log('none') }
                // else if ('this.ModalHeader == 'Inventory Category') { }
                // else if ('this.ModalHeader == 'Storage type') { }
                // else if ('this.ModalHeader == 'Allocation type') { }
                // else if ('this.ModalHeader == 'Unit of Measure') { }
            }

        }
        else {
            console.log("missing");
            alert("Fill all the input fields");
            return
        }


        // this contains what keys we need 
        // console.log('ModalTableHeaders', this.ModalTableHeaders);

        // *** to blank the input fields. atar value guloke null korlei input field khali hoye jabe, 
        this.inputValues = {};
        this.inputvalueobj = [];

        this.selectedStatus = null;
        // Create a new object with keys from ModalTableHeaders and null values
        const newObj = {};
        Object.keys(this.ModalTableHeaders[0]).forEach(key => {
            newObj[key] = null;
        });
        console.log(newObj);
        // Assign the new object to inputFieldNumbers
        this.inputFieldNumbers = [newObj];
        // this.inputFieldNumbers = [{ "type": null, "description": null, "status": null }];

        // showing full table
        // this.CreateInvetoryFullTable = this.ModalTableValue;
    }



    // handle modal table edit
    @action
    handleActive(tableName, item, status) {
        console.log(status);
        console.log(tableName);
        console.log(item);
        console.log(this.ModalTableValue);

        // jodi status already true thake tahole false korbo abar, and false thakle true korbo
        // Assuming this.ModalTableValue is an Ember tracked array
        // Find the index of the item you want to update
        const index = this.ModalTableValue.indexOf(item);
        // console.log(index);

        // console.log(item.status);

        if (item.status == true) {
            // Make a copy of the item to avoid mutating the original item, make the oppsite status of the item. from true <-> false
            const updatedItem = { ...item, status: false };
            // Replace the item at the found index with the updated item
            this.ModalTableValue.replace(index, 1, [updatedItem]);
            // this.isActive = false;
        }
        else {
            const updatedItem = { ...item, status: true };
            // Replace the item at the found index with the updated item
            this.ModalTableValue.replace(index, 1, [updatedItem]);
            // this.isActive = true;
        }


        // PUT/PATCH API TODO: Jei item post hoyece shetake put/patch kore update kore dite hobe from true to false/false to true;
        // change to active -> inactive/ true -> false;
        console.log(index);
        console.log(this.ModalTableValue[index]);

    }





    // inventory type func
    @action
    async HandleInventoryType(title) {

        this.inputFieldNumbers = [];
        // this.ModalTableValue = A([]);
        // ager shob input khali kore dibo
        this.inputValues = {};
        // set modal table title
        this.ModalHeader = title;



        setTimeout(async () => {
            // fetch get api 
            // Set isLoading to false when the data fetching is complete
            // this.isLoading = true;

            try {
                // const inventoryType = await this.store.findAll('inventory/inventory-type');!

                // Define the URL of the API you want to fetch
                const apiUrl = 'https://mocki.io/v1/b984e185-8f3a-4e18-8e74-c33795b1ad82';

                // Make a GET request using fetch
                fetch(apiUrl)
                    .then(response => {
                        // Check if the response is successful
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        // Parse the JSON response
                        return response.json();
                    })
                    .then(data => {
                        // Handle the JSON data
                        console.log(data.data);
                        this.inventorytypedata = data.data;
                        console.log(this.inventorytypedata);
                        let inventoryTypeObjects = this.inventorytypedata.map(element => {
                            return {
                                // ID: element.id,
                                id: element.inv_type_id,
                                type: element.inv_type,
                                description: element.description,
                                status: element.active_status
                            };
                        });
                        // console.log(inventoryTypeObjects);
                        this.ModalTableValue = A(inventoryTypeObjects);
                        // console.log(this.ModalTableValue);
                        this.ModalTableValue = this.ModalTableValue;
                        console.log(this.ModalTableValue);
                        // this.ModalTableValue = A([]);

                    })
                    .catch(error => {
                        // Handle any errors that occurred during the fetch
                        console.error('Fetch error:', error);
                    });


                // console.log(inventoryType);
                // set it to the tracted property.
                // this.inventorytypedata = inventoryType; !
                // which data we want store here as a obj, then push it to the modaltablevalue to show it in the modal table.
                // {type: 'sdf', description: 'asdfasdf', status: 'inactive'}

                // console.log(this.inventorytypedata);
                // let inventoryTypeObjects = this.inventorytypedata.map(element => {
                //     return {
                //         ID: element.id,
                //         type: element.inv_type,
                //         description: element.description,
                //         status: element.active_status
                //     };
                // });
                // // console.log(inventoryTypeObjects);
                // this.ModalTableValue = A(inventoryTypeObjects);
                // // console.log(this.ModalTableValue);
                // this.ModalTableValue = this.ModalTableValue;
                // Process the fetched data
            } catch (error) {
                console.error('Error fetching category types:', error);
                // this.openModal();
                this.openInventoryModel();
            }
            finally {
                // this.isLoading = false; // Set isLoading to false when the data fetching is complete
            }
        }, 1000);


        // setting input values
        // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        this.ModalTableHeaders = [];
        this.ModalTableHeaders.push({ "type": null, "description": null, "status": 'inactive' });
        // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.)
        this.keysName = Object.keys({ "type": null, "description": null });
        console.log('this.keysName', this.keysName);
        // TODO: ager obj/input filed khali thakle ai new create hobe nah 
        // Create an object with null values for each key
        const newObj = this.keysName.reduce((acc, key) => {
            acc[key] = null;
            return acc;
        }, {});
        console.log(newObj);
        // Push the new object into the inputFieldNumbers array, to show the blank input field.
        this.inputFieldNumbers.push(newObj);
        this.inputFieldNumbers = this.inputFieldNumbers;


        // this.ModalTableValue = this.ModalTableValue;

        this.ModalTableValue = A([]);
        // value set korar por now open the modal by calling this.openModal
        this.openInventoryModel();
    }







    @action
    handleUpdate(ModalHeader, item) {
        console.log(ModalHeader);
        console.log(item);


        // item.isClicked = true;
        if (item.isClicked == true) {
            console.log(item);
            console.log('ache');
            // find the index
            const index = this.ModalTableValue.indexOf(item);
            // Make a copy of the item to avoid mutating the original item, make the oppsite status of the item. from true <-> false
            const updatedItem = { ...item, isClicked: false };
            // Replace the item at the found index with the updated item
            this.ModalTableValue.replace(index, 1, [updatedItem]);
            this.ModalTableValue = this.ModalTableValue;
            console.log(this.ModalTableValue);
        } else {
            console.log('nai');
            // find the index
            const index = this.ModalTableValue.indexOf(item);
            // Make a copy of the item to avoid mutating the original item, make the oppsite status of the item. from true <-> false
            const updatedItem = { ...item, isClicked: true };
            // Replace the item at the found index with the updated item
            this.ModalTableValue.replace(index, 1, [updatedItem]);
            this.ModalTableValue = this.ModalTableValue;
            console.log(this.ModalTableValue);
        }
    }



    @action
    handleInputUpdate(item, key, event) {
        console.log(item);
        console.log(event.target.value);
        this.inputValues[key] = event.target.value;

        // atai tokhon updated value akhn value kei kon item change korbo sheta dhore shetake change kore dibo
        console.log(this.inputValues);
        console.log(this.ModalTableValue);

        // PUT/PATCH API TODO: ai this.inputvalue theke value gulo niye put/patch korbo.  {type: 'RMa', description: 'Raw Materialsd', status: 'truef'}

    }



    @action
    handleInputValueSave(item) {
        console.log(item);

        console.log(this.inputValues);
        console.log(this.ModalTableValue);


        console.log(this.ModalTableHeaders);
        // console.log(Object.keys(this.ModalTableHeaders));
        this.ModalTableHeaders.forEach(element => {
            console.log(Object.keys(element));
        });


        // store.findRecord('post', 1).then(function (post) {
        //     post.title; // => "Rails is Omakase"

        //     post.title = 'A new post';

        //     post.save(); // => PATCH to '/posts/1'
        // });




        // PATCH Request
        // jetar jonno save dichi shei modal r nam hobe

        // this.store.findRecord(this.ModalHeader, 1).then(function (post) {

        //     post.type; // => "Rails is Omakase"
        //     post.description = 'A new post';


        //     post.save(); // => PATCH to '/posts/1'
        // });
    }



}
