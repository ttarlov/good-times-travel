import chai from 'chai';
const expect = chai.expect;

import Destinations from '../src/destinations';
import Trips from '../src/trips';

describe('Destinations', function() {
  let destinationsData;
  let destinations;


  beforeEach(function() {
    destinationsData = {
    "destinations": [
      {
      "id": 1,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
      },
      {
      "id": 2,
      "destination": "Stockholm, Sweden",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 780,
      "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "city with boats on the water during the day time"
      },
      {
      "id": 3,
      "destination": "Sydney, Austrailia",
      "estimatedLodgingCostPerDay": 130,
      "estimatedFlightCostPerPerson": 950,
      "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "opera house and city buildings on the water with boats"
      },
      {
      "id": 5,
      "destination": "Madrid, Spain",
      "estimatedLodgingCostPerDay": 150,
      "estimatedFlightCostPerPerson": 650,
      "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "city with clear skys and a road in the day time"
      },
      {
      "id": 6,
      "destination": "Jakarta, Indonesia",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 890,
      "image": "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "lit up city at night"
      },
      {
      "id": 7,
      "destination": "Paris, France",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 395,
      "image": "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      "alt": "city during the day time with eiffel tower"
      },
      {
      "id": 8,
      "destination": "Tokyo, Japan",
      "estimatedLodgingCostPerDay": 125,
      "estimatedFlightCostPerPerson": 1000,
      "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
      "alt": "city with people walking in crosswalk and brightly lit shops at night"
      }]
    };
      destinations = new Destinations(destinationsData);
  });

  it('is a function', function() {
    expect(Destinations).to.be.a('function');
  });

  it('should be an instance of Destinations', function() {
    expect(destinations).to.be.an.instanceof(Destinations);
  });

describe('getDestinationsById Method', function(){

  it.skip('should be able to find destinations by ID', function(){
    expect(destinations.getDestinationsById(8)).to.equal({
    "id": 8,
    "destination": "Tokyo, Japan",
    "estimatedLodgingCostPerDay": 125,
    "estimatedFlightCostPerPerson": 1000,
    "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
    "alt": "city with people walking in crosswalk and brightly lit shops at night"
    })
  });


});




});


//
