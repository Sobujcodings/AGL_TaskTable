import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class InventoryCreateInventoryComponent extends Component {
    @service store;

    items;
    @tracked createInventoryEditItem = this.args.createInventoryEditItem;

    @tracked isloading = true;
    @tracked items;
    @tracked formData = {};

    // for dropdown
    @tracked inv_type;
    @tracked category_type;
    @tracked storage_type;
    @tracked alloc_type;
    @tracked measure_type;


    inventoryTypeColumns = [
        {
            column_name: 'sku',
            column_property: 'sku',
        },
        {
            column_name: 'name',
            column_property: 'name',
        },
        {
            column_name: 'description',
            column_property: 'description',
        },
        {
            column_name: 'full_description',
            column_property: 'full_description',
        },
        {
            column_name: 'manufacturing_date',
            column_property: 'manufacturing_date',
        },
        {
            column_name: 'expire_date',
            column_property: 'expire_date',
        },
        {
            column_name: 'storage_type',
            column_property: 'storage_type',
        },
        // {
        //     column_name: 'inventoryCategory',
        //     column_property: 'inventoryCategory',
        // },
        {
            column_name: 'category_type',
            column_property: 'category_type',
        },
        {
            column_name: 'inv_type',
            column_property: 'inv_type',
        },
        {
            column_name: 'alloc_type',
            column_property: 'alloc_type',
        },
        {
            column_name: 'measure_type',
            column_property: 'measure_type',
        },
        {
            column_name: 'active_status',
            column_property: 'active_status',
        },
        {
            column_name: 'actions',
            column_property: 'actions',
        },
    ];


    // ekhane koyekta dropdown r list hobe from server
    names = ['active', 'inactive'];


    // TODO: Constructor e inv type, cat type, stg type ai type gulo diye dropdown banabo
    // edit e click korle shei item k padhiye dibo shei item r property ekhane set kore dibo and
    // then save dile tokhon/createinvenotryEdit thakbe tokhon abar create na kore item.save korbo
    constructor() {
        super(...arguments);
        console.log('constructor of create inventory');
        // contains edit item values obj
        let createInventoryEditItem = this.args.createInventoryEditItem;
        // this.items = createInventoryEditItem;

        this.inv_type = this.getInventoryType();
        this.category_type = this.getCatagoryType();
        this.storage_type = this.getStorageType();
        this.alloc_type = this.getAllocationType();
        this.measure_type = this.getMeasureType();
    }



    // droptdown for types
    // inv type data for dropdown
    getcachInventoryType() {
        const inv_types = this.store.peekAll('inventory/inventory-type');
        // console.log(inv_types);
        return inv_types;
    }

    // inv type
    async getInventoryType() {
        let invTypeArray = [];
        // inv_types from getcached method
        let invtypedata = this.getcachInventoryType();
        if (Object.keys(invtypedata).length === 0) {
            console.log('findAll it');
            const invtypes = await this.store.findAll('inventory/inventory-type');
            console.log('invtypedata', invtypes);
            let types = invtypes.filter(obj => obj.active_status == true);
            // console.log('types', types);
            types.forEach(element => {
                invTypeArray.push(element.inv_type);
            });
            console.log('invTypeArray []', invTypeArray);
        }
        else {
            // if peekAll works
            let types = invtypedata.filter(obj => obj.active_status == true);
            console.log('peek works');
            types.forEach(element => {
                invTypeArray.push(element.inv_type);
            });
        }
        return invTypeArray;
    }


    // cat type
    async getCatagoryType() {
        let invTypeArray = [];
        // inv_types from getcached method
        // let invtypedata = this.getcachInventoryType();
        // if (Object.keys(invtypedata).length === 0) {
        console.log('findAll it');
        const invtypes = await this.store.findAll('inventory/inventory-category-type');
        console.log('invtypedata', invtypes);
        let types = invtypes.filter(obj => obj.active_status == true);
        // console.log('types', types);
        types.forEach(element => {
            invTypeArray.push(element.category_type);
        });
        console.log('invTypeArray []', invTypeArray);
        // }
        // else {
        //     // if peekAll works
        //     let types = invtypedata.filter(obj => obj.active_status == true);
        //     console.log('peek works');
        //     types.forEach(element => {
        //         invTypeArray.push(element.inv_type);
        //     });
        // }
        return invTypeArray;
    }

    // storage type
    async getStorageType() {
        let invTypeArray = [];
        console.log('findAll it');
        const invtypes = await this.store.findAll('inventory/storage-type');
        console.log('invtypedata', invtypes);
        let types = invtypes.filter(obj => obj.active_status == true);
        // console.log('types', types);
        types.forEach(element => {
            invTypeArray.push(element.storage_type);
        });
        console.log('invTypeArray []', invTypeArray);
        return invTypeArray;
    }


    // allocation type
    async getAllocationType() {
        let invTypeArray = [];
        console.log('findAll it');
        const invtypes = await this.store.findAll('inventory/allocation-type');
        console.log('invtypedata', invtypes);
        let types = invtypes.filter(obj => obj.active_status == true);
        // console.log('types', types);
        types.forEach(element => {
            invTypeArray.push(element.alloc_type);
        });
        console.log('invTypeArray []', invTypeArray);
        return invTypeArray;
    }


    // measure type
    async getMeasureType() {
        let invTypeArray = [];
        console.log('findAll it');
        const invtypes = await this.store.findAll('inventory/unit-of-measure');
        console.log('invtypedata', invtypes);
        let types = invtypes.filter(obj => obj.active_status == true);
        // console.log('types', types);
        types.forEach(element => {
            invTypeArray.push(element.measure_type);
        });
        console.log('measure_type []', invTypeArray);
        return invTypeArray;
    }



    // if modal is closed then we know it from here then get the peekAll data which might be edited from the modal then rollbackattributes that whole model value or each model item using service to catch the model value after findAll.
    @action
    insertForModal(handleItemsToNull) {
        // this.SelectedInventory = SelectedInventory;
        $('#inventoryModalContent').on('hidden.bs.modal', function (event) {
            // do something...
            console.log('modal closed');
            handleItemsToNull();
        })
    }


    @action
    handleItemsToNull() {
        // console.log(this.formData);
        // this.formData = {};
        // console.log(this.formData);
        // this.createInventoryEditItem = {};
        // console.log('inventoryType', this.args.inventoryType);
        // let allRecords = this.store.peekAll(`inventory/${this.args.inventoryType}`);
        // // console.log(allRecords);
        // allRecords.forEach(element => {
        //     set(element, 'isEdit', false);
        //     element.rollbackAttributes();
        // });
    }


    // create inventory input submit form
    @action
    async submitForm(event) {
        event.preventDefault();

        // jodi create invenory edit kori tahole ekahne data thakbe r ekhane data thakle item.save() korbo noyto notun kore create korbo
        if (this.args.createInventoryEditItem) {
            console.log(this.args.createInventoryEditItem);
            this.args.createInventoryEditItem.save();
            $('#inventoryModalContent').modal('hide');
        }
        else {
            console.log('formdata', this.formData);
            const newInventoryType = await this.store.createRecord('inventory/inventory-list',
                this.formData
            );
            newInventoryType.save().then((savedInventory) => {
                // The record has been saved successfully
                console.log(savedInventory);
                $('#inventoryModalContent').modal('hide');
                // this.isLoadingPOST = false;
                // alert('Inventory has been created successfully');
            })
                .catch((error) => {
                    console.error('Error saving inventory:', error);
                    alert(error, 'Inventory has been not created, try again');
                });
        }

        // Reset form fields if needed
        // this.resetFormFields();


        // console.log(this.CreateInventoryEditItem);
        // // if data found in tracked editItem  then replace that item with the updated input data.
        // if (this.CreateInventoryEditItem != undefined) {
        //     console.log('create inventory item to be edited', this.CreateInventoryEditItem);

        // } else {
        //     console.log('no edit new create');
        //     // push to form data to show this in the UI.
        //     this.FormArray.push(formData);
        //     // form data to contains all the data to post.
        //     this.FormArray = this.FormArray;
        // }

        // // get the keys from the formArray
        // this.firstObjectKeys = Object.keys(this.FormArray[0]);
        // console.log(this.firstObjectKeys);


        // Reset form fields if needed
        // this.resetFormFields();

        // TODO: validation korte hobe, khali form save kora jabe nah/kon gula required shegulo chara submit kora jabe nah alert dibo return kore dibo
        // modal close hobe ***
        // this.CloseCreateInventoryModal();

    }



    // TODO: ata akta component banano jete pare jekhane ami ki lagbe inv type naki cat type ta dibo shei onujayi fetch/findAll hoye amke shei inv,cat type r name/value gula dibe
    // // inv type data for dropdown
    // getcachInventoryType() {
    //     const inv_types = this.store.peekAll('inventory/inventory-type');
    //     // console.log(inv_types);
    //     return inv_types;
    // }

    // async getInventoryType() {
    //     let invTypeArray = [];
    //     let invtypedata = this.getcachInventoryType();
    //     if (Object.keys(invtypedata).length === 0) {
    //         // console.log('findAll it');
    //         invtypedata = await this.store.findAll('inventory/inventory-type');
    //         // console.log(invtypedata);
    //         let types = invtypedata.filter(obj => obj.active_status == true);
    //         // console.log('types', types);
    //         types.forEach(element => {
    //             invTypeArray.push(element.inv_type);
    //         });

    //     }
    //     else {
    //         let types = invtypedata.filter(obj => obj.active_status == true);
    //         // console.log('types', types);
    //         types.forEach(element => {
    //             invTypeArray.push(element.inv_type);
    //         });
    //     }
    //     return invTypeArray;
    // }





    // // catagory type
    // getcachCatagoryType() {
    //     const category_type = this.store.peekAll('inventory/inventory-category-type');
    //     // console.log(category_type);
    //     return category_type;
    // }

    // @action
    // async getCatagoryType() {
    //     let CatagoryTypeArray = [];
    //     let Country = [];
    //     let Catagorytypedata = this.getcachCatagoryType();
    //     if (Object.keys(Catagorytypedata).length === 0) {
    //         // console.log('findAll it');
    //         Catagorytypedata = await this.store.findAll('inventory/inventory-category-type');
    //         // console.log(Catagorytypedata);
    //         let types = Catagorytypedata.filter(obj => obj.active_status == true);
    //         // category type array
    //         types.forEach(element => {
    //             CatagoryTypeArray.push(element.category_type);
    //         });
    //         // country
    //         types.forEach(element => {
    //             element.country.forEach(element => {
    //                 // Check if the country is not already in the array before adding it
    //                 if (!Country.includes(element)) {
    //                     Country.push(element);
    //                 }
    //             });
    //         });
    //         // console.log(Country);
    //         this.Country = Country;
    //     }
    //     else {
    //         let types = Catagorytypedata.filter(obj => obj.active_status == true);
    //         // console.log('types', types);
    //         types.forEach(element => {
    //             CatagoryTypeArray.push(element.category_type);
    //         });
    //         // country
    //         types.forEach(element => {
    //             element.country.forEach(element => {
    //                 // Check if the country is not already in the array before adding it
    //                 if (!Country.includes(element)) {
    //                     Country.push(element);
    //                 }
    //             });
    //         });
    //         this.Country = Country;
    //         // console.log(invTypeArray);
    //     }
    //     return CatagoryTypeArray;
    // }






    // 



    @action
    inventoryDropdown(data, property, value) {
        console.log(value);
        set(data, property, value);
        console.log(data);
        // console.log(this.formData);
    }


    @action
    inventoryDropdownInput(data, property, event) {
        console.log(event.target.value);
        set(data, property, event.target.value);
        console.log(data);
        // console.log(this.formData);
    }




}



