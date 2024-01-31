import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEqual } from '@ember/utils';
import { A } from '@ember/array';
import { set } from '@ember/object';

export default class TableComponent extends Component {
    // @service myService;
    @service store;

    // @tracked row = [ [{'michel': 1},{'mile': 1},{'make': 1}], [{'mike': 2},{'pompe': 2},{'jompe': 2}], [ {'doe': 3},{'hoe': 3},{'moe': 3}]];
    @tracked TabelModel = this.store.peekAll('table');

    // to track col and row
    @tracked FirstColArray = [];
    @tracked row = [];


    // for data edit 
    @tracked InputValueCol;
    @tracked ToChangedObjTwo = [];

    // to track id, table and item
    @tracked id;
    @tracked table = false;
    @tracked item;

    // for input field
    @tracked oldInput;
    @tracked TableInput;

    // to track tableName, tableSelected or not, loading state
    @tracked TableName;
    @tracked tableShow = false;
    @tracked loading = false;

    // to track when all data is deleted, make savemodel btn disabled
    @tracked NoData = true;

    // to track when no col and row is existed then make deleteAll btn disabled
    @tracked NoColRow = true;


    // after refreshing the page, check wheather there is any data, if not DeleteAll btn disbaled by making NoData = false
    constructor() {
        super(...arguments);
        // console.log(this.TabelModel);
        // after resfresing or starting the page delete all data btn will be deactive due to not having any model instance
        if (this.TabelModel.length > 0) {
            this.NoData = false;
        }
    }


    // Click edit to change the data of the row, input field appearace.
    @action
    handleEdit(item, wholeData) {
        this.row.forEach(element => {
            if (element == item) {
                // to update the array property permanently
                // true thakle false koro false thakle true koro
                if (element.isEdited == true) {
                    set(element, 'isEdited', false);
                } else {
                    set(element, 'isEdited', true);
                }
            }
        });
        this.row = this.row;
    }


