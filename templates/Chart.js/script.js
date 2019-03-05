$.getJSON('https://raw.githubusercontent.com/rvaros/U.S.-Housing-Affordability-and-Foreclosure-Percentage-Project/master/CurrentRecessionForeclosure.json', function(result) {

   var labels = result.features.map(function(e) {
         return e.state;
      }),
      recAvg = result.features.map(function(e) {
         return e.recessionAvg;
      }),
      curAvg = result.features.map(function(e) {
         return e.current;
      });


   var ctx = document.getElementById("myChart").getContext("2d");
   var myChart = new Chart(ctx, {
      type: 'line',
      // scales: {
      //    xAxes: [{
      //        ticks: {
      //            autoSkip: false
      //        }
      //    }]
      // },
      data: {
         // scales: {
         //    xAxes: [{
         //        ticks: {
         //            autoSkip: false
         //        }
         //    }]
         // },
         labels: labels,
         datasets: [{
            label: "Recession Average",
            data: recAvg,
            borderWidth: 2,
            backgroundColor: "rgba(6, 167, 125, 0.1)",
            borderColor: "rgba(6, 167, 125, 1)",
            pointBackgroundColor: "rgba(225, 225, 225, 1)",
            pointBorderColor: "rgba(6, 167, 125, 1)",
            pointHoverBackgroundColor: "rgba(6, 167, 125, 1)",
            pointHoverBorderColor: "#fff"
         }, {
            label: "Current Percentage",
            data: curAvg,
            borderWidth: 2,
            backgroundColor: "rgba(246, 71, 64, 0.1)",
            borderColor: "rgba(246, 71, 64, 1)",
            pointBackgroundColor: "rgba(225, 225, 225, 1)",
            pointBorderColor: "rgba(246, 71, 64, 1)",
            pointHoverBackgroundColor: "rgba(246, 71, 64, 1)",
            pointHoverBorderColor: "#fff"
         }] 
      }
   });
});
