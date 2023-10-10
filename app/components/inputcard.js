import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class InputCARDComponent extends Component {
    @tracked inputValue = '';


    @action
    hanldeinput(event) {
        this.inputValue = event.target.value;
        console.log(this.inputValue);
    }

    // ai card guloke route e fetch kore template e bebohar kore padhiye dilam inputcard component r argument hishebe r ekhane use korlam shetake filter kore padhiye dibo input e click na hole just raw cards gulai padhiye dibo shob shob gulai padhabo
    get filtercards() {
        const { model } = this.args;
        // console.log(cards.length);
        if (this.inputValue) {
            // amdr input value ta jodi card r name r moddhe thake tahole shei whole card gula filtercard e jabe
            let filtercards = model.filter((card) => card.name.includes(this.inputValue));
            return filtercards;
        }
        return model;
    }

    // constructor() {
    //     super(...arguments);

    //     // Fetch data within the constructor
    //     fetch('https://mocki.io/v1/88fe6e57-9555-4f6f-95c3-c84842e923cc')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // Process the fetched data
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }

    //     async function datafetching() {
    //         let response = await fetch('https://mocki.io/v1/88fe6e57-9555-4f6f-95c3-c84842e923cc');
    //         let parsed = await response.json();
    //         console.log(parsed);
    //         return parsed;
    //     }
    //     datafetching();


    //     @tracked inputValue = '';
    //     handleinput(event) {
    //         this.inputValue = event.target.value;
    //         console.log(this.inputValue);
    //     }
    // }
    // let response = await fetch('https://mocki.io/v1/88fe6e57-9555-4f6f-95c3-c84842e923cc');
    // let parsed = await response.json();
    // console.log(parsed);
    // // return parsed;
}
