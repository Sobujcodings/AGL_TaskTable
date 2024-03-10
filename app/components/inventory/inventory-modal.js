import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';


export default class InventoryInventoryModalComponent extends Component {
    @service fetchdata;
    @service store;

    @tracked items = this.store.peekAll('inventory/inventory-type');


    // if modal is closed then we know it from here then get the findAll data which might be edited from the modal then rollbackattributes that whole model value or each model item using service to catch the model value after findAll.
    @action
    insertForModal(handleItemsToNull) {
        // console.log(this.fetchdata);
        $('#inventoryModalContent').on('hidden.bs.modal', function (event) {
            // do something...
            console.log('modal closed');
            // get the fetchdata form which component is open and set the item/fetch data to null to reset that. 
            // console.log(fetchdata.items);
            // fetchdata.items = null;
            // console.log(items);
            // items = null;
            handleItemsToNull();
        })
    }


    @action
    handleItemsToNull() {
        let allRecords = this.store.peekAll('inventory/inventory-type');
        allRecords.forEach(element => {
            set(element, 'isEdit', false);
            element.rollbackAttributes();
        });
    }



    //X
    inventoryCategoryTypeColumns = [
        {
            column_name: 'id',
            column_property: 'id',
        },
        {
            column_name: 'sojib',
            column_property: 'sojib',
        },
        {
            column_name: 'soboz address',
            column_property: 'soboz',
        },
        {
            column_name: 'ronjib type',
            column_property: 'ronjib',
        },
    ]
}
