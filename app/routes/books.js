import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BooksRoute extends Route {
  @service store;
  // @tracked booksarray;
  // TODO: has to make a individual array with each loop item with the auhtor relaease and library and make until meets the totolBooks.length (and in teampalte iterate through each array then show it in different row of table)
  async model() {
    let authors = await this.store.findAll('author');
    // console.log(authors);
    // In your model hook, you fetch the parsed data and create an array of objects from it. For each object in this array, you generate the booksArray by splitting the books string.
    // In your template, you can now access both parsed and parsed.booksArray
    let booksarray = [];
    let booksLength = 0;
    authors.forEach((element) => {
      // console.log(element);
      element.booksArray = element.books.split(',');
      // console.log(element.booksArray.length);
      booksLength += element.booksArray.length;
      element.booksLength = booksLength;
      element.booksArray.forEach((book) => {
        // console.log(book);
        booksarray.push(book);
      });
      element.totalBooks = booksarray;
    });
    return authors;
  }
}
