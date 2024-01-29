import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class NavbarComponent extends Component {
    @service store;
    @service myService;

    // search r data js e anba then sheta service diye then shei service k use korbo table.js e using service parameters 
    
    @action
    HandleInput(event) {
        console.log(event.target.value);
        console.log('search');
    }
}
