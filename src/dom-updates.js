import $ from 'jquery';
import ApiRequestController from './api-controller';
const moment = require("moment");
let api = new ApiRequestController;

let domUpdates = {


  hideLoginWindow() {
    $(".log-in-popup").hide(600);
  },

  showAgentWelcomeCard(agent) {
    $("#tag-line-and-name").html(`Welcome Supreme Leader ${agent.name}`)
    $(".welcome-user-card").html(`
      <section class="info-card">
        <h2>The Socialist Party is Proud of Your Hard Work</h2>
        <p>Supreme Leaders Income this year is: $${agent.calculateTotalIncome()}</p>
          <p>
            <button id="today-trips-btn">Travelers For Today:<span> ${agent.countNumberOfTripsForToday()}</span></button>
            <button id="to-be-approved-trips-btn">Trip Requests</button>
          </p>
            <div class="search-bar-wrap hidden">
              <form id="search">
              <div class="search">
                <input type="text" id="search-input" class="searchTerm" placeholder="Search Comrade by Name?">
                <button type="submit" id="search-btn" class="searchButton">Search</button>
              </div>
                </form>
            </div>
      </section>
      <section class="trips-details-section" id="trips-details">
      <p><img class="the-great-leader" src="./images/kim2.jpg"  alt="supreme leader on a horse"></p>
    </section>
    `).show(600)
  },

  showTravelerWelcomeCard(loggedInTraveler) {
    $("#tag-line-and-name").html(`Welcome Comrad ${loggedInTraveler.getLastName()}`)
    $(".welcome-user-card").html(`
      <section class="info-card">
        <h2>Dear Leader Congratulates You On Your Trips</h2>
        <p>Your Total Amount Spent On Trips This Year is: $${loggedInTraveler.calculateTotalAmountSpentOnTrips()}. Including Great Leaders cut of 10%</p>
          <p>
            <button id="current-trips-btn">Current Trips</button>
            <button id="future-trips-btn">ApprovedTrips</button>
            <button id="pending-trips-btn">Pending Trips</button>
            <button id="trip-request-btn">Request Trip</button>
          </p>
      </section>
      <section class="trips-details-section" id="trips-details">
      <p><img class="the-great-leader" src="./images/kim.gif" alt="photo of our great leader kim"></p>
    </section>
  `).show(600)
  },



  showPastTrips(loggedInTraveler) {
    if(loggedInTraveler.pastTrips.length === 0) {
      $("#trips-details").html(`<p>No Past Trips Found. Great Leader Not Happy!</p>`)
    } else {
        $("#trips-details").html(``);
        loggedInTraveler.pastTrips.forEach(trip => {
          $("#trips-details").append(
            `<section class="trip-container"><p>Location Name: ${trip.destination.destination}</p>
            <p> <img class="trip-image" alt="${trip.destination.alt}" src="${trip.destination.image}"></p>
            </section>`)
        })

    }

  },

  showFutureTrips(loggedInTraveler) {
    if(loggedInTraveler.futureTrips.length === 0) {
      $("#trips-details").html(`<p>No Future Trips Found. Corona Virus Global Trip Discount Available!</p>
        <p><img alt='picture of corona virus causing beer' src='./images/corona-beer.jpg'></p>`)
    } else {
        $("#trips-details").html(``);
        loggedInTraveler.futureTrips.forEach(trip => {
          $("#trips-details").append(
            `<section class="trip-container"><p>Location Name: ${trip.destination.destination}</p>
            <p> <img class="trip-image" alt="${trip.destination.alt}" src="${trip.destination.image}"></p>
            </section>`)
        })

    }

  },

  showPendingTrips(loggedInTraveler) {
    if(loggedInTraveler.pendingTrips.length === 0) {
      $("#trips-details").html(`<p>No Pending Trips Found!</p>`)
    } else {
        $("#trips-details").html(``);
        loggedInTraveler.pendingTrips.forEach(trip => {
          $("#trips-details").append(
            `<section class="trip-container"><p>Location Name: ${trip.destination.destination}</p>
            <p>Trip Length: ${trip.duration} Days</p>
            <p>Comrads Joing You: ${trip.travelers}</p>
            <p>Trip Starts In: ${moment(trip.date, "YYYY/MM/DD").fromNow()}</p>
            <p> <img class="trip-image" alt="${trip.destination.alt}" src="${trip.destination.image}"></p>
            </section>`)
        })

    }
  },

  showAgentPendingTrips(agent) {
    if(agent.pendingTrips.length === 0) {
      $("#trips-details").html(`<p>No Pending Trips Found!</p>`)
    } else {
        $("#trips-details").html(``);
        $(".search-bar-wrap").removeClass("hidden");
        agent.pendingTrips.forEach(trip => {
          $("#trips-details").append(
            `<section class="trip-container">
            <p class="location-name">Location Name:</p>
            <p>${trip.destination.destination}</p>
            <p class="comrad-name">Traveling Comrad Name:</p>
            <h4>${agent.findTravelerById(trip.userID)}</h4>
            <p> <img class="trip-image" alt="${trip.destination.alt}" src="${trip.destination.image}"></p>
            <p>Trip Revenue: $${agent.calculaterTravelerSpendOnSingleTrip(trip.userID)}</p>
            <div class="trip-deny-approve-section">
            <button type="button" class="approve-trip-btn" id="${trip.id}">Approve</button>
            <button type="button" class="deny-trip-btn" id="${trip.id}">Deny</button>
            </div>
            </section>`)
        });
    }
    $("#search-input").on('keyup', function() {
      var filter = $("#search-input").val().toUpperCase();
      var comradName = [...document.getElementsByTagName('h4')]

      comradName.forEach(name => {

       if( name.innerText.toUpperCase().indexOf(filter) > -1) {
         name.parentElement.closest('.trip-container').style.display = "";
       } else {
         name.closest('.trip-container').style.display = 'none';
       }
     })

    });
  },


  showTravelerTripRequestForm(loggedInTraveler, destinations) {
    // console.log(destinations);
    $("#tag-line-and-name").html(`Welcome Comrad ${loggedInTraveler.getLastName()}`);
    $(".welcome-user-card").html(`
      <section class="info-card">
      <h2>Trips personally vetted by our Great Leader</h2>
      <button id="back-btn">Back</button>
      <form>
      <p>
      <label for="start-date">Trip Start date:</label>
      <input type="date" id="trip-date" name="trip-start"
       value="${moment().format("YYYY-MM-DD")}"
       min="${moment().format("YYYY-MM-DD")}" max="2028-12-31">
       </p>
       <p>
        <lable for="trip-duration">Trip Duration in Days:</label>
        <input type="number" id="trip-duration" name="trip-duration">
       </p>
       <p>
        <lable for="number-of-travelers">Number of Travelers:</label>
        <input type="number" id="number-of-travelers" name="number-of-travelers">
       </p>
       <p class="estimate-trip-cost" id="estimate-cost">
       </p>
       <section class="available-destinations">
       <section class="destination-details-section" id="destination-details-section">
       </section>
       </section>
      </form>
      `);
      destinations.forEach( destination => {
        $("#destination-details-section").append(
          `<section class="trip-container" data-id="${destination.id}"><p>${destination.destination}</p>
          <p> <img class="trip-image" alt="${destination.alt}" src="${destination.image}"></p>
          <button type="button" class="reserve-trip" id="${destination.id}">Reserve Trip</button>
          </section>`)
        });
        $(".welcome-user-card").append(`
        <div class="submit-cal-trip-btn">
         <button type="button" disabled id="calculate-trip-cost"> Calc Trip Cost</button>
         <button type="submit" id="submit-trip-request-btn"> Submit </button>
        </div> `);
        $("#submit-trip-request-btn").css("cursor", "not-allowed")
        $("#submit-trip-request-btn").prop("disabled", true);
  },



  displayEstimateTripCost(estimateCost) {
    $('#estimate-cost').css("border", "solid black");
    $('#estimate-cost').html(`Estimated cost of your trip is $${estimateCost}`)

  },

  hideApprovedTripCard(event) {
    event.target.parentElement.closest(".trip-container").remove()
  },


  showTodaysTrips(agent) {

    if(agent.todaysTrips.length === 0) {
      $("#trips-details").html(`<p>Its Corona Virus Pendemic, You Fool!</p>`)
    } else {
        $("#trips-details").html(``);
        $(".search-bar-wrap").removeClass("hidden");
        agent.todaysTrips.forEach(trip => {
          $("#trips-details").append(
            `<section class="trip-container">
            <p class="location-name">Location Name:</p>
            <p>${trip.destination.destination}</p>
            <p class="comrad-name">Traveling Comrad Name:</p>
            <h4>${agent.findTravelerById(trip.userID)}</h4>
            <p> <img class="trip-image" alt="${trip.destination.alt}" src="${trip.destination.image}"></p>
            <p>Trip Revenue: $${agent.calculaterTravelerSpendOnSingleTrip(trip.userID)}</p>
            <div class="trip-deny-approve-section">
            <button type="button" class="approve-trip-btn" id="${trip.id}">Approve</button>
            <button type="button" class="deny-trip-btn" id="${trip.id}">Deny</button>
            </div>
            </section>`)
        });
    }
    $("#search-input").on('keyup', function() {
      var filter = $("#search-input").val().toUpperCase();
      var comradName = [...document.getElementsByTagName('h4')]

      comradName.forEach(name => {

       if( name.innerText.toUpperCase().indexOf(filter) > -1) {
         name.parentElement.closest('.trip-container').style.display = "";
       } else {
         name.closest('.trip-container').style.display = 'none';
       }
     })

    });


  }


}

export default domUpdates;
