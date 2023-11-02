import Model, { attr } from '@ember-data/model';

// LibraryModel
// LibraryAdapter
// When you create a model, the name should be singular and capitalized in CamelCase.
// For example, if you're modeling "libraries," the model should be named Library.
// model plural name will be yours endpoint name if you refer this model in you HTTP request
// model name will be define the endpoint of the api of that model

export default class LibraryModel extends Model {
  // backend e _id k unique id banalam then id k save koralm store e r _id ata arekta attaribute r nam rakhlam
  // _id attaribute ekhane dileo kichu pabona karon beckend _id k id baniye felchi sheta default id diyei store e save hoye jabe
  @attr('string') _id;
  @attr('string') name;
  @attr('string') address;
  @attr('string') phone;
}
