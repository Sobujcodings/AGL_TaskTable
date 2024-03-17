import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';


export default class InventoryInventoryModalComponent extends Component {
    @service fetchdata;
    @service store;
    @tracked TabNames = A(['Inventory', 'Inventory type', 'Inventory Catagory type', 'Inventory Catagory', 'Storage type', 'Allocation type', 'Unit of Measure']);
    @tracked selectedTab = 'Inventory';

    // if modal is closed then we know it from here then get the peekAll data which might be edited from the modal then rollbackattributes that whole model value or each model item using service to catch the model value after findAll.
    @action
    insertForModal(handleItemsToNull) {
        // this.SelectedInventory = SelectedInventory;
        $('#inventoryModalContent').on('hidden.bs.modal', function (event) {
            // do something...
            console.log('modal closed');
            handleItemsToNull();
        })
    }


    @action
    handleItemsToNull() {
        console.log('inventoryType', this.args.inventoryType);
        let allRecords = this.store.peekAll(`inventory/${this.args.inventoryType}`);
        // console.log(allRecords);
        allRecords.forEach(element => {
            set(element, 'isEdit', false);
            element.rollbackAttributes();
        });
    }


    @action
    handleTabName(singleTab) {
        console.log('clicked', singleTab);
        this.selectedTab = singleTab;
    }






    @tracked items;

    CreateInventoryTableColumns = [
        {
            column_name: 'SKU',
            column_property: 'sku',
        },
        {
            column_name: 'Name',
            column_property: 'Name',
        },
        {
            column_name: 'Description',
            column_property: 'Desc',
        },
        {
            column_name: 'Full_Description',
            column_property: 'Full_Des',
        },
        {
            column_name: 'Manufacture_date',
            column_property: 'Manufacture',
        },
        {
            column_name: 'Expire_date',
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



    // edit status of inventory table
    @action
    handleInventoryStatusEdit(item) {
        console.log(item);
        set(item, 'active_status', !item.active_status);
        item.save();
    }

}
