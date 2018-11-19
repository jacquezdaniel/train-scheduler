  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBDZSJUZynVqoD1rEOJLRaJS8wfNVgf8a4",
    authDomain: "djproject1-66de0.firebaseapp.com",
    databaseURL: "https://djproject1-66de0.firebaseio.com",
    projectId: "djproject1-66de0",
    storageBucket: "djproject1-66de0.appspot.com",
    messagingSenderId: "831629948512"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;


// FUNCTIONS + EVENTS
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  trainName = $('#nameInput').val().trim();
  destination = $('#destinationInput').val().trim();
  firstTrainTime = $('#firstTrainInput').val().trim();
  frequency = $('#frequencyInput').val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

$("#nameInput").val("");
$("#destinationInput").val("");
$("#firstTrainInput").val("");
$("#frequencyInput").val("");
});


// MAIN PROCESS + INITIAL CODE
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  // update the variable with data from the database
  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrainTime = snapshot.val().firstTrainTime;
  frequency = snapshot.val().frequency;


  var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
  var nowMoment = moment();

  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("h:m A");


  // create new row
  var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(destination),
  $("<td>").text(frequency),
  $("<td>").text(formatNextArrival),
  $("<td>").text(minutesAway)
  );

  $("#trains-table > tbody").append(newRow);

});