    // To edit input field data
    @action
    HandleInputeThree(key, event) {
        // console.log(FirstOrLast);

        // console.log(key);

        let eventname = event.target.value;
        // console.log(eventname);

        let keyName = key;
        let ValueName = eventname;

        let KeyValue = [{ [keyName]: ValueName }];
        // console.log('keyvalue', KeyValue);

        // *** TODO: merged array ta bad jete pare


        this.ToChangedObjTwo.push(KeyValue);
        // *** jeta input dewa hoy nai sheta keo add korte hobe input value
        console.log('ToChangedObjTwo', this.ToChangedObjTwo);
        // this.FirstColArray = this.ToChangedObjTwo;

        // Create a map to store the last occurrence of each value
        let lastOccurrences = {};
        this.ToChangedObjTwo.forEach((obj) => {
            let key = Object.keys(obj)[0]; // Get the property name dynamically
            lastOccurrences[key] = obj;
        });
        // Extract the values (last occurrences) from the map
        let uniqueObjects = Object.values(lastOccurrences);

        console.log('uniqueObjects', uniqueObjects);
        // event r uniqe gula tochange e rakhlam ai tochange k abar lastColArray baniye dibo save korle
        this.ToChangedObjTwo = uniqueObjects;
        console.log(this.FirstColArray);
        console.log('ToChangedObjTwo', this.ToChangedObjTwo);

        // Merge arrays(jate change jgula hoy nai shegulo keo array te pai as it is)
        let mergedArray = this.row.map((obj1) => {
            let updatedObj = this.ToChangedObjTwo.find(
                (obj2) => Object.keys(obj1)[0] === Object.keys(obj2)[0],
            );
            // return updatedObj;
            if (updatedObj) {
                console.log('updateobj existed');
                return updatedObj;
            } else {
                console.log('no updateobj existed');
                return obj1;
            }
            //   return updatedObj ? updatedObj : obj1;
        });
        console.log('mergedArray1', mergedArray);


        // Create a map to track the last occurrence of each key
        let lastOccurrenceMap = new Map();

        // Iterate over the array in reverse order
        for (let i = mergedArray.length - 1; i >= 0; i--) {
            let currentObject = mergedArray[i];
            let key = Object.keys(currentObject)[0];

            // If the key is not in the map, or if it is, but the current entry is the last occurrence
            if (!lastOccurrenceMap.has(key) || lastOccurrenceMap.get(key) === i) {
                lastOccurrenceMap.set(key, i);
            } else {
                // If the key is already in the map and this is not the last occurrence, remove the duplicate
                mergedArray.splice(i, 1);
            }
        }
        console.log('mergedArray', mergedArray);

        this.ToChangedObjTwo = mergedArray;
        console.log('ToChangedObjTwo', this.ToChangedObjTwo);


        // TODO: ai value ta k replace kore dibo ai object nam r sathe jetea ache shei nam diye

        // } else {
        //     // // *** ekhane shugulai ache input jegular value change hoice baki jgula change hoi nai segula to sheibhabai rakhte hobe ata check korte hobe j change hoice kina
        //     // // *** shob push korle cholbe na last e e jeta input nici event sheta k add korte hobe
        //     // this.ToChangedObj.push(KeyValue);
        //     // // *** jeta input dewa hoy nai sheta keo add korte hobe input value
        //     // console.log(this.ToChangedObj);

        //     // // Create a map to store the last occurrence of each value
        //     // let lastOccurrences = {};
        //     // this.ToChangedObj.forEach((obj) => {
        //     //     let key = Object.keys(obj)[0]; // Get the property name dynamically
        //     //     lastOccurrences[key] = obj;
        //     // });
        //     // // Extract the values (last occurrences) from the map
        //     // let uniqueObjects = Object.values(lastOccurrences);

        //     // console.log(uniqueObjects);
        //     // // event r uniqe gula tochange e rakhlam ai tochange k abar lastColArray baniye dibo save korle
        //     // this.ToChangedObj = uniqueObjects;
        //     // console.log(this.lastColArray);
        //     // console.log(this.ToChangedObj);

        //     // // let array1 = [{ df: 3675 }, { dfdfg: 3930 }];
        //     // // let array2 = [{ df: 36751 }, { dfdfg: 3930 }];
        //     // // Merge arrays
        //     // let mergedArray = this.lastColArray.map((obj1) => {
        //     //     let updatedObj = this.ToChangedObj.find(
        //     //         (obj2) => Object.keys(obj1)[0] === Object.keys(obj2)[0],
        //     //     );
        //     //     // return updatedObj;
        //     //     if (updatedObj) {
        //     //         return updatedObj;
        //     //     } else {
        //     //         return obj1;
        //     //     }
        //     //     //   return updatedObj ? updatedObj : obj1;
        //     // });
        //     // console.log(mergedArray);
        //     // // merged korar por duplicate gula bad dite hobe same data last value wala ta rakhte hobe


        //     // // Create a map to track the last occurrence of each key
        //     // let lastOccurrenceMap = new Map();
        //     // // Iterate over the array in reverse order
        //     // for (let i = mergedArray.length - 1; i >= 0; i--) {
        //     //     let currentObject = mergedArray[i];
        //     //     let key = Object.keys(currentObject)[0];

        //     //     // If the key is not in the map, or if it is, but the current entry is the last occurrence
        //     //     if (!lastOccurrenceMap.has(key) || lastOccurrenceMap.get(key) === i) {
        //     //         lastOccurrenceMap.set(key, i);
        //     //     } else {
        //     //         // If the key is already in the map and this is not the last occurrence, remove the duplicate
        //     //         mergedArray.splice(i, 1);
        //     //     }
        //     // }
        //     // console.log(mergedArray);

        //     // this.ToChangedObj = mergedArray;
        //     // console.log(this.ToChangedObj);
        // }
    }


    // after editing table row data, click save to make the changes
    @action
    handleSave(item, model) {
        console.log(this.ToChangedObjTwo);

        // after sav,close the input field to normal text by making isEdited false of that specefic element
        const result = model.filter((singledata) => singledata == item);
        result.forEach((element) => {
            if (element.isEdited == true) {
                set(element, 'isEdited', false);
            }
        });
        // console.log(this.lastColArray);


        // // for last array col
        // if (this.ToChangedObj.length == 0) {
        //     this.lastColArray = this.lastColArray;
        // } else {
        //     console.log('not zero');
        //     console.log(this.ToChangedObj);
        //     this.lastColArray = this.ToChangedObj;
        //     console.log(this.lastColArray);
        // }

        // for 1st array column
        // console.log(this.ToChangedObjTwo);
        // console.log(this.row);
        // console.log(this.FirstColArray);
        // this.row = this.ToChangedObjTwo;
    }


