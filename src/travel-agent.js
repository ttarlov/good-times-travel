class Agency {
  constructor(tripsData, listOfTravelers) {
    this.name = "Kim";
    this.trips = tripsData;
    this.travelers = listOfTravelers;
    this.pendingTrips = this.findPendingTrips();
  }


  addDestinations(destinationsArray) {
    this.trips.forEach((trip) => {
    const tripDestination = destinationsArray.find((destination) => destination.id === trip.destinationID)
    trip.destination = tripDestination
    })
  }

  findPendingTrips() {
    return this.trips.filter( trip => trip.status === 'pending')
  }

}

module.exports = Agency
