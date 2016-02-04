var googleAPIKey = 'AIzaSyBnK7RwIfZVob4PdHtiqE8kf1xi9jFBp3A';
var bkg = chrome.extension.getBackgroundPage();
var latLonArray = [];
var travelTime = '';
var bufferTime;
var arrivTime;
var destination='';


chrome.storage.local.get('destination', function() {
  destination = destination.destination;
  console.log(destination)
})

if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}

  navigator.geolocation.getCurrentPosition(function(position) {
     var lat = position.coords.latitude;
     var lon = position.coords.longitude;
     latLonArray.push(lat, lon);
     findTravelTime(latLonArray);
  });


  function findTravelTime(locationArray) {
      destination = destination.replace(/\s+/gm,'+')

      function getCORS(url , success) {
        console.log(url);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = success;
        xhr.send();
        return xhr;
    }


    getCORS('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+latLonArray[0]+','+latLonArray[1]+'&destinations='+destination+'&departure_time='+Date.now()+'&traffic_model=best_guess&language=en&key=AIzaSyBnK7RwIfZVob4PdHtiqE8kf1xi9jFBp3A', function(request){

        var response = request.currentTarget.response || request.target.responseText;
        travelTime = JSON.parse(response);
        travelTime = travelTime.rows[0].elements[0].duration_in_traffic.text;
    });

  }

  function show() {
    var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
    var hour = time[1] % 12 || 12;               // The prettyprinted hour.
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
    new Notification(hour + time[2] + ' ' + period, {
      icon: '48.png',
      body: 'Time to get ready to go! Travel time to your appoint is currently ' + travelTime
    });
  }


    // Test for notification support.
    if (window.Notification) {
      // While activated, show notifications at the display frequency.
      if (JSON.parse(localStorage.isActivated)) { show(); }

      var interval = 0; // The display interval, in minutes.

      setInterval(function() {
        interval++;

        if (
          JSON.parse(localStorage.isActivated) &&
          localStorage.frequency <= interval
        ) {
          show();
          interval = 0;
        }
      }, 1800000);
    }
