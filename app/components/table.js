import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEqual } from '@ember/utils';
// import { push } from 'qunit';
// import { ChunkGraph } from 'webpack';

// TODO: Add Row and Add Column
// create record kore pura object/whole record ta dhukiye dite hobe whole datay ba record e then sheta shei bhabei dekhab jabe
// r shei function e true false kore action r age shei table k dekhabo true hole r shei table e value thakbe jgula ami add korlam ai function createRecord diye

// TODO: add column r bame akta input field thakbe jetay jei column add korbo tar nam lekhbo shei nam e column add hobe
// joto khushi column add kora jabe and shob column delete kora jabe execpt action column
// TODO: aksathe korle cholbe nah protteck ta check korte hobe konta null r konta null nah then sheibhabe
// insert korte hobe otherwise ager motoi thakbe

export default class TableComponent extends Component {
    @service store;

    @tracked modelData = this.args.model;

    // data contains all json data via peekAll('table');
    @tracked Data;
    // @tracked Data;

    @tracked edit = false;

    @tracked handleOne;
    @tracked handleTwo;
    @tracked handleThreeOne;
    @tracked handleThreeTwo;
    @tracked handleThreeThree;

    @tracked OldInputName;
    @tracked OldInputAddress;
    @tracked OldInputThereValue;

    // @tracked index;

    @tracked InputValueCol;

    @tracked createCol = false;

    @tracked ColumnArray = [];

    // ata array [] hoteo pare jodi age na kora thake ba prothom e array hoteo pare check it
    // faka array mane true e howa karon faka holeo to ache
    // @tracked updatedColArray = [];

    // for thirt input value function
    @tracked UpdatedEvent = [{}];

    @tracked RemoveName = true;
    @tracked RemoveAddress = true;

    @tracked KeyValue;

    @tracked ToChangedObj = [];

    @tracked changedObj = [];

    @action
    handleEdit(item, data) {
        console.log(item);

        // jei id match khay shetay add korbo then shetay akta edited true kore dibo and true hole input field dekhabo
        const result = data.filter((singledata) => singledata.id == item.id);
        console.log(result);
        result.forEach((element) => {
            console.log(element);
            this.handleInput(element.name, element.address, element.ColumnArray);
            // ager bar true thakay false kore dilam akhn karon false na thakle notun kore opren hobe na true thakle abar false korte hobe then true korte hobe double click kore
            if (element.isEdited == true) {
                element.set('isEdited', false);
                // this.edit = false;
            } else {
                element.set('isEdited', !this.edit);
            }
            console.log(element);
        });

        console.log(item.ColumnArray);

        // TODO: Shudu zip ba aktar value padhale hobe nah jetay lekhchi sheta khuje ber kore then set korte hobe oto
        // no index value match kore

        // ConcernEdit
        // handleinput e padhiye dilam shethan theke check korbo same ache kina value
        // ager value guloke padhiye dilam
        // this.handleInput(item.name, item.address, item.ColumnArray);
    }

    @action
    // name and address come from edit function
    handleInput(name, address, ThreeValue) {
        console.log(name, address);

        // save r shomoy jodi oi input field khali pai tahole ager ta kei set kore dibo
        // r jodi na pai tahole event diye jeta pelam sheta set kore dibo
        this.OldInputName = name;
        this.OldInputAddress = address;
        this.OldInputThereValue = ThreeValue;
        // akhn handle safe e ai 2ta k compare korbo khali hole ager ta nahole new ta(input filed r ta)
    }

    // save
    @action
    HandleInputeOne(event) {
        let eventname = event.target.value;
        console.log(eventname);
        // input r kono field khali thakle shei object r ager value takei shetar value hishebe set kore dibo

        // akhn jodi ai event r value notun kichu ashe tahole shetakei handleone e set korbo noyto ager tai set kore dibo
        this.handleOne = event.target.value;
    }

    @action
    HandleInputeTwo(event, name) {
        // this.inputValue = ;
        console.log(event.target.value);
        // input r kono field khali thakle shei object r ager value takei shetar value hishebe set kore dibo
        this.handleTwo = event.target.value;
        console.log(name);
    }

