import Model, {attr} from '@ember-data/model';

export default class InventoryInventorytypeModel extends Model {
    @attr('string') id;
    @attr() type;
    @attr() description;
    @attr() status;
}
