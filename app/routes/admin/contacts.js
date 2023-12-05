import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AdminContactsRoute extends Route {
    @service store;

    async model() {
        let parsed = await this.store.findAll('contack');

        
        // ai route e dhokar sathe sathe ekhane akta refresh dite hobe 
        // let uniqueItems = [];
        // parsed.forEach((item) => {
        //   console.log(item);
        // //   if(item.includes)
        // });
        
        // // In your model hook, you fetch the parsed data and create an array of objects from it. For each object in this array, you generate the booksArray by splitting the books string.
        // // In your template, you can now access both parsed and parsed.booksArray
        // parsed.forEach((element) => {
        //     // console.log(element.books);
        //     // prottek tar vhitore notun akta object toyri kore dilam shetakei nibo template e
        //     element.booksArraay = element.books.split(',');
        //     // console.log(booksArraay);
        //     // this.booksarray = booksArraay;
        //     // element.books.split(',').forEach((item) => {
        //     //   // console.log(item);
        //     // });
        // });
        //
        // return;
        return parsed;
    }
}
