import Model, { attr } from '@ember-data/model';

export default class InventoryAllocationTypeModel extends Model {
    @attr('') allocation_types;
    @attr('string') alloc_type;
    // @attr('date') created_at;
    // @attr('string') created_by;
    // @attr('date') updated_at;
    // @attr('string') updated_by;
    @attr('string') description;
    @attr('boolean') active_status;
}
