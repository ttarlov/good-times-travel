//user class there will be two types of users. traveler and travel agency
class User {
  constructor(ApiRequestController) {
  this.trips = [];
  this.api = new ApiRequestController();
  }

}


module.exports = User;
