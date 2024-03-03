import Component from '@glimmer/component';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class PracticeComponent extends Component {
    @service store;

    @action
    startRecording() {
        console.log('clicked');
        // try {
        // const recognition = new window.webkitSpeechRecognition(); // Create a new instance of SpeechRecognition
        // recognition.start();

        // recognition.onresult = (event) => {
        //     console.log(event);
        //     console.log(event.results);
        // const transcript = event.results[0][0].transcript;
        // console.log('Transcript:', transcript);
        // const transcript = 'hello chatgpt';
        // Display the transcript in your UI

        // Create a new record using Ember Data
        // table: { idd: "1003", name: "Table", column: [{ vcbxb: 3508 }], row: [] }
        // column: [{ vcbxb: 3508 }]
        // idd: "1003"
        // name: "Table"
        // row: []
        // let data = {
        //     id: '',
        //     name: 'Table',
        //     column: this.FirstColArray,
        //     row: this.row,
        //     idd: Math.floor(Math.random() * 9) + 1000
        // };
        // let value = {
        // text: 'hello chatgpt'
        // }
        // let text = { text: 'hello chatgpt' };
        try {
            let newRecord = this.store.createRecord('search', { text: 'hello' });
            console.log(newRecord);
            newRecord.save().then(() => {
                console.log('Record saved successfully');
            }).catch((error) => {
                console.error('Error saving record:', error);
            });
        } catch (error) {
            console.error(error);
        }
        // };

        //     recognition.onerror = (event) => {
        //         console.error('Speech recognition error:', event.error);
        //     };
        // } catch (error) {
        //     console.error('Error starting speech recognition:', error);
        // }
    }
}
