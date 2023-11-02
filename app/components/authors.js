import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthorsComponent extends Component {

    @tracked clicked = false;

    @action
    handleEdit() {
        console.log('clicked');
        this.clicked = !this.clicked;
        console.log(this.clicked);
    }
}
