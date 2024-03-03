import RESTSerializer from '@ember-data/serializer/rest';
// import { assign } from '@ember/polyfills';

export default class ApplicationSerializer extends RESTSerializer {
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        if (payload.hasOwnProperty('meta')) {
            // id = payload.data.id;
            payload = {
                [primaryModelClass.modelName]: payload.data,
                meta: payload.meta,
            };
        } else {
            // id = payload.data.id;
            payload = {
                [primaryModelClass.modelName]: payload.data,
            };
        }
        // console.log('store:', store);
        // console.log('primaryModelClass:', primaryModelClass);
        // console.log('payload:', payload);
        // console.log('id:', id);
        // console.log('requesttype:', requestType);

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
        // console.log('serializer into hash:', hash, type, record, options);
        Object.assign(hash, this.serialize(record, options));
    }

    // put, save
    serialize(snapshot, options) {
        let json = super.serialize(...arguments);
        // console.log('serializer:', json);
        return json;
    }


}
