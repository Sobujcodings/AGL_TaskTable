// serializers/table.js
import RESTSerializer from '@ember-data/serializer/rest';

export default class TableSerializer extends RESTSerializer {
    primaryKey = 'id'; // Set '_id' as the primary key instead of id
}
