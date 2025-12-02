import{r as b,j as e,L as A,R as U,a as I}from"./app-DKV907RP.js";import{B as c}from"./button-D2JjSF3J.js";import"./card-DbEPW8Ro.js";import{S as W,a as q,b as H,c as G}from"./avatar-h886Z9t_.js";import"./sweetalert2.esm.all-BQIkj5Wb.js";import{N as K}from"./Notification-BaWgVLIN.js";import{T as X,a as J,b as k,c as u,d as Q,e as h}from"./table-xKYIpGpY.js";import{B as Y,a as Z,b as ee,c as B,d as te}from"./breadcrumb-CEbau7es.js";import{A as se}from"./app-sidebar-cgXsekSM.js";import{I as re}from"./input-DAiOWg2R.js";import le from"./EditPeripheralModal-CDxQaoHD.js";import{P as ie,a as ae,b as ne}from"./popover-Dlb6KtKw.js";import{S as f,a as N,b as v,c as y,d as n}from"./select-BkoCITd8.js";import{P as oe}from"./printer-wEbukDc_.js";import{E}from"./eye-B9qKMSqY.js";import{P as z}from"./pen-CPdzHY0B.js";import{l as w,E as de}from"./menu-8TWllaKl.js";import{F as ce}from"./funnel-mLG3cTkK.js";import{X as me}from"./index-3_eOG5IX.js";import"./index-Wjq05eL6.js";import"./utils-CBfrqCZ4.js";import"./index-BOTnPqEv.js";import"./index-xQKBZWXZ.js";import"./dropdown-menu-Bg9OzRbR.js";import"./index-BbFce3MG.js";import"./createLucideIcon-BrVGsLC9.js";import"./chevron-right-hAAKtYTh.js";import"./index-yLLINeF8.js";import"./index-CMUnnsqq.js";import"./bell-BhcYusEp.js";import"./house-1TXp3dC5.js";import"./user-CsePjm4j.js";import"./log-out-DOKwsBRo.js";import"./keyboard-BWRhjeCq.js";import"./boxes-CLnEnfIC.js";import"./users-Bk-exsre.js";import"./chevron-down-8tHTGOYd.js";import"./dialog-Bqu_bqOg.js";import"./label-CGjMVqBW.js";import"./textarea-BsHC7W0s.js";import"./index-DH1zTZH_.js";import"./portal-B57eCZgK.js";import"./open-closed-JAWqKeZs.js";import"./with-selector-VSowfkMS.js";function he({filters:i,filterOptions:x,onApplyFilters:d}){const[o,m]=b.useState(""),p=()=>{const r={type:void 0,condition:void 0,room_id:void 0,unit_code:void 0};m(""),d(r)};return e.jsxs(ie,{children:[e.jsx(ae,{asChild:!0,children:e.jsxs(c,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(ce,{className:"mr-2 h-4 w-4"}),"Filters"]})}),e.jsx(ne,{className:"w-72",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(f,{value:o,onValueChange:m,children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select filter field"})}),e.jsxs(y,{children:[e.jsx(n,{value:"type",children:"Type"}),e.jsx(n,{value:"condition",children:"Condition"}),e.jsx(n,{value:"room",children:"Room"}),e.jsx(n,{value:"unit",children:"Unit"})]})]}),o==="type"&&e.jsxs(f,{value:i.type||"all",onValueChange:r=>d({...i,type:r==="all"?void 0:r}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Type"})}),e.jsxs(y,{children:[e.jsx(n,{value:"all",children:"All"}),x.types.map(r=>e.jsx(n,{value:r,children:r},r))]})]}),o==="condition"&&e.jsxs(f,{value:i.condition||"all",onValueChange:r=>d({...i,condition:r==="all"?void 0:r}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Condition"})}),e.jsxs(y,{children:[e.jsx(n,{value:"all",children:"All"}),x.conditions.map(r=>e.jsx(n,{value:r,children:r},r))]})]}),o==="room"&&e.jsxs(f,{value:i.room_id||"all",onValueChange:r=>d({...i,room_id:r==="all"?void 0:r,unit_id:void 0}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Room"})}),e.jsxs(y,{children:[e.jsx(n,{value:"all",children:"All"}),Object.entries(x.rooms).map(([r,S])=>e.jsxs(n,{value:r,children:["Room ",S]},r))]})]}),o==="unit"&&e.jsxs(f,{value:i.unit_id||"all",onValueChange:r=>d({...i,unit_id:r==="all"?void 0:r}),children:[e.jsx(N,{children:e.jsx(v,{placeholder:"Select Unit"})}),e.jsxs(y,{children:[e.jsx(n,{value:"all",children:"All"}),x.units.length===0&&e.jsx("div",{className:"px-3 py-2 text-sm text-gray-400",children:"No units found for this room"}),x.units.map(r=>e.jsx(n,{value:r.id,children:r.code},r.id))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(c,{size:"sm",variant:"outline",onClick:p,className:"flex items-center gap-1",children:[e.jsx(me,{className:"h-4 w-4"}),"Reset All"]})})]})})]})}function rt({peripherals:i,search:x,existingRooms:d,existingUnits:o,filters:m={}}){const[p,r]=b.useState(x||""),[S,C]=b.useState(null),[a,P]=b.useState(1),j=10,M=b.useMemo(()=>{const t=s=>[...new Set(s.filter(O=>O))].sort(),l=m.room_id?o.filter(s=>String(s.room_id)===String(m.room_id)):o;return{types:t(i.map(s=>s.type)),conditions:t(i.map(s=>s.condition)),rooms:Object.fromEntries(d.map(s=>[String(s.id),s.room_number])),units:l.map(s=>({id:String(s.id),code:s.unit_code}))}},[i,d,o,m.room_id]);function R(t){const l=Object.fromEntries(Object.entries({...t,search:p||void 0}).filter(([,s])=>s!==""&&s!==void 0));I.get("/admin/peripherals",l,{preserveState:!0,replace:!0})}function V(){r(""),I.get("/admin/peripherals",{},{preserveState:!0,replace:!0})}const D=t=>{t.key==="Enter"&&R(m)},g=b.useMemo(()=>{if(!p)return i;const t=p.toLowerCase();return i.filter(l=>[l.peripheral_code,l.type,l.serial_number,l.condition,l.room?.room_number,l.unit_code].filter(Boolean).some(s=>s.toLowerCase().includes(t)))},[i,p]),_=Math.ceil(g.length/j)||1,T=g.slice((a-1)*j,a*j),F=()=>{if(!i||i.length===0){alert("No data available to print.");return}const t=window.open("","","width=900,height=700"),l=i.map(s=>`
        <tr>
            <td>${s.id}</td>
            <td>${s.peripheral_code}</td>
            <td>${s.type}</td>
            <td>${s.brand??"N/A"}</td>
            <td>${s.model??"N/A"}</td>
            <td>${s.serial_number??"N/A"}</td>
            <td>${s.condition??"N/A"}</td>
            <td>${s.room?.room_number??"N/A"}</td>
            <td>${s.unit?.unit_code??"N/A"}</td>
            <td>${s.unit?.mr_to?.name??"N/A"}</td>
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
    `),t.document.close(),t.print()},L={Working:"bg-green-200 text-green-800","Not Working":"bg-red-200 text-red-800","Intermittent Issue":"bg-yellow-200 text-yellow-800","Needs Cleaning":"bg-blue-200 text-blue-800","For Replacement":"bg-orange-200 text-orange-800","For Disposal":"bg-gray-200 text-gray-800",Condemned:"bg-black text-white","Needs Repair":"bg-red-200 text-red-800","No Signal":"bg-red-200 text-red-800","Needs Configuration":"bg-blue-200 text-blue-800","Under Maintenance":"bg-blue-200 text-blue-900","To Be Diagnosed":"bg-blue-100 text-blue-700"};function $(t){if(!t)return{label:"N/A",color:"bg-slate-400 text-white"};const l=L[t]||"bg-slate-400 text-white";return{label:t,color:l}}return e.jsxs(W,{children:[e.jsx(se,{}),e.jsxs(q,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(H,{}),e.jsx(G,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(Y,{children:e.jsx(Z,{children:e.jsxs(ee,{children:[e.jsx(B,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(te,{}),e.jsx(B,{href:"/admin/peripherals","aria-current":"page",className:"font-semibold text-foreground",children:"Peripherals"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(K,{})]})}),e.jsx("main",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h1",{className:"text-2xl font-bold mb-5",children:"Peripherals"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center flex-1",children:[e.jsx(re,{placeholder:"Search peripherals...",value:p,onChange:t=>r(t.target.value),onKeyDown:D,className:"flex-1 min-w-0 sm:max-w-xs w-full border-[hsl(142,34%,51%)]"}),e.jsx(he,{filters:m,filterOptions:M,onApplyFilters:R,onReset:V}),e.jsxs(c,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:F,children:[e.jsx(oe,{className:"h-4 w-4"}),"Print"]})]}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsx(A,{href:"/admin/peripherals/create",children:e.jsx(c,{className:"bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium",children:"Add Peripheral"})})})]}),e.jsx("div",{className:"overflow-x-auto rounded-lg shadow-lg",children:e.jsxs(X,{className:"w-full table-auto",children:[e.jsx(J,{children:e.jsxs(k,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10 text-center",children:[e.jsx(u,{className:"px-5 py-1 text-center",children:"#"}),e.jsx(u,{className:"px-5 py-1 text-center",children:"Peripheral Code"}),e.jsx(u,{className:"px-5 py-1 text-center",children:"Type"}),e.jsx(u,{className:"px-5 py-1 text-center",children:"Room"}),e.jsx(u,{className:"px-5 py-1 text-center",children:"Units"}),e.jsx(u,{className:"px-5 py-1 text-center",children:"Condition"}),e.jsx(u,{className:"px-5 py-1 text-center",children:"Actions"})]})}),e.jsx(Q,{children:T.length>0?T.map((t,l)=>e.jsxs(k,{className:"hover:shadow-sm text-center",children:[e.jsx(h,{className:"px-5 py-2 align-middle",children:(a-1)*j+l+1}),e.jsx(h,{className:"px-5 py-2 align-middle",children:t.peripheral_code}),e.jsx(h,{className:"px-5 py-2 align-middle",children:t.type}),e.jsx(h,{className:"px-5 py-2 align-middle",children:t.room?`ROOM ${t.room.room_number}`:"N/A"}),e.jsx(h,{className:"px-5 py-2 align-middle",children:t.unit?t.unit.unit_code:"N/A"}),e.jsx(h,{className:"px-5 py-2 align-middle",children:t.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${$(t.condition).color}`,children:$(t.condition).label}):"N/A"}),e.jsxs(h,{className:"px-5 py-2 align-middle",children:[e.jsxs("div",{className:"hidden sm:flex justify-center items-center gap-2",children:[e.jsx(A,{href:`/admin/peripherals/${t.id}`,children:e.jsxs(c,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(E,{className:"h-4 w-4"})," ","View"]})}),e.jsxs(c,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>C(t),children:[e.jsx(z,{className:"h-4 w-4"})," ","Edit"]})]}),e.jsx("div",{className:"sm:hidden flex justify-center",children:e.jsxs(w,{as:"div",className:"relative inline-block text-left",children:[e.jsx(w.Button,{className:"p-2 rounded bg-[hsl(142,34%,51%)] text-white",children:e.jsx(de,{className:"h-5 w-5"})}),e.jsx(w.Items,{className:"absolute right-0 mt-2 w-28 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50",children:e.jsxs("div",{className:"px-1 py-1",children:[e.jsx(w.Item,{children:({active:s})=>e.jsxs(A,{href:`/admin/peripherals/${t.id}`,className:`${s?"bg-[hsl(142,34%,90%)]":""} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`,children:[e.jsx(E,{className:"h-4 w-4 mr-2"})," ","View"]})}),e.jsx(w.Item,{children:({active:s})=>e.jsxs("button",{className:`${s?"bg-[hsl(142,34%,90%)]":""} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`,onClick:()=>C(t),children:[e.jsx(z,{className:"h-4 w-4 mr-2"})," ","Edit"]})})]})})]})})]})]},t.id)):e.jsx(k,{children:e.jsx(h,{colSpan:8,className:"text-center py-4",children:"No peripherals found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center p-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Showing"," ",g.length===0?0:(a-1)*j+1," ","–",Math.min(a*j,g.length)," ","of ",g.length," peripherals"," "]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(c,{size:"sm",variant:"outline",disabled:a===1,onClick:()=>P(a-1),children:"Previous"}),Array.from({length:_},(t,l)=>l+1).filter(t=>t===1||t===_?!0:t>=a-2&&t<=a+2).map((t,l,s)=>e.jsxs(U.Fragment,{children:[l>0&&s[l]-s[l-1]>1&&e.jsx("span",{className:"px-2",children:"..."}),e.jsx(c,{size:"sm",variant:a===t?"default":"outline",onClick:()=>P(t),children:t})]},t)),e.jsx(c,{size:"sm",variant:"outline",disabled:a===_,onClick:()=>P(a+1),children:"Next"})]})]})]})}),S&&e.jsx(le,{peripheral:S,rooms:d,units:o,onClose:()=>C(null)})]})]})}export{rt as default};
