(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{Gj3Q:function(t,e,s){"use strict";s.r(e);var a=s("Nky3"),n=s("cn2k");for(var r in n)["default"].indexOf(r)<0&&function(t){s.d(e,t,(function(){return n[t]}))}(r);var i=s("KHd+"),o=Object(i.a)(n.default,a.a,a.b,!1,null,null,null);e.default=o.exports},Nky3:function(t,e,s){"use strict";s.d(e,"a",(function(){return a})),s.d(e,"b",(function(){return n}));var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home-box"},[s("Card",{staticClass:"home-card-box",staticStyle:{border:"0",padding:"0"},attrs:{id:"other_content_header",intercept:"true"}}),t._v(" "),s("Card",{staticClass:"home-card-box",attrs:{header:"待处理事项",intercept:"true"}},[s("p",{staticClass:"pending-p"},[t._v("\n      等待审核的主题数\n      "),s("router-link",{staticStyle:{color:"#336699"},attrs:{to:"/admin/cont-review"}},[t._v("( "+t._s(t.siteInfo.unapprovedThreads)+" )")])],1),t._v(" "),s("p",{staticClass:"pending-p"},[t._v("\n      等待审核的回复数\n      "),s("router-link",{staticStyle:{color:"#336699"},attrs:{to:"/admin/reply-review"}},[t._v("( "+t._s(t.siteInfo.unapprovedPosts)+" )")])],1),t._v(" "),s("p",{staticClass:"pending-p"},[t._v("\n      等待审核的提现数\n      "),s("router-link",{staticStyle:{color:"#336699"},attrs:{to:"/admin/withdrawal-application"}},[t._v("( "+t._s(t.siteInfo.unapprovedMoneys)+" )")])],1),t._v(" "),s("p",{staticClass:"pending-p"},[t._v("\n      等待审核的用户数\n      "),s("router-link",{staticStyle:{color:"#336699"},attrs:{to:"/admin/user-review"}},[t._v("( "+t._s(t.siteInfo.unapprovedUsers)+" )")])],1)]),t._v(" "),s("Card",{staticClass:"home-card-box",attrs:{header:"系统信息",intercept:"true"}},[s("p",{staticClass:"section"},[s("span",{staticClass:"section-title"},[t._v("Discuz!程序版本：")]),t._v(" "),s("span",[t._v(t._s(t.siteInfo.version))]),t._v(" "),t.newVersion?s("span",{staticClass:"section-title section-title-right"},[s("span",[t._v("[")]),t._v(" "),s("a",{attrs:{href:"https://discuz.com/docs/release_notes.html",target:"_blank"}},[t._v("新版本： "+t._s(t.versionNumber))]),t._v(" "),s("span",[t._v("]")])]):t._e()]),t._v(" "),s("p",{staticClass:"section"},[s("span",{staticClass:"section-title"},[t._v("服务器系统及PHP：")]),t._v(" "),s("span",[t._v(t._s(t.siteInfo.php_version))])]),t._v(" "),s("p",{staticClass:"section"},[s("span",{staticClass:"section-title"},[t._v("服务器软件：")]),t._v(" "),s("span",[t._v(t._s(t.siteInfo.server_software))])]),t._v(" "),s("p",{staticClass:"section"},[s("span",{staticClass:"section-title"},[t._v("服务器MySQL版本：")]),t._v(" "),s("span",[t._v(t._s(t.siteInfo.db))])]),t._v(" "),s("p",{staticClass:"section"},[s("span",{staticClass:"section-title"},[t._v("上传许可：")]),t._v(" "),s("span",[t._v(t._s(t.siteInfo.upload_size))])]),t._v(" "),s("p",{staticClass:"section"},[s("span",{staticClass:"section-title"},[t._v("当前数据库尺寸：")]),t._v(" "),s("span",[t._v(t._s(t.siteInfo.db_size))])])]),t._v(" "),s("Card",{staticClass:"home-card-box home-card__footer",attrs:{id:"other_content_footer",header:"相关链接"}},[s("a",{attrs:{href:"https://discuz.chat/manual-admin/",target:"_blank"}},[t._v("使用手册")]),t._v(" "),s("a",{attrs:{href:"https://www.discuz.com",target:"_blank"}},[t._v("Discuz! Q 官方")]),t._v(" "),s("a",{attrs:{href:"https://www.discuz.chat",target:"_blank"}},[t._v("支持论坛")]),t._v(" "),s("a",{attrs:{href:"https://cloud.tencent.com/",target:"_blank"}},[t._v("腾讯云")]),t._v(" "),s("a",{attrs:{href:"http://www.dnspod.cn/",target:"_blank"}},[t._v("DNSPod")]),t._v(" "),s("a",{attrs:{href:"https://da.do/hmos",target:"_blank"}},[t._v("免费SSL证书")])])],1)},n=[]},c1W9:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(s("4gYi"));n(s("vDqi"));function n(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{siteInfo:{},newVersion:!1,versionNumber:"",oldVersion:""}},created:function(){var t=this;this.appFetch({url:"siteinfo",method:"get",data:{}}).then((function(e){e.errors?t.$message.error(e.errors[0].code):(t.siteInfo=e.data.attributes,t.oldVersion=e.data.attributes.version,t.compareSize())}))},methods:{compareSize:function(){this.versionNumber=dzq_latest_ver();var t=this.versionNumber.replace(/[^\d]/g,""),e=this.oldVersion.replace(/[^\d]/g,"");this.newVersion=t>e}},components:{Card:a.default}}},cn2k:function(t,e,s){"use strict";s.r(e);var a=s("rTpx"),n=s.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){s.d(e,t,(function(){return a[t]}))}(r);e.default=n.a},rTpx:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(s("QbLZ"));s("lpfh");var n=r(s("c1W9"));function r(t){return t&&t.__esModule?t:{default:t}}e.default=(0,a.default)({name:"home-view"},n.default)}}]);