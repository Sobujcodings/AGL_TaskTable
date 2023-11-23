import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AuthorsComponent extends Component {
  @tracked inputData = this.args.model;
  // @tracked inputData = this.args.model[0];

  @service store;
  @service router;

  @tracked inputValue;

  @tracked clicked = false;
  @tracked save;

  @tracked id;

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
      // post methord chalabo with these updated author name otherwise go to the previous position
      // with this value this.inputvalue to be posted

      // property set kore model e record ta set korlam sheta diyei abar template e set korlam
      this.clicked = !this.clicked;
      item.set('isClicked', this.clicked);
      console.log('posted');
      // setTimeout(() => {
      //     location.reload();
      // }, 100);

      // DO some operation if needed (POST) (id to pashe diyei dibo)
      this.store.findRecord('author', item.id).then(function (author) {
        // ...after the record has loaded
        // Update the record with new data
        author.set('author', name);

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
      this.clicked = !this.clicked;
      console.log('canceled');
      console.log(item.id);
      // item.set('isClicked', this.clicked);
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
  @action
  handleEdit(authorItem) {
    // console.log(authorItem.id);
    // Set this.clicked to a specific boolean value
    this.clicked = !this.clicked; // or any specific boolean value

    // Set the isClicked property on the authorItem
    authorItem.set('isClicked', this.clicked);
    // console.log(authorItem);

    let parsed = this.store.peekAll('author');
    this.inputData = parsed;
  }
}
