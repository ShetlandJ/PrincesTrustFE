var getMonthName = function(monthNumber) {
  switch(monthNumber) {
    case 1:
    return "January";
    break;
    case 2:
    return "February"
    break;
    case 3:
    return "March";
    break;
    case 4:
    return "April";
    break;
    case 5:
    return "May";
    break;
    case 6:
    return "June";
    break;
    case 7:
    return "July";
    break;
    case 8:
    return "August"
    break;
    case 9:
    return "September";
    break;
    case 10:
    return "October";
    break;
    case 11:
    return "November";
    break;
    case 12:
    return "December";
    break;
    default:
    return "That's not a valid month number"
    break;
  }
};

var getMonthNumber = function(monthName){
  switch(monthName) {
    case "January":
    return 1;
    break;
    case "February":
    return 2
    break;
    case "March":
    return 3;
    break;
    case "April":
    return 4;
    break;
    case "May":
    return 5;
    break;
    case "June":
    return 6;
    break;
    case "July":
    return 7;
    break;
    case "August":
    return 8
    break;
    case "September":
    return 9;
    break;
    case "October":
    return 10;
    break;
    case "November":
    return 11;
    break;
    case "December":
    return 12;
    break;
    default:
    return "That's not a correct month name"
    break;
  }
}

var myBarChart;

var renderChart = function(chart, labels, datasetLabel, datasetData, yLabel, xLabel, callback) {

  myBarChart = new Chart(chart, {
    type: 'bar',
    data: {
      labels: labels,
      backgroundColor: '#FFFFFF',
      datasets: [{
        label: datasetLabel,
        data: datasetData,
        backgroundColor: '#CC0033',
        borderColor: [
        ],
        borderWidth: 1
      }]
    },
    options: {
      'onClick' : callback,
      title: {
        display: true,
        text: datasetLabel
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          },
          scaleLabel: {
            display: true,
            labelString: yLabel
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: xLabel
          }
        }]
      }
    }
  });

  return myBarChart

}


module.exports = {
  getMonthName:getMonthName,
  getMonthNumber:getMonthNumber,
  renderChart: renderChart
};
