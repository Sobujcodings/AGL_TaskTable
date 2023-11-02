// app/serializers/library.js

import JSONAPISerializer from '@ember-data/serializer/json-api';
// import RESTSerializer from '@ember-data/serializer/rest';
// RESTSerializer
export default class LibrarySerializer extends JSONAPISerializer {
  // Specify which attributes to include in the payload
  // serializer defines how the data will be in the payload to go to the api
  // For example, include the 'name', 'address', and 'phone' attributes
  // if the dedicated model and serializer have same attributes then only model atribute is enough dont need serializer attributes
  // attrs = {
  //     name: 'name',
  //     address: 'address',
  //     phone: 'phone',
  // };
}
