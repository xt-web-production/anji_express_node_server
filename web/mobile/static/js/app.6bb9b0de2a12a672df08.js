webpackJsonp([1],{"/ztZ":function(t,e){},0:function(t,e){},"0KfL":function(t,e){},"6kto":function(t,e,n){t.exports=n.p+"static/img/bg.288ed90.jpg"},"8x3f":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={};n.d(o,"update_user_info",function(){return O}),n.d(o,"update_item_type",function(){return S});var i=n("7+uW"),c=n("Dd8w"),s=n.n(c),r=n("mtWM"),u=n.n(r),a=n("DmT9"),f=n.n(a),l=n("FfS/"),d=n.n(l),h=n("NYxO"),p={name:"app",created:function(){u.a.post(this.$Host+"/getToken",{code:function(t,e){return new RegExp("(^|\\?|&)"+e+"=([^&]*)(\\s|&|$)","i").test(t)?unescape(RegExp.$2.replace(/\+/g," ")):""}(window.location.href,"code")}).then(function(t){console.log(t)}).catch(function(t){console.log(t)}),this.initGetCurrentItemType();var t=this;f()(this.$Host).on("screen",function(e){t.update_item_type(e.id)}),this.getWchartUserInfo()},methods:s()({},Object(h.b)(["update_item_type","update_user_info"]),{getWchartUserInfo:function(){this.update_user_info({name:d.a.name.findName(),img:d.a.image.imageUrl(),openId:"001001000111"})},initGetCurrentItemType:function(){var t=this;u.a.post(this.$Host+"/queryCurrentItemType").then(function(e){var n=e.data.data.currentItemType;t.update_item_type(n)})}})},m={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]},v=n("VU/8")(p,m,!1,function(t){n("8x3f")},null,null).exports,_=n("/ocq"),k=n("woOf"),b=n.n(k),g=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return u.a.post(t,e).then(function(t){var e=t.data;if("-1"==e.code)throw window.location.href="#/",e;if("1"==e.code)return e;throw e})},T={name:"mobile",data:function(){return{itemNames:["节目1","节目2","节目3","节目4","节目5","节目6","节目7","节目8"],name:"",img:"",msg:""}},computed:s()({},Object(h.c)(["userInfo"]),{wcUser:function(){return this.userInfo.userInfo}}),methods:{sendGift:function(t){g(this.$Host+"/sendGift",b()({itemtype:this.userInfo.itemType,gift:t},this.wcUser))},submitText:function(t){g(this.$Host+"/addText",b()({itemtype:this.userInfo.itemType,text:t},this.wcUser))},handleClickPraise:function(){g(this.$Host+"/addPraise",{itemtype:this.userInfo.itemType})},handleClickTicket:function(){var t=this;g(this.$Host+"/searchIsTicket").then(function(e){if(!e.data.allowTicket)throw e;t.$router.push("ticket")}).catch(function(e){t.$MessageBox("提示:","投票未开始")})}}},w={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mobile"},[n("h1",[t._v("mobile "+t._s(t.itemNames[t.userInfo.itemType-1]))]),t._v(" "),n("button",{on:{click:function(e){t.sendGift(1)}}},[t._v("赠送礼物1")]),t._v(" "),n("button",{on:{click:function(e){t.sendGift(2)}}},[t._v("赠送礼物2")]),t._v(" "),n("button",{on:{click:function(e){t.sendGift(3)}}},[t._v("赠送礼物3")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.msg,expression:"msg"}],attrs:{placeholder:"请输入内容"},domProps:{value:t.msg},on:{input:function(e){e.target.composing||(t.msg=e.target.value)}}}),t._v(" "),n("button",{on:{click:function(e){t.submitText(t.msg)}}},[t._v("发送祝福语")]),t._v(" "),n("button",{on:{click:t.handleClickTicket}},[t._v("开始投票")]),t._v(" "),n("button",{on:{click:t.handleClickPraise}},[t._v("点赞")])])},staticRenderFns:[]},y=n("VU/8")(T,w,!1,function(t){n("/ztZ")},"data-v-f503b710",null).exports,I={name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}},computed:s()({},Object(h.c)(["userInfo"]),{wcUser:function(){return this.userInfo.userInfo}}),methods:{handleClickEnterShow:function(){var t=this;g(this.$Host+"/enterShow",this.wcUser).then(function(e){t.$router.push("mobile")}).catch(function(e){t.$MessageBox("提示:","表演还没开始,请稍等！")})}}},$={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{class:this.$style.control,style:"background-position: center; background-image: url("+n("6kto")+");"},[e("div",{class:this.$style["burron-wrapper"]},[this.wcUser.img?e("p",{staticClass:"button animated bounceInUp",class:this.$style.button,on:{click:this.handleClickEnterShow}},[this._v("登录到直播间")]):this._e()])])},staticRenderFns:[]},U=n("VU/8")(I,$,!1,function(t){this.$style=n("qebp")},null,null).exports,x={name:"HelloWorld",data:function(){return{}},computed:s()({},Object(h.c)(["userInfo"]),{wcUser:function(){return this.userInfo.userInfo}}),methods:{handleCLickTick:function(t){var e=this;g(this.$Host+"/isAllowMobileSendTicket",b()({itemType:t},this.wcUser)).then(function(n){var o=n.data;if(console.log(o),o)throw n;g(e.$Host+"/mobileSendTicket",b()({itemType:t},e.wcUser)).then(function(t){e.$MessageBox("提示","投票成功！")})}).catch(function(t){e.$MessageBox("提示","你已经投过票了！")})}}},C={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"control"},[n("h1",[t._v("开始投票")]),t._v(" "),n("button",{on:{click:function(e){t.handleCLickTick(1)}}},[t._v("节目1")]),t._v(" "),n("button",{on:{click:function(e){t.handleCLickTick(2)}}},[t._v("节目2")]),t._v(" "),n("button",{on:{click:function(e){t.handleCLickTick(3)}}},[t._v("节目3")]),t._v(" "),n("button",{on:{click:function(e){t.handleCLickTick(4)}}},[t._v("节目4")]),t._v(" "),n("button",{on:{click:function(e){t.handleCLickTick(5)}}},[t._v("节目5")]),t._v(" "),n("button",{on:{click:function(e){t.handleCLickTick(6)}}},[t._v("节目6")]),t._v(" "),n("button",{on:{click:function(e){t.handleCLickTick(7)}}},[t._v("节目7")]),t._v(" "),n("button",{on:{click:function(e){t.handleCLickTick(8)}}},[t._v("节目8")])])},staticRenderFns:[]},H=n("VU/8")(x,C,!1,function(t){n("Uuzg")},"data-v-3525c9f2",null).exports;i.default.use(_.a);var E,L=new _.a({routes:[{path:"/",name:"mobile",component:U},{path:"/mobile",name:"mobile",component:y},{path:"/ticket",name:"ticket",component:H}]}),M="UPDATE_USER_INFO",N="UPDATE_ITEM_TYPE",A=function(t){return function(e){for(var n=arguments.length,o=Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];return e.commit.apply(void 0,[t].concat(o))}},O=A(M),S=A(N),F=n("bOdI"),j=n.n(F),z={userInfo:{state:{userInfo:{},itemType:1},mutations:(E={},j()(E,M,function(t,e){t.userInfo=e}),j()(E,N,function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;t.itemType=e}),E)}};i.default.use(h.a);var P=new h.a.Store({actions:o,modules:z,strict:!1}),R=n("Au9i");n("0KfL"),n("z5fg"),n("d8/S");i.default.prototype.$MessageBox=R.MessageBox,i.default.config.productionTip=!1,i.default.prototype.$Host="http://127.0.0.1:8009",new i.default({el:"#app",router:L,store:P,template:"<App/>",components:{App:v}})},Uuzg:function(t,e){},"d8/S":function(t,e){},qebp:function(t,e){t.exports={control:"hYNF1cAMU88NtQ1b1bH2T_0","burron-wrapper":"R3eXx19zbF7WV44f_kQHb_0",button:"_1HUn4TstFA4zOoq1UcvN6j_0"}},z5fg:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.6bb9b0de2a12a672df08.js.map