// constructor() {
//     super(...arguments);
//     this.copyItem = JSON.parse(JSON.stringify(this.args.item));
//     this.inventoryTypes = this.getInventoryType();
//     this.CatagoryTypes = this.getCatagoryType();
// }


// // inv type data for dropdown
// getcachInventoryType() {
//     const inv_types = this.store.peekAll('inventory/inventory-type');
//     // console.log(inv_types);
//     return inv_types;
// }

// async getInventoryType() {
//     let invTypeArray = [];
//     let invtypedata = this.getcachInventoryType();
//     if (Object.keys(invtypedata).length === 0) {
//         // console.log('findAll it');
//         invtypedata = await this.store.findAll('inventory/inventory-type');
//         // console.log(invtypedata);
//         let types = invtypedata.filter(obj => obj.active_status == true);
//         // console.log('types', types);
//         types.forEach(element => {
//             invTypeArray.push(element.inv_type);
//         });

//     }
//     else {
//         let types = invtypedata.filter(obj => obj.active_status == true);
//         // console.log('types', types);
//         types.forEach(element => {
//             invTypeArray.push(element.inv_type);
//         });
//     }
//     return invTypeArray;
// }



// // catagory type
// getcachCatagoryType() {
//     const category_type = this.store.peekAll('inventory/inventory-category-type');
//     // console.log(category_type);
//     return category_type;
// }

