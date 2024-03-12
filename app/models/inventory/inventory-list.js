import Model, { attr } from '@ember-data/model';

export default class InventoryInventoryListModel extends Model {
    @attr('') sku;
    @attr('') inv_name;
    @attr('') inv_type;
    @attr('') description;
    @attr('') full_description;
    @attr('') category_type;
    @attr('') category_name;
    @attr('') storage_type;
    @attr('') alloc_type;
    @attr('') measure_type;
    @attr('') manufacturing_date;
    @attr('') expire_date;
    @attr('') active_status;
    @attr('') inv_cat_id;
    @attr('') create_inventory;
    // @attr('') data;
}
