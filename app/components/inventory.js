import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

// jeta input dicchi shei key r value hishebe jabe (akhn age pore input dile serail change hoye jacche) jetai prothom e dei sheta type e chole jacche porer des then active tai jetar jonno dicchi shetar jonno boshate hobe value (// TODO: jei value shei key ta padhte hobe!)
// TODO: baki POST r kaj gulo o shesh korte hobe handleSave e
// bar bar alada kore post na kore akta function e parameter diye padhiye dite pari ja ja lagbe then shei data post hobe! (karon sinlge alada double alada post korte hobe)
// select dropdown tao thik korte hobe (select korle shob same hoye jacche active/inactive)
// Inventory 6tay edit(patch) r kaj gulo shesh korte hobe with patch request to API
// create inventory r edit + api r kaj gulo o shesh korte hobe
// shesh r input input field thakle/khali thakle kono value na thakleo inputfieldnumber/blank input field add korte dibo

export default class InventoryComponent extends Component {
    @tracked typeCount;

    @service store;

    @tracked isLoading = false;


    // tracked for api data (this tracted will store data from api)
    @tracked inventorytypedata;
    @tracked inventoryCatagorytypedata;
    @tracked inventoryStorageTypes;
    @tracked inventoryAlocationTypes;
    @tracked inventoryUnitMeasure;



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



    // tract create Inventory input field.
    @tracked sku = '';
    @tracked name = '';
    @tracked description = '';
    @tracked fullDescription = '';
    @tracked manufacturingDate = '';
    @tracked expiryDate = '';
    @tracked storageType = '';
    @tracked inventoryCategory = '';
    @tracked categoryType = '';
    @tracked inventoryType = '';
    @tracked allocationType = '';
    @tracked unitOfMeasure = '';
    @tracked status = '';
    @tracked selectedstatus = 'Status';

    @tracked FormArray = A([]);
    @tracked firstObjectKeys;
    // @tracked firstObjectKeys = A(['sku', 'Name', 'Des', 'FullDes', 'Manufacture', 'Expire', 'StorageType', 'Catagory', 'CategoryType', 'InventoryType', 'AllocationType', 'UnitMeasure', 'status']);
    @tracked CreateInventoryEditItem;

    // Define other form fields similarly
    // modal for create inventory
    @tracked isModalOpenCreateInvent = false;
    @action
    isModalOpenCreateInventory() {
        this.isModalOpenCreateInvent = true;
    }
    @action
    closeModalCreateInventory() {
        this.isModalOpenCreateInvent = false;
    }




    // create inventory input submit form
    @action
    submitForm(event) {
        // console.log('form');
        event.preventDefault(); // Prevent default form submission

        // const randomNumber = 

        // Retrieve values from tracked properties, tracted property is assosiated with the input fields.
        const formData = {
            // id: 
            sku: this.sku,
            Name: this.name,
            Des: this.description,
            FullDes: this.fullDescription,
            Manufacture: this.manufacturingDate,
            Expire: this.expiryDate,
            StorageType: this.storageType,
            Catagory: this.inventoryCategory,
            CategoryType: this.categoryType,
            InventoryType: this.inventoryType,
            AllocationType: this.allocationType,
            UnitMeasure: this.unitOfMeasure,
            status: this.status
        };


        console.log(this.CreateInventoryEditItem);
        // if data found in tracked editItem  then replace that item with the updated input data.
        if (this.CreateInventoryEditItem != undefined) {
            console.log('create inventory item to be edited', this.CreateInventoryEditItem);


        } else {
            console.log('no edit new create');
            // push to form data to show this in the UI.
            this.FormArray.push(formData);
            // form data to contains all the data to post.
            this.FormArray = this.FormArray;
        }


        // get the keys from the formArray
        this.firstObjectKeys = Object.keys(this.FormArray[0]);
        console.log(this.firstObjectKeys);


        // Reset form fields if needed
        this.resetFormFields();


        // TODO: validation korte hobe, khali form save kora jabe nah/kon gula required shegulo chara submit kora jabe nah alert dibo return kore dibo

        // modal close hobe
        this.CloseCreateInventoryModal();

    }



