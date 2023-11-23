import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SeederComponent extends Component {
  @service store;
  @service router;

  @tracked Library;
  @tracked loading = false;
  @tracked allLibrary;

  @tracked generateAuthor;

  @tracked authorLength;
  @tracked booksLength;

  // (get library data) show that library length to the UI
  // This is a common pattern for fetching and initializing data in Ember and Glimmer components. It ensures that the data is loaded as early as possible in the component's lifecycle. Once the data is available, it can be used in the component's template to render the UI, as demonstrated in your code.
  @tracked libraryData = null;

  // this.loadLibraryData(); is a call to the loadLibraryData method within your component. This method is responsible for fetching the library data. By invoking it in the constructor, you ensure that the data fetching process starts as soon as an instance of your component is created.
  // super(...arguments) is a call to the parent class's constructor. In this case, you're extending Component, which is a part of Ember or Glimmer's component hierarchy. super(...arguments) ensures that the necessary setup for the component is performed.
  constructor() {
    super(...arguments);
    this.loadLibraryData();
    this.loadAuthorData();
  }

  async loadLibraryData() {
    try {
      // store findall means fetching here through store
      const libraries = await this.store.findAll('library');
      // const libraries = await this.store.peekAll('library');
      // console.log(libraries);
      // console.log(libraries.length);
      const arrayLength = libraries.length;
      // console.log(arrayLength);
      this.libraryData = arrayLength;
      // console.log(this.libraryData);
      // location.reload();
      // console.log('hello');
      // console.log(this.loading);
      if (libraries) {
        // console.log('loading');
        this.loading = !this.loading;
        // console.log(this.loading);
      }
    } catch (error) {
      console.error('Error fetching library data:', error);
      // Handle errors if needed
    }
  }

  // POST generate library(with fixed data) via number of times
  @action
  async generateLib() {
    if (!this.Library || this.Library <= 0 || this.Library > 100) {
      alert('Invalid number');
      return;
    }

    for (let index = 1; index <= this.Library; index++) {
      const newLibrary = this.store.createRecord('library', {
        name: 'Shanahan, Lakin and Legros Library',
        address: '77604 Howe Light, Port Reymundoburgh',
        phone: '1-021-040 - 2468',
      });

      try {
        await newLibrary.save();
        this.libraryData = '';
        // if (newLibrary) {
        // TODO: Loop shesh hole loading opposite(true korbo)
        this.loading = !this.loading;
        // console.log(this.loading);
        // }
      } catch (error) {
        console.error(error);
      }
    }
    // Reload the page
    location.reload();
  }

  // delete(destroy all libraries) the whole all library destry all
  @action
  async handleDelete() {
    // jetake delete korbo shetake dhore filter kore .destroy kore dibo but ekhane all destroy korbo tai sobgula kei dhorbo
    const allLibrary = this.store.peekAll('library');
    console.log(allLibrary);
    // to track the total library exist now match that with index to know if for each is completed or not
    // this.allLibrary = allLibrary;

    try {
      let deletedComplt = false;
      allLibrary.forEach(async (singleLibrary, index) => {
        // console.log(singleLibrary);
        // console.log(index); 0 1 2 3
        console.log(index);
        if (index === allLibrary.length - 1) {
          // console.log('deleteed all');
          deletedComplt = true;
        }
        // now we will delete or destroy each one
        await singleLibrary.destroyRecord();
      });
      if (deletedComplt) {
        this.loading = !this.loading;
        // console.log('totaly cmplt');
        // this.loadLibraryData();
        // location.reload();
        setTimeout(function () {
          location.reload();
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
    // location.reload();
  }

  // get authors with books data
  // // get the data automatically by construct
  // const author = this.store.findAll('author');
  // console.log(author);

  // constructor() {
  //     super(...arguments);
  //     this.loadAuthorData();
  // }

  @action
  async loadAuthorData() {
    try {
      // store findall means fetching here through store
      const authors = await this.store.findAll('author');
      // console.log(authors);
      // console.log(authors.length);

      // setting the length to the state to use it in the component
      this.authorLength = authors.length;
      let totalBooks = 0;
      authors.forEach((author, index) => {
        // console.log(author);
        // console.log(typeof (author.books));
        // database theke ashle abar string hoye jay so atake abr split kore array banate hobe
        // console.log(index);
        if (typeof author.books === 'string') {
          const booksArray = author.books.split(',');
          // console.log(booksArray);
          totalBooks += booksArray.length;
        } else {
          // console.log(author.books.length);
          totalBooks += author.books.length;
        }
      });
      // loop r bayre jeye akbare final state declare kore dite hobe
      this.booksLength = totalBooks;
      console.log(totalBooks);
      // console.log(this.libraryData);
      // location.reload();
      // console.log('hello');
      // console.log(this.loading);
      // if (libraries) {
      //     // console.log('loading');
      //     this.loading = !this.loading;
      //     // console.log(this.loading);
      // }
    } catch (error) {
      console.error('Error fetching library data:', error);
      // Handle errors if needed
    }
  }

  // Generate authors with books
  // {Author, Books{abc,bsbf,sdksdfk}, Release Year, Library},
  // {Alec Sch,Books{Tasty Frozen Sausages,Tasty Frozen Sausages},Cookbook,Wed Jan 01 1969 06:00:00 GMT+0600 (Bangladesh Standard Time),Shanahan, Lakin and Legros Library Address: 77604 Howe Light, Port Reymundoburgh Phone: 1-021-040 - 2468 Number of books: 01 }

  // TODO: make adapter is same but model is different

  @action
  async generateAuthors() {
    console.log('generated authors');
    console.log(this.generateAuthor);
    if (
      !this.generateAuthor ||
      this.generateAuthor <= 0 ||
      this.generateAuthor > 100
    ) {
      alert('Invalid number');
      this.generateAuthor = '';
      return;
    }

    // to know where is the loop finished. An array to store promises for saving authors
    const savePromises = [];

    for (let index = 1; index <= this.generateAuthor; index++) {
      const newAuthor = this.store.createRecord('author', {
        idd: '1',
        author: 'Alec Sch',
        books: [
          'Tasty Frozen Sausages Cookbook',
          'Ergonomic Metal Bike Cookbook',
          'Small Soft Chair Cookbook',
          'Practical Plastic Chair Cookbook',
          'Unbranded Metal Towels Cookbook',
        ],
        release: 'Wed Jan 01 1969 06:00:00 GMT+0600 (Bangladesh Standard Time)',
        library: 'vicic',
      });

      const savePromise = newAuthor.save();
      savePromises.push(savePromise);
    }

    try {
      // Wait for all save operations to complete
      await Promise.all(savePromises);
      console.log('Authors created successfully');
      this.generateAuthor = '';

      // Now that the authors are created, fetch author data
      await this.loadAuthorData();
    } catch (error) {
      console.error(error);
    }
  }

  // delete all authors with books
  @action
  async DeleteAllAuthors() {
    console.log('all deleted');
    const authors = await this.store.peekAll('author');
    console.log(authors);

    authors.forEach(async (author, index) => {
      console.log(index);
      console.log(author);
      await author.destroyRecord();
    });
    // await this.loadAuthorData();
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
}
