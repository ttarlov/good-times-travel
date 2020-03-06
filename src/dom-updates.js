import $ from 'jquery';
const moment = require("moment");
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
            <button id="current-trips-btn">Travelers For Today:<span> ${agent.countNumberOfTripsForToday()}</span></button>
            <button id="future-trips-btn">Future Trips</button>
            <button id="to-be-approved-trips-btn">Trip Requests</button>
          </p>
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
            <button id="future-trips-btn">Future Trips</button>
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
        agent.pendingTrips.forEach(trip => {
          $("#trips-details").append(
            `<section class="trip-container"><p>Location Name: ${trip.destination.destination}</p>
            <p> <img class="trip-image" alt="${trip.destination.alt}" src="${trip.destination.image}"></p>
            </section>`)
        })
    }

  },


  showTravelerTripRequestForm(loggedInTraveler, destinations) {
    console.log(destinations);
    $("#tag-line-and-name").html(`Welcome Comrad ${loggedInTraveler.getLastName()}`);
    $(".welcome-user-card").html(`
      <section class="info-card">
      <h2>Trips personally vetted by our Great Leader</h2>
      <button id="back-btn">Back</button>
      <form>
      <p>
      <label for="start-date">Trip Start date:</label>
      <input type="date" id="start" name="trip-start"
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
       <section class="available-destinations">
       <section class="destination-details-section" id="destination-details-section">
       </section>
       </section>
      </form>
      `);
      destinations.forEach( destination => {
        $("#destination-details-section").append(
          `<section class="trip-container"><p>${destination.destination}</p>
          <p> <img class="trip-image" alt="${destination.alt}" src="${destination.image}"></p>
          </section>`)
        });

  }







}

export default domUpdates;
