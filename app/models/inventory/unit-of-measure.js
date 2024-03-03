import Model, { attr } from '@ember-data/model';

export default class InventoryUnitOfMeasureModel extends Model {

    @attr('') unit_of_measure;
    @attr('string') short;
    @attr('string') measure_type;
    @attr('boolean') active_status;
    // @attr('date') created_at;
    // @attr('string') created_by;
    // @attr('date') updated_at;
    // @attr('string') updated_by;
}
