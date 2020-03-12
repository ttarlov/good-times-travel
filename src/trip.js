const moment = require("moment");

class Trip {
  constructor(travelerId, destinationID, travelers, date, tripDuration) {
    this.id = Date.now()
    this.userID = travelerId;
    this.destinationID = destinationID;
    this.travelers = travelers;
    this.date = date;
    this.duration = tripDuration;
    this.status = 'pending';
    this.suggestedActivities = [ ];
  }
}

module.exports = Trip
