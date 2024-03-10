import Service from '@ember/service';

export default class FetchdataService extends Service {
    items = '';

    setItems(items) {
        this.items = items;
        console.log(items);
    }

    getItems() {
        return this.items;
    }
}
