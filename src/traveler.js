const moment = require("moment");
const ApiRequestController = require('./api-controller')


class Traveler {
  constructor(data, myTripsData) {
    this.id = data.id;
    this.name = data.name;
    this.travelerType = data.travelerType;
    this.myTrips = myTripsData;
    this.pastTrips = this.findPastTrips(); //need to test for these property changes
    this.futureTrips = this.findUpcomingTrips(); // need to test for these property changes
    this.pendingTrips = this.findPendingTrips();
    this.tripQuote = {};
    this.apiController = new ApiRequestController();
  }


  findCurrentTrips() {
    this.myTrips.filter(trip => {
      /// needs to find trips that have a date that falls on today. if trip date plus duration includes
      // today date push trip to the current trips array.
    })
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

  findPendingTrips() {
    let pendingTrips = [];
    let myTrips = this.myTrips;

    myTrips.forEach(trip => {
      if(trip.status === "pending") {
        pendingTrips.push(trip);
      }
    })
    return pendingTrips;
  }

  calculateTotalAmountSpentOnTrips() {
    let tripsThisYear = [];
    let myTrips = this.myTrips;
    myTrips.forEach(trip => {
      let thisYearsTrip = trip.date.split('');
      if(thisYearsTrip[3] === '0' && trip.status === 'approved') {
        tripsThisYear.push(trip)
      }
      // console.log(tripsThisYear);
    });
      return tripsThisYear.reduce((totalCost, singleTrip) => {
        // console.log(totalCost);

            totalCost += ((singleTrip.destination.estimatedLodgingCostPerDay * singleTrip.duration) + (singleTrip.destination.estimatedFlightCostPerPerson * singleTrip.travelers))
            // console.log(totalCost)
        return Math.round(totalCost * 1.1);
      },0);

  }


  calculatePotentialTripCost(allDestinations, potentialTrip) {
    let mathchedDestination = allDestinations.find( destination => destination.id ===
      potentialTrip.destinationID)
    console.log(mathchedDestination)
    let estimateTripCost = (mathchedDestination.estimatedLodgingCostPerDay *
      potentialTrip.duration) + (mathchedDestination.estimatedFlightCostPerPerson * potentialTrip.travelers);
    console.log(estimateTripCost);
    return Number((estimateTripCost * 1.1).toFixed(2));
  }


  getLastName() {
    return this.name.split(' ')[1];
  }


  submitTripRequest() {
    console.log(this.tripQuote);
  return this.apiController.postTripRequest(this.tripQuote);

  }


};




module.exports = Traveler
