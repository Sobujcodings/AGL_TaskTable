import Route from '@ember/routing/route';

export default class AuthorsRoute extends Route {
  async model() {
    let response = await fetch('http://localhost:5000/libraries');
    let parsed = await response.json();
    return parsed;
    // return this.store.findAll('library');
  }
}
