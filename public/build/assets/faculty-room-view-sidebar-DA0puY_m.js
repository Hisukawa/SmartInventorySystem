import{a as s,c}from"./index-CDzN7pRO.js";import{j as e,b as d}from"./app-ByWAbHLz.js";import{D as m,a as x,b as h,c as p,L as u}from"./dropdown-menu-7nhHBwlu.js";import{B as g}from"./button-CQnz1IVf.js";/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],C=s("menu",y);/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],j=s("monitor",f);/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["rect",{x:"5",y:"2",width:"14",height:"20",rx:"7",key:"11ol66"}],["path",{d:"M12 6v4",key:"16clxf"}]],b=s("mouse",w);/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],k=s("package",N);function S({room:t,user:a,active:v,onSelect:M}){const o=[{key:"system-units",label:"System Units",icon:j},{key:"peripherals",label:"Peripherals",icon:b},{key:"equipments",label:"Equipments",icon:k}],l=()=>{d.post(route("logout"))};return e.jsxs("div",{className:"w-64 bg-gradient-to-b from-green-50 to-green-100 border-r flex flex-col justify-between shadow-md",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"p-4 border-b bg-green-600 text-white flex items-center gap-3",children:[e.jsx("div",{className:"flex aspect-square size-10 items-center justify-center rounded-full bg-white overflow-hidden shadow",children:e.jsx("img",{src:"/ict.png",alt:"Logo",className:"w-full h-full object-contain"})}),e.jsxs("div",{className:"grid flex-1 text-left leading-tight",children:[e.jsx("span",{className:"truncate font-semibold text-sm",children:"Inventory Management"}),e.jsx("span",{className:"truncate text-xs opacity-90",children:"System"})]})]}),e.jsxs("div",{className:"p-4 bg-yellow-50 border-b",children:[e.jsx("h2",{className:"text-lg font-semibold text-green-700",children:t.room_name}),e.jsx("p",{className:"text-sm text-gray-600",children:t.department})]}),e.jsx("nav",{className:"space-y-1 px-2 mt-2",children:o.map(({key:n,label:r,icon:i})=>e.jsxs("button",{onClick:()=>{window.location.href=route("room.show",{roomPath:t.room_path,section:n})},className:c("flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition"),children:[e.jsx(i,{className:"mr-2 h-4 w-4"}),r]},n))})]}),e.jsx("div",{className:"border-t p-4 bg-green-50",children:e.jsxs(m,{children:[e.jsx(x,{asChild:!0,children:e.jsxs(g,{variant:"ghost",className:"w-full flex items-center justify-start gap-3 text-green-700",children:[e.jsx("div",{className:"h-10 w-10 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold",children:a.name.charAt(0)}),e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("p",{className:"text-sm font-medium",children:a.name}),e.jsx("p",{className:"text-xs text-gray-600",children:a.email})]})]})}),e.jsx(h,{className:"w-48",children:e.jsxs(p,{onClick:l,className:"text-red-600",children:[e.jsx(u,{className:"mr-2 h-4 w-4"}),"Logout"]})})]})})]})}export{S as F,C as M,b as a,j as b};
