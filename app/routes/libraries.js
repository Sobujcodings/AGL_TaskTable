import Route from '@ember/routing/route';

export default class LibrariesRoute extends Route {
  async model() {
    // let response = await fetch('https://mocki.io/v1/88fe6e57-9555-4f6f-95c3-c84842e923cc');
    let response = await fetch('http://localhost:5000/users');
    let parsed = await response.json();
    console.log(parsed);
    return parsed;
  }
}
