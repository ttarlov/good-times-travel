class Trips {
  constructor(tripsData) {
    this.allTrips = tripsData;
  }


  getTripsById(id) {
  return  this.allTrips.trips.filter(trip => trip.userID === id)
// use filter, return array of trips that just match the user id.
  }


}

module.exports = Trips;
