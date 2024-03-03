import Model from '@ember-data/model';

export default class InventoryInventoryCategoryModel extends Model {
    @attr('') category_name;
    @attr('') parent_id;
    @attr('') category_type;
    @attr('') inv_type;
    @attr('') country;
}
