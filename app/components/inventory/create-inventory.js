import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class InventoryCreateInventoryComponent extends Component {
    @service store;


    @tracked createInventoryEditItem = this.args.createInventoryEditItem;

    @tracked isloading = true;
    @tracked items;
    @tracked formData = {};

    // inventoryTypeColumns = [
    //     {
    //         column_name: 'sku',
    //         column_property: 'sku',
    //     },
    //     {
    //         column_name: 'name',
    //         column_property: 'name',
    //     },
    //     {
    //         column_name: 'description',
    //         column_property: 'description',
    //     },
    //     {
    //         column_name: 'fullDescription',
    //         column_property: 'fullDescription',
    //     },
    //     {
    //         column_name: 'manufacturingDate',
    //         column_property: 'manufacturingDate',
    //     },
    //     {
    //         column_name: 'expiryDate',
    //         column_property: 'expiryDate',
    //     },
    //     {
    //         column_name: 'storageType',
    //         column_property: 'storageType',
    //     },
    //     {
    //         column_name: 'inventoryCategory',
    //         column_property: 'inventoryCategory',
    //     },
    //     {
    //         column_name: 'categoryType',
    //         column_property: 'categoryType',
    //     },
    //     {
    //         column_name: 'inventoryType',
    //         column_property: 'inventoryType',
    //     },
    //     {
    //         column_name: 'allocationType',
    //         column_property: 'allocationType',
    //     },
    //     {
    //         column_name: 'unitOfMeasure',
    //         column_property: 'unitOfMeasure',
    //     },
    //     {
    //         column_name: 'status',
    //         column_property: 'status',
    //     },
    //     {
    //         column_name: 'actions',
    //         column_property: 'actions',
    //     },
    // ];




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
    @tracked inventoryType = '';
    @tracked allocationType = '';
    @tracked unitOfMeasure = '';
    @tracked status = '';

    @tracked selectedstatus = 'Status';
    names = ['active', 'inactive'];


    // edit e click korle shei item k padhiye dibo shei item r property ekhane set kore dibo and
    // then save dile tokhon/createinvenotryEdit thakbe tokhon abar create na kore item.save korbo
    constructor() {
        super(...arguments);
        console.log(this.createInventoryEditItem);

        if (this.createInventoryEditItem) {

            this.sku = this.createInventoryEditItem.sku;
            this.name = this.createInventoryEditItem.Name;
            this.description = this.createInventoryEditItem.Des;
            this.fullDescription = this.createInventoryEditItem.FullDes;
            this.manufacturingDate = this.createInventoryEditItem.Manufacture;
            this.expiryDate = this.createInventoryEditItem.Expire;
            this.storageType = this.createInventoryEditItem.StorageType;
            this.inventoryCategory = this.createInventoryEditItem.Catagory;
            this.categoryType = this.createInventoryEditItem.CategoryType;
            this.inventoryType = this.createInventoryEditItem.InventoryType;
            this.allocationType = this.createInventoryEditItem.AllocationType;
            this.unitOfMeasure = this.createInventoryEditItem.UnitMeasure;
            this.status = this.createInventoryEditItem.status;
        }

        // const inventoryType = this.store.findAll('inventory/create-inventory');
        // inventoryType.then(data => {
        //     let inventoryTypeObjects = data.map((element) => {
        //         // console.log(element);
        //         // if (element.created_by) {
        //         //     console.log(element.created_by.user_type);
        //         // }
        //         // return element
        //     })
        //     this.items = data;
        //     if (data) {
        //         this.isloading = !this.isloading;
        //     }
        // })
    }


    // create inventory input submit form
    @action
    async submitForm(event) {
        // console.log('form');
        event.preventDefault(); // Prevent default form submission

        // Retrieve values from tracked properties, tracted property is assosiated with the input fields.
        this.formData = {
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
        console.log(this.formData);


        // jodi create invenory edit kori tahole ekahne data thakbe r ekhane data thakle item.save() korbo noyto notun kore create korbo
        if (this.createInventoryEditItem) {
            console.log('item.save()');
            // *** item nite hobe inputfilednumber r moto jate jei item input dei sheta total item hishebe peye jai.
            // item.save();/formData.save();
            // this.createInventoryEditItem.save();  // ata save korleo hote pare karon ata already change hoye geche
        }
        else {

            // createRecord kore dibo ai obj tar moddhe shob value gula.
            // this.isLoadingPOST = true;
            // puro obj dhoreo padhate pari value r nam gula thik rekhe abar obj theke ber kore exact na koreo ber send korte pari
            const newInventoryType = await this.store.createRecord('inventory/create-inventory',
                {
                    // create_inventory: {
                    //     sku: this.formData.sku,
                    //     description: this.formData.description,
                    //     has_tables: this.formData.has_tables,
                    // }
                    create_inventory: this.formData
                },
            );
            console.log(newInventoryType);
            // newInventoryType.save().then((savedInventory) => {
            //     // The record has been saved successfully
            //     console.log(savedInventory);
            //     // this.isLoadingPOST = false;
            //     alert('Inventory has been created successfully');
            // })
            // .catch((error) => {
            //     console.error('Error saving inventory:', error);
            //     alert(error, 'Inventory has been not created, try again');
            // });
        }





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
        $('#inventoryModalContent').modal('hide');
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




    // // Method to reset form fields
    // resetFormFields() {
    //     // Reset tracked properties to empty strings
    //     this.sku = '';
    //     this.name = '';
    //     this.description = '';
    //     this.fullDescription = '';
    //     this.manufacturingDate = '';
    //     this.expiryDate = '';
    //     this.storageType = '';
    //     this.inventoryCategory = '';
    //     this.categoryType = '';
    //     this.inventoryType = '';
    //     this.allocationType = '';
    //     this.unitOfMeasure = '';
    //     this.state = '';
    //     this.status = '';
    //     this.selectedstatus = 'Status';
    // }



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



}
