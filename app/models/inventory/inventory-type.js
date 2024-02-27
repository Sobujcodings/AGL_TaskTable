import Model, { attr } from '@ember-data/model';

export default class InventoryInventoryTypeModel extends Model {
    @attr('string') inv_type;
    // @attr('date') created_at;
    // @attr created_by;
    // @attr('boolean') has_tables;
    // @attr('date') updated_at;
    // @attr updated_by;
    @attr('string') description;
    @attr('boolean') active_status;
}
