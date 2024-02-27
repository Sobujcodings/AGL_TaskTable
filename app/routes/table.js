import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';


export default class TableRoute extends Route {
    @service store;
    // @service myService;
    // @tracked item = A([]);


    async model() {
        // itemFunc(){
        //     this.item.pushObject('data');
        //     console.log(this.item);
        // }

        try {
            // let response = await fetch('http://localhost:5000');
            // let parsed = await response.json();
            // console.log(parsed);

            let data = await this.store.findAll('table');
            console.log(typeof data);
            console.log(data, 'data');
            return data;
        } catch (error) {
            console.error('Error:', error);
            // Handle the error appropriately
        }
    }
}
