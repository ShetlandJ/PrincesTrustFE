<template>
  <div class="hello">

    <h2>Visits today: {{ visitsToday }}</h2>
    <h2>Visits this month: {{ visitsThisMonth }}</h2>

    <div id="select-boxes">

      <select v-model="selectedMonth" @change="monthFilter">
        <option disabled selected value="">Choose month</option>
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
import util from '../../helpers/util';
/* eslint-disable */

export default {

  name: 'Charts',
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
      selectedYear: '',
      selectedMonth: '',
      selectedDay: '',
      selectedMonthDays: '',
      month: [],
      monthName: '',
      selectedHour: '',
      myBarChart: '',
      hourChart: '',
      visitsToday: "Loading...",
      visitsThisMonth: '',
      hoursArray: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      today: new Date()
    }
  },
  created() {
    this.$http.get('https://api.mlab.com/api/1/databases/signins/collections/signins?apiKey=Vp2I1nmC961_lV2whDojmmOuZzXb0S_o&l=10000')
    .then(response => {
      this.data = response.body;
      this.dataLoaded = true;
      console.log("Data has loaded")
      this.selectedYear = this.today.getFullYear()
      this.selectedMonth = this.today.getMonth()
      this.selectedDay = this.today.getDate()
      this.renderYearlyBarChart()
      this.renderMonthlyBarChart()
      this.renderHourlyBarChart()
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
      // var today = new Date()
      var dayVisitCounter = 0
      var monthVisitCounter = 0
      for (var visit of this.data) {
        var visitDate = new Date(visit.date)
        if (visitDate.getDate() === this.today.getDate() && visitDate.getMonth()+1 === this.today.getMonth()+1 ) {
          dayVisitCounter += 1
        }
        if (visitDate.getMonth()+1 === this.today.getMonth()+1 && visitDate.getFullYear() === this.today.getFullYear()) {
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

    renderYearlyBarChart() {

      var yy = this.selectedYear

      if (yy === undefined || yy === "") {
        yy = this.today.getFullYear()
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
      util.renderChart(
        ctx,
        yearArray,
        'Visits per day per for ' + this.selectedYear,
        visitPerMonth,
        'Visits',
        'Months',
        (env, item) => {
          var month = item[0]['_model'].label
          var monthNumber = util.getMonthNumber(month);
          this.selectedMonth = monthNumber
          if (this.myBarChart) {
            this.myBarChart.destroy()
          }
          this.renderMonthlyBarChart();
        }
      )
    },

    renderMonthlyBarChart() {

      var mm = this.selectedMonth;

      if (mm === undefined || mm === "") {
        mm = this.today.getMonth()+1
      } else {
        mm = this.selectedMonth
      }
      this.monthName = util.getMonthName(mm)

      var dayMonth = []
      var visits = []

      var days_array = util.getDaysInMonth(2018, mm-1)

      for (var day of days_array) {
        dayMonth.push(day.getDate())
      }

      this.selectedMonthDays = dayMonth

      var yy = this.today.getYear()
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

      this.myBarChart = util.renderChart(
        ctx,
        dayMonth,
        'Visits per day per for ' + this.monthName,
        visits,
        'Visits',
        'Day',
        (env, item) => {
          var day = item[0]['_model'].label
          this.selectedDay = day
          if (this.hourChart) {
            this.hourChart.destroy()
          }
          this.renderHourlyBarChart();
        }
      )
    },

    renderHourlyBarChart() {
      var visits = [];


      var dd = this.selectedDay
      if (!dd) {
        dd = this.today.getDate()
      }

      if (this.selectedMonth) {
        var mm = this.selectedMonth
      } else {
        mm = this.today.getMonth()
      }
        // mm = this.today.getDate()

      var yy = this.today.getYear()
      for (var i = 0; i < this.hoursArray.length; i++) {
        var hourVisitCount = 0
        for (var visit of this.data) {
          var visitDate = new Date(visit.date)

          if (visitDate.getHours() === this.hoursArray[i] && visitDate.getDate() === dd && visitDate.getMonth()+1 === mm) {
            hourVisitCount += 1;
          }
        }
        visits.push(hourVisitCount);
      }

      var ctx = document.getElementById("hourly-visits-chart").getContext('2d');

      this.hourChart = util.renderChart(
        ctx,
        this.hoursArray,
        'Visits per hour for ' + this.selectedDay + "/" + util.getMonthName(this.selectedMonth),
        visits,
        'Visits',
        'Hour',
      )
    },
    renderHourlyPercentageBarChart() {

      var visitsPerHour = []

      for (var number of this.hoursArray) {
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

      util.renderChart(
        ctx,
        this.hoursArray,
        'Visit hour by percentage',
        visitsPerHourPercent,
        'Percentage (%)',
        'Hours',
      )
    }
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

select {
  border-radius: 2px;
}

#select-boxes {
  /* display: flex; */
}

.chartBlock {
  width: 800px;
  display: flex;
}

select {
  font-size: 18px;
  border:0px;
  outline:0px;
}


</style>
