<template>
  <div class="hello">

    <h2>Visits today: {{ visitsToday }}</h2>
    <h2>Visits this month: {{ visitsThisMonth }}</h2>

    <div id="select-boxes">

      <select v-model="selectedMonth" @change="monthFilter">
        <option disabled selected value="">Please select one</option>
        <option v-for="month in months" v-bind:value="month.month">
          {{ month.name }}
        </option>
      </select>

      <select v-model="selectedDay" @change="renderHourlyBarChart">
        <option disabled selected value="" v-if="selectedMonth">Select a day</option>
        <option disabled selected value="" v-else="">← Select month</option>

        <option v-for="day in this.selectedMonthDays" v-bind:value="day">
          {{ day }}
        </option>
      </select>
    </div>

    <div class="chartBlock">
      <canvas id="year-visits-chart"></canvas>
    </div>

    <div class="chartBlock">
      <canvas id="month-visits-chart"></canvas>
    </div>

    <div class="chartBlock">
      <canvas id="hourly-visits-chart"></canvas>
    </div>

    <div class="chartBlock">
      <canvas id="total-hourly-visits-chart"></canvas>
    </div>

  </div>

</template>

<script>
/* eslint-disable */
// import {makeRequest, requestComplete} from "../../helpers/helpers"

// example URL with params:

