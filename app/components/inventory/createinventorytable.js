import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';


export default class InventoryCreateinventorytableComponent extends Component {
    @service store;
    @tracked items;

    @tracked isloading;


    inventoryTypeColumns = [
        {
            column_name: 'sku',
            column_property: 'sku',
        },
        {
            column_name: 'Name',
            column_property: 'Name',
        },
        {
            column_name: 'Description',
            column_property: 'Description',
        },
        {
            column_name: 'Full Des',
            column_property: 'Full Des',
        },
        {
            column_name: 'Manufacture',
            column_property: 'Manufacture',
        },
        {
            column_name: 'Expire',
            column_property: 'Expire',
        },
        {
            column_name: 'Storage type',
            column_property: 'Storage type',
        },
        {
            column_name: 'Catagory',
            column_property: 'Catagory',
        },
        {
            column_name: 'Catagory type',
            column_property: 'Catagory type',
        },
        {
            column_name: 'Inventory type',
            column_property: 'Inventory type',
        },
        {
            column_name: 'Allocation type',
            column_property: 'Allocation type',
        },
        {
            column_name: 'Unit measure',
            column_property: 'Unit measure',
        },
        {
            column_name: 'actions',
            column_property: 'actions',
        },
    ];


    constructor() {
        super(...arguments);


        // XXX
        // const newInventoryType = this.store.createRecord('inventory/inventory-list',
        //     // this.formData
        //     {
        //         sku: 'skuu',
        //         inv_name: 'inv_name',
        //         inv_type: 'inv_type',
        //         description: 'description',
        //         full_description: 'full_description',
        //         manufacturing_date: 'manufacturing_date',
        //         expire_date: 'expire_date',
        //         storage_type: 'storage_type',
        //         category_name: 'category_name',
        //         category_type: 'category_type',
        //         alloc_type: 'alloc_type',
        //         measure_type: 'measure_type',
        //     }
        //     // create_inventory: this.formData
        // );
        // console.log(newInventoryType);


        // findAll

        this.isloading = true;
        const inventoryType = this.store.findAll('inventory/inventory-list');
        // console.log(inventoryType);
        this.items = inventoryType;
        inventoryType.then(data => {
            let inventoryTypeObjects = data.map((element) => {
                // console.log(element);
                return element
            })
            // console.log(data);
            this.items = data;
            this.isloading = false;
        })
        // this.items = A([
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        //     { sku: 'skuu', inv_name: 'sdfasdf', description: 'sdfsad', full_description: 'sdfasdf', manufacturing_date: '08/02/24', expire_date: '07/03/24', storage_type: 'sdfasda', category_name: 'gasba', category_type: 'vabqsb', inv_type: 'basbas', alloc_type: 'fbdabv', measure_type: 'sbabas' },
        // ]);
    }
}




// this.creatingModel();
// async creatingModel() {
//     // creating model to insert data into it

// }
// sku: this.formData.sku,
// inv_name: this.formData.inv_name,
// description: this.formData.description,
// full_description: this.formData.full_description,
// manufacturing_date: this.formData.manufacturing_date,
// expire_date: this.formData.expire_date,
// storage_type: this.formData.storage_type,
// category_name: this.formData.category_name,
// category_type: this.formData.category_type,
// alloc_type: this.formData.alloc_type,
// measure_type: this.formData.measure_type,
