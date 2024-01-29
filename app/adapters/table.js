// adapters/table.js
import RESTAdapter from '@ember-data/adapter/rest';

export default class TableAdapter extends RESTAdapter {
  host = 'http://localhost:5000';
  namespace = '';
}
