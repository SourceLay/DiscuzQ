(window.webpackJsonp=window.webpackJsonp||[]).push([[8,9,14,17,18],{19:function(e,r,t){"use strict";t.d(r,"b",(function(){return n})),t.d(r,"c",(function(){return o})),t.d(r,"a",(function(){return c}));t(284),t(27);var n=function(time){var e=new Date-new Date(time);return parseInt(parseInt(e/1e3,0)/60,0)<60?"".concat(Math.ceil(e/1e3/60)>0?Math.ceil(e/1e3/60):1,"分钟前"):parseInt(parseInt(parseInt(e/1e3,0)/60,0)/60,0)<16?"".concat(Math.ceil(e/1e3/60/60)>0?Math.ceil(e/1e3/60/60):1,"小时前"):time.replace(/T/," ").replace(/Z/,"").substring(0,16)},o=function(e){var r=e-Math.round(new Date/1e3);return parseInt(r/86400,0)},c=function(e){var r=Math.round(new Date(e)/1e3),t=Math.round(new Date/1e3)-r,n=parseInt(t/86400,0);return n>365?parseInt(t/86400/365,0)+"年":n+"天"}},2:function(e,r,t){t(17);var n=t(752);t(27),e.exports={data:function(){var e=this;return{errorCodeHandler:{default:{model_not_found:function(){return e.$router.replace("/error")},not_authenticated:function(){return e.$router.push("/pages/user/login")}},thread:{permission_denied:function(){return e.$router.replace("/error")}}}}},methods:{handleError:function(e){var r=arguments,t=this;return n(regeneratorRuntime.mark((function n(){var o,c,d,l,f;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(o=r.length>1&&void 0!==r[1]?r[1]:"",!((c=e.response.data.errors)&&Array.isArray(c)&&c.length>0&&c[0])){n.next=13;break}if(d=c[0].code,l=c[0].detail&&c[0].detail.length>0?c[0].detail[0]:c[0].code,f=c[0].detail&&c[0].detail.length>0?c[0].detail[0]:t.$t("core.".concat(l)),"site_closed"!==c[0].code){n.next=10;break}return n.next=9,t.siteClose(c);case 9:return n.abrupt("return",n.sent);case 10:t.$message.error(f),t.errorCodeHandler.default[d]&&t.errorCodeHandler.default[d](),o&&t.errorCodeHandler[o][d]&&t.errorCodeHandler[o][d]();case 13:case"end":return n.stop()}}),n)})))()},siteClose:function(e){var r=this;return n(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.$store.dispatch("forum/setError",{code:e[0].code,detail:e[0].detail&&e[0].detail.length>0&&e[0].detail[0]});case 3:return t.next=5,r.$router.push("/pages/site/close");case 5:t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})))()}}}}}]);