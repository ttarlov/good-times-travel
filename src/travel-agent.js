const moment = require("moment");

class Agency {
  constructor(tripsData, listOfTravelers) {
    this.name = "Kim";
    this.trips = tripsData;
    this.travelers = listOfTravelers;
    this.pendingTrips = this.findPendingTrips();
    this.approvedTrips = this.findApprovedTrips();
    this.thisYearsTrips = this.findThisYearsTrips();
    this.todaysTrips = this.findTravelersForToday();
  }


  findTravelersForToday() {
    let tripsForToday = [];
    this.approvedTrips.forEach(trip => {
      if(trip.date == moment().format('YYYY/MM/DD')) {
        tripsForToday.push(trip)
      }
    })
    return tripsForToday;
  }

  countNumberOfTripsForToday() {
    return this.todaysTrips.length;
  }


  addDestinations(destinationsArray) {
    this.trips.forEach((trip) => {
    const tripDestination = destinationsArray.find((destination) => destination.id === trip.destinationID)
    trip.destination = tripDestination
  });
  }

  findPendingTrips() {
    return this.trips.filter( trip => trip.status === 'pending')
  }

  findApprovedTrips() {
    return this.trips.filter( trip => trip.status === 'approved')
  }

  findThisYearsTrips() {
    let tripsThisYear = [];
    let allTrips = this.trips;

    allTrips.forEach(trip => {
      let thisYearsTrip = trip.date.split('');
      if(thisYearsTrip[3] === '0' && trip.status === 'approved') {
        tripsThisYear.push(trip)
      }
    });
    return tripsThisYear;
  }


  calculateTotalIncome() {
    console.log(this.thisYearsTrips);
    let totalRevenue = this.thisYearsTrips.reduce((totalIncome, singleTrip) => {
      // console.log(totalIncome);
          totalIncome += ((singleTrip.destination.estimatedLodgingCostPerDay * singleTrip.duration) + (singleTrip.destination.estimatedFlightCostPerPerson * singleTrip.travelers))
          // console.log(totalIncome)
          console.log(typeof totalIncome);
      return totalIncome
    },0) * .1

    return totalRevenue.toFixed(2)
  }

}

module.exports = Agency
