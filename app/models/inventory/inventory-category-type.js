import Model, { attr } from '@ember-data/model';

export default class InventoryInventoryCategoryTypeModel extends Model {

    @attr('') inventory_category_type;
    @attr() country;
    @attr('') category_type;
    @attr('boolean') active_status;
    @attr('') created_by;
    // @attr('string') id;
    // @attr('date') created_at;
    // @attr('date') updated_at;
    // @attr('') updated_by;
}
