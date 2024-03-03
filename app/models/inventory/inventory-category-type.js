import Model, {attr} from '@ember-data/model';

export default class InventoryInventoryCategoryTypeModel extends Model {
    
    @attr('') inventory_category_type;
    @attr('') country;
    @attr('boolean') active_status;
    @attr('string') category_type;
    // @attr('string') id;
    // @attr('date') created_at;
    // @attr('') created_by;
    // @attr('date') updated_at;
    // @attr('') updated_by;
}
