"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9442],{16643:function(v,g,a){a.d(g,{B:function(){return d},CK:function(){return G},CS:function(){return C},EU:function(){return I},NF:function(){return W},PZ:function(){return k},SW:function(){return b},T2:function(){return f},TU:function(){return c},ZN:function(){return B},aJ:function(){return y},ir:function(){return L},jr:function(){return x},k:function(){return P},py:function(){return K},q9:function(){return _},rc:function(){return p},se:function(){return m},xY:function(){return S}});var t=a(78158),d=function(n){return t.Z.post("/cart/list",n)},C=function(n){return t.Z.post("/cart/add",n)},_=function(n){return t.Z.post("/cart/delete",n)},B=function(n){return t.Z.post("/cart/update",n)},y=function(n){return t.Z.post("/cart/order/add",n)},m=function(n){return t.Z.post("/cart/order/delete",n)},p=function(n){return t.Z.post("/cart/order/update",n)},f=function(n){return t.Z.post("/cart/order/list",n)},P=function(n){return t.Z.post("/cart/aftersale/add",n)},I=function(n){return t.Z.post("/cart/aftersale/delete",n)},c=function(n){return t.Z.post("/cart/aftersale/update",n)},L=function(n){return t.Z.post("/cart/aftersale/list",n)},K=function(n){return t.Z.post("/cart/banner/add",n)},x=function(n){return t.Z.post("/cart/banner/delete",n)},b=function(n){return t.Z.post("/cart/banner/update",n)},k=function(n){return t.Z.post("/cart/banner/list",n)},G=function(n){return t.Z.post("/cart/attendance/add",n)},S=function(n){return t.Z.post("/cart/attendance/update",n)},W=function(n){return t.Z.post("/cart/attendance/list",n)}},62367:function(v,g,a){a.d(g,{$_:function(){return K},CE:function(){return C},Gc:function(){return x},H4:function(){return I},Ie:function(){return $},LN:function(){return f},NJ:function(){return L},NS:function(){return S},PI:function(){return O},Ph:function(){return u},Ty:function(){return h},Vp:function(){return P},WC:function(){return G},WN:function(){return M},X0:function(){return W},XR:function(){return X},XV:function(){return _},Z2:function(){return p},Zz:function(){return D},_7:function(){return w},cH:function(){return y},dh:function(){return B},iO:function(){return T},jm:function(){return E},k0:function(){return H},lx:function(){return d},ml:function(){return R},nw:function(){return b},p8:function(){return m},qn:function(){return j},s9:function(){return F},su:function(){return k},ty:function(){return J},wR:function(){return c},x:function(){return n},y2:function(){return Z}});var t=a(78158),d=function(e){return t.Z.post("/pro/login",e)},C=function(e){return t.Z.post("/pro/gettoken",e)},_=function(e){return t.Z.post("/pro/resetpass",e)},B=function(e){return t.Z.post("/pro/uplodafile",e)},y=function(e){return t.Z.post("/pro/changeuserinfo",e)},m=function(){return t.Z.get("/pro/getuserinfo")},p=function(e){return t.Z.get("http://120.26.90.83:3000/captcha/sent",{params:e})},f=function(e){return t.Z.get("http://120.26.90.83:3000/captcha/verify",{params:e})},P=function(e){return t.Z.post("/pro/role/list",e)},I=function(e){return t.Z.post("/pro/role/add",e)},c=function(e){return t.Z.post("/pro/role/delete",e)},L=function(e){return t.Z.post("/pro/role/update",e)},K=function(e){return t.Z.post("/pro/user/list",e)},x=function(e){return t.Z.post("/pro/user/delete",e)},b=function(e){return t.Z.post("/pro/user/update",e)},k=function(e){return t.Z.post("/pro/user/create",e)},G=function(e){return t.Z.post("/pro/anno/type/update",e)},S=function(e){return t.Z.post("/pro/anno/type/add",e)},W=function(e){return t.Z.post("/pro/anno/type/delete",e)},u=function(e){return t.Z.post("/pro/anno/type/list",e)},n=function(e){return t.Z.post("/pro/cart/type/update",e)},h=function(e){return t.Z.post("/pro/cart/type/add",e)},F=function(e){return t.Z.post("/pro/cart/type/delete",e)},O=function(e){return t.Z.post("/pro/cart/type/list",e)},j=function(e){return t.Z.post("/pro/advise/type/update",e)},M=function(e){return t.Z.post("/pro/advise/type/add",e)},R=function(e){return t.Z.post("/pro/advise/type/delete",e)},D=function(e){return t.Z.post("/pro/advise/type/list",e)},E=function(e){return t.Z.post("/pro/anno/list",e)},T=function(e){return t.Z.post("/pro/anno/add",e)},w=function(e){return t.Z.post("/pro/anno/delete",e)},Z=function(e){return t.Z.post("/pro/anno/update",e)},H=function(e){return t.Z.post("/pro/advise/list",e)},$=function(e){return t.Z.post("/pro/advise/add",e)},J=function(e){return t.Z.post("/pro/advise/delete",e)},X=function(e){return t.Z.post("/pro/advise/update",e)},Y=function(e){return request.post("/pro/advise/detail",e)}},31255:function(v,g,a){a.r(g),a.d(g,{default:function(){return W}});var t=a(15009),d=a.n(t),C=a(99289),_=a.n(C),B=a(5574),y=a.n(B),m=a(16643),p=a(67294),f=a(71577),P=a(88484),I=a(62367),c=a(85893),L=function(n){var h=n.value,F=n.onChange,O=(0,p.useRef)(),j=function(){var M=_()(d()().mark(function R(){var D,E,T;return d()().wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:return D=O.current.files[0],E=new FormData,E.append("file",D),console.log(E),Z.next=6,(0,I.dh)(E);case 6:T=Z.sent,T.code==200&&F(T.path);case 8:case"end":return Z.stop()}},R)}));return function(){return M.apply(this,arguments)}}();return(0,c.jsxs)("div",{children:[(0,c.jsx)("input",{type:"file",onChange:j,defaultFileList:h,style:{display:"none"},ref:O}),(0,c.jsx)(f.ZP,{icon:(0,c.jsx)(P.Z,{}),type:"text",onClick:function(){return O.current.click()}})]})},K=L,x=a(15370),b=a(50727),k=a(86615),G=function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:100;return new Promise(function(h){setTimeout(function(){h(!0)},n)})},S=function(){var n=(0,p.useState)([]),h=y()(n,2),F=h[0],O=h[1],j=(0,p.useState)([]),M=y()(j,2),R=M[0],D=M[1],E=(0,p.useState)("bottom"),T=y()(E,2),w=T[0],Z=T[1],H=[{title:"\u56FE\u7247",dataIndex:"path",valueType:"image",tooltip:"\u53EA\u8BFB\uFF0C\u4F7F\u7528form.getFieldValue\u83B7\u53D6\u4E0D\u5230\u503C",readonly:!0,formItemProps:function(s,i){var l=i.rowIndex;return{rules:l>1?[{required:!0,message:"\u6B64\u9879\u4E3A\u5FC5\u586B\u9879"}]:[]}},width:"10%"},{title:"\u56FE\u7247\u5730\u5740",width:"20%",dataIndex:"path",renderFormItem:function(){return(0,c.jsx)(K,{})}},{title:"\u56FE\u7247\u94FE\u63A5",dataIndex:"link",tooltip:"\u53EA\u8BFB\uFF0C\u4F7F\u7528form.getFieldValue\u53EF\u4EE5\u83B7\u53D6\u5230\u503C",width:"15%"},{title:"\u72B6\u6001",key:"state",dataIndex:"state",valueType:"select",valueEnum:{true:{text:"\u5C55\u793A",status:"Error"},flase:{text:"\u9690\u85CF",status:"Success"}},width:"10%"},{title:"\u56FE\u7247\u63CF\u8FF0",dataIndex:"desc",fieldProps:function(s,i){var l=i.rowKey,N=i.rowIndex;return s.getFieldValue([l||"","title"])==="\u4E0D\u597D\u73A9"?{disabled:!0}:N>9?{disabled:!0}:{}}},{title:"\u6DFB\u52A0\u65F6\u95F4\u65F6\u95F4",dataIndex:"time",valueType:"date",readonly:!0,width:"15%"},{title:"\u64CD\u4F5C",valueType:"option",width:200,render:function(s,i,l,N){return[(0,c.jsx)("a",{onClick:function(){var U,z;console.log(111),(U=$.current)===null||U===void 0||(z=U.startEditable)===null||z===void 0||z.call(U,i==null?void 0:i.id),r(!0)},children:"\u7F16\u8F91"},"editable"),(0,c.jsx)("a",{onClick:_()(d()().mark(function o(){var U;return d()().wrap(function(V){for(;;)switch(V.prev=V.next){case 0:return D(R.filter(function(q){return q.id!==(i==null?void 0:i.id)})),V.next=3,(0,m.jr)({_id:i==null?void 0:i._id});case 3:U=V.sent,U.code==200&&(0,x.PE)("\u5220\u9664\u6210\u529F");case 5:case"end":return V.stop()}},o)})),children:"\u5220\u9664"},"delete")]}}],$=(0,p.useRef)(),J=(0,p.useState)(!1),X=y()(J,2),Y=X[0],r=X[1],e=function(){var A=_()(d()().mark(function s(i){var l;return d()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,(0,m.py)(i);case 2:l=o.sent,l.code==200&&$.current.reload();case 4:case"end":return o.stop()}},s)}));return function(i){return A.apply(this,arguments)}}(),Q=function(){var A=_()(d()().mark(function s(i){var l;return d()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,(0,m.SW)(i);case 2:l=o.sent,l.code==200&&((0,x.PE)("\u66F4\u65B0\u6210\u529F"),r(!1));case 4:case"end":return o.stop()}},s)}));return function(i){return A.apply(this,arguments)}}();return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(b.Z,{rowKey:"id",maxLength:5,actionRef:$,scroll:{x:960},recordCreatorProps:w!=="hidden"?{position:w,record:function(){return{id:(Math.random()*1e6).toFixed(0)}}}:!1,loading:!1,toolBarRender:function(){return[(0,c.jsx)(k.Z.Group,{fieldProps:{value:w,onChange:function(i){return Z(i.target.value)}},options:[{label:"\u6DFB\u52A0\u5230\u9876\u90E8",value:"top"},{label:"\u6DFB\u52A0\u5230\u5E95\u90E8",value:"bottom"}]},"render")]},columns:H,request:function(){var A=_()(d()().mark(function s(i){var l;return d()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,(0,m.PZ)(i);case 2:if(l=o.sent,l.code!=200){o.next=5;break}return o.abrupt("return",{data:l.result});case 5:case"end":return o.stop()}},s)}));return function(s){return A.apply(this,arguments)}}(),value:R,onChange:D,editable:{type:"multiple",editableKeys:F,onSave:function(s,i,l){console.log(s),console.log(Y),Y?Q(i):e(i)},onChange:function(s){O(s)}}})})},W=S},15370:function(v,g,a){a.d(g,{AU:function(){return m},Ob:function(){return _},PE:function(){return C}});var t=a(27790),d=a(36147),C=function(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"\u6210\u529F";t.ZP.destroy(),t.ZP.success({content:f,duration:1.5})},_=function(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"\u5931\u8D25";t.ZP.destroy(),t.ZP.error({content:f,duration:1.5})},B=function(){message.destroy(),message.loading({content:"\u52A0\u8F7D\u4E2D",duration:1.5})},y=function(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"\u63D0\u793A";message.destroy(),message.info({content:f,duration:1.5})},m=function(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"\u662F\u5426\u64CD\u4F5C",P=arguments.length>1?arguments[1]:void 0;d.Z.confirm({title:"\u53CB\u60C5\u63D0\u793A",content:f,okText:"\u786E\u8BA4",okType:"danger",cancelText:"\u53D6\u6D88",onOk:function(){P()}})}},78158:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{v:function(){return baseURL}});var axios__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(6154),_message__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(15370),umi__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(82188),baseURL="http://admin.xilemi.me:3333";axios__WEBPACK_IMPORTED_MODULE_0__.Z.defaults.baseURL="http://admin.xilemi.me:3333",axios__WEBPACK_IMPORTED_MODULE_0__.Z.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",axios__WEBPACK_IMPORTED_MODULE_0__.Z.interceptors.request.use(function(config){var token=eval(localStorage.getItem("token")),reg=/(login|register|maizuo|captcha)/g;return reg.test(config.url)||(config.headers.token=token),config},function(v){return(0,_message__WEBPACK_IMPORTED_MODULE_2__.Ob)(v.msg)}),axios__WEBPACK_IMPORTED_MODULE_0__.Z.interceptors.response.use(function(v){var g=v.data,a=g.code,t=g.msg;return a==200?((0,_message__WEBPACK_IMPORTED_MODULE_2__.PE)(t),v.data):(a==3001?(umi__WEBPACK_IMPORTED_MODULE_1__.m8.replace("/login"),(0,_message__WEBPACK_IMPORTED_MODULE_2__.Ob)("\u8BF7\u767B\u5F55")):(0,_message__WEBPACK_IMPORTED_MODULE_2__.Ob)(t),v.data)},function(v){return(0,_message__WEBPACK_IMPORTED_MODULE_2__.Ob)(v.msg)}),__webpack_exports__.Z=axios__WEBPACK_IMPORTED_MODULE_0__.Z}}]);