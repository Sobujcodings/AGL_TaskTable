import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';


export default class InventoryRoute extends Route {
    @service store;
    // @service myService;
    data = null;

    async model() {

        // try {
        //     const response = await this.store.findAll('inventory/inventory-type');

        //     // const response2 = await this.store.findAll('inventory/inventory-category-type');
        //     // console.log(response2);

        //     // handle the response here
        //     // console.log(response);
        //     return response;
        //     response.forEach(element => {
        //         console.log(element);
        //     });
        // } catch (error) {
        //     // handle any errors here
        //     console.error(error);
        // }


        // Return the fetch operation, which is a promise
        // const url = 'https://mocki.io/v1/0c1ee65d-611f-4ba8-9c77-9956b2cccf83';
        // return fetch(url)
        //     .then(response => {
        //         if (response.ok) {
        //             return response.json();
        //         } else {
        //             throw new Error('Failed to fetch data');
        //         }
        //     })
        //     .then(data => {
        //         // what i want to return from here
        //         return data.data; // Return the data from the JSON response
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //         throw error;
        //     });
    }
}
