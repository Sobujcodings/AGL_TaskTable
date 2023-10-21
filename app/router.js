import EmberRouter from '@ember/routing/router';
import config from 'library-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('about');
  this.route('contack');
  this.route('libraries', function () {
    this.route('new');
  });
  this.route('authors');
  this.route('books');
  this.route('library', { path: 'library/:id' });
  // :id dile params e likhbo params.id  :card dile lekhbo params.card; 
  // route r nam library path holo url
  // * ekkhane jei params diye route banabo route.js e shei nam ei params pabo (jamon id dile params.id lekhle pabo id k)

  this.route('admin', function () {
    this.route('Invitation');
    this.route('Contacts');
    this.route('seeder');
  });
  this.route('edit');
});
