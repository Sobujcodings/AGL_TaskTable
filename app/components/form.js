import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FormComponent extends Component {
  @service store;
  @service router;

  // initailly ata show hobe aro input data add korle updated ta pabo ekhane
  // default value diye age akbar declare korbo action submit korar por arekbar dhorbo updated value
  // this.args.name refers @model.name
  // it contains all the model data lets break this and use it for form
  // ata diche jate atake necher submit function e use korte pari after adding some other input value with default value
  // @tracked filteredItem = this.args.model;

  // for side card
  @tracked name = 'Header';
  @tracked updatedata;

  @action
  submit() {
    const router = this.router.transitionTo('libraries');
    const routerRef = this.router.refresh('libraries');

    // console.log(this.args.model);
    // // @model={{filteredItem}} pabo ekhane this.args.model diye
    // console.log(this.args.model[0].id);
    const { id, name, address, phone } = this.args.model[0];
    // console.log(id, name, address, phone);

    // Records that already exist on the backend are updated using the HTTP PATCH verb using findRecord
    // edit the card data using ember data
    // Load the record ai data k beckend DB theke niye ashche tar attributes gulake k update korar jonno
    // age get request kore data niye ashe jeta k change korete hobe then change/edit kore abar shetake padhay DB e
    this.store.findRecord('library', id).then(function (library) {
      // ...after the record has loaded
      // Update the record with new data
      library.set('name', name);
      library.set('address', address);
      library.set('phone', phone);

      // Save the record to persist the changes to the backend
      // saving means hit the api (saveeditdata is the data we get from the response of this fetch)
      library
        .save()
        .then(function (savedLibrary) {
          // The record has been successfully updated on the server.
          console.log('Updated library:', savedLibrary);
          // alert
          alert('Form has been edited');
          router;
          routerRef;
          // this.router.transitionTo('libraries');
        })
        .catch(function (error) {
          // Handle any errors that may occur during the save operation.
          alert(error);
          console.error('Error updating library:', error);
        });
    });
  }
}
