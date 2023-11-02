import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class AuthorAdapter extends JSONAPIAdapter {
  host = 'http://localhost:5000'; // Base API URL
  namespace = ''; // Optional: API namespace
}