    @action
    HandleInputeThree(key, event) {
        console.log(key);

        let eventname = event.target.value;
        console.log(eventname);

        let keyName = key;
        let ValueName = eventname;

        let KeyValue = { [keyName]: ValueName };

        // let ToChangedObj = [];

        // *** ekhane shugulai ache input jegular value change hoice baki jgula change hoi nai segula to sheibhabai rakhte hobe ata check korte hobe j change hoice kina 
        // *** shob push korle cholbe na last e e jeta input nici event sheta k add korte hobe
        this.ToChangedObj.push(KeyValue);
        // *** jeta input dewa hoy nai sheta keo add korte hobe input value
        console.log(this.ToChangedObj);


        // Create a map to store the last occurrence of each value
        let lastOccurrences = {};

        this.ToChangedObj.forEach(obj => {
            let key = Object.keys(obj)[0]; // Get the property name dynamically
            lastOccurrences[key] = obj;
        });
        // Extract the values (last occurrences) from the map
        let uniqueObjects = Object.values(lastOccurrences);


        console.log(uniqueObjects);
        // event r uniqe gula tochange e rakhlam ai tochange k abar columnarray baniye dibo save korle
        console.log(this.ColumnArray);
        this.ToChangedObj = uniqueObjects;
        console.log(this.ToChangedObj);


        // let array1 = [{ df: 3675 }, { dfdfg: 3930 }];
        // let array2 = [{ df: 36751 }, { dfdfg: 3930 }];

        // Merge arrays
        let mergedArray = this.ColumnArray.map(obj1 => {
            let updatedObj = this.ToChangedObj.find(obj2 => Object.keys(obj1)[0] === Object.keys(obj2)[0]);
            // return updatedObj;
            if (updatedObj) {
                return updatedObj
            }
            else {
                return obj1
            }
            //   return updatedObj ? updatedObj : obj1;
        });
        console.log(mergedArray);
        this.ToChangedObj = mergedArray;

        // // Create a map to store the last occurrence of each value
        // let lastOccurrencestwo = {};

        // mergedArray.forEach(obj => {
        //     let key = Object.keys(obj)[0]; // Get the property name dynamically
        //     lastOccurrences[key] = obj;
        // });
        // // Extract the values (last occurrences) from the map
        // let uniqueObjectstwo = Object.values(lastOccurrencestwo);
        // console.log(uniqueObjectstwo);

        // this.ToChangedObj = uniqueObjectstwo;
        // console.log(uniqueObjectstwo);






        // // 3tar jonno 3tay rakhbo shei 3ta kei replace kore dibo model r colunmArray r value k
        // if (!this.handleThreeOne) {
        //     this.handleThreeOne = eventname;
        // }
        // else if (!this.handleThreeTwo) {
        //     this.handleThreeTwo = eventname;
        // }
        // else {
        //     this.handleThreeThree = eventname;
        // }

        // concern: jei input gula pabo shegula akta array te joma korbo then match kore shei obj k ager columnArray obj miliye mille replace korben
        // shei gulor sathe milabo konta mile tahole bollam ok kore tahole achill

        // // input r kono field khali thakle shei object r ager value takei shetar value hishebe set kore dibo
        // // console.log(this.args.value);
        // // akhn jodi ai event r value notun kichu ashe tahole shetakei handleone e set korbo noyto ager tai set kore dibo
        // this.handleThree = event.target.value;

        // // akta array nibo shei array te ai event r value gula boshabo then shei value guloke loop kore UI te dekhabo
        // // jokhon handleThree ta te kichu thake tokhon ai condition dibo
        // if (this.UpdatedEvent.includes(eventname)) {
        //     return
        // }
        // else {
        //     // jotogulo column insert kora hoyeche totogulo porjonto korbo
        //     // if (this.UpdatedEvent.length == this.ColumnArray.length) {
        //     //     return
        //     // }
        //     // else {
        //         // if (this.UpdatedEvent == 2) {
        //         this.UpdatedEvent.push(eventname);
        //         // *** ekhane shob value joma hocche arry te last tai nibo save e click korle
        //         // }
        //     // }
        // }
        // console.log(this.UpdatedEvent);
    }

    // @action
    // (key, event) {
    //     console.log(event.target.value);
    //     console.log(key);
    //     // console.log(value);
    //     // this.handleSave({key,value})
    //     this.KeyValue = key;
    // }

