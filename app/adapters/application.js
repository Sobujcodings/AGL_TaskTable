import RESTAdapter from '@ember-data/adapter/rest';
import config from 'library-app/config/environment';
import { camelize, decamelize } from '@ember/string';
import { pluralize } from 'ember-inflector';
import { inject as service } from '@ember/service';

export default class ApplicationAdapterextends extends RESTAdapter {
    // @service auth;

    // host = 'http://192.168.1.88:8000';
    host = 'http://192.168.1.57:8000';
    namespace = 'api/v1';

    get headers() {
        return {
            'X-Api-Key': 'ALL2yMwV.qx5W3pYYaZOHFG2rE3ph9jbI67OJsPRw',
            // 'Authorization': 'Bearer ' + this.auth.customerAcessToken
        };
    }



    urlForCreateRecord(modelName, snapshot) {
        return super.urlForCreateRecord(...arguments) ;
    }

    urlForQueryRecord(modelName, snapshot) {
        return super.urlForQueryRecord(...arguments) + '/';
    }

    urlForUpdateRecord(id, modelName, snapshot) {
        return super.urlForUpdateRecord(...arguments) + '/';
    }



    pathForType(type) {
        let splitType = type.split('/');
        if (splitType[1]) {
            if (splitType[1].includes('-') || splitType[0].includes('-')) {
                let model = camelize(type);
                return decamelize(model);
            } else {
                return pluralize(type);
            }
        } else {
            if (splitType[0].includes('-')) {
                let model = camelize(type);
                return decamelize(model);
            }
            return pluralize(type);
        }
    }

    shouldBackgroundReloadAll(store, snapshotArray) {
        return false;
    }

    shouldBackgroundReloadRecord(store, snapshot) {
        return false;
    }

    shouldReloadAll(store, snapshotArray) {
        let snapshots = snapshotArray.snapshots();
        return snapshots.length === 0;
    }

    shouldReloadRecord(store, ticketSnapshot) {
        return false;
    }
}