    // Method to reset form fields
    resetFormFields() {
        // Reset tracked properties to empty strings
        this.sku = '';
        this.name = '';
        this.description = '';
        this.fullDescription = '';
        this.manufacturingDate = '';
        this.expiryDate = '';
        this.storageType = '';
        this.inventoryCategory = '';
        this.categoryType = '';
        this.inventoryType = '';
        this.allocationType = '';
        this.unitOfMeasure = '';
        this.state = '';
        this.status = '';
        this.selectedstatus = 'Status';
    }

    @action
    fullDescriptionFunc(event) {
        this.fullDescription = event.target.value;
    }

    @action
    statusFunc(value) {
        this.status = value;
        this.selectedstatus = value;
    }



    // modal size
    @tracked ModalSize;
    // track table values --> header contains table name and ModalTableValue contains the key and value pairs;
    @tracked ModalHeader;
    @tracked ModalTableHeaders = [];
    @tracked ModalTableValue = A([]);
    // full table ta ekhane theke dekhabo jokhon edit e click korbo tokhon modaltablevalue te set korbo and modal show korbo.
    // @tracked CreateInvetoryFullTable = A([{
    //     "sku": "SKU123",
    //     "name": "A",
    //     "description": "Lorem ipsum ",
    //     "full des.": "Product A",
    //     "manufac. date": "2022-01-15",
    //     "expire date": "2023-01-15",
    //     "storage type": "Dry storage",
    //     "inventory category": "Electronics",
    //     "category type": "Consumer Electronics",
    //     "inventory type": "Finished Goods",
    //     "allocation type": "Standard",
    //     "unit of measure": "Pieces",
    //     "status": false
    // }, {
    //     "sku": "SKU456",
    //     "name": "B",
    //     "description": "Nulla eu",
    //     "full des.": "Product B",
    //     "manufac. date": "2022-03-20",
    //     "expire date": "2023-03-20",
    //     "storage type": "Refrigerated",
    //     "inventory category": "Food",
    //     "category type": "Dairy Products",
    //     "inventory type": "Raw Materials",
    //     "allocation type": "Bulk",
    //     "unit of measure": "Kilograms",
    //     "status": false
    // },
    // {
    //     "sku": "SKU789",
    //     "name": "C",
    //     "description": "Sed tempor",
    //     "full des.": "Product C",
    //     "manufac. date": "2021-12-05",
    //     "expire date": "2023-06-30",
    //     "storage type": "storage",
    //     "inventory category": "Pharma",
    //     "category type": "Medications",
    //     "inventory type": "Work in Progress",
    //     "allocation type": "Custom",
    //     "unit of measure": "Boxes",
    //     "status": false
    // }
    // ]);

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



    constructor() {
        super(...arguments);
        // console.log(this.FormArray);
        // const InventoryType = this.store.findAll('inventory/inventory-type');
        // console.log(typeof InventoryType);
        // this.typeCount = this.store.peekAll('inventory/inventory-type');
        // this.loadData();
    }



    // create inventory get
    // async loadData() {
    //     try {
    //         const createInventory = await this.store.findAll('inventory/create-inventory');
    //         // Set the fetched storage types to the tracked property
    //         // this.inventoryStorageTypes = storageTypes;

    //         // Map the fetched data to the desired format
    //         let inventoryCategoryTypeObjects = createInventory.map(element => {
    //             return {
    //                 id: element.id,
    //                 type: element.storage_type,
    //                 description: element.description,
    //                 status: element.active_status
    //             };
    //         });

    //         // Set the mapped data to the ModalTableValue
    //         this.ModalTableValue = A(inventoryCategoryTypeObjects);
    //         console.log(this.ModalTableValue);
    //     } catch (error) {
    //         console.error('Error fetching category types:', error);
    //     }
    // }



