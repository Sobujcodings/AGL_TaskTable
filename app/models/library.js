import Model, { attr } from '@ember-data/model';

// LibraryModel 
// LibraryAdapter 

// When you create a model, the name should be singular and capitalized in CamelCase. For example, if you're modeling "libraries," the model should be named Library.

export default class LibraryModel extends Model {
    @attr('string') _id;
    @attr('string') name;
    @attr('string') address;
    @attr('string') phone;
}
