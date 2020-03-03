import $ from 'jquery';
import './css/base.scss';
import domUpdates from './dom-updates.js'
import './images/hammer-sickle.png';
import './images/kim.gif';
import './images/kim2.jpg'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Traveler from './traveler';
import ApiRequestController from './api-controller';
import Agency from './travel-agent';
import Trips from './trips';
import Destinations from './destinations';

const api = new ApiRequestController();
const moment = require("moment");
let loggedInTraveler;
let agent;

let m = moment();

console.log(api);
console.log(m.format('L'));
console.log(moment("2020/05/06", "YYYY/MM/DD").fromNow());

const generateUserId = () => {
  let userName = $('#username-input').val();
  let userId = userName.match(/\d+/g);
  if(userId > 50) {
    window.alert('user id does not exist, try again')
    location.reload();
  } else {
    return Number(userId);
    }
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
    // domUpdates.showWelcomeCard();
  } else {
    window.alert("Wrong Password or User Name")
  }
};


const getTravelerData = () => {
  let fethechedTreveler = api.getUserById(generateUserId());
  let fethchedAllTrips = api.fetchAllTrips();
  let fetchedAllDestinations = api.fetchAllDestinations();

  Promise.all([fethechedTreveler, fethchedAllTrips, fetchedAllDestinations])
  .then(finalVals => {
    let traveler = finalVals[0];
    let allTrips = finalVals[1];
    let allDestinations = finalVals[2];
    createTraveler(traveler, allTrips, allDestinations)
  }).catch(error => console.log(error.message))
};


const createTraveler = (traveler, allTrips, allDestinations) => {

  console.log(allDestinations);
  let trips = new Trips(allTrips);
  let destinations = new Destinations(allDestinations)// might not even be needed.
  loggedInTraveler = new Traveler(traveler, trips.getTripsById(generateUserId()));
  loggedInTraveler.addDestinations(allDestinations.destinations);
  // loggedInTraveler.calculateTotalAmountSpentOnTrips();
  domUpdates.showTravelerWelcomeCard(loggedInTraveler);
  console.log(loggedInTraveler)
  loggedInTraveler.calculateTotalAmountSpentOnTrips();
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
  agent = new Agency(tripsData, destinationData, travelersData)
  domUpdates.showAgentWelcomeCard(agent);
  console.log(agent)
}

const tripsDisplayHandler = (event) => {
  if(event.target.id === "past-trips-btn") {
    domUpdates.showPastTrips(loggedInTraveler);
  } else if (event.target.id === 'future-trips-btn') {
    domUpdates.showFutureTrips(loggedInTraveler);
  } else if (event.target.id === 'pending-trips-btn') {
    domUpdates.showPendingTrips(loggedInTraveler);
  } else if(event.target.id === 'to-be-approved-trips-btn') {
    
  }

}


$('#log-in-btn').click(processLogIn)
$('#welcome-card').click(tripsDisplayHandler)