// @action
// async getCatagoryType() {
//     let CatagoryTypeArray = [];
//     let Country = [];
//     let Catagorytypedata = this.getcachCatagoryType();
//     if (Object.keys(Catagorytypedata).length === 0) {
//         // console.log('findAll it');
//         Catagorytypedata = await this.store.findAll('inventory/inventory-category-type');
//         // console.log(Catagorytypedata);
//         let types = Catagorytypedata.filter(obj => obj.active_status == true);
//         // category type array
//         types.forEach(element => {
//             CatagoryTypeArray.push(element.category_type);
//         });
//         // country
//         types.forEach(element => {
//             element.country.forEach(element => {
//                 // Check if the country is not already in the array before adding it
//                 if (!Country.includes(element)) {
//                     Country.push(element);
//                 }
//             });
//         });
//         // console.log(Country);
//         this.Country = Country;
//     }
//     else {
//         let types = Catagorytypedata.filter(obj => obj.active_status == true);
//         // console.log('types', types);
//         types.forEach(element => {
//             CatagoryTypeArray.push(element.category_type);
//         });
//         // country
//         types.forEach(element => {
//             element.country.forEach(element => {
//                 // Check if the country is not already in the array before adding it
//                 if (!Country.includes(element)) {
//                     Country.push(element);
//                 }
//             });
//         });
//         this.Country = Country;
//         // console.log(invTypeArray);
//     }
//     return CatagoryTypeArray;
// }








