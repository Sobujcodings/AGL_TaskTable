import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  // @service myService;

  async model() {
    // let data = this.store.peekAll('table');
    // console.log(data, 'data');

    // let response = await fetch('http://localhost:5000/tables');
    // let parsed = await response.json();
    // console.log(parsed);
    // return parsed;

    try {
      // let response = await fetch('http://localhost:5000');
      // let parsed = await response.json();
      // console.log(parsed);

      let data = await this.store.findAll('table');
      // console.log(data);
      // return data;
      data.forEach(element => {
        // console.log(element);
      });
      return data;
    } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately
    }
  }

  // return data;

  // let datas = [
  //   {
  //     id: '1',
  //     name: 'John Doe',
  //     address: '123 Main Street, Cityville',
  //     isEdited: false,
  //   },
  //   {
  //     id: '2',
  //     name: 'Jane Smith',
  //     address: '456 Oak Avenue, Townsville',
  //     isEdited: false,
  //   },
  //   {
  //     id: '3',
  //     name: 'Bob Johnson',
  //     address: '789 Pine Road, Villagetown',
  //     isEdited: false,
  //   },
  // ];


  // Use the service method
  // const datas = this.myService.datas();
  // console.log(datas);
  // console.log(this.store.peekAll('table'));
  // const modelLength = this.store.peekAll('table');
  // console.log(modelLength.length);

  // let newdata = {
  //   id: '4',
  //   name: 'sobuj',
  //   address: '789 Pine Road, Villagetown',
  //   isEdited: false,
  // };
  // datas.unshift(newdata);

  // // Load data into the 'item' model
  // this.store.pushPayload('table', data);


  // Assuming 'table' is your model name
  // datas.ColumnArray = [];
  // datas.forEach((data) => {
  //   // console.log(typeof data);
  //   // Create a new record for each object
  //   data.ColumnArray = [];
  //   data.FirstColumnArray = [];
  //   // let newRecord = this.store.createRecord('table', data);
  //   // Save the record to the store
  //   // newRecord.save();
  // });

  // if (datas.length == modelLength.length) {
  //   console.log('same');
  //   console.log(datas);
  //   console.log(this.store.peekAll('table'));
  // } else {
  //   console.log('not same');
  //   console.log(datas);
  //   console.log(this.store.peekAll('table'));
  // }


  // const obj = {name: 'sobuj', address: '123 Main Street, Cityville', isEdited: false, ColumnArray: [] };
  // const newdata = this.store.createRecord('table', obj);
  // // console.log(newdata);
  // console.log(this.store.peekAll('table'));
  // let oldMOdel = this.store.peekAll('table');
  // oldMOdel.push(newdata);

  // console.log(oldMOdel);
  //  oldMOdel.forEach(element => {
  //   console.log(element);
  //  });

  // console.log(this.store.peekAll('table'));

  // Return the loaded items as the model
  // return this.store.peekAll('table');


  // return data;

}
