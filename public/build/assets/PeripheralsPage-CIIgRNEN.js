import{r as u,j as e,L as $,R as V,a as B}from"./app-X2XQLKS3.js";import{B as d}from"./button-C62_EHzm.js";import{C as U,c as q}from"./card-wISa5VZm.js";import{S as H,a as K,b as X,c as G}from"./avatar-CEgLhWWb.js";import{S as P}from"./sweetalert2.esm.all-BQIkj5Wb.js";import{N as W}from"./Notification-B4M9gk23.js";import{T as J,a as Q,b as _,c,d as Y,e as n}from"./table-gmNX_0J6.js";import{B as Z,a as ee,b as re,c as D,d as te}from"./breadcrumb-BQWS_-1y.js";import{A as se}from"./app-sidebar-DleAGgmT.js";import{I as le}from"./input-Cq2JkAbx.js";import ie from"./EditPeripheralModal-D9cqZ8E1.js";import{P as oe,a as ae,b as ne}from"./popover-DjV2oZ4t.js";import{S as b,a as f,b as g,c as N,d as o}from"./select-BpHKBjTl.js";import{P as ce}from"./printer-ClhM--XY.js";import{U as de,D as he}from"./upload-Xp23ovNE.js";import{E as me}from"./eye-DcIGipeA.js";import{P as xe}from"./pen-rAhiXLQh.js";import{F as pe}from"./funnel-C_-KVArY.js";import{X as ue}from"./index-Dz5glkNh.js";import"./index-qYNOf9mi.js";import"./utils-CBfrqCZ4.js";import"./createLucideIcon-0p_GVwJf.js";import"./index-iDKACU5a.js";import"./index-CE5EMy0D.js";import"./index-BhjrTxbN.js";import"./dropdown-menu-BB3Za7hv.js";import"./index-BIgnMwzR.js";import"./chevron-right-D8htQa18.js";import"./index-D_NolL6N.js";import"./index-CDj-ShJ8.js";import"./bell-Bcj3VjmY.js";import"./sparkles-B2sX7EvK.js";import"./keyboard-dEYIgviQ.js";import"./boxes-BWz8K0Ih.js";import"./users-xZXbU29W.js";import"./chevron-down-Ckf9Hflw.js";import"./dialog-CSi9K315.js";import"./label-V_itOdbW.js";import"./index-DjyIBfzh.js";function je({filters:i,filterOptions:p,onApplyFilters:h}){const[m,j]=u.useState(""),x=()=>{const s={type:void 0,condition:void 0,room_id:void 0,unit_code:void 0};j(""),h(s)};return e.jsxs(oe,{children:[e.jsx(ae,{asChild:!0,children:e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(pe,{className:"mr-2 h-4 w-4"}),"Filters"]})}),e.jsx(ne,{className:"w-72",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(b,{value:m,onValueChange:j,children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select filter field"})}),e.jsxs(N,{children:[e.jsx(o,{value:"type",children:"Type"}),e.jsx(o,{value:"condition",children:"Condition"}),e.jsx(o,{value:"room",children:"Room"}),e.jsx(o,{value:"unit",children:"Unit"})]})]}),m==="type"&&e.jsxs(b,{value:i.type||"all",onValueChange:s=>h({...i,type:s==="all"?void 0:s}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Type"})}),e.jsxs(N,{children:[e.jsx(o,{value:"all",children:"All"}),p.types.map(s=>e.jsx(o,{value:s,children:s},s))]})]}),m==="condition"&&e.jsxs(b,{value:i.condition||"all",onValueChange:s=>h({...i,condition:s==="all"?void 0:s}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Condition"})}),e.jsxs(N,{children:[e.jsx(o,{value:"all",children:"All"}),p.conditions.map(s=>e.jsx(o,{value:s,children:s},s))]})]}),m==="room"&&e.jsxs(b,{value:i.room_id||"all",onValueChange:s=>h({...i,room_id:s==="all"?void 0:s}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Room"})}),e.jsxs(N,{children:[e.jsx(o,{value:"all",children:"All"}),Object.entries(p.rooms).map(([s,v])=>e.jsxs(o,{value:s,children:["Room ",v]},s))]})]}),m==="unit"&&e.jsxs(b,{value:i.unit_code||"all",onValueChange:s=>h({...i,unit_code:s==="all"?void 0:s}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Unit"})}),e.jsxs(N,{children:[e.jsx(o,{value:"all",children:"All"}),p.units.map(s=>e.jsx(o,{value:s,children:s},s))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(d,{size:"sm",variant:"outline",onClick:x,className:"flex items-center gap-1",children:[e.jsx(ue,{className:"h-4 w-4"}),"Reset All"]})})]})})]})}const be=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Intermittent Issue",color:"bg-yellow-500"},{label:"Needs Cleaning",color:"bg-blue-500"},{label:"For Replacement",color:"bg-orange-500"},{label:"For Disposal",color:"bg-gray-500"}];function sr({peripherals:i,search:p,existingRooms:h,existingUnits:m,filters:j={}}){const[x,s]=u.useState(p||""),[v,A]=u.useState(null),[a,y]=u.useState(1),w=10,F=u.useMemo(()=>{const r=t=>[...new Set(t.filter(l=>l))].sort();return{types:r(i.map(t=>t.type)),conditions:r(i.map(t=>t.condition)),rooms:Object.fromEntries(h.map(t=>[String(t.id),t.room_number])),units:r(i.map(t=>t.unit_code))}},[i,h]);function T(r){const t=Object.fromEntries(Object.entries({...r,search:x||void 0}).filter(([,l])=>l!==""&&l!==void 0));B.get("/admin/peripherals",t,{preserveState:!0,replace:!0})}function z(){s(""),B.get("/admin/peripherals",{},{preserveState:!0,replace:!0})}const L=r=>{r.key==="Enter"&&T(j)},R=u.useMemo(()=>{if(!x)return i;const r=x.toLowerCase();return i.filter(t=>[t.peripheral_code,t.type,t.serial_number,t.condition,t.room?.room_number,t.unit_code].filter(Boolean).some(l=>l.toLowerCase().includes(r)))},[i,x]),C=Math.ceil(R.length/w)||1,I=R.slice((a-1)*w,a*w);function k(r){return be.find(t=>t.label.toLowerCase()===r?.toLowerCase())||{label:r,color:"bg-slate-400"}}const O=()=>{if(!i||i.length===0){alert("No data available to print.");return}const r=window.open("","","width=900,height=700"),t=i.map(l=>`
        <tr>
            <td>${l.id}</td>
            <td>${l.peripheral_code}</td>
            <td>${l.type}</td>
            <td>${l.brand??"N/A"}</td>
            <td>${l.model??"N/A"}</td>
            <td>${l.serial_number??"N/A"}</td>
            <td>${l.condition??"N/A"}</td>
            <td>${l.room?.room_number??"N/A"}</td>
            <td>${l.unit?.unit_code??"N/A"}</td>
            <td>${l.unit?.mr_to?.name??"N/A"}</td>
        </tr>
    `).join("");r.document.write(`
        <html>
            <head>
                <title>Complete Peripherals Report</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    h2 {
                        text-align: center;
                        margin-bottom: 20px;
                        color: #2e7d32;
                    }
                    p {
                        text-align: right;
                        font-size: 12px;
                        color: #666;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                    }
                    th, td {
                        border: 1px solid #ccc;
                        padding: 8px;
                        text-align: left;
                        font-size: 13px;
                    }
                    th {
                        background-color: #2e7d32;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    @media print {
                        body { -webkit-print-color-adjust: exact; }
                    }
                </style>
            </head>
            <body>
                <h2>Complete Peripherals Report</h2>
                <p>Generated on: ${new Date().toLocaleString()}</p>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Peripheral Code</th>
                            <th>Type</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Serial Number</th>
                            <th>Condition</th>
                            <th>Room</th>
                            <th>Unit Code</th>
                            <th>Material Responsible</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t}
                    </tbody>
                </table>
            </body>
        </html>
    `),r.document.close(),r.print()},M=async r=>{const t=r.target.files[0];if(!t)return;const l=new FormData;l.append("file",t);try{const S=await fetch(route("peripherals.import"),{method:"POST",headers:{"X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').content},body:l}),E=await S.json();S.ok?P.fire({icon:"success",title:"Import Successful!",text:E.message||"Peripherals imported successfully."}):P.fire({icon:"error",title:"Import Failed",text:E.error||"An unknown error occurred."})}catch(S){P.fire({icon:"error",title:"Import Error",text:S.message})}finally{r.target.value=""}};return e.jsxs(H,{children:[e.jsx(se,{}),e.jsxs(K,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(X,{}),e.jsx(G,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(Z,{children:e.jsx(ee,{children:e.jsxs(re,{children:[e.jsx(D,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(te,{}),e.jsx(D,{href:"/admin/peripherals","aria-current":"page",className:"font-semibold text-foreground",children:"Peripherals"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(W,{})]})}),e.jsx("main",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h1",{className:"text-2xl font-bold mb-5",children:"Peripherals"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(je,{filters:j,filterOptions:F,onApplyFilters:T,onReset:z}),e.jsxs(d,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:O,children:[e.jsx(ce,{className:"h-4 w-4"}),"Print"]}),e.jsxs("label",{className:"flex items-center gap-2 cursor-pointer bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)] px-4 py-2 rounded-md",children:[e.jsx("input",{type:"file",accept:".csv",onChange:M,className:"hidden"}),e.jsx(de,{className:"h-4 w-4"}),"Import"]}),e.jsxs(d,{className:"flex items-center gap-2 bg-[hsl(142,34%,45%)] text-white border-none hover:bg-[hsl(142,34%,38%)]",onClick:()=>window.location.href="/admin/peripherals/export",children:[e.jsx(he,{className:"h-4 w-4"}),"Export"]}),e.jsx(le,{placeholder:"Search peripherals...",value:x,onChange:r=>s(r.target.value),onKeyDown:L,className:`flex-1 min-w-0 sm:max-w-xs w-full
                                        border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
                                        focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
                                        placeholder:text-[hsl(142,34%,40%)]`})]}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsx($,{href:"/admin/peripherals/create",children:e.jsx(d,{className:"bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium",children:"Add Peripheral"})})})]}),e.jsx(U,{children:e.jsxs(q,{className:"p-0",children:[e.jsx("div",{className:"rounded-t-lg",children:e.jsxs(J,{className:"w-full table-auto",children:[e.jsx(Q,{children:e.jsxs(_,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(c,{children:"#"}),e.jsx(c,{children:"Peripheral Code"}),e.jsx(c,{children:"Type"}),e.jsx(c,{children:"Room"}),e.jsx(c,{children:"Units"}),e.jsx(c,{children:"Brand"}),e.jsx(c,{children:"Model"}),e.jsx(c,{children:"Serial Number"}),e.jsx(c,{children:"Condition"}),e.jsx(c,{children:"Actions"})]})}),e.jsx(Y,{children:I.length>0?I.map((r,t)=>e.jsxs(_,{children:[e.jsx(n,{children:(a-1)*w+t+1}),e.jsx(n,{children:r.peripheral_code}),e.jsx(n,{children:r.type}),e.jsx(n,{children:r.room?`ROOM ${r.room.room_number}`:"N/A"}),e.jsx(n,{children:r.unit?r.unit.unit_code:"N/A"}),e.jsx(n,{children:r.brand}),e.jsx(n,{children:r.model}),e.jsx(n,{children:r.serial_number}),e.jsx(n,{children:r.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${k(r.condition).color}`,children:k(r.condition).label}):"N/A"}),e.jsxs(n,{className:"space-x-2 flex items-center",children:[e.jsx($,{href:`/admin/peripherals/${r.id}`,children:e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(me,{className:"h-4 w-4"}),"View"]})}),e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>A(r),children:[e.jsx(xe,{className:"h-4 w-4"}),"Edit"]})]})]},r.id)):e.jsx(_,{children:e.jsx(n,{colSpan:"10",className:"text-center",children:"No peripherals found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center p-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Page ",a," of ",C]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(d,{size:"sm",variant:"outline",disabled:a===1,onClick:()=>y(a-1),children:"Previous"}),Array.from({length:C},(r,t)=>t+1).filter(r=>r===1||r===C?!0:r>=a-2&&r<=a+2).map((r,t,l)=>e.jsxs(V.Fragment,{children:[t>0&&l[t]-l[t-1]>1&&e.jsx("span",{className:"px-2",children:"..."}),e.jsx(d,{size:"sm",variant:a===r?"default":"outline",onClick:()=>y(r),children:r})]},r)),e.jsx(d,{size:"sm",variant:"outline",disabled:a===C,onClick:()=>y(a+1),children:"Next"})]})]})]})})]})}),v&&e.jsx(ie,{peripheral:v,rooms:h,units:m,onClose:()=>A(null)})]})]})}export{sr as default};
