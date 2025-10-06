import{r as u,j as e,L as $,R as F,a as k}from"./app-B6tI0qqq.js";import{B as h}from"./button-djUkrHke.js";import{C as D,c as M}from"./card-Dz82TsFf.js";import{S as O,a as V,b as U,c as H}from"./avatar-CCtBqyyD.js";import"./sweetalert2.esm.all-BQIkj5Wb.js";import{N as q}from"./Notification-CLY5axOp.js";import{T as G,a as K,b as P,c as d,d as W,e as o}from"./table-C6x4fq7o.js";import{B as X,a as J,b as Q,c as I,d as Y}from"./breadcrumb-D2WWNaAy.js";import{A as Z}from"./app-sidebar-DCROMl4F.js";import{I as ee}from"./input-M6qjTmVN.js";import re from"./EditPeripheralModal-CjKM28fX.js";import{P as te,a as se,b as le}from"./popover-BbjZ1zc8.js";import{S as b,a as f,b as g,c as N,d as a}from"./select-B5jtyCq1.js";import{P as ie}from"./printer-PLy2LTCL.js";import{E as ae}from"./eye-Dx6zAtcX.js";import{P as ne}from"./pen-DgON1gKe.js";import{F as oe}from"./funnel-DPmxGbWK.js";import{X as de}from"./index-ULCumA-0.js";import"./index-DO62ECER.js";import"./utils-CBfrqCZ4.js";import"./createLucideIcon-BuzgKcJO.js";import"./index-CHcQwW7I.js";import"./index-BhzaaNx7.js";import"./index-DMA33Q4N.js";import"./dropdown-menu-B8wJeoEL.js";import"./index-Bq3FoWOG.js";import"./chevron-right-B0kctwCp.js";import"./index-BXku-I4a.js";import"./index-m9bJXoro.js";import"./bell-CRd-dklK.js";import"./sparkles-DeIXSxF7.js";import"./keyboard-tKtUyIVa.js";import"./boxes-CcwqT2HG.js";import"./users-DpeNQcVm.js";import"./chevron-down-BRlpxxip.js";import"./dialog-Bq5zqyzg.js";import"./label-D_pPctV6.js";import"./index-DI2wRbe3.js";function ce({filters:i,filterOptions:j,onApplyFilters:c}){const[m,p]=u.useState(""),x=()=>{const t={type:void 0,condition:void 0,room_id:void 0,unit_code:void 0};p(""),c(t)};return e.jsxs(te,{children:[e.jsx(se,{asChild:!0,children:e.jsxs(h,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(oe,{className:"mr-2 h-4 w-4"}),"Filters"]})}),e.jsx(le,{className:"w-72",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(b,{value:m,onValueChange:p,children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select filter field"})}),e.jsxs(N,{children:[e.jsx(a,{value:"type",children:"Type"}),e.jsx(a,{value:"condition",children:"Condition"}),e.jsx(a,{value:"room",children:"Room"}),e.jsx(a,{value:"unit",children:"Unit"})]})]}),m==="type"&&e.jsxs(b,{value:i.type||"all",onValueChange:t=>c({...i,type:t==="all"?void 0:t}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Type"})}),e.jsxs(N,{children:[e.jsx(a,{value:"all",children:"All"}),j.types.map(t=>e.jsx(a,{value:t,children:t},t))]})]}),m==="condition"&&e.jsxs(b,{value:i.condition||"all",onValueChange:t=>c({...i,condition:t==="all"?void 0:t}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Condition"})}),e.jsxs(N,{children:[e.jsx(a,{value:"all",children:"All"}),j.conditions.map(t=>e.jsx(a,{value:t,children:t},t))]})]}),m==="room"&&e.jsxs(b,{value:i.room_id||"all",onValueChange:t=>c({...i,room_id:t==="all"?void 0:t}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Room"})}),e.jsxs(N,{children:[e.jsx(a,{value:"all",children:"All"}),Object.entries(j.rooms).map(([t,v])=>e.jsxs(a,{value:t,children:["Room ",v]},t))]})]}),m==="unit"&&e.jsxs(b,{value:i.unit_code||"all",onValueChange:t=>c({...i,unit_code:t==="all"?void 0:t}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Unit"})}),e.jsxs(N,{children:[e.jsx(a,{value:"all",children:"All"}),j.units.map(t=>e.jsx(a,{value:t,children:t},t))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(h,{size:"sm",variant:"outline",onClick:x,className:"flex items-center gap-1",children:[e.jsx(de,{className:"h-4 w-4"}),"Reset All"]})})]})})]})}const he=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Intermittent Issue",color:"bg-yellow-500"},{label:"Needs Cleaning",color:"bg-blue-500"},{label:"For Replacement",color:"bg-orange-500"},{label:"For Disposal",color:"bg-gray-500"}];function Je({peripherals:i,search:j,existingRooms:c,existingUnits:m,filters:p={}}){const[x,t]=u.useState(j||""),[v,y]=u.useState(null),[n,S]=u.useState(1),w=10,B=u.useMemo(()=>{const r=s=>[...new Set(s.filter(l=>l))].sort();return{types:r(i.map(s=>s.type)),conditions:r(i.map(s=>s.condition)),rooms:Object.fromEntries(c.map(s=>[String(s.id),s.room_number])),units:r(i.map(s=>s.unit_code))}},[i,c]);function _(r){const s=Object.fromEntries(Object.entries({...r,search:x||void 0}).filter(([,l])=>l!==""&&l!==void 0));k.get("/admin/peripherals",s,{preserveState:!0,replace:!0})}function E(){t(""),k.get("/admin/peripherals",{},{preserveState:!0,replace:!0})}const z=r=>{r.key==="Enter"&&_(p)},A=u.useMemo(()=>{if(!x)return i;const r=x.toLowerCase();return i.filter(s=>[s.peripheral_code,s.type,s.serial_number,s.condition,s.room?.room_number,s.unit_code].filter(Boolean).some(l=>l.toLowerCase().includes(r)))},[i,x]),C=Math.ceil(A.length/w)||1,R=A.slice((n-1)*w,n*w);function T(r){return he.find(s=>s.label.toLowerCase()===r?.toLowerCase())||{label:r,color:"bg-slate-400"}}const L=()=>{if(!i||i.length===0){alert("No data available to print.");return}const r=window.open("","","width=900,height=700"),s=i.map(l=>`
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
                        ${s}
                    </tbody>
                </table>
            </body>
        </html>
    `),r.document.close(),r.print()};return e.jsxs(O,{children:[e.jsx(Z,{}),e.jsxs(V,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(U,{}),e.jsx(H,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(X,{children:e.jsx(J,{children:e.jsxs(Q,{children:[e.jsx(I,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(Y,{}),e.jsx(I,{href:"/admin/peripherals","aria-current":"page",className:"font-semibold text-foreground",children:"Peripherals"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(q,{})]})}),e.jsx("main",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h1",{className:"text-2xl font-bold mb-5",children:"Peripherals"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(ce,{filters:p,filterOptions:B,onApplyFilters:_,onReset:E}),e.jsxs(h,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:L,children:[e.jsx(ie,{className:"h-4 w-4"}),"Print"]}),e.jsx(ee,{placeholder:"Search peripherals...",value:x,onChange:r=>t(r.target.value),onKeyDown:z,className:`flex-1 min-w-0 sm:max-w-xs w-full
               border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
               focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
               placeholder:text-[hsl(142,34%,40%)]`})]}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsx($,{href:"/admin/peripherals/create",children:e.jsx(h,{className:"bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium",children:"Add Peripheral"})})})]}),e.jsx(D,{children:e.jsxs(M,{className:"p-0",children:[e.jsx("div",{className:"rounded-t-lg",children:e.jsxs(G,{className:"w-full table-auto",children:[e.jsx(K,{children:e.jsxs(P,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(d,{children:"#"}),e.jsx(d,{children:"Peripheral Code"}),e.jsx(d,{children:"Type"}),e.jsx(d,{children:"Room"}),e.jsx(d,{children:"Units"}),e.jsx(d,{children:"Brand"}),e.jsx(d,{children:"Model"}),e.jsx(d,{children:"Serial Number"}),e.jsx(d,{children:"Condition"}),e.jsx(d,{children:"Actions"})]})}),e.jsx(W,{children:R.length>0?R.map((r,s)=>e.jsxs(P,{children:[e.jsx(o,{children:(n-1)*w+s+1}),e.jsx(o,{children:r.peripheral_code}),e.jsx(o,{children:r.type}),e.jsx(o,{children:r.room?`ROOM ${r.room.room_number}`:"N/A"}),e.jsx(o,{children:r.unit?r.unit.unit_code:"N/A"}),e.jsx(o,{children:r.brand}),e.jsx(o,{children:r.model}),e.jsx(o,{children:r.serial_number}),e.jsx(o,{children:r.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${T(r.condition).color}`,children:T(r.condition).label}):"N/A"}),e.jsxs(o,{className:"space-x-2 flex items-center",children:[e.jsx($,{href:`/admin/peripherals/${r.id}`,children:e.jsxs(h,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(ae,{className:"h-4 w-4"}),"View"]})}),e.jsxs(h,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>y(r),children:[e.jsx(ne,{className:"h-4 w-4"}),"Edit"]})]})]},r.id)):e.jsx(P,{children:e.jsx(o,{colSpan:"10",className:"text-center",children:"No peripherals found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center p-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Page ",n," of ",C]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(h,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>S(n-1),children:"Previous"}),Array.from({length:C},(r,s)=>s+1).filter(r=>r===1||r===C?!0:r>=n-2&&r<=n+2).map((r,s,l)=>e.jsxs(F.Fragment,{children:[s>0&&l[s]-l[s-1]>1&&e.jsx("span",{className:"px-2",children:"..."}),e.jsx(h,{size:"sm",variant:n===r?"default":"outline",onClick:()=>S(r),children:r})]},r)),e.jsx(h,{size:"sm",variant:"outline",disabled:n===C,onClick:()=>S(n+1),children:"Next"})]})]})]})})]})}),v&&e.jsx(re,{peripheral:v,rooms:c,units:m,onClose:()=>y(null)})]})]})}export{Je as default};
