import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class InventoryComponent extends Component {
    @tracked inventory;


    @action changeInventoryType(type) {
        this.inventory = type;
        $('#inventoryModalContent').modal('show');
    }
    // names = ['Stefan', 'Miguel', 'Tomster', 'Pluto'];

}



