import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class InventoryComponent extends Component {
    @service store;

    @tracked inventory;
    @tracked items;

    @tracked FormArray = A([{ sku: 'skuu', Name: 'sdfasdf', Des: 'sdfsad', FullDes: 'sdfasdf', Manufacture: 'sdfas', Expire: 'asbasb', StorageType: 'sdfasda', Catagory: 'gasba', CategoryType: 'vabqsb', InventoryType: 'basbas', AllocationType: 'fbdabv', UnitMeasure: 'sbabas', edit: 'Edit' }]);
    @tracked firstObjectKeys = A(['sku', 'Name', 'Des', 'FullDes', 'Manufacture', 'Expire', 'StorageType', 'Catagory', 'CategoryType', 'InventoryType', 'AllocationType', 'UnitMeasure']);
    @tracked CreateInventoryEditItem;


    @action changeInventoryType(type) {
        // console.log(type);
        this.inventory = type;
        $('#inventoryModalContent').modal('show');
    }


    CreateInventoryTableColumns = [
        {
            column_name: 'sku',
            column_property: 'sku',
        },
        {
            column_name: 'Name',
            column_property: 'Name',
        },
        {
            column_name: 'Desc',
            column_property: 'Desc',
        },
        {
            column_name: 'Full_Des',
            column_property: 'Full_Des',
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
            column_name: 'Storage_type',
            column_property: 'Storage_type',
        },
        {
            column_name: 'Catagory',
            column_property: 'Catagory',
        },
        {
            column_name: 'Catagory_type',
            column_property: 'Catagory_type',
        },
        {
            column_name: 'Inventory_type',
            column_property: 'Inventory_type',
        },
        {
            column_name: 'Allocation_type',
            column_property: 'Allocation_type',
        },
        {
            column_name: 'Unit_measure',
            column_property: 'Unit_measure',
        },
        {
            column_name: 'Actions',
            column_property: 'Actions',
        },
    ];



    people = [
        { name: 'María', surname: 'Murray' },
        { name: 'Søren', surname: 'Williams' },
        { name: 'João', surname: 'Jin' },
        { name: 'Miguel', surname: 'Camba' },
        { name: 'Marta', surname: 'Stinson' },
        { name: 'Lisa', surname: 'Simpson' },
    ];



    // edit create inventory, this.modaltabevalue will contains with existed value, with key value pair exact value;
    @action
    HandleCreateInventoryEdit(title, item) {
        console.log(item);

        // open modal
        $('#inventoryModalContent').modal('show');

        // so that create inventory form will be open in the modal
        this.inventory = "inventory-list";


        // edit e ai function e diye item set kore shei item k model e pass kore dibo!!!
        this.CreateInventoryEditItem = '';
        this.CreateInventoryEditItem = item;




        // item theke niye sheta set kore dibo existed input field e. XXX
        this.sku = item.sku;
        this.name = item.Name;
        this.description = item.Des;
        this.fullDescription = item.FullDes;
        this.manufacturingDate = item.Manufacture;
        this.expiryDate = item.Expire;
        this.storageType = item.StorageType;
        this.inventoryCategory = item.Catagory;
        this.categoryType = item.CategoryType;
        this.inventoryType = item.InventoryType;
        this.allocationType = item.AllocationType;
        this.unitOfMeasure = item.UnitMeasure;
        this.selectedstatus = item.status
        this.state = item.state;
        this.status = item.Status;

        // value set korar por now open the modal by calling this.openModal, now modal contains this.ModalTableValue data;
        // this.openModal();

        // this.openCreateInventoryModal();

    }


    @action
    handlecreateinventoryStatus(name, item) {
        console.log(item);
        set(item, 'active_status', true);
    }

}



