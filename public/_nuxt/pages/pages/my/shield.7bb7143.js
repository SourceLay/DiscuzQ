(window.webpackJsonp=window.webpackJsonp||[]).push([[14,17],{2:function(e,r,t){t(17);var n=t(752);t(27),e.exports={data:function(){var e=this;return{errorCodeHandler:{default:{model_not_found:function(){return e.$router.replace("/error")},not_authenticated:function(){return e.$router.push("/pages/user/login")}},thread:{permission_denied:function(){return e.$router.replace("/error")}}}}},methods:{handleError:function(e){var r=arguments,t=this;return n(regeneratorRuntime.mark((function n(){var o,d,c,l,f;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(o=r.length>1&&void 0!==r[1]?r[1]:"",!((d=e.response.data.errors)&&Array.isArray(d)&&d.length>0&&d[0])){n.next=13;break}if(c=d[0].code,l=d[0].detail&&d[0].detail.length>0?d[0].detail[0]:d[0].code,f=d[0].detail&&d[0].detail.length>0?d[0].detail[0]:t.$t("core.".concat(l)),"site_closed"!==d[0].code){n.next=10;break}return n.next=9,t.siteClose(d);case 9:return n.abrupt("return",n.sent);case 10:t.$message.error(f),t.errorCodeHandler.default[c]&&t.errorCodeHandler.default[c](),o&&t.errorCodeHandler[o][c]&&t.errorCodeHandler[o][c]();case 13:case"end":return n.stop()}}),n)})))()},siteClose:function(e){var r=this;return n(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.$store.dispatch("forum/setError",{code:e[0].code,detail:e[0].detail&&e[0].detail.length>0&&e[0].detail[0]});case 3:return t.next=5,r.$router.push("/pages/site/close");case 5:t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})))()}}}}}]);