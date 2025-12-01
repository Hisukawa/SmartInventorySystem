import{r as b,j as e,L as k,a as P,R as F}from"./app-DYGDpCIH.js";import{B as d}from"./button-CztkhY-G.js";import{C as M,a as O}from"./card-u89RJ3Y0.js";import{S as V,a as H,b as q,c as U}from"./avatar-B38yOGTl.js";import"./sweetalert2.esm.all-BQIkj5Wb.js";import{N as G}from"./Notification-CPP8kULl.js";import{T as K,a as W,b as _,c as u,d as X,e as m}from"./table-C820Ptr9.js";import{B as J,a as Q,b as Y,c as I,d as Z}from"./breadcrumb-BAK6O7ny.js";import{A as ee}from"./app-sidebar-BpBnN1s4.js";import{I as te}from"./input-B_VOLgHY.js";import re from"./EditPeripheralModal-CL_td6XJ.js";import{P as se,a as le,b as ie}from"./popover-DgVjP70X.js";import{S as g,a as N,b as v,c as w,d as a}from"./select-ChntdcWd.js";import{P as oe}from"./printer-CmxgcrMO.js";import{E as ae}from"./eye-DNh3MXMX.js";import{P as ne}from"./pen-B9sBQr7d.js";import{T as de}from"./trash-2-DpgxKThm.js";import{F as ce}from"./funnel-Dk3iLjV5.js";import{X as he}from"./index-C0JT-rEO.js";import"./index-BKCAjtkQ.js";import"./utils-CBfrqCZ4.js";import"./createLucideIcon-DODGpc7N.js";import"./index-Bx4uGs7M.js";import"./index-LIl8FtMf.js";import"./dropdown-menu-5oS-ClZz.js";import"./index-DsKeg3pu.js";import"./chevron-right-DAJ7KPWK.js";import"./index-Din4PO50.js";import"./index-CjJ-Mxsd.js";import"./bell-Df_jNcyq.js";import"./user-CBYEx5V1.js";import"./keyboard-DPyuHUoq.js";import"./boxes-D1Xnz3D-.js";import"./users-D0ffsFk4.js";import"./chevron-down-D-HN1o17.js";import"./dialog-kdu2MmXB.js";import"./label-CescZB4P.js";import"./textarea-DJF81dwL.js";import"./index-DnQXQJPS.js";function me({filters:i,filterOptions:x,onApplyFilters:c}){const[n,h]=b.useState(""),p=()=>{const s={type:void 0,condition:void 0,room_id:void 0,unit_code:void 0};h(""),c(s)};return e.jsxs(se,{children:[e.jsx(le,{asChild:!0,children:e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(ce,{className:"mr-2 h-4 w-4"}),"Filters"]})}),e.jsx(ie,{className:"w-72",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(g,{value:n,onValueChange:h,children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select filter field"})}),e.jsxs(w,{children:[e.jsx(a,{value:"type",children:"Type"}),e.jsx(a,{value:"condition",children:"Condition"}),e.jsx(a,{value:"room",children:"Room"}),e.jsx(a,{value:"unit",children:"Unit"})]})]}),n==="type"&&e.jsxs(g,{value:i.type||"all",onValueChange:s=>c({...i,type:s==="all"?void 0:s}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Type"})}),e.jsxs(w,{children:[e.jsx(a,{value:"all",children:"All"}),x.types.map(s=>e.jsx(a,{value:s,children:s},s))]})]}),n==="condition"&&e.jsxs(g,{value:i.condition||"all",onValueChange:s=>c({...i,condition:s==="all"?void 0:s}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Condition"})}),e.jsxs(w,{children:[e.jsx(a,{value:"all",children:"All"}),x.conditions.map(s=>e.jsx(a,{value:s,children:s},s))]})]}),n==="room"&&e.jsxs(g,{value:i.room_id||"all",onValueChange:s=>c({...i,room_id:s==="all"?void 0:s,unit_id:void 0}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Room"})}),e.jsxs(w,{children:[e.jsx(a,{value:"all",children:"All"}),Object.entries(x.rooms).map(([s,C])=>e.jsxs(a,{value:s,children:["Room ",C]},s))]})]}),n==="unit"&&e.jsxs(g,{value:i.unit_id||"all",onValueChange:s=>c({...i,unit_id:s==="all"?void 0:s}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Unit"})}),e.jsxs(w,{children:[e.jsx(a,{value:"all",children:"All"}),x.units.length===0&&e.jsx("div",{className:"px-3 py-2 text-sm text-gray-400",children:"No units found for this room"}),x.units.map(s=>e.jsx(a,{value:s.id,children:s.code},s.id))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(d,{size:"sm",variant:"outline",onClick:p,className:"flex items-center gap-1",children:[e.jsx(he,{className:"h-4 w-4"}),"Reset All"]})})]})})]})}const xe=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Intermittent Issue",color:"bg-yellow-500"},{label:"Needs Cleaning",color:"bg-blue-500"},{label:"For Replacement",color:"bg-orange-500"},{label:"For Disposal",color:"bg-gray-500"}];function Ze({peripherals:i,search:x,existingRooms:c,existingUnits:n,filters:h={}}){const[p,s]=b.useState(x||""),[C,A]=b.useState(null),[o,S]=b.useState(1),j=10,E=b.useMemo(()=>{const t=r=>[...new Set(r.filter(D=>D))].sort(),l=h.room_id?n.filter(r=>String(r.room_id)===String(h.room_id)):n;return{types:t(i.map(r=>r.type)),conditions:t(i.map(r=>r.condition)),rooms:Object.fromEntries(c.map(r=>[String(r.id),r.room_number])),units:l.map(r=>({id:String(r.id),code:r.unit_code}))}},[i,c,n,h.room_id]);function T(t){const l=Object.fromEntries(Object.entries({...t,search:p||void 0}).filter(([,r])=>r!==""&&r!==void 0));P.get("/admin/peripherals",l,{preserveState:!0,replace:!0})}function z(){s(""),P.get("/admin/peripherals",{},{preserveState:!0,replace:!0})}const B=t=>{t.key==="Enter"&&T(h)},f=b.useMemo(()=>{if(!p)return i;const t=p.toLowerCase();return i.filter(l=>[l.peripheral_code,l.type,l.serial_number,l.condition,l.room?.room_number,l.unit_code].filter(Boolean).some(r=>r.toLowerCase().includes(t)))},[i,p]),y=Math.ceil(f.length/j)||1,R=f.slice((o-1)*j,o*j);function $(t){return xe.find(l=>l.label.toLowerCase()===t?.toLowerCase())||{label:t,color:"bg-slate-400"}}const L=()=>{if(!i||i.length===0){alert("No data available to print.");return}const t=window.open("","","width=900,height=700"),l=i.map(r=>`
        <tr>
            <td>${r.id}</td>
            <td>${r.peripheral_code}</td>
            <td>${r.type}</td>
            <td>${r.brand??"N/A"}</td>
            <td>${r.model??"N/A"}</td>
            <td>${r.serial_number??"N/A"}</td>
            <td>${r.condition??"N/A"}</td>
            <td>${r.room?.room_number??"N/A"}</td>
            <td>${r.unit?.unit_code??"N/A"}</td>
            <td>${r.unit?.mr_to?.name??"N/A"}</td>
        </tr>
    `).join("");t.document.write(`
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
                        ${l}
                    </tbody>
                </table>
            </body>
        </html>
    `),t.document.close(),t.print()};return e.jsxs(V,{children:[e.jsx(ee,{}),e.jsxs(H,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(q,{}),e.jsx(U,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(J,{children:e.jsx(Q,{children:e.jsxs(Y,{children:[e.jsx(I,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(Z,{}),e.jsx(I,{href:"/admin/peripherals","aria-current":"page",className:"font-semibold text-foreground",children:"Peripherals"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(G,{})]})}),e.jsx("main",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h1",{className:"text-2xl font-bold mb-5",children:"Peripherals"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center flex-1",children:[e.jsx(te,{placeholder:"Search peripherals...",value:p,onChange:t=>s(t.target.value),onKeyDown:B,className:"flex-1 min-w-0 sm:max-w-xs w-full border-[hsl(142,34%,51%)]"}),e.jsx(me,{filters:h,filterOptions:E,onApplyFilters:T,onReset:z}),e.jsxs(d,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:L,children:[e.jsx(oe,{className:"h-4 w-4"}),"Print"]})]}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsx(k,{href:"/admin/peripherals/create",children:e.jsx(d,{className:"bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium",children:"Add Peripheral"})})})]}),e.jsx(M,{children:e.jsxs(O,{className:"p-0",children:[e.jsx("div",{className:"rounded-t-lg",children:e.jsxs(K,{className:"w-full table-auto",children:[e.jsx(W,{children:e.jsxs(_,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(u,{children:"#"}),e.jsx(u,{children:"Peripheral Code"}),e.jsx(u,{children:"Type"}),e.jsx(u,{children:"Room"}),e.jsx(u,{children:"Units"}),e.jsx(u,{children:"Condition"}),e.jsx(u,{children:"Actions"})]})}),e.jsx(X,{children:R.length>0?R.map((t,l)=>e.jsxs(_,{children:[e.jsx(m,{children:(o-1)*j+l+1}),e.jsx(m,{children:t.peripheral_code}),e.jsx(m,{children:t.type}),e.jsx(m,{children:t.room?`ROOM ${t.room.room_number}`:"N/A"}),e.jsx(m,{children:t.unit?t.unit.unit_code:"N/A"}),e.jsx(m,{children:t.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${$(t.condition).color}`,children:$(t.condition).label}):"N/A"}),e.jsxs(m,{className:"space-x-2 flex items-center",children:[e.jsx(k,{href:`/admin/peripherals/${t.id}`,children:e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(ae,{className:"h-4 w-4"}),"View"]})}),e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>A(t),children:[e.jsx(ne,{className:"h-4 w-4"}),"Edit"]}),e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-red-600 text-white border-none hover:bg-red-700",onClick:()=>{confirm(`Are you sure you want to delete ${t.peripheral_name}?`)&&P.delete(`/admin/peripherals/${t.id}`)},children:[e.jsx(de,{className:"h-4 w-4"}),"Delete"]})]})]},t.id)):e.jsx(_,{children:e.jsx(m,{colSpan:"10",className:"text-center",children:"No peripherals found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center p-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Showing"," ",f.length===0?0:(o-1)*j+1," ","–",Math.min(o*j,f.length)," ","of ",f.length," peripherals"," "]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(d,{size:"sm",variant:"outline",disabled:o===1,onClick:()=>S(o-1),children:"Previous"}),Array.from({length:y},(t,l)=>l+1).filter(t=>t===1||t===y?!0:t>=o-2&&t<=o+2).map((t,l,r)=>e.jsxs(F.Fragment,{children:[l>0&&r[l]-r[l-1]>1&&e.jsx("span",{className:"px-2",children:"..."}),e.jsx(d,{size:"sm",variant:o===t?"default":"outline",onClick:()=>S(t),children:t})]},t)),e.jsx(d,{size:"sm",variant:"outline",disabled:o===y,onClick:()=>S(o+1),children:"Next"})]})]})]})})]})}),C&&e.jsx(re,{peripheral:C,rooms:c,units:n,onClose:()=>A(null)})]})]})}export{Ze as default};
