import{j as e,b as d}from"./app-Df9jBIXz.js";import{f as n,c as x}from"./index-BfXpLGDh.js";import{D as h,g as u,h as p,n as y,L as f}from"./dropdown-menu-BHc7bob7.js";import{B as g}from"./button-D2w-apf2.js";/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],w=n("monitor",j);/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["rect",{x:"5",y:"2",width:"14",height:"20",rx:"7",key:"11ol66"}],["path",{d:"M12 6v4",key:"16clxf"}]],b=n("mouse",N);/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],v=n("package",k);function q({room:o,user:s,active:a,onSelect:r}){const i=[{key:"system-units",label:"System Units",icon:w},{key:"peripherals",label:"Peripherals",icon:b},{key:"equipments",label:"Equipments",icon:v}],l=()=>{d.post(route("logout"))};return e.jsxs("div",{className:"w-64 bg-white border-r p-4 flex flex-col justify-between",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("h2",{className:"text-lg font-semibold",children:o.room_name}),e.jsx("p",{className:"text-sm text-muted-foreground",children:o.department})]}),e.jsx("nav",{className:"space-y-2",children:i.map(({key:t,label:c,icon:m})=>e.jsxs("button",{onClick:()=>r(t),className:x("flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition",a===t?"bg-muted text-primary":"text-muted-foreground"),children:[e.jsx(m,{className:"mr-2 h-4 w-4"}),c]},t))})]}),e.jsx("div",{className:"border-t pt-4 mt-6",children:e.jsxs(h,{children:[e.jsx(u,{asChild:!0,children:e.jsxs(g,{variant:"ghost",className:"w-full flex items-center justify-start gap-3",children:[e.jsxs("div",{className:"h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold",children:[s.name.charAt(0)," "]}),e.jsxs("div",{className:"flex flex-col items-start",children:[e.jsx("p",{className:"text-sm font-medium",children:s.name}),e.jsx("p",{className:"text-xs text-muted-foreground",children:s.email})]})]})}),e.jsx(p,{className:"w-48",children:e.jsxs(y,{onClick:l,children:[e.jsx(f,{className:"mr-2 h-4 w-4"}),"Logout"]})})]})})]})}export{q as F};
