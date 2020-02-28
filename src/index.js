import $ from 'jquery';
import './css/base.scss';
import domUpdates from './dom-updates.js'
import './images/hammer-sickle.png';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Traveler from './traveler';
import ApiRequestController from './api-controller';

const api = new ApiRequestController();


const generateUserId = () => {
  let userName = $('#username-input').val();
  let userId = userName.match(/\d+/g);
  return userId;
}


 function processLogIn(data) {
  if($('#password-input').val() === 'travel2020' && $('#username-input').val().includes('travel'))  {
    createUser(data);
    api.getUserById(generateUserId()).then((data) => createUser(data));
    domUpdates.hideLoginWindow();
  } else {
    alert("Wrong Password or User Name! User name must be travelxx where xx is user id");
  }
};



const createUser = (data) => {
  let user = new Traveler(data);
console.log(user)
};




// $("body").click(eventHandler);
$('#log-in-btn').click(processLogIn)
