(window.webpackJsonp=window.webpackJsonp||[]).push([[31,12,16,30,32,35,36,37,38],{1:function(e,t,r){r(16);var n=r(835);r(28),e.exports={data:function(){var e=this;return{errorCodeHandler:{default:{model_not_found:function(){return e.$router.replace("/error")},not_authenticated:function(){return e.$router.push("/user/login")}},thread:{permission_denied:function(){return e.$router.replace("/error")}}}}},methods:{handleError:function(e){var t=arguments,r=this;return n(regeneratorRuntime.mark((function n(){var o,d,c,l,f;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(o=t.length>1&&void 0!==t[1]?t[1]:"",d=e.response.data.errors,!(Array.isArray(d)&&d.length>0)){n.next=13;break}if(c=d[0].code,l=d[0].detail&&d[0].detail.length>0?d[0].detail[0]:d[0].code,f=d[0].detail&&d[0].detail.length>0?d[0].detail[0]:r.$t("core.".concat(l)),"site_closed"!==d[0].code){n.next=10;break}return n.next=9,r.siteClose(d);case 9:return n.abrupt("return",n.sent);case 10:r.$message.error(f),r.errorCodeHandler.default[c]&&r.errorCodeHandler.default[c](),o&&r.errorCodeHandler[o][c]&&r.errorCodeHandler[o][c]();case 13:case"end":return n.stop()}}),n)})))()},siteClose:function(e){var t=this;return n(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.$store.dispatch("forum/setError",{code:e[0].code,detail:e[0].detail&&e[0].detail.length>0&&e[0].detail[0]});case 3:return r.next=5,t.$router.push("/site/close");case 5:r.next=9;break;case 7:r.prev=7,r.t0=r.catch(0);case 9:case"end":return r.stop()}}),r,null,[[0,7]])})))()}}}},10:function(e,t){e.exports={data:function(){return{title:"‎"}},computed:{forums:function(){return this.$store.state.site.info.attributes||{}}},head:function(){return{title:"‎"!==this.title&&this.forums&&this.forums.set_site&&this.forums.set_site.site_name?this.title+" - "+this.forums.set_site.site_name:this.title}}}}}]);