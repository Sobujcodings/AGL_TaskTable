import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class InputCARDComponent extends Component {
  @service router;
  @service store;

  @tracked inputValue = '';
  // @service location;

  // taking input value
  @action
  hanldeinput(event) {
    this.inputValue = event.target.value;
    // console.log(this.inputValue);
    // const { model } = this.args;
    // console.log(model);
  }

  // ai card guloke route e fetch kore template e bebohar kore padhiye dilam inputcard component r argument hishebe r ekhane use korlam shetake filter kore padhiye dibo input e click na hole just raw cards gulai padhiye dibo shob shob gulai padhabo
  get filtercards() {
    const { model } = this.args;
    // console.log(model);
    if (this.inputValue) {
      // amdr input value ta jodi card r name r moddhe thake tahole shei whole card gula filtercard e jabe
      let filtercards = model.filter((card) =>
        card.name.includes(this.inputValue),
      );
      return filtercards;
    }
    return model;
  }

  // deleting a record using Ember data
  // Deleting records is as straightforward as creating records. Call deleteRecord() on any instance of Model. This flags the record as isDeleted. The deletion can then be persisted using save(). Alternatively, you can use the destroyRecord method to delete and persist at the same time.
  // post = store.peekRecord('post', 2);
  // post.destroyRecord(); // => DELETE to /posts/2

  @action
  async handleDelete(id) {
    console.log(id);
    // DELETE to /library/2  library will become libraries  /libraries/id
    const library = this.store.peekRecord('library', id);
    if (library) {
      library
        .destroyRecord()
        .then(() => {
          alert('This id has been deleted');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // handle delete btn
  // @action
  // async handleDelete(id) {
  //   console.log(id);
  //   // console.log(this.id);
  //   try {
  //     const response = await fetch(`http://localhost:5000/deleteCard/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json', // Set the content type if needed
  //       },
  //     });

  //     if (!response.ok) {
  //       if (response.status === 404) {
  //         console.error('Resource not found');
  //         return;
  //       } else {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //     }
  //     const responseData = await response.json();
  //     console.log(responseData);
  //     alert(`card id ${id} has been deleted`);
  //     // reload this page
  //     location.reload();
  //   } catch (error) {
  //     console.error('Error:', error);
  //     throw error; // Propagate the error up the call stack for additional handling if needed
  //   }
  // }

  // edit r e click korle form ashbe form e data dile sheta jeye card id diye match kore update hobe
  // request r body te form r data padhate hobe sheta jeye exist tay replace hobe
  // udpating the card
  // @action
  // async handleEdit(id) {
  //   console.log(id);
  // try {
  //   let response = await fetch(`http://localhost:5000/updateUser/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json', // Set the content type if needed
  //     },
  //     // Add your request body if necessary (ekhane body r moddhe form r update data gulo dibo)
  //     // edit e click korle pasher new user e niye jabe sekhane shob dile ata delete hoye jabe
  //     // body: JSON.stringify(yourData),
  //   })

  //   // error checking
  //   if (!response.ok) {
  //     if (response.status === 404) {
  //       console.error('Resource not found');
  //       return;
  //     } else {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //   }
  //   const responseData = await response.json();
  //   console.log(responseData);
  //   alert(`card id ${id} has been deleted`);
  //   // this.location.replace();
  // } catch (error) {
  //   console.error('Error:', error);
  //   throw error;
  // }
  // }
}
