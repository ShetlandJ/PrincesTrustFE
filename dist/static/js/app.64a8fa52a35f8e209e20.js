webpackJsonp([1],{0:function(t,e){},"1VQc":function(t,e){t.exports={getMonthName:function(t){switch(t){case 1:return"January";case 2:return"February";case 3:return"March";case 4:return"April";case 5:return"May";case 6:return"June";case 7:return"July";case 8:return"August";case 9:return"September";case 10:return"October";case 11:return"November";case 12:return"December";default:return"That's not a valid month number"}},getMonthNumber:function(t){switch(t){case"January":return 1;case"February":return 2;case"March":return 3;case"April":return 4;case"May":return 5;case"June":return 6;case"July":return 7;case"August":return 8;case"September":return 9;case"October":return 10;case"November":return 11;case"December":return 12;default:return"That's not a correct month name"}}}},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("7+uW"),n=a("bOdI"),o=a.n(n),s=a("BO1k"),l=a.n(s),i=a("1VQc"),h=a.n(i),c={name:"HelloWorld",data:function(){return{url:"https://api.mlab.com/api/1/databases/signins/collections/signins?apiKey=Vp2I1nmC961_lV2whDojmmOuZzXb0S_o&l=10000",data:"",dataLoaded:!1,months:[{name:"January",shortName:"jan",month:1},{name:"February",shortName:"feb",month:2},{name:"March",shortName:"mar",month:3},{name:"April",shortName:"apr",month:4},{name:"May",shortName:"may",month:5},{name:"June",shortName:"jun",month:6},{name:"July",shortName:"jul",month:7},{name:"August",shortName:"aug",month:8},{name:"September",shortName:"sept",month:9},{name:"October",shortName:"oct",month:10},{name:"November",shortName:"nov",month:11},{name:"December",shortName:"dec",month:12}],selectedMonth:"",selectedDay:"",selectedMonthDays:"",month:[],monthName:"",selectedYear:"",selectedHour:"",myBarChart:"",hourChart:"",visitsToday:"Loading...",visitsThisMonth:""}},created:function(){var t=this;this.$http.get("https://api.mlab.com/api/1/databases/signins/collections/signins?apiKey=Vp2I1nmC961_lV2whDojmmOuZzXb0S_o&l=10000").then(function(e){t.data=e.body,t.dataLoaded=!0,console.log("Data has loaded"),t.renderYearlyBarChart(),t.renderHourlyPercentageBarChart(),t.dailyStats()})},methods:{monthFilter:function(){var t=this;this.month=[];var e=this.selectedMonth;this.data.filter(function(a){return t.returnByMonth(a,e)}),this.renderMonthlyBarChart()},dailyStats:function(){var t=new Date,e=0,a=0,r=!0,n=!1,o=void 0;try{for(var s,i=l()(this.data);!(r=(s=i.next()).done);r=!0){var h=s.value,c=new Date(h.date);c.getDate()===t.getDate()&&c.getMonth()+1===t.getMonth()+1&&(e+=1),c.getMonth()+1===t.getMonth()+1&&c.getFullYear()===t.getFullYear()&&(a+=1)}}catch(t){n=!0,o=t}finally{try{!r&&i.return&&i.return()}finally{if(n)throw o}}this.visitsToday=e,this.visitsThisMonth=a},returnByMonth:function(t,e){new Date(t.date).getMonth()+1===e&&this.month.push(t)},getDaysInMonth:function(t,e){for(var a=new Date(e,t,1),r=[];a.getMonth()===t;)r.push(new Date(a)),a.setDate(a.getDate()+1);return r},renderYearlyBarChart:function(){var t,e=this,a=new Date,r=this.selectedYear;r=void 0===r||""===r?a.getFullYear():this.selectedYear;var n=[],s=[],i=!0,c=!1,u=void 0;try{for(var d,v=l()(this.months);!(i=(d=v.next()).done);i=!0){var m=d.value;n.push(m.name),s.push(m.month)}}catch(t){c=!0,u=t}finally{try{!i&&v.return&&v.return()}finally{if(c)throw u}}var y=[],f=!0,p=!1,b=void 0;try{for(var g,C=l()(s);!(f=(g=C.next()).done);f=!0){var F=g.value,M=0,_=!0,D=!1,x=void 0;try{for(var w,N=l()(this.data);!(_=(w=N.next()).done);_=!0){var B=w.value;new Date(B.date).getMonth()+1===F&&(M+=1)}}catch(t){D=!0,x=t}finally{try{!_&&N.return&&N.return()}finally{if(D)throw x}}y.push(M)}}catch(t){p=!0,b=t}finally{try{!f&&C.return&&C.return()}finally{if(p)throw b}}var k=document.getElementById("year-visits-chart").getContext("2d");new Chart(k,{type:"bar",data:(t={labels:n,backgroundColor:"#FFFFFF"},o()(t,"backgroundColor","#FFFFFF"),o()(t,"datasets",[{label:"Visits per day per for "+this.selectedYear,data:y,backgroundColor:"#CC0033",borderColor:[],borderWidth:1}]),t),options:{onClick:function(t,a){var r=a[0]._model.label,n=h.a.getMonthNumber(r);e.selectedMonth=n,e.myBarChart&&e.myBarChart.destroy(),e.renderMonthlyBarChart()},title:{display:!0,text:"Visits per day per for "+this.selectedYear},scales:{yAxes:[{ticks:{beginAtZero:!0},scaleLabel:{display:!0,labelString:"Visits"}}],xAxes:[{scaleLabel:{display:!0,labelString:"Month"}}]}}})},renderHourlyPercentageBarChart:function(){new Date;var t=[8,9,10,11,12,13,14,15,16,17,18],e=[],a=!0,r=!1,n=void 0;try{for(var o,s=l()(t);!(a=(o=s.next()).done);a=!0){var i=o.value,h=0,c=!0,u=!1,d=void 0;try{for(var v,m=l()(this.data);!(c=(v=m.next()).done);c=!0){var y=v.value;new Date(y.date).getHours()===i&&(h+=1)}}catch(t){u=!0,d=t}finally{try{!c&&m.return&&m.return()}finally{if(u)throw d}}e.push(h)}}catch(t){r=!0,n=t}finally{try{!a&&s.return&&s.return()}finally{if(r)throw n}}var f=e.reduce(function(t,e){return t+e}),p=[],b=!0,g=!1,C=void 0;try{for(var F,M=l()(e);!(b=(F=M.next()).done);b=!0){var _=(i=F.value)/f*100,D=Math.round(_);p.push(D)}}catch(t){g=!0,C=t}finally{try{!b&&M.return&&M.return()}finally{if(g)throw C}}var x=document.getElementById("total-hourly-visits-chart").getContext("2d");new Chart(x,{type:"bar",data:{labels:t,backgroundColor:"#FFFFFF",datasets:[{label:"Visit hour by percentage",data:p,backgroundColor:"#CC0033",borderColor:[],borderWidth:1}]},options:{title:{display:!0,text:"Visit hour by percentage"},scales:{yAxes:[{ticks:{beginAtZero:!0},scaleLabel:{display:!0,labelString:"Percentage (%)"}}],xAxes:[{scaleLabel:{display:!0,labelString:"Hours"}}]}}})},renderMonthlyBarChart:function(){var t,e=this,a=new Date,r=this.selectedMonth;r=void 0===r||""===r?a.getMonth()+1:this.selectedMonth,this.monthName=h.a.getMonthName(r);var n=[],s=[],i=this.getDaysInMonth(r-1,2018),c=!0,u=!1,d=void 0;try{for(var v,m=l()(i);!(c=(v=m.next()).done);c=!0){var y=v.value;n.push(y.getDate())}}catch(t){u=!0,d=t}finally{try{!c&&m.return&&m.return()}finally{if(u)throw d}}this.selectedMonthDays=n;a.getYear();for(var f=0;f<n.length;f++){var p=0,b=!0,g=!1,C=void 0;try{for(var F,M=l()(this.data);!(b=(F=M.next()).done);b=!0){var _=F.value,D=new Date(_.date);D.getDate()===n[f]&&D.getMonth()+1===r&&(p+=1)}}catch(t){g=!0,C=t}finally{try{!b&&M.return&&M.return()}finally{if(g)throw C}}s.push(p)}var x=document.getElementById("month-visits-chart").getContext("2d");this.myBarChart=new Chart(x,{type:"bar",data:(t={labels:n,backgroundColor:"#FFFFFF"},o()(t,"backgroundColor","#FFFFFF"),o()(t,"datasets",[{label:"Visits per day per for "+this.monthName,data:s,backgroundColor:"#CC0033",borderColor:[],borderWidth:1}]),t),options:{onClick:function(t,a){var r=a[0]._model.label;e.selectedDay=r,e.hourChart&&e.hourChart.destroy(),e.renderHourlyBarChart()},title:{display:!0,text:"Visits per day per for "+this.monthName},scales:{yAxes:[{ticks:{beginAtZero:!0},scaleLabel:{display:!0,labelString:"Visits"}}],xAxes:[{scaleLabel:{display:!0,labelString:"Day"}}]}}})},renderHourlyBarChart:function(){for(var t,e=[],a=[8,9,10,11,12,13,14,15,16,17,18],r=new Date,n=this.selectedDay,s=this.selectedMonth,i=(r.getYear(),0);i<a.length;i++){var c=0,u=!0,d=!1,v=void 0;try{for(var m,y=l()(this.data);!(u=(m=y.next()).done);u=!0){var f=m.value,p=new Date(f.date);p.getHours()===a[i]&&p.getDate()===n&&p.getMonth()+1===s&&(c+=1)}}catch(t){d=!0,v=t}finally{try{!u&&y.return&&y.return()}finally{if(d)throw v}}e.push(c)}var b=document.getElementById("hourly-visits-chart").getContext("2d");this.hourChart=new Chart(b,{type:"bar",data:(t={labels:a,backgroundColor:"#FFFFFF"},o()(t,"backgroundColor","#FFFFFF"),o()(t,"datasets",[{label:"Visits per hour for "+this.selectedDay+"/"+h.a.getMonthName(this.selectedMonth),data:e,backgroundColor:"#CC0033",borderColor:[],borderWidth:1}]),t),options:{title:{display:!0,text:"Visits per hour for "+this.selectedDay+"/"+h.a.getMonthName(this.selectedMonth)},scales:{yAxes:[{ticks:{beginAtZero:!0},scaleLabel:{display:!0,labelString:"Visits"}}],xAxes:[{scaleLabel:{display:!0,labelString:"Hour"}}]}}})}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"hello"},[a("h2",[t._v("Visits today: "+t._s(t.visitsToday))]),t._v(" "),a("h2",[t._v("Visits this month: "+t._s(t.visitsThisMonth))]),t._v(" "),a("div",{attrs:{id:"select-boxes"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedMonth,expression:"selectedMonth"}],on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedMonth=e.target.multiple?a:a[0]},t.monthFilter]}},[a("option",{attrs:{disabled:"",selected:"",value:""}},[t._v("Choose month")]),t._v(" "),t._l(t.months,function(e){return a("option",{domProps:{value:e.month}},[t._v("\n        "+t._s(e.name)+"\n      ")])})],2),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedDay,expression:"selectedDay"}],on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedDay=e.target.multiple?a:a[0]},t.renderHourlyBarChart]}},[t.selectedMonth?a("option",{attrs:{disabled:"",selected:"",value:""}},[t._v("Select a day")]):a("option",{attrs:{disabled:"",selected:"",value:""}},[t._v("← Select month")]),t._v(" "),t._l(this.selectedMonthDays,function(e){return a("option",{domProps:{value:e}},[t._v("\n        "+t._s(e)+"\n      ")])})],2)]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chartBlock"},[e("canvas",{attrs:{id:"year-visits-chart"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chartBlock"},[e("canvas",{attrs:{id:"month-visits-chart"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chartBlock"},[e("canvas",{attrs:{id:"hourly-visits-chart"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chartBlock"},[e("canvas",{attrs:{id:"total-hourly-visits-chart"}})])}]};var d={name:"App",components:{HelloWorld:a("VU/8")(c,u,!1,function(t){a("SGsP")},"data-v-3df199ae",null).exports}},v={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("HelloWorld")],1)},staticRenderFns:[]};var m=a("VU/8")(d,v,!1,function(t){a("WSaQ")},null,null).exports,y=a("8+8L");r.a.use(y.a),r.a.config.productionTip=!1,new r.a({el:"#app",components:{App:m},template:"<App/>"})},SGsP:function(t,e){},WSaQ:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.64a8fa52a35f8e209e20.js.map