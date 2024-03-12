import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';


export default class InventoryInventoryModalComponent extends Component {
    @service fetchdata;
    @service store;

    // @tracked SelectedInventory = this.args.inventoryType;


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
        console.log(this.args.inventoryType);
        let allRecords = this.store.peekAll(`inventory/${this.args.inventoryType}`);
        console.log(allRecords);
        allRecords.forEach(element => {
            set(element, 'isEdit', false);
            element.rollbackAttributes();
        });
    }
}
