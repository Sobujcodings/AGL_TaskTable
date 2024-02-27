import Model, {attr} from '@ember-data/model';

export default class InventoryStorageTypeModel extends Model {
    // @attr('string') created_at;
    // @attr('string') created_by;
    // @attr('string') updated_at;
    // @attr('string') updated_by;
    // @attr('string') description;
    @attr('string') storage_type;
    @attr('boolean') active_status;
}
