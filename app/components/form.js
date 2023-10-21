import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FormComponent extends Component {
  @service router;

  // initailly ata show hobe aro input data add korle updated ta pabo ekhane
  // default value diye age akbar declare korbo action submit korar por arekbar dhorbo updated value
  // this.args.name refers @model.name
  // it contains all the model data lets break this and use it for form
  // ata diche jate atake necher submit function e use korte pari after adding some other input value with default value
  @tracked filteredItem = this.args.model;

  // for side card
  @tracked name = 'Header';
  @tracked updatedata;

  @action
  async submit() {
    // console.log(this.args.model);
    const { name, address, phone } = this.filteredItem[0];
    const id = this.filteredItem[0]._id;
    this.name = this.filteredItem[0].name;
    const updatedData = { name, address, phone };
    this.updatedata = updatedData;
    console.log(updatedData);

    // PUT request
    // Construct the dynamic URL with the ID
    const url = `http://localhost:5000/editCard/${id}`;

    // Perform the PUT request
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Send the updated data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      alert('Form has been edited');
      // Navigate to another route
      this.router.transitionTo('libraries');
    } catch (error) {
      console.error('Error:', error);
      // here got the problem now for posting
    }
  }
}
