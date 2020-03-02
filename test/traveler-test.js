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


  beforeEach(function() {
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

describe('find Past Trips Method', function(){

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




});
