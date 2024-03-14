import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';


export default class InventoryInventoryCatagoryComponent extends Component {

    @service store;

    @tracked inputFieldNumbers = A([]);
    @tracked TableDropDownnames = ["true", "false"];
    @tracked inputValues = {};
    @tracked inputvalueobj = [];
    names = ['true', 'false'];
    @tracked isloading = true;
    @tracked isLoadingPOST;
    @tracked items;

    inventoryTypeColumns = [
        {
            column_name: 'SL',
            column_property: 'id',
        },
        {
            column_name: 'category_name',
            column_property: 'category_name',
        },
        {
            column_name: 'category_type',
            column_property: 'category_type',
        },
        {
            column_name: 'parent_name',
            column_property: 'parent_name',
        },
        {
            column_name: 'inv_type',
            column_property: 'inv_type',
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


    @action
    arrayToTree(arr) {
        let tree = A([]);
        let mappedArr = {};

        arr.forEach(item => {
            mappedArr[item.id] = {
                id: item.id,
                category_name: item.category_name,
                parent_id: item.parent_id,
                inv_type: item.inv_type,
                category_type: item.category_type,
                country: item.country,
                children: A([])
            };
        });
        arr.forEach(item => {
            if (item.parent_id !== null && mappedArr[item.parent_id]) {
                mappedArr[item.parent_id].children.pushObject(item);
            }
        });

        for (let key in mappedArr) {
            tree.pushObject(mappedArr[key])
        }
        return tree;
    }


    @action
    setItems(data){
        this.items = this.convertToTree(data);
    }

    // 
    constructor() {
        super(...arguments);

        const inventoryType = this.store.findAll('inventory/inventory-category');
        inventoryType.then(data => {
            // this.items = this.convertToTree(data);
            this.setItems(data);

            // console.log('items:', this.items);
            // to make it globally accessible set this item data from the server to global and if the modal is closed, set the item to null to set it as previous, after opening that modal it will be fetch again n everything will be as usual. 
            // this.fetchdata.setItems(this.items);
            if (data) {
                this.isloading = !this.isloading;
            }
        })
    }


    // making tree form the data found from the server
    @action
    convertToTree(array) {
        const map = new Map();
        const result = A([]);

        array.forEach(item => {
            map.set(item.id, {
                id: item.id,
                category_name: item.category_name,
                parent_id: item.parent_id,
                inv_type: item.inv_type,
                category_type: item.category_type,
                country: item.country,
                children: A([])
            });
        });

        array.forEach(item => {
            const parent = map.get(item.parent_id);

            if (parent) {
                parent.children.push(map.get(item.id));
            } else {
                result.push(map.get(item.id));
            }
        });

        return result;
    }





    // 
    @action handleEdit(item) {
        console.log(item);
        set(item, 'isEdit', true);
    }


    // 
    @action
    handleStatus(item) {
        console.log(item.active_status);
        set(item, 'active_status', !item.active_status);
        item.save();
    }


    // 
    @action handleCancel(item) {
        set(item, 'isEdit', false);
        item.rollbackAttributes()
    }


    // 
    @action handleSave(item) {
        console.log('item to be saved', item);

        console.log(item.inv_type, item.description);
        // checking validation to know if any of the field is empty!
        if (item.inv_type == '' || item.description == '') {
            alert('Input field can not be empty');
        } else {
            set(item, 'isEdit', false);
            item.save();
        }
    }


    // for switch //
    @action
    handleStatusChange(item, event) {
        console.log('dropdown changed item', item);
        console.log('value of dropdown', event.target.value);
        set(item, 'active_status', !event.target.value)
    }




    // 
    @action
    handleInputType(inv_type, event) {
        console.log(event.target.value);
        console.log('type', inv_type);
    }



    // to track selected status
    @action
    HandleStatus(item, event) {
        console.log(item);
        const value = event.target.checked;
        set(item, 'has_tables', value);
        console.log(item, value);
    }



    // input fields
    @action
    handleInputChange() {
        console.log('inputchange', this.inputFieldNumbers);
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
        // console.log(this.inputFieldNumbers.length);
        // validation
        const lastObject = this.inputFieldNumbers[this.inputFieldNumbers.length - 1];

        // to check if the input field has data.
        if (this.inputFieldNumbers.length == 0 || !Object.values(lastObject).some(value => value === null)) {
            this.inputFieldNumbers.pushObject({ 'type': null, 'description': '', 'has_tables': false });
        } else {
            if (Object.values(lastObject).some(value => value === null || value === '')) {
                alert('insert data');
            }
        }
        console.log(this.inputFieldNumbers.length);
    }



    // HandleSave
    @action
    async HandleSave() {

        // saved this data to the server POST createRecord
        console.log('save inventory category:', this.postItems);
        // console.log(this.inputFieldNumbers);

        // const lastObj = this.inputFieldNumbers[this.inputFieldNumbers.length - 1];

        // if (this.inputFieldNumbers.length === 1) {
        //     if (this.inputFieldNumbers[0].type === null) {
        //         alert("Please insert data");
        //         return
        //     }
        // } else {
        //     if (lastObj.type === null && lastObj.description !== "") {
        //         alert("Please insert data");
        //         return
        //     }
        // }

        // if (lastObj.type === null && lastObj.description === "") {
        //     this.inputFieldNumbers.removeObject(lastObj);
        //     console.log("Removed object:", lastObj);
        // }

        // this.isLoadingPOST = true;
        // const newInventoryType = await this.store.createRecord('inventory/inventory-type',
        //     {
        //         inventory_types: this.inputFieldNumbers.map((singleObj) => ({
        //             inv_type: singleObj.type,
        //             description: singleObj.description,
        //             has_tables: singleObj.has_tables,
        //         }))
        //     },
        // );
        // newInventoryType.save().then((savedInventory) => {
        //     // The record has been saved successfully
        //     console.log(savedInventory);
        //     this.isLoadingPOST = false;
        //     this.inputFieldNumbers = A([]);
        // })
        //     .catch((error) => {
        //         console.error('Error saving inventory:', error);
        //         alert(error);
        //     });
    }


}
