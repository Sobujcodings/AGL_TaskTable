// app/adapters/book.js
import JSONAPIAdapter from '@ember-data/adapter/json-api';
// import RESTAdapter from '@ember-data/adapter/rest';
// RESTAdapter

// Adapter Naming: Adapters correspond to models, so the adapter for the Library model should be named LibraryAdapter. If you're extending the default adapter (e.g., JSONAPIAdapter), you should still use the model
// * host(localhost) + model(plural name)endpoint = total api

export default class LibraryAdapter extends JSONAPIAdapter {
  host = 'http://localhost:5000'; // Base API URL
  namespace = ''; // Optional: API namespace

  // Define a custom URL for the create operation (POST)
  // urlForCreateRecord() {
  //   // In this case, you want to use the '/libraries' endpoint for creating new records
  //   return `${this.host}/postdata`;
  // }
}
