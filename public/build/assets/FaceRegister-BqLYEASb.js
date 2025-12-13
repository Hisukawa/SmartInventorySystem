import{r as l,j as m,a as C}from"./app-BWzSyj8G.js";import{n as A,d as Z,T as J}from"./FaceMatcher-uHkuQCPQ.js";import{B as M}from"./button-BMMGJcVK.js";import{C as Q,b as X,c as G,a as ee}from"./card-DQypWzJt.js";import{F as te,a as ae}from"./XMarkIcon-DNN1yQYs.js";import"./index-BHHCfyIS.js";import"./utils-CBfrqCZ4.js";let re={data:""},se=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||re},oe=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ie=/\/\*[^]*?\*\/|  +/g,_=/\n+/g,w=(e,t)=>{let a="",s="",o="";for(let i in e){let r=e[i];i[0]=="@"?i[1]=="i"?a=i+" "+r+";":s+=i[1]=="f"?w(r,i):i+"{"+w(r,i[1]=="k"?"":t)+"}":typeof r=="object"?s+=w(r,t?t.replace(/([^,])+/g,n=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,n):n?n+" "+c:c)):i):r!=null&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=w.p?w.p(i,r):i+":"+r+";")}return a+(t&&o?t+"{"+o+"}":o)+s},x={},H=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+H(e[a]);return t}return e},ne=(e,t,a,s,o)=>{let i=H(e),r=x[i]||(x[i]=(c=>{let p=0,f=11;for(;p<c.length;)f=101*f+c.charCodeAt(p++)>>>0;return"go"+f})(i));if(!x[r]){let c=i!==e?e:(p=>{let f,u,d=[{}];for(;f=oe.exec(p.replace(ie,""));)f[4]?d.shift():f[3]?(u=f[3].replace(_," ").trim(),d.unshift(d[0][u]=d[0][u]||{})):d[0][f[1]]=f[2].replace(_," ").trim();return d[0]})(e);x[r]=w(o?{["@keyframes "+r]:c}:c,a?"":"."+r)}let n=a&&x.g?x.g:null;return a&&(x.g=x[r]),((c,p,f,u)=>{u?p.data=p.data.replace(u,c):p.data.indexOf(c)===-1&&(p.data=f?c+p.data:p.data+c)})(x[r],t,s,n),r},le=(e,t,a)=>e.reduce((s,o,i)=>{let r=t[i];if(r&&r.call){let n=r(a),c=n&&n.props&&n.props.className||/^go/.test(n)&&n;r=c?"."+c:n&&typeof n=="object"?n.props?"":w(n,""):n===!1?"":n}return s+o+(r??"")},"");function $(e){let t=this||{},a=e.call?e(t.p):e;return ne(a.unshift?a.raw?le(a,[].slice.call(arguments,1),t.p):a.reduce((s,o)=>Object.assign(s,o&&o.call?o(t.p):o),{}):a,se(t.target),t.g,t.o,t.k)}let U,I,P;$.bind({g:1});let v=$.bind({k:1});function ce(e,t,a,s){w.p=t,U=e,I=a,P=s}function j(e,t){let a=this||{};return function(){let s=arguments;function o(i,r){let n=Object.assign({},i),c=n.className||o.className;a.p=Object.assign({theme:I&&I()},n),a.o=/ *go\d+/.test(c),n.className=$.apply(a,s)+(c?" "+c:"");let p=e;return e[0]&&(p=n.as||e,delete n.as),P&&p[0]&&P(n),U(p,n)}return t?t(o):o}}var de=e=>typeof e=="function",D=(e,t)=>de(e)?e(t):e,ue=(()=>{let e=0;return()=>(++e).toString()})(),B=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),me=20,z="default",Y=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:s}=t;return Y(e,{type:e.toasts.find(r=>r.id===s.id)?1:0,toast:s});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(r=>r.id===o||o===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+i}))}}},F=[],q={toasts:[],pausedAt:void 0,settings:{toastLimit:me}},y={},K=(e,t=z)=>{y[t]=Y(y[t]||q,e),F.forEach(([a,s])=>{a===t&&s(y[t])})},V=e=>Object.keys(y).forEach(t=>K(e,t)),pe=e=>Object.keys(y).find(t=>y[t].toasts.some(a=>a.id===e)),O=(e=z)=>t=>{K(t,e)},fe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},ge=(e={},t=z)=>{let[a,s]=l.useState(y[t]||q),o=l.useRef(y[t]);l.useEffect(()=>(o.current!==y[t]&&s(y[t]),F.push([t,s]),()=>{let r=F.findIndex(([n])=>n===t);r>-1&&F.splice(r,1)}),[t]);let i=a.toasts.map(r=>{var n,c,p;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((n=e[r.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:r.duration||((c=e[r.type])==null?void 0:c.duration)||e?.duration||fe[r.type],style:{...e.style,...(p=e[r.type])==null?void 0:p.style,...r.style}}});return{...a,toasts:i}},he=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:a?.id||ue()}),k=e=>(t,a)=>{let s=he(t,e,a);return O(s.toasterId||pe(s.id))({type:2,toast:s}),s.id},g=(e,t)=>k("blank")(e,t);g.error=k("error");g.success=k("success");g.loading=k("loading");g.custom=k("custom");g.dismiss=(e,t)=>{let a={type:3,toastId:e};t?O(t)(a):V(a)};g.dismissAll=e=>g.dismiss(void 0,e);g.remove=(e,t)=>{let a={type:4,toastId:e};t?O(t)(a):V(a)};g.removeAll=e=>g.remove(void 0,e);g.promise=(e,t,a)=>{let s=g.loading(t.loading,{...a,...a?.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let i=t.success?D(t.success,o):void 0;return i?g.success(i,{id:s,...a,...a?.success}):g.dismiss(s),o}).catch(o=>{let i=t.error?D(t.error,o):void 0;i?g.error(i,{id:s,...a,...a?.error}):g.dismiss(s)}),e};var be=1e3,ye=(e,t="default")=>{let{toasts:a,pausedAt:s}=ge(e,t),o=l.useRef(new Map).current,i=l.useCallback((u,d=be)=>{if(o.has(u))return;let h=setTimeout(()=>{o.delete(u),r({type:4,toastId:u})},d);o.set(u,h)},[]);l.useEffect(()=>{if(s)return;let u=Date.now(),d=a.map(h=>{if(h.duration===1/0)return;let N=(h.duration||0)+h.pauseDuration-(u-h.createdAt);if(N<0){h.visible&&g.dismiss(h.id);return}return setTimeout(()=>g.dismiss(h.id,t),N)});return()=>{d.forEach(h=>h&&clearTimeout(h))}},[a,s,t]);let r=l.useCallback(O(t),[t]),n=l.useCallback(()=>{r({type:5,time:Date.now()})},[r]),c=l.useCallback((u,d)=>{r({type:1,toast:{id:u,height:d}})},[r]),p=l.useCallback(()=>{s&&r({type:6,time:Date.now()})},[s,r]),f=l.useCallback((u,d)=>{let{reverseOrder:h=!1,gutter:N=8,defaultPosition:S}=d||{},T=a.filter(b=>(b.position||S)===(u.position||S)&&b.height),W=T.findIndex(b=>b.id===u.id),L=T.filter((b,R)=>R<W&&b.visible).length;return T.filter(b=>b.visible).slice(...h?[L+1]:[0,L]).reduce((b,R)=>b+(R.height||0)+N,0)},[a]);return l.useEffect(()=>{a.forEach(u=>{if(u.dismissed)i(u.id,u.removeDelay);else{let d=o.get(u.id);d&&(clearTimeout(d),o.delete(u.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:c,startPause:n,endPause:p,calculateOffset:f}}},xe=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ve=v`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,we=v`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,je=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${xe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ve} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${we} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ne=v`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ke=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Ne} 1s linear infinite;
`,Ce=v`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Ee=v`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Fe=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ce} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Ee} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,De=j("div")`
  position: absolute;
`,$e=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Oe=v`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Se=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Oe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Te=({toast:e})=>{let{icon:t,type:a,iconTheme:s}=e;return t!==void 0?typeof t=="string"?l.createElement(Se,null,t):t:a==="blank"?null:l.createElement($e,null,l.createElement(ke,{...s}),a!=="loading"&&l.createElement(De,null,a==="error"?l.createElement(je,{...s}):l.createElement(Fe,{...s})))},Re=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ae=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ie="0%{opacity:0;} 100%{opacity:1;}",Pe="0%{opacity:1;} 100%{opacity:0;}",ze=j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Le=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Me=(e,t)=>{let a=e.includes("top")?1:-1,[s,o]=B()?[Ie,Pe]:[Re(a),Ae(a)];return{animation:t?`${v(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${v(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},_e=l.memo(({toast:e,position:t,style:a,children:s})=>{let o=e.height?Me(e.position||t||"top-center",e.visible):{opacity:0},i=l.createElement(Te,{toast:e}),r=l.createElement(Le,{...e.ariaProps},D(e.message,e));return l.createElement(ze,{className:e.className,style:{...o,...a,...e.style}},typeof s=="function"?s({icon:i,message:r}):l.createElement(l.Fragment,null,i,r))});ce(l.createElement);var He=({id:e,className:t,style:a,onHeightUpdate:s,children:o})=>{let i=l.useCallback(r=>{if(r){let n=()=>{let c=r.getBoundingClientRect().height;s(e,c)};n(),new MutationObserver(n).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return l.createElement("div",{ref:i,className:t,style:a},o)},Ue=(e,t)=>{let a=e.includes("top"),s=a?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:B()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...s,...o}},Be=$`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,E=16,Ye=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:s,children:o,toasterId:i,containerStyle:r,containerClassName:n})=>{let{toasts:c,handlers:p}=ye(a,i);return l.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:E,left:E,right:E,bottom:E,pointerEvents:"none",...r},className:n,onMouseEnter:p.startPause,onMouseLeave:p.endPause},c.map(f=>{let u=f.position||t,d=p.calculateOffset(f,{reverseOrder:e,gutter:s,defaultPosition:t}),h=Ue(u,d);return l.createElement(He,{id:f.id,key:f.id,onHeightUpdate:p.updateHeight,className:f.visible?Be:"",style:h},f.type==="custom"?D(f.message,f):o?o(f):l.createElement(_e,{toast:f,position:u}))}))},qe=g;function Ge({user:e}){const t=l.useRef(),a=l.useRef(),[s,o]=l.useState("Loading models..."),[i,r]=l.useState(!1),[n,c]=l.useState(!1);l.useEffect(()=>{p()},[]);async function p(){try{await A.tinyFaceDetector.loadFromUri("/models"),await A.faceRecognitionNet.loadFromUri("/models"),await A.faceLandmark68TinyNet.loadFromUri("/models"),o("Models loaded! Starting camera..."),f()}catch(d){console.error("Model loading error:",d),o("⚠️ Error loading models. Check console.")}}async function f(){try{const d=await navigator.mediaDevices.getUserMedia({video:!0});t.current.srcObject=d,o("Camera ready! Look directly at the camera.")}catch(d){console.error("Camera access error:",d),o("Please allow camera access to continue.")}}async function u(){r(!0),o("Detecting face...");try{const d=await Z(t.current,new J).withFaceLandmarks(!0).withFaceDescriptor();if(!d){o("❌ No face detected. Please try again."),r(!1);return}const h=Array.from(d.descriptor);o("✅ Face detected! Saving..."),(await(await fetch("/register-face",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")},body:JSON.stringify({descriptor:h}),credentials:"include"})).json()).success?(qe.success("Face registered successfully!",{duration:2e3,position:"top-right",style:{background:"hsl(142,34%,51%)",color:"#fff",fontWeight:"bold"}}),setTimeout(()=>C.visit("/profile"),1800)):o("❌ Failed to save face data. Try again.")}catch(d){console.error("Detection error:",d),o("⚠️ Error detecting face. Check console.")}r(!1)}return m.jsxs("div",{className:"min-h-screen bg-gray-50 relative",children:[m.jsx(Ye,{position:"top-right",toastOptions:{style:{marginTop:"4rem"}}}),m.jsxs("header",{className:"bg-green-600 text-white flex justify-between items-center px-4 sm:px-8 py-3 shadow-md fixed top-0 left-0 w-full z-50",children:[m.jsxs("div",{className:"flex items-center gap-2",children:[m.jsx("img",{src:"/logo.png",alt:"Logo",className:"w-10 h-10 rounded-full"}),m.jsx("span",{className:"font-bold text-lg",children:"Smart Inventory"})]}),m.jsxs("div",{className:"hidden sm:flex items-center gap-4",children:[e?.role==="admin"&&m.jsx("a",{href:"/admin/dashboard",className:"bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-all font-medium",children:"Dashboard"}),m.jsx("button",{onClick:()=>C.post(route("logout")),className:"bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition-all font-medium",children:"Logout"})]}),m.jsx("div",{className:"sm:hidden",children:m.jsx("button",{onClick:()=>c(!n),className:"p-2 rounded-md bg-green-700",children:n?m.jsx(te,{className:"w-6 h-6"}):m.jsx(ae,{className:"w-6 h-6"})})})]}),n&&m.jsxs("div",{className:"sm:hidden bg-white shadow-lg absolute top-16 right-4 rounded-lg w-48 z-50",children:[m.jsx("button",{onClick:()=>C.post(route("logout")),className:"w-full text-left px-4 py-2 hover:bg-green-100 text-green-700 font-medium",children:"Logout"}),e?.role==="admin"&&m.jsx("a",{href:"/admin/dashboard",className:"block px-4 py-2 hover:bg-green-100 text-green-700 font-medium",children:"Dashboard"})]}),m.jsx("div",{className:"pt-20 flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-white via-green-50 to-white p-4",children:m.jsxs(Q,{className:"max-w-md w-full shadow-2xl rounded-3xl bg-white/90 border-2 border-green-600 overflow-hidden",children:[m.jsx(X,{className:"bg-green-600 text-white text-center py-4",children:m.jsx(G,{className:"text-2xl font-bold",children:"Register Your Face"})}),m.jsxs(ee,{className:"flex flex-col items-center gap-6 p-6 relative",children:[m.jsxs("div",{className:"relative w-64 h-64 rounded-full overflow-hidden border-4 border-green-500 shadow-lg ring-2 ring-green-400 animate-pulse",children:[m.jsx("video",{ref:t,autoPlay:!0,muted:!0,playsInline:!0,className:"w-full h-full object-cover"}),m.jsx("div",{ref:a,className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:m.jsx("div",{className:"w-44 h-44 border-2 border-dashed border-green-400 rounded-full"})})]}),m.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 w-full justify-center mt-4",children:[m.jsx(M,{type:"button",onClick:u,disabled:i,className:"flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white shadow-md",children:i?"Processing...":"Capture & Save Face"}),m.jsx(M,{type:"button",variant:"outline",onClick:()=>C.visit("/profile"),className:"flex-1 sm:flex-none border-green-600 text-green-600 hover:bg-green-50",children:"Back"})]}),m.jsx("p",{className:"text-green-800 text-sm text-center mt-2 font-medium",children:s})]})]})})]})}export{Ge as default};
