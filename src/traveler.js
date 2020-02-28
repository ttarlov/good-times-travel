// const User = require('./user');

// class Traveler extends User {
//   constructor(id, name, travelerType, apiRequestController) {
//     super(apiRequestController)
//     this.id = id;
//     this.name = name;
//     this.travelerType = travelerType;
//   }
//
//
//   getMyTrips() {
//
//   }
//
// }


class Traveler {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.travelerType = data.travelerType;
  }


  getMyTrips() {

  }

}




module.exports = Traveler
