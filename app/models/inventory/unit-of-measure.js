import Model, {attr} from '@ember-data/model';

export default class InventoryUnitOfMeasureModel extends Model {
    @attr('string') short;
    // @attr('date') created_at;
    // @attr('string') created_by;
    // @attr('date') updated_at;
    // @attr('string') updated_by;
    @attr('string') measure_type;
    @attr('boolean') active_status;
}
