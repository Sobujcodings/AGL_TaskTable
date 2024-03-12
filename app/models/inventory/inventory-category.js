import Model, { attr } from '@ember-data/model';

export default class InventoryInventoryCategoryModel extends Model {
    @attr('') category_name;
    @attr('') parent_id;
    @attr('') category_type;
    @attr('') inv_type;
    @attr('') country;
    @attr('') created_by;
    @attr('') inventory_category;
    @attr('') parent_name;
}
