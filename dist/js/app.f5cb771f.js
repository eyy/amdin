webpackJsonp([1],{0:function(e,t,n){e.exports=n("NHnr")},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n("EuXz");var r=n("/5sW"),a=n("IZMb"),i=n.n(a),o=(n("VjuZ"),{install:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={};e.prototype.___=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var a=t[0];return n.hasOwnProperty(a)?a=n[a]:"English"!==n._name&&console.warn(a,"untranslated"),a.replace(s,function(e,n){return t[n]})},e.prototype.$setLang=function(e){n=e,n._direction&&(document.body.dir=n._direction)},t.lang&&e.prototype.$setLang(t.lang)}}),s=/\$(\d)?/,u=n("/ocq"),l=(n("SldL"),n("7hDC")),c=n.n(l),p=(n("y9m4"),n("zGZ6")),d=n.n(p),h="/admin/api/",f=new r["a"];function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return t.headers={"content-type":"application/json"},fetch(h+e,t).then(function(e){return e.json()}).then(function(e){return 500===e.status&&"ValidationError"!==e.name?Promise.reject(e):e}).catch(function(e){return f.$emit("error",e),e})}var v=d()(function(){return m()}),_=d()(function(e){return m(e+"/options")});function b(e){return m(e)}function g(e){return m(e+"/ref")}function x(e,t){return m(e+"/sort",{method:"PUT",body:JSON.stringify(t)})}function w(e,t){return m(e,{method:"POST",body:JSON.stringify(t)})}function y(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"first";return m(e+"/"+t)}function k(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"first",n=arguments.length>2?arguments[2]:void 0;return m(e+"/"+t,{method:"PUT",body:JSON.stringify(n)})}function $(e,t){return m(e+"/"+t,{method:"DELETE"})}function j(e,t,n){return m(e+"/actions/"+t+"/"+n)}var O={data:function(){return{models:[]}},created:function(){var e=c()(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:t=e.sent,n=t.models,this.models=n;case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.___("Welcome!")))]),e._l(e.models,function(t){return n("h2",{key:t.name},[t.single?n("router-link",{attrs:{to:t.name+"/single"}},[e._v(e._s(t.plural))]):n("router-link",{attrs:{to:t.name}},[e._v(e._s(t.plural))])],1)})],2)},E=[],S=n("XyMi"),D=!1,C=null,N=null,P=null,A=Object(S["a"])(O,R,E,D,C,N,P),L=A.exports,q=(n("fx22"),n("NM/j")),T=n.n(q),U=n("LBze"),F={mixins:[U["ContainerMixin"]],props:{tag:{type:String,default:"div"}},render:function(e){return e(this.tag,this.$slots.default)}},z={mixins:[U["ElementMixin"]],props:{tag:{type:String,default:"div"}},render:function(e){return e(this.tag,this.$slots.default)}},I={props:["path","value"]},M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",["Boolean"===e.path.type?n("div",{staticStyle:{"text-align":"center"}},[e.value?n("span",[e._v("✓")]):e._e()]):n("span",[e._v("\n    "+e._s(e.value)+"\n  ")])])},H=[],J=!1,V=null,B=null,Z=null,G=Object(S["a"])(I,M,H,J,V,B,Z),W=G.exports,X={data:function(){return{model:"",opts:{},docs:[],reordered:!1}},beforeRouteEnter:function(){var e=c()(regeneratorRuntime.mark(function e(t,n,r){var a,i,o,s,u;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.params.model,e.next=3,Promise.all([_(a),b(a)]);case 3:if(i=e.sent,o=T()(i,2),s=o[0],u=o[1],!s.single){e.next=9;break}return e.abrupt("return",r("/"+a+"/single"));case 9:r(function(e){e.model=a,e.opts=s,e.docs=u});case 10:case"end":return e.stop()}},e,this)}));return function(t,n,r){return e.apply(this,arguments)}}(),methods:{act:function(){var e=c()(regeneratorRuntime.mark(function e(t,n){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,j(this.model,t,n._id);case 2:if(r=e.sent,r){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,b(this.model);case 7:this.docs=e.sent,this.$toasted.success(this.opts.actions[t].success);case 9:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),sort:function(){var e=c()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.reordered="saving",e.next=3,x(this.model,this.docs.map(function(e,t){return[e._id,t]}));case 3:t=e.sent,this.reordered=!1,t.ok&&this.$toasted.success(this.___("Saved!"));case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),del:function(){var e=c()(regeneratorRuntime.mark(function e(t,n){var r,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:r=this.docs[n][this.opts.title],a=this.realDel,i=this.___,this.$toasted.show(i("Are you sure you want to delete $1?",r),{duration:null,type:"error",action:[{text:i("Delete"),onClick:function(e,i){i.goAway(0),setTimeout(function(){return a(t,n,r)},500)}},{text:i("Never mind"),onClick:function(e,t){t.goAway(0)}}]});case 2:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),realDel:function(){var e=c()(regeneratorRuntime.mark(function e(t,n,r){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,$(this.model,t);case 2:if(a=e.sent,a.ok){e.next=5;break}return e.abrupt("return");case 5:this.docs.splice(n,1),this.$toasted.info(this.___("$1 was deleted.",r));case 7:case"end":return e.stop()}},e,this)}));return function(t,n,r){return e.apply(this,arguments)}}()},components:{SortableList:F,SortableItem:z,Plain:W},directives:{handle:U["HandleDirective"]}},Y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[n("router-link",{attrs:{to:"/"}},[e._v(e._s(e.___("Admin")))]),e._v(" /\n    "+e._s(e.opts.plural)+"\n  ")],1),n("router-link",{attrs:{tag:"button",to:e.model+"/new"}},[e._v("\n    + "+e._s(e.___("Add a new $1",e.opts.label))+"\n  ")]),e.reordered?n("button",{staticClass:"other",attrs:{disabled:"saving"===e.reordered},on:{click:function(t){return t.preventDefault(),e.sort(t)}}},[e._v("\n    "+e._s(e.___("Save New Order"))+"\n  ")]):e._e(),e.docs.length?n("table",{attrs:{id:"list"}},[n("tr",[e._l(e.opts.list,function(t){return n("th",{key:t,class:{sort:t===e.opts.sortable}},[e._v("\n        "+e._s(e.opts.paths[t].label)+"\n      ")])}),n("th")],2),n("sortable-list",{attrs:{tag:"tbody","use-drag-handle":!0},on:{input:function(t){e.reordered=!0}},model:{value:e.docs,callback:function(t){e.docs=t},expression:"docs"}},e._l(e.docs,function(t,r){return n("sortable-item",{key:t._id,attrs:{tag:"tr",index:r}},[e._l(e.opts.list,function(r){return n("td",{key:r},[r===e.opts.sortable?n("span",{directives:[{name:"handle",rawName:"v-handle"}],staticClass:"sort"},[e._v("\n            ↕\n          ")]):r===e.opts.title?n("div",{staticClass:"title-field"},[n("router-link",{attrs:{to:e.model+"/"+t._id}},[e._v("\n              "+e._s(t[r])+"\n            ")])],1):n("plain",{attrs:{value:t[r],path:e.opts.paths[r]}})],1)}),n("td",[n("router-link",{attrs:{tag:"button",to:e.model+"/"+t._id}},[e._v(e._s(e.___("Edit")))]),n("button",{staticClass:"danger",on:{click:function(n){n.preventDefault(),e.del(t._id,r)}}},[e._v(e._s(e.___("Delete")))]),e._l(e.opts.actions,function(r,a){return n("button",{key:a,staticClass:"other",on:{click:function(n){n.preventDefault(),e.act(a,t)}}},[e._v("\n            "+e._s(r.label)+"\n          ")])})],2)],2)}))],1):n("p",[n("strong",[e._v(e._s(e.___("No Documents.")))])])],1)},K=[];function Q(e){n("Ns5s")}var ee=!1,te=Q,ne=null,re=null,ae=Object(S["a"])(X,Y,K,ee,te,ne,re),ie=ae.exports;function oe(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=se(e[n]));return t}function se(e){if(e.default)return e.default;if(e.enum)return e.enum[0];if(e.schema)return[];var t=e.type.toLowerCase();return"number"===t?e.min?e.min:0:null}var ue={props:{doc:Object,paths:Object,submit:Function},data:function(){return{errors:{},saving:!1,preSave:[]}},provide:function(){return{preSave:this.preSave}},methods:{save:function(){var e=c()(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this.___,this.saving=!0,e.prev=2,e.next=5,Promise.all(this.preSave.map(function(e){return e()}));case 5:e.next=11;break;case 7:return e.prev=7,e.t0=e["catch"](2),console.error("preSave error",e.t0),e.abrupt("return",this.$toasted.error(t("There was a problem :(")));case 11:return e.next=13,this.submit(this.doc);case 13:n=e.sent,this.saving=!1,500===n.status&&"ValidationError"===n.name?(this.errors=n.errors,console.error("submit error",n),this.$toasted.error(t("There was a problem :("))):(this.errors={},this.$toasted.success(t("Saved!")),this.$emit("saved",n));case 16:case"end":return e.stop()}},e,this,[[2,7]])}));return function(){return e.apply(this,arguments)}}()}},le=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("form",{class:{saving:e.saving},on:{submit:function(t){return t.preventDefault(),e.save(t)}}},[n("obj",{attrs:{path:e.paths,value:e.doc,errors:e.errors}}),n("button",{attrs:{type:"submit",disabled:e.saving}},[e._v("\n    "+e._s(e.___("Save"))+"\n    "),e.saving?n("span",[e._v("...")]):e._e()]),e.errors?n("div",{staticClass:"error"},[e._v("\n    "+e._s(e.errors.message)+"\n  ")]):e._e()],1)},ce=[];function pe(e){n("v+LI")}var de=!1,he=pe,fe=null,me=null,ve=Object(S["a"])(ue,le,ce,de,he,fe,me),_e=ve.exports,be={data:function(){return{model:"",opts:{paths:{}},doc:{}}},beforeRouteEnter:function(){var e=c()(regeneratorRuntime.mark(function e(t,n,r){var a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.params.model,e.next=3,_(a);case 3:if(i=e.sent,!i.single){e.next=6;break}return e.abrupt("return",r("/"+a+"/single"));case 6:r(function(e){e.model=a,e.opts=i,e.doc=oe(i.paths)});case 7:case"end":return e.stop()}},e,this)}));return function(t,n,r){return e.apply(this,arguments)}}(),methods:{postDoc:w,saved:function(e){this.$router.push({name:"edit",params:{model:this.model,id:e._id}})}},components:{AForm:_e}},ge=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[n("router-link",{attrs:{to:"/"}},[e._v(e._s(e.___("Admin")))]),e._v("\n    / "),n("router-link",{attrs:{to:"/"+e.model}},[e._v(e._s(e.opts.plural))]),e._v("\n    / "+e._s(e.___("New"))+"\n  ")],1),n("a-form",{attrs:{paths:e.opts.paths,doc:e.doc,submit:function(t){return e.postDoc(e.model,t)}},on:{saved:e.saved}})],1)},xe=[],we=!1,ye=null,ke=null,$e=null,je=Object(S["a"])(be,ge,xe,we,ye,ke,$e),Oe=je.exports,Re={data:function(){return{model:"",id:null,opts:{paths:{}},doc:{}}},beforeRouteEnter:function(){var e=c()(regeneratorRuntime.mark(function e(t,n,r){var a,i,o,s,u,l,c;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.params,i=a.model,o=a.id,e.next=3,Promise.all([_(i),y(i,o)]);case 3:if(s=e.sent,u=T()(s,2),l=u[0],c=u[1],!l.single){e.next=9;break}return e.abrupt("return",r("/"+i+"/single"));case 9:r(function(e){e.model=i,e.id=o,e.opts=l,e.doc=c});case 10:case"end":return e.stop()}},e,this)}));return function(t,n,r){return e.apply(this,arguments)}}(),methods:{putDoc:k},components:{AForm:_e}},Ee=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[n("router-link",{attrs:{to:"/"}},[e._v(e._s(e.___("Admin")))]),e._v("\n    / "),n("router-link",{attrs:{to:"/"+e.model}},[e._v(e._s(e.opts.plural))]),e._v("\n    / "),n("em",[e._v(e._s(e.doc[e.opts.title]||e.___("Untitled")))])],1),n("a-form",{attrs:{paths:e.opts.paths,doc:e.doc,submit:function(t){return e.putDoc(e.model,e.id,t)}},on:{saved:function(t){return e.doc=t}}})],1)},Se=[],De=!1,Ce=null,Ne=null,Pe=null,Ae=Object(S["a"])(Re,Ee,Se,De,Ce,Ne,Pe),Le=Ae.exports,qe={data:function(){return{model:"",id:null,opts:{paths:{}},doc:{}}},beforeRouteEnter:function(){var e=c()(regeneratorRuntime.mark(function e(t,n,r){var a,i,o,s,u,l,c;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.params,i=a.model,o=a.id,e.next=3,Promise.all([_(i),y(i)]);case 3:if(s=e.sent,u=T()(s,2),l=u[0],c=u[1],l.single){e.next=9;break}return e.abrupt("return",r("/"+i));case 9:r(function(e){e.model=i,e.id=o,e.opts=l,e.doc=c});case 10:case"end":return e.stop()}},e,this)}));return function(t,n,r){return e.apply(this,arguments)}}(),methods:{putDoc:k},components:{AForm:_e}},Te=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[n("router-link",{attrs:{to:"/"}},[e._v(e._s(e.___("Admin")))]),e._v("\n    / "+e._s(e.opts.label)+"\n  ")],1),n("a-form",{attrs:{paths:e.opts.paths,doc:e.doc,submit:function(t){return e.putDoc(e.model,e.id,t)}}})],1)},Ue=[],Fe=!1,ze=null,Ie=null,Me=null,He=Object(S["a"])(qe,Te,Ue,Fe,ze,Ie,Me),Je=He.exports;r["a"].use(u["a"]);var Ve=new u["a"]({routes:[{path:"/",name:"home",component:L},{path:"/:model",name:"list",component:ie},{path:"/:model/new",name:"create",component:Oe},{path:"/:model/single",name:"single",component:Je},{path:"/:model/:id",name:"edit",component:Le}]}),Be={data:function(){return{ready:!1}},created:function(){var e=c()(regeneratorRuntime.mark(function e(){var t,n,r=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:t=e.sent,n=t.conf,this.$setLang(n.lang),this.ready=!0,f.$on("error",function(e){r.$toasted.error(r.___("There was a problem :(")),console.error(e)});case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},Ze=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e.ready?n("router-view"):e._e()],1)},Ge=[];function We(e){n("wmkA")}var Xe=!1,Ye=We,Ke=null,Qe=null,et=Object(S["a"])(Be,Ze,Ge,Xe,Ye,Ke,Qe),tt=et.exports,nt={props:["value","path"]},rt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{attrs:{type:"text",required:e.path.required,maxlength:e.path.maxlength,minlength:e.path.minlength},domProps:{value:e.value},on:{input:function(t){e.$emit("input",t.target.value)}}})},at=[],it=!1,ot=null,st=null,ut=null,lt=Object(S["a"])(nt,rt,at,it,ot,st,ut),ct=lt.exports,pt={props:["value","path"]},dt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("textarea",{attrs:{type:"text",required:e.path.required,maxlength:e.path.maxlength,minlength:e.path.minlength},domProps:{value:e.value},on:{input:function(t){e.$emit("input",t.target.value)}}})},ht=[],ft=!1,mt=null,vt=null,_t=null,bt=Object(S["a"])(pt,dt,ht,ft,mt,vt,_t),gt=bt.exports,xt={props:{value:Boolean,path:Object}},wt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{attrs:{type:"checkbox",required:e.path.required},domProps:{checked:e.value},on:{change:function(t){e.$emit("input",t.target.checked)}}})},yt=[],kt=!1,$t=null,jt=null,Ot=null,Rt=Object(S["a"])(xt,wt,yt,kt,$t,jt,Ot),Et=Rt.exports,St={props:{value:{type:Array,default:function(){return[]}},path:Object},computed:{here:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}},methods:{add:function(){this.here=[oe(this.path.schema)].concat(this.value)},remove:function(e){this.value.splice(e,1)}},components:{SortableList:F,SortableItem:z},directives:{handle:U["HandleDirective"]}},Dt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("button",{attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.add(t)}}},[e._v("\n    + "+e._s(e.___("Add"))+"\n  ")]),n("sortable-list",{attrs:{"lock-axis":"y","use-drag-handle":!0},model:{value:e.here,callback:function(t){e.here=t},expression:"here"}},e._l(e.here,function(t,r){return n("sortable-item",{key:t._id,staticClass:"box",attrs:{index:r}},[n("div",{staticClass:"box-controls"},[n("a",{directives:[{name:"handle",rawName:"v-handle"},{name:"show",rawName:"v-show",value:e.here.length>1,expression:"here.length > 1"}],staticClass:"reorder",attrs:{href:"#",title:e.___("Order")}},[e._v("↕")]),n("a",{attrs:{href:"#",title:e.___("Remove")},on:{click:function(t){t.preventDefault(),e.remove(r)}}},[e._v("×")])]),n("obj",{attrs:{path:e.path.schema,value:e.here[r]}})],1)}))],1)},Ct=[];function Nt(e){n("YCUa")}var Pt=!1,At=Nt,Lt=null,qt=null,Tt=Object(S["a"])(St,Dt,Ct,Pt,At,Lt,qt),Ut=Tt.exports,Ft={props:{value:String,path:Object}},zt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",e._l(e.path.enum,function(t){return n("label",{key:t},[n("input",{attrs:{type:"radio",name:"paths"},domProps:{value:t,checked:t===e.value},on:{change:function(t){e.$emit("input",t.target.value)}}}),e._v("\n    "+e._s(t)+"\n  ")])}))},It=[],Mt=!1,Ht=null,Jt=null,Vt=null,Bt=Object(S["a"])(Ft,zt,It,Mt,Ht,Jt,Vt),Zt=Bt.exports,Gt={props:["value","path"]},Wt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{attrs:{type:"number",required:e.path.required,min:e.path.min,max:e.path.max},domProps:{value:e.value},on:{input:function(t){e.$emit("input",Number(t.target.value))}}})},Xt=[],Yt=!1,Kt=null,Qt=null,en=null,tn=Object(S["a"])(Gt,Wt,Xt,Yt,Kt,Qt,en),nn=tn.exports,rn={props:["value","path"]},an=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{attrs:{type:"date",required:e.path.required},domProps:{value:e.value},on:{input:function(t){e.$emit("input",t.target.value)}}})},on=[],sn=!1,un=null,ln=null,cn=null,pn=Object(S["a"])(rn,an,on,sn,un,ln,cn),dn=pn.exports,hn={props:{value:String,path:Object},data:function(){return{options:[]}},created:function(){var e=c()(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,g(this.path.ref);case 2:this.options=e.sent;case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},fn=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("select",{on:{change:function(t){e.$emit("input",t.target.value)}}},[e.path.require?e._e():n("option"),e._l(e.options,function(t){return n("option",{key:t[0],domProps:{value:t[0],selected:t[0]===e.value}},[e._v("\n    "+e._s(t[1])+"\n  ")])})],2)},mn=[],vn=!1,_n=null,bn=null,gn=null,xn=Object(S["a"])(hn,fn,mn,vn,_n,bn,gn),wn=xn.exports,yn=(n("mJx5"),n("2247")),kn=n.n(yn),$n=(window.URL||window.webkitURL).createObjectURL||function(){return""},jn={inject:["preSave"],props:{value:{type:Array,default:function(){return[]}},path:Object},data:function(){return{files:[],conf:{}}},computed:{here:{get:function(){return this.value||[]},set:function(e){this.$emit("input",e)}},multiple:function(){return this.path.multiple}},created:function(){var e=c()(regeneratorRuntime.mark(function e(){var t,n,r=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:t=e.sent,n=t.conf.cloudinary,this.preSave.push(function(){return r.upload()}),this.conf=n;case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),methods:{show:function(){this.files=kn()(this.$refs.input.files,function(e){return{name:e.name,file:e,blob:$n(e)}}).concat(this.files)},del:function(e){var t=this.value[e];t.deleted=!t.deleted,this.here.splice(e,1,t)},upload:function(){var e=c()(regeneratorRuntime.mark(function e(){var t,n,r,a,i,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.conf&&this.files.length){e.next=2;break}return e.abrupt("return");case 2:t=this.conf,n=t.name,r=t.preset;case 3:if(!(a=this.files.pop())){e.next=13;break}return i=new FormData,i.append("upload_preset",r),i.append("file",a.file),e.next=9,fetch("https://api.cloudinary.com/v1_1/".concat(n,"/upload"),{method:"POST",body:i}).then(function(e){return e.json()});case 9:o=e.sent,o.error?console.error("upload error",o.error):(console.log("picture uploaded",o),this.$emit("input",[o].concat(this.here))),e.next=3;break;case 13:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),resize:function(e,t){var n=e.split("/");return n.splice(-2,0,"h_".concat(t,",c_scale")),n.join("/")}},components:{SortableList:F,SortableItem:z},directives:{handle:U["HandleDirective"]}},On=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.conf?n("div",[n("input",{ref:"input",staticStyle:{display:"none"},attrs:{type:"file",multiple:e.multiple,accept:"image/*",axis:"xy"},on:{change:e.show}}),e.multiple||!e.here.length&&!e.files.length?n("button",{staticClass:"other",on:{click:function(t){t.preventDefault(),e.$refs.input.click()}}},[e._v("\n      + "+e._s(e.___("Select Files"))+"\n    ")]):e._e(),e.files.length?n("button",{on:{click:function(t){return t.preventDefault(),e.upload(t)}}},[e._v("\n      ↑ "+e._s(e.___("Upload"))+"\n    ")]):e._e(),e.files.length?n("div",{staticClass:"pictures"},e._l(e.files,function(t,r){return n("div",{key:r,staticClass:"picture"},[n("img",{attrs:{src:t.blob,height:"120"}}),n("span",[n("a",{attrs:{href:"#",title:e.___("Delete")},on:{click:function(t){t.preventDefault(),e.files.splice(r,1)}}},[e._v("×")])])])})):e._e(),e.here.length?n("sortable-list",{staticClass:"pictures",attrs:{tag:"ul","use-drag-handle":!0},model:{value:e.here,callback:function(t){e.here=t},expression:"here"}},e._l(e.here,function(t,r){return n("sortable-item",{key:t.public_id,class:{picture:!0,deleted:t.deleted},attrs:{tag:"li",index:r}},[t.url?n("img",{attrs:{src:e.resize(t.url,120)}}):e._e(),n("span",[n("a",{directives:[{name:"handle",rawName:"v-handle"},{name:"show",rawName:"v-show",value:e.here.length>1,expression:"here.length > 1"}],attrs:{href:"#",title:e.___("Order")}},[e._v("↕")]),n("a",{staticClass:"reorder",attrs:{href:"#",title:e.___("Delete")},on:{click:function(t){t.preventDefault(),e.del(r)}}},[e._v("×")])])])})):e._e()],1):n("div",{staticClass:"error"},[e._v("\n      "+e._s(e.___("No Cloudinary Account."))+"\n  ")])])},Rn=[];function En(e){n("h5SD")}var Sn=!1,Dn=En,Cn=null,Nn=null,Pn=Object(S["a"])(jn,On,Rn,Sn,Dn,Cn,Nn),An=Pn.exports;function Ln(e){var t=e.field||(e.type||"obj").toLowerCase();return!1===e.editable?W:e.enum?Zt:e.ref?wn:"boolean"===t?Et:"array"===t?Ut:"textarea"===t?gt:"number"===t?nn:"date"===t?dn:"picture"===t?An:"string"===t?ct:"obj"}var qn=n("lGpV"),Tn=n.n(qn),Un={name:"obj",props:{value:Object,path:Object,errors:{type:Object,default:function(){return{}}}},methods:{matchField:Ln,capitalize:Tn.a}},Fn=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",e._l(e.path,function(t,r){return t.hide?e._e():n("tr",{key:r},[n("th",[e._v("\n      "+e._s(t.label||e.capitalize(r))+" "),t.required?n("span",{staticClass:"required",attrs:{title:"Required"}},[e._v("*")]):e._e()]),n("td",[n(e.matchField(t),{tag:"component",attrs:{path:t},model:{value:e.value[r],callback:function(t){e.$set(e.value,r,t)},expression:"value[name]"}}),e.errors[r]?n("span",{staticClass:"error"},[e._v("\n        "+e._s(e.errors[r].message)+"\n      ")]):e._e()],1)])}))},zn=[];function In(e){n("eNdL")}var Mn=!1,Hn=In,Jn=null,Vn=null,Bn=Object(S["a"])(Un,Fn,zn,Mn,Hn,Jn,Vn),Zn=Bn.exports;r["a"].component("obj",Zn),r["a"].use(o),r["a"].use(i.a,{singleton:!0,duration:5e3,position:"bottom-center",className:"toasted-amdin",action:{text:"×",onClick:function(e,t){t.goAway(0)}}}),Ve.afterEach(function(e,t){"create"===t.name&&"edit"===e.name||r["a"].toasted.clear()}),r["a"].config.productionTip=!1,new r["a"]({router:Ve,render:function(e){return e(tt)}}).$mount("#app")},Ns5s:function(e,t){},YCUa:function(e,t){},eNdL:function(e,t){},h5SD:function(e,t){},"v+LI":function(e,t){},wmkA:function(e,t){}},[0]);
//# sourceMappingURL=app.f5cb771f.js.map