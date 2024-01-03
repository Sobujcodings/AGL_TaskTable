import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    let datas = [
      {
        id: '1',
        name: 'John Doe',
        address: '123 Main Street, Cityville',
        isEdited: false,
      },
      {
        id: '2',
        name: 'Jane Smith',
        address: '456 Oak Avenue, Townsville',
        isEdited: false,
      },
      {
        id: '3',
        name: 'Bob Johnson',
        address: '789 Pine Road, Villagetown',
        isEdited: false,
      },
    ];

    // // Load data into the 'item' model
    // this.store.pushPayload('table', data);

    // Assuming 'table' is your model name
    // datas.ColumnArray = [];
    datas.forEach((data) => {
      console.log(data);
      // Create a new record for each object
      data.ColumnArray = [];
      let newRecord = this.store.createRecord('table', data);

      // Save the record to the store
      newRecord.save();
    });

    // console.log(this.store.peekAll('table'));

    // Return the loaded items as the model
    return this.store.peekAll('table');
  }
}
