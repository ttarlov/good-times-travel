import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/traveler';
import Trips from '../src/trips';
const moment = require("moment");
let m = moment();

describe('Traveler', function() {
  let traveler;
  let listOfTravelers;
  let tripsData;
  let trip;
  let destinationsData;

  beforeEach(function() {
    destinationsData = [
      {
        "id": 49,
        "destination": "Castries, St Lucia",
        "estimatedLodgingCostPerDay": 650,
        "estimatedFlightCostPerPerson": 90,
        "image": 'fake-img.jpg',
        "alt": "aerial photography of rocky mountain under cloudy sky"
      },
      {
        "id": 25,
        "destination": "New York, New York",
        "estimatedLodgingCostPerDay": 175,
        "estimatedFlightCostPerPerson": 200,
        "image": 'fake-img.jpg',
        "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
      },
      {
        "id": 19,
        "destination": "Quito, Ecuador",
        "estimatedLodgingCostPerDay": 60,
        "estimatedFlightCostPerPerson": 500,
        "image": 'fake-img.jpg',
        "alt": "a city at night with cloudy, snowy mountains in the distance"
      },
      {
        "id": 13,
        "destination": "St. Petersburg, Russia",
        "estimatedLodgingCostPerDay": 100,
        "estimatedFlightCostPerPerson": 1100,
        "image": 'fake-img.jpg',
        "alt": "buildings and people crossing the street carrying shoping bags during the day"
      },
      {
        "id": 21,
        "destination": "Tulum, Mexico",
        "estimatedLodgingCostPerDay": 100,
        "estimatedFlightCostPerPerson": 350,
        "image": 'fake-img.jpg',
        "alt": "a donkey standing on the beach"
      },
    ]

   listOfTravelers = [
    {
    "id": 1,
    "name": "Ham Leadbeater",
    "travelerType": "relaxer"
    },
    {
    "id": 2,
    "name": "Rachael Vaughten",
    "travelerType": "thrill-seeker"
    }
    ];

    tripsData = {
        "trips": [
        {
        "id": 1,
        "userID": 1,
        "destinationID": 49,
        "travelers": 1,
        "date": "2023/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
        },
        {
        "id": 2,
        "userID": 1,
        "destinationID": 25,
        "travelers": 5,
        "date": "2022/10/04",
        "duration": 18,
        "status": "pending",
        "suggestedActivities": []
        },
        {
          "id": 119,
          "userID": 2,
          "destinationID": 47,
          "travelers": 5,
          "date": "2022/05/28",
          "duration": 20,
          "status": "approved",
          "suggestedActivities": []
          },
          {
          "id": 126,
          "userID": 2,
          "destinationID": 26,
          "travelers": 5,
          "date": "2023/07/23",
          "duration": 20,
          "status": "approved",
          "suggestedActivities": []
          },
          {
          "id": 141,
          "userID": 1,
          "destinationID": 19,
          "travelers": 5,
          "date": "2016/01/05",
          "duration": 18,
          "status": "approved",
          "suggestedActivities": []
          },
          {
          "id": 144,
          "userID": 1,
          "destinationID": 13,
          "travelers": 2,
          "date": "2018/09/21",
          "duration": 4,
          "status": "approved",
          "suggestedActivities": []
        },
        {
        "id": 149,
        "userID": 1,
        "destinationID": 21,
        "travelers": 2,
        "date": "2020/03/01",
        "duration": 4,
        "status": "approved",
        "suggestedActivities": []
        }
    ]}

  trip = new Trips(tripsData);
  let myTripsData = trip.getTripsById(1)
  traveler = new Traveler(listOfTravelers[0], myTripsData);
  });


  it('is a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', function() {

    expect(traveler).to.be.an.instanceof(Traveler);
  });

describe('Should have default properties on initialization', function(){

  it('should initilize with id', function() {
      expect(traveler.id).to.equal(1);
  });

  it('should initilize with a Name', function(){
    expect(traveler.name).to.equal("Ham Leadbeater");
  });

  it('should intialize with a travel type', function(){
    expect(traveler.travelerType).to.equal('relaxer')
  });

  it('Should initialize with all of its trips', function(){
    expect(traveler.myTrips).to.deep.equal([

    {
      id: 1,
      userID: 1,
      destinationID: 49,
      travelers: 1,
      date: '2023/09/16',
      duration: 8,
      status: 'approved',
      suggestedActivities: []
    },
    {
      id: 2,
      userID: 1,
      destinationID: 25,
      travelers: 5,
      date: '2022/10/04',
      duration: 18,
      status: 'pending',
      suggestedActivities: []
    },
    {
      id: 141,
      userID: 1,
      destinationID: 19,
      travelers: 5,
      date: '2016/01/05',
      duration: 18,
      status: 'approved',
      suggestedActivities: []
    },
    {
      id: 144,
      userID: 1,
      destinationID: 13,
      travelers: 2,
      date: '2018/09/21',
      duration: 4,
      status: 'approved',
      suggestedActivities: []
    },
    {
      id: 149,
      userID: 1,
      destinationID: 21,
      travelers: 2,
      date: "2020/03/01",
      duration: 4,
      status: "approved",
      suggestedActivities: []
    }
  ]
);
  });



});


describe('getLastName Method', function(){

    it('Should be able to pull up its last name', function(){
      expect(traveler.getLastName()).to.equal('Leadbeater')
    });
});

describe('findPastTrips Method', function(){

  it('should find all past Trips', function(){

    expect(traveler.findPastTrips()).to.deep.equal([
  {
    id: 141,
    userID: 1,
    destinationID: 19,
    travelers: 5,
    date: '2016/01/05',
    duration: 18,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 144,
    userID: 1,
    destinationID: 13,
    travelers: 2,
    date: '2018/09/21',
    duration: 4,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 149,
    userID: 1,
    destinationID: 21,
    travelers: 2,
    date: '2020/03/01',
    duration: 4,
    status: 'approved',
    suggestedActivities: []
  }
])

  });


});


describe('addDestinations Method', function(){


  it('Should find matching destinations for myTrips', function(){
    expect(traveler.myTrips).to.deep.equal([
  {

    id: 1,
    userID: 1,
    destinationID: 49,
    travelers: 1,
    date: '2023/09/16',
    duration: 8,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 2,
    userID: 1,
    destinationID: 25,
    travelers: 5,
    date: '2022/10/04',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  },
  {
    id: 141,
    userID: 1,
    destinationID: 19,
    travelers: 5,
    date: '2016/01/05',
    duration: 18,
    status: 'approved',
    suggestedActivities: []
  },{

    id: 144,
    userID: 1,
    destinationID: 13,
    travelers: 2,
    date: '2018/09/21',
    duration: 4,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 149,
    userID: 1,
    destinationID: 21,
    travelers: 2,
    date: '2020/03/01',
    duration: 4,
    status: 'approved',
    suggestedActivities: []
  }])
    traveler.addDestinations(destinationsData);
    expect(traveler.myTrips).deep.equal([{
    id: 1,
    userID: 1,
    destinationID: 49,
    travelers: 1,
    date: '2023/09/16',
    duration: 8,
    status: 'approved',
    suggestedActivities: [],
    destination: {
      id: 49,
      destination: 'Castries, St Lucia',
      estimatedLodgingCostPerDay: 650,
      estimatedFlightCostPerPerson: 90,
      image: 'fake-img.jpg',
      alt: 'aerial photography of rocky mountain under cloudy sky'
    }
  },{
    id: 2,
    userID: 1,
    destinationID: 25,
    travelers: 5,
    date: '2022/10/04',
    duration: 18,
    status: 'pending',
    suggestedActivities: [],
    destination: {
      id: 25,
      destination: 'New York, New York',
      estimatedLodgingCostPerDay: 175,
      estimatedFlightCostPerPerson: 200,
      image: 'fake-img.jpg',
      alt: 'people crossing the street during the day surrounded by tall buildings and advertisements'
    }
  },{
    id: 141,
    userID: 1,
    destinationID: 19,
    travelers: 5,
    date: '2016/01/05',
    duration: 18,
    status: 'approved',
    suggestedActivities: [],
    destination: {
      id: 19,
      destination: 'Quito, Ecuador',
      estimatedLodgingCostPerDay: 60,
      estimatedFlightCostPerPerson: 500,
      image: 'fake-img.jpg',
      alt: 'a city at night with cloudy, snowy mountains in the distance'
    }
  },{
    id: 144,
    userID: 1,
    destinationID: 13,
    travelers: 2,
    date: '2018/09/21',
    duration: 4,
    status: 'approved',
    suggestedActivities: [],
    destination: {
      id: 13,
      destination: 'St. Petersburg, Russia',
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 1100,
      image: 'fake-img.jpg',
      alt: 'buildings and people crossing the street carrying shoping bags during the day'
    }
  },{
    id: 149,
    userID: 1,
    destinationID: 21,
    travelers: 2,
    date: '2020/03/01',
    duration: 4,
    status: 'approved',
    suggestedActivities: [],
    destination: {
      id: 21,
      destination: 'Tulum, Mexico',
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 350,
      image: 'fake-img.jpg',
      alt: 'a donkey standing on the beach'
    }
  }]);
  });


});

describe('findUpcomingTrips Method', function(){

  it('Should be able to find all upcoming trips', function(){
    expect(traveler.findUpcomingTrips()).to.deep.equal([
  {
    id: 1,
    userID: 1,
    destinationID: 49,
    travelers: 1,
    date: '2023/09/16',
    duration: 8,
    status: 'approved',
    suggestedActivities: []
  },
  {
    id: 2,
    userID: 1,
    destinationID: 25,
    travelers: 5,
    date: '2022/10/04',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  }
]);
  });
});

describe('findPendingTrips Method', function(){


  it('Should be able to find pending trips', function(){
    expect(traveler.findPendingTrips()).to.deep.equal([
  {
    id: 2,
    userID: 1,
    destinationID: 25,
    travelers: 5,
    date: '2022/10/04',
    duration: 18,
    status: 'pending',
    suggestedActivities: []
  }
])


  });


});


describe('calculateTotalAmountSpentOnTrips Method', function(){

  it('should calculate total amount spent on a trip in a single year', function(){
    traveler.addDestinations(destinationsData);
    expect(traveler.calculateTotalAmountSpentOnTrips()).to.deep.equal(1210)

  });


});





});