    // delete a specific item from the table row.
    @action
    async handleDelete(item, wholeData) {

        const result = this.row.filter((singleData) => singleData == item);
        result.forEach((element) => {
            // get the element that is supposed to be changed, and delete that index from the row/this.row using slice.
            const indexofElement = this.row.indexOf(element);
            if (indexofElement !== -1) {
                // to delete one used 1 here
                this.row.splice(indexofElement, 1);
            }
            this.row = this.row;
        });
    }



    // delete all data from the table by clicking the deleteAll button
    @action
    async DeleteAllRow() {
        const result = window.confirm('Click OK to delete all the data');
        if (!result) {
            console.log('User clicked cancel');
            return
        }

        // empty the col and row after deleting all the data of the table
        this.FirstColArray = [];
        this.row = [];
        console.log(this.FirstColArray, this.row);

        this.InputValueCol = '';

        // Delete all records using Ember Data
        const tables = await this.store.peekAll('table');

        // Use Promise.all to wait for all destroyRecord operations
        const deletionPromises = tables.map(async table => {
            await table.destroyRecord();
            console.log('loading');
            this.loading = true;
            this.tableShow = false;
        });

        // Wait for all destroyRecord operations to complete
        await Promise.all(deletionPromises);

        // Save changes after confirming the deletion on the server side
        tables.forEach(async table => {
            try {
                await table.save();
                alert('All data has been deleted Succesfully');
            } catch (error) {
                console.error('Error saving record:', error);
            }
        });


        // after deleting all data, make deleteAll disable, and hide the selected table.
        if (tables.length < 1) {
            console.log('no tblename should be shown');
            this.tableShow = false;

            // delete all data btn disable
            if (this.NoData == false) {
                this.NoData = !this.NoData;
            }
        }
        // make this.loading false (deactive spinner) after deleting all the data
        this.loading = false;
    }


    // CreateRow by clicking 1st or last row
    @action
    CreateRow(FirstOrLast, wholeData) {
        console.log('create row');

        // to check if creating 1st row is clicked. unsift(add first) data to this.row array.
        if (FirstOrLast == 'first') {
            // if first add row is clicked, and there is no col existed.generate one row,add data to this.row(unshift)
            if (this.FirstColArray.length == 0) {
                let array = [];
                for (let index = 0; index < 1; index++) {
                    const RandomName = ['john', 'aice', 'mike', 'pompe', 'alex', 'doe', 'michel', 'leice', 'jhonshon', 'bob', 'dfd', 'dhea', 'aba'];
                    const random4DigitNumber2 = Math.floor(Math.random() * 9) + 1;
                    const Name = RandomName[random4DigitNumber2];
                    const data = { [Name]: random4DigitNumber2 };
                    console.log(data);
                    array.push(data);
                }
                this.row.unshift(array);
                this.row = this.row;
            }
            // if first add row is clicked and there is no col existed, then it will loop till the col array length
            else {
                let array = [];
                for (let index = 0; index < this.FirstColArray.length; index++) {
                    const RandomName = ['john', 'aice', 'mike', 'pompe', 'alex', 'doe', 'michel', 'leice', 'jhonshon', 'bob', 'dfd', 'dhea', 'aba'];
                    const random4DigitNumber2 = Math.floor(Math.random() * 9) + 1;
                    const Name = RandomName[random4DigitNumber2];
                    const data = { [Name]: random4DigitNumber2 };
                    array.push(data);
                }
                this.row.unshift(array);
                this.row = this.row;
            }
        }
        else {
            // if add last row btn is clicked. push data to the this.row array
            // if last add row is clicked and there is no col existed
            if (this.FirstColArray.length == 0) {
                let array = [];
                for (let index = 0; index < 1; index++) {
                    const RandomName = ['john', 'aice', 'mike', 'pompe', 'alex', 'doe', 'michel', 'leice', 'jhonshon', 'bob', 'dfd', 'dhea', 'aba'];
                    const random4DigitNumber2 = Math.floor(Math.random() * 9) + 1;
                    const Name = RandomName[random4DigitNumber2];
                    const data = { [Name]: random4DigitNumber2 };
                    console.log(data);
                    array.push(data);
                }
                this.row.push(array);
                this.row = this.row;
            }
            else {
                // if last add row is clicked and there is col existed.
                let array = [];
                for (let index = 0; index < this.FirstColArray.length; index++) {
                    const RandomName = ['john', 'aice', 'mike', 'pompe', 'alex', 'doe', 'michel', 'leice', 'jhonshon', 'bob', 'dfd', 'dhea', 'aba'];
                    const random4DigitNumber2 = Math.floor(Math.random() * 9) + 1;
                    const Name = RandomName[random4DigitNumber2];
                    const data = { [Name]: random4DigitNumber2 };
                    // console.log(data);
                    array.push(data);
                }
                this.row.push(array);
                this.row = this.row;
            }
        }


        // if no row and col exist then disable the saveModel btn
        if (this.FirstColArray || this.row) {
            console.log('no row / no col');
            if (this.NoColRow == true) {
                this.NoColRow = !this.NoColRow;
            }
        }

    }



