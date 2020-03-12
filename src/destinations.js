class Destinations {
  constructor(destinationsData) {
    this.destinations = destinationsData;
  }


  getDestinationsById(id) {
    return this.destinations.destinations.find(destination =>
    destination.id === id);
  }


}

module.exports = Destinations;
