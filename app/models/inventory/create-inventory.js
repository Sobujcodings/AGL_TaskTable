import Model, { attr } from '@ember-data/model';

export default class InventoryCreateInventoryModel extends Model {

    @attr() sku;
    @attr() name;
    @attr() description;
    @attr() fulldescription;
    @attr() active_status;
    @attr() inventory_type;
    @attr() storage_type;
    @attr() allocation_type;
    @attr() unit_of_measure;
    @attr() manufacturing_date;
    @attr() expiry_data;   
    @attr() create_inventory;   
}
