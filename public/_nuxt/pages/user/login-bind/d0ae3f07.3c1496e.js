(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{524:function(e,t,r){r(32);var n=r(507);r(51),e.exports={data:function(){var e=this;return{errorCodeHandler:{default:{model_not_found:function(){return e.$router.replace("/error")},not_authenticated:function(){return e.$router.push("/user/login")}},thread:{permission_denied:function(){return e.$router.replace("/error")}}}}},methods:{handleError:function(e){var t=arguments,r=this;return n(regeneratorRuntime.mark((function n(){var o,c,d,l,h;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(o=t.length>1&&void 0!==t[1]?t[1]:"",c=e.response.data.errors,!(Array.isArray(c)&&c.length>0)){n.next=13;break}if(d=c[0].code,l=c[0].detail&&c[0].detail.length>0?c[0].detail[0]:c[0].code,h=c[0].detail&&c[0].detail.length>0?c[0].detail[0]:r.$t("core.".concat(l)),"site_closed"!==c[0].code){n.next=10;break}return n.next=9,r.siteClose(c);case 9:return n.abrupt("return",n.sent);case 10:r.$message.error(h),r.errorCodeHandler.default[d]&&r.errorCodeHandler.default[d](),o&&r.errorCodeHandler[o][d]&&r.errorCodeHandler[o][d]();case 13:case"end":return n.stop()}}),n)})))()},siteClose:function(e){var t=this;return n(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$store.dispatch("forum/setError",{code:e[0].code,detail:e[0].detail&&e[0].detail.length>0&&e[0].detail[0]});case 3:return r.next=5,t.$router.push("/site/close");case 5:r.next=9;break;case 7:r.prev=7,r.t0=r.catch(0);case 9:case"end":return r.stop()}}),r,null,[[0,7]])})))()}}}},525:function(e,t){e.exports={data:function(){return{title:"‎"}},computed:{forums:function(){return this.$store.state.site.info.attributes||{}}},head:function(){return{title:"‎"!==this.title&&this.forums&&this.forums.set_site&&this.forums.set_site.site_name?this.title+" - "+this.forums.set_site.site_name:this.title}}}},718:function(e,t,r){},868:function(e,t,r){"use strict";var n=r(718);r.n(n).a},952:function(e,t,r){"use strict";r.r(t);var head=r(525),n=r.n(head),o=r(524),c=r.n(o),d=r(173),l=r.n(d),h={name:"LoginBind",mixins:[n.a,c.a,l.a],data:function(){return{title:this.$t("user.login"),userName:"",passWord:"",checked:!0,activeName:"0",site_mode:"",isPaid:!1,code:"",loading:!1,canReg:!1,ischeck:!0,nickname:"",headimgurl:"",token:"",preurl:"/"}},computed:{forums:function(){return this.$store.state.site.info.attributes||{}},userInfo:function(){return this.$store.state.user.info.attributes||{}}},mounted:function(){var e=this.$route.query,code=e.code,t=e.nickname,r=e.headimgurl,n=e.preurl;n&&(this.preurl=n),this.token=localStorage.getItem("wechat"),t&&(this.nickname=t),r&&(this.headimgurl=r),"undefined"!==code&&(this.code=code),this.forums&&this.forums.set_site&&this.forums.set_site.site_mode&&(this.site_mode=this.forums.set_site.site_mode),this.forums&&this.forums.set_reg&&this.forums.set_reg.register_close&&(this.canReg=!0)},methods:{check:function(e){this.ischeck=e},UserLogin:function(){var e=this;if(this.loading=!0,""===this.userName)this.$message.error("用户名不能为空"),this.loading=!1;else if(""===this.passWord)this.$message.error("密码不能为空"),this.loading=!1;else{var t={data:{attributes:{username:this.userName,password:this.passWord,token:this.token}}};this.$store.dispatch("session/h5Login",t).then((function(t){if(e.loading=!1,t&&t.data&&t.data.data&&t.data.data.id&&(e.logind(),e.userName="",e.passWord="",e.$message.success("登录成功")),t&&t.data&&t.data.errors&&"register_validate"===t.data.errors[0].code&&e.$router.push("/user/warning?username=".concat(e.userName)),t&&t.data&&t.data.errors&&t.data.errors[0]){var r=t.data.errors[0].detail?t.data.errors[0].detail[0]:t.data.errors[0].code,n=t.data.errors[0].detail?t.data.errors[0].detail[0]:e.$t("core.".concat(r));e.$message.error(n)}})).catch((function(t){e.loading=!1}))}},toRegister:function(){this.$router.push("/user/register-bind?nickname=".concat(this.nickname,"&headimgurl=").concat(this.headimgurl,"&preurl=").concat(this.preurl))},iscanReg:function(){return[this.canReg?"":"noreg"]}}},m=(r(868),r(13)),component=Object(m.a)(h,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.forums?r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"register"},[r("el-tabs",{staticClass:"register-select",attrs:{type:"border-card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:e.$t("user.loginBindWechat"),name:"0"}},[r("form",[r("div",{staticClass:"bindtext"},[r("div",[e._v(e._s(e.$t("user.dear"))+"\n            "),r("avatar",{staticStyle:{display:"inline-block","vertical-align":"text-top"},attrs:{user:{username:e.nickname,avatarUrl:e.headimgurl},size:20,round:!0}}),e._v(" "),r("b",[e._v(e._s(e.nickname||""))]),e._v(" "+e._s(e.$t("user.user")))],1),e._v(" "),r("div",[e._v(e._s(e.$t("user.changeWechat")))])]),e._v(" "),r("span",{staticClass:"title"},[e._v(e._s(e.$t("user.usrname")))]),e._v(" "),r("el-input",{staticClass:"reg-input",attrs:{placeholder:e.$t("user.username")},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}}),e._v(" "),r("span",{staticClass:"title2"},[e._v(e._s(e.$t("user.pwd")))]),e._v(" "),r("el-input",{staticClass:"reg-input",attrs:{placeholder:e.$t("user.password"),type:"password","show-password":""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.UserLogin(t)}},model:{value:e.passWord,callback:function(t){e.passWord=t},expression:"passWord"}}),e._v(" "),r("div",{staticClass:"agreement"},[r("el-checkbox",{model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}}),e._v(" "),r("span",{staticClass:"agree"},[e._v(e._s(e.$t("user.status"))+" ")])],1),e._v(" "),r("el-button",{staticClass:"r-button",attrs:{type:"primary"},on:{click:e.UserLogin}},[e._v(e._s(e.$t("user.loginbind")))]),e._v(" "),r("div",{staticClass:"logorreg"},[e.canReg?r("span",[e._v("\n            "+e._s(e.$t("user.noexist"))+"\n            "),r("span",{staticClass:"agreement_text",on:{click:e.toRegister}},[e._v(" "+e._s(e.$t("user.registerbind")))])]):e._e()])],1)])],1)],1):e._e()}),[],!1,null,"17cba0b4",null);t.default=component.exports;installComponents(component,{Avatar:r(257).default})}}]);