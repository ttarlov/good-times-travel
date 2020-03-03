import $ from 'jquery';

let domUpdates = {

  hideLoginWindow() {
    $(".log-in-popup").hide(600);
  },

  showAgentWelcomeCard(agent) {
    $("#tag-line-and-name").html(`Welcome Supreme Leader ${agent.name}`)
    $(".welcome-user-card").html(`
      <section class="info-card">
        <h2>The Socialist Party is Proud of Your Hard Work</h2>
        <p>Supreme Leaders Revenue this year is: $${'amount'}.</p>
          <p>
            <button id="past-trips-btn">Past Trips</button>
            <button id="current-trips-btn">Current Trips</button>
            <button id="future-trips-btn">Future Trips</button>
            <button id="to-be-approved-trips-btn">Pending Trips</button>
          </p>
      </section>
      <section class="trips-details-section" id="trips-details">
      <p><img class="the-great-leader" src="./images/kim2.jpg"  alt="supreme leader on a pony or some shit like that"></p>
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
            <button id="to-be-approved-trips-btn">Trips Needing Approval</button>
            <button id="current-trips-btn">Current Trips</button>
            <button id="future-trips-btn">Future Trips</button>
            <button id="pending-trips-btn">Pending Trips</button>
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

  }












}

export default domUpdates;
