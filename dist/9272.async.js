"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9272],{88484:function(te,I,n){n.d(I,{Z:function(){return A}});var m=n(87462),T=n(67294),y={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"}}]},name:"upload",theme:"outlined"},g=y,B=n(84089),o=function(L,W){return T.createElement(B.Z,(0,m.Z)({},L,{ref:W,icon:g}))},A=T.forwardRef(o)},86615:function(te,I,n){var m=n(1413),T=n(91),y=n(22270),g=n(55742),B=n(67294),o=n(90789),A=n(80209),U=n(85893),L=["fieldProps","options","radioType","layout","proFieldProps","valueEnum"],W=B.forwardRef(function(f,x){var V=f.fieldProps,R=f.options,J=f.radioType,c=f.layout,X=f.proFieldProps,p=f.valueEnum,u=(0,T.Z)(f,L);return(0,U.jsx)(A.Z,(0,m.Z)((0,m.Z)({valueType:J==="button"?"radioButton":"radio",ref:x,valueEnum:(0,y.h)(p,void 0)},u),{},{fieldProps:(0,m.Z)({options:R,layout:c},V),proFieldProps:X,filedConfig:{customLightMode:!0}}))}),H=B.forwardRef(function(f,x){var V=f.fieldProps,R=f.children;return(0,U.jsx)(g.ZP,(0,m.Z)((0,m.Z)({},V),{},{ref:x,children:R}))}),Q=(0,o.G)(H,{valuePropName:"checked",ignoreWidth:!0}),K=Q;K.Group=W,K.Button=g.ZP.Button,K.displayName="ProFormComponent",I.Z=K},50727:function(te,I,n){var m=n(4942),T=n(97685),y=n(91),g=n(74165),B=n(15861),o=n(1413),A=n(24969),U=n(97462),L=n(952),W=n(89451),H=n(22270),Q=n(48171),K=n(60249),f=n(71577),x=n(638),V=n(21770),R=n(88306),J=n(8880),c=n(67294),X=n(30939),p=n(1443),u=n(85893),ve=["onTableChange","maxLength","formItemProps","recordCreatorProps","rowKey","controlled","defaultValue","onChange","editableFormRef"],_e=["record","position","creatorButtonText","newRecordType","parentKey","style"],re=c.createContext(void 0);function ae(e){var E=e.children,b=e.record,j=e.position,F=e.newRecordType,P=e.parentKey,$=(0,c.useContext)(re);return c.cloneElement(E,(0,o.Z)((0,o.Z)({},E.props),{},{onClick:function(){var S=(0,B.Z)((0,g.Z)().mark(function k(q){var z,Y,D,M;return(0,g.Z)().wrap(function(_){for(;;)switch(_.prev=_.next){case 0:return _.next=2,(z=(Y=E.props).onClick)===null||z===void 0?void 0:z.call(Y,q);case 2:if(M=_.sent,M!==!1){_.next=5;break}return _.abrupt("return");case 5:$==null||(D=$.current)===null||D===void 0||D.addEditRecord(b,{position:j,newRecordType:F,parentKey:P});case 6:case"end":return _.stop()}},k)}));function O(k){return S.apply(this,arguments)}return O}()}))}function oe(e){var E,b,j=(0,W.YB)(),F=e.onTableChange,P=e.maxLength,$=e.formItemProps,S=e.recordCreatorProps,O=e.rowKey,k=e.controlled,q=e.defaultValue,z=e.onChange,Y=e.editableFormRef,D=(0,y.Z)(e,ve),M=(0,c.useRef)(void 0),w=(0,c.useRef)(),_=(0,c.useRef)();(0,c.useImperativeHandle)(D.actionRef,function(){return w.current},[w.current]);var se=(0,V.Z)(function(){return e.value||q||[]},{value:e.value,onChange:e.onChange}),ie=(0,T.Z)(se,2),i=ie[0],ce=ie[1],C=c.useMemo(function(){return typeof O=="function"?O:function(v,t){return v[O]||t}},[O]),de=function(t){if(typeof t=="number"&&!e.name){if(t>=i.length)return t;var r=i&&i[t];return C==null?void 0:C(r,t)}if((typeof t=="string"||t>=i.length)&&e.name){var a=i.findIndex(function(l,d){var s;return(C==null||(s=C(l,d))===null||s===void 0?void 0:s.toString())===(t==null?void 0:t.toString())});if(a!==-1)return a}return t};(0,c.useImperativeHandle)(Y,function(){var v=function(a){var l,d;if(a==null)throw new Error("rowIndex is required");var s=de(a),h=[e.name,(l=s==null?void 0:s.toString())!==null&&l!==void 0?l:""].flat(1).filter(Boolean);return(d=_.current)===null||d===void 0?void 0:d.getFieldValue(h)},t=function(){var a,l=[e.name].flat(1).filter(Boolean);if(Array.isArray(l)&&l.length===0){var d,s=(d=_.current)===null||d===void 0?void 0:d.getFieldsValue();return Array.isArray(s)?s:Object.keys(s).map(function(h){return s[h]})}return(a=_.current)===null||a===void 0?void 0:a.getFieldValue(l)};return(0,o.Z)((0,o.Z)({},_.current),{},{getRowData:v,getRowsData:t,setRowData:function(a,l){var d,s;if(a==null)throw new Error("rowIndex is required");var h=de(a),G=[e.name,(d=h==null?void 0:h.toString())!==null&&d!==void 0?d:""].flat(1).filter(Boolean),De=Object.assign({},(0,o.Z)((0,o.Z)({},v(a)),l||{})),Me=(0,J.Z)({},G,De);return(s=_.current)===null||s===void 0||s.setFieldsValue(Me),!0}})},[e.name,_.current]),(0,c.useEffect)(function(){e.controlled&&i.forEach(function(v,t){var r;(r=_.current)===null||r===void 0||r.setFieldsValue((0,m.Z)({},C(v,t),v))},{})},[(0,X.P)(i),e.controlled]),(0,c.useEffect)(function(){if(e.name){var v;_.current=e==null||(v=e.editable)===null||v===void 0?void 0:v.form}},[(E=e.editable)===null||E===void 0?void 0:E.form,e.name]);var Z=S||{},fe=Z.record,ee=Z.position,me=Z.creatorButtonText,Ee=Z.newRecordType,he=Z.parentKey,Pe=Z.style,ge=(0,y.Z)(Z,_e),ue=ee==="top",N=(0,c.useMemo)(function(){return typeof P=="number"&&P<=(i==null?void 0:i.length)?!1:S!==!1&&(0,u.jsx)(ae,{record:(0,H.h)(fe,i==null?void 0:i.length,i)||{},position:ee,parentKey:(0,H.h)(he,i==null?void 0:i.length,i),newRecordType:Ee,children:(0,u.jsx)(f.ZP,(0,o.Z)((0,o.Z)({type:"dashed",style:(0,o.Z)({display:"block",margin:"10px 0",width:"100%"},Pe),icon:(0,u.jsx)(A.Z,{})},ge),{},{children:me||j.getMessage("editableTable.action.add","\u6DFB\u52A0\u4E00\u884C\u6570\u636E")}))})},[S,P,i==null?void 0:i.length]),Re=(0,c.useMemo)(function(){return N?ue?{components:{header:{wrapper:function(t){var r,a=t.className,l=t.children;return(0,u.jsxs)("thead",{className:a,children:[l,(0,u.jsxs)("tr",{style:{position:"relative"},children:[(0,u.jsx)("td",{colSpan:0,style:{visibility:"hidden"},children:N}),(0,u.jsx)("td",{style:{position:"absolute",left:0,width:"100%"},colSpan:(r=D.columns)===null||r===void 0?void 0:r.length,children:N})]})]})}}}}:{tableViewRender:function(t,r){var a,l;return(0,u.jsxs)(u.Fragment,{children:[(a=(l=e.tableViewRender)===null||l===void 0?void 0:l.call(e,t,r))!==null&&a!==void 0?a:r,N]})}}:{}},[ue,N]),ne=(0,o.Z)({},e.editable),Oe=(0,Q.J)(function(v,t){var r,a,l;if((r=e.editable)===null||r===void 0||(a=r.onValuesChange)===null||a===void 0||a.call(r,v,t),(l=e.onValuesChange)===null||l===void 0||l.call(e,t,v),e.controlled){var d;e==null||(d=e.onChange)===null||d===void 0||d.call(e,t)}});return(e!=null&&e.onValuesChange||(b=e.editable)!==null&&b!==void 0&&b.onValuesChange||e.controlled&&e!==null&&e!==void 0&&e.onChange)&&(ne.onValuesChange=Oe),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(re.Provider,{value:w,children:(0,u.jsx)(p.Z,(0,o.Z)((0,o.Z)((0,o.Z)({search:!1,options:!1,pagination:!1,rowKey:O,revalidateOnFocus:!1},D),Re),{},{tableLayout:"fixed",actionRef:w,onChange:F,editable:(0,o.Z)((0,o.Z)({},ne),{},{formProps:(0,o.Z)({formRef:_},ne.formProps)}),dataSource:i,onDataSourceChange:function(t){if(ce(t),e.name&&ee==="top"){var r,a=(0,J.Z)({},[e.name].flat(1).filter(Boolean),t);(r=_.current)===null||r===void 0||r.setFieldsValue(a)}}}))}),e.name?(0,u.jsx)(U.Z,{name:[e.name],children:function(t){var r,a;if(!M.current)return M.current=i,null;var l=(0,R.Z)(t,[e.name].flat(1)),d=l==null?void 0:l.find(function(s,h){var G;return!(0,K.A)(s,(G=M.current)===null||G===void 0?void 0:G[h])});return M.current=i,d&&(e==null||(r=e.editable)===null||r===void 0||(a=r.onValuesChange)===null||a===void 0||a.call(r,d,l)),null}}):null]})}function le(e){var E=L.ZP.useFormInstance();return e.name?(0,u.jsx)(x.Z.Item,(0,o.Z)((0,o.Z)({style:{maxWidth:"100%"}},e==null?void 0:e.formItemProps),{},{name:e.name,shouldUpdate:function(j,F){var P=[e.name].flat(1);try{return JSON.stringify((0,R.Z)(j,P))!==JSON.stringify((0,R.Z)(F,P))}catch($){return!0}},children:(0,u.jsx)(oe,(0,o.Z)((0,o.Z)({},e),{},{editable:(0,o.Z)((0,o.Z)({},e.editable),{},{form:E})}))})):(0,u.jsx)(oe,(0,o.Z)({},e))}le.RecordCreator=ae,I.Z=le}}]);