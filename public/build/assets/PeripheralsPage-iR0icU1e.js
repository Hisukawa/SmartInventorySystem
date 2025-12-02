import{r as j,j as e,L as I,R as z,a as k}from"./app-BL4_7WAD.js";import{B as c}from"./button-DrdPjYc3.js";import{C as M,a as V}from"./card-DuwSl17X.js";import{S as H,a as U,b as W,c as q}from"./avatar-ngjHZCVA.js";import"./sweetalert2.esm.all-BQIkj5Wb.js";import{N as G}from"./Notification-DhiC1Y-x.js";import{T as K,a as X,b as _,c as p,d as J,e as m}from"./table-D1R8fILw.js";import{B as Q,a as Y,b as Z,c as $,d as ee}from"./breadcrumb-CJCOibQv.js";import{A as te}from"./app-sidebar-BjUaCzkI.js";import{I as re}from"./input-CW5q2XoO.js";import le from"./EditPeripheralModal-BdDfQcfa.js";import{P as se,a as ie,b as oe}from"./popover-CzIEfsSY.js";import{S as f,a as N,b as v,c as C,d as n}from"./select-CLerLsv8.js";import{P as ne}from"./printer-BFMlGtvJ.js";import{E as ae}from"./eye-PLgzP6x6.js";import{P as de}from"./pen-Dzy2_Ar-.js";import{F as ce}from"./funnel-s0ExRxqD.js";import{X as he}from"./index-DpMA_m8y.js";import"./index-ClPKw9pK.js";import"./utils-CBfrqCZ4.js";import"./index-BVMTGCCN.js";import"./index-BS2P4Myb.js";import"./dropdown-menu-CCvIvTqX.js";import"./index-CIBjYzwy.js";import"./createLucideIcon-B9kOub7E.js";import"./chevron-right-D9U7x2_5.js";import"./index-P-AaVXz2.js";import"./index-C9Ln8pzF.js";import"./bell-DJLF3-kw.js";import"./house-BG-JgFxZ.js";import"./user-BA2xn3tz.js";import"./log-out-DzmKMC2N.js";import"./keyboard-BOJpEUU_.js";import"./boxes-r0HADMvc.js";import"./users-B6_T9l18.js";import"./chevron-down-CDAg37Vp.js";import"./dialog-BvwY3AuM.js";import"./label-Cg_3WPUt.js";import"./textarea-DkjWKW1P.js";import"./index-B7yuSMb3.js";function me({filters:i,filterOptions:x,onApplyFilters:d}){const[a,h]=j.useState(""),u=()=>{const l={type:void 0,condition:void 0,room_id:void 0,unit_code:void 0};h(""),d(l)};return e.jsxs(se,{children:[e.jsx(ie,{asChild:!0,children:e.jsxs(c,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(ce,{className:"mr-2 h-4 w-4"}),"Filters"]})}),e.jsx(oe,{className:"w-72",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(f,{value:a,onValueChange:h,children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select filter field"})}),e.jsxs(C,{children:[e.jsx(n,{value:"type",children:"Type"}),e.jsx(n,{value:"condition",children:"Condition"}),e.jsx(n,{value:"room",children:"Room"}),e.jsx(n,{value:"unit",children:"Unit"})]})]}),a==="type"&&e.jsxs(f,{value:i.type||"all",onValueChange:l=>d({...i,type:l==="all"?void 0:l}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Type"})}),e.jsxs(C,{children:[e.jsx(n,{value:"all",children:"All"}),x.types.map(l=>e.jsx(n,{value:l,children:l},l))]})]}),a==="condition"&&e.jsxs(f,{value:i.condition||"all",onValueChange:l=>d({...i,condition:l==="all"?void 0:l}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Condition"})}),e.jsxs(C,{children:[e.jsx(n,{value:"all",children:"All"}),x.conditions.map(l=>e.jsx(n,{value:l,children:l},l))]})]}),a==="room"&&e.jsxs(f,{value:i.room_id||"all",onValueChange:l=>d({...i,room_id:l==="all"?void 0:l,unit_id:void 0}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Room"})}),e.jsxs(C,{children:[e.jsx(n,{value:"all",children:"All"}),Object.entries(x.rooms).map(([l,w])=>e.jsxs(n,{value:l,children:["Room ",w]},l))]})]}),a==="unit"&&e.jsxs(f,{value:i.unit_id||"all",onValueChange:l=>d({...i,unit_id:l==="all"?void 0:l}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Unit"})}),e.jsxs(C,{children:[e.jsx(n,{value:"all",children:"All"}),x.units.length===0&&e.jsx("div",{className:"px-3 py-2 text-sm text-gray-400",children:"No units found for this room"}),x.units.map(l=>e.jsx(n,{value:l.id,children:l.code},l.id))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(c,{size:"sm",variant:"outline",onClick:u,className:"flex items-center gap-1",children:[e.jsx(he,{className:"h-4 w-4"}),"Reset All"]})})]})})]})}const xe=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Intermittent Issue",color:"bg-yellow-500"},{label:"Needs Cleaning",color:"bg-blue-500"},{label:"For Replacement",color:"bg-orange-500"},{label:"For Disposal",color:"bg-gray-500"}];function et({peripherals:i,search:x,existingRooms:d,existingUnits:a,filters:h={}}){const[u,l]=j.useState(x||""),[w,A]=j.useState(null),[o,S]=j.useState(1),b=10,B=j.useMemo(()=>{const t=r=>[...new Set(r.filter(O=>O))].sort(),s=h.room_id?a.filter(r=>String(r.room_id)===String(h.room_id)):a;return{types:t(i.map(r=>r.type)),conditions:t(i.map(r=>r.condition)),rooms:Object.fromEntries(d.map(r=>[String(r.id),r.room_number])),units:s.map(r=>({id:String(r.id),code:r.unit_code}))}},[i,d,a,h.room_id]);function R(t){const s=Object.fromEntries(Object.entries({...t,search:u||void 0}).filter(([,r])=>r!==""&&r!==void 0));k.get("/admin/peripherals",s,{preserveState:!0,replace:!0})}function E(){l(""),k.get("/admin/peripherals",{},{preserveState:!0,replace:!0})}const D=t=>{t.key==="Enter"&&R(h)},g=j.useMemo(()=>{if(!u)return i;const t=u.toLowerCase();return i.filter(s=>[s.peripheral_code,s.type,s.serial_number,s.condition,s.room?.room_number,s.unit_code].filter(Boolean).some(r=>r.toLowerCase().includes(t)))},[i,u]),y=Math.ceil(g.length/b)||1,T=g.slice((o-1)*b,o*b),F=()=>{if(!i||i.length===0){alert("No data available to print.");return}const t=window.open("","","width=900,height=700"),s=i.map(r=>`
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
                        ${s}
                    </tbody>
                </table>
            </body>
        </html>
    `),t.document.close(),t.print()},L={Working:"bg-green-200 text-green-800","Not Working":"bg-red-200 text-red-800","Intermittent Issue":"bg-yellow-200 text-yellow-800","Needs Cleaning":"bg-blue-200 text-blue-800","For Replacement":"bg-orange-200 text-orange-800","For Disposal":"bg-gray-200 text-gray-800",Condemned:"bg-black text-white","Needs Repair":"bg-red-200 text-red-800","No Signal":"bg-red-200 text-red-800","Needs Configuration":"bg-blue-200 text-blue-800","Under Maintenance":"bg-blue-200 text-blue-900","To Be Diagnosed":"bg-blue-100 text-blue-800"};function P(t){if(!t)return{label:"N/A",color:"bg-slate-400 text-white"};const s=L[t]||"bg-slate-400 text-white";return{label:t,color:s}}return e.jsxs(H,{children:[e.jsx(te,{}),e.jsxs(U,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(W,{}),e.jsx(q,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(Q,{children:e.jsx(Y,{children:e.jsxs(Z,{children:[e.jsx($,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(ee,{}),e.jsx($,{href:"/admin/peripherals","aria-current":"page",className:"font-semibold text-foreground",children:"Peripherals"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(G,{})]})}),e.jsx("main",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h1",{className:"text-2xl font-bold mb-5",children:"Peripherals"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center flex-1",children:[e.jsx(re,{placeholder:"Search peripherals...",value:u,onChange:t=>l(t.target.value),onKeyDown:D,className:"flex-1 min-w-0 sm:max-w-xs w-full border-[hsl(142,34%,51%)]"}),e.jsx(me,{filters:h,filterOptions:B,onApplyFilters:R,onReset:E}),e.jsxs(c,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:F,children:[e.jsx(ne,{className:"h-4 w-4"}),"Print"]})]}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsx(I,{href:"/admin/peripherals/create",children:e.jsx(c,{className:"bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium",children:"Add Peripheral"})})})]}),e.jsx(M,{children:e.jsxs(V,{className:"p-0",children:[e.jsx("div",{className:"rounded-t-lg",children:e.jsxs(K,{className:"w-full table-auto",children:[e.jsx(X,{children:e.jsxs(_,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(p,{children:"#"}),e.jsx(p,{children:"Peripheral Code"}),e.jsx(p,{children:"Type"}),e.jsx(p,{children:"Room"}),e.jsx(p,{children:"Units"}),e.jsx(p,{children:"Condition"}),e.jsx(p,{children:"Actions"})]})}),e.jsx(J,{children:T.length>0?T.map((t,s)=>e.jsxs(_,{children:[e.jsx(m,{children:(o-1)*b+s+1}),e.jsx(m,{children:t.peripheral_code}),e.jsx(m,{children:t.type}),e.jsx(m,{children:t.room?`ROOM ${t.room.room_number}`:"N/A"}),e.jsx(m,{children:t.unit?t.unit.unit_code:"N/A"}),e.jsx(m,{children:t.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${P(t.condition).color}`,children:P(t.condition).label}):"N/A"}),e.jsxs(m,{className:"space-x-2 flex items-center",children:[e.jsx(I,{href:`/admin/peripherals/${t.id}`,children:e.jsxs(c,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(ae,{className:"h-4 w-4"}),"View"]})}),e.jsxs(c,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>A(t),children:[e.jsx(de,{className:"h-4 w-4"}),"Edit"]})]})]},t.id)):e.jsx(_,{children:e.jsx(m,{colSpan:"10",className:"text-center",children:"No peripherals found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center p-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Showing"," ",g.length===0?0:(o-1)*b+1," ","–",Math.min(o*b,g.length)," ","of ",g.length," peripherals"," "]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(c,{size:"sm",variant:"outline",disabled:o===1,onClick:()=>S(o-1),children:"Previous"}),Array.from({length:y},(t,s)=>s+1).filter(t=>t===1||t===y?!0:t>=o-2&&t<=o+2).map((t,s,r)=>e.jsxs(z.Fragment,{children:[s>0&&r[s]-r[s-1]>1&&e.jsx("span",{className:"px-2",children:"..."}),e.jsx(c,{size:"sm",variant:o===t?"default":"outline",onClick:()=>S(t),children:t})]},t)),e.jsx(c,{size:"sm",variant:"outline",disabled:o===y,onClick:()=>S(o+1),children:"Next"})]})]})]})})]})}),w&&e.jsx(le,{peripheral:w,rooms:d,units:a,onClose:()=>A(null)})]})]})}export{et as default};