    @action
    handleSave(item, model) {
        // console.log(this.KeyValue);
        // safe e click korle kontar jonno save click korchi sheta age ber koro match kore
        // shei item r ColumnArray r kon object ta change hoice sheta ber koro and shetake
        // replace kore dew new value diye

        // value gula k element e set kore then true k false kore dibe atai or kaj
        const result = model.filter((singledata) => singledata.id == item.id);
        // console.log(result);
        result.forEach((element) => {
            // console.log(element);
            // ager bar true thakay false kore dilam akhn karon false na thakle notun kore opren hobe na true thakle abar false korte hobe then true korte hobe double click kore
            if (element.isEdited == true) {
                element.set('isEdited', false);
                // this.edit = false;
            }
        });



        // ***
        // age thekei to columnarray te jegula add korchi shegula add ache akhn shegula replace korte hobe abar push
        // kore jabe nah

        console.log(this.ColumnArray);

        // ai to change r gula this.comluarray r sathe update korbo ekanen sehgulauai ache jgula input change hoice
        // r baki gula k thik rakhte hobe colarray r 
        // ekhane shugulai ache input jegular value change hoice baki jgula change hoi nai segula to sheibhabai rakhte hobe ata check korte hobe j change hoice kina 
        // *** ekhane jhamela ache
        console.log(this.ToChangedObj);
        this.ColumnArray = this.ToChangedObj;
        console.log(this.ColumnArray);

        // ata shudhu ekhanei add hobe ai funciton call hole
        // na hole jodi add col kori tahole ager colarray r sathei add hoye jacceh ager bhao r moto


        // model.forEach((originalModel) => {
        //     console.log(originalModel);
        //     // Find the corresponding update object
        //     // originalModel.ColumnArray.forEach((element, index) => {
        //         // console.log(element, index);
        //         console.log(this.ToChangedObj);
        //         originalModel.set('ColumnArray', this.ToChangedObj);
        //         console.log(originalModel.ColumnArray);

        //         // col toyrir shomoy r value.
        //         // console.log(this.ColumnArray);
        //     // });




        // for (const keyone in element) {
        //     if (Object.hasOwnProperty.call(element, keyone)) {
        //         // const element = object[keyone];
        //         console.log(keyone);
        //         // const result = this.ToChangedObj.filter((singledata) => console.log(singledata));
        //         this.ToChangedObj.forEach(element => {
        //             for (const keytwo in element) {
        //                 if (Object.hasOwnProperty.call(element, keytwo)) {
        //                     // const item = this.ToChangedObj[keytwo];
        //                     console.log(keytwo);
        //                     if (keyone == keytwo) {
        //                         console.log('match', keyone, keytwo);
        //                         console.log('atai shei elemenet jetar value change korbo', element);
        //                         element[keyone] = keyone;
        //                         console.log(element);

        //                         // if (!this.changedObj.includes(element)) {
        //                         //     this.changedObj.push(element);
        //                         // }
        //                         // ai porjonto thik ache ai key r object gulakei ber kor.set('') kore ditam


        //                         // console.log(element[keyone]);
        //                         // // akhn match korbo j ai key ta kontar shei obj k dhore key same rekhe value change kore dibo jeta ekhnae pelam
        //                         // // originalModel.ColumnArray.forEach(singleobj => {
        //                         // // const result = originalModel.ColumnArray.filter((singledata) => singledata[keyone] == keyone);
        //                         // // console.log(result);
        //                         // // Find objects with matching keys
        //                         // // Find objects with the matching key
        //                         // let matchingObjects = originalModel.ColumnArray.filter((obj) => obj.keys == keyone);
        //                         // console.log('ata match koreche',matchingObjects);

        //                         // matchingObjects.keyone = element[keyone];
        //                         // });
        //                     }
        //                 }
        //             }
        //         });
        //     }
        // }



        // If an update object is found, update the values of matching keys
        // if (updateObject) {
        //     Object.keys(updateObject).forEach(key => {
        //         // Ensure that the key exists as an attribute in the Ember Data model
        //         if (originalModel.hasOwnProperty(key)) {
        //             o.set('')(key, updateObject[key]);
        //         }
        //     });
        // }

        // console.log(this.ToChangedObj);
        // });


        // model.forEach(element => {
        //     if (!this.handleOne) {
        //         // null h.set('') kore dibo
        //    .set('')('name', this.OldInputName);
        //     }
        //     else if (!this.handleTwo) {
        //         element.set('address', this.OldInputAddress);
        //     }

        //     // else if (!this.handleThree) {
        //     //     element.set('name', this.OldInputThereValue);
        //     // }

        //     else if (this.handleOne) {
        //         element.set('ColumnArray', this.handleOne);
        //     }
        //     else if (this.handleTwo) {
        //         element.set('address', this.handleTwo);
        //     }
        //     // else if (this.handleThree) {
        //     //     element.set('ColumnArray', this.handleThree);
        //     // }
        //     else {
        //         return
        //     }
        // });


        //     // if (this.handleOne) {
        //     //     element.set('name', this.handleOne);
        //     // } else {
        //     //     element.set('name', this.OldInputName);
        //     // }
        //     // if (this.handleTwo) {
        //     //     element.set('name', this.handleTwo);
        //     // } else {
        //     //     element.set('name', this.OldInputAddress);
        //     // }
        //     // console.log(element);
        //     element.set('name', this.handleOne);
        //     element.set('address', this.handleTwo);
        //     // *** TODO: 3No dekhte hobe konta change korbo
        //     element.set('ZipCode', this.handleThree);
        //     // // this.edit = !this.edit;
        //     // // element.save();
        //     // element.isEdited = !this.edit;
        //     // element.set('isEdited', !this.Data);

        // });


        // TODO: tarpor cls e conditoin dibo ekhanr input value k niye text e overide korbo jokhon ai traced r value
        //  tahke tokhon ata dekhabe noyto normal json r value dekhabe, then true k abar false kore dibo

        // TODO: shob row dlt r por abar new coloumn korte hole newCreateRecord diye kora jay naki dkehte hobe

        // this.Data = this.store.peekAll('table');
        // this.Data = true;
        // this.Data = this.changedObj
        // console.log(this.store.peekAll('table'));
    }



