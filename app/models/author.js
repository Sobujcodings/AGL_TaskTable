import Model, { attr } from '@ember-data/model';
// import { adapter } from '../adapters/library'; // Import the adapter

export default class AuthorModel extends Model {
  @attr('string') idd;
  // if id is attach in beckend it can be automaitcally found in the model
  @attr('string') author;
  @attr('string') books;
  @attr('string') release;
  @attr('string') library;

  // * jei value post korcho shetar attribute r model r attribute same name hote hobe tobe beckend e jabe small letter e

  // attributes will be small letter after go to the beckend

  // *** ai attribute gulai beckend e jabe ai attribute r sathe mil rekhe data padhate hobe for CRUD taholei data pabo

  // @adapter('library') static LibraryAdapter; // Associate the adapter
}
