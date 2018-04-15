webpackJsonp([1],{0:function(t,e){},"1VQc":function(t,e){var r=function(t){switch(t){case 1:return"January";case 2:return"February";case 3:return"March";case 4:return"April";case 5:return"May";case 6:return"June";case 7:return"July";case 8:return"August";case 9:return"September";case 10:return"October";case 11:return"November";case 12:return"December";default:return"That is not a valid month number. Input must be between 0 and 13"}};r(1);t.exports={getMonthName:r,getMonthNumber:function(t){switch(t){case"January":return 1;case"February":return 2;case"March":return 3;case"April":return 4;case"May":return 5;case"June":return 6;case"July":return 7;case"August":return 8;case"September":return 9;case"October":return 10;case"November":return 11;case"December":return 12;default:return"That's not a correct month name. The following are valid month names: "+["January","February","March","April","May","June","July","August","September","October","November","December"]}},renderChart:function(t,e,r,a,n,s,o){return myBarChart=new Chart(t,{type:"bar",data:{labels:e,backgroundColor:"#FFFFFF",datasets:[{label:r,data:a,backgroundColor:"#CC0033",borderColor:[],borderWidth:1}]},options:{onClick:o,title:{display:!0,text:r,fontSize:20},scales:{yAxes:[{ticks:{beginAtZero:!0},scaleLabel:{display:!0,labelString:n}}],xAxes:[{scaleLabel:{display:!0,labelString:s}}]}}}),myBarChart},getDaysInMonth:function(t,e){for(var r=new Date(t,e),a=[];r.getMonth()===e;)a.push(new Date(r)),r.setDate(r.getDate()+1);return a}}},ILT2:function(t,e){},NHnr:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("7+uW"),n=r("BO1k"),s=r.n(n),o=r("1VQc"),i=r.n(o),h=r("QL79"),l=r.n(h),u={name:"Charts",data:function(){return{url:l.a.link,data:"",dataLoaded:!1,months:[{name:"January",shortName:"jan",month:1},{name:"February",shortName:"feb",month:2},{name:"March",shortName:"mar",month:3},{name:"April",shortName:"apr",month:4},{name:"May",shortName:"may",month:5},{name:"June",shortName:"jun",month:6},{name:"July",shortName:"jul",month:7},{name:"August",shortName:"aug",month:8},{name:"September",shortName:"sept",month:9},{name:"October",shortName:"oct",month:10},{name:"November",shortName:"nov",month:11},{name:"December",shortName:"dec",month:12}],selectedYear:"",selectedMonth:"",selectedDay:"",selectedMonthDays:"",month:[],monthName:"",selectedHour:"",myBarChart:"",hourChart:"",visitsToday:"Loading...",visitsThisMonth:"",hoursArray:[8,9,10,11,12,13,14,15,16,17,18],today:new Date}},created:function(){var t=this;this.$http.get(this.url).then(function(e){t.data=e.body,t.dataLoaded=!0,console.log("Data has loaded"),t.selectedYear=t.today.getFullYear(),t.selectedMonth=t.today.getMonth(),t.selectedDay=t.today.getDate(),t.renderYearlyBarChart(),t.renderMonthlyBarChart(),t.renderHourlyBarChart(),t.renderHourlyPercentageBarChart(),t.dailyStats()})},methods:{monthFilter:function(){var t=this;this.month=[];var e=this.selectedMonth;this.data.filter(function(r){return t.returnByMonth(r,e)}),this.renderMonthlyBarChart()},dailyStats:function(){var t=0,e=0,r=!0,a=!1,n=void 0;try{for(var o,i=s()(this.data);!(r=(o=i.next()).done);r=!0){var h=o.value,l=new Date(h.date);l.getDate()===this.today.getDate()&&l.getMonth()+1===this.today.getMonth()+1&&(t+=1),l.getMonth()+1===this.today.getMonth()+1&&l.getFullYear()===this.today.getFullYear()&&(e+=1)}}catch(t){a=!0,n=t}finally{try{!r&&i.return&&i.return()}finally{if(a)throw n}}this.visitsToday=t,this.visitsThisMonth=e},returnByMonth:function(t,e){new Date(t.date).getMonth()+1===e&&this.month.push(t)},renderYearlyBarChart:function(){var t=this,e=this.selectedYear;e=void 0===e||""===e?this.today.getFullYear():this.selectedYear;var r=[],a=[],n=!0,o=!1,h=void 0;try{for(var l,u=s()(this.months);!(n=(l=u.next()).done);n=!0){var c=l.value;r.push(c.name),a.push(c.month)}}catch(t){o=!0,h=t}finally{try{!n&&u.return&&u.return()}finally{if(o)throw h}}var d=[],v=!0,y=!1,m=void 0;try{for(var f,p=s()(a);!(v=(f=p.next()).done);v=!0){var g=f.value,M=0,_=!0,b=!1,C=void 0;try{for(var D,N=s()(this.data);!(_=(D=N.next()).done);_=!0){var w=D.value;new Date(w.date).getMonth()+1===g&&(M+=1)}}catch(t){b=!0,C=t}finally{try{!_&&N.return&&N.return()}finally{if(b)throw C}}d.push(M)}}catch(t){y=!0,m=t}finally{try{!v&&p.return&&p.return()}finally{if(y)throw m}}var B=document.getElementById("year-visits-chart").getContext("2d");i.a.renderChart(B,r,"Visits per day per for "+this.selectedYear,d,"Visits","Months",function(e,r){var a=r[0]._model.label,n=i.a.getMonthNumber(a);t.selectedMonth=n,t.myBarChart&&t.myBarChart.destroy(),t.renderMonthlyBarChart()})},renderMonthlyBarChart:function(){var t=this,e=this.selectedMonth;e=void 0===e||""===e?this.today.getMonth()+1:this.selectedMonth,this.monthName=i.a.getMonthName(e);var r=[],a=[],n=i.a.getDaysInMonth(2018,e-1),o=!0,h=!1,l=void 0;try{for(var u,c=s()(n);!(o=(u=c.next()).done);o=!0){var d=u.value;r.push(d.getDate())}}catch(t){h=!0,l=t}finally{try{!o&&c.return&&c.return()}finally{if(h)throw l}}this.selectedMonthDays=r;this.today.getYear();for(var v=0;v<r.length;v++){var y=0,m=!0,f=!1,p=void 0;try{for(var g,M=s()(this.data);!(m=(g=M.next()).done);m=!0){var _=g.value,b=new Date(_.date);b.getDate()===r[v]&&b.getMonth()+1===e&&(y+=1)}}catch(t){f=!0,p=t}finally{try{!m&&M.return&&M.return()}finally{if(f)throw p}}a.push(y)}var C=document.getElementById("month-visits-chart").getContext("2d");this.myBarChart=i.a.renderChart(C,r,"Visits per day per for "+this.monthName,a,"Visits","Day",function(e,r){var a=r[0]._model.label;t.selectedDay=a,t.hourChart&&t.hourChart.destroy(),t.renderHourlyBarChart()})},renderHourlyBarChart:function(){var t=[],e=this.selectedDay;if(e||(e=this.today.getDate()),this.selectedMonth)var r=this.selectedMonth;else r=this.today.getMonth();this.today.getYear();for(var a=0;a<this.hoursArray.length;a++){var n=0,o=!0,h=!1,l=void 0;try{for(var u,c=s()(this.data);!(o=(u=c.next()).done);o=!0){var d=u.value,v=new Date(d.date);v.getHours()===this.hoursArray[a]&&v.getDate()===e&&v.getMonth()+1===r&&(n+=1)}}catch(t){h=!0,l=t}finally{try{!o&&c.return&&c.return()}finally{if(h)throw l}}t.push(n)}var y=document.getElementById("hourly-visits-chart").getContext("2d");this.hourChart=i.a.renderChart(y,this.hoursArray,"Visits per hour for "+this.selectedDay+" / "+i.a.getMonthName(this.selectedMonth),t,"Visits","Hour")},renderHourlyPercentageBarChart:function(){var t=[],e=!0,r=!1,a=void 0;try{for(var n,o=s()(this.hoursArray);!(e=(n=o.next()).done);e=!0){var h=n.value,l=0,u=!0,c=!1,d=void 0;try{for(var v,y=s()(this.data);!(u=(v=y.next()).done);u=!0){var m=v.value;new Date(m.date).getHours()===h&&(l+=1)}}catch(t){c=!0,d=t}finally{try{!u&&y.return&&y.return()}finally{if(c)throw d}}t.push(l)}}catch(t){r=!0,a=t}finally{try{!e&&o.return&&o.return()}finally{if(r)throw a}}var f=t.reduce(function(t,e){return t+e}),p=[],g=!0,M=!1,_=void 0;try{for(var b,C=s()(t);!(g=(b=C.next()).done);g=!0){var D=(h=b.value)/f*100,N=Math.round(D);p.push(N)}}catch(t){M=!0,_=t}finally{try{!g&&C.return&&C.return()}finally{if(M)throw _}}var w=document.getElementById("total-hourly-visits-chart").getContext("2d");i.a.renderChart(w,this.hoursArray,"Visit hour by percentage",p,"Percentage (%)","Hours")}}},c={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"hello"},[r("h2",[t._v("Visits today: "+t._s(t.visitsToday))]),t._v(" "),r("h2",[t._v("Visits this month: "+t._s(t.visitsThisMonth))]),t._v(" "),r("div",{attrs:{id:"select-boxes"}},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedMonth,expression:"selectedMonth"}],on:{change:[function(e){var r=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedMonth=e.target.multiple?r:r[0]},t.monthFilter]}},[r("option",{attrs:{disabled:"",selected:"",value:""}},[t._v("Choose month")]),t._v(" "),t._l(t.months,function(e){return r("option",{domProps:{value:e.month}},[t._v("\n        "+t._s(e.name)+"\n      ")])})],2),t._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedDay,expression:"selectedDay"}],on:{change:[function(e){var r=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedDay=e.target.multiple?r:r[0]},t.renderHourlyBarChart]}},[t.selectedMonth?r("option",{attrs:{disabled:"",selected:"",value:""}},[t._v("Select a day")]):r("option",{attrs:{disabled:"",selected:"",value:""}},[t._v("← Select month")]),t._v(" "),t._l(this.selectedMonthDays,function(e){return r("option",{domProps:{value:e}},[t._v("\n        "+t._s(e)+"\n      ")])})],2)]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chartBlock"},[e("canvas",{attrs:{id:"year-visits-chart"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chartBlock"},[e("canvas",{attrs:{id:"month-visits-chart"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chartBlock"},[e("canvas",{attrs:{id:"hourly-visits-chart"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chartBlock"},[e("canvas",{attrs:{id:"total-hourly-visits-chart"}})])}]};var d=r("VU/8")(u,c,!1,function(t){r("Z8Nh")},"data-v-2564f988",null).exports,v={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"header"}},[e("h2",[this._v("Princes Trust sign-in dashboard")])])}]};var y={name:"App",components:{Header:r("VU/8")({name:"Header"},v,!1,function(t){r("ILT2")},null,null).exports,Charts:d}},m={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("Header"),this._v(" "),e("Charts")],1)},staticRenderFns:[]};var f=r("VU/8")(y,m,!1,function(t){r("YFXa")},null,null).exports,p=r("8+8L");a.a.use(p.a),a.a.config.productionTip=!1,new a.a({el:"#app",components:{App:f},template:"<App/>"})},QL79:function(t,e){t.exports={link:"https://api.mlab.com/api/1/databases/signins/collections/signins?apiKey=Vp2I1nmC961_lV2whDojmmOuZzXb0S_o&l=10000"}},YFXa:function(t,e){},Z8Nh:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.fca0dd78e8f45754f6ce.js.map