    // create col r input field r value jei nam e col create korbo tar input value
    @action
    handleCoLInput(event) {
        this.InputValueCol = event.target.value;
    }



    // add column to first or last
    @action
    AddCol(FirstLast) {

        if (!this.InputValueCol) {
            alert('add column Name');
            return
        }

        // random number generation
        const random4DigitNumber = Math.floor(Math.random() * 9000) + 1000;

        // if col added to first
        if (FirstLast == 'first') {
            if (this.row.length > 0 && this.FirstColArray.length == 0) {
                let LengthRow;
                console.log(this.row);
                this.row.forEach(element => {
                    LengthRow = element.length;
                });
                // beside col, a row will be added automatically to fill the table, with a row and a col.
                for (let index = 0; index < LengthRow; index++) {
                    const random4DigitNumber2 = Math.floor(Math.random() * 9000) + 1000;
                    this.FirstColArray.unshift({ [this.InputValueCol]: random4DigitNumber2 });
                    this.FirstColArray = this.FirstColArray;
                }
            }
            else {
                // add col data to the 1st position of the this.firstcol array using unshift.
                this.FirstColArray.unshift({ [this.InputValueCol]: random4DigitNumber });
                this.FirstColArray = this.FirstColArray;
            }

            // let array = [];
            if (this.row.length > 0) {
                console.log('before row', this.row);

                const RandomName = ['john', 'aice', 'mike', 'pompe', 'alex', 'doe', 'michel', 'leice', 'jhonshon', 'bob', 'dfd', 'dhea', 'aba'];
                const random4DigitNumber2 = Math.floor(Math.random() * 9) + 1;
                const Name = RandomName[random4DigitNumber2];
                const data = { [Name]: random4DigitNumber2 };

                console.log(this.FirstColArray.length);
                // Find the maximum length among the subarrays
                const maxLength = this.FirstColArray.length;

                // Define a function to fill the array with the object data
                const fillArray = (arr, maxLength, data) => {
                    const diff = maxLength - arr.length;
                    return arr.concat(Array(diff).fill(data));
                };

                // Update all subarrays to have the same length as the maximum
                const resultArray = this.row.map(arr => fillArray(arr, maxLength, data));

                this.row = resultArray;
            }
        }
        else {
            // if col added to the last position of this.firstcol array
            // also add row with the column
            if (this.row.length > 0 && this.FirstColArray.length == 0) {
                console.log('col nai so joto gula row r value ache totogula col create korbo');
                let LengthRow;
                console.log(this.row);
                this.row.forEach(element => {
                    console.log(element);
                    LengthRow = element.length;
                });
                console.log(LengthRow);

                for (let index = 0; index < LengthRow; index++) {
                    console.log('this times col will be created');
                    const random4DigitNumber2 = Math.floor(Math.random() * 9000) + 1000;
                    this.FirstColArray.push({ [this.InputValueCol]: random4DigitNumber2 });
                    this.FirstColArray = this.FirstColArray;
                }
            }
            else {
                // add column
                this.FirstColArray.push({ [this.InputValueCol]: random4DigitNumber });
                this.FirstColArray = this.FirstColArray;
            }

            if (this.row.length > 0) {
                // to have all length of array be same to fill the row of the table
                const RandomName = ['john', 'aice', 'mike', 'pompe', 'alex', 'doe', 'michel', 'leice', 'jhonshon', 'bob', 'dfd', 'dhea', 'aba'];
                const random4DigitNumber2 = Math.floor(Math.random() * 9) + 1;
                const Name = RandomName[random4DigitNumber2];
                const data = { [Name]: random4DigitNumber2 };

                // Find the maximum length among the subarrays
                const maxLength = this.FirstColArray.length;

                // Define a function to fill the array with the object data
                const fillArray = (arr, maxLength, data) => {
                    const diff = maxLength - arr.length;
                    return arr.concat(Array(diff).fill(data));
                };

                // Update all subarrays to have the same length as the maximum
                const resultArray = this.row.map(arr => fillArray(arr, maxLength, data));
                console.log('resultArray', resultArray);
                this.row = resultArray;
            }

        }

        // if there is no column and row existed, disable the SaveToModel button
        if (this.FirstColArray || this.row) {
            console.log('no row / no col');
            if (this.NoColRow == true) {
                this.NoColRow = !this.NoColRow;
            }
        }
    }


