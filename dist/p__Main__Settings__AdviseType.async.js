"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3024],{62367:function(b,O,t){t.d(O,{$_:function(){return f},CE:function(){return B},Gc:function(){return S},H4:function(){return W},Ie:function(){return i},LN:function(){return c},NJ:function(){return $},NS:function(){return p},PI:function(){return o},Ph:function(){return M},Ty:function(){return R},Vp:function(){return U},WC:function(){return m},WN:function(){return w},X0:function(){return Z},XR:function(){return _},XV:function(){return d},Z2:function(){return g},Zz:function(){return V},_7:function(){return l},cH:function(){return u},dh:function(){return C},iO:function(){return F},jm:function(){return J},k0:function(){return A},lx:function(){return a},ml:function(){return N},nw:function(){return G},p8:function(){return j},qn:function(){return k},s9:function(){return z},su:function(){return T},ty:function(){return K},wR:function(){return H},x:function(){return x},y2:function(){return E}});var r=t(78158),a=function(e){return r.Z.post("/pro/login",e)},B=function(e){return r.Z.post("/pro/gettoken",e)},d=function(e){return r.Z.post("/pro/resetpass",e)},C=function(e){return r.Z.post("/pro/uplodafile",e)},u=function(e){return r.Z.post("/pro/changeuserinfo",e)},j=function(){return r.Z.get("/pro/getuserinfo")},g=function(e){return r.Z.get("http://120.26.90.83:3000/captcha/sent",{params:e})},c=function(e){return r.Z.get("http://120.26.90.83:3000/captcha/verify",{params:e})},U=function(e){return r.Z.post("/pro/role/list",e)},W=function(e){return r.Z.post("/pro/role/add",e)},H=function(e){return r.Z.post("/pro/role/delete",e)},$=function(e){return r.Z.post("/pro/role/update",e)},f=function(e){return r.Z.post("/pro/user/list",e)},S=function(e){return r.Z.post("/pro/user/delete",e)},G=function(e){return r.Z.post("/pro/user/update",e)},T=function(e){return r.Z.post("/pro/user/create",e)},m=function(e){return r.Z.post("/pro/anno/type/update",e)},p=function(e){return r.Z.post("/pro/anno/type/add",e)},Z=function(e){return r.Z.post("/pro/anno/type/delete",e)},M=function(e){return r.Z.post("/pro/anno/type/list",e)},x=function(e){return r.Z.post("/pro/cart/type/update",e)},R=function(e){return r.Z.post("/pro/cart/type/add",e)},z=function(e){return r.Z.post("/pro/cart/type/delete",e)},o=function(e){return r.Z.post("/pro/cart/type/list",e)},k=function(e){return r.Z.post("/pro/advise/type/update",e)},w=function(e){return r.Z.post("/pro/advise/type/add",e)},N=function(e){return r.Z.post("/pro/advise/type/delete",e)},V=function(e){return r.Z.post("/pro/advise/type/list",e)},J=function(e){return r.Z.post("/pro/anno/list",e)},F=function(e){return r.Z.post("/pro/anno/add",e)},l=function(e){return r.Z.post("/pro/anno/delete",e)},E=function(e){return r.Z.post("/pro/anno/update",e)},A=function(e){return r.Z.post("/pro/advise/list",e)},i=function(e){return r.Z.post("/pro/advise/add",e)},K=function(e){return r.Z.post("/pro/advise/delete",e)},_=function(e){return r.Z.post("/pro/advise/update",e)},X=function(e){return request.post("/pro/advise/detail",e)}},45087:function(b,O,t){var r=t(5574),a=t.n(r),B=t(37476),d=t(638),C=t(67294),u=t(85893),j=function(c,U){var W=c.title,H=W===void 0?"\u6807\u9898":W,$=c.children,f=c.confirm;(0,C.useImperativeHandle)(U,function(){return{setOpen:M,form:T,setId:o,id:z}});var S=d.Z.useForm(),G=a()(S,1),T=G[0],m=(0,C.useState)(!1),p=a()(m,2),Z=p[0],M=p[1],x=(0,C.useState)(""),R=a()(x,2),z=R[0],o=R[1];return(0,u.jsx)("div",{children:(0,u.jsx)(B.Y,{title:H,form:T,open:Z,autoFocusFirstInput:!0,width:500,modalProps:{destroyOnClose:!0,onCancel:function(){return M(!1)}},onFinish:function(w){f(w),M(!1)},children:$})})};O.Z=(0,C.forwardRef)(j)},32877:function(b,O,t){var r=t(15009),a=t.n(r),B=t(99289),d=t.n(B),C=t(19911),u=t.n(C),j=t(72004),g=t.n(j),c=t(12444),U=t.n(c),W=t(9783),H=t.n(W),$=t(65371),f=t.n($),S=t(45966),G=t.n(S),T=t(62367),m=t(68949),p,Z,M,x,R,z,o,k,w,N,V,J,F=(p=g()(function l(){U()(this,l),u()(this,"info",Z,this),u()(this,"roles",M,this),u()(this,"typeAnno",x,this),u()(this,"typeAdvise",R,this),u()(this,"typeCart",z,this),u()(this,"updataInfo",o,this),u()(this,"updataTypeAnno",k,this),u()(this,"updataTypeAdvise",w,this),u()(this,"updataCartType",N,this),u()(this,"updataRoles",V,this),u()(this,"updataInfoSync",J,this),(0,m.rC)(this)}),Z=f()(p.prototype,"info",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),M=f()(p.prototype,"roles",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),x=f()(p.prototype,"typeAnno",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),R=f()(p.prototype,"typeAdvise",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),z=f()(p.prototype,"typeCart",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),o=f()(p.prototype,"updataInfo",[m.aD],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var E=this;return d()(a()().mark(function A(){var i;return a()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,(0,T.p8)();case 2:i=_.sent,i.code==200&&(E.info=i.result);case 4:case"end":return _.stop()}},A)}))}}),k=f()(p.prototype,"updataTypeAnno",[m.aD],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var E=this;return d()(a()().mark(function A(){var i;return a()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,(0,T.Ph)();case 2:i=_.sent,i.code==200&&(E.typeAnno=i.result);case 4:case"end":return _.stop()}},A)}))}}),w=f()(p.prototype,"updataTypeAdvise",[m.aD],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var E=this;return d()(a()().mark(function A(){var i;return a()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,(0,T.Zz)();case 2:i=_.sent,i.code==200&&(E.typeAdvise=i.result);case 4:case"end":return _.stop()}},A)}))}}),N=f()(p.prototype,"updataCartType",[m.aD],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var E=this;return d()(a()().mark(function A(){var i;return a()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,(0,T.PI)();case 2:i=_.sent,i.code==200&&(E.typeCart=i.result);case 4:case"end":return _.stop()}},A)}))}}),V=f()(p.prototype,"updataRoles",[m.aD],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var E=this;return d()(a()().mark(function A(){var i;return a()().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,(0,T.Vp)();case 2:i=_.sent,i.code==200&&(i.result.forEach(function(X){var n;((n=E.info)===null||n===void 0?void 0:n.role)>X.value?X.disabled=!1:X.disabled=!0}),E.roles=i.result);case 4:case"end":return _.stop()}},A)}))}}),J=f()(p.prototype,"updataInfoSync",[m.aD],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){var E=this;return function(A){E.info=A}}}),p);O.Z=new F},55192:function(b,O,t){t.r(O);var r=t(97857),a=t.n(r),B=t(15009),d=t.n(B),C=t(99289),u=t.n(C),j=t(5574),g=t.n(j),c=t(67294),U=t(5966),W=t(56981),H=t(638),$=t(80417),f=t(24969),S=t(89705),G=t(1443),T=t(42075),m=t(71577),p=t(85418),Z=t(45087),M=t(62367),x=t(15370),R=t(84851),z=t(32877),o=t(85893),k=function(){var N=H.Z.useForm(),V=g()(N,1),J=V[0],F=(0,c.useRef)(),l=(0,c.useRef)(),E=(0,c.useState)(!0),A=g()(E,2),i=A[0],K=A[1],_=z.Z.updataRoles,X=function(){var I=u()(d()().mark(function D(s){var h,v;return d()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,(0,M.WN)(s);case 2:h=P.sent,h.code==200&&((v=F.current)===null||v===void 0||v.reload(),_());case 4:case"end":return P.stop()}},D)}));return function(s){return I.apply(this,arguments)}}(),n=function(D){var s,h,v;(s=l.current)===null||s===void 0||s.setOpen(!0),(h=l.current)===null||h===void 0||h.form.setFieldsValue(D),(v=l.current)===null||v===void 0||v.setId(D._id),K(!1)},e=function(){var I=u()(d()().mark(function D(s){var h,v;return d()().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return P.next=2,(0,M.qn)(a()(a()({},s),{},{_id:l.current.id}));case 2:h=P.sent,h.code==200&&((v=F.current)===null||v===void 0||v.reload(),_());case 4:case"end":return P.stop()}},D)}));return function(s){return I.apply(this,arguments)}}(),q=[{title:"\u5E8F\u53F7",dataIndex:"index",valueType:"indexBorder",width:48},{title:"\u5EFA\u8BAE\u7C7B\u578B",dataIndex:"label",copyable:!0,ellipsis:!0,search:!0,tip:"\u6807\u9898\u8FC7\u957F\u4F1A\u81EA\u52A8\u6536\u7F29",formItemProps:{rules:[{required:!0,message:"\u6B64\u9879\u4E3A\u5FC5\u586B\u9879"}]}},{disable:!0,title:"\u5EFA\u8BAE\u7B49\u7EA7",dataIndex:"value",search:!0,sorter:!0},{disable:!0,title:"\u5EFA\u8BAE\u5C5E\u6027",dataIndex:"color",search:!1,render:function(D,s,h,v){return(0,o.jsxs)(T.Z,{children:[(0,o.jsx)($.Z,{value:s==null?void 0:s.color,disabled:!0}),s==null?void 0:s.color]},s._id)}},{title:"\u64CD\u4F5C",valueType:"option",key:"option",render:function(D,s,h,v){return[(0,o.jsx)("a",{onClick:function(){(0,x.AU)("\u662F\u5426\u5220\u9664",u()(d()().mark(function P(){var L,Q;return d()().wrap(function(Y){for(;;)switch(Y.prev=Y.next){case 0:return Y.next=2,(0,M.ml)({_id:s._id});case 2:L=Y.sent,L.code==200&&((Q=F.current)===null||Q===void 0||Q.reload());case 4:case"end":return Y.stop()}},P)})))},children:"\u5220\u9664"},s._id),(0,o.jsx)("a",{onClick:function(){return n(s)},children:"\u4FEE\u6539"},s.value)]}}];return(0,o.jsxs)("div",{children:[(0,o.jsxs)(Z.Z,{ref:l,title:i?"\u6DFB\u52A0\u5EFA\u8BAE\u7C7B\u578B":"\u4FEE\u6539\u5EFA\u8BAE\u7C7B\u578B",confirm:i?X:e,children:[(0,o.jsx)(U.Z,{name:"label",label:"\u5EFA\u8BAE\u7C7B\u578B",rules:[{required:!0,message:"\u8BF7\u586B\u5199"}]}),(0,o.jsx)(U.Z,{name:"value",label:"\u5EFA\u8BAE\u7B49\u7EA7",rules:[{pattern:/\d/,message:"\u5EFA\u8BAE\u7B49\u7EA7\u53EA\u80FD\u662F\u6570\u5B57"},{required:!0,message:"\u8BF7\u586B\u5199"}]}),(0,o.jsx)(W.Z,{name:"color",label:"\u5EFA\u8BAE\u5C5E\u6027",rules:[{required:!0,message:"\u8BF7\u586B\u5199"}],initialValue:"red"})]}),(0,o.jsx)(G.Z,{columns:q,actionRef:F,cardBordered:!0,request:u()(d()().mark(function I(){var D,s,h,v,y=arguments;return d()().wrap(function(L){for(;;)switch(L.prev=L.next){case 0:return D=y.length>0&&y[0]!==void 0?y[0]:{},s=y.length>1?y[1]:void 0,h=y.length>2?y[2]:void 0,L.next=5,(0,M.Zz)(a()(a()({},D),{},{sort:s.value=="ascend"?1:-1}));case 5:if(v=L.sent,v.code!=200){L.next=8;break}return L.abrupt("return",{data:v.result});case 8:case"end":return L.stop()}},I)})),editable:{type:"multiple"},columnsState:{persistenceKey:"pro-table-singe-demos",persistenceType:"localStorage",onChange:function(D){}},rowKey:"_id",search:{labelWidth:"auto"},options:{setting:{listsHeight:400}},form:{},pagination:{pageSize:5},dateFormatter:"string",headerTitle:"\u9AD8\u7EA7\u8868\u683C",toolBarRender:function(){return[(0,o.jsx)(m.ZP,{icon:(0,o.jsx)(f.Z,{}),onClick:function(){l.current.setOpen(!0),K(!0)},type:"primary",children:"\u65B0\u5EFA"},"button"),(0,o.jsx)(p.Z,{menu:{items:[{label:"1st item",key:"1"},{label:"2nd item",key:"2"},{label:"3rd item",key:"3"}]},children:(0,o.jsx)(m.ZP,{children:(0,o.jsx)(S.Z,{})})},"menu")]}})]})};O.default=(0,R.f3)("UserInfo")((0,R.Pi)(k))},15370:function(b,O,t){t.d(O,{AU:function(){return j},Ob:function(){return d},PE:function(){return B}});var r=t(27790),a=t(36147),B=function(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"\u6210\u529F";r.ZP.destroy(),r.ZP.success({content:c,duration:1.5})},d=function(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"\u5931\u8D25";r.ZP.destroy(),r.ZP.error({content:c,duration:1.5})},C=function(){message.destroy(),message.loading({content:"\u52A0\u8F7D\u4E2D",duration:1.5})},u=function(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"\u63D0\u793A";message.destroy(),message.info({content:c,duration:1.5})},j=function(){var c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"\u662F\u5426\u64CD\u4F5C",U=arguments.length>1?arguments[1]:void 0;a.Z.confirm({title:"\u53CB\u60C5\u63D0\u793A",content:c,okText:"\u786E\u8BA4",okType:"danger",cancelText:"\u53D6\u6D88",onOk:function(){U()}})}},78158:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{v:function(){return baseURL}});var axios__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(6154),_message__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(15370),umi__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(82188),baseURL="http://admin.xilemi.me:3333";axios__WEBPACK_IMPORTED_MODULE_0__.Z.defaults.baseURL="http://admin.xilemi.me:3333",axios__WEBPACK_IMPORTED_MODULE_0__.Z.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",axios__WEBPACK_IMPORTED_MODULE_0__.Z.interceptors.request.use(function(config){var token=eval(localStorage.getItem("token")),reg=/(login|register|maizuo|captcha)/g;return reg.test(config.url)||(config.headers.token=token),config},function(b){return(0,_message__WEBPACK_IMPORTED_MODULE_2__.Ob)(b.msg)}),axios__WEBPACK_IMPORTED_MODULE_0__.Z.interceptors.response.use(function(b){var O=b.data,t=O.code,r=O.msg;return t==200?((0,_message__WEBPACK_IMPORTED_MODULE_2__.PE)(r),b.data):(t==3001?(umi__WEBPACK_IMPORTED_MODULE_1__.m8.replace("/login"),(0,_message__WEBPACK_IMPORTED_MODULE_2__.Ob)("\u8BF7\u767B\u5F55")):(0,_message__WEBPACK_IMPORTED_MODULE_2__.Ob)(r),b.data)},function(b){return(0,_message__WEBPACK_IMPORTED_MODULE_2__.Ob)(b.msg)}),__webpack_exports__.Z=axios__WEBPACK_IMPORTED_MODULE_0__.Z}}]);