    // destroy
    // jei item e click hoice id diye filter kore ber korbo and shei item k destroy kore dibo from the model/store
    @action
    handleDelete(item, wholeData) {
        console.log('destroy');

        console.log(item);

        const result = wholeData.filter((singledata) => singledata.id == item.id);

        result.forEach((element) => {
            console.log(element);
            // TODO: pura element destroy na kore dekha lagbe shudhu oi item ta ki delete kora jay naki shudhu ba whole model ta thaklo just item gula delte holo
            element.destroyRecord();
            this.index = this.index - 1;
        });
        // TODO: shob gula delete hoye gele amon akta bebostha korte hobe jate array/obj ba model ta thake jate sekhane
        // abar kichu row/col add kora jay
    }



    // CreateRow
    @action
    CreateRow(wholeData) {
        console.log('created row');

        // for (let index = 4; index < 100; index++) {
        // const element = array[index];
        const newAuthor = this.store.createRecord('table', {
            // id: ModelData.length + 1,
            name: 'Mike Doe',
            address: '123 Main Street, Cityville',
            isEdited: false,
        });
        newAuthor.save();

        if (this.RemoveName == false) {
            // to show the name and address after creating a row
            this.RemoveName = !this.RemoveName;
            this.RemoveAddress = !this.RemoveAddress;
        }
    }



    // create col r input field r value jei nam e col create korbo tar input value
    @action
    handleCoLInput(event) {
        this.InputValueCol = event.target.value;
    }


