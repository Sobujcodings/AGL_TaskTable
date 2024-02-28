import RESTSerializer from '@ember-data/serializer/rest';
import { assign } from '@ember/polyfills';

export default class ApplicationSerializer  extends RESTSerializer {
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        // console.log(
        //     'normalize json payload:',
        //     payload,
        //     primaryModelClass.modelName
        // );
        if (payload.hasOwnProperty('meta')) {
            payload = {
                [primaryModelClass.modelName]: payload.data,
                meta: payload.meta,
            };
        } else {
            payload = {
                [primaryModelClass.modelName]: payload.data,
            };
        }

        // if (typeof payload.data === 'undefined') {
        //   console.log(
        //     'normalize json payload undefined:',
        //     payload,
        //     primaryModelClass.modelName
        //   );
        //   payload = {
        //     [primaryModelClass.modelName]: payload,
        //   };
        // } else {
        //   payload = {
        //     [primaryModelClass.modelName]: payload.data,
        //   };
        // }
        // console.log('normalize json:', payload);
        return super.normalizeResponse(
            store,
            primaryModelClass,
            payload,
            id,
            requestType
        );
    }

    // remove-model-name-from-ember-data-json
    serializeIntoHash(hash, type, record, options) {
        assign(hash, this.serialize(record, options));
    }

    // put, save
    serialize(snapshot, options) {
        console.log('serializer put:', snapshot);
        let json = super.serialize(...arguments);
        // console.log('jaso:', json);
        return json;
    }
}
