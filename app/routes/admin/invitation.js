import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AdminInvitationRoute extends Route {
    @service store;

    async model() {
        let parsed = await this.store.findAll('contack');
        console.log(parsed.length);
        parsed.forEach(element => {
            console.log(element);
        });
        return parsed;
    }
}
