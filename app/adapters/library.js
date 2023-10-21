// app/adapters/book.js
import JSONAPIAdapter from '@ember-data/adapter/json-api';

// Adapter Naming: Adapters correspond to models, so the adapter for the Library model should be named LibraryAdapter. If you're extending the default adapter (e.g., JSONAPIAdapter), you should still use the model 

export default class LibraryAdapter extends JSONAPIAdapter {
    host = 'http://localhost:5000'; // Base API URL
    namespace = ''; // Optional: API namespace
}