    // specefic column remove 
    @action
    handleColRemove(itemToRemove) {
        let IndexRemove;
        // Find the index of the matching object in FirstColArray
        const indexToRemove = this.FirstColArray.findIndex((obj) =>
            isEqual(obj, itemToRemove),
        );

        IndexRemove = indexToRemove;

        // // If the object is found, remove it (optional)
        if (indexToRemove !== -1) {
            this.FirstColArray.splice(indexToRemove, 1);
            // item.FirstColArray.removeObject(itemToRemove);
        }
        this.FirstColArray = this.FirstColArray;

        // also removed all the row of that column
        // Assuming IndexRemove is the index you want to remove (sheta bad e bakigula k neche)
        this.row = this.row.map(element => element.filter((_, index) => index !== IndexRemove));
        this.row = this.row;
    }


    // SaveModel triggeres update the existed table or create a new table and send it to the backend
    @action
    SaveModel() {
        console.log(this.id);

        // if updating selected or existed table this result contains that table data. this.id contains the id, set when this table is selected to view.
        const result = this.TabelModel.filter((singledata) => singledata.id == this.id);


        // if the result is not empty means replacing existed table data.so dont need to create a new table, replace it
        if (result.length !== 0) {
            // console.log('ata ager datar sathe milche so replace korte hobe new create korbo na');
            // console.log(result.column);
            result.forEach(element => {
                // element.name = element.name;
                element.column = this.FirstColArray;
                element.row = this.row;
                this.InputValueCol = '';
                alert('Data has been saved to the Model');
                console.log('element', element);

                // ata edit hobe ai value diye DB r value replace hobe
                // noyto sheta delete hoye ata insert hobe so ekhane create/put korte hobe
                // TODO: existing data k replace korte hobe update kore DB te
                // try {
                //     let tableInstance = this.store.peekRecord('table', element.id);
                //     tableInstance.set('name', this.TableInput);
                //     await tableInstance.save();
                //     console.log('Record updated successfully');
                // } catch (error) {
                //     console.error('Error updating record', error);
                // }

                // existing table guloke edit kore save korle table name dekhabe nah and item r tableshow true theke false hobe
                if (this.tableShow == true) {
                    this.tableShow = false;
                    this.TabelModel.forEach(element => {
                        console.log(element);
                        element.set('tableShow', false);
                    });
                }

            });
        }
        // if no table is selected then create a new table by adding row and column
        else {
            let data = {
                id: '',
                name: 'Table',
                column: this.FirstColArray,
                row: this.row,
                idd: Math.floor(Math.random() * 9) + 1000
            };

            // post request
            let newRecord = this.store.createRecord('table', data);
            newRecord.save().then((response) => {
                // Handle success
                console.log('Record saved successfully', response);
            }).catch((error) => {
                // Handle error
                console.error('Error saving record', error);
            });

            // make input field of col empty
            this.InputValueCol = '';
            this.InputValueCol = this.InputValueCol;
            alert('Data has been saved to the Model');
        }

        // to clear the UI after save, make col and row empty.
        console.log(this.FirstColArray, this.row);
        this.FirstColArray = [];
        this.row = [];

        // make the id empty.
        this.id = '';


        // after save when there is no col and row make the SaveModel btn disable.
        if (this.FirstColArray.length == 0 && this.row.length == 0) {
            console.log('no row / no col');
            if (this.NoColRow == false) {
                this.NoColRow = !this.NoColRow;
            }
        }

        // after save to the model inable the DeleteAll button. if any data found in the model.
        if (this.TabelModel.length > 0) {
            console.log('data ache');
            if (this.NoData == true) {
                this.NoData = !this.NoData;
            }
        }

    }



