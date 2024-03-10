import Model, { attr } from '@ember-data/model';

export default class InventoryInventoryTypeModel extends Model {
    @attr('') inventory_types;
    @attr('string') inv_type;
    @attr('string') description;
    @attr('') active_status;
    @attr('') created_by;
    // @attr('date') created_at;
    // @attr('boolean') has_tables;
    // @attr('date') updated_at;
    // @attr updated_by;
}
