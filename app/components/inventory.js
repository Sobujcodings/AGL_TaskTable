import { computed } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class InventoryComponent extends Component {
    @tracked inventory;


    @action changeInventoryType(type) {
        this.inventory = type;
        $('#inventoryModalContent').modal('show');
    }



    @tracked FormArray = A([{ sku: 'skuu', Name: 'sdfasdf', Des: 'sdfsad', FullDes: 'sdfasdf', Manufacture: 'sdfas', Expire: 'asbasb', StorageType: 'sdfasda', Catagory: 'gasba', CategoryType: 'vabqsb', InventoryType: 'basbas', AllocationType: 'fbdabv', UnitMeasure: 'sbabas', status: 'ssabas', edit: 'Edit' }]);
    @tracked firstObjectKeys = A(['sku', 'Name', 'Des', 'FullDes', 'Manufacture', 'Expire', 'StorageType', 'Catagory', 'CategoryType', 'InventoryType', 'AllocationType', 'UnitMeasure', 'status']);
    @tracked CreateInventoryEditItem;



    // edit create inventory, this.modaltabevalue will contains with existed value, with key value pair exact value;
    @action
    HandleCreateInventoryEdit(title, item) {
        console.log(item);


        $('#inventoryModalContent').modal('show');

        this.inventory = 'Create Inventory';


        

        this.CreateInventoryEditItem = '';
        this.CreateInventoryEditItem = item;

        // item theke niye sheta set kore dibo existed input field e.
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


        // // then open the create table modal
        // this.isModalOpenCreateInventory()

        // // ager shob input khali kore dibo
        // this.inputValues = {};
        // // ai item ta k just modal e show korbo.
        // console.log(item);
        // // console.log('edit create inventory');
        // // console.log(title);

        // // setting modaltable title
        // this.ModalHeader = title;

        // // modaltablevalue will contains here with all the null values.
        // this.ModalTableValue = A([item]);

        // setting dynamic modal size by calculating max key value number of an object
        // let maxKeysCount = 0;
        // this.ModalTableValue.forEach(obj => {
        //     let keysCount = Object.keys(obj).length;
        //     if (keysCount > maxKeysCount) {
        //         maxKeysCount = keysCount;
        //     }
        // });
        // if (maxKeysCount > 6) {
        //     // make modal size to lg
        //     console.log('xxl');
        //     this.ModalSize = 'xl';
        // }
        // else if (maxKeysCount >= 2) {
        //     this.ModalSize = 'lg';
        // }
        // else {
        //     this.ModalSize = 'md';
        // }


        // value set korar por now open the modal by calling this.openModal, now modal contains this.ModalTableValue data;
        // this.openModal();

        // this.openCreateInventoryModal();

    }

}



