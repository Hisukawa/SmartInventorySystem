import{r as b,j as e,L as k,R as L,a as $}from"./app-C8xji-xB.js";import{B as c}from"./button-D6SqGh8R.js";import{C as O,a as V}from"./card-Bz_KAWLt.js";import{S as U,a as W,b as q,c as H}from"./avatar-DsM5UJtw.js";import"./sweetalert2.esm.all-BQIkj5Wb.js";import{N as G}from"./Notification-DXToUKDW.js";import{T as K,a as X,b as P,c as p,d as J,e as m}from"./table-JOCpzPX0.js";import{B as Q,a as Y,b as Z,c as B,d as ee}from"./breadcrumb-D_vrbkbl.js";import{A as te}from"./app-sidebar-fS2C3XRa.js";import{I as re}from"./input-J2oEVcz0.js";import se from"./EditPeripheralModal-BxdzJCbD.js";import{P as ie,a as le,b as ne}from"./popover-CSGulUFp.js";import{S as f,a as N,b as v,c as w,d as o}from"./select-FH5PZWXs.js";import{P as oe}from"./printer-D8VuipVI.js";import{E as ae}from"./eye-CLbuygKr.js";import{P as de}from"./pen-DAgx8Ha9.js";import{F as ce}from"./funnel-dduSbCYU.js";import{X as he}from"./index-C7qpjDYg.js";import"./index-C3BOystQ.js";import"./utils-CBfrqCZ4.js";import"./index-gB7mDNwa.js";import"./index-DIgws4s-.js";import"./dropdown-menu-CnqVeATj.js";import"./index-MOFcpEWm.js";import"./createLucideIcon-5bVXFLQp.js";import"./chevron-right-CPw-Qeh9.js";import"./index-Cj-bwISf.js";import"./index-CLHz5EzA.js";import"./bell-DAtnEcRf.js";import"./house-Cozeal1M.js";import"./user-DKlcf8nr.js";import"./log-out-Cj4M0Gnq.js";import"./keyboard-MxW-MfuZ.js";import"./boxes-CK_cv89m.js";import"./users-CpfezLX1.js";import"./chevron-down-geM9PdfF.js";import"./dialog-CVFnMWfI.js";import"./label-CU1czRKf.js";import"./textarea-COOHS98D.js";import"./index-CZS4_dsv.js";function me({filters:l,filterOptions:x,onApplyFilters:d}){const[a,h]=b.useState(""),u=()=>{const s={type:void 0,condition:void 0,room_id:void 0,unit_code:void 0};h(""),d(s)};return e.jsxs(ie,{children:[e.jsx(le,{asChild:!0,children:e.jsxs(c,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(ce,{className:"mr-2 h-4 w-4"}),"Filters"]})}),e.jsx(ne,{className:"w-72",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(f,{value:a,onValueChange:h,children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select filter field"})}),e.jsxs(w,{children:[e.jsx(o,{value:"type",children:"Type"}),e.jsx(o,{value:"condition",children:"Condition"}),e.jsx(o,{value:"room",children:"Room"}),e.jsx(o,{value:"unit",children:"Unit"})]})]}),a==="type"&&e.jsxs(f,{value:l.type||"all",onValueChange:s=>d({...l,type:s==="all"?void 0:s}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Type"})}),e.jsxs(w,{children:[e.jsx(o,{value:"all",children:"All"}),x.types.map(s=>e.jsx(o,{value:s,children:s},s))]})]}),a==="condition"&&e.jsxs(f,{value:l.condition||"all",onValueChange:s=>d({...l,condition:s==="all"?void 0:s}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Condition"})}),e.jsxs(w,{children:[e.jsx(o,{value:"all",children:"All"}),x.conditions.map(s=>e.jsx(o,{value:s,children:s},s))]})]}),a==="room"&&e.jsxs(f,{value:l.room_id||"all",onValueChange:s=>d({...l,room_id:s==="all"?void 0:s,unit_id:void 0}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Room"})}),e.jsxs(w,{children:[e.jsx(o,{value:"all",children:"All"}),Object.entries(x.rooms).map(([s,C])=>e.jsxs(o,{value:s,children:["Room ",C]},s))]})]}),a==="unit"&&e.jsxs(f,{value:l.unit_id||"all",onValueChange:s=>d({...l,unit_id:s==="all"?void 0:s}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Unit"})}),e.jsxs(w,{children:[e.jsx(o,{value:"all",children:"All"}),x.units.length===0&&e.jsx("div",{className:"px-3 py-2 text-sm text-gray-400",children:"No units found for this room"}),x.units.map(s=>e.jsx(o,{value:s.id,children:s.code},s.id))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(c,{size:"sm",variant:"outline",onClick:u,className:"flex items-center gap-1",children:[e.jsx(he,{className:"h-4 w-4"}),"Reset All"]})})]})})]})}function Ze({peripherals:l,search:x,existingRooms:d,existingUnits:a,filters:h={}}){const[u,s]=b.useState(x||""),[C,_]=b.useState(null),[n,S]=b.useState(1),j=10,I=b.useMemo(()=>{const t=r=>[...new Set(r.filter(F=>F))].sort(),i=h.room_id?a.filter(r=>String(r.room_id)===String(h.room_id)):a;return{types:t(l.map(r=>r.type)),conditions:t(l.map(r=>r.condition)),rooms:Object.fromEntries(d.map(r=>[String(r.id),r.room_number])),units:i.map(r=>({id:String(r.id),code:r.unit_code}))}},[l,d,a,h.room_id]);function A(t){const i=Object.fromEntries(Object.entries({...t,search:u||void 0}).filter(([,r])=>r!==""&&r!==void 0));$.get("/admin/peripherals",i,{preserveState:!0,replace:!0})}function z(){s(""),$.get("/admin/peripherals",{},{preserveState:!0,replace:!0})}const E=t=>{t.key==="Enter"&&A(h)},g=b.useMemo(()=>{if(!u)return l;const t=u.toLowerCase();return l.filter(i=>[i.peripheral_code,i.type,i.serial_number,i.condition,i.room?.room_number,i.unit_code].filter(Boolean).some(r=>r.toLowerCase().includes(t)))},[l,u]),y=Math.ceil(g.length/j)||1,R=g.slice((n-1)*j,n*j),M=()=>{if(!l||l.length===0){alert("No data available to print.");return}const t=window.open("","","width=900,height=700"),i=l.map(r=>`
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
                        ${i}
                    </tbody>
                </table>
            </body>
        </html>
    `),t.document.close(),t.print()},D={Working:"bg-green-200 text-green-800","Not Working":"bg-red-200 text-red-800","Intermittent Issue":"bg-yellow-200 text-yellow-800","Needs Cleaning":"bg-blue-200 text-blue-800","For Replacement":"bg-orange-200 text-orange-800","For Disposal":"bg-gray-200 text-gray-800",Condemned:"bg-black text-white","Needs Repair":"bg-red-200 text-red-800","No Signal":"bg-red-200 text-red-800","Needs Configuration":"bg-blue-200 text-blue-800","Under Maintenance":"bg-blue-200 text-blue-900","To Be Diagnosed":"bg-blue-100 text-blue-700"};function T(t){if(!t)return{label:"N/A",color:"bg-slate-400 text-white"};const i=D[t]||"bg-slate-400 text-white";return{label:t,color:i}}return e.jsxs(U,{children:[e.jsx(te,{}),e.jsxs(W,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(q,{}),e.jsx(H,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(Q,{children:e.jsx(Y,{children:e.jsxs(Z,{children:[e.jsx(B,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(ee,{}),e.jsx(B,{href:"/admin/peripherals","aria-current":"page",className:"font-semibold text-foreground",children:"Peripherals"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(G,{})]})}),e.jsx("main",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h1",{className:"text-2xl font-bold mb-5",children:"Peripherals"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center flex-1",children:[e.jsx(re,{placeholder:"Search peripherals...",value:u,onChange:t=>s(t.target.value),onKeyDown:E,className:"flex-1 min-w-0 sm:max-w-xs w-full border-[hsl(142,34%,51%)]"}),e.jsx(me,{filters:h,filterOptions:I,onApplyFilters:A,onReset:z}),e.jsxs(c,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:M,children:[e.jsx(oe,{className:"h-4 w-4"}),"Print"]})]}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsx(k,{href:"/admin/peripherals/create",children:e.jsx(c,{className:"bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium",children:"Add Peripheral"})})})]}),e.jsx(O,{children:e.jsxs(V,{className:"p-0",children:[e.jsx("div",{className:"rounded-t-lg",children:e.jsxs(K,{className:"w-full table-auto",children:[e.jsx(X,{children:e.jsxs(P,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(p,{children:"#"}),e.jsx(p,{children:"Peripheral Code"}),e.jsx(p,{children:"Type"}),e.jsx(p,{children:"Room"}),e.jsx(p,{children:"Units"}),e.jsx(p,{children:"Condition"}),e.jsx(p,{children:"Actions"})]})}),e.jsx(J,{children:R.length>0?R.map((t,i)=>e.jsxs(P,{children:[e.jsx(m,{children:(n-1)*j+i+1}),e.jsx(m,{children:t.peripheral_code}),e.jsx(m,{children:t.type}),e.jsx(m,{children:t.room?`ROOM ${t.room.room_number}`:"N/A"}),e.jsx(m,{children:t.unit?t.unit.unit_code:"N/A"}),e.jsx(m,{children:t.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${T(t.condition).color}`,children:T(t.condition).label}):"N/A"}),e.jsxs(m,{className:"space-x-2 flex items-center",children:[e.jsx(k,{href:`/admin/peripherals/${t.id}`,children:e.jsxs(c,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(ae,{className:"h-4 w-4"}),"View"]})}),e.jsxs(c,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>_(t),children:[e.jsx(de,{className:"h-4 w-4"}),"Edit"]})]})]},t.id)):e.jsx(P,{children:e.jsx(m,{colSpan:"10",className:"text-center",children:"No peripherals found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center p-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Showing"," ",g.length===0?0:(n-1)*j+1," ","–",Math.min(n*j,g.length)," ","of ",g.length," peripherals"," "]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(c,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>S(n-1),children:"Previous"}),Array.from({length:y},(t,i)=>i+1).filter(t=>t===1||t===y?!0:t>=n-2&&t<=n+2).map((t,i,r)=>e.jsxs(L.Fragment,{children:[i>0&&r[i]-r[i-1]>1&&e.jsx("span",{className:"px-2",children:"..."}),e.jsx(c,{size:"sm",variant:n===t?"default":"outline",onClick:()=>S(t),children:t})]},t)),e.jsx(c,{size:"sm",variant:"outline",disabled:n===y,onClick:()=>S(n+1),children:"Next"})]})]})]})})]})}),C&&e.jsx(se,{peripheral:C,rooms:d,units:a,onClose:()=>_(null)})]})]})}export{Ze as default};
