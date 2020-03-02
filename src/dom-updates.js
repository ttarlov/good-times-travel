import $ from 'jquery';

let domUpdates = {

  hideLoginWindow() {
    $(".log-in-popup").hide(600);
  },

  showWelcomeCard(loggedInTraveler) {
    $("#tag-line-and-name").html(`Welcome Comrad ${loggedInTraveler.getLastName()}`)
    $(".welcome-user-card").html(`
      <section class="info-card">
        <h2>Dear Leader Congratulates You On Your Trips</h2>
          <p>
            <button id="past-trips-btn">Past Trips</button>
            <button id="current-trips-btn">Current Trips</button>
            <button id="future-trips-btn">Future Trips</button>
          </p>
      </section>
      <section class="trips-details-section" id="trips-details">
      <p><img class="the-great-leader" src="./images/kim.gif" alt="photo of our great leader kim"></p>
    </section>
  `).show(600)

    // $("#welcome-card").show(600);
  },

  showPastTrips(loggedInTraveler) {
    if(loggedInTraveler.pastTrips.length === 0) {
      $("#trips-details").html(`<p>No Past Trips Found. Travel More Buddy!</p>`)
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
      $("#trips-details").html(`<p>No Future Trips Found. Corona Virus Global Trip Discount Available!</p>`)
    } else {
        $("#trips-details").html(``);
        loggedInTraveler.futureTrips.forEach(trip => {
          $("#trips-details").append(
            `<section class="trip-container"><p>Location Name: ${trip.destination.destination}</p>
            <p> <img class="trip-image" alt="${trip.destination.alt}" src="${trip.destination.image}"></p>
            </section>`)
        })

    }

  }












}

export default domUpdates;
