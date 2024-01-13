import Service from '@ember/service';

export default class MyServiceService extends Service {
    datas() {
        let datas = [
            {
                id: '10',
                name: 'John Doe',
                address: '123 Main Street, Cityville',
                isEdited: false,
            },
            {
                id: '20',
                name: 'Jane Smith',
                address: '456 Oak Avenue, Townsville',
                isEdited: false,
            },
            {
                id: '30',
                name: 'Bob Johnson',
                address: '789 Pine Road, Villagetown',
                isEdited: false,
            },
        ];
        return datas;
    }
}
