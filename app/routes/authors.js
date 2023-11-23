import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
// import { tracked } from '@glimmer/tracking';

export default class AuthorsRoute extends Route {
  @service store;
  // @tracked booksarray;

  async model() {
    // let response = await fetch('http://localhost:5000/libraries');
    // let parsed = await response.json();
    // return parsed;
    // return this.store.findAll('library');
    let parsed = await this.store.findAll('author');
    // console.log(parsed);
    // parsed.forEach((item) => {
    //   console.log(item);
    // });
    // In your model hook, you fetch the parsed data and create an array of objects from it. For each object in this array, you generate the booksArray by splitting the books string.
    // In your template, you can now access both parsed and parsed.booksArray
    parsed.forEach((element) => {
      // console.log(element.books);
      // prottek tar vhitore notun akta object toyri kore dilam shetakei nibo template e
      element.booksArraay = element.books.split(',');
      // console.log(booksArraay);
      // this.booksarray = booksArraay;
      // element.books.split(',').forEach((item) => {
      //   // console.log(item);
      // });
    });
    //
    return parsed;
  }
}
