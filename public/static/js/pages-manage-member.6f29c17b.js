(window.webpackJsonp=window.webpackJsonp||[]).push([["pages-manage-member"],{"0ad7":function(e,t,i){"use strict";var s=i("4413");i.n(s).a},"185d":function(e,t,i){e.exports=i.p+"static/img/auth.bac1d347.svg"},"245f":function(e,t,i){"use strict";(function(t){var s=i("4ea4"),r=s(i("6f74")),n=i("b95e"),a=s(i("4c82"));e.exports={mixins:[r.default,a.default],methods:{getForum:function(){var e=this;this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(t){t&&(e.forum=t)}))},jump2PhoneLoginPage:function(){uni.redirectTo({url:"/pages/user/phone-login"})},jump2PhoneLoginRegisterPage:function(){uni.redirectTo({url:"/pages/user/phone-login-register"})},jump2LoginPage:function(){uni.redirectTo({url:"/pages/user/login"})},jump2RegisterPage:function(){uni.redirectTo({url:"/pages/user/register"})},jump2LoginBindPage:function(){uni.redirectTo({url:"/pages/user/login-bind"})},jump2RegisterBindPage:function(){uni.redirectTo({url:"/pages/user/register-bind"})},jump2LoginBindPhonePage:function(){uni.redirectTo({url:"/pages/user/login-bind-phone"})},jump2RegisterBindPhonePage:function(){uni.redirectTo({url:"/pages/user/register-bind-phone"})},jump2findpwdPage:function(){uni.navigateTo({url:"/pages/modify/findpwd?pas=reset_pwd"})},mpLoginMode:function(){this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&this.jump2LoginPage(),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),uni.setStorageSync("isSend",!0),this.$store.getters["session/get"]("auth").open())},h5LoginMode:function(){a.default.isWeixin().isWeixin?(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(uni.setStorageSync("register",1),this.$store.dispatch("session/wxh5Login"))):(this.forums&&this.forums.set_reg&&0===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}),this.forums&&this.forums.set_reg&&1===this.forums.set_reg.register_type&&this.jump2PhoneLoginRegisterPage(),this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&uni.navigateTo({url:"/pages/user/login"}))},refreshmpParams:function(){var e=this;uni.login({success:function(i){if("login:ok"===i.errMsg){var s=i.code;uni.getUserInfo({success:function(t){var i={data:{attributes:{js_code:s,iv:t.iv,encryptedData:t.encryptedData}}};e.$store.dispatch("session/setParams",i)},fail:function(e){t.log(e)}})}},fail:function(e){t.log(e)}})},mpLogin:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;uni.setStorageSync("register",e),uni.setStorageSync("isSend",!0),uni.setStorageSync("isBind",!1),this.$store.getters["session/get"]("auth").open()},wxh5Login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;uni.setStorageSync("register",e),uni.setStorageSync("rebind",t),this.$store.dispatch("session/wxh5Login")},getLoginParams:function(e,t){var i=e;if(""===e.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===e.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{var s=uni.getStorageSync("token");""!==s&&(i.data.attributes.token=s),this.login(i,t)}},getLoginBindParams:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.refreshmpParams();var s=e;if(""===e.data.attributes.username)uni.showToast({icon:"none",title:this.i18n.t("user.usernameEmpty"),duration:2e3});else if(""===e.data.attributes.password)uni.showToast({icon:"none",title:this.i18n.t("user.passwordEmpty"),duration:2e3});else{1===i&&(s.data.attributes.rebind=1);var r=uni.getStorageSync("token");""!==r&&(s.data.attributes.token=r),this.login(s,t)}},login:function(e,i){var s=this;this.$store.dispatch("session/h5Login",e).then((function(e){if(e&&e.data&&e.data.data&&e.data.data.id&&(s.logind(),s.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]).then((function(e){e&&e.set_site&&e.set_site.site_mode!==n.SITE_PAY&&uni.getStorage({key:"page",success:function(e){t.log("resData",e),uni.redirectTo({url:e.data})}}),e&&e.set_site&&e.set_site.site_mode===n.SITE_PAY&&s.user&&!s.user.paid&&uni.redirectTo({url:"/pages/site/info"})})),uni.showToast({title:i,duration:2e3})),e&&e.data&&e.data.errors){if("401"===e.data.errors[0].status||"402"===e.data.errors[0].status||"500"===e.data.errors[0].status){var r=s.i18n.t("core.".concat(e.data.errors[0].code));uni.showToast({icon:"none",title:r,duration:2e3})}if("403"===e.data.errors[0].status||"422"===e.data.errors[0].status){var a=s.i18n.t(e.data.errors[0].detail[0]);uni.showToast({icon:"none",title:a,duration:2e3})}}})).catch((function(e){return t.log(e)}))}}}}).call(this,i("5a52").default)},"35ab":function(e,t,i){"use strict";i("d3b7"),i("25f0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){for(var t=0,i=0;i<e.length;i++)t+=e.charCodeAt(i);var s=function(e,t,i){var s,r,n,a=Math.floor(6*e),o=6*e-a,u=i*(1-t),c=i*(1-o*t),h=i*(1-(1-o)*t);switch(a%6){case 0:s=i,r=h,n=u;break;case 1:s=c,r=i,n=u;break;case 2:s=u,r=i,n=h;break;case 3:s=u,r=c,n=i;break;case 4:s=h,r=u,n=i;break;case 5:s=i,r=u,n=c}return{r:Math.floor(255*s),g:Math.floor(255*r),b:Math.floor(255*n)}}(t%360/360,.3,.9);return""+s.r.toString(16)+s.g.toString(16)+s.b.toString(16)}},"368d":function(e,t,i){e.exports=i.p+"static/img/msg-warning.0c78a551.svg"},4413:function(e,t,i){var s=i("f9af");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,i("4f06").default)("8d2626d0",s,!0,{sourceMap:!1,shadowMode:!1})},"48b7":function(e,t,i){"use strict";(function(e){var s;i.d(t,"b",(function(){return r})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return s}));try{s={quiPage:i("29c4").default,quiIcon:i("895d").default,quiAvatarCell:i("1d60").default,quiLoadMore:i("51e5").default,quiButton:i("8397").default,uniPopup:i("1c89").default}}catch(t){if(-1===t.message.indexOf("Cannot find module")||-1===t.message.indexOf(".vue"))throw t;e.error(t.message),e.error("1. 排查组件名称拼写是否正确"),e.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),e.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("qui-page",{staticClass:"member-box",attrs:{"data-qui-theme":e.theme}},[i("v-uni-view",{staticClass:"member-box-search"},[i("v-uni-view",{staticClass:"search"},[i("v-uni-view",{staticClass:"search-box"},[i("v-uni-view",{staticClass:"search-box__content"},[i("v-uni-view",{staticClass:"icon-content-search"},[i("qui-icon",{attrs:{name:"icon-search",size:"30",color:"#bbb"}})],1),i("v-uni-input",{staticClass:"search-box__content-input",attrs:{type:"text","placeholder-class":"input-placeholder",placeholder:e.i18n.t("manage.searchMembers"),value:e.searchText},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.searchInput.apply(void 0,arguments)}}}),e.searchText?i("v-uni-view",{staticClass:"search-box__content-delete",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancelSearch.apply(void 0,arguments)}}},[i("qui-icon",{attrs:{name:"icon-close1",size:"32",color:"#ccc"}})],1):e._e()],1),e.searchText?i("v-uni-view",{staticClass:"search-box__cancel",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancelSearch.apply(void 0,arguments)}}},[i("v-uni-text",[e._v(e._s(e.i18n.t("search.cancel")))])],1):e._e()],1)],1)],1),i("v-uni-view",{staticClass:"member-box__list"},[i("v-uni-scroll-view",{staticClass:"h5-scroll",attrs:{"scroll-y":"true","scroll-with-animation":"true"},on:{scrolltolower:function(t){arguments[0]=t=e.$handleEvent(t),e.pullDown.apply(void 0,arguments)}}},[i("v-uni-checkbox-group",{on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.changeCheck.apply(void 0,arguments)}}},e._l(e.userListShow,(function(t){return i("v-uni-label",{key:t.id},[i("qui-avatar-cell",{attrs:{center:!0,"right-color":"#aaa",mark:t.id,title:t.username,label:e.handleGroups(t),value:1==t.status?e.i18n.t("manage.disable"):e.i18n.t("manage.normal"),icon:t.avatarUrl,"is-real":t.isReal}},[i("v-uni-checkbox",{attrs:{slot:"rightIcon",value:JSON.stringify(t),disabled:t.id===e.currentLoginId,checked:e.checkAvatar.findIndex((function(e){return e.id===t.id}))>-1},slot:"rightIcon"})],1)],1)})),1),i("qui-load-more",{attrs:{status:e.loadingTypeShow}})],1)],1),i("v-uni-view",{staticClass:"member-box__ft"},[i("qui-button",{attrs:{size:"large",type:Boolean(e.checkAvatar.length<1)?"default":"primary",disabled:Boolean(e.checkAvatar.length<1)},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.getCheckMember.apply(void 0,arguments)}}},[e._v(e._s(e.checkAvatar.length<1?e.i18n.t("manage.notSelected"):e.i18n.t("manage.selected")+"（"+e.checkAvatar.length+"）"))])],1),i("uni-popup",{ref:"popup",attrs:{type:"bottom"}},[i("v-uni-scroll-view",{staticStyle:{"max-height":"968rpx"},attrs:{"scroll-y":!0}},[i("v-uni-view",{staticClass:"popup-wrap"},[i("v-uni-view",{staticClass:"popup-wrap-con"},[e._l(e.groupList,(function(t){return i("v-uni-view",{key:t._jv.id,on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.modifyGroupName(t)}}},[i("v-uni-view",{staticClass:"popup-wrap-con-text"},[e._v(e._s(t.name))]),i("v-uni-view",{staticClass:"popup-wrap-con-line"})],1)})),e.forums.other&&e.forums.other.can_edit_user_status?i("v-uni-view",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.modifyGroupName({},1)}}},[i("v-uni-view",{staticClass:"popup-wrap-con-text"},[e._v(e._s(e.i18n.t("manage.disable")))]),i("v-uni-view",{staticClass:"popup-wrap-con-line"})],1):e._e(),e.forums.other&&e.forums.other.can_edit_user_status?i("v-uni-view",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.modifyGroupName({},2)}}},[i("v-uni-view",{staticClass:"popup-wrap-con-text"},[e._v(e._s(e.i18n.t("manage.clearDisable")))]),i("v-uni-view",{staticClass:"popup-wrap-con-line"})],1):e._e()],2),i("v-uni-view",{staticClass:"popup-wrap-space"}),i("v-uni-text",{staticClass:"popup-wrap-btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancel.apply(void 0,arguments)}}},[e._v(e._s(e.i18n.t("home.cancel")))])],1)],1)],1)],1)},n=[]}).call(this,i("5a52").default)},"6f74":function(e,t,i){"use strict";var s=i("b95e");e.exports={computed:{user:function(){var e=this.$store.getters["session/get"]("userId");return e?this.$store.getters["jv/get"]("users/".concat(e)):{}}},methods:{getUserInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=(new Date).getTime(),i=uni.getStorageSync(s.STORGE_GET_USER_TIME);if(e||(t-i)/1e3>60){var r={include:"groups,wechat"},n=this.$store.getters["session/get"]("userId");this.$store.commit("jv/deleteRecord",{_jv:{type:"users",id:n}}),this.$store.dispatch("jv/get",["users/".concat(n),{params:r}]).then((function(){return uni.$emit("updateNotiNum")})),uni.setStorageSync(s.STORGE_GET_USER_TIME,(new Date).getTime())}},logind:function(){var e=this,t=this.$store.getters["session/get"]("userId");if(t){this.$store.dispatch("jv/get",["forum",{params:{include:"users"}}]);this.$store.dispatch("jv/get",["users/".concat(t),{params:{include:"groups,wechat"}}]).then((function(t){e.$u.event.$emit("logind",t)})),this.$store.dispatch("forum/setError",{loading:!1})}}}}},"88a3":function(e,t,i){"use strict";var s=i("48b7");i.d(t,"a",(function(){return s.a})),i.d(t,"b",(function(){return s.b})),i.d(t,"c",(function(){return s.c}))},9084:function(e,t,i){"use strict";i.r(t);var s=i("cfed"),r=i.n(s);for(var n in s)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(n);t.default=r.a},b469:function(e,t){e.exports={computed:{forums:function(){return this.$store.getters["jv/get"]("forums/1")}}}},c111:function(e,t,i){"use strict";i.r(t);var s=i("88a3"),r=i("9084");for(var n in r)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return r[e]}))}(n);i("0ad7");var a=i("f0c5"),o=Object(a.a)(r.default,s.b,s.c,!1,null,"38095b76",null,!1,s.a,void 0);t.default=o.exports},cfed:function(e,t,i){"use strict";var s=i("4ea4");i("99af"),i("4de4"),i("4160"),i("a434"),i("e25e"),i("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=s(i("2909")),n=s(i("b047")),a={mixins:[s(i("b469")).default],data:function(){return{searchText:"",loadingType:"more",searchLoadingType:"more",pageSize:20,pageNum:1,searchPageNum:1,userList:[],searchUserList:[],isSearch:!1,groupList:[],checkAvatar:[]}},onLoad:function(){this.searchUser(),this.getGroupList(),uni.setNavigationBarTitle({title:this.i18n.t("manage.manageMembers")})},computed:{currentLoginId:function(){var e=this.$store.getters["session/get"]("userId");return parseInt(e,10)},userListShow:function(){return this.isSearch?this.searchUserList:this.userList},loadingTypeShow:function(){return this.isSearch?this.searchLoadingType:this.loadingType}},methods:{searchInput:(0,n.default)((function(e){e&&e.target&&(this.isSearch=!0,this.searchPageNum=1,this.searchUserList=[],this.searchUser(e.target.value))}),800),cancelSearch:function(){this.isSearch=!1,this.searchText=""},handleGroups:function(e){var t=[];return e.groups&&e.groups.length>0&&(t=e.groups.filter((function(e){return e.isDisplay}))),t.length>0?t[0].name:""},getGroupList:function(){var e=this;this.groupList=[],this.forums.other&&!this.forums.other.can_edit_user_group||this.$store.dispatch("jv/get","groups").then((function(t){if(t._jv){delete t._jv;for(var i=0;i<t.length;i+=1)(1===e.currentLoginId&&"1"===t[i]._jv.id||"1"!==t[i]._jv.id&&"7"!==t[i]._jv.id)&&e.groupList.push(t[i])}}))},searchUser:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.searchText=t;var i={include:"groups","page[number]":this.pageNum,"page[limit]":this.pageSize,"filter[username]":"*".concat(this.searchText,"*")};""===this.searchText?this.$store.dispatch("jv/get",["users",{params:i}]).then((function(t){t&&t._jv&&(delete t._jv,e.isSearch?e.searchUserList=[].concat((0,r.default)(e.searchUserList),(0,r.default)(t)):e.userList=[].concat((0,r.default)(e.userList),(0,r.default)(t)),e.loadingType=t.length===e.pageSize?"more":"nomore")})):(i["page[number]"]=this.searchPageNum,this.$store.dispatch("jv/get",["users",{params:i}]).then((function(t){t&&t._jv&&(delete t._jv,e.searchUserList=[].concat((0,r.default)(e.searchUserList),(0,r.default)(t)),e.searchLoadingType=t.length===e.pageSize?"more":"nomore")})))},pullDown:function(){"more"===this.loadingTypeShow&&(this.isSearch?this.searchPageNum+=1:this.pageNum+=1,this.searchUser(this.searchText))},modifyGroupName:function(e,t){var i=this,s=[];if(this.checkAvatar&&this.checkAvatar.length>0)for(var r=0;r<this.checkAvatar.length;r+=1)t?s.push({attributes:{id:this.checkAvatar[r].id,status:1===t?1:0}}):s.push({attributes:{id:this.checkAvatar[r].id,groupId:parseInt(e._jv.id,10)}});var n=[{_jv:{type:"users"}},{data:{data:s}}];this.$store.dispatch("jv/patch",n).then((function(e){e&&(i.getGroupList(),i.pageNum=1,i.getList(),i.$refs.popup.close())}))},getList:function(){var e=this;this.searchText="",this.isSearch=!1;var t={include:"groups","page[number]":this.pageNum,"page[limit]":this.pageSize,"filter[username]":"*".concat(this.searchText,"*")};this.$store.dispatch("jv/get",["users",{params:t}]).then((function(t){t&&t._jv&&(delete t._jv,e.userList=t,e.checkAvatar.splice(0,e.checkAvatar.length),e.loadingType=t.length===e.pageSize?"more":"nomore")}))},changeCheck:function(e){var t=this;this.checkAvatar=[],e.detail.value.forEach((function(e){t.checkAvatar.push(JSON.parse(e))}))},getCheckMember:function(){this.$refs.popup.open()},cancel:function(){this.$refs.popup.close()}}};t.default=a},e972:function(e,t,i){e.exports=i.p+"static/img/msg-404.e11dc2d7.svg"},f9af:function(e,t,i){(t=i("24fb")(!1)).push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* eg:\n  .container {\n    color: --color(BG-1);\n  }\n*/.member-box-search .search[data-v-38095b76]{position:fixed;top:%?0?%;z-index:99;width:100%;margin-top:44px}.member-box-search .search-box[data-v-38095b76]{background-color:var(--qui-BG-2)}.member-box[data-v-38095b76]{width:100%}.member-box__list .h5-scroll[data-v-38095b76]{position:fixed;top:%?210?%;right:%?0?%;bottom:%?160?%;left:%?0?%;width:100%;background-color:var(--qui-BG-2)}.member-box__list .h5-scroll .loading-text[data-v-38095b76]{height:%?100?%;font-size:%?28?%;line-height:%?100?%;text-align:center}.member-box__list .wx-scroll[data-v-38095b76]{position:fixed;top:%?120?%;right:%?0?%;bottom:%?160?%;left:%?0?%;width:100%;background-color:var(--qui-BG-2)}.member-box__list .wx-scroll .loading-text[data-v-38095b76]{height:%?100?%;font-size:%?28?%;line-height:%?100?%;text-align:center}.member-box__ft[data-v-38095b76]{position:fixed;bottom:0;width:100%;padding:%?40?%;background-color:var(--qui-BG-2);box-sizing:border-box}.popup-wrap[data-v-38095b76]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;background:var(--qui-BG-2);border-radius:%?10?% %?10?% %?0?% %?0?%}.popup-wrap-con[data-v-38095b76]{border-radius:%?10?% %?10?% %?0?% %?0?%}.popup-wrap-con-text[data-v-38095b76]{width:100%;height:%?100?%;font-size:%?36?%;line-height:%?100?%;text-align:center}.popup-wrap-con-line[data-v-38095b76]{border:%?2?% solid var(--qui-BG-ED)}.popup-wrap-space[data-v-38095b76]{border:%?8?% solid var(--qui-BG-ED)}.popup-wrap-btn[data-v-38095b76]{width:100%;height:%?100?%;font-size:%?30?%;line-height:%?100?%;text-align:center}',""]),e.exports=t}}]);