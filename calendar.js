// See https://developers.google.com/calendar/quickstart/js

// Client ID and API key from the Developer Console
var API_KEY = "AIzaSyC0EzouHTi6t4L-UDX50Mp6uBFWYBNby0w";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

function handleClientLoad() {
    gapi.load("client", initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS
    }).then(function () {
        listUpcomingEvents();
    }, function(error) {
        alert("Sorry, there was an error...");
    });
}

function listUpcomingEvents() {
    var now = moment();
    var next_week = moment().add(7, "days").endOf("day");

    gapi.client.calendar.events.list({
        "calendarId": 'ucdcstutoring@gmail.com',
        "timeMin": now.toISOString(),
        "timeMax": next_week.toISOString(),
        "showDeleted": false,
        "singleEvents": true,
        "maxResults": 250,
        "orderBy": "startTime",
        "q": " 20"
    }).then(function(response) {
        var events = response.result.items;

        var last_date = "";
        var last_ul;
        console.log('Upcoming events:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                if (event.summary.indexOf(" 20") == -1) {
                    continue;
                }
                var when = moment(event.start.dateTime);
                var when_end = moment(event.end.dateTime);
                if (!when) {
                    continue;
                }
                var event_date = when.format("dddd, MMMM Do");
                if (last_date != event_date) {
                    last_date = event_date;
                    var new_header = document.createElement("h2");
                    new_header.textContent = event_date;
                    document.body.appendChild(new_header);
                    last_ul = document.createElement("ul");
                    document.body.appendChild(last_ul);
                }
                var start_time = when.format("h:mm A");
                var end_time = when_end.format("h:mm A");

                var new_li = document.createElement("li");
                new_li.textContent = start_time + " until " + end_time + ": ";
                new_li.textContent += event.summary.split("-")[0];
                last_ul.appendChild(new_li);
            }
        } else {
            var error_h1 = document.createElement("h1");
            error_h1.textContent = "No tutors found --- this is probably an error!";
            document.body.appendChild(error_h1);
        }
    }, function (error) {
        console.log(error);
    });
}