// Retrieve values from tracked properties, tracted property is assosiated with the input fields.
// this.formData = {
//     // id:
//     sku: this.sku,
//     inv_name: this.name,
//     description: this.description,
//     full_description: this.fullDescription,
//     manufacturing_date: this.manufacturingDate,
//     expire_date: this.expiryDate,
//     category_name: this.category_name,
//     storage_type: this.storageType,
//     inventoryCategory: this.inventoryCategory,
//     category_type: this.categoryType,
//     inv_type: this.inventoryType,
//     alloc_type: this.allocationType,
//     measure_type: this.unitOfMeasure,
//     active_status: this.selectedstatus
// };
// console.log(this.formData);

// Retrieve values from tracked properties, tracted property is assosiated with the input fields.
// this.formData = {
//     // id:
//     sku: this.sku,
//     inv_name: this.name,
//     description: this.description,
//     full_description: this.fullDescription,
//     manufacturing_date: this.manufacturingDate,
//     expire_date: this.expiryDate,
//     category_name: this.category_name,
//     storage_type: this.storageType,
//     inventoryCategory: this.inventoryCategory,
//     category_type: this.categoryType,
//     inv_type: this.inventoryType,
//     alloc_type: this.allocationType,
//     measure_type: this.unitOfMeasure,
//     active_status: this.selectedstatus
// };
// console.log(this.formData);

// edit create inventory, this.modaltabevalue will contains with existed value, with key value pair exact value;
// @action
// HandleCreateInventoryEdit(title, item) {
//     console.log(item);

//     this.CreateInventoryEditItem = '';
//     this.CreateInventoryEditItem = item;

//     // item theke niye sheta set kore dibo existed input field e.
//     this.sku = item.sku;
//     this.name = item.Name;
//     this.description = item.Des;
//     this.fullDescription = item.FullDes;
//     this.manufacturingDate = item.Manufacture;
//     this.expiryDate = item.Expire;
//     this.storageType = item.StorageType;
//     this.inventoryCategory = item.Catagory;
//     this.categoryType = item.CategoryType;
//     this.inventoryType = item.InventoryType;
//     this.allocationType = item.AllocationType;
//     this.unitOfMeasure = item.UnitMeasure;
//     this.selectedstatus = item.status
//     // this.state = item.state;
//     // this.status = item.Status;

//     // then open the create table modal
//     // this.isModalOpenCreateInventory()


//     // // ager shob input khali kore dibo
//     // this.inputValues = {};
//     // // ai item ta k just modal e show korbo.
//     // console.log(item);
//     // // console.log('edit create inventory');
//     // // console.log(title);

//     // // setting modaltable title
//     // this.ModalHeader = title;

//     // // modaltablevalue will contains here with all the null values.
//     // this.ModalTableValue = A([item]);

//     // // setting dynamic modal size by calculating max key value number of an object
//     // let maxKeysCount = 0;
//     // this.ModalTableValue.forEach(obj => {
//     //     let keysCount = Object.keys(obj).length;
//     //     if (keysCount > maxKeysCount) {
//     //         maxKeysCount = keysCount;
//     //     }
//     // });
//     // if (maxKeysCount > 6) {
//     //     // make modal size to lg
//     //     console.log('xxl');
//     //     this.ModalSize = 'xl';
//     // }
//     // else if (maxKeysCount >= 2) {
//     //     this.ModalSize = 'lg';
//     // }
//     // else {
//     //     this.ModalSize = 'md';
//     // }


//     // value set korar por now open the modal by calling this.openModal, now modal contains this.ModalTableValue data;
//     // this.openModal();

//     //   this.openCreateInventoryModal();

// }




