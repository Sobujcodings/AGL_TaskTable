import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class InputformComponent extends Component {
  @service store;
  @service router;

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
    // console.log(name,address,phone);
    this.name = name;
    this.address = address;
    this.phone = phone;
    // tracked eo value gula boshiye dilam jate abar ai value guloke shei hbs file eo use kora jay tracked thake
    // console.log(this.name, this.address, this.phone);

    // ember data post store then save() means post that  here library is the model name that defines the libraries api endpoint
    const newLibrary = this.store.createRecord('library', {
      name: this.name,
      address: this.address,
      phone: this.phone,
    });
    // console.log(newLibrary.name);

    // post or save the data (post executed)
    newLibrary
      .save()
      .then((savedLibrary) => {
        // The record has been saved successfully
        // savedLibrary is the JSON api response we get from the beckend server
        console.log('Saved library:', savedLibrary);
        // Access the values you posted
        const name = savedLibrary.name;
        const address = savedLibrary.address;
        const phone = savedLibrary.phone;
        console.log(name, address, phone);
        alert('card added');
        location.reload();
      })
      .catch((error) => {
        // Handle the error in case of failure
        console.error('Error saving library:', error);
      });

    // noraml fetch for post request this form value to the backend then database
    //   async function postData(login) {
    //     try {
    //       const response = await fetch('http://localhost:5000/addCards', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(login),
    //       });

    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }

    //       const responseData = await response.json();
    //       console.log(responseData);
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   }
    //   // Call the async function to send the POST request
    //  - postData(this.login);

    //   this.login = '';
    //   alert('card added');
    //   location.reload();
    // }

    // getter funciton diye abar ai khaner data gulo compo/temp niye dekhabo
    // get data() {
    //     return this.text, this.address, this.phone;
  }
}
