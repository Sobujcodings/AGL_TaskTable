import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexComponent extends Component {
  @tracked inputemail = '';
  // neche action e jeye event niye shetaker value e ekhenae set kore dibo sheta abar niye dekhabo this.email diye
  // @tracked isValid = false;

  // @action k just rakhbo input filed theke input niye @trcked inputmail e set korar jonno
  @action
  handleInput(event) {
    this.inputemail = event.target.value;
  }

  // computed property (We've created a computed property called isValidEmail that returns true when the email is valid and false when it's not.)
  get isValidEmail() {
    let emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|bd|usa)$/;
    return emailregex.test(this.inputemail);
    // match hole true return korbe
  }

  // btn handler-function is here for alert and other purpose(to save this email to somewhere else,firebase etc)
  @action
  handlebtn() {
    this.inputemail = '';
    alert(`Request Sent to  ${this.inputemail} `);
  }
}
