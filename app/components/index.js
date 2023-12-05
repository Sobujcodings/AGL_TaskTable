import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexComponent extends Component {
  @service store;
  @service router;

  @tracked inputemail = '';
  // neche action e jeye event niye shetaker value e ekhenae set kore dibo sheta abar niye dekhabo this.email diye
  // @tracked isValid = false;

  // @action k just rakhbo input filed theke input niye @trcked inputmail e set korar jonno
  @action
  handleInput(event) {
    this.inputemail = event.target.value;
  }

  // computed property (We've created a computed property called isValidEmail that returns true when the email is valid
  // and false when it's not.)
  get isValidEmail() {
    let emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|bd|usa)$/;
    return emailregex.test(this.inputemail);
    // match hole true return korbe
  }

  // btn handler-function is here for alert and other purpose(to save this email to somewhere else,firebase etc)
  @action
  handlebtn() {
    console.log(this.inputemail);

    // post request to the contack table to show the invitation mail to the invitation page
    const newContack = this.store.createRecord('contack', {
      invitation: this.inputemail,
      // to fill the space of DB coz ata na dile ak e table r ai field gula khali thake invitaion post korar time e
      email: 'asdgasg@gmail.com',
      message: 'asdfsadfsdfsdfsfsfd',
    });

    // post or save the data (post executed)
    newContack
      .save()
      .then((newContack) => {
        // The record has been saved successfully
        // savedLibrary is the JSON api response we get from the beckend server
        console.log('Saved library:', newContack);
        // alert
        alert(`Request Sent to  ${this.inputemail} `);
        this.inputemail = '';
        // location.reload();
      })
      .catch((error) => {
        // Handle the error in case of failure
        console.error('Error saving library:', error);
      });

  }
}
