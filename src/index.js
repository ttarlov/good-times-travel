import $ from 'jquery';
import './css/base.scss';
import domUpdates from './dom-updates.js'
import './images/hammer-sickle.png';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Traveler from './traveler';
import ApiRequestController from './api-controller';
import Agency from './travel-agent';

const api = new ApiRequestController();
console.log(api);

const generateUserId = () => {
  let userName = $('#username-input').val();
  let userId = userName.match(/\d+/g);
  return userId;
}


 function processLogIn(data) {
  if($('#password-input').val() === 'travel2020' && $('#username-input').val().includes('travel'))  {
    event.preventDefault();
    // createUser(data);
    api.getUserById(generateUserId()).then((data) => createTraveler(data));
    domUpdates.hideLoginWindow();
  } else if ($('#password-input').val() === 'travel2020' && $('#username-input').val().includes('agency')) {
    event.preventDefault();
    getAgencyData();
    // api.fetchAllTrips().then((tripsData) => createAgency(tripsData)).catch(error => console.log(error.message));
    domUpdates.hideLoginWindow();
  } else {
    window.alert("Wrong Password or User Name")
  }
};



const createTraveler = (data) => {
  let user = new Traveler(data);
console.log(user)
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

// $("body").click(eventHandler);
$('#log-in-btn').click(processLogIn)
