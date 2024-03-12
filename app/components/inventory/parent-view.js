import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { v1, v4 as uuid } from 'ember-uuid';

export default class InventoryParentViewComponent extends Component {
    @service store;

    @tracked isLoadingPOST;

    @tracked categories = A([]);
    @tracked postItems = A([])

    @action
    addParentCategory() {
        let category = {
            id: uuid(),
            category_name: '',
            children: A([]),
            parent_id: null,
            inv_type: '',
            category_type: '',
            country: '',
            parent_name: null,
        };
        // if the categories last obj data is null then dont insert another obj into it.
        // console.log('categories',this.categories);
        if (this.args.items.length != 0) {
            const lastObj = this.args.items[this.args.items.length - 1];
            console.log('lastobj', lastObj);
            if (lastObj.category_name && lastObj.category_type && lastObj.inv_type && lastObj.country) {
                this.args.items.pushObject(category);
            }
            else {
                alert('insert data before adding another one field')
            }
        }
        else {
            this.args.items.pushObject(category);
        }
    }

    @action
    flattenTree(tree) {
        const result = A([]);

        const flattenNode = (node, parentId = null, parent_name = null) => {

            // TODO: if node.name is empty then dont push this child
            const flatNode = {
                id: node.id,
                category_name: node.category_name,
                parent_id: node.parent_id,
                inv_type: node.inv_type,
                category_type: node.category_type,
                country: node.country,
                parent_name: parent_name,
            };

            result.push(flatNode);

            if (node.children) {
                node.children.forEach((child) => {
                    flattenNode(child, node.id, node.name);
                });
            }
            // 
        };

        tree.forEach((rootNode) => {
            flattenNode(rootNode);
        });

        return result;
    }


    @action
    async onSave() {
        console.log('inventory category save:', this.postItems);
        // let result = this.flattenTree(this.args.items);
        // this.isLoadingPOST = true;
        // const newInventoryCatagory = await this.store.createRecord('inventory/inventory-category',
        //     {
        //         inventory_category: result.map((singleObj) => ({
        //             id: singleObj.id,
        //             parent_id: singleObj.parent_id,
        //             inv_type: singleObj.inv_type,
        //             country: singleObj.country,
        //             category_name: singleObj.category_name,
        //             category_type: singleObj.category_type,
        //         }))
        //     },
        // );
        // newInventoryCatagory.save().then((savedInventory) => {
        //     // The record has been saved successfully
        //     console.log(savedInventory);
        //     // reset fields
        //     this.categories = A([]);
        //     this.isLoadingPOST = false;
        //     // this.result = A([]);
        // })
        //     .catch((error) => {
        //         console.error('Error saving inventory:', error);
        //         alert(error);
        //     });
    }




}


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
// }