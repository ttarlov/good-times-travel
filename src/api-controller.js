// this class will be responsible for fetching and posting to API
class ApiRequestController {
  constructor() {
    this.rootUrl = 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911';
  }


getUserById(id) {
  let url = `${this.rootUrl}/travelers/travelers/${id}`;
  console.log(id);
  return fetch(url).then(response => response.json());
}


fetchAllTrips() {
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

postTripRequest(tripRequestObj) {

let url = `${this.rootUrl}/trips/trips`;
return fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(tripRequestObj)
})
  .then(response => console.log(response.json()))
  .catch(error => console.log(error.message));
}


}

// test for the correct arguments being passed. check that function returns and has error handling.

module.exports = ApiRequestController
