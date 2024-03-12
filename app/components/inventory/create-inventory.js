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


    // tract create Inventory input field. ***
    @tracked sku = '';
    @tracked name = '';
    @tracked description = '';
    @tracked fullDescription = '';
    @tracked manufacturingDate = '';
    @tracked expiryDate = '';
    @tracked storageType = '';
    @tracked inventoryCategory = '';
    @tracked categoryType = '';
    @tracked category_name = '';
    @tracked inventoryType = '';
    @tracked allocationType = '';
    @tracked unitOfMeasure = '';
    @tracked status = '';

    @tracked selectedstatus = 'Status';
    names = ['active', 'inactive'];


    // TODO: Constructor e inv type, cat type, stg type ai type gulo diye dropdown banabo
    // edit e click korle shei item k padhiye dibo shei item r property ekhane set kore dibo and
    // then save dile tokhon/createinvenotryEdit thakbe tokhon abar create na kore item.save korbo
    constructor() {
        super(...arguments);
        // contains edit item values obj
        let createInventoryEditItem = this.args.createInventoryEditItem;
        // this.items = createInventoryEditItem;

        // console.log(createInventoryEditItem);
        if (createInventoryEditItem) {
            this.formData = createInventoryEditItem;
        }
    }


    // create inventory input submit form
    @action
    async submitForm(event) {
        event.preventDefault();

        // jodi create invenory edit kori tahole ekahne data thakbe r ekhane data thakle item.save() korbo noyto notun kore create korbo
        if (this.createInventoryEditItem) {
            console.log('item.save()');
            // to save it like this it should be a model instance!!! done
            this.createInventoryEditItem.save();
        }
        else {
            console.log('formdata', this.formData);
            const newInventoryType = await this.store.createRecord('inventory/inventory-list',
                this.formData
                // {
                // create_inventory: {
                //     sku: this.formData.sku,
                //     description: this.formData.description,
                //     has_tables: this.formData.has_tables,
                // }
                // create_inventory: this.formData
                // },
            );
            newInventoryType.save().then((savedInventory) => {
                // The record has been saved successfully
                console.log(savedInventory);
                // this.isLoadingPOST = false;
                alert('Inventory has been created successfully');
            })
                .catch((error) => {
                    console.error('Error saving inventory:', error);
                    alert(error, 'Inventory has been not created, try again');
                });
        }
        $('#inventoryModalContent').modal('hide');


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


    @action
    fullDescriptionFunc(event) {
        this.fullDescription = event.target.value;
    }


    @action
    statusFunc(value) {
        this.status = value;
        this.selectedstatus = value;
    }



    @action
    handleInputChange(event) {
        console.log(event.target.value);
    }

    // 
    // @action
    // handledropdown(data, property, value) {
    //     // console.log('value', value);
    //     set(data, property, value);
    //     this.trackingItem();
    // }

    @action
    inventoryDropdown(data, property, value) {
        console.log(value);

        set(data, property, value);
        console.log(data);
        console.log(this.formData);
    }


    @action
    inventoryDropdownInput(data, property, event) {
        console.log(event.target.value);

        set(data, property, event.target.value);
        console.log(data);
        console.log(this.formData);
    }
}


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




