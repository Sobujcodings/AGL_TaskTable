import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ContackComponent extends Component {
  @service store;
  @service router;

  @tracked email;
  @tracked message;

  @action
  handleTextArea(event) {
    // console.log('textarea');
    // console.log(event.target.value);
    this.message = event.target.value;
  }

  @action
  async handleSubmit(event) {
    event.preventDefault();

    // Access form values directly from tracked properties
    console.log('Email:', this.email);
    console.log('Message:', this.message);

    if (this.message.length < 5) {
      alert('must be atleast 5 characters');
      return;
    }

    // Perform further actions, such as sending data to a server

    // Optionally, you can reset the form fields by clearing tracked properties
    // this.email = '';
    // this.message = '';

    // Post request
    // ember data post store then save() means post that  here library is the model name that defines the libraries api endpoint
    const newContack = await this.store.createRecord('contack', {
      email: this.email,
      message: this.message,
      // to fill the invitation blank space in DB
      invitation: 'afocn@gmail.com',
    });

    // post or save the data (post executed)
    newContack
      .save()
      .then((newContack) => {
        // The record has been saved successfully
        // savedLibrary is the JSON api response we get from the beckend server
        console.log('Saved library:', newContack);
        alert('contack added');
        // location.reload();
      })
      .catch((error) => {
        // Handle the error in case of failure
        console.error('Error saving library:', error);
      });

    this.email = '';
    this.message = '';
  }
  
}
