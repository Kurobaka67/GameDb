(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c77fec5"],{"5a0c":function(e,t,i){!function(t,i){e.exports=i()}(0,(function(){"use strict";var e=1e3,t=6e4,i=36e5,n="millisecond",s="second",r="minute",a="hour",l="day",o="week",u="month",c="quarter",d="year",h="date",f="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,g=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},v=function(e,t,i){var n=String(e);return!n||n.length>=t?e:""+Array(t+1-n.length).join(i)+e},b={s:v,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),n=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+v(n,2,"0")+":"+v(s,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var n=12*(i.year()-t.year())+(i.month()-t.month()),s=t.clone().add(n,u),r=i-s<0,a=t.clone().add(n+(r?-1:1),u);return+(-(n+(i-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:u,y:d,w:o,d:l,D:h,h:a,m:r,s:s,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},j="en",$={};$[j]=p;var O=function(e){return e instanceof M},y=function e(t,i,n){var s;if(!t)return j;if("string"==typeof t){var r=t.toLowerCase();$[r]&&(s=r),i&&($[r]=i,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var l=t.name;$[l]=t,s=l}return!n&&s&&(j=s),s||!n&&j},w=function(e,t){if(O(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new M(i)},S=b;S.l=y,S.i=O,S.w=function(e,t){return w(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var M=function(){function p(e){this.$L=y(e.locale,null,!0),this.parse(e)}var v=p.prototype;return v.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(S.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var n=t.match(m);if(n){var s=n[2]-1||0,r=(n[7]||"0").substring(0,3);return i?new Date(Date.UTC(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)):new Date(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},v.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},v.$utils=function(){return S},v.isValid=function(){return!(this.$d.toString()===f)},v.isSame=function(e,t){var i=w(e);return this.startOf(t)<=i&&i<=this.endOf(t)},v.isAfter=function(e,t){return w(e)<this.startOf(t)},v.isBefore=function(e,t){return this.endOf(t)<w(e)},v.$g=function(e,t,i){return S.u(e)?this[t]:this.set(i,e)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(e,t){var i=this,n=!!S.u(t)||t,c=S.p(e),f=function(e,t){var s=S.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return n?s:s.endOf(l)},m=function(e,t){return S.w(i.toDate()[e].apply(i.toDate("s"),(n?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},g=this.$W,p=this.$M,v=this.$D,b="set"+(this.$u?"UTC":"");switch(c){case d:return n?f(1,0):f(31,11);case u:return n?f(1,p):f(0,p+1);case o:var j=this.$locale().weekStart||0,$=(g<j?g+7:g)-j;return f(n?v-$:v+(6-$),p);case l:case h:return m(b+"Hours",0);case a:return m(b+"Minutes",1);case r:return m(b+"Seconds",2);case s:return m(b+"Milliseconds",3);default:return this.clone()}},v.endOf=function(e){return this.startOf(e,!1)},v.$set=function(e,t){var i,o=S.p(e),c="set"+(this.$u?"UTC":""),f=(i={},i[l]=c+"Date",i[h]=c+"Date",i[u]=c+"Month",i[d]=c+"FullYear",i[a]=c+"Hours",i[r]=c+"Minutes",i[s]=c+"Seconds",i[n]=c+"Milliseconds",i)[o],m=o===l?this.$D+(t-this.$W):t;if(o===u||o===d){var g=this.clone().set(h,1);g.$d[f](m),g.init(),this.$d=g.set(h,Math.min(this.$D,g.daysInMonth())).$d}else f&&this.$d[f](m);return this.init(),this},v.set=function(e,t){return this.clone().$set(e,t)},v.get=function(e){return this[S.p(e)]()},v.add=function(n,c){var h,f=this;n=Number(n);var m=S.p(c),g=function(e){var t=w(f);return S.w(t.date(t.date()+Math.round(e*n)),f)};if(m===u)return this.set(u,this.$M+n);if(m===d)return this.set(d,this.$y+n);if(m===l)return g(1);if(m===o)return g(7);var p=(h={},h[r]=t,h[a]=i,h[s]=e,h)[m]||1,v=this.$d.getTime()+n*p;return S.w(v,this)},v.subtract=function(e,t){return this.add(-1*e,t)},v.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||f;var n=e||"YYYY-MM-DDTHH:mm:ssZ",s=S.z(this),r=this.$H,a=this.$m,l=this.$M,o=i.weekdays,u=i.months,c=function(e,i,s,r){return e&&(e[i]||e(t,n))||s[i].slice(0,r)},d=function(e){return S.s(r%12||12,e,"0")},h=i.meridiem||function(e,t,i){var n=e<12?"AM":"PM";return i?n.toLowerCase():n},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:S.s(l+1,2,"0"),MMM:c(i.monthsShort,l,u,3),MMMM:c(u,l),D:this.$D,DD:S.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,o,2),ddd:c(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(r),HH:S.s(r,2,"0"),h:d(1),hh:d(2),a:h(r,a,!0),A:h(r,a,!1),m:String(a),mm:S.s(a,2,"0"),s:String(this.$s),ss:S.s(this.$s,2,"0"),SSS:S.s(this.$ms,3,"0"),Z:s};return n.replace(g,(function(e,t){return t||m[e]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,h,f){var m,g=S.p(h),p=w(n),v=(p.utcOffset()-this.utcOffset())*t,b=this-p,j=S.m(this,p);return j=(m={},m[d]=j/12,m[u]=j,m[c]=j/3,m[o]=(b-v)/6048e5,m[l]=(b-v)/864e5,m[a]=b/i,m[r]=b/t,m[s]=b/e,m)[g]||b,f?j:S.a(j)},v.daysInMonth=function(){return this.endOf(u).$D},v.$locale=function(){return $[this.$L]},v.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),n=y(e,t,!0);return n&&(i.$L=n),i},v.clone=function(){return S.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},p}(),D=M.prototype;return w.prototype=D,[["$ms",n],["$s",s],["$m",r],["$H",a],["$W",l],["$M",u],["$y",d],["$D",h]].forEach((function(e){D[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),w.extend=function(e,t){return e.$i||(e(t,M,w),e.$i=!0),w},w.locale=y,w.isDayjs=O,w.unix=function(e){return w(1e3*e)},w.en=$[j],w.Ls=$,w.p={},w}))},ac41:function(e,t,i){"use strict";var n="images/unknown.jfif";t["a"]={methods:{getImage:function(e){return e||n}}}},f5ee:function(e,t,i){"use strict";i.r(t);i("a4d3"),i("e01a");var n=i("7a23"),s={class:"grid"},r={class:"col-12"},a={class:"card"},l={class:"grid formgrid"},o={class:"col-12 lg:col-11"},u={class:"col-12 lg:col-1"},c={class:"col-12 lg:col-4"},d=["src"],h={class:"col-12 lg:col-7"},f={class:"field grid"},m=Object(n["j"])("label",{for:"title",class:"col-fixed",style:{width:"100px"}},"Title : ",-1),g={class:"field grid"},p=Object(n["j"])("label",{for:"urlImage",class:"col-fixed",style:{width:"100px"}},"Url image : ",-1),v={class:"field grid"},b=Object(n["j"])("label",{for:"release",class:"col-fixed",style:{width:"100px"}},"Release : ",-1),j={class:"field grid"},$=Object(n["j"])("label",{for:"platforms",class:"col-fixed",style:{width:"100px"}},"Platforms : ",-1),O={class:"field grid"},y=Object(n["j"])("label",{for:"genres",class:"col-fixed",style:{width:"100px"}},"Genres : ",-1),w={class:"field grid"},S=Object(n["j"])("label",{for:"publisher",class:"col-fixed",style:{width:"100px"}},"Publisher : ",-1),M={class:"field grid"},D=Object(n["j"])("label",{for:"description",class:"col-fixed",style:{width:"100px"}},"Description : ",-1),x={class:"field grid"},V=Object(n["j"])("label",{for:"rating",class:"col-fixed",style:{width:"100px"}},"Rating : ",-1),I={class:"field grid"},G=Object(n["j"])("label",{for:"rating",class:"col-fixed",style:{width:"100px"}},"Status : ",-1),C={class:"col-12 lg:col-1"},Y={class:"col-3 lg:col-11 text-right"},_=Object(n["l"])("Save"),P={class:"col-3 lg:col-1"},A=Object(n["l"])("Cancel");function U(e,t,i,U,L,T){var k,H=Object(n["G"])("ConfirmDialog"),W=Object(n["G"])("Toast"),B=Object(n["G"])("InputText"),N=Object(n["G"])("Calendar"),F=Object(n["G"])("MultiSelect"),R=Object(n["G"])("Textarea"),z=Object(n["G"])("InputNumber"),J=Object(n["G"])("SelectButton"),E=Object(n["G"])("Knob"),Z=Object(n["G"])("Button");return Object(n["y"])(),Object(n["i"])("div",s,[Object(n["m"])(H),Object(n["m"])(W),Object(n["j"])("div",r,[Object(n["j"])("div",a,[Object(n["j"])("div",l,[Object(n["j"])("h5",o,Object(n["K"])(L.title),1),Object(n["j"])("p",u,Object(n["K"])(null===(k=L.game)||void 0===k?void 0:k.status),1),Object(n["j"])("div",c,[Object(n["j"])("img",{src:e.getImage(L.urlImage),width:"300"},null,8,d)]),Object(n["j"])("div",h,[Object(n["j"])("div",f,[m,Object(n["m"])(B,{class:"w-11 lg:w-8",type:"text",modelValue:L.title,"onUpdate:modelValue":t[0]||(t[0]=function(e){return L.title=e})},null,8,["modelValue"])]),Object(n["j"])("div",g,[p,Object(n["m"])(B,{class:"w-11 lg:w-8",type:"text",modelValue:L.urlImage,"onUpdate:modelValue":t[1]||(t[1]=function(e){return L.urlImage=e})},null,8,["modelValue"])]),Object(n["j"])("div",v,[b,Object(n["m"])(N,{modelValue:L.release,"onUpdate:modelValue":t[2]||(t[2]=function(e){return L.release=e}),dateFormat:"yy-mm-dd"},null,8,["modelValue"])]),Object(n["j"])("div",j,[$,Object(n["m"])(F,{modelValue:L.selectedPlatforms,"onUpdate:modelValue":t[3]||(t[3]=function(e){return L.selectedPlatforms=e}),options:L.allplatforms,placeholder:"Select platforms"},null,8,["modelValue","options"])]),Object(n["j"])("div",O,[y,Object(n["m"])(F,{modelValue:L.selectedGenres,"onUpdate:modelValue":t[4]||(t[4]=function(e){return L.selectedGenres=e}),options:L.allgenres,placeholder:"Select genres"},null,8,["modelValue","options"])]),Object(n["j"])("div",w,[S,Object(n["m"])(B,{class:"w-11 lg:w-8",type:"text",modelValue:e.publisher,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.publisher=t})},null,8,["modelValue"])]),Object(n["j"])("div",M,[D,Object(n["m"])(R,{modelValue:L.description,"onUpdate:modelValue":t[6]||(t[6]=function(e){return L.description=e}),autoResize:!0,rows:"10",cols:"80"},null,8,["modelValue"])]),Object(n["j"])("div",x,[V,Object(n["m"])(z,{id:"minmax-buttons",modelValue:L.rating,"onUpdate:modelValue":t[7]||(t[7]=function(e){return L.rating=e}),mode:"decimal",showButtons:"",min:0,max:100},null,8,["modelValue"])]),Object(n["j"])("div",I,[G,Object(n["m"])(J,{modelValue:L.status,"onUpdate:modelValue":t[8]||(t[8]=function(e){return L.status=e}),options:L.options},null,8,["modelValue","options"])])]),Object(n["j"])("div",C,[Object(n["m"])(E,{modelValue:L.rating,"onUpdate:modelValue":t[9]||(t[9]=function(e){return L.rating=e}),valueColor:T.ratingColor},null,8,["modelValue","valueColor"])]),Object(n["j"])("div",Y,[Object(n["m"])(Z,{class:"p-button-sm",onClick:T.save},{default:Object(n["Q"])((function(){return[_]})),_:1},8,["onClick"])]),Object(n["j"])("div",P,[Object(n["m"])(Z,{class:"p-button-sm",onClick:T.cancel},{default:Object(n["Q"])((function(){return[A]})),_:1},8,["onClick"])])])])])])}i("4d63"),i("c607"),i("ac1f"),i("2c3e"),i("25f0"),i("00b4");var L=i("5a0c"),T=i.n(L),k=i("ac41"),H={props:["id"],mixins:[k["a"]],videoGameService:null,data:function(){return{game:null,options:["AVAILABLE","UNAVAILABLE"],selectedGenres:null,allgenres:["Role Playing","Racing","Simulation","Sports","Strategy","Adventure","Casual","Indie","Puzzle","Family","Platformer"],selectedPlatforms:null,allplatforms:["PC","Nintendo","DS","XBox","Playstation 1","Playstation 2","Playstation 3","Playstation 4","Playstation 5","Nintendo Switch","Wii"],rating:0,publsher:null,urlImage:null,description:null,title:null,status:"AVAILABLE",release:null}},created:function(){this.videoGameService=this.servicesFactory.getGamesService()},mounted:function(){var e=this;this.videoGameService.getGameById(this.id).then((function(t){var i,n,s,r,a,l,o,u,c;e.game=t,e.rating=null===(i=e.game)||void 0===i?void 0:i.rating,e.selectedGenres=null===(n=e.game)||void 0===n?void 0:n.genres,e.selectedPlatforms=null===(s=e.game)||void 0===s?void 0:s.platforms,e.publisher=null===(r=e.game)||void 0===r?void 0:r.publisher,e.urlImage=null===(a=e.game)||void 0===a?void 0:a.image,e.description=null===(l=e.game)||void 0===l?void 0:l.description,e.title=null===(o=e.game)||void 0===o?void 0:o.title,e.status=null===(u=e.game)||void 0===u?void 0:u.status,e.release=null===(c=e.game)||void 0===c?void 0:c.release}))},computed:{ratingColor:function(){return this.rating>50?"green":"orange"}},methods:{save:function(){var e=new RegExp("(http|https)://");e.test(this.urlImage)||!this.urlImage?(this.game.rating=this.rating,this.game.description=this.description,this.game.image=this.urlImage,this.game.genres=this.selectedGenres,this.game.platforms=this.selectedPlatforms,this.game.publisher=this.publisher,this.game.title=this.title,this.game.status=this.status,this.game.release=T()(this.release).format("YYYY-MM-DD"),this.videoGameService.saveGame(this.game),this.$router.push("/gamedetail/".concat(this.id))):this.$toast.add({severity:"info",summary:"Failed",detail:"Wrong url for image",life:3e3})},cancel:function(){this.$router.push("/gamedetail/".concat(this.id))}},beforeRouteLeave:function(e,t,i){var n=this;this.game.rating!=this.rating||this.game.description!=this.description||this.game.image!=this.urlImage||this.game.genres!=this.selectedGenres||this.game.platforms!=this.selectedPlatforms||this.game.publisher!=this.publisher||this.game.title!=this.title||this.game.status!=this.status||this.game.release!=T()(this.release).format("YYYY-MM-DD")?this.$confirm.require({message:"Do you really want to leave? you have unsaved changes!",header:"Confirmation",icon:"pi pi-exclamation-triangle",accept:function(){n.$toast.add({severity:"info",summary:"Confirmed",detail:"You have accepted",life:3e3}),i()},reject:function(){n.$toast.add({severity:"error",summary:"Rejected",detail:"You have rejected",life:3e3}),i(!1)}}):i()}},W=i("6b0d"),B=i.n(W);const N=B()(H,[["render",U]]);t["default"]=N}}]);
//# sourceMappingURL=chunk-1c77fec5.8e4dc008.js.map