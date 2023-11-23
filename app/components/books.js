import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


export default class BooksComponent extends Component {
    @tracked Clicked = false;

    @tracked titleClicked = false;

    @tracked Clickedbook;


    @tracked tastyClicked;
    @tracked ergonomicClicked = false;


    // title edit
    @action
    handleTitle(element, booklist, author, bookName) {
        // console.log('clicked');
        // console.log(element);
        // console.log(booklist);
        // console.log(author, bookName);
        // TODO: jei elemnt r ai autor and bookname(index) onujayi milbe filter kore takei isClciked set korbo *
        this.titleClicked = !this.titleClicked;
        // console.log(this.titleClicked);

        this.Clickedbook = bookName;


        // jetay click korchi shei total book array r sathe jodi shei book r index r mil hoy tahole shetay isClicked true korbo
        // let clickedBook;
        // for (let index = 0; index < booklist.length; index++) {
        //     // const element = array[index];
        //     const singleElement = booklist[index];
        //     // console.log(singleElement);
        //     if (singleElement == bookName) {
        //         // console.log(index, 'true');
        //         clickedBook = index;
        //     }
        // }
        // console.log(clickedBook);

        // const originalString = bookName;
        // const stringWithoutSpaces = bookName.replace(/\s/g, '');
        // console.log(stringWithoutSpaces);


        element.set('isClicked', bookName);

        console.log(element);
        console.log(element.isClicked);


        // if (element.isClicked == "Tasty Frozen Sausages Cookbook") {
        //     this.tastyClicked = !this.tastyClicked;
        //     console.log(this.tastyClicked);
        //     console.log('tasty match');
        // }
        // else if (element.isClicked == "Ergonomic Metal Bike Cookbook") {
        //     this.ergonomicClicked = !this.ergonomicClicked;
        //     console.log(this.ergonomicClicked);
        //     console.log('ergonomic match');
        // }
        // else {
        //     console.log('no match');
        // }
    }



    // get tastyClickedIsTasty() {
    //     return this.tastyClicked === 'Tasty Frozen Sausages Cookbook';
    // }




    // TODO: Edit on author book then title then library
    @action
    handleAuthor(element) {
        console.log('clicked');
        console.log(element);
        this.isClicked = !this.isClicked;
        console.log(this.isClicked);

        // element.isClicked = this.isClicked;
        element.set('isClicked', this.isClicked);
        console.log(element);
    }

}