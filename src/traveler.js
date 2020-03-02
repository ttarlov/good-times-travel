const moment = require("moment");

class Traveler {
  constructor(data, myTripsData) {
    this.id = data.id;
    this.name = data.name;
    this.travelerType = data.travelerType;
    this.myTrips = myTripsData;
    this.pastTrips = this.findPastTrips();
    this.futureTrips = this.findUpcomingTrips();
  }

  addDestinations(destinationsArray) {
    this.myTrips.forEach((trip) => {
    const tripDestination = destinationsArray.find((destination) => destination.id === trip.destinationID)
    trip.destination = tripDestination
    })
  }

  findPastTrips() {
    let pastTrips = [];
    let myTrips = this.myTrips;

    myTrips.forEach(trip => {
      if(moment(trip.date, "YYYY/MM/DD").fromNow().includes('ago')) {
        pastTrips.push(trip);
      }
    })
      return pastTrips;
  }


  findUpcomingTrips() {
    let futureTrips = []
    let myTrips = this.myTrips;

    myTrips.forEach(trip => {
      if(moment(trip.date, "YYYY/MM/DD").fromNow().includes('in')) {
        futureTrips.push(trip);
      }
    })
    return futureTrips;
  }





  getLastName() {
    return this.name.split(' ')[1];
  }

};




module.exports = Traveler
