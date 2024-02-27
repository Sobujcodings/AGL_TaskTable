import Model, {attr} from '@ember-data/model';

export default class InventoryInventoryCategoryTypeModel extends Model {
    // @attr('string') id;
    @attr('') country;
    // @attr('date') created_at;
    // @attr('') created_by;
    // @attr('date') updated_at;
    // @attr('') updated_by;
    @attr('boolean') active_status;
    @attr('string') category_type;
}
