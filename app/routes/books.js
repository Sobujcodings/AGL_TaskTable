import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BooksRoute extends Route {
  @service store;
  // @tracked booksarray;
  // TODO: has to make a individual array with each loop item with the auhtor relaease and library and make until meets the totolBooks.length (and in teampalte iterate through each array then show it in different row of table)
  async model() {
    let authors = await this.store.findAll('author');
    // let element;
    // // console.log(authors);
    // // In your model hook, you fetch the parsed data and create an array of objects from it. For each object in this array, you generate the booksArray by splitting the books string.
    // // In your template, you can now access both parsed and parsed.booksArray
    // // let booksarray = [];
    // let response = [];
    // let booksLength = 0;
    let array = [];
    let libraryArray = [];
    authors.forEach((element) => {
      console.log(element);
      console.log(element.books);
      array.push(element.author);
      console.log(array);
      element.totalauthors = array;
      console.log(element);
      // libraray array for dropdown menu
      libraryArray.push(element.library);
      console.log(libraryArray);
      element.totalibraries = libraryArray;
    });
    //   element.booksArray = element.books.split(',');
    //   // console.log(element.booksArray.length);
    //   booksLength += element.booksArray.length;
    //   element.booksLength = booksLength;

    //   let book = [];
    //   // let book2 = [];
    //   // let book3 = [];
    //   // let book4 = [];
    //   // let book5 = [];

    //   // console.log(response1);

    //   for (let index = 0; index < element.booksArray.length; index++) {
    //     const singleBook = element.booksArray[index];
    //     // console.log(singleBook);
    //     book.push(singleBook);
    //   }

    //   const response1 = { 'author': element.author, 'book': book[0], 'release': element.release, 'library': element.library };
    //   const response2 = { 'author': element.author, 'book': book[1], 'release': element.release, 'library': element.library };
    //   const response3 = { 'author': element.author, 'book': book[2], 'release': element.release, 'library': element.library };
    //   const response4 = { 'author': element.author, 'book': book[3], 'release': element.release, 'library': element.library };
    //   const response5 = { 'author': element.author, 'book': book[4], 'release': element.release, 'library': element.library };
    //   // console.log(book);
    //   // console.log(response1);

    //   // let response = [];
    //   response.push(response1);
    //   response.push(response2);
    //   response.push(response3);
    //   response.push(response4);
    //   response.push(response5);

    //   // console.log(response);
    //   // setting another property inside the element that contains all the single element with single author,book, relaease n all
    //   element.singleData = response;
    //   element = response;
    //   console.log(element);

    //   //   // console.log(book);
    //   //   booksarray.push(book);
    //   // });
    //   // element.totalBooks = booksarray;
    // });
    console.log(authors);
    return authors;
  }
}
