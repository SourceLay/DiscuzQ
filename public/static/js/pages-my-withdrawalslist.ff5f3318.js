(window.webpackJsonp=window.webpackJsonp||[]).push([["pages-my-withdrawalslist"],{1443:function(t,e,i){"use strict";(function(t){var s;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return s}));try{s={quiPage:i("29c4").default,quiCellItem:i("e0ca").default,quiIcon:i("895d").default,quiFilterModal:i("1c23").default,quiLoadMore:i("51e5").default}}catch(e){if(-1===e.message.indexOf("Cannot find module")||-1===e.message.indexOf(".vue"))throw e;t.error(e.message),t.error("1. 排查组件名称拼写是否正确"),t.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),t.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("qui-page",{staticClass:"withdrawalslist",attrs:{"data-qui-theme":t.theme}},[i("v-uni-view",{staticClass:"withdrawalslist-head"},[i("qui-cell-item",{attrs:{"slot-right":!0,border:!1}},[i("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showFilter.apply(void 0,arguments)}}},[i("v-uni-text",[t._v(t._s(t.i18n.t("profile.status")+" ："+t.filterSelected.label))]),i("qui-icon",{staticClass:"text",attrs:{name:"icon-screen",size:"32",color:"#777"}}),i("qui-filter-modal",{ref:"filter",attrs:{"filter-list":t.filterList,"if-need-confirm":!1},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)},change:function(e){arguments[0]=e=t.$handleEvent(e),t.changeType.apply(void 0,arguments)}},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}})],1)],1),i("v-uni-picker",{staticClass:"date-picker",attrs:{mode:"date",value:t.date,fields:"month"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.bindDateChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-input"},[t._v(t._s(t.i18n.t("profile.time")+"："+t.date))])],1)],1),i("v-uni-scroll-view",{staticClass:"scroll-y",attrs:{"scroll-y":"true","scroll-with-animation":"true","show-scrollbar":"false"},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.pullDown.apply(void 0,arguments)}}},[t.dataList.length>0?i("v-uni-view",{staticClass:"withdrawalslist-items"},t._l(t.dataList,(function(e,s){return i("qui-cell-item",{key:s,attrs:{title:t.operateStatus[e.cash_status-1],brief:e.cash_sn,addon:"¥"+e.cash_actual_amount,"brief-right":t.timeHandle(e.created_at),border:s!=t.dataList.length-1,"class-item":3==e.cash_status?"fail":4==e.cash_status?"success":"normal"}})})),1):t._e(),t.loadingType?i("qui-load-more",{attrs:{status:t.loadingType,"show-icon":!1}}):t._e()],1)],1)},n=[]}).call(this,i("5a52").default)},"245f":function(t,e,i){"use strict";(function(e){var s=i("4ea4"),a=s(i("6f74")),n=i("b95e"),r=s(i("4c82"));t.exports={mixins:[a.default,r.default],methods:{getForum:function(){var t=this;this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(e){e&&(t.forum=e)}))},jump2PhoneLoginPage:function(){uni.redirectTo({url:"/pages/user/phone-login"})},jump2PhoneLoginRegisterPage:function(){uni.redirectTo({url:"/pages/user/phone-login-register"})},jump2LoginPage:function(){uni.redirectTo({url:"/pages/user/login"})},jump2RegisterPage:function(){uni.redirectTo({url:"/pages/user/register"})},jump2LoginBindPage:function(){uni.redirectTo({url:"/pages/user/login-bind"})},jump2RegisterBindPage:function(){uni.redirectTo({url:"/pages/user/register-bind"})},jump2LoginBindPhonePage:function(){uni.redirectTo({url:"/pages/user/login-bind-phone"})},jump2RegisterBindPhonePage:function(){uni.redirectTo({url:"/pages/user/register-bind-phone"})},jump2findpwdPage:function(){uni.navigateTo({url:"/pages/modify/findpwd?pas=reset_pwd"})},mpLoginMode:function(){this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&this.jump2LoginPage(),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open())},h5LoginMode:function(){r.default.isWeixin().isWeixin?(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),this.$store.dispatch("session/wxh5Login"))):(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}))},refreshmpParams:function(){var t=this;uni.login({success:function(i){if("login:ok"===i.errMsg){var s=i.code;uni.getUserInfo({success:function(e){var i={data:{attributes:{js_code:s,iv:e.iv,encryptedData:e.encryptedData}}};t.$store.dispatch("session/setParams",i)},fail:function(t){e.log(t)}})}},fail:function(t){e.log(t)}})},mpLogin:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;uni.setStorageSync("register",t),uni.setStorageSync("isSend",!0),uni.setStorageSync("isBind",!1),this.$store.getters["session/get"]("auth").open()},wxh5Login:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;uni.setStorageSync("register",t),uni.setStorageSync("rebind",e),this.$store.dispatch("session/wxh5Login")},getLoginParams:function(t,e){var i=t;if(""===t.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===t.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{var s=uni.getStorageSync("token");""!==s&&(i.data.attributes.token=s),this.login(i,e)}},getLoginBindParams:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.refreshmpParams();var s=t;if(""===t.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===t.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{1===i&&(s.data.attributes.rebind=1);var a=uni.getStorageSync("token");""!==a&&(s.data.attributes.token=a),this.login(s,e)}},login:function(t,i){var s=this;this.$store.dispatch("session/h5Login",t).then((function(t){if(t&&t.data&&t.data.data&&t.data.data.id&&(s.logind(),s.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(t){t&&t.set_site&&t.set_site.site_mode!==n.SITE_PAY&&uni.getStorage({key:"page",success:function(t){e.log("resData",t),uni.redirectTo({url:t.data})}}),t&&t.set_site&&t.set_site.site_mode===n.SITE_PAY&&s.user&&!s.user.paid&&uni.redirectTo({url:"/pages/site/info"})})),uni.showToast({title:i,duration:2e3})),t&&t.data&&t.data.errors){if("401"===t.data.errors[0].status||"402"===t.data.errors[0].status||"500"===t.data.errors[0].status){var a=s.i18n.t("core.".concat(t.data.errors[0].code));uni.showToast({icon:"none",title:a,duration:2e3})}if("403"===t.data.errors[0].status||"422"===t.data.errors[0].status){var r=s.i18n.t(t.data.errors[0].detail[0]);uni.showToast({icon:"none",title:r,duration:2e3})}}})).catch((function(t){return e.log(t)}))}}}}).call(this,i("5a52").default)},"368d":function(t,e,i){t.exports=i.p+"static/img/msg-warning.0c78a551.svg"},"3fae":function(t,e,i){var s=i("8fe4");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);(0,i("4f06").default)("7b4f04f5",s,!0,{sourceMap:!1,shadowMode:!1})},"4b84":function(t,e,i){"use strict";var s=i("3fae");i.n(s).a},"6f74":function(t,e,i){"use strict";var s=i("b95e");t.exports={computed:{user:function(){var t=this.$store.getters["session/get"]("userId");return t?this.$store.getters["jv/get"]("users/".concat(t)):{}}},methods:{getUserInfo:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=(new Date).getTime(),i=uni.getStorageSync(s.STORGE_GET_USER_TIME);if(t||(e-i)/1e3>60){var a={include:"groups,wechat"},n=this.$store.getters["session/get"]("userId");this.$store.commit("jv/deleteRecord",{_jv:{type:"users",id:n}}),this.$store.dispatch("jv/get",["users/".concat(n),{params:a}]).then((function(){return uni.$emit("updateNotiNum")})),uni.setStorageSync(s.STORGE_GET_USER_TIME,(new Date).getTime())}},logind:function(){var t=this,e=this.$store.getters["session/get"]("userId");if(e){this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]);this.$store.dispatch("jv/get",["users/".concat(e),{params:{include:"groups,wechat"}}]).then((function(e){t.$u.event.$emit("logind",e)})),this.$store.dispatch("forum/setError",{loading:!1})}}}}},"7f42":function(t,e,i){"use strict";var s=i("4ea4");i("99af"),i("4de4"),i("ac1f"),i("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=s(i("2909")),n=s(i("5530")),r=i("4b36"),o=i("cadb"),u={data:function(){var t=new Date,e=t.getFullYear(),i=t.getMonth()+1;i=i<10?"0".concat(i):i;var s="".concat(e,"-").concat(i);return{loadingType:"",pageSize:20,pageNum:1,userId:this.$store.getters["session/get"]("userId"),show:!1,date:s,filterSelected:{label:this.i18n.t("profile.all"),value:""},operateStatus:[this.i18n.t("profile.tobereviewed"),this.i18n.t("profile.approved"),this.i18n.t("profile.auditfailed"),this.i18n.t("profile.paymenttobemade"),this.i18n.t("profile.paymentsucceed"),this.i18n.t("profile.paymentfailed")],showDate:!1,dataList:[],filterList:[{title:this.i18n.t("profile.type"),data:[{label:this.i18n.t("profile.all"),value:"",selected:!0},{label:this.i18n.t("profile.tobereviewed"),value:1},{label:this.i18n.t("profile.approved"),value:2},{label:this.i18n.t("profile.auditfailed"),value:3},{label:this.i18n.t("profile.paymenttobemade"),value:4},{label:this.i18n.t("profile.paymentsucceed"),value:5},{label:this.i18n.t("profile.paymentfailed"),value:6}]}]}},onLoad:function(){this.getList()},methods:{confirm:function(t){this.filterSelected=(0,n.default)({},t[0].data),this.getList("filter")},changeType:function(t){this.filterList=t},showFilter:function(){this.show=!0,this.$refs.filter.setData()},bindDateChange:function(t){this.date=t.target.value,this.getList("filter")},timeHandle:function(t){return(0,o.time2MinuteOrHour)(t)},getList:function(t){var e=this;this.loadingType="loading";var i=this.date.split("-"),s=new Date(i[0],i[1],0).getDate(),n={"filter[user]":this.userId,"page[number]":this.pageNum,"page[limit]":this.pageSize,"filter[start_time]":"".concat(this.date,"-01-00-00-00"),"filter[end_time]":"".concat(this.date,"-").concat(s,"-23-59-59")};t&&"filter"===t&&(n.pageNum=1,this.dataList=[]),this.filterSelected.value&&(n["filter[cash_status]"]=this.filterSelected.value),r.status.run((function(){return e.$store.dispatch("jv/get",["wallet/cash",{params:n}])})).then((function(t){t._jv&&delete t._jv,e.loadingType=t.length===e.pageSize?"more":"nomore",e.dataList=[].concat((0,a.default)(e.dataList),(0,a.default)(t))}))},pullDown:function(){"more"===this.loadingType&&(this.pageNum+=1,this.getList())}}};e.default=u},"8fe4":function(t,e,i){(e=i("24fb")(!1)).push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* eg:\n  .container {\n    color: --color(BG-1);\n  }\n*/.withdrawalslist[data-v-1471ba8f] {min-height:100vh}.withdrawalslist[data-v-1471ba8f] .cell-item{padding-right:%?40?%}.withdrawalslist[data-v-1471ba8f] .cell-item__body{height:%?150?%}.withdrawalslist[data-v-1471ba8f] .cell-item__body__right-text{font-weight:700}.withdrawalslist[data-v-1471ba8f] .icon-screen{margin-left:%?20?%}.withdrawalslist[data-v-1471ba8f] .withdrawalslist-head{position:relative;padding:%?40?% 0 0 %?40?%;margin-bottom:%?30?%;background:var(--qui-BG-2);border-bottom:%?2?% solid var(--qui-BOR-ED)}.withdrawalslist[data-v-1471ba8f] .withdrawalslist-head .cell-item__body{height:%?78?%}.withdrawalslist[data-v-1471ba8f] .withdrawalslist-items{padding-left:%?40?%;margin-bottom:%?30?%;background:var(--qui-BG-2);border-bottom:%?2?% solid var(--qui-BOR-ED)}.withdrawalslist[data-v-1471ba8f] .cell-item.fail .cell-item__body__content-title{color:var(--qui-RED)}.withdrawalslist[data-v-1471ba8f] .cell-item.success .cell-item__body__content-title{color:var(--qui-GREEN)}.date-picker[data-v-1471ba8f]{position:absolute;top:%?40?%;left:%?40?%;z-index:10;width:50%;height:%?78?%}.date-picker .uni-input[data-v-1471ba8f]{width:100%;height:%?78?%;font-size:%?30?%;line-height:%?78?%}.scroll-y[data-v-1471ba8f]{max-height:calc(100vh - %?190?%)}',""]),t.exports=e},ac58:function(t,e,i){"use strict";i.r(e);var s=i("fdf6"),a=i("c3c9");for(var n in a)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("4b84");var r=i("f0c5"),o=Object(r.a)(a.default,s.b,s.c,!1,null,"1471ba8f",null,!1,s.a,void 0);e.default=o.exports},b469:function(t,e){t.exports={computed:{forums:function(){return this.$store.getters["jv/get"]("forums/1")}}}},c3c9:function(t,e,i){"use strict";i.r(e);var s=i("7f42"),a=i.n(s);for(var n in s)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(n);e.default=a.a},cadb:function(t,e,i){"use strict";i("99af"),i("e25e"),i("ac1f"),i("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.timestamp2day=e.time2DateAndHM=e.time2MinuteOrHour=void 0;e.time2MinuteOrHour=function(t){var e=new Date-new Date(t);return parseInt(parseInt(e/1e3,0)/60,0)<60?"".concat(Math.ceil(e/1e3/60),"分钟前"):parseInt(parseInt(parseInt(e/1e3,0)/60,0)/60,0)<16?"".concat(Math.ceil(e/1e3/60/60),"小时前"):t.replace(/T/," ").replace(/Z/,"").substring(0,16)};e.time2DateAndHM=function(t){var e=t.replace(/T/," ").replace(/Z/,"");return"".concat(e.substring(0,10)," ").concat(e.substring(11,16))};e.timestamp2day=function(t){var e=t-Math.round(new Date/1e3);return parseInt(e/86400,0)}},e972:function(t,e,i){t.exports=i.p+"static/img/msg-404.e11dc2d7.svg"},fdf6:function(t,e,i){"use strict";var s=i("1443");i.d(e,"a",(function(){return s.a})),i.d(e,"b",(function(){return s.b})),i.d(e,"c",(function(){return s.c}))}}]);