import{f as s,c as d}from"./index-Dk1taLDt.js";import{j as e,b as m}from"./app-3fpj3-G5.js";import{D as x,g as h,h as u,n as p,L as f}from"./dropdown-menu-D6ILbBn-.js";import{B as g}from"./button-BkzWAJ5l.js";/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],C=s("menu",j);/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],N=s("monitor",y);/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["rect",{x:"5",y:"2",width:"14",height:"20",rx:"7",key:"11ol66"}],["path",{d:"M12 6v4",key:"16clxf"}]],b=s("mouse",w);/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],v=s("package",k);function S({room:t,user:n,active:o,onSelect:M}){const l=[{key:"system-units",label:"System Units",icon:N},{key:"peripherals",label:"Peripherals",icon:b},{key:"equipments",label:"Equipments",icon:v}],r=()=>{m.post(route("logout"))};return e.jsxs("div",{className:"w-64 bg-white border-r flex flex-col justify-between",children:[e.jsxs("div",{children:[e.jsx("div",{className:"p-4 border-b",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"flex aspect-square size-10 items-center justify-center rounded-full bg-black overflow-hidden",children:e.jsx("img",{src:"/ict.png",alt:"Logo",className:"w-full h-full object-contain"})}),e.jsxs("div",{className:"grid flex-1 text-left leading-tight",children:[e.jsx("span",{className:"truncate font-semibold text-sm",children:"Inventory Management"}),e.jsx("span",{className:"truncate text-xs text-muted-foreground",children:"System"})]})]})}),e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"text-lg font-semibold",children:t.room_name}),e.jsx("p",{className:"text-sm text-muted-foreground",children:t.department})]}),e.jsx("nav",{className:"space-y-1 px-2",children:l.map(({key:a,label:i,icon:c})=>e.jsxs("button",{onClick:()=>{window.location.href=route("room.show",{roomPath:t.room_path,section:a})},className:d("flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition",o===a?"bg-muted text-primary":"text-muted-foreground"),children:[e.jsx(c,{className:"mr-2 h-4 w-4"}),i]},a))})]}),e.jsx("div",{className:"border-t p-4",children:e.jsxs(x,{children:[e.jsx(h,{asChild:!0,children:e.jsxs(g,{variant:"ghost",className:"w-full flex items-center justify-start gap-3",children:[e.jsxs("div",{className:"h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold",children:[n.name.charAt(0)," "]}),e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("p",{className:"text-sm font-medium",children:n.name}),e.jsx("p",{className:"text-xs text-muted-foreground",children:n.email})]})]})}),e.jsx(u,{className:"w-48",children:e.jsxs(p,{onClick:r,children:[e.jsx(f,{className:"mr-2 h-4 w-4"}),"Logout"]})})]})})]})}export{S as F,C as M};
