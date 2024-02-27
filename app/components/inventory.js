import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

// TODO:
// jodi kaw aksathe 2ta input field add korte chay tokhon inputvalues niye kaj korte hobe jate 2bare 2 data alada
// kore rekhe then purate aksthe ba loop chaliye push kora jay, 2ta alada kore inputvalue e pawatai tough
// field e serial maintain hocche nah jeta last e dei input sheta last e chole jay array fole type shesh e dile shetar type na dhore last r tay chole jay
// akta save kore arektay gele ager data format ta theke jay sheta khali korte hobe
// active, inactive
// update

// last input ta khali thakle tarpor r add input field korbo nah
// active inactive dropdown issue (multiple input nile 2ta same hoye jay)
// modal size should be dynamic as before
// input field open thakle update button -> save button hoye jabe.
// inputValue theke inputfilednumber e, jotogula value dibo shegulo set hobe r jgulu key r value dibo nah shegulo te undefined boshbe.
// ami prothom input e jkoytay akta ba 2ta insert kori na kano, new input field create korle shei inventoryr joto
// key tototai create hobe.
// last e akta khali input thakleo save dile jegulo fill up kora ache shegulo diye save hobe.


// *** status gular akta array banabo, inputfiled joto number array te ache akhn toto num array index diye
// shei index r status k dekhabo, statusList[1] , 1 mane 1 num inputfilednumber r jonno

export default class InventoryComponent extends Component {
    @service store;

    // tracked for api data
    @tracked inventorytypedata;
    @tracked inventoryCatagorytypedata;
    @tracked inventoryStorageTypes;
    @tracked inventoryAlocationTypes;
    @tracked inventoryUnitMeasure;

    // modal open and close
    @tracked isModalOpen = false;

    // modal open
    @action
    openModal() {
        // kono table selected na hole ai data ashbe thakbe nah tokhon alert dibo
        if (!this.ModalHeader) {
            console.log('no data');
            alert('No table is selected yet!');
            return
        }
        else {
            this.isModalOpen = true;
        }
    }
    // modal close
    @action
    closeModal() {
        this.isModalOpen = false;
    }



    // create Inventory
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
    @tracked firstObjectKeys = A([]);
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

        // after saving close the modal
        this.closeModalCreateInventory();
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

    // // 
    // get firstObjectKeys() {
    //     const firstObject = this.args.formArray?.[0];
    //     return Object.keys(firstObject || {});
    // }






    // modal size
    @tracked ModalSize;
    // track table values --> header contains table name and ModalTableValue contains the key and value pairs;
    @tracked ModalHeader;
    @tracked ModalTableHeaders = A([]);
    @tracked ModalTableValue = A([]);
    // full table ta ekhane theke dekhabo jokhon edit e click korbo tokhon modaltablevalue te set korbo and modal show korbo.
    @tracked CreateInvetoryFullTable = A([{
        // "ID": 1,
        "sku": "SKU123",
        "name": "A",
        "description": "Lorem ipsum ",
        "full des.": "Product A",
        "manufac. date": "2022-01-15",
        "expire date": "2023-01-15",
        "storage type": "Dry storage",
        "inventory category": "Electronics",
        "category type": "Consumer Electronics",
        "inventory type": "Finished Goods",
        "allocation type": "Standard",
        "unit of measure": "Pieces",
        "status": false
    }, {
        // "ID": 2,
        "sku": "SKU456",
        "name": "B",
        "description": "Nulla eu",
        "full des.": "Product B",
        "manufac. date": "2022-03-20",
        "expire date": "2023-03-20",
        "storage type": "Refrigerated",
        "inventory category": "Food",
        "category type": "Dairy Products",
        "inventory type": "Raw Materials",
        "allocation type": "Bulk",
        "unit of measure": "Kilograms",
        "status": false
    },
    {
        // "ID": 3,
        "sku": "SKU789",
        "name": "C",
        "description": "Sed tempor",
        "full des.": "Product C",
        "manufac. date": "2021-12-05",
        "expire date": "2023-06-30",
        "storage type": "storage",
        "inventory category": "Pharma",
        "category type": "Medications",
        "inventory type": "Work in Progress",
        "allocation type": "Custom",
        "unit of measure": "Boxes",
        "status": false
    }
    ]);

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

