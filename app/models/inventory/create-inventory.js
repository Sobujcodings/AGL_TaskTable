import Model, { attr } from '@ember-data/model';

export default class InventoryCreateInventoryModel extends Model {

    @attr() sku;
    @attr() inv_name;
    @attr() description;
    @attr() full_description;
    @attr() inventory_type;
    @attr() storage_type;
    @attr() alloc_type;
    @attr() unit_of_measure;
    @attr() manufacturing_date;
    @attr() expire_date;   
    @attr() category_name;   
    @attr() category_type;   
    @attr() inv_type;   
    @attr() measure_type;   
    @attr() create_inventory;   
    @attr() active_status;   

}