    // input fields
    @action
    handleInputChange(key, event) {
        // TODO: jei value shei key ta padhte hobe!
        // console.log('key', key);

        console.log(this.ModalHeader);

        this.inputValues[key] = event.target.value;
        console.log(this.inputValues);


        // ekhane check korbo kon modal open korchi shei modal r ki ki key ache jeta hobe shetar jonno key r serial gulo maintain kore then shei serial inputvlaues data gulo shajabo age pore kore, default key diye dibo shei onujayi serial hobe
        if (this.ModalHeader == 'Inventory type') {
            console.log('inside inventory type');
            // hole ai sequence follow korbo
            // Define the desired key order
            const desiredKeyOrder = ['type', 'description', 'status'];
            // Create a new object with keys in the desired order
            const reorderedObject = {};
            desiredKeyOrder.forEach(key => {
                if (this.inputValues.hasOwnProperty(key)) {
                    reorderedObject[key] = this.inputValues[key];
                }
            });
            // Output the reordered object
            this.inputValues = reorderedObject;

        } else if (this.ModalHeader == 'Catagory type') {
            console.log('inside cataagory type');

            const desiredKeyOrder = ['type', 'country', 'status'];
            // Create a new object with keys in the desired order
            const reorderedObject = {};
            desiredKeyOrder.forEach(key => {
                if (this.inputValues.hasOwnProperty(key)) {
                    reorderedObject[key] = this.inputValues[key];
                }
            });
            // Output the reordered object
            this.inputValues = reorderedObject;
        }
        else if (this.ModalHeader == 'Catagory') {
            // { "categories": null, "C.types": null, "parent categories": null, "inventory types": null, "countries": null, "des.": null, "status": 'inactive' }
            const desiredKeyOrder = ['categories', 'C.types', 'parent categories', 'inventory types', 'countries', 'des', 'status',];
            // Create a new object with keys in the desired order
            const reorderedObject = {};
            desiredKeyOrder.forEach(key => {
                if (this.inputValues.hasOwnProperty(key)) {
                    reorderedObject[key] = this.inputValues[key];
                }
            });
            // Output the reordered object
            this.inputValues = reorderedObject;
        }
        else if (this.ModalHeader == 'Storage type') {

            // { "types": null, "status": 'inactive' }
            const desiredKeyOrder = ['type', 'description'];
            // Create a new object with keys in the desired order
            const reorderedObject = {};
            desiredKeyOrder.forEach(key => {
                if (this.inputValues.hasOwnProperty(key)) {
                    reorderedObject[key] = this.inputValues[key];
                }
            });
            // Output the reordered object
            this.inputValues = reorderedObject;
        }
        else if (this.ModalHeader == 'Allocation type') {
            const desiredKeyOrder = ['type', , 'status', 'description'];
            // Create a new object with keys in the desired order
            const reorderedObject = {};
            desiredKeyOrder.forEach(key => {
                if (this.inputValues.hasOwnProperty(key)) {
                    reorderedObject[key] = this.inputValues[key];
                }
            });
            // Output the reordered object
            this.inputValues = reorderedObject;
        }
        else if (this.ModalHeader == 'Unit Measure') {
            // { "types": null, "shorts": null, "status": 'inactive' }
            const desiredKeyOrder = ['type', 'shorts', 'status'];
            // Create a new object with keys in the desired order
            const reorderedObject = {};
            desiredKeyOrder.forEach(key => {
                if (this.inputValues.hasOwnProperty(key)) {
                    reorderedObject[key] = this.inputValues[key];
                }
            });
            // Output the reordered object
            this.inputValues = reorderedObject;
        }
        else {
            console.log('none');
        }
    }



    // to track selected status
    @action
    HandleStatus(event) {
        console.log(event.target.value);

        // this.statusList.push(event.target.value);
        // // console.log(this.statusList);

        let key = 'status';
        this.selectedStatus = '';

        let value;
        if (event.target.value == 'active') {
            value = true;
        }
        else {
            value = false;
        }

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

            // //
            // console.log(this.inputvalueobj);
            // this.inputFieldNumbers = this.inputvalueobj;
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

        // console.log(this.statusList);
        console.log(this.ModalTableValue);
    }