export default {
  /* eslint-disable */
  name: 'HelloWorld',
  data () {
    return {
      url: 'https://api.mlab.com/api/1/databases/signins/collections/signins?apiKey=Vp2I1nmC961_lV2whDojmmOuZzXb0S_o&l=10000',
      data: "",
      dataLoaded: false,
      months: [
        {name: 'January', shortName: 'jan', month: 1},
        {name: 'February', shortName: 'feb', month: 2},
        {name: 'March', shortName: 'mar', month: 3},
        {name: 'April', shortName: 'apr', month: 4},
        {name: 'May', shortName: 'may', month: 5},
        {name: 'June', shortName: 'jun', month: 6},
        {name: 'July', shortName: 'jul', month: 7},
        {name: 'August', shortName: 'aug', month: 8},
        {name: 'September', shortName: 'sept', month: 9},
        {name: 'October', shortName: 'oct', month: 10},
        {name: 'November', shortName: 'nov', month: 11},
        {name: 'December', shortName: 'dec', month: 12}
      ],
      selectedMonth: '',
      selectedDay: '',
      selectedMonthDays: '',
      month: [],
      monthName: '',
      selectedYear: '',
      selectedHour: '',
      myBarChart: '',
      hourChart: '',
      visitsToday: '',
      visitsThisMonth: ''
    }
  },
  created() {
    this.$http.get('https://api.mlab.com/api/1/databases/signins/collections/signins?apiKey=Vp2I1nmC961_lV2whDojmmOuZzXb0S_o&l=10000')
    .then(response => {
      this.data = response.body;
      this.dataLoaded = true;
      console.log("Data has loaded")
      this.renderYearlyBarChart()
      this.renderHourlyPercentageBarChart()
      this.dailyStats()
    })
  },
  methods: {
    monthFilter() {
      this.month = []
      var month = this.selectedMonth
      this.data.filter(
        signin =>
        this.returnByMonth(signin, month)
      )
      this.renderMonthlyBarChart();
    },

    dailyStats() {
      var today = new Date()
      var dayVisitCounter = 0
      var monthVisitCounter = 0
      for (var visit of this.data) {
        var visitDate = new Date(visit.date)
        if (visitDate.getDate() === today.getDate() && visitDate.getMonth()+1 === today.getMonth()+1 ) {
          dayVisitCounter += 1
        }
        if (visitDate.getMonth()+1 === today.getMonth()+1 && visitDate.getFullYear() === today.getFullYear()) {
        monthVisitCounter += 1
        }
      }
      this.visitsToday = dayVisitCounter
      this.visitsThisMonth = monthVisitCounter
    },

    returnByMonth(signin, month) {
      var timeStamp = new Date(signin.date)
      if (timeStamp.getMonth()+1 === month) {
        this.month.push(signin);
      }
    },

    getDaysInMonth(month, year) {

      var date = new Date(year, month, 1);
      var days = [];
      while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return days;
    },

    renderYearlyBarChart() {

      var today = new Date();

      var yy = this.selectedYear

      if (yy === undefined || yy === "") {
        yy = today.getFullYear()
      } else {
        yy = this.selectedYear

      }

      var yearArray = []
      var yearNumbers = []

      for (var year of this.months) {
        yearArray.push(year.name)
        yearNumbers.push(year.month)
      }

      var visitPerMonth = []
      // for (var i = 0; i < dayMonth.length; i++) {
      //   var visitDayCount = 0
      for (var number of yearNumbers) {
        var visitCount = 0
        for (var visit of this.data) {
          var visitDate = new Date(visit.date)
          if (visitDate.getMonth() + 1 === number) {
            visitCount += 1
          }
        }
        visitPerMonth.push(visitCount)
      }

      var ctx = document.getElementById("year-visits-chart").getContext('2d');
      var yearBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: yearArray,
          backgroundColor: '#FFFFFF',
          backgroundColor: '#FFFFFF',
          datasets: [{
            label: 'Visits per day per for ' + this.selectedYear,
            data: visitPerMonth,
            backgroundColor: '#CC0033',
            borderColor: [
            ],
            borderWidth: 1
          }]
        },
        options: {
          'onClick' : (evt, item) => {
            var month = item[0]['_model'].label
            var monthNumber = this.getMonthReverse(month);
            this.selectedMonth = monthNumber
            if (this.myBarChart) {
              this.myBarChart.destroy()
            }
            this.renderMonthlyBarChart();
          },
          title: {
            display: true,
            text: 'Visits per day per for ' + this.selectedYear
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              },
              scaleLabel: {
                display: true,
                labelString: 'Visits'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            }]
          }
        }
      });
    },

    renderHourlyPercentageBarChart() {

      var today = new Date();
      var hoursArray = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
      var visitsPerHour = []

      for (var number of hoursArray) {
        var visitCount = 0
        for (var visit of this.data) {
          var visitDate = new Date(visit.date)
          if (visitDate.getHours() === number) {
            visitCount += 1
          }
        }
        visitsPerHour.push(visitCount)
      }

      var totalVisits = visitsPerHour.reduce((x, y) => x + y);
      var visitsPerHourPercent = []

      for (var number of visitsPerHour) {
        var percentage = (number / totalVisits) * 100
        var rounded = Math.round(percentage)
        visitsPerHourPercent.push(rounded)
      }

      var ctx = document.getElementById("total-hourly-visits-chart").getContext('2d');
      var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: hoursArray,
          backgroundColor: '#FFFFFF',
          backgroundColor: '#FFFFFF',
          datasets: [{
            label: 'Visit hour by percentage',
            data: visitsPerHourPercent,
            backgroundColor: '#CC0033',
            borderColor: [
            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Visit hour by percentage'
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              },
              scaleLabel: {
                display: true,
                labelString: 'Percentage (%)'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Hours'
              }
            }]
          }
        }
      });
    },

    renderMonthlyBarChart() {

      var today = new Date();
      var mm = this.selectedMonth;

      if (mm === undefined || mm === "") {
        mm = today.getMonth()+1
      } else {
        mm = this.selectedMonth
      }
      this.monthName = this.getMonth(mm)

      var dayMonth = []
      var visits = []

      var days_array = this.getDaysInMonth(mm-1, 2018)

      for (var day of days_array) {
        dayMonth.push(day.getDate())
      }

      this.selectedMonthDays = dayMonth

      var yy = today.getYear()
      for (var i = 0; i < dayMonth.length; i++) {
        var visitDayCount = 0
        for (var visit of this.data) {
          var visitDate = new Date(visit.date)

          if (visitDate.getDate() === dayMonth[i] && visitDate.getMonth()+1 === mm) {
            visitDayCount += 1;
          }
        }
        visits.push(visitDayCount);
      }

      var ctx = document.getElementById("month-visits-chart").getContext('2d');

      this.myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dayMonth,
          backgroundColor: '#FFFFFF',
          backgroundColor: '#FFFFFF',
          datasets: [{
            label: 'Visits per day per for ' + this.monthName,
            data: visits,
            backgroundColor: '#CC0033',
            borderColor: [
            ],
            borderWidth: 1
          }]
        },
        options: {
          'onClick' : (evt, item) => {
            var day = item[0]['_model'].label
            this.selectedDay = day
            if (this.hourChart) {
              this.hourChart.destroy()
            }

            this.renderHourlyBarChart();
          },
          title: {
            display: true,
            text: 'Visits per day per for ' + this.monthName
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              },
              scaleLabel: {
                display: true,
                labelString: 'Visits'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Day'
              }
            }]
          }
        }
      });
    },

    renderHourlyBarChart() {
      var visits = [];
      var hoursArray = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

      var today = new Date();

      var dd = this.selectedDay
      var mm = this.selectedMonth
      var yy = today.getYear()
      for (var i = 0; i < hoursArray.length; i++) {
        var hourVisitCount = 0
        for (var visit of this.data) {
          var visitDate = new Date(visit.date)

          if (visitDate.getHours() === hoursArray[i] && visitDate.getDate() === dd && visitDate.getMonth()+1 === mm) {
            hourVisitCount += 1;
          }
        }
        visits.push(hourVisitCount);
      }

      var ctx = document.getElementById("hourly-visits-chart").getContext('2d');
      this.hourChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: hoursArray,
          backgroundColor: '#FFFFFF',
          backgroundColor: '#FFFFFF',
          datasets: [{
            label: 'Visits per hour for ' + this.selectedDay + "/" + this.getMonth(this.selectedMonth),
            data: visits,
            backgroundColor:
            '#CC0033',
            borderColor: [
            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Visits per hour for ' + this.selectedDay + "/" + this.getMonth(this.selectedMonth)
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              },
              scaleLabel: {
                display: true,
                labelString: 'Visits'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Hour'
              }
            }]
          }
        }
      });
    },
    getMonth(monthNumber){
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
      }
    },
    getMonthReverse(monthName){
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
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
