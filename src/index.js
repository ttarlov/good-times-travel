import $ from 'jquery';
import './css/base.scss';
import domUpdates from './dom-updates.js'
import './images/hammer-sickle.png';
import './images/kim.gif';
import './images/kim2.jpg';
import './images/kim_clap.gif';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Traveler from './traveler';
import ApiRequestController from './api-controller';
import Agency from './travel-agent';
import Trips from './trips';
import Destinations from './destinations';
import Trip from './trip';

const api = new ApiRequestController();
const moment = require("moment");
let loggedInTraveler;
let agent;
let destinations;

let m = moment();
moment().format();
// console.log(api);
// console.log(moment().format());

// console.log(moment().startOf('1').fromNow());


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

  console.log(allTrips);
  let trips = new Trips(allTrips);
  destinations = new Destinations(allDestinations)// might not even be needed.
  loggedInTraveler = new Traveler(traveler, trips.getTripsById(generateUserId()));
  loggedInTraveler.addDestinations(allDestinations.destinations);
  domUpdates.showTravelerWelcomeCard(loggedInTraveler);
  loggedInTraveler.calculateTotalAmountSpentOnTrips();
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
  agent = new Agency(tripsData.trips, travelersData.travelers)
  agent.addDestinations(destinationData.destinations);
  domUpdates.showAgentWelcomeCard(agent)
  console.log(agent)
}

const tripsDisplayHandler = (event) => {
  if(event.target.id === "past-trips-btn") {
    domUpdates.showPastTrips(loggedInTraveler);
  } else if (event.target.id === 'future-trips-btn') {
    domUpdates.showFutureTrips(loggedInTraveler);
  } else if (event.target.id === 'pending-trips-btn') {
    console.log(loggedInTraveler.findPendingTrips());
    domUpdates.showPendingTrips(loggedInTraveler);
  } else if(event.target.id === 'to-be-approved-trips-btn') {
    domUpdates.showAgentPendingTrips(agent);
  } else if(event.target.id === 'trip-request-btn') {
    domUpdates.showTravelerTripRequestForm(loggedInTraveler, destinations.destinations.destinations);
  } else if(event.target.id === 'back-btn') {
    domUpdates.showTravelerWelcomeCard(loggedInTraveler);
  } else if(event.target.classList.contains('reserve-trip')) {
    $(event.target).toggleClass('select-trip')
    unlockCalculateTripPriceButton();
    // console.log('reserver trip button')
  } else if (event.target.id === 'calculate-trip-cost') {
    buildPotentialTripObj()
    $("#submit-trip-request-btn").prop("disabled", false);
    $("#submit-trip-request-btn").css("cursor", "pointer");
  } else if (event.target.id === "submit-trip-request-btn") {
    loggedInTraveler.submitTripRequest()
    .then(() => getTravelerData())
  } else if (event.target.id === "search-btn") {
    event.preventDefault();
    executeSearch();
  } else if (event.target.classList.contains("approve-trip-btn")) {
    console.log(event.target);
    makeApprovedTrip(event)
  } else if (event.target.id === "today-trips-btn") {
    console.log("todays trips button");
    domUpdates.showTodaysTrips(agent);
  } else if (event.target.classList.contains("deny-trip-btn")) {
    denyTrip(event);
  } else if (event.target.id === "close-x") {
    console.log("x clicked");
    domUpdates.closePopUp(event);
  }
}

const denyTrip = (event) => {
  let deniedTrip = {id: Number(event.target.id)}
  console.log(deniedTrip)
  api.denyTripRequest(deniedTrip)
  .then(() => domUpdates.hideApprovedTripCard(event))

}

const makeApprovedTrip = (event) => {
  let approvedTrip = {id: Number(event.target.id), status: "approved"}
  console.log(approvedTrip);
  api.approveTripRequest(approvedTrip)
  .then(() => domUpdates.hideApprovedTripCard(event))
}

const buildPotentialTripObj = () => {
  // loggedInTraveler.calculatePotentialTripCost(destinations.destinations.destinations, Number($('.select-trip').attr('id')))

  let potentialTrip = new Trip(loggedInTraveler.id, Number($('.select-trip').attr('id')),
  Number($('#number-of-travelers').val()), moment($('#trip-date').val()).format("YYYY/MM/DD"),
 Number($('#trip-duration').val()))
    let estimateTripCost = loggedInTraveler.calculatePotentialTripCost(destinations.destinations.destinations, potentialTrip)
    domUpdates.displayEstimateTripCost(estimateTripCost)
console.log(potentialTrip)
loggedInTraveler.tripQuote = potentialTrip;
}


const unlockCalculateTripPriceButton = () => {
  if($('#trip-duration').val().length > 0 && $('#number-of-travelers').val().length > 0) {
    $("#calculate-trip-cost").attr('disabled', false);
  }
}


const executeSearch = () => {

  var filter = $("#search-input").val().toUpperCase();
  var comradName = [...document.getElementsByTagName('h4')]

  comradName.forEach(name => {

   if( name.innerText.toUpperCase().indexOf(filter) > -1) {
     name.parentElement.closest('.trip-container').style.display = "";
   } else {
     name.closest('.trip-container').style.display = 'none';
   }
 })

};



$('#log-in-btn').click(processLogIn)
$('#welcome-card').click(tripsDisplayHandler)
