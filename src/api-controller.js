// this class will be responsible for fetching and posting to API
class ApiRequestController {
  constructor() {
    this.rootUrl = 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911';
  }


getUserById(id) {
  let url = `${this.rootUrl}/travelers/travelers/${id}`;
  return fetch(url).then(response => response.json());
}


fetchAllTrips(){
  let url = `${this.rootUrl}/trips/trips`;
  return fetch(url).then(response => response.json())
}

fetchAllDestinations() {
  let url = `${this.rootUrl}/destinations/destinations`;
  return fetch(url).then(response => response.json())
}

getAllTravelers() {
  let url = `${this.rootUrl}/travelers/travelers`;
  return fetch(url).then(response => response.json());
}


getAllDestinations() {

}

}


module.exports = ApiRequestController