    @action
    CreateColumn(ModelData) {
        console.log('createCol');

        // jodi kono row e na thaken tokhon kisher opor col boshabo tai row na thakle mane name,address na thakle
        // bolbo age first e name and address add koro alert diye
        // drkr hole abar ekhane create row kore dite pari akta then shetar opore create column korte pari
        // ModelData.forEach(element => {
        //     console.log(element);
        // });


        if (!this.InputValueCol) {
            alert('Insert a Column name first!');
            return;
        }


        // if (condition) {
        this.createCol = true;
        // }


        // random number generation
        const random4DigitNumber = Math.floor(Math.random() * 9000) + 1000;


        let array = [];
        if (this.ColumnArray.length > 0) {
            array.push({ [this.InputValueCol]: random4DigitNumber });
            console.log(this.ColumnArray);
            // console.log(arraytwo);
            this.ColumnArray = [...this.ColumnArray, ...array];
            console.log(this.ColumnArray);
            // console.log(arraytwo);
            // element.ColumnArray.push({ [this.InputValueCol]: random4DigitNumber });
            // console.log(element.ColumnArray);
            // this.ColumnArray = element.ColumnArray;
            // console.log('age chilo na');
            // console.log(this.ColumnArray);
            // console.log(this.createCol);
        }
        else {
            // console.log(typeof this.modelData);
            // var afterinsertOne;
            this.modelData.forEach((element) => {
                console.log(element);

                element.ColumnArray.push({ [this.InputValueCol]: random4DigitNumber });
                console.log(element.ColumnArray);
                this.ColumnArray = element.ColumnArray;
                console.log('age chilo na');
                console.log(this.ColumnArray);
                console.log(this.createCol);
                // TODO: row akbare khali kore dile col r add hoy nah
                // if (!element.ColumnArray) {
                //     element.ColumnArray = [];
                //     element.ColumnArray.push({ [this.InputValueCol]: 46436 });
                //     this.ColumnArray = element.ColumnArray;
                // }
                // shob col delete kore felle akta faka array set kore dilam model r columarray te jate poreo
                // data push kora jay ai array te (optional)
                // if (element.ColumnArray == undefined) {
                // // element.set('ColumnArray', []);
                // element.ColumnArray = [];
                // }
                // element.ColumnArray.push({ [this.InputValueCol]: random4DigitNumber });
                // afterinsertOne = element.ColumnArray;
                // console.log(afterinsertOne);
                // console.log(element.ColumnArray.length);
                // console.log(element.ColumnArray);]


                // jodi ager thake mane age col create kora thake tokthon ager tay dibo noyto atay dibo
                // if (this.ColumnArray.length > 0) {
                //     console.log('age chilo');
                //     element.ColumnArray.push({ [this.InputValueCol]: random4DigitNumber });
                //     console.log(this.ColumnArray);
                //     console.log(element.ColumnArray);
                //     // const newobj = [...this.ColumnArray, ...element.ColumnArray];
                //     // console.log(newobj);
                //     // this.ColumnArray = newobj;
                //     this.ColumnArray = element.ColumnArray;
                //     // console.log(element.ColumnArray);
                //     // console.log(this.ColumnArray);
                //     console.log(this.createCol);
                // }
                // else {

                // else {

                // }

                // }
            });
        }

    }



    // console.log(typeof this.modelData.Column);
    // this.modelData.forEach(element => {
    //     // console.log(typeof element);
    //     // console.log(element.Column);
    //     element.Column.forEach(element => {
    //         // console.log(element);
    //         for (const key in element) {
    //             if (Object.hasOwnProperty.call(element, key)) {
    //                 const value = element[key];
    //                 console.log(key);
    //                 console.log(value);
    //             }
    //         }
    //     });
    // });




    // Remove Name and Address
    // * EveryThing should be dynamically connected to the model
    @action
    NameAddressRemove(NameOrAddress, AllItem) {
        // console.log('name/add removed');
        // name and address jetay pabo name pele shob item r name field delete kore dibo

        console.log(typeof NameOrAddress);
        console.log(AllItem);

        if (NameOrAddress == 'name') {
            console.log('name');
            // const name = 'name';
            AllItem.forEach((item) => {
                // const name = item.get('name');
                console.log(item);
                // console.log(item.get('name'));

                // console.log(Object.keys(name));

                // console.log(item.___recordState.record);

                // for (const key in item.___recordState.record) {
                //     if (Object.hasOwnProperty.call(item.___recordState.record, key)) {
                //         // console.log(key);
                //         const element = item.___recordState.record[key];
                //         console.log(element);
                //     }
                // }

                item.set('name', null);
                this.RemoveName = !this.RemoveName;
                console.log(item);
                // Save the record to persist the changes to the server
                item
                    .save()
                    .then(() => {
                        // Record updated successfully
                        console.log('Record updated successfully');
                    })
                    .catch((error) => {
                        // Handle the error
                        console.error('Error updating record:', error);
                    });

                // console.log(Object.keys(item.recordState));

                // for (const key in item) {
                //     if (Object.hasOwnProperty.call(item, key)) {
                //         // console.log(item);
                //         const element = item[key];
                //         // if (element == "RecordState") {
                //         //     console.log(element);
                //         // }
                //         // console.log(element);
                //         for (const key in element) {
                //             if (Object.hasOwnProperty.call(element, key)) {
                //                 const item = element[key];
                //                 console.log(item);

                //             }
                //         }

                //     }
                // }

                // console.log(Object.keys(item));
                // console.log(item.name);
                // allitem r prottek item r ai filed theke delete kore deo filter kore
                // prottek item r name gulo delete kore deo
            });
        } else {
            // const address = 'address';
            AllItem.forEach((item) => {
                console.log('address');
                console.log(item);
                console.log(item.address);

                item.set('address', null);
                this.RemoveAddress = !this.RemoveAddress;
                console.log(item);
                // Save the record to persist the changes to the server
                item
                    .save()
                    .then(() => {
                        // Record updated successfully
                        console.log('Record updated successfully');
                    })
                    .catch((error) => {
                        // Handle the error
                        console.error('Error updating record:', error);
                    });
            });
        }
    }



