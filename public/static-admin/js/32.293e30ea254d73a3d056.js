(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{"57Wb":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r(a("QbLZ"));a("lL+3");var s=r(a("Xz3T"));function r(e){return e&&e.__esModule?e:{default:e}}t.default=(0,i.default)({name:"reply-review-view"},s.default)},FCu8:function(e,t,a){"use strict";a.r(t);var i=a("57Wb"),s=a.n(i);for(var r in i)["default"].indexOf(r)<0&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t.default=s.a},Skey:function(e,t,a){"use strict";a.r(t);var i=a("wIa2"),s=a("FCu8");for(var r in s)["default"].indexOf(r)<0&&function(e){a.d(t,e,(function(){return s[e]}))}(r);var o=a("KHd+"),l=Object(o.a)(s.default,i.a,i.b,!1,null,null,null);t.default=l.exports},Xz3T:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=u(a("4gYi")),s=u(a("Dt3C")),r=u(a("rWG0")),o=u(a("7qpD")),l=u(a("VVfg")),n=u(a("CKnL")),c=u(a("6NK7"));function u(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{searchUserName:"",keyWords:"",showSensitiveWords:!1,pageOptions:[{value:10,label:"每页显示10条"},{value:20,label:"每页显示20条"},{value:30,label:"每页显示30条"}],pageSelect:10,searchReview:[{value:0,label:"未审核"},{value:2,label:"已忽略"}],searchReviewSelect:0,categoriesList:[],categoriesListSelect:"",searchTime:[{value:1,label:"全部"},{value:2,label:"最近一周"},{value:3,label:"最近一个月"},{value:4,label:"最近三个月"}],searchTimeSelect:1,relativeTime:["",""],reasonForOperation:[{value:"无",label:"无"},{value:"广告/SPAM",label:"广告/SPAM"},{value:"恶意灌水",label:"恶意灌水"},{value:"违规内容",label:"违规内容"},{value:"文不对题",label:"文不对题"},{value:"重复发帖",label:"重复发帖"},{value:"我很赞同",label:"我很赞同"},{value:"精品文章",label:"精品文章"},{value:"原创内容",label:"原创内容"},{value:"其他",label:"其他"}],reasonForOperationSelect:1,appleAll:!1,themeList:[],currentPaga:1,total:0,pageCount:1,ignoreStatus:!0,submitForm:[],showViewer:!1,url:[],subLoading:!1,btnLoading:0}},methods:{titleIcon:function(e){return c.default.titleIcon(e)},imgShowClick:function(e,t){var a=this;this.url=[];var i=[];e.forEach((function(e){i.push(e._data.url)})),this.url.push(i[t]),i.forEach((function(e,i){i>t&&a.url.push(e)})),i.forEach((function(e,i){i<t&&a.url.push(e)})),this.showViewer=!0},closeViewer:function(){this.showViewer=!1},handleSelectionChange:function(e){this.multipleSelection=e,this.multipleSelection.length>=1?this.deleteStatus=!1:this.deleteStatus=!0},reasonForOperationChange:function(e,t){this.submitForm[t].attributes.message=e},handleCurrentChange:function(e){document.getElementsByClassName("index-main-con__main")[0].scrollTop=0,l.default.setLItem("currentPag",e),this.currentPaga=e,this.getPostsList(e)},postSearch:function(){this.ignoreStatus=2!==this.searchReviewSelect,this.currentPaga=1,this.getPostsList()},searchTimeChange:function(e){var t=new Date,a=new Date;switch(this.relativeTime=[],e){case 1:this.relativeTime.push("","");break;case 2:a.setTime(a.getTime()-6048e5),this.relativeTime.push(this.formatDate(t),this.formatDate(a));break;case 3:a.setTime(a.getTime()-2592e6),this.relativeTime.push(this.formatDate(t),this.formatDate(a));break;case 4:a.setTime(a.getTime()-7776e6),this.relativeTime.push(this.formatDate(t),this.formatDate(a));break;default:this.$message.error("搜索日期选择错误，请重新选择！或 刷新页面（F5）")}},submitClick:function(){this.subLoading=!0,this.patchPostsBatch(this.submitForm)},radioChange:function(e,t){switch(e){case 0:this.submitForm[t].attributes.isApproved=1;break;case 1:this.submitForm[t].attributes.isDeleted=!0;break;case 2:this.submitForm[t].attributes.isApproved=2}},allOperationsSubmit:function(e){var t=this;switch(this.btnLoading=e,e){case 1:this.submitForm.forEach((function(e,a){t.submitForm[a].attributes.isApproved=1}));break;case 2:this.submitForm.forEach((function(e,a){t.submitForm[a].attributes.isDeleted=!0}));break;case 3:this.submitForm.forEach((function(e,a){t.submitForm[a].attributes.isApproved=2}))}this.patchPostsBatch(this.submitForm)},singleOperationSubmit:function(e,t,a,i){var s={type:"posts",attributes:{}};switch(e){case 1:s.attributes.isApproved=1,s.attributes.message=this.submitForm[i].attributes.message,this.patchPosts(s,a);break;case 2:s.attributes.isDeleted=!0,s.attributes.message=this.submitForm[i].attributes.message,this.patchPosts(s,a);break;case 3:s.attributes.isApproved=2,s.attributes.message=this.submitForm[i].attributes.message,this.patchPosts(s,a)}},viewClick:function(e){var t=this.$router.resolve({path:"/pages/topic/index?id="+e});window.open(t.href,"_blank")},editClick:function(e,t){var a=this.$router.resolve({path:"/reply-to-topic/"+e+"/"+t,query:{edit:"reply"}});window.open(a.href,"_blank")},formatDate:function(e){return this.$dayjs(e).format("YYYY-MM-DD HH:mm")},getPostsList:function(e){var t=this;this.appFetch({url:"posts",method:"get",data:{include:["user","thread","thread.category","thread.firstPost","images"],"filter[isDeleted]":"no","filter[username]":this.searchUserName,"page[number]":e,"page[size]":this.pageSelect,"filter[q]":this.keyWords,"filter[isApproved]":this.searchReviewSelect,"filter[createdAtBegin]":this.relativeTime[1],"filter[createdAtEnd]":this.relativeTime[0],"filter[categoryId]":this.categoriesListSelect,"filter[highlight]":this.showSensitiveWords?"yes":"no",sort:"-updatedAt"}}).then((function(e){e.errors?t.$message.error(e.errors[0].code):(t.themeList=[],t.submitForm=[],t.themeList=e.readdata,t.total=e.meta.postCount,t.pageCount=e.meta.pageCount,t.themeList.forEach((function(e,a){t.submitForm.push({Select:"无",radio:"",type:"posts",id:e._data.id,attributes:{isApproved:0,isDeleted:!1,message:""}})})))})).catch((function(e){}))},getCategories:function(){var e=this;this.appFetch({url:"categories",method:"get",data:{}}).then((function(t){t.errors?e.$message.error(t.errors[0].code):(e.categoriesList=[],t.data.forEach((function(t,a){e.categoriesList.push({name:t.attributes.name,id:t.id})})))})).catch((function(e){}))},patchPostsBatch:function(e){var t=this;this.appFetch({url:"postsBatch",method:"patch",data:{data:e}}).then((function(e){t.subLoading=!1,t.btnLoading=0,e.errors?t.$message.error(e.errors[0].code):e.meta&&e.data?t.$message.error("操作失败！"):(t.getPostsList(Number(l.default.getLItem("currentPag"))||1),t.$message({message:"操作成功",type:"success"}))})).catch((function(e){}))},patchPosts:function(e,t){var a=this;this.appFetch({url:"posts",method:"patch",splice:"/"+t,data:{data:e}}).then((function(e){a.subLoading=!1,a.btnLoading=0,e.errors?a.$message.error(e.errors[0].code):(a.getPostsList(Number(l.default.getLItem("currentPag"))||1),a.$message({message:"操作成功",type:"success"}))})).catch((function(e){}))}},created:function(){this.getCategories(),this.getPostsList(Number(l.default.getLItem("currentPag"))||1)},components:{Card:i.default,ContArrange:s.default,Page:r.default,tableNoList:o.default,ElImageViewer:n.default}}},wIa2:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return s}));var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"reply-review-box"},[a("div",{staticClass:"cont-review-header"},[a("div",{staticClass:"cont-review-header__lf"},[a("div",[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("用户名：")]),e._v(" "),a("el-input",{attrs:{size:"medium",placeholder:"搜索用户名",clearable:""},model:{value:e.searchUserName,callback:function(t){e.searchUserName=t},expression:"searchUserName"}})],1),e._v(" "),a("div",[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("每页显示：")]),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择每页显示"},model:{value:e.pageSelect,callback:function(t){e.pageSelect=t},expression:"pageSelect"}},e._l(e.pageOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]),e._v(" "),a("div",{staticClass:"cont-review-header__rt"},[a("div",[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("内容包含：")]),e._v(" "),a("el-input",{staticClass:"content-contains-input",attrs:{size:"medium",clearable:"",placeholder:"搜索关键词"},model:{value:e.keyWords,callback:function(t){e.keyWords=t},expression:"keyWords"}}),e._v(" "),a("el-checkbox",{model:{value:e.showSensitiveWords,callback:function(t){e.showSensitiveWords=t},expression:"showSensitiveWords"}},[e._v("显示敏感词")])],1),e._v(" "),a("div",{staticClass:"cont-review-header__rt-search"},[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("搜索范围：")]),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择审核状态"},model:{value:e.searchReviewSelect,callback:function(t){e.searchReviewSelect=t},expression:"searchReviewSelect"}},e._l(e.searchReview,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),e._v(" "),a("el-select",{attrs:{size:"medium",clearable:"",placeholder:"选择搜索分类"},model:{value:e.categoriesListSelect,callback:function(t){e.categoriesListSelect=t},expression:"categoriesListSelect"}},e._l(e.categoriesList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择搜索时间"},on:{change:e.searchTimeChange},model:{value:e.searchTimeSelect,callback:function(t){e.searchTimeSelect=t},expression:"searchTimeSelect"}},e._l(e.searchTime,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.postSearch}},[e._v("搜索")])],1)])]),e._v(" "),a("div",{staticClass:"cont-review-table"},[e._l(e.themeList,(function(t,i){return a("ContArrange",{key:t._data.id,attrs:{replyBy:t.user?t.user._data.username:"该用户被删除",themeName:t.thread._data.isLongArticle?t.thread._data.title:t.thread.firstPost._data.content,titleIcon:e.titleIcon(t.thread._data),finalPost:e.formatDate(t._data.updatedAt),ip:t._data.ip,userId:t.user?t.user._data.id:"该用户被删除"}},[a("div",{staticClass:"cont-review-table__side",attrs:{slot:"side"},slot:"side"},[a("el-radio-group",{on:{change:function(t){return e.radioChange(t,i)}},model:{value:e.submitForm[i].radio,callback:function(t){e.$set(e.submitForm[i],"radio",t)},expression:"submitForm[index].radio"}},[a("el-radio",{attrs:{label:0}},[e._v("通过")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("删除")]),e._v(" "),2!==t._data.isApproved?a("el-radio",{attrs:{label:2,disabled:2===t._data.isApproved}},[e._v("忽略")]):e._e()],1)],1),e._v(" "),a("div",{staticClass:"cont-review-table__main",attrs:{slot:"main"},slot:"main"},[a("a",{staticClass:"cont-review-table__main__cont-text",attrs:{href:"/pages/topic/index?id="+t.thread._data.id,target:"_blank"},domProps:{innerHTML:e._s(t._data.contentHtml)}}),e._v(" "),a("div",{staticClass:"cont-review-table__main__cont-imgs"},e._l(t.images,(function(i,s){return a("p",{key:s,staticClass:"cont-review-table__main__cont-imgs-p"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i._data.thumbUrl,expression:"item._data.thumbUrl"}],attrs:{alt:i._data.fileName},on:{click:function(a){return e.imgShowClick(t.images,s)}}})])})),0)]),e._v(" "),a("div",{staticClass:"cont-review-table__footer",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"cont-review-table__footer__lf"},[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.singleOperationSubmit(1,t.thread.category._data.id,t._data.id,i)}}},[e._v("通过")]),e._v(" "),a("i"),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.singleOperationSubmit(2,t.thread.category._data.id,t._data.id,i)}}},[e._v("删除")]),e._v(" "),a("i"),e._v(" "),2!==t._data.isApproved?a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.singleOperationSubmit(3,t.thread.category._data.id,t._data.id,i)}}},[e._v("忽略")]):e._e()],1),e._v(" "),a("div",{staticClass:"cont-review-table__footer__rt"},[a("span",[e._v("操作理由：")]),e._v(" "),a("el-input",{attrs:{size:"medium",clearable:""},model:{value:e.submitForm[i].attributes.message,callback:function(t){e.$set(e.submitForm[i].attributes,"message",t)},expression:"submitForm[index].attributes.message"}}),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择操作理由"},on:{change:function(t){return e.reasonForOperationChange(t,i)}},model:{value:e.submitForm[i].Select,callback:function(t){e.$set(e.submitForm[i],"Select",t)},expression:"submitForm[index].Select"}},e._l(e.reasonForOperation,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),a("div",{staticClass:"cont-review-table__footer__bottom"},[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.viewClick(t.thread._data.id)}}},[e._v("查看")])],1)])])})),e._v(" "),e.showViewer?a("el-image-viewer",{attrs:{"on-close":e.closeViewer,"url-list":e.url}}):e._e(),e._v(" "),a("tableNoList",{directives:[{name:"show",rawName:"v-show",value:e.themeList.length<1,expression:"themeList.length < 1"}]}),e._v(" "),e.pageCount>1?a("Page",{attrs:{"current-page":e.currentPaga,"page-size":e.pageSelect,total:e.total},on:{"current-change":e.handleCurrentChange}}):e._e()],2),e._v(" "),a("div",{staticClass:"cont-review-footer footer-btn"},[a("el-button",{attrs:{size:"small",type:"primary",loading:e.subLoading},on:{click:e.submitClick}},[e._v("提交")]),e._v(" "),a("el-button",{attrs:{type:"text",loading:1===e.btnLoading},on:{click:function(t){return e.allOperationsSubmit(1)}}},[e._v("全部通过")]),e._v(" "),a("el-button",{attrs:{type:"text",loading:2===e.btnLoading},on:{click:function(t){return e.allOperationsSubmit(2)}}},[e._v("全部删除")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.ignoreStatus,expression:"ignoreStatus"}],attrs:{type:"text",loading:3===e.btnLoading},on:{click:function(t){return e.allOperationsSubmit(3)}}},[e._v("全部忽略")])],1)])},s=[]}}]);