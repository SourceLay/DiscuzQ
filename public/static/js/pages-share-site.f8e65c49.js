(window.webpackJsonp=window.webpackJsonp||[]).push([["pages-share-site"],{"0bf9":function(t,e,i){"use strict";i.r(e);var o=i("17eb"),r=i("866b");for(var n in r)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return r[t]}))}(n);i("c274");var s=i("f0c5"),a=Object(s.a)(r.default,o.b,o.c,!1,null,"21adcbaa",null,!1,o.a,void 0);e.default=a.exports},"17eb":function(t,e,i){"use strict";var o=i("2d9a");i.d(e,"a",(function(){return o.a})),i.d(e,"b",(function(){return o.b})),i.d(e,"c",(function(){return o.c}))},"245f":function(t,e,i){"use strict";(function(e){var o=i("4ea4"),r=o(i("6f74")),n=i("b95e"),s=o(i("4c82"));t.exports={mixins:[r.default,s.default],methods:{getForum:function(){var t=this;this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(e){e&&(t.forum=e)}))},jump2PhoneLoginPage:function(){uni.redirectTo({url:"/pages/user/phone-login"})},jump2PhoneLoginRegisterPage:function(){uni.redirectTo({url:"/pages/user/phone-login-register"})},jump2LoginPage:function(){uni.redirectTo({url:"/pages/user/login"})},jump2RegisterPage:function(){uni.redirectTo({url:"/pages/user/register"})},jump2LoginBindPage:function(){uni.redirectTo({url:"/pages/user/login-bind"})},jump2RegisterBindPage:function(){uni.redirectTo({url:"/pages/user/register-bind"})},jump2LoginBindPhonePage:function(){uni.redirectTo({url:"/pages/user/login-bind-phone"})},jump2RegisterBindPhonePage:function(){uni.redirectTo({url:"/pages/user/register-bind-phone"})},jump2findpwdPage:function(){uni.navigateTo({url:"/pages/modify/findpwd?pas=reset_pwd"})},mpLoginMode:function(){this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&this.jump2LoginPage(),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open())},h5LoginMode:function(){s.default.isWeixin().isWeixin?(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),this.$store.dispatch("session/wxh5Login"))):(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}))},refreshmpParams:function(){var t=this;uni.login({success:function(i){if("login:ok"===i.errMsg){var o=i.code;uni.getUserInfo({success:function(e){var i={data:{attributes:{js_code:o,iv:e.iv,encryptedData:e.encryptedData}}};t.$store.dispatch("session/setParams",i)},fail:function(t){e.log(t)}})}},fail:function(t){e.log(t)}})},mpLogin:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;uni.setStorageSync("register",t),uni.setStorageSync("isSend",!0),uni.setStorageSync("isBind",!1),this.$store.getters["session/get"]("auth").open()},wxh5Login:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;uni.setStorageSync("register",t),uni.setStorageSync("rebind",e),this.$store.dispatch("session/wxh5Login")},getLoginParams:function(t,e){var i=t;if(""===t.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===t.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{var o=uni.getStorageSync("token");""!==o&&(i.data.attributes.token=o),this.login(i,e)}},getLoginBindParams:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.refreshmpParams();var o=t;if(""===t.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===t.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{1===i&&(o.data.attributes.rebind=1);var r=uni.getStorageSync("token");""!==r&&(o.data.attributes.token=r),this.login(o,e)}},login:function(t,i){var o=this;this.$store.dispatch("session/h5Login",t).then((function(t){if(t&&t.data&&t.data.data&&t.data.data.id&&(o.logind(),o.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(t){t&&t.set_site&&t.set_site.site_mode!==n.SITE_PAY&&uni.getStorage({key:"page",success:function(t){e.log("resData",t),uni.redirectTo({url:t.data})}}),t&&t.set_site&&t.set_site.site_mode===n.SITE_PAY&&o.user&&!o.user.paid&&uni.redirectTo({url:"/pages/site/info"})})),uni.showToast({title:i,duration:2e3})),t&&t.data&&t.data.errors){if("401"===t.data.errors[0].status||"402"===t.data.errors[0].status||"500"===t.data.errors[0].status){var r=o.i18n.t("core.".concat(t.data.errors[0].code));uni.showToast({icon:"none",title:r,duration:2e3})}if("403"===t.data.errors[0].status||"422"===t.data.errors[0].status){var s=o.i18n.t(t.data.errors[0].detail[0]);uni.showToast({icon:"none",title:s,duration:2e3})}}})).catch((function(t){return e.log(t)}))}}}}).call(this,i("5a52").default)},"2d9a":function(t,e,i){"use strict";(function(t){var o;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return o}));try{o={quiPage:i("29c4").default,quiButton:i("8397").default}}catch(e){if(-1===e.message.indexOf("Cannot find module")||-1===e.message.indexOf(".vue"))throw e;t.error(e.message),t.error("1. 排查组件名称拼写是否正确"),t.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),t.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("qui-page",{attrs:{"data-qui-theme":t.theme}},[i("v-uni-view",{staticClass:"painter"},[i("v-uni-view",{staticClass:"canvas-box"},[i("v-uni-view",{staticClass:"cent"},[i("v-uni-image",{staticClass:"cent-image",attrs:{src:t.imagePath,mode:"widthFix","show-menu-by-longpress":!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.previewImage.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"box-img"},[i("painter",{attrs:{"custom-style":"margin-left: 40rpx; height: 0rpx; position:fixed",palette:t.template,"width-pixels":"2080"},on:{imgErr:function(e){arguments[0]=e=t.$handleEvent(e),t.imgErr.apply(void 0,arguments)},imgOK:function(e){arguments[0]=e=t.$handleEvent(e),t.onImgOK.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"btn-box"},[i("qui-button",{attrs:{type:"primary",size:"large"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.fun.apply(void 0,arguments)}}},[t._v(t._s(t.i18n.t("share.savealbum")))])],1)],1)],1)},n=[]}).call(this,i("5a52").default)},"368d":function(t,e,i){t.exports=i.p+"static/img/msg-warning.0c78a551.svg"},"44cc":function(t,e,i){"use strict";var o=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(i("d4ec")),n=o(i("bee2")),s=function(){function t(){(0,r.default)(this,t)}return(0,n.default)(t,[{key:"palette",value:function(t){return{width:"700px",height:"980px",background:"#ffffff",views:[{type:"rect",css:{background:"#1878F3",width:"700px",height:"450px",top:"0px",left:"0px",rotate:"0",borderRadius:"",shadow:"",color:"#1878F3"}},{type:"image",url:t.userheader,css:{width:"80px",height:"80px",top:"40px",left:"40px",rotate:"0",borderRadius:"40px",borderWidth:"",borderColor:"#000000",shadow:"",mode:"scaleToFill"}},{type:"text",text:t.username,css:{color:"#FFFFFF",background:"rgba(0,0,0,0)",width:"500px",height:"40.04px",top:"41px",left:"140px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"bold",maxLines:"1",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:t.slitename,css:{color:"#FFFFFF",background:"rgba(0,0,0,0)",width:"500px",height:"34.32px",top:"88px",left:"140px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"24px",fontWeight:"400",maxLines:"1",lineHeight:"34.632000000000005px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"image",url:t.slitelogo,css:{height:"88px",top:"232.99999999999997px",left:"".concat(t.leftwidth,"px"),rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",mode:"scaleToFill"}},{type:"text",text:t.member,css:{color:"rgba(255,255,255,0.5)",background:"rgba(0,0,0,0)",width:"53px",height:"37.18000000000001px",top:"365px",left:"160px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"26px",fontWeight:"400",maxLines:"1",lineHeight:"37.51800000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:"".concat(t.themnumber),css:{color:"#FFFFFF",background:"rgba(0,0,0,0)",width:"89px",height:"40.04px",top:"364px",left:"227px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"400",maxLines:"1",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:t.contents,css:{color:"rgba(255,255,255,0.5)",background:"rgba(0,0,0,0)",width:"53px",height:"37.18000000000001px",top:"365px",left:"381px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"26px",fontWeight:"400",maxLines:"1",lineHeight:"37.51800000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:"".concat(t.contdata),css:{color:"#FFFFFF",background:"rgba(0,0,0,0)",width:"92px",height:"40.04px",top:"364px",left:"448px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"400",maxLines:"1",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:t.siteintroduction,css:{color:"#333333",background:"rgba(0,0,0,0)",width:"113px",height:"40.04px",top:"500px",left:"40px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"bold",maxLines:"1",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:t.introd,css:{color:"#6D6D6D",background:"rgba(0,0,0,0)",width:"622px",height:"122.304px",top:"557px",left:"40px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"400",maxLines:"5",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"rect",css:{background:"#F9FAFC",width:"700px",height:"200px",top:"782px",left:"0px",rotate:"0",borderRadius:"",shadow:"",color:"#F9FAFC"}},{type:"image",url:t.userweixincode,css:{width:"140px",height:"140px",top:"812px",left:"40px",rotate:"0",borderRadius:"0px",borderWidth:"",borderColor:"#000000",shadow:"",mode:"scaleToFill"}},{type:"text",text:t.longpressrecog,css:{color:"#333333",background:"rgba(0,0,0,0)",width:"560px",height:"40.04px",top:"842px",left:"210px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"400",maxLines:"1",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:t.comefrom+t.slitename,css:{color:"#AAAAAA",background:"rgba(0,0,0,0)",width:"450px",height:"34.32px",top:"889px",left:"210px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"24px",fontWeight:"400",maxLines:"1",lineHeight:"34.632000000000005px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}}]}}}]),t}();e.default=s},"45b6":function(t,e,i){"use strict";var o=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(i("d4ec")),n=o(i("bee2")),s=function(){function t(){(0,r.default)(this,t)}return(0,n.default)(t,[{key:"palette",value:function(t){return{width:"700px",height:"980px",background:"#ffffff",views:[{type:"rect",css:{background:"#1878F3",width:"700px",height:"450px",top:"0px",left:"0px",rotate:"0",borderRadius:"",shadow:"",color:"#1878F3"}},{type:"text",text:t.siteintroduction,css:{color:"#333333",background:"rgba(0,0,0,0)",width:"113px",height:"40.04px",top:"500px",left:"40px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"bold",maxLines:"1",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:t.introd,css:{color:"#6D6D6D",background:"rgba(0,0,0,0)",width:"622px",height:"122.304px",top:"557px",left:"40px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"400",maxLines:"5",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"rect",css:{background:"#F9FAFC",width:"700px",height:"200px",top:"782px",left:"0px",rotate:"0",borderRadius:"",shadow:"",color:"#F9FAFC"}},{type:"image",url:t.userweixincode,css:{"min-width":"140px",height:"140px",top:"812px",left:"40px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",mode:"scaleToFill"}},{type:"text",text:t.longpressrecog,css:{color:"#333333",background:"rgba(0,0,0,0)",width:"560px",height:"40.04px",top:"842px",left:"210px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"400",maxLines:"1",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:t.comefrom+t.slitename,css:{color:"#AAAAAA",background:"rgba(0,0,0,0)",width:"450px",height:"34.32px",top:"889px",left:"210px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"24px",fontWeight:"400",maxLines:"1",lineHeight:"34.632000000000005px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"image",url:t.sliteback,css:{width:"700px",height:"450px",top:"0px",left:"0px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",mode:"scaleToFill"}},{type:"image",url:t.userheader,css:{width:"80px",height:"80px",top:"40px",left:"40px",rotate:"0",borderRadius:"40px",borderWidth:"",borderColor:"#000000",shadow:"",mode:"scaleToFill"}},{type:"text",text:t.username,css:{color:"#FFFFFF",background:"rgba(0,0,0,0)",width:"500px",height:"40.04px",top:"41px",left:"140px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"bold",maxLines:"1",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:t.slitename,css:{color:"#FFFFFF",background:"rgba(0,0,0,0)",width:"500px",height:"34.32px",top:"88px",left:"140px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"24px",fontWeight:"400",maxLines:"1",lineHeight:"34.632000000000005px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"image",url:t.slitelogo,css:{height:"88px",top:"232.99999999999997px",left:"".concat(t.leftwidth,"px"),rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",mode:"scaleToFill"}},{type:"text",text:t.member,css:{color:"rgba(255,255,255,0.5)",background:"rgba(0,0,0,0)",width:"53px",height:"37.18000000000001px",top:"365px",left:"160px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"26px",fontWeight:"400",maxLines:"1",lineHeight:"37.51800000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:"".concat(t.themnumber),css:{color:"#FFFFFF",background:"rgba(0,0,0,0)",width:"89px",height:"40.04px",top:"364px",left:"227px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"400",maxLines:"1",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:t.contents,css:{color:"rgba(255,255,255,0.5)",background:"rgba(0,0,0,0)",width:"53px",height:"37.18000000000001px",top:"365px",left:"381px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"26px",fontWeight:"400",maxLines:"1",lineHeight:"37.51800000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}},{type:"text",text:"".concat(t.contdata),css:{color:"#FFFFFF",background:"rgba(0,0,0,0)",width:"92px",height:"40.04px",top:"364px",left:"448px",rotate:"0",borderRadius:"",borderWidth:"",borderColor:"#000000",shadow:"",padding:"0px",fontSize:"28px",fontWeight:"400",maxLines:"1",lineHeight:"40.40400000000001px",textStyle:"fill",textDecoration:"none",fontFamily:"",textAlign:"left"}}]}}}]),t}();e.default=s},"6f74":function(t,e,i){"use strict";var o=i("b95e");t.exports={computed:{user:function(){var t=this.$store.getters["session/get"]("userId");return t?this.$store.getters["jv/get"]("users/".concat(t)):{}}},methods:{getUserInfo:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=(new Date).getTime(),i=uni.getStorageSync(o.STORGE_GET_USER_TIME);if(t||(e-i)/1e3>60){var r={include:"groups,wechat"},n=this.$store.getters["session/get"]("userId");this.$store.commit("jv/deleteRecord",{_jv:{type:"users",id:n}}),this.$store.dispatch("jv/get",["users/".concat(n),{params:r}]).then((function(){return uni.$emit("updateNotiNum")})),uni.setStorageSync(o.STORGE_GET_USER_TIME,(new Date).getTime())}},logind:function(){var t=this,e=this.$store.getters["session/get"]("userId");if(e){this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]);this.$store.dispatch("jv/get",["users/".concat(e),{params:{include:"groups,wechat"}}]).then((function(e){t.$u.event.$emit("logind",e)})),this.$store.dispatch("forum/setError",{loading:!1})}}}}},"866b":function(t,e,i){"use strict";i.r(e);var o=i("b5da"),r=i.n(o);for(var n in o)["default"].indexOf(n)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(n);e.default=r.a},"86c9":function(t,e,i){var o=i("978a");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,i("4f06").default)("3112a1ce",o,!0,{sourceMap:!1,shadowMode:!1})},"978a":function(t,e,i){(e=i("24fb")(!1)).push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* eg:\n  .container {\n    color: --color(BG-1);\n  }\n*/.painter[data-v-21adcbaa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:100vw;height:100vh;background-color:var(--qui-BG-2)}.canvas-box[data-v-21adcbaa]{width:100%;height:100%;padding-top:%?41?%;margin-bottom:%?80?%}.cent[data-v-21adcbaa]{width:%?700?%;height:%?980?%;margin:0 auto;background:var(--qui-FC-FFF);border-radius:10px;box-shadow:0 %?3?% %?6?% rgba(0,0,0,.16)}.cent .cent-image[data-v-21adcbaa]{display:block;width:100%;height:100%}#front[data-v-21adcbaa]{position:fixed;width:0;height:0}.btn-box[data-v-21adcbaa]{margin:0 0 %?40?% %?40?%}uni-canvas[data-v-21adcbaa]{width:600px;height:300px}',""]),t.exports=e},b469:function(t,e){t.exports={computed:{forums:function(){return this.$store.getters["jv/get"]("forums/1")}}}},b5da:function(t,e,i){"use strict";var o=i("4ea4");i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(i("45b6")),n=o(i("44cc")),s={mixins:[o(i("b469")).default],data:function(){return{userid:"",imagePath:"",width:700,template:{},headerImg:"",headerName:"",slitename:"",slitelogo:"",sliteback:"",themnumber:"",contdata:"",introd:"",themwidth:180,renamewidth:400,openSettingBtnHidden:!0,jurisdiction:!0,leftwidth:253,pages:"/pages/home/index"}},onLoad:function(){var t=this;uni.showLoading({title:this.i18n.t("share.generating"),mask:!0}),"public"===this.forums.set_site.site_mode?this.pages="/pages/home/index":"pay"===this.forums.set_site.site_mode&&(this.pages="/pages/site/index"),this.$nextTick((function(){t.userid=t.usersid,t.slitename=t.forums.set_site.site_name,t.slitelogo=t.forums.set_site.site_header_logo||"".concat(t.$u.host(),"static/logo.png"),t.sliteback=t.forums.set_site.site_background_image,t.themnumber=t.forums.other.count_users,t.contdata=t.forums.other.count_threads,t.introd=t.forums.set_site.site_introduction||t.i18n.t("share.nothing"),t.usertitle()}))},computed:{usersid:function(){return this.$store.getters["session/get"]("userId")},userInfo:function(){return this.$store.getters["jv/get"]("users/".concat(this.userid))}},methods:{usertitle:function(){var t=this,e=this;this.headerName=this.userInfo.username,this.themwidth=28*this.headerName.length+3,this.themwidth>=240&&(this.themwidth=240),this.renamewidth=160+this.themwidth,this.headerImg=this.userInfo.avatarUrl||"".concat(this.$u.host(),"static/images/noavatar.gif"),this.slitelogo&&uni.getImageInfo({src:e.slitelogo,success:function(t){var i=t.width*(88/t.height);e.leftwidth=(700-i)/2}}),setTimeout((function(){t.initData()}),300)},initData:function(){var t={username:this.headerName+this.i18n.t("share.recomment"),userheader:this.headerImg,slitename:this.slitename,slitelogo:this.slitelogo,sliteback:this.sliteback,themnumber:this.themnumber,contdata:this.contdata,introd:this.introd,leftwidth:this.leftwidth,userweixincode:"".concat(this.$u.host(),"api/oauth/wechat/miniprogram/code?path=").concat(this.pages),namewidth:this.themwidth,renamewidth:this.renamewidth,longpressrecog:this.i18n.t("share.longpressrecog"),recomment:this.i18n.t("share.recomment"),siteintroduction:this.i18n.t("share.siteintroduction"),comefrom:this.i18n.t("share.comefrom"),member:this.i18n.t("share.member"),contents:this.i18n.t("share.contents")};this.sliteback?this.template=(new r.default).palette(t):this.template=(new n.default).palette(t)},onImgOK:function(t){this.imagePath=t.detail.path,uni.hideLoading()},imgErr:function(){uni.hideLoading(),uni.showModal({title:this.i18n.t("discuzq.msgbox.title"),content:this.i18n.t("share.buildfailed"),showCancel:!1})},fun:function(){var t=this;uni.getSetting({success:function(e){e.authSetting["scope.writePhotosAlbum"]?t.jurisdiction=e.authSetting["scope.writePhotosAlbum"]:t.jurisdiction=!1}}),this.jurisdiction||uni.openSetting({success:function(e){t.jurisdiction=e.authSetting["scope.writePhotosAlbum"]}}),uni.showModal({title:t.i18n.t("discuzq.msgbox.title"),content:t.i18n.t("share.confirm"),success:function(e){e.confirm&&uni.saveImageToPhotosAlbum({filePath:t.imagePath,success:function(){uni.showToast({title:t.i18n.t("share.successfully"),icon:"none",duration:2e3})},fail:function(e){"saveImageToPhotosAlbum:fail auth deny"===e.errMsg&&(t.jurisdiction=!1),uni.showToast({title:t.i18n.t("share.savefailed"),icon:"none",duration:2e3})}})}})},previewImage:function(){var t=this.imagePath;uni.previewImage({current:t,urls:[t]})}}};e.default=s},c274:function(t,e,i){"use strict";var o=i("86c9");i.n(o).a},e972:function(t,e,i){t.exports=i.p+"static/img/msg-404.e11dc2d7.svg"}}]);