        // const CatagoryType = this.store.findAll('inventory/inventory-category-type');
        // console.log(typeof CatagoryType);


        // const peek = this.store.peekAll('inventory/get-inventory-types-predef-data');
        // console.log(peek);

    }


    // input fields
    @action
    handleInputChange(key, event) {
        console.log('key', key);
        this.inputValues[key] = event.target.value;
        console.log(this.inputValues);
    }



    // to track selected status
    @action
    HandleStatus(value) {
        // console.log("key");
        console.log(value);
        this.statusList.push(value);
        console.log(this.statusList);


        let key = 'status';
        this.selectedStatus = '';
        this.selectedStatus = value;


        // arekta property toyri hobe ai key status nam e, input value active inactive diye.
        this.inputValues[key] = value;
        // console.log(this.inputValues);



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



    // inventory type func
    @action
    async HandleInventoryType(title) {

        this.inputFieldNumbers = [];
        // this.ModalTableValue = A([]);
        // ager shob input khali kore dibo
        this.inputValues = {};
        // set modal table title
        this.ModalHeader = title;



        // get api
        // fetch get api 
        try {
            const inventoryType = await this.store.findAll('inventory/inventory-type');
            // set it to the tracted property.
            this.inventorytypedata = inventoryType;
            // Process the fetched data
        } catch (error) {
            console.error('Error fetching category types:', error);
        }

        // which data we want store here as a obj, then push it to the modaltablevalue to show it in the modal table.
        // {type: 'sdf', description: 'asdfasdf', status: 'inactive'}
        let inventoryTypeObjects = this.inventorytypedata.map(element => {
            return {
                ID: element.id,
                type: element.inv_type,
                description: element.description,
                status: element.active_status
            };
        });
        console.log(inventoryTypeObjects);
        this.ModalTableValue = A(inventoryTypeObjects);
        console.log(this.ModalTableValue);




        // setting input values
        // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        this.ModalTableHeaders = A([]);
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


        // value set korar por now open the modal by calling this.openModal
        this.openModal();
        console.log(this.inputFieldNumbers);
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
        console.log(this.inputValues);
        console.log('inputFieldNumbers', this.inputFieldNumbers);
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

        console.log(this.inputFieldNumbers);
    }




    @action
    handleDeleteInputField(item) {
        console.log(item);

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


        // TODO: jeta delete korbo sheta ekhan thekeo delete korte hobe. dhore dhore***
        // tar jonne match kore delete korte hobe, inputfilednumbers e tai shob data set thaka ucit
        // shatar item k niye ekhane match kore inputvalueobj thekeo delete kore dibo, taholei save korle r modaltabe e save hobe na

        // ai 2ta thekeoo shetake khali dite hobe noyto shudhu input filed theke khali holeo save dile save hoye jacche shob
        // ekhean theke khali korle delete dile shob jayga theke delete hobe then abar save dile bakigula save hobe.
        // console.log(this.inputValues);
        // this.inputValues
        // this.inputvalueobj
        console.log(this.inputvalueobj);
    }


    // HandleSave
    @action
    HandleSave() {
        console.log(this.inputValues);

        // TODO: Multiple input aksathe save kora jacche na!!
        // TODO:null soho shob empty hobe prothom obosthay/jokhon length 1 thakbe many key thakbe value null diye
        // Prothom null value ta thekei jacche shetake konobabe remove kortei hobe


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
                        // this.inputValues[key] = 'blank';
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
                    // console.log(this.inputvalueobj);

                    // API TODO: POST (ai multiple object guloke amra post/create kore dibo)
                    
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
                console.log(this.ModalTableValue);

                // API TODO: POST (Single value to post/create)
                // ember data post store then save() means post that  here library is the model name that defines the libraries api endpoint
                // const newLibrary = this.store.createRecord('inventory/inventory-type', {
                //     name: this.name,
                //     address: this.address,
                //     phone: this.phone,
                // });
                // // console.log(newLibrary.name);

                // // post or save the data (post executed)
                // newLibrary
                //     .save()
                //     .then((savedLibrary) => {
                //         // The record has been saved successfully
                //         // savedLibrary is the JSON api response we get from the beckend server
                //         console.log('Saved library:', savedLibrary);
                //         // // Access the values you posted
                //         // const name = savedLibrary.name;
                //         // const address = savedLibrary.address;
                //         // const phone = savedLibrary.phone;
                //         // console.log(name, address, phone);
                //         alert('card added');
                //         location.reload();
                //     })
                //     .catch((error) => {
                //         // Handle the error in case of failure
                //         console.error('Error saving library:', error);
                //     });
                //
            }
        }
        else {
            console.log("missing");
            alert("Fill all the input fields");
            return
        }

        // this contains what keys we need 
        console.log('ModalTableHeaders', this.ModalTableHeaders);

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



        // get api fetch
        try {
            const categoryTypes = await this.store.findAll('inventory/inventory-category-type');
            console.log(categoryTypes);
            // set it to the tracted property.
            this.inventoryCatagorytypedata = categoryTypes;
            // Process the fetched data
        } catch (error) {
            console.error('Error fetching category types:', error);
        }

        // console.log(this.inventoryCatagorytypedata);
        // get and set value from the server,  obj that contains all the data that i need to show in the UI.
        let inventoryCatagoryTypeObjects = this.inventoryCatagorytypedata.map(element => {
            return {
                ID: element.id,
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





        // setting input values
        // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        this.ModalTableHeaders = A([]);
        this.ModalTableHeaders.push({ "types": null, "country": null, "status": 'inactive' });
        // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.)
        this.keysName = Object.keys({ "types": null, "country": null });
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
        this.openModal();


        // // table dadta
        // this.ModalTableValue = A([
        //     { "types": null, "country": null, "status": null },
        // ]);
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
        //     console.log('xl');
        //     this.ModalSize = 'xl';
        // }
        // else if (maxKeysCount >= 2) {
        //     this.ModalSize = 'lg';
        // }
        // else {
        //     this.ModalSize = 'md';
        // }

        // value set korar por now open the modal by calling this.openModal
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

        // higesht key in a object more than 6
        // this.ModalTableValue = A([
        //     { "categories": null, "C.types": null, "parent categories": null, "inventory types": null, "status": null, "countries": null, "des.": null },
        // ]);


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
        this.openModal();

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
        //     console.log('xl');
        //     this.ModalSize = 'xl';
        // }
        // else if (maxKeysCount >= 2) {
        //     this.ModalSize = 'lg';
        // }
        // else {
        //     this.ModalSize = 'md';
        // }

        // value set korar por now open the modal by calling this.openModal
        // this.openModal();
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


        // fetch get api 
        try {
            const storgeType = await this.store.findAll('inventory/storage-type');
            // set it to the tracted property.
            this.inventoryStorageTypes = storgeType;
            // Process the fetched data
        } catch (error) {
            console.error('Error fetching category types:', error);
        }

        // get and set value from the server,  obj that contains all the data that i need to show in the UI.
        let inventoryCatagoryTypeObjects = this.inventoryStorageTypes.map(element => {
            return {
                ID: element.id,
                type: element.storage_type,
                status: element.active_status
            };
        });
        // set the desired obj to the modaltablevalue to show in the UI
        this.ModalTableValue = A(inventoryCatagoryTypeObjects);
        console.log(this.ModalTableValue);




        // setting input values
        // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        this.ModalTableHeaders = A([]);
        this.ModalTableHeaders.push({ "types": null, "status": 'inactive' });
        // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.)
        this.keysName = Object.keys({ "types": null });

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
        this.openModal();



        //
        // this.ModalTableValue = A([
        //     { "types": null, "status": null },
        // ]);

        // // // setting dynamic modal size by calculating max key value number of an object
        // // let maxKeysCount = 0;

        // // this.ModalTableValue.forEach(obj => {
        // //     let keysCount = Object.keys(obj).length;
        // //     if (keysCount > maxKeysCount) {
        // //         maxKeysCount = keysCount;
        // //     }
        // // });
        // // if (maxKeysCount > 6) {
        // //     // make modal size to lg
        // //     console.log('xl');
        // //     this.ModalSize = 'xl';
        // // }
        // // else if (maxKeysCount >= 2) {
        // //     this.ModalSize = 'lg';
        // // }
        // // else {
        // //     this.ModalSize = 'md';
        // // }

        // // value set korar por now open the modal by calling this.openModal
        // this.openModal();
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



        // fetch get api 
        try {
            const AlocationType = await this.store.findAll('inventory/allocation-type');
            // set it to the tracted property.
            this.inventoryAlocationTypes = AlocationType;
            // Process the fetched data
        } catch (error) {
            console.error('Error fetching category types:', error);
        }

        // get and set value from the server,  obj that contains all the data that i need to show in the UI.
        let inventoryCatagoryTypeObjects = this.inventoryAlocationTypes.map(element => {
            return {
                ID: element.id,
                type: element.alloc_type,
                status: element.active_status,
                description: element.description
            };
        });
        // set the desired obj to the modaltablevalue to show in the UI
        this.ModalTableValue = A(inventoryCatagoryTypeObjects);
        console.log(this.ModalTableValue);




        // setting input values
        // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        this.ModalTableHeaders = A([]);
        this.ModalTableHeaders.push({ "types": null, "Description": null, "status": 'inactive' });
        // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.)
        this.keysName = Object.keys({ "types": null, "Description": null });

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
        this.openModal();

        // 
        // this.ModalTableValue = A([
        //     { "types": null, "status": null, "Description": null },
        // ]);

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
        //     console.log('xl');
        //     this.ModalSize = 'xl';
        // }
        // else if (maxKeysCount >= 2) {
        //     this.ModalSize = 'lg';
        // }
        // else {
        //     this.ModalSize = 'md';
        // }

        // value set korar por now open the modal by calling this.openModal
        // this.openModal();
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




        // fetch get api 
        try {
            const UnitMeasure = await this.store.findAll('inventory/unit-of-measure');
            // set it to the tracted property.
            this.inventoryUnitMeasure = UnitMeasure;
            // Process the fetched data
        } catch (error) {
            console.error('Error fetching category types:', error);
        }

        // get and set value from the server,  obj that contains all the data that i need to show in the UI.
        let UnitMeasureObject = this.inventoryUnitMeasure.map(element => {
            return {
                ID: element.id,
                type: element.measure_type,
                short: element.short,
                status: element.active_status
            };
        });
        // set the desired obj to the modaltablevalue to show in the UI
        this.ModalTableValue = A(UnitMeasureObject);
        console.log(this.ModalTableValue);



        // setting input values
        // header decide kore dile shetai jeye keys r value hobe table e. (age kichu thakle khali kore dibo)
        this.ModalTableHeaders = A([]);
        this.ModalTableHeaders.push({ "types": null, "shorts": null, "status": 'inactive' });
        // jei table r jei keys name sheguloloi totogulo input field banabo. (koto gula input field banabo ta rep.)
        this.keysName = Object.keys({ "types": null, "shorts": null });

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
        this.openModal();


        // // table value
        // this.ModalTableValue = A([
        //     { "types": null, "shorts": null, "status": null },
        // ]);

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
        //     console.log('xl');
        //     this.ModalSize = 'xl';
        // }
        // else if (maxKeysCount >= 2) {
        //     this.ModalSize = 'lg';
        // }
        // else {
        //     this.ModalSize = 'md';
        // }


        // value set korar por now open the modal by calling this.openModal
        // this.openModal();
    }



    // create inventory button, null value will be shown to the model bcoz null value is set to this.ModalTableValue;
    @action
    HandleCreateInventory(title) {
        // prothom ei ager shob khali kore nibo
        this.resetFormFields();


        // setting modaltable title
        this.ModalHeader = title;

        // value set korar por now open the modal by calling this.openModal
        this.isModalOpenCreateInventory();


        // ager shob khali kore dilam
        // this.inputFieldNumbers = [];
        // this.ModalTableValue = A([]);

        // // ager shob input khali kore dibo
        // this.inputValues = {};
        // // console.log('create inventory');




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
    }



    // edit create inventory, this.modaltabevalue will contains with existed value, with key value pair exact value;
    @action
    HandleCreateInventoryEdit(title, item) {
        console.log(item);
        this.CreateInventoryEditItem = '';
        this.CreateInventoryEditItem = item;

        // item theke niye ekhane set kore dibo
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
        this.isModalOpenCreateInventory()


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
        console.log(this.inputValues);

        // PUT/PATCH API TODO: ai this.inputvalue theke value gulo niye put/patch korbo.  {type: 'RMa', description: 'Raw Materialsd', status: 'truef'}

    }

}
