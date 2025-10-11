import{r as u,j as e,L as $,R as F,a as k}from"./app-R59AgTg3.js";import{B as d}from"./button-DUunvkwS.js";import{C as D,a as O}from"./card-g-1pmpnp.js";import{S as M,a as V,b as U,c as H}from"./avatar-B6LBOXhP.js";import"./sweetalert2.esm.all-BQIkj5Wb.js";import{N as q}from"./Notification-CF-jvzA4.js";import{T as G,a as K,b as P,c as x,d as W,e as c}from"./table-DjXEBKHJ.js";import{B as X,a as J,b as Q,c as I,d as Y}from"./breadcrumb-CywDlYat.js";import{A as Z}from"./app-sidebar-CocvIPWR.js";import{I as ee}from"./input-Cjcb1XXh.js";import te from"./EditPeripheralModal-BNu4_oss.js";import{P as re,a as se,b as le}from"./popover-oWTaW9Cl.js";import{S as b,a as f,b as g,c as v,d as o}from"./select-H4pFk2ME.js";import{P as ie}from"./printer-Dcb-M0U0.js";import{E as oe}from"./eye-BuMQwTsy.js";import{P as ae}from"./pen-DTqWI1Jt.js";import{F as ne}from"./funnel-tGP2NP7F.js";import{X as de}from"./index-CPvmv8yZ.js";import"./index-DurLkVUy.js";import"./utils-CBfrqCZ4.js";import"./createLucideIcon-BRqj4ZpW.js";import"./index-Cpb0aSub.js";import"./index-B4D52uEu.js";import"./index-DulClGaF.js";import"./dropdown-menu-DEfTj1Cp.js";import"./index-kdZ0iaiW.js";import"./chevron-right-DiwCHu_D.js";import"./index-0a4pAYos.js";import"./index-WPOC8fpL.js";import"./bell-D4LjbV-4.js";import"./sparkles-CYWeqXNt.js";import"./keyboard-CNVVLoqW.js";import"./boxes-CWfJ03mT.js";import"./users-CweJ4Eq4.js";import"./user-bNgG0aCA.js";import"./chevron-down-CdK_YvPQ.js";import"./dialog-BrOBJ2RO.js";import"./label-DXgCMS9Y.js";import"./textarea-DjD34OZM.js";import"./index-CK0qY2tO.js";function ce({filters:i,filterOptions:p,onApplyFilters:n}){const[h,j]=u.useState(""),m=()=>{const r={type:void 0,condition:void 0,room_id:void 0,unit_code:void 0};j(""),n(r)};return e.jsxs(re,{children:[e.jsx(se,{asChild:!0,children:e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(ne,{className:"mr-2 h-4 w-4"}),"Filters"]})}),e.jsx(le,{className:"w-72",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(b,{value:h,onValueChange:j,children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select filter field"})}),e.jsxs(v,{children:[e.jsx(o,{value:"type",children:"Type"}),e.jsx(o,{value:"condition",children:"Condition"}),e.jsx(o,{value:"room",children:"Room"}),e.jsx(o,{value:"unit",children:"Unit"})]})]}),h==="type"&&e.jsxs(b,{value:i.type||"all",onValueChange:r=>n({...i,type:r==="all"?void 0:r}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Type"})}),e.jsxs(v,{children:[e.jsx(o,{value:"all",children:"All"}),p.types.map(r=>e.jsx(o,{value:r,children:r},r))]})]}),h==="condition"&&e.jsxs(b,{value:i.condition||"all",onValueChange:r=>n({...i,condition:r==="all"?void 0:r}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Condition"})}),e.jsxs(v,{children:[e.jsx(o,{value:"all",children:"All"}),p.conditions.map(r=>e.jsx(o,{value:r,children:r},r))]})]}),h==="room"&&e.jsxs(b,{value:i.room_id||"all",onValueChange:r=>n({...i,room_id:r==="all"?void 0:r}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Room"})}),e.jsxs(v,{children:[e.jsx(o,{value:"all",children:"All"}),Object.entries(p.rooms).map(([r,N])=>e.jsxs(o,{value:r,children:["Room ",N]},r))]})]}),h==="unit"&&e.jsxs(b,{value:i.unit_code||"all",onValueChange:r=>n({...i,unit_code:r==="all"?void 0:r}),children:[e.jsx(f,{children:e.jsx(g,{placeholder:"Select Unit"})}),e.jsxs(v,{children:[e.jsx(o,{value:"all",children:"All"}),p.units.map(r=>e.jsx(o,{value:r,children:r},r))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(d,{size:"sm",variant:"outline",onClick:m,className:"flex items-center gap-1",children:[e.jsx(de,{className:"h-4 w-4"}),"Reset All"]})})]})})]})}const he=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Intermittent Issue",color:"bg-yellow-500"},{label:"Needs Cleaning",color:"bg-blue-500"},{label:"For Replacement",color:"bg-orange-500"},{label:"For Disposal",color:"bg-gray-500"}];function Ye({peripherals:i,search:p,existingRooms:n,existingUnits:h,filters:j={}}){const[m,r]=u.useState(p||""),[N,y]=u.useState(null),[a,S]=u.useState(1),w=10,E=u.useMemo(()=>{const t=s=>[...new Set(s.filter(l=>l))].sort();return{types:t(i.map(s=>s.type)),conditions:t(i.map(s=>s.condition)),rooms:Object.fromEntries(n.map(s=>[String(s.id),s.room_number])),units:t(i.map(s=>s.unit_code))}},[i,n]);function _(t){const s=Object.fromEntries(Object.entries({...t,search:m||void 0}).filter(([,l])=>l!==""&&l!==void 0));k.get("/admin/peripherals",s,{preserveState:!0,replace:!0})}function B(){r(""),k.get("/admin/peripherals",{},{preserveState:!0,replace:!0})}const z=t=>{t.key==="Enter"&&_(j)},A=u.useMemo(()=>{if(!m)return i;const t=m.toLowerCase();return i.filter(s=>[s.peripheral_code,s.type,s.serial_number,s.condition,s.room?.room_number,s.unit_code].filter(Boolean).some(l=>l.toLowerCase().includes(t)))},[i,m]),C=Math.ceil(A.length/w)||1,R=A.slice((a-1)*w,a*w);function T(t){return he.find(s=>s.label.toLowerCase()===t?.toLowerCase())||{label:t,color:"bg-slate-400"}}const L=()=>{if(!i||i.length===0){alert("No data available to print.");return}const t=window.open("","","width=900,height=700"),s=i.map(l=>`
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
    `),t.document.close(),t.print()};return e.jsxs(M,{children:[e.jsx(Z,{}),e.jsxs(V,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(U,{}),e.jsx(H,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(X,{children:e.jsx(J,{children:e.jsxs(Q,{children:[e.jsx(I,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(Y,{}),e.jsx(I,{href:"/admin/peripherals","aria-current":"page",className:"font-semibold text-foreground",children:"Peripherals"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(q,{})]})}),e.jsx("main",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h1",{className:"text-2xl font-bold mb-5",children:"Peripherals"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(ce,{filters:j,filterOptions:E,onApplyFilters:_,onReset:B}),e.jsxs(d,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:L,children:[e.jsx(ie,{className:"h-4 w-4"}),"Print"]}),e.jsx(ee,{placeholder:"Search peripherals...",value:m,onChange:t=>r(t.target.value),onKeyDown:z,className:`flex-1 min-w-0 sm:max-w-xs w-full
                                        border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
                                        focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
                                        placeholder:text-[hsl(142,34%,40%)]`})]}),e.jsx("div",{className:"flex items-center space-x-4",children:e.jsx($,{href:"/admin/peripherals/create",children:e.jsx(d,{className:"bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium",children:"Add Peripheral"})})})]}),e.jsx(D,{children:e.jsxs(O,{className:"p-0",children:[e.jsx("div",{className:"rounded-t-lg",children:e.jsxs(G,{className:"w-full table-auto",children:[e.jsx(K,{children:e.jsxs(P,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(x,{children:"#"}),e.jsx(x,{children:"Peripheral Code"}),e.jsx(x,{children:"Type"}),e.jsx(x,{children:"Room"}),e.jsx(x,{children:"Units"}),e.jsx(x,{children:"Condition"}),e.jsx(x,{children:"Actions"})]})}),e.jsx(W,{children:R.length>0?R.map((t,s)=>e.jsxs(P,{children:[e.jsx(c,{children:(a-1)*w+s+1}),e.jsx(c,{children:t.peripheral_code}),e.jsx(c,{children:t.type}),e.jsx(c,{children:t.room?`ROOM ${t.room.room_number}`:"N/A"}),e.jsx(c,{children:t.unit?t.unit.unit_code:"N/A"}),e.jsx(c,{children:t.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${T(t.condition).color}`,children:T(t.condition).label}):"N/A"}),e.jsxs(c,{className:"space-x-2 flex items-center",children:[e.jsx($,{href:`/admin/peripherals/${t.id}`,children:e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(oe,{className:"h-4 w-4"}),"View"]})}),e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>y(t),children:[e.jsx(ae,{className:"h-4 w-4"}),"Edit"]})]})]},t.id)):e.jsx(P,{children:e.jsx(c,{colSpan:"10",className:"text-center",children:"No peripherals found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center p-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Page ",a," of ",C]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(d,{size:"sm",variant:"outline",disabled:a===1,onClick:()=>S(a-1),children:"Previous"}),Array.from({length:C},(t,s)=>s+1).filter(t=>t===1||t===C?!0:t>=a-2&&t<=a+2).map((t,s,l)=>e.jsxs(F.Fragment,{children:[s>0&&l[s]-l[s-1]>1&&e.jsx("span",{className:"px-2",children:"..."}),e.jsx(d,{size:"sm",variant:a===t?"default":"outline",onClick:()=>S(t),children:t})]},t)),e.jsx(d,{size:"sm",variant:"outline",disabled:a===C,onClick:()=>S(a+1),children:"Next"})]})]})]})})]})}),N&&e.jsx(te,{peripheral:N,rooms:n,units:h,onClose:()=>y(null)})]})]})}export{Ye as default};
