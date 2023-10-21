import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

// Route Naming: Route names should be in kebab-case, plural form of the model name. If the model is Library, the route should be libraries.
// In this route, you use the store service to call findAll('library'), which tells Ember Data to fetch all records of the library model from the API.

export default class LibrariesRoute extends Route {
  @service store;

  async model() {
    // let response = await fetch('http://localhost:5000/libraries');
    // let parsed = await response.json();
    // // console.log(parsed);
    // return parsed;
    // here library is the model name
    const parsed = await this.store.findAll('library');
    // console.log(parsed);
    return parsed;
  }
}
