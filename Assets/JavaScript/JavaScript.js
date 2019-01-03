  var config = {
    apiKey: "AIzaSyC7tdge6ukHcsQSGAUjzD9Mkl0F0rvGXZE",
    authDomain: "train-operation-82774.firebaseapp.com",
    databaseURL: "https://train-operation-82774.firebaseio.com",
    projectId: "train-operation-82774",
    storageBucket: "train-operation-82774.appspot.com",
    messagingSenderId: "912678311822"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit-train").on("click", function() {
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirstTime = $("#firstTrain-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    
    var newTrain = {
      trainName: trainName,
      trainDestination: trainDestination,
      trainFirstTime: trainFirstTime,
      trainFrequency: trainFrequency
    };
    console.log(newTrain);
    database.ref().push(newTrain);
  }); 
  
  database.ref().on("child_added", function(childSnapshot) {
   // console.log(childSnapshot.val());

    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().trainDestination;
    var trainFirstTime = childSnapshot.val().trainFirstTime;
    var trainFirstTime = childSnapshot.val().trainFirstTime;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirstTime);
    console.log(trainFrequency);
  
    var trainFirstTimePretty = moment.unix(trainFirstTime).format("MM/DD/YYYY" + "HH:MM:SS");
 
    var nextTrain = trainFirstTimePretty + trainFrequency;
    console.log(nextTrain);
  
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFirstTimePretty),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextTrain),

    );

    $("#taingSchedule-table > tbody").append(newRow);
  });