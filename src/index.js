import $ from 'jquery';
import './css/base.scss';
import domUpdates from './dom-updates.js'
import './images/hammer-sickle.png';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Traveler from './traveler';
import ApiRequestController from './api-controller';
import Agency from './travel-agent';
import Trips from './trips';

const api = new ApiRequestController();

console.log(api);

const generateUserId = () => {
  let userName = $('#username-input').val();
  let userId = userName.match(/\d+/g);
  return Number(userId);
}


 function processLogIn(data) {
  if($('#password-input').val() === 'travel2020' && $('#username-input').val().includes('travel'))  {
    event.preventDefault();
    getTravelerData()
    domUpdates.hideLoginWindow();
  } else if ($('#password-input').val() === 'travel2020' && $('#username-input').val().includes('agency')) {
    event.preventDefault();
    getAgencyData();
    domUpdates.hideLoginWindow();
  } else {
    window.alert("Wrong Password or User Name")
  }
};


const getTravelerData = () => {
  let fethechedTreveler = api.getUserById(generateUserId());
  let fethchedAllTrips = api.fetchAllTrips();

  Promise.all([fethechedTreveler, fethchedAllTrips])
  .then(finalVals => {
    let traveler = finalVals[0];
    let allTrips = finalVals[1];
    createTraveler(traveler, allTrips)
  }).catch(error => console.log(error.message))
};


const createTraveler = (traveler, allTrips) => {
  let trips = new Trips(allTrips);
  let loggedInTraveler = new Traveler(traveler, trips.getTripsById(generateUserId()));
  console.log(loggedInTraveler)
};


const getAgencyData = () => {
 let fetchedTripsData = api.fetchAllTrips();
 let fetchedDestinationData = api.fetchAllDestinations();
 let fetchedTravelers = api.getAllTravelers();

 Promise.all([fetchedTripsData, fetchedDestinationData, fetchedTravelers])
  .then(finalVals => {
    let tripsData = finalVals[0];
    let destinationData = finalVals[1];
    let travelersData = finalVals[2];
    createAgency(tripsData, destinationData, travelersData);
  }).catch(error => console.log(error.message))
};





const createAgency = (tripsData, destinationData, travelersData) => {
  let agent = new Agency(tripsData, destinationData, travelersData)
  console.log(agent)
}


$('#log-in-btn').click(processLogIn)
