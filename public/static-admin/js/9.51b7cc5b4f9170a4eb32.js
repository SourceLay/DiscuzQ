(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{DvCQ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n(a("QbLZ"));a("lL+3");var i=n(a("MW2h"));function n(e){return e&&e.__esModule?e:{default:e}}t.default=(0,s.default)({name:"cont-manage-view"},i.default)},J6oF:function(e,t,a){"use strict";a.r(t),t.default={el:{colorpicker:{confirm:"باشد",clear:"حذف"},datepicker:{now:"اکنون",today:"امروز",cancel:"لغو",clear:"حذف",confirm:"باشه",selectDate:"انتخاب تاریخ",selectTime:"انتخاب زمان",startDate:"تاریخ شروع",startTime:"زمان شروع",endDate:"تاریخ پایان",endTime:"زمان پایان",prevYear:"سال قبل",nextYear:"سال بعد",prevMonth:"ماه قبل",nextMonth:"ماه بعد",year:"سال",month1:"ژانویه",month2:"فوریه",month3:"مارس",month4:"آوریل",month5:"مه",month6:"ژوئن",month7:"جولای",month8:"اوت",month9:"سپتامبر",month10:"اکتبر",month11:"نوامبر",month12:"دسامبر",weeks:{sun:"یکشنبه",mon:"دوشنبه",tue:"سه​شنبه",wed:"چهارشنبه",thu:"پنج​شنبه",fri:"جمعه",sat:"شنبه"},months:{jan:"ژانویه",feb:"فوریه",mar:"مارس",apr:"آوریل",may:"مه",jun:"ژوئن",jul:"جولای",aug:"اوت",sep:"سپتامبر",oct:"اکتبر",nov:"نوامبر",dec:"دسامبر"}},select:{loading:"بارگیری",noMatch:"هیچ داده‌ای پیدا نشد",noData:"اطلاعاتی وجود ندارد",placeholder:"انتخاب کنید"},cascader:{noMatch:"هیچ داده‌ای پیدا نشد",loading:"بارگیری",placeholder:"انتخاب کنید",noData:"اطلاعاتی وجود ندارد"},pagination:{goto:"برو به",pagesize:"/صفحه",total:"مجموع {total}",pageClassifier:""},messagebox:{title:"پیام",confirm:"باشه",cancel:"لغو",error:"ورودی غیر مجاز"},upload:{deleteTip:"برای پاک کردن حذف را فشار دهید",delete:"حذف",preview:"پیش‌نمایش",continue:"ادامه"},table:{emptyText:"اطلاعاتی وجود ندارد",confirmFilter:"تایید",resetFilter:"حذف",clearFilter:"همه",sumText:"جمع"},tree:{emptyText:"اطلاعاتی وجود ندارد"},transfer:{noMatch:"هیچ داده‌ای پیدا نشد",noData:"اطلاعاتی وجود ندارد",titles:["لیست 1","لیست 2"],filterPlaceholder:"کلید واژه هارو وارد کن",noCheckedFormat:"{total} مورد",hasCheckedFormat:"{checked} مورد از {total} مورد انتخاب شده است"},image:{error:"خطا در بارگیری تصویر"},pageHeader:{title:"بازگشت"},popconfirm:{confirmButtonText:"Yes",cancelButtonText:"No"}}}},MW2h:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=d(a("4gYi")),i=d(a("Dt3C")),n=d(a("7qpD")),r=d(a("rWG0")),o=d(a("VVfg")),c=a("WIBD"),l=d(a("CKnL"));d(a("J6oF"));function d(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{operatingList:[{name:"批量移动到分类",label:"class"},{name:"批量置顶",label:"sticky"},{name:"批量删除",label:"delete"},{name:"批量设置精华",label:"marrow"}],operatingSelect:"",categoriesList:[{name:"所有分类",id:0}],categoryId:"",toppingRadio:2,essenceRadio:2,checkAll:!1,checkAllNum:0,themeListAll:[],checkedTheme:[],isIndeterminate:!1,themeList:[],currentPag:1,total:0,pageCount:1,showViewer:!1,url:[],pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},searchData:{topicTypeId:"0",categoryId:0,pageSelect:"10",themeAuthor:"",themeKeyWords:"",dataValue:["",""],viewedTimesMin:"",viewedTimesMax:"",numberOfRepliesMin:"",numberOfRepliesMax:"",essentialTheme:"",topType:"",topicId:0},topic:null,topicType:[{name:"全部",id:"0"},{name:"置顶主题",id:"1"},{name:"精华主题",id:"2"},{name:"置顶并精华主题",id:"3"}],subLoading:!1}},computed:(0,c.mapState)({}),methods:{imgShowClick:function(e,t){var a=this;this.url=[];var s=[];e.forEach((function(e){s.push(e._data.url)})),this.url.push(s[t]),s.forEach((function(e,s){s>t&&a.url.push(e)})),s.forEach((function(e,s){s<t&&a.url.push(e)})),this.showViewer=!0},closeViewer:function(){this.showViewer=!1},handleCheckAllChange:function(e){this.checkedTheme=e?this.themeListAll:[],this.isIndeterminate=!1},handleCheckedCitiesChange:function(e,t,a){var s=this.checkedTheme.length;this.checkAll=s===this.themeListAll.length,this.isIndeterminate=s>0&&s<this.themeListAll.length},formatDate:function(e){return this.$dayjs(e).format("YYYY-MM-DD HH:mm")},submitClick:function(){var e=this;this.subLoading=!0;var t=[],a={},s={category:{data:{id:""}}},i=!1;switch("class"===this.operatingSelect?this.checkedTheme.forEach((function(e,i){t.push({type:"threads",id:e,attributes:a,relationships:s})})):this.checkedTheme.forEach((function(e,s){t.push({type:"threads",id:e,attributes:a})})),this.operatingSelect){case"class":this.categoryId?s.category.data.id=this.categoryId:i=!0;break;case"sticky":a.isSticky=1===this.toppingRadio;break;case"delete":a.isDeleted=!0;break;case"marrow":a.isEssence=1===this.essenceRadio;break;default:i=!0,this.subLoading=!1,t.length>0&&this.$message({showClose:!0,message:"操作选项错误，请重新选择或刷新页面(F5)",type:"warning"})}t.length<1?this.$message({showClose:!0,message:"操作主题列表为空，请选择主题",type:"warning"}):i||this.appFetch({url:"threads",splice:"/batch",method:"patch",data:{data:t}}).then((function(t){e.subLoading=!1,t.errors?e.$message.error(t.errors[0].code):t.meta&&t.data?(e.checkedTheme=[],e.$message.error("操作失败！")):(e.pageCount<3&&(e.currentPag=1,o.default.setLItem("currentPag",1)),e.getThemeList(Number(o.default.getLItem("currentPag"))||1),e.isIndeterminate=!1,e.checkAll=!1,e.checkedTheme=[],e.$message({message:"操作成功",type:"success"}))})).catch((function(e){}))},handleCurrentChange:function(e){document.getElementsByClassName("index-main-con__main")[0].scrollTop=0,this.isIndeterminate=!1,this.currentPag=e,this.checkAll=!1,this.checkedTheme=[],this.getThemeList(e)},searchClick:function(){switch(this.searchData.topicTypeId){case"0":this.searchData.essentialTheme="",this.searchData.topType="";break;case"1":this.searchData.essentialTheme="",this.searchData.topType="yes";break;case"2":this.searchData.essentialTheme="yes",this.searchData.topType="";break;case"3":this.searchData.essentialTheme="yes",this.searchData.topType="yes"}this.searchData.dataValue=null==this.searchData.dataValue?["",""]:this.searchData.dataValue,this.currentPag=1,this.getThemeList(1)},getThemeList:function(e){var t=this,a=this.searchData;this.appFetch({url:"threads",method:"get",data:{include:["user","firstPost","lastPostedUser","category","firstPost.images","threadVideo","firstPost.attachments"],"filter[isDeleted]":"no","filter[isApproved]":"1","filter[username]":a.themeAuthor,"filter[categoryId]":a.categoryId,"page[number]":e,"page[size]":a.pageSelect,"filter[q]":a.themeKeyWords,"filter[createdAtBegin]":a.dataValue[0],"filter[createdAtEnd]":a.dataValue[1],"filter[viewCountGt]":a.viewedTimesMin,"filter[viewCountLt]":a.viewedTimesMax,"filter[postCountGt]":a.numberOfRepliesMin,"filter[postCountLt]":a.numberOfRepliesMax,"filter[isEssence]":a.essentialTheme,"filter[isSticky]":a.topType,"filter[topicId]":a.topicId,sort:"-createdAt"}}).then((function(e){e.errors?t.$message.error(e.errors[0].code):(t.themeList=e.readdata,t.total=e.meta.threadCount,t.pageCount=e.meta.pageCount,t.themeListAll=[],t.themeList.forEach((function(e,a){t.themeListAll.push(e._data.id)})))})).catch((function(e){}))},getCategories:function(){var e=this;this.appFetch({url:"categories",method:"get",data:{}}).then((function(t){t.errors?e.$message.error(t.errors[0].code):t.data.forEach((function(t,a){e.categoriesList.push({name:t.attributes.name,id:t.id})}))})).catch((function(e){}))}},beforeDestroy:function(){o.default.setLItem("currentPag",1);var e=new Object;for(var t in this.searchData)e[t]="pageSelect"===t?"10":""},created:function(){var e=this;this.$route.query&&this.$route.query.id&&(this.searchData.topicId=this.$route.query.id,this.appFetch({url:"topics",method:"get",splice:"/"+this.$route.query.id}).then((function(t){e.topic=t.readdata._data}))),this.currentPag=Number(o.default.getLItem("currentPag"))||1,this.getThemeList(Number(o.default.getLItem("currentPag"))||1),this.getCategories()},components:{Card:s.default,ContArrange:i.default,tableNoList:n.default,ElImageViewer:l.default,Page:r.default}}},WONP:function(e,t,a){"use strict";a.r(t);var s=a("n/qd"),i=a("fthR");for(var n in i)"default"!==n&&function(e){a.d(t,e,(function(){return i[e]}))}(n);var r=a("KHd+"),o=Object(r.a)(i.default,s.a,s.b,!1,null,null,null);t.default=o.exports},fthR:function(e,t,a){"use strict";a.r(t);var s=a("DvCQ"),i=a.n(s);for(var n in s)"default"!==n&&function(e){a.d(t,e,(function(){return s[e]}))}(n);t.default=i.a},"n/qd":function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return i}));var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cont-manage-box"},[a("div",{staticClass:"cont-manage-header"},[a("div",{staticClass:"cont-manage-header_top condition-box"},[a("div",{staticClass:"cont-manage-header_condition cont-manage-header_condition-lf"},[a("span",{staticClass:"cont-manage-header_condition-title"},[e._v("作者：")]),e._v(" "),a("el-input",{attrs:{size:"medium",placeholder:"搜索作者",clearable:""},model:{value:e.searchData.themeAuthor,callback:function(t){e.$set(e.searchData,"themeAuthor",t)},expression:"searchData.themeAuthor"}})],1),e._v(" "),a("div",{staticClass:"cont-manage-header_condition cont-manage-header_condition-rh"},[a("span",{staticClass:"cont-manage-header_condition-title"},[e._v("内容包含：")]),e._v(" "),a("el-input",{attrs:{size:"medium",placeholder:"搜索内容",clearable:""},model:{value:e.searchData.themeKeyWords,callback:function(t){e.$set(e.searchData,"themeKeyWords",t)},expression:"searchData.themeKeyWords"}})],1)]),e._v(" "),a("div",{staticClass:"cont-manage-header_middle condition-box"},[a("div",{staticClass:"cont-manage-header_condition cont-manage-header_condition-lf"},[a("span",{staticClass:"cont-manage-header_condition-title"},[e._v("搜索范围：")]),e._v(" "),a("el-select",{attrs:{placeholder:"选择搜索范围"},model:{value:e.searchData.categoryId,callback:function(t){e.$set(e.searchData,"categoryId",t)},expression:"searchData.categoryId"}},e._l(e.categoriesList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("div",{staticClass:"cont-manage-header_condition"},[a("span",{staticClass:"cont-manage-header_condition-title"},[e._v("主题类型：")]),e._v(" "),a("el-select",{attrs:{placeholder:"选择主题类型"},model:{value:e.searchData.topicTypeId,callback:function(t){e.$set(e.searchData,"topicTypeId",t)},expression:"searchData.topicTypeId"}},e._l(e.topicType,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("div",{staticClass:"cont-manage-header_condition"},[a("span",{staticClass:"cont-manage-header_condition-title"},[e._v("发布时间:")]),e._v(" "),a("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd HH:mm:ss","default-time":["00:00:00","23:59:59"],"picker-options":e.pickerOptions},model:{value:e.searchData.dataValue,callback:function(t){e.$set(e.searchData,"dataValue",t)},expression:"searchData.dataValue"}})],1)]),e._v(" "),a("div",{staticClass:"cont-manage-header_bottom condition-box"},[a("div",{staticClass:"cont-manage-header_condition cont-manage-header_condition-mid"},[a("span",{staticClass:"cont-manage-header_condition-title"},[e._v("浏览次数：")]),e._v(" "),a("el-input",{attrs:{size:"medium",placeholder:"大于",clearable:""},model:{value:e.searchData.viewedTimesMin,callback:function(t){e.$set(e.searchData,"viewedTimesMin",t)},expression:"searchData.viewedTimesMin"}}),e._v(" "),a("div",{staticClass:"spacing"},[e._v("-")]),e._v(" "),a("el-input",{attrs:{size:"medium",placeholder:"小于",clearable:""},model:{value:e.searchData.viewedTimesMax,callback:function(t){e.$set(e.searchData,"viewedTimesMax",t)},expression:"searchData.viewedTimesMax"}})],1),e._v(" "),a("div",{staticClass:"cont-manage-header_condition"},[a("span",{staticClass:"cont-manage-header_condition-title"},[e._v("被回复数：")]),e._v(" "),a("el-input",{attrs:{size:"medium",placeholder:"大于",clearable:""},model:{value:e.searchData.numberOfRepliesMin,callback:function(t){e.$set(e.searchData,"numberOfRepliesMin",t)},expression:"searchData.numberOfRepliesMin"}}),e._v(" "),a("div",{staticClass:"spacing"},[e._v("-")]),e._v(" "),a("el-input",{attrs:{size:"medium",placeholder:"小于",clearable:""},model:{value:e.searchData.numberOfRepliesMax,callback:function(t){e.$set(e.searchData,"numberOfRepliesMax",t)},expression:"searchData.numberOfRepliesMax"}}),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.searchClick}},[e._v("搜索")])],1)])]),e._v(" "),a("div",{staticClass:"cont-manage-theme"},[a("div",{staticClass:"cont-manage-theme__table"},[a("div",{staticClass:"cont-manage-theme__table-header"},[a("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}}),e._v(" "),a("p",{staticClass:"cont-manage-theme__table-header__title"},[e._v(e._s(e.topic?"话题 #"+e.topic.content+"#":"")+" 主题列表")])],1),e._v(" "),e._l(e.themeList,(function(t,s){return a("ContArrange",{key:t._data.id,attrs:{author:t.user?t.user._data.username:"该用户被删除",theme:t.category._data.name,prply:t._data.postCount-1,browse:t._data.viewCount,last:t.lastPostedUser?t.lastPostedUser._data.username:"该用户被删除",releaseTime:e.formatDate(t._data.createdAt),userId:t.user?t.user._data.id:"该用户被删除"}},[a("div",{staticClass:"cont-manage-theme__table-side",attrs:{slot:"side"},slot:"side"},[a("el-checkbox",{attrs:{label:t._data.id},on:{change:function(t){return e.handleCheckedCitiesChange()}},model:{value:e.checkedTheme,callback:function(t){e.checkedTheme=t},expression:"checkedTheme"}})],1),e._v(" "),1===t._data.type?a("a",{staticClass:"cont-manage-theme__table-long-text",attrs:{slot:"longText",href:"/pages/topic/index?id="+t._data.id,target:"_blank"},slot:"longText"},[e._v("\n          "+e._s(t._data.title)+"\n          "),a("span",{staticClass:"iconfont",class:parseInt(t._data.price)>0?"iconmoney":"iconchangwen"})]):e._e(),e._v(" "),a("div",{staticClass:"cont-manage-theme__table-main",attrs:{slot:"main"},slot:"main"},[a("a",{staticClass:"cont-manage-theme__table-main__cont-text",style:{display:t.threadVideo?"inline":"block"},attrs:{href:"/pages/topic/index?id="+t._data.id,target:"_blank"},domProps:{innerHTML:e._s(t.firstPost._data.contentHtml)}}),e._v(" "),t.threadVideo?a("span",{staticClass:"iconfont iconvideo"}):e._e(),e._v(" "),a("div",{staticClass:"cont-manage-theme__table-main__cont-imgs"},e._l(t.firstPost.images,(function(s,i){return a("p",{key:i,staticClass:"cont-manage-theme__table-main__cont-imgs-p"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s._data.thumbUrl,expression:"item._data.thumbUrl"}],attrs:{alt:s._data.fileName},on:{click:function(a){return e.imgShowClick(t.firstPost.images,i)}}})])})),0),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.firstPost.attachments.length>0,expression:"items.firstPost.attachments.length > 0"}],staticClass:"cont-manage-theme__table-main__cont-annex"},[a("span",[e._v("附件：")]),e._v(" "),e._l(t.firstPost.attachments,(function(t,s){return a("p",{key:s},[a("a",{attrs:{href:t._data.url,target:"_blank"}},[e._v(e._s(t._data.fileName))])])}))],2)])])})),e._v(" "),e.showViewer?a("el-image-viewer",{attrs:{"on-close":e.closeViewer,"url-list":e.url}}):e._e(),e._v(" "),a("tableNoList",{directives:[{name:"show",rawName:"v-show",value:e.themeList.length<1,expression:"themeList.length < 1"}]}),e._v(" "),e.pageCount>1?a("div",{staticClass:"cont-manage-theme__table-footer"},[a("Page",{attrs:{"current-page":e.currentPag,"page-size":10,total:e.total},on:{"current-change":e.handleCurrentChange}})],1):e._e()],2)]),e._v(" "),a("div",{staticClass:"cont-manage-operating"},[a("p",[e._v("操作")]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.operatingList,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{"label-class-name":"cont-manage-operating__table-label",label:"操作",prop:"theme",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-radio",{attrs:{label:t.row.label},model:{value:e.operatingSelect,callback:function(t){e.operatingSelect=t},expression:"operatingSelect"}},[e._v(e._s(t.row.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"选项","min-width":"250"},scopedSlots:e._u([{key:"default",fn:function(t){return["批量移动到分类"===t.row.name?a("el-select",{attrs:{placeholder:"选择分类"},model:{value:e.categoryId,callback:function(t){e.categoryId=t},expression:"categoryId"}},e._l(e.categoriesList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1):e._e(),e._v(" "),"批量置顶"===t.row.name?a("el-radio-group",{staticClass:"cont-manage__option-select",model:{value:e.toppingRadio,callback:function(t){e.toppingRadio=t},expression:"toppingRadio"}},[a("el-radio",{attrs:{label:1}},[e._v("置顶")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("解除置顶")])],1):e._e(),e._v(" "),"批量设置精华"===t.row.name?a("el-radio-group",{staticClass:"cont-manage__option-select",model:{value:e.essenceRadio,callback:function(t){e.essenceRadio=t},expression:"essenceRadio"}},[a("el-radio",{attrs:{label:1}},[e._v("精华")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("取消精华")])],1):e._e()]}}])})],1),e._v(" "),a("Card",{staticClass:"footer-btn"},[a("el-button",{attrs:{loading:e.subLoading,type:"primary"},on:{click:e.submitClick}},[e._v("提交")])],1)],1)])},i=[]}}]);