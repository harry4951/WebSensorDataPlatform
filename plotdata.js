		var lastDate = 0;
        var data = []
        var TICKINTERVAL = 86400000 //milisecs in one day
        let XAXISRANGE = 777600000
        function getDayWiseTimeSeries(baseval, count, yrange) {
            var i = 0;
            while (i < count) {
                var x = baseval;
                var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

                data.push({
                    x, y
                });
                lastDate = baseval
                baseval += TICKINTERVAL;
                i++;
            }
        }

        getDayWiseTimeSeries(new Date('4 Oct 2019 GMT').getTime(), 10, {
            min: 10,
            max: 90
        })

        function getNewSeries(baseval, yrange) {
            var newDate = baseval + TICKINTERVAL;
            lastDate = newDate

            for(var i = 0; i< data.length - 10; i++) {
                // IMPORTANT
                // we reset the x and y of the data which is out of drawing area
                // to prevent memory leaks
                data[i].x = newDate - XAXISRANGE - TICKINTERVAL
                data[i].y = 0
            }
            
            data.push({
                x: newDate,
                y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
            })
           
        }

        function resetData(){
            // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
            data = data.slice(data.length - 10, data.length);
        }

        var options = {
            chart: {
                height: 350,
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            series: [{
                data: data
            }],
            title: {
                <!-- text: 'Dynamic Updating Chart', -->
                <!-- align: 'left' -->
            },
            markers: {
                size: 0
            },
            xaxis: {
                type: 'datetime',
                range: XAXISRANGE,
            },
            yaxis: {
                max: 100
            },
            legend: {
                show: false
            },
        }

        var chart = new ApexCharts(
            document.querySelector("#chart"),
            options
        );

        chart.render();
	
       

         window.setInterval(function () {
         getNewSeries(lastDate, {
                 min: 10,
                 max: 90
             })
             chart.updateSeries([{
                 data: data
             }])
         }, 1000)


var elem = document.getElementById("chart");
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
