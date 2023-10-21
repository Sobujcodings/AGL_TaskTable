import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

// Route Naming: Route names should be in kebab-case, plural form of the model name. 
// If the model is Library, the route should be libraries.

export default class LibraryRoute extends Route {
  @service store;

  // shei id diye fetch r kaj gulo korbo ekhane just
  // id ta padhlam edit r option(inputcard theke)
  async model(params) {
    console.log(params.id);

    // let response = await fetch('http://localhost:5000/libraries');
    // let parsed = await response.json();
    // console.log(parsed);

    // library (model name)
    // age j get kore store e rekhecilam shei store theke shei model(library) nam diye niye nilam get r data
    let parsed = await this.store.peekAll('library');
    console.log(parsed);

    // filtering the click card by the id
    let filterCard = parsed.filter((card) => card.id.includes(params.id));
    console.log(filterCard);
    // parsed means all filtercard means filterdcards
    return { parsed, filterCard };
  }

  // async model(params) {
  //     console.log(params.id);
  // }
}