    // select table from the list of the table, is selected show the table Name and Save Cancel field to change the name.
    @action
    handleSelectTable(item, ModelTable) {

        // if no tableshow is found in the model item at first set a tableShow property to show the table.
        if (!item.tableShow) {
            item.tableShow = true;
            this.tableShow = true;
        }
        // if item.tableShow found that means already the table name is shown so hide it by making it false.
        else {
            if (item.tableShow == true) {
                item.tableShow = false;
                this.tableShow = false;
                // tokhon shob item r tableshow gulo o false hoye jabe
                this.TabelModel.forEach(element => {
                    element.set('tableShow', false)
                });
            }
        }


        // to set and hide the row and column
        if (item.tableShow) {
            console.log('ache tableshow');
            this.FirstColArray = item.column;
            this.row = item.row;
            // ai id jokhon thakbe tokhon last open table tai update hobe result e jeye match hobe first if e dhukbe
            // tai ai id k tokhon set korte hobe jokhon existed kono table open thake and closed hole r ai id set korbo nah
            this.id = item.id;
        }
        else {
            console.log('nai tableshow');
            this.FirstColArray = [];
            this.row = [];
            // table unselect kore dile id close kore dibo fole new create hobe ager ta update hobe nah table
            this.id = '';
        }


        // this.id = item.id;
        this.item = item;
        this.TableName = item.name;


        // save model disable according to SelectTable
        if (this.tableShow == true) {
            if (this.NoColRow == true) {
                this.NoColRow = !this.NoColRow;
            }
        }
        else {
            if (this.NoColRow == false) {
                this.NoColRow = !this.NoColRow;
            }
        }
    }



    @action
    handleTableInput(event) {
        this.TableInput = event.target.value;
        console.log(event.target.value);
    }



    @action
    handleTableEdit(item) {
        item.set('isTableEdited', !this.table);
        console.log(item.name);
        this.oldInput = item.name;
    }


    // to edit
    @action
    handleTableSave(item, SaveOrCancel) {

        if (SaveOrCancel === 'cancel') {
            console.log(item);
            // jokhon table name input field open thakbe mane tableisEdited thakbe tokhon true
            if (this.table == true) {
                item.set('isTableEdited', !this.table);
                console.log(item);
            }
            else {
                item.set('isTableEdited', this.table);
            }
            const result = this.TabelModel.filter((singledata) => singledata.id == item.id);
            result.forEach(element => {
                // element.Name = this.TableInput;
                element.set('name', this.oldInput)
            });
        }
        else {
            // save korleo ager ta change na korle this.tableinput nai ager tai  set kore dibo
            if (!this.TableInput || this.TableInput === undefined || this.TableInput === null) {
                if (this.table == true) {
                    item.set('isTableEdited', !this.table);
                    console.log(item);
                }
                else {
                    item.set('isTableEdited', this.table);
                }
                const result = this.TabelModel.find((singledata) => singledata.id == item.id);
                result.set('name', this.oldInput)
            }

            else {
                // if table name is changed tableinput has value
                const result = this.TabelModel.filter((singledata) => singledata.id == item.id);
                result.forEach(async element => {
                    // element.Name = this.TableInput;
                    console.log('element that has to be changed', element);
                    element.set('name', this.TableInput);

                    // to hide the input field
                    if (element.isTableEdited == true) {
                        element.set('isTableEdited', false);
                    }
                    console.log('element that has been changed', element);
                    this.TabelModel = this.TabelModel;


                    // update ai element k edit korte hobe replace korte hobe from the server
                    // update the name field
                    try {
                        let tableInstance = this.store.peekRecord('table', element.id);
                        tableInstance.set('name', this.TableInput);
                        await tableInstance.save();
                        console.log('Record updated successfully');
                    } catch (error) {
                        console.error('Error updating record', error);
                    }

                });
                // save r poreo new name k set kore dilam
                this.TableName = item.name;
            }
        }

    }



    // X delete
    @action
    async handleTableDelete(item) {

        try {
            await item.destroyRecord(); // This will mark the record as deleted
        } catch (error) {
            console.error('Error during delete:', error);
        }

        // shob delete korar por kono row col thakbe na
        // kono data na pele savemodel and deleteAll btn disable thakbe

        if (this.TabelModel.length == 0) {
            this.FirstColArray = [];
            this.row = [];
            this.tableShow = false;
            this.NoData = !this.NoData;
        }

        // // kono data na pele savemodel and deleteAll btn disable thakbe
        // if (this.TabelModel.length < 1) {
        //     console.log('no data');
        //     this.tableShow = false;
        //     this.NoData = !this.NoData;
        //     // data thakle disable korbo nah delete button
        // }

    }




}