    @action
    handleColRemove(itemToRemove) {
        // this.createCol = !this.createCol;

        // jei column r click korbe shei col r nam joto value ache prottek row te segulo delete korbo shei nam e
        // ZipCode: 23842, zipcode dlt korte chaile shob row te zipcode khuje dlt kore dibo
        console.log(this.modelData);
        console.log('col removed');
        console.log(itemToRemove);
        // filter kore ai item jei jei ColumnArray te ache ColumnArray theke shei item guloke pop kore dibo

        // const result = wholeData.filter((singledata) => singledata.id == item.id);
        // this.modelData.forEach(element => {
        //     // let colRemove = element.filter((singleData => singleData.item == item));
        //     console.log(element);
        //     // element.ColumnArray.forEach(element => {
        //     //     console.log(element);
        //     let colRemove = element.ColumnArray.filter((singleData => singleData == item));
        //     console.log(colRemove);
        //     // element.ColumnArray(colRemove);

        //     // element.destroyRecord('table');

        //     // colRemove.destroyRecord();

        //     // element.ColumnArray.pop(colRemove);
        //     // console.log(element);
        //     // element.save();
        //     // });
        // });
        // this.modelData.save();

        // Item to remove
        // const itemToRemove = { gfsgsfg: 46436 };

        console.log(this.ColumnArray);
        this.ColumnArray.forEach((item) => {
            console.log(item);
            // Find the index of the matching object in ColumnArray
            const indexToRemove =  this.ColumnArray.findIndex((obj) =>
                isEqual(obj, itemToRemove),
            );
            console.log(indexToRemove);
            // If the object is found, remove it
            if (indexToRemove !== -1) {
                this.ColumnArray.splice(indexToRemove, 1);
                // item.ColumnArray.removeObject(itemToRemove);
            }
            // console.log(item);
            console.log('col array after deleting a col', this.ColumnArray);
            this.ColumnArray = this.ColumnArray;
            // ata columnArray diye korleo partam columnArray ke each kore ui te dekhate partam ak e
            // delete korar por jei value gulo thake tader abar notun kore shei ak e state e set kore dilam
            // tahole sheta update hoye jabe notun kore
            // this.ColumnArray = item.ColumnArray;

            // console.log(this.ColumnArray);
            // console.log(this.updatedColArray);



            // Iterate through each item in modelData
            // this.modelData.forEach((item) => {
            // console.log(item);
            //     // Find the index of the matching object in ColumnArray
            //     const indexToRemove = item.ColumnArray.findIndex((obj) =>
            //         isEqual(obj, itemToRemove),
            //     );
            //     console.log(indexToRemove);
            //     // If the object is found, remove it
            //     if (indexToRemove !== -1) {
            //         item.ColumnArray.splice(indexToRemove, 1);
            //         // item.ColumnArray.removeObject(itemToRemove);
            //     }
            //     console.log(item);
            //     console.log('col array after deleting a col', item.ColumnArray);
            //     // ata columnArray diye korleo partam columnArray ke each kore ui te dekhate partam ak e
            //     // delete korar por jei value gulo thake tader abar notun kore shei ak e state e set kore dilam
            //     // tahole sheta update hoye jabe notun kore
            //     this.ColumnArray = item.ColumnArray;

            //     console.log(this.ColumnArray);
            //     // console.log(this.updatedColArray);
        });
    }
}
