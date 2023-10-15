import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class InputformComponent extends Component {
  // login ta two way binding hobe okhane change kore ekhane change abar ekhaen hole oikhane change
  //form r value this.login diye ekhane rekhe dilam shetake pore extract kore form r prottek ta value ber korbo obj theke
  @tracked login = {};

  @tracked name = '';
  @tracked address = '';
  @tracked phone = '';

  // @onSubmit={{this.submit}} onsubmit hobe this.submit e class r submit aciton. submit call korle ata call hobe
  @action
  submit() {
    // akhn ai ogin e set kora data guloke extract kore ber kore nibo
    // form theke this.login e padhaichi sheta theke every input field value ber kore nilam
    const { name, address, phone } = this.login;
    this.name = name;
    this.address = address;
    this.phone = phone;
    // // necher getter funciton e pass kore dilam
    // this.data(text, address, phone);
    // console.log(this.login);
    console.log(JSON.stringify(this.login));
    // console.log(text, address, phone);

    // post this form value to the backend then database
    async function postData(login) {
      try {
        const response = await fetch('http://localhost:5000/addCards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(login),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    // Call the async function to send the POST request
    postData(this.login);

    this.login = '';
    alert('card added');
  }

  // getter funciton diye abar ai khaner data gulo compo/temp niye dekhabo
  // get data() {
  //     return this.text, this.address, this.phone;
  // }
}
