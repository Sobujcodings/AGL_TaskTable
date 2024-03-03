import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ZoneRoute extends Route {
    @service store;

    async model (){
        
    }
}
