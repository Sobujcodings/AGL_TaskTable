import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { v1, v4 as uuid } from 'ember-uuid';
import { type } from 'jquery';

export default class InventoryTreeViewComponent extends Component {
    @service store;

    @tracked inventoryTypes;
    @tracked CatagoryTypes;
    @tracked Country;


    //
    @action
    addChildCategory(item) {
        if(item.category_name && item.category_type && item.inv_type && item.country){
            let category = {
                id: uuid(),
                category_name: null,
                children: A([]),
                parent_id: item.id,
                inv_type: null,
                category_type: null,
                country: null,
            }
            item.children.pushObject(category)
        }
        else{
            alert('inventory category name or category type or inventory type or country can not be blank.')
        }
        
        
    }


    @action
    removeCategory(item) {
        let alreadyExist = this.args.postItems.find(obj => obj.id === item.id);
        if (alreadyExist){
            this.args.postItems.removeObject(alreadyExist);
        }

        if (this.args.isRoot) {
            this.args.categories.removeObject(item)
            return;
        }
        if (this.args.children) {
            this.args.children.removeObject(item)
        } else {
            this.args.parent.children.removeObject(item)
        }
    }


    @tracked copyItem = null;

    constructor() {
        super(...arguments);
        this.copyItem =  JSON.parse(JSON.stringify(this.args.item));
        this.inventoryTypes = this.getInventoryType();
        this.CatagoryTypes = this.getCatagoryType();
    }


    // inv type data for dropdown
    getcachInventoryType() {
        const inv_types = this.store.peekAll('inventory/inventory-type');
        // console.log(inv_types);
        return inv_types;
    }

    async getInventoryType() {
        let invTypeArray = [];
        let invtypedata = this.getcachInventoryType();
        if (Object.keys(invtypedata).length === 0) {
            // console.log('findAll it');
            invtypedata = await this.store.findAll('inventory/inventory-type');
            // console.log(invtypedata);
            let types = invtypedata.filter(obj => obj.active_status == true);
            // console.log('types', types);
            types.forEach(element => {
                invTypeArray.push(element.inv_type);
            });
            
        }
        else {
            let types = invtypedata.filter(obj => obj.active_status == true);
            // console.log('types', types);
            types.forEach(element => {
                invTypeArray.push(element.inv_type);
            });
        }
        return invTypeArray;
    }



    // catagory type
    getcachCatagoryType() {
        const category_type = this.store.peekAll('inventory/inventory-category-type');
        // console.log(category_type);
        return category_type;
    }

    @action
    async getCatagoryType() {
        let CatagoryTypeArray = [];
        let Country = [];
        let Catagorytypedata = this.getcachCatagoryType();
        if (Object.keys(Catagorytypedata).length === 0) {
            // console.log('findAll it');
            Catagorytypedata = await this.store.findAll('inventory/inventory-category-type');
            // console.log(Catagorytypedata);
            let types = Catagorytypedata.filter(obj => obj.active_status == true);
            // category type array
            types.forEach(element => {
                CatagoryTypeArray.push(element.category_type);
            });
            // country
            types.forEach(element => {
                element.country.forEach(element => {
                    // Check if the country is not already in the array before adding it
                    if (!Country.includes(element)) {
                        Country.push(element);
                    }
                });
            });
            // console.log(Country);
            this.Country = Country;
        }
        else {
            let types = Catagorytypedata.filter(obj => obj.active_status == true);
            // console.log('types', types);
            types.forEach(element => {
                CatagoryTypeArray.push(element.category_type);
            });
            // country
            types.forEach(element => {
                element.country.forEach(element => {
                    // Check if the country is not already in the array before adding it
                    if (!Country.includes(element)) {
                        Country.push(element);
                    }
                });
            });
            this.Country = Country;
            // console.log(invTypeArray);
        }
        return CatagoryTypeArray;
    }




    // 
    @action
    handledropdown(data, property, value) {
        // console.log('value', value);
        set(data, property, value);
        this.trackingItem();
    }

    @action
    trackingItem() {
        if(JSON.stringify(this.copyItem) !== JSON.stringify(this.args.item)){
            let alreadyExist = this.args.postItems.find(item => item.id === this.args.item.id);
            if (alreadyExist){
                this.args.postItems.removeObject(alreadyExist);
                this.args.postItems.pushObject(this.args.item)
            } else {
                this.args.postItems.pushObject(this.args.item)
            }
        }
    }

    @action
    onChangeInput(value) {
        this.trackingItem();
    }
}
