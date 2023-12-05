import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

// TODO: edit the author name and library

export default class BooksComponent extends Component {
  // @tracked Data = this.args.model;

  @service store;
  @service router;

  @tracked Clicked = false;
  @tracked authorClicked = false;
  @tracked libarayClicked = false;

  @service store;
  @service router;

  @tracked inputValue;

  @tracked clicked = false;
  @tracked save;
  @tracked id;

  // title edit
  @action
  handleTitle(element) {
    console.log(element);
    this.Clicked = !this.Clicked;
    element.set('isClicked', this.Clicked);
    console.log(this.Clicked);

    let parsed = this.store.peekAll('author');
    this.inputData = parsed;

    // TODO: True hoye kaj shesh hoye gele abar false baniye deo
    this.Clicked = !this.Clicked;
  }

  @action
  async handleSave(saveORtrue, item) {
    console.log(item);
    // save == true
    // cancel = false
    console.log(saveORtrue);
    const name = this.inputValue;
    // true false jetay pai sheta save r moddhe diye dibo
    this.save = saveORtrue;
    // save e click korle akta true false korbo then shetar opor base kore post korbo true hole

    if (saveORtrue == true) {
      if (this.inputValue == null) {
        alert('edit the title to save');
        return;
      }

      // item.set('books',this.inputValue);

      // post methord chalabo with these updated author name otherwise go to the previous position
      // with this value this.inputvalue to be posted
      // property set kore model e record ta set korlam sheta diyei abar template e set korlam
      this.clicked = !this.clicked;
      item.set('isClicked', this.clicked);

      // DO some operation if needed (POST) (id to pashe diyei dibo)
      this.store.findRecord('author', item.id).then(function (author) {
        // ...after the record has loaded
        // Update the record with new data
        author.set('books', name);

        // Save the record to persist the changes to the backend
        // saving means hit the api (saveeditdata is the data we get from the response of this fetch)
        author
          .save()
          .then(function (savedLibrary) {
            // The record has been successfully updated on the server.
            console.log('Updated library:', savedLibrary);
            // alert('Author has been edited');
            location.reload();
          })
          .catch(function (error) {
            // Handle any errors that may occur during the save operation.
            console.error('Error updating library:', error);
          });
      });
      // const allAuthors = this.store.peekAll('author');
      // this.inputData = allAuthors;
    } else {
      // that means input file hide kore felo
      // console.log(this.element);
      console.log('cancel');
      // this.clicked = this.clicked;
      item.set('isClicked', this.clicked);
    }
  }

  // // to get the input value data
  @action
  handleInput(event) {
    console.log(event.target.value);
    this.inputValue = event.target.value;
    console.log(this.inputValue);
  }

  // just to change the UI
  // ai actio funcitn r sathe oi input value data ta padhiye diyechi
  // @action
  // handleEdit(authorItem) {
  //     // console.log(authorItem.id);
  //     // Set this.clicked to a specific boolean value
  //     this.clicked = !this.clicked; // or any specific boolean value

  //     // Set the isClicked property on the authorItem
  //     authorItem.set('isClicked', this.clicked);
  //     // console.log(authorItem);

  //     let parsed = this.store.peekAll('author');
  //     this.inputData = parsed;

  //     // make it again oposite so that cant click twice to make it false again then true
  //     // this.clicked = !this.clicked; // or any specific boolean value
  // }

  // TODO: Edit on author book then title then library
  @action
  handleAuthor(element) {
    console.log('clicked');
    console.log(element);
    this.authorClicked = !this.authorClicked;
    console.log(this.authorClicked);
    // element.isClicked = this.authorClicked;
    element.set('authorClicked', this.authorClicked);
    console.log(element);
    this.authorClicked = !this.authorClicked;
  }

  @action
  handleCancel(element) {
    console.log('cancel');
    console.log(this.authorClicked);
    console.log(element);
    element.set('authorClicked', this.authorClicked);
    // this.authorClicked = !this.authorClicked;
    console.log(this.authorClicked);
    console.log(element);
  }

  // for author dropsdown edit
  @action
  handleAuthorSelection(element, event) {
    // console.log(this.authorClicked);
    element.set('authorClicked', this.authorClicked);
    // console.log(element);
    // console.log(this.authorClicked);
    const selectedAuthor = event.target.value;
    console.log('Selected Author:', selectedAuthor);
    // console.log(element);
    // *** age model e set replace korbo then edit request korbo
    element.set('author', selectedAuthor);
    console.log(element);
    // now jei value ta event diye pelam sheta diye ei element r author k replace kore dibo
    // now create a Edit Request to do it (by library.set('athor', value)) to replace this

    this.store.findRecord('author', element.id).then(function (author) {
      // ...after the record has loaded
      // Update the record with new data
      author.set('author', selectedAuthor);

      // Save the record to persist the changes to the backend
      // saving means hit the api (saveeditdata is the data we get from the response of this fetch)
      author
        .save()
        .then(function (savedauthor) {
          // The record has been successfully updated on the server.
          console.log('Updated library:', savedauthor);
          // alert('Author has been edited');
          // location.reload();
        })
        .catch(function (error) {
          // Handle any errors that may occur during the save operation.
          console.error('Error updating library:', error);
        });
    });
  }

  // edit the libaray via dropdown menu
  // cancel e oi element r vhitore clicked k true korcho shetake abar false kore dite hobe
  @action
  handleCancelLibrary(element) {
    // this.libarayClicked = this.libarayClicked;
    element.set('libarayClicked', this.libarayClicked);
  }

  // change the UI(condition)
  @action
  handleLibraray(element) {
    console.log('clicked');
    console.log(element);
    this.libarayClicked = !this.libarayClicked;
    console.log(this.libarayClicked);
    // element.isClicked = this.libarayClicked;
    element.set('libarayClicked', this.libarayClicked);
    console.log(element);
    this.libarayClicked = !this.libarayClicked;
  }

  // main function to edit
  @action
  handleLibrarySelection(element, event) {
    // console.log(this.authorClicked);
    element.set('libarayClicked', this.libarayClicked);
    console.log(element);
    // console.log(this.authorClicked);
    const selectedLibrary = event.target.value;
    console.log('Selected Author:', selectedLibrary);

    // now jei value ta event diye pelam sheta diye ei element r author k replace kore dibo
    // now create a Edit Request to do it (by library.set('athor', value)) to replace this

    this.store.findRecord('author', element.id).then(function (author) {
      // ...after the record has loaded
      // Update the record with new data
      author.set('library', selectedLibrary);

      // Save the record to persist the changes to the backend
      // saving means hit the api (saveeditdata is the data we get from the response of this fetch)
      author
        .save()
        .then(function (savedauthor) {
          // The record has been successfully updated on the server.
          console.log('Updated library:', savedauthor);
          // alert('Author has been edited');
          // location.reload();
        })
        .catch(function (error) {
          // Handle any errors that may occur during the save operation.
          console.error('Error updating library:', error);
        });
    });
  }
}
