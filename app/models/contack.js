import Model, { attr } from '@ember-data/model';

export default class ContackModel extends Model {
  @attr('string') _id;
  @attr('string') email;
  @attr('string') message;
  @attr('string') invitation;
  // @attr('string') phone;
}