    @tracked inventoryType;
    // inventory type func
    @action
    async HandleInventoryType(title) {
        this.inventoryType = title;

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
                const inventoryType = await this.store.findAll('inventory/inventory-type');

                let inventoryTypeObjects = inventoryType.map(element => {
                    return {
                        // ID: element.id,
                        id: element.id,
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

        // value set korar por now open the modal by calling this.openModal
        this.openInventoryModel();
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
                console.log('inputValues which needs to be push to the modaltableValue', this.inputValues);
                let inputValuesCopy = Object.assign({}, this.inputValues);
                this.ModalTableValue.push(inputValuesCopy);
                this.ModalTableValue = this.ModalTableValue;
                // Push the copy into this.ModalTableValue
                // make changes to the UI
                // console.log(this.ModalTableValue);
                // console.log(this.inputValues.type);
                // console.log(this.ModalHeader);



                // alada alada condition dite hobe jei modal ta open ache shetar jonno alada kore fetch korte hobe
                // karon api endpoint dynamically korleo post data bhinno hobe tai
                // wrapped korle payload paccehe nah wrapped na korle server e jacehe nah 
                if (this.ModalHeader == 'Inventory type') {
                    // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
                    // let hasTable;
                    // if (this.inputValues.status == 'active') {
                    //     hasTable = true;
                    // } else {
                    //     hasTable = true;
                    // }
                    const newInventoryType = this.store.createRecord('inventory/inventory-type', {
                        inventory_types:
                            [
                                {
                                    "inv_type": this.inputValues.type,
                                    "description": this.inputValues.description,
                                    // "has_tables": this.inputValues.status,
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
                            this.typeCount = this.store.peekAll('inventory/inventory-type');
                        })
                        .catch((error) => {
                            // Handle the error in case of failure
                            console.error('Error saving inventory:', error);
                        });
                }


                // POST Inventory Catagory type
                else if (this.ModalHeader == 'Catagory type') {
                    console.log('Inventory Category type');
                    // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
                    const newInventoryCatagoryType = this.store.createRecord('inventory/inventory-category-type', {
                        inventory_category_type:
                            [
                                {
                                    "category_type": this.inputValues.type,
                                    "country": [this.inputValues.country],
                                    // "created_by": {
                                    //     "id": "...",
                                    //     "name": "hhh",
                                    //     "desg": "ttt"
                                    // }
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
                else if (this.ModalHeader == 'Catagory') {
                    // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
                    const newInventoryCatagory = this.store.createRecord('inventory/inventory-catagory', {
                        inventory_storage_type:
                            [
                                {
                                    "inv_type": this.inputValues.type,
                                    "description": this.inputValues.des,
                                    "country": this.inputValues.country,
                                    // "active_status": this.inputValues.status,
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
                    const newInventoryStorageType = this.store.createRecord('inventory/storage-type', {
                        storage_types:
                            [
                                {
                                    "storage_type": this.inputValues.type,
                                    "description": this.inputValues.description,
                                    // "created_by": { "id": "...", "name": "hhh", "desg": "ttt" }
                                },
                            ]
                    });
                    console.log(newInventoryStorageType);
                    newInventoryStorageType
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
                    const newAllocationType = this.store.createRecord('inventory/allocation-type', {
                        allocation_types:
                            [
                                {
                                    "alloc_type": this.inputValues.type,
                                    "description": this.inputValues.description,
                                    // "active_status": this.inputValues.status,
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
                else if (this.ModalHeader == 'Unit Measure') {
                    // const dataToSend = [{ inv_type: this.inputValues.type, description: this.inputValues.description, active_status: this.inputValues.status }];
                    const newUnitMeasure = this.store.createRecord('inventory/unit-of-measure', {
                        "unit_of_measure":
                            [
                                {
                                    "measure_type": this.inputValues.type,
                                    "short": this.inputValues.shorts,
                                    // "active_status": this.inputValues.status,
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


        console.log(this.ModalTableValue);
    }




    // inventory Catagorytype func
    @action
    async HandleCatagorytype(title) {
        // 
        this.inputFieldNumbers = [];
        this.ModalTableValue = A([]);


        // ager shob input khali kore dibo
        this.inputValues = {};
        // setting table title
        this.ModalHeader = title;


        // to hit the api 2 second after opening the modal.
        setTimeout(async () => {
            // Set isLoading to false when the data fetching is complete
            // this.isLoading = true;

            // get api fetch
            try {
                const categoryTypes = await this.store.findAll('inventory/inventory-category-type');
                console.log(categoryTypes);
                // set it to the tracted property.
                this.inventoryCatagorytypedata = categoryTypes;
                // Process the fetched data
                // console.log(this.inventoryCatagorytypedata);
                // get and set value from the server,  obj that contains all the data that i need to show in the UI.
                let inventoryCatagoryTypeObjects = this.inventoryCatagorytypedata.map(element => {
                    return {
                        id: element.id,
                        type: element.category_type,
                        country: element.country,
                        status: element.active_status
                    };
                });
                // console.log(inventoryCatagoryTypeObjects);
                // set the desired obj to the modaltablevalue to show in the UI
                this.ModalTableValue = A(inventoryCatagoryTypeObjects);
                // this.ModalTableValue.push(inventoryTypeObjects);
                console.log(this.ModalTableValue);
            } catch (error) {
                console.error('Error fetching category types:', error);
                // this.isLoading = true;
            }
            // false hobei finally eshee
            finally {
                // this.isLoading = false; // Set isLoading to false when the data fetching is complete
            }
        }, 1000);





        // setting input values
        // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        this.ModalTableHeaders = A([]);
        this.ModalTableHeaders.push({ "type": null, "country": null, "status": 'inactive' });
        // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.)
        this.keysName = Object.keys({ "type": null, "country": null });
        console.log('keysName', this.keysName);
        // TODO: ager obj/input filed khali thakle ai new create hobe nah 
        // Create an object with null values for each key
        const newObj = this.keysName.reduce((acc, key) => {
            acc[key] = null;
            return acc;
        }, {});
        console.log(newObj);
        // Push the new object into the inputFieldNumbers array
        this.inputFieldNumbers.push(newObj);
        this.inputFieldNumbers = this.inputFieldNumbers;


        // value set korar por now open the modal by calling this.openModal
        // this.openModal();
        this.openInventoryModel();

    }



    // TODO: API Intregation!!
    // Catagory
    @action
    HandleCatagory(title) {
        this.inputFieldNumbers = [];
        this.ModalTableValue = A([]);


        // ager shob input khali kore dibo
        this.inputValues = {};
        // console.log('inventory catagory');

        // set modal table title
        this.ModalHeader = title;



        setTimeout(async () => {
            // this.isLoading = true;
            // fetch get api 
            try {
                const inventoryCatagory = await this.store.findAll('inventory/inventory-catagory');
                // set it to the tracted property.
                // this.inventoryStorageTypes = storgeType;
                // get and set value from the server,  obj that contains all the data that i need to show in the UI.(found from the server)
                let inventoryCatagoryTypeObjects = this.inventoryCatagory.map(element => {
                    return {
                        id: element.id,
                        type: element.storage_type,
                        description: element.description,
                        status: element.active_status
                    };
                });
                // set the desired obj to the modaltablevalue to show in the UI
                this.ModalTableValue = A(inventoryCatagoryTypeObjects);
                console.log(this.ModalTableValue);
                // Process the fetched data
            } catch (error) {
                console.error('Error fetching category types:', error);
            }
            finally {
                // this.isLoading = false; // Set isLoading to false when the data fetching is complete
            }
        }, 1000);




        // setting input values
        // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        this.ModalTableHeaders = A([]);
        this.ModalTableHeaders.push({ "categories": null, "C.types": null, "parent categories": null, "inventory types": null, "countries": null, "des.": null, "status": 'inactive' });
        // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.)
        this.keysName = Object.keys({ "categories": null, "C.types": null, "parent categories": null, "inventory types": null, "countries": null, "des.": null });

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


        // value set korar por now open the modal by calling this.openModal
        // this.openModal();
        this.openInventoryModel();
    }




    // Storage type
    @action
    async HandleStoragetype(title) {
        this.inputFieldNumbers = [];
        this.ModalTableValue = A([]);


        // ager shob input khali kore dibo
        this.inputValues = {};
        // console.log('Storagetype');

        // set modal table title
        this.ModalHeader = title;



        setTimeout(async () => {

            // this.isLoading = true;

            // fetch get api 
            try {
                const storgeType = await this.store.findAll('inventory/storage-type');
                // set it to the tracted property.
                this.inventoryStorageTypes = storgeType;
                // get and set value from the server,  obj that contains all the data that i need to show in the UI.(found from the server)
                let inventoryCatagoryTypeObjects = this.inventoryStorageTypes.map(element => {
                    return {
                        id: element.id,
                        type: element.storage_type,
                        description: element.description,
                        status: element.active_status
                    };
                });
                // set the desired obj to the modaltablevalue to show in the UI
                this.ModalTableValue = A(inventoryCatagoryTypeObjects);
                console.log(this.ModalTableValue);
                // Process the fetched data
            } catch (error) {
                console.error('Error fetching category types:', error);
            }
            finally {
                // this.isLoading = false; // Set isLoading to false when the data fetching is complete
            }
        }, 1000);



        // setting input values
        // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        this.ModalTableHeaders = A([]);
        this.ModalTableHeaders.push({ "type": null, "description": null, "status": 'inactive' });
        // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.) r active dropdown shob gulor jonnoi thakle
        this.keysName = Object.keys({ "type": null, "description": null });

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


        // value set korar por now open the modal by calling this.openModal
        // this.openModal();
        this.openInventoryModel();

    }




    // Alocation Type
    @action
    async HandleAlocationType(title) {
        this.inputFieldNumbers = [];
        this.ModalTableValue = A([]);


        // ager shob input khali kore dibo
        this.inputValues = {};
        // console.log('AlocationType');

        // set modal table title
        this.ModalHeader = title;



        setTimeout(async () => {

            // this.isLoading = true;
            // fetch get api 
            try {
                // Set isLoading to false when the data fetching is complete
                const AlocationType = await this.store.findAll('inventory/allocation-type');
                // set it to the tracted property.
                this.inventoryAlocationTypes = AlocationType;
                // get and set value from the server,  obj that contains all the data that i need to show in the UI.
                let inventoryCatagoryTypeObjects = this.inventoryAlocationTypes.map(element => {
                    return {
                        id: element.id,
                        type: element.alloc_type,
                        status: element.active_status,
                        description: element.description
                    };
                });
                // set the desired obj to the modaltablevalue to show in the UI
                this.ModalTableValue = A(inventoryCatagoryTypeObjects);
                console.log(this.ModalTableValue);
                // Process the fetched data
            } catch (error) {
                console.error('Error fetching category types:', error);
            }
            finally {
                // this.isLoading = false; // Set isLoading to false when the data fetching is complete
            }
        }, 1000);



        // setting input values
        // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        this.ModalTableHeaders = A([]);
        this.ModalTableHeaders.push({ "type": null, "status": 'inactive', "description": null, });
        // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.)
        this.keysName = Object.keys({ "type": null, "description": null });

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


        // value set korar por now open the modal by calling this.openModal
        // this.openModal();
        this.openInventoryModel();

    }



    //  Unit measure
    @action
    async HandleUnitMeasure(title) {
        this.inputFieldNumbers = [];
        this.ModalTableValue = A([]);
        // ager shob input khali kore dibo
        this.inputValues = {};
        // setting modaltable title
        this.ModalHeader = title;



        setTimeout(async () => {
            // this.isLoading = true;

            // fetch get api 
            try {
                const UnitMeasure = await this.store.findAll('inventory/unit-of-measure');
                // set it to the tracted property.
                this.inventoryUnitMeasure = UnitMeasure;
                // get and set value from the server,  obj that contains all the data that i need to show in the UI.
                let UnitMeasureObject = this.inventoryUnitMeasure.map(element => {
                    return {
                        id: element.id,
                        type: element.measure_type,
                        short: element.short,
                        status: element.active_status
                    };
                });
                // set the desired obj to the modaltablevalue to show in the UI
                this.ModalTableValue = A(UnitMeasureObject);
                console.log(this.ModalTableValue);
                // Process the fetched data
            } catch (error) {
                console.error('Error fetching category types:', error);
            }
            finally {
                // this.isLoading = false; // Set isLoading to false when the data fetching is complete
            }
        }, 1000);



        // setting input values
        // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        this.ModalTableHeaders = A([]);
        this.ModalTableHeaders.push({ "type": null, "shorts": null, "status": 'inactive' });
        // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.)
        this.keysName = Object.keys({ "type": null, "shorts": null });

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


        // value set korar por now open the modal by calling this.openModal
        // this.openModal();
        this.openInventoryModel();

    }



    // create inventory button, null value will be shown to the model bcoz null value is set to this.ModalTableValue;
    @action
    HandleCreateInventory(title) {
        // prothom ei ager shob khali kore nibo
        this.resetFormFields();

        // setting modaltable title
        this.ModalHeader = title;

        // value set korar por now open the modal by calling this.openModal
        this.openCreateInventoryModal();


        // // setting input values
        // // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        // this.ModalTableHeaders = A([]);
        // this.ModalTableHeaders.push({ "sku": null, "name": null, "descrip.": null, "fulldes.": null, "manufac. date": null, "expire date": null, "storage type": null, "inventory category": null, "category type": null, "inventory type": null, "allocation type": null, "unit of measure": null, "status": 'inactive' });
        // // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.)
        // this.keysName = Object.keys({
        //     "sku": null, "name": null, "descrip.": null, "fulldes.": null, "manufac. date": null, "expire date": null, "storage type": null, "inventory category": null, "category type": null, "inventory type": null, "allocation type": null, "unit of measure": null
        // });

        // // TODO: ager obj/input filed khali thakle ai new create hobe nah 
        // // Create an object with null values for each key
        // const newObj = this.keysName.reduce((acc, key) => {
        //     acc[key] = null;
        //     return acc;
        // }, {});
        // console.log(newObj);
        // // Push the new object into the ModalTableValue array
        // this.inputFieldNumbers.push(newObj);
        // this.inputFieldNumbers = this.inputFieldNumbers;



        // setting dynamic modal size by calculating max key value number of an object
        // let maxKeysCount = 0;
        // this.ModalTableValue.forEach(obj => {
        //     let keysCount = Object.keys(obj).length;
        //     if (keysCount > maxKeysCount) {
        //         maxKeysCount = keysCount;
        //     }
        // });
        // if (maxKeysCount > 6) {
        //     // make modal size to lg
        //     console.log('xxl');
        //     this.ModalSize = 'xl';
        // }
        // else if (maxKeysCount >= 2) {
        //     this.ModalSize = 'lg';
        // }
        // else {
        //     this.ModalSize = 'md';
        // }


        // value set korar por now open the modal by calling this.openModal, now modal contains this.ModalTableValue data;
        // this.openModal();
        // this.openInventoryModel();
    }



    // edit create inventory, this.modaltabevalue will contains with existed value, with key value pair exact value;
    @action
    HandleCreateInventoryEdit(title, item) {
        console.log(item);

        this.CreateInventoryEditItem = '';
        this.CreateInventoryEditItem = item;

        // item theke niye sheta set kore dibo existed input field e.
        this.sku = item.sku;
        this.name = item.Name;
        this.description = item.Des;
        this.fullDescription = item.FullDes;
        this.manufacturingDate = item.Manufacture;
        this.expiryDate = item.Expire;
        this.storageType = item.StorageType;
        this.inventoryCategory = item.Catagory;
        this.categoryType = item.CategoryType;
        this.inventoryType = item.InventoryType;
        this.allocationType = item.AllocationType;
        this.unitOfMeasure = item.UnitMeasure;
        this.selectedstatus = item.status
        // this.state = item.state;
        // this.status = item.Status;

        // then open the create table modal
        // this.isModalOpenCreateInventory()


        // // ager shob input khali kore dibo
        // this.inputValues = {};
        // // ai item ta k just modal e show korbo.
        // console.log(item);
        // // console.log('edit create inventory');
        // // console.log(title);

        // // setting modaltable title
        // this.ModalHeader = title;

        // // modaltablevalue will contains here with all the null values.
        // this.ModalTableValue = A([item]);

        // // setting dynamic modal size by calculating max key value number of an object
        // let maxKeysCount = 0;
        // this.ModalTableValue.forEach(obj => {
        //     let keysCount = Object.keys(obj).length;
        //     if (keysCount > maxKeysCount) {
        //         maxKeysCount = keysCount;
        //     }
        // });
        // if (maxKeysCount > 6) {
        //     // make modal size to lg
        //     console.log('xxl');
        //     this.ModalSize = 'xl';
        // }
        // else if (maxKeysCount >= 2) {
        //     this.ModalSize = 'lg';
        // }
        // else {
        //     this.ModalSize = 'md';
        // }


        // value set korar por now open the modal by calling this.openModal, now modal contains this.ModalTableValue data;
        // this.openModal();



        this.openCreateInventoryModal();

    }




    // delete inventory field
    @action
    handleDelete(item) {
        console.log(item);

        // item to delete, this item will be added after all data is deleted from the table 
        this.item = item;

        const index = this.ModalTableValue.indexOf(item);
        if (index > -1) {
            this.ModalTableValue.splice(index, 1);
        }
        this.ModalTableValue = this.ModalTableValue;


        // this.ModalTableValue = this.ModalTableValue.filter(element => element !== item);
        // console.log(this.ModalTableValue);

        // // // ai item amar whole item (modeltableValue) jetar sathe mile shetake delete korbo
        // const matchedobj = this.ModalTableValue.filter(element => element == item);
        // console.log(matchedobj);

        // this.ModalTableValue.pop(item);
        // this.ModalTableValue = this.ModalTableValue;

        // this.ModalTableValue.removeObject(item);
        // console.log(this.ModalTableValue);


        // const matchedIndex = this.ModalTableValue.findIndex(element => element === item);
        // if (matchedIndex !== -1) {
        //     const newArray = this.ModalTableValue.slice(0, matchedIndex).concat(this.ModalTableValue.slice(matchedIndex + 1));
        //     this.ModalTableValue = newArray;
        // }


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




        // TODO: Update korar shomoy o amke 6tar jonno check kore korte hobe and dekhte hobe ki ki keys ache and kongula change hoice sehgulo amke server e padhabo change korte
        // check korbo key gular moddhe kon gula inputvalues e pacchi shelo backend e padhabo
        // jamon inventory typer jonno hole dekhbo deschiption ache kina input value e tahole sheta change korbo ba type/status ache kina if else diye check kore sheglo patch korbo



        // if (this.ModalHeader == 'Inventory type') {
        //     // PATCH Request
        //     // jetar jonno save dichi shei modal r nam hobe
        //     // this.store.findRecord(this.ModalHeader, 1).then(function (post) {

        //     //     post.type; // => "Rails is Omakase"
        //     //     post.description = 'A new post';


        //     //     post.save(); // => PATCH to '/posts/1'
        //     // });
        // } else if (this.ModalHeader == 'Inventory type') {

        // }
        // } else if(this.ModalHeader == 'Inventory type') {

        // }
        // else if (this.ModalHeader == 'Inventory type') {

        // }
        // else {

        // }

    }
}



