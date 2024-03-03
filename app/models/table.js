// import { hasMany } from '@ember-data/model';
import Model, { attr } from '@ember-data/model';

export default class TableModel extends Model {
    // @attr('string') id;
    @attr('string') idd;
    @attr("string") name;
    @attr() column;
    @attr() row;
    // @attr("string") column;
    // @attr("string") row;
    // @attr("string") isEdited;
}
