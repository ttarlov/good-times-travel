// this class will be responsible for fetching and posting to API
class ApiRequestController {
  constructor() {
    this.rootUrl = 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911';
  }


getUserById(id) {
  let url = `${this.rootUrl}/travelers/travelers/${id}`;
  return fetch(url).then(response => response.json())
}


getTrips(){

//will get trips

}


getAllTravelers() {

}


getAllDestinations() {
  
}

}


module.exports = ApiRequestController
