webpackJsonp([0],{"4APA":function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container",attrs:{id:"app"}},[a("div",{staticClass:"nav"},[a("router-link",{attrs:{to:"/"}},[e._v("Home")])],1),e._v(" "),a("router-view")],1)},s=[],n={render:o,staticRenderFns:s};t.a=n},"7DnR":function(e,t){},"7dgZ":function(e,t,a){"use strict";function o(e){a("JWwo")}var s=a("RHlG"),n=a("nEl1"),i=a("VU/8"),r=o,l=i(s.a,n.a,r,null,null);t.a=l.exports},HXef:function(e,t,a){"use strict";function o(e){a("mMS+")}var s=a("dPB5"),n=a("aubC"),i=a("VU/8"),r=o,l=i(s.a,n.a,r,null,null);t.a=l.exports},HeCb:function(e,t,a){e.exports=a.p+"static/img/jared.7b91bb6.jpg"},JWwo:function(e,t){},M93x:function(e,t,a){"use strict";function o(e){a("7DnR")}var s=a("xJD8"),n=a("4APA"),i=a("VU/8"),r=o,l=i(s.a,n.a,r,null,null);t.a=l.exports},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("7+uW"),s=a("M93x"),n=a("YaEn");a("HXef"),a("7dgZ");o.a.config.productionTip=!1,new o.a({el:"#app",router:n.a,template:"<App/>",components:{App:s.a}})},RHlG:function(e,t,a){"use strict";var o=a("cI1V");t.a={name:"BlogPost",props:[],data:function(){return{post:o[this.$route.params.id]}}}},YaEn:function(e,t,a){"use strict";var o=a("7+uW"),s=a("/ocq"),n=a("HXef"),i=a("7dgZ");o.a.use(s.a),t.a=new s.a({routes:[{path:"/",name:"Home",component:n.a},{path:"/blog/:id",component:i.a}],scrollBehavior:function(e,t,a){return{x:0,y:0}}})},aubC:function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"page-body content"},[a("h2",[e._v("Blog Posts")]),e._v(" "),a("ul",{staticClass:"demo",attrs:{id:"v-for-object"}},e._l(e.posts,function(t,o){return a("li",[a("router-link",{attrs:{to:"/blog/"+o}},[a("h3",[e._v(e._s(t.title))])])],1)}))])])},s=[],n={render:o,staticRenderFns:s};t.a=n},cI1V:function(e,t){e.exports={"09042017":{title:"Week 1",subtitle:"Beginning of the End",content:[{title:"What are your expectations of the class?",body:"As the first week of class has finished it is really starting to hit me that I am in my final year. Having now been programming for 3 years my main goal for taking SWE is to solidify good practices and proper techniques in my code. I have used many of the technologies or some variant of them through personal projects or internships, but with more practice comes better and better results. I also am looking forward to becoming proficient in python. While I have worked in the language before, I look forward to Downings very in depth look at the language. I know I learned a great deal about C++ in OOP, and I hope to get that deep into Python as well."},{title:"What did you do this past week?",body:"This past week was quite an easy one, every class was introductions, syllib, and maybe a intro lecture. I did get a good feel of the majority of my classes so I have been working to prepare myself for the routine I will soon be deeply entrenched in."},{title:"What's in your way?",body:"Currently my school life is smooth sailing, so there aren't really any blockers this week. I do have one class that is only on tuesdays, that I for obvious reasons did not attend, so I am still curious to find out how that class will be."},{title:"What will you do next week?",body:"This upcoming week is where things begin to get real. I will start to form real routines and figure out the time scheduling for all of my classes work."},{title:"What's my experience of the class?",body:"I have taken OOP in the past and so SWE feel very familiar. I was dissapointed to see that the groups for the large project will be randomly assigned, as this project was a large reason for taking this class. I get that the random teams is supposed to simulate 'real life' better, but here where a big portion of it is coming up with the idea (unlike a real job where the idea is typically already with the team) I feel like it will stifle the creativity we will have. I think this because I wanted to go in with friends and acquaintances who have similar interests so we could work on something we all know a lot about and therefore be more creative."},{title:"What's my pick-of-the-week or tip-of-the-week?",body:"My tip of the week is to make sure that you are really paying attention to you classes during syllabus week so you can figure out the work load and schedule you will have to keep throughout the semester. Blocking your time early and preparing yourself can make school feel alot less stressful once the work actually begins."}]}}},dPB5:function(e,t,a){"use strict";var o=a("cI1V");t.a={name:"Home",data:function(){return{posts:o}}}},"mMS+":function(e,t){},nEl1:function(e,t,a){"use strict";var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("div",{staticClass:"page-body blogpost content"},[e._m(0),e._v(" "),a("h2",[e._v(e._s(e.post.title))]),e._v(" "),void 0!=e.post.subtitle?a("h4",[e._v(e._s(e.post.subtitle))]):e._e(),e._v(" "),a("ul",e._l(e.post.content,function(t){return a("li",[a("h5",[e._v(e._s(t.title))]),e._v(" "),a("p",[e._v(e._s(t.body))])])}))])])},s=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"header"},[o("img",{staticClass:"headshot",attrs:{src:a("HeCb")}}),e._v(" "),o("div",{staticClass:"info"},[o("h3",[e._v("CS373 Fall 2017: Jared Jones")])])])}],n={render:o,staticRenderFns:s};t.a=n},xJD8:function(e,t,a){"use strict";t.a={name:"app",data:function(){return{msg:"Welcome to Your Vue.js App"}}}}},["NHnr"]);
//# sourceMappingURL=app.41337b1f98a4d98ae25b.js.map