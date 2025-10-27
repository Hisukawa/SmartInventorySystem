import{r as v,u as I,j as e,a as k,R as B}from"./app-C8AU55Ti.js";import{B as d}from"./button-Bf0m1E31.js";import{A as $}from"./app-sidebar-B6toVx9n.js";import{S as z,a as F,b as D,c as V}from"./avatar-c9Tt2nUt.js";import{S as M}from"./sweetalert2.esm.all-BQIkj5Wb.js";import{I as E}from"./input-fkttcr5C.js";import{N as L}from"./Notification-sxYMHaPT.js";import{T as U,a as H,b as P,c as f,d as Q,e as b}from"./table-YohDIo_G.js";import{B as G,a as K,b as W,c as R,d as X}from"./breadcrumb-CU2xmbJ0.js";import{P as Y,a as J,b as Z}from"./popover-D10FheO5.js";import{S as w,a as C,b as S,c as _,d as p}from"./select-CY2HbR1f.js";import{P as ee}from"./printer-DT8AVpcq.js";import{E as te}from"./eye-yxlFfJ9D.js";import{P as se}from"./pen-DnLdDdRT.js";import{X as le}from"./index-DQDhcZEc.js";import"./index-DBhhzdAn.js";import"./utils-CBfrqCZ4.js";import"./dropdown-menu-B-9leS4y.js";import"./createLucideIcon-BIDEulHG.js";import"./index-CquMoNXh.js";import"./index-DYBrNg48.js";import"./index-0uhVE6pe.js";import"./chevron-right-CV6NnU3w.js";import"./sparkles-BrzwCdNw.js";import"./bell-DJ4_M3G9.js";import"./keyboard-BAF7eCXJ.js";import"./boxes-DLlRq-uf.js";import"./users-CB3XdP7h.js";import"./user-C9yBI8M3.js";import"./chevron-down-CaFwAaZt.js";import"./index-CEtsD02S.js";import"./index-Dce7ijDe.js";import"./index-Hnne6-4R.js";function ne({filters:r,filterOptions:x,onApplyFilters:m}){const[i,j]=v.useState(""),[n,a]=v.useState(""),u=s=>{const h=s==="all"?"":s;a(h),i==="type"?m({...r,type:h}):i==="condition"?m({...r,condition:h}):i==="room"&&m({...r,room_id:h})},g=()=>{j(""),a(""),m({type:"",condition:"",room_id:""})};return e.jsxs(Y,{children:[e.jsx(J,{asChild:!0,children:e.jsx(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:"Filters"})}),e.jsx(Z,{className:"w-72",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(w,{value:i,onValueChange:s=>{j(s),a("")},children:[e.jsx(C,{children:e.jsx(S,{placeholder:"Select filter field"})}),e.jsxs(_,{children:[e.jsx(p,{value:"type",children:"Type"}),e.jsx(p,{value:"condition",children:"Condition"}),e.jsx(p,{value:"room",children:"Room"})]})]}),i==="type"&&e.jsxs(w,{value:n||"all",onValueChange:u,children:[e.jsx(C,{children:e.jsx(S,{placeholder:"Select Type"})}),e.jsxs(_,{children:[e.jsx(p,{value:"all",children:"All"}),x.types.map(s=>e.jsx(p,{value:s,children:s},s))]})]}),i==="condition"&&e.jsxs(w,{value:n||"all",onValueChange:u,children:[e.jsx(C,{children:e.jsx(S,{placeholder:"Select Condition"})}),e.jsxs(_,{children:[e.jsx(p,{value:"all",children:"All"}),x.conditions.map(s=>e.jsx(p,{value:s,children:s},s))]})]}),i==="room"&&e.jsxs(w,{value:n||"all",onValueChange:u,children:[e.jsx(C,{children:e.jsx(S,{placeholder:"Select Room"})}),e.jsxs(_,{children:[e.jsx(p,{value:"all",children:"All"}),Object.entries(x.rooms).map(([s,h])=>e.jsxs(p,{value:s,children:["Room ",h]},s))]})]}),(i||n)&&e.jsx("div",{className:"flex justify-end",children:e.jsxs(d,{size:"sm",variant:"outline",onClick:g,className:"flex items-center gap-1 text-red-600 hover:bg-red-50",children:[e.jsx(le,{className:"w-4 h-4"}),"Reset"]})})]})})]})}const oe=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Intermittent Issue",color:"bg-yellow-500"},{label:"Needs Cleaning",color:"bg-blue-500"},{label:"For Replacement",color:"bg-orange-500"},{label:"For Disposal",color:"bg-gray-500"},{label:"Condemn",color:"bg-black"}];function De({equipments:r,existingRooms:x,filters:m={}}){const[i,j]=v.useState(""),[n,a]=v.useState(1),[u,g]=v.useState(null),s=10,{delete:h}=I(),N=t=>oe.find(o=>o.label.toLowerCase()===t.toLowerCase())||{label:t,color:"bg-gray-400"},l=v.useMemo(()=>{const t=o=>[...new Set(o.filter(Boolean))].sort();return{types:t(r.map(o=>o.type)),conditions:t(r.map(o=>o.condition)),rooms:Object.fromEntries(x.map(o=>[String(o.id),o.room_number]))}},[r,x]);function T(t){const o=Object.fromEntries(Object.entries({...t,search:i||void 0}).filter(([,c])=>c!==""&&c!==void 0));k.get("/equipments",o,{preserveState:!0,replace:!0})}const y=Math.ceil(r.length/s)||1,q=r.slice((n-1)*s,n*s),A=()=>{if(!r||r.length===0){alert("No equipment data available to print.");return}const t=window.open("","","width=900,height=700"),o=r.map((c,O)=>`
                <tr>
                    <td>${O+1}</td>
                    <td>${c.equipment_code}</td>
                    <td>${c.equipment_name??"N/A"}</td>
                    <td>${c.type??"N/A"}</td>
                    <td>${c.brand??"N/A"}</td>
                    <td>${c.condition??"N/A"}</td>
                    <td>${c.room?.room_number?"Room "+c.room.room_number:"N/A"}</td>
                </tr>`).join("");t.document.write(`
            <html>
                <head>
                    <title>Equipment Report</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                        h2 {
                            text-align: center;
                            color: #2e7d32;
                            margin-bottom: 15px;
                        }
                        p {
                            text-align: right;
                            font-size: 12px;
                            color: #555;
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
                    <h2>Equipment Report</h2>
                    <p>Generated on: ${new Date().toLocaleString()}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Equipment Code</th>
                                <th>Equipment Name</th>
                                <th>Type</th>
                                <th>Brand</th>
                                <th>Condition</th>
                                <th>Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${o}
                        </tbody>
                    </table>
                </body>
            </html>
        `),t.document.close(),t.print()};return e.jsxs(z,{children:[e.jsx($,{}),e.jsxs(F,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(D,{}),e.jsx(V,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(G,{children:e.jsx(K,{children:e.jsxs(W,{children:[e.jsx(R,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(X,{}),e.jsx(R,{href:"/equipments","aria-current":"page",className:"font-semibold text-foreground",children:"Equipments"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(L,{})]})}),e.jsxs("main",{className:"w-full px-6 py-4",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"Equipments"}),e.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(ne,{filters:m,filterOptions:l,onApplyFilters:T}),e.jsxs(d,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:A,children:[e.jsx(ee,{className:"h-4 w-4"}),"Print"]}),e.jsx(E,{placeholder:"Search Equipment Code...",value:i,onChange:t=>j(t.target.value),onKeyDown:t=>t.key==="Enter"&&T(m),className:`text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 flex-1 max-w-xs
               border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
               focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
               placeholder:text-[hsl(142,34%,40%)]`})]}),e.jsx(d,{className:"text-sm sm:text-base px-3 py-1 sm:py-2 bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium",onClick:()=>k.visit("/equipments/addequipment"),children:"Add Equipment"})]}),e.jsx("div",{className:"overflow-x-auto rounded-lg border",children:e.jsxs(U,{children:[e.jsx(H,{children:e.jsxs(P,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]",children:[e.jsx(f,{children:"#"}),e.jsx(f,{children:"Equipment Code"}),e.jsx(f,{children:"Equipment Name"})," ",e.jsx(f,{children:"Room"}),e.jsx(f,{children:"Type"}),e.jsx(f,{children:"Condition"}),e.jsx(f,{className:"text-center",children:"Actions"})]})}),e.jsx(Q,{children:q.length>0?q.map((t,o)=>e.jsxs(P,{children:[e.jsx(b,{children:(n-1)*s+o+1}),e.jsx(b,{children:t.equipment_code}),e.jsx(b,{children:t.equipment_name})," ",e.jsxs(b,{children:["ROOM"," ",t.room?.room_number||"N/A"]}),e.jsx(b,{children:t.type}),e.jsx(b,{children:t.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${N(t.condition).color}`,children:N(t.condition).label}):"N/A"}),e.jsx(b,{className:"text-center",children:e.jsxs("div",{className:"hidden sm:flex gap-2 justify-center",children:[e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>k.visit(`/equipments/view/${t.equipment_code}`),children:[e.jsx(te,{className:"h-4 w-4"}),"View"]}),e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>g(t),children:[e.jsx(se,{className:"h-4 w-4"}),"Edit"]})]})})]},t.id)):e.jsx(P,{children:e.jsx(b,{colSpan:7,className:"text-center py-4",children:"No equipments found."})})})]})}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center mt-4 gap-2",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Page ",n," of ",y]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(d,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>a(t=>t-1),children:"Previous"}),Array.from({length:y},(t,o)=>o+1).filter(t=>t===1||t===y?!0:t>=n-2&&t<=n+2).map((t,o,c)=>e.jsxs(B.Fragment,{children:[o>0&&c[o]-c[o-1]>1&&e.jsx("span",{className:"px-1",children:"..."}),e.jsx(d,{size:"sm",variant:n===t?"default":"outline",onClick:()=>a(t),children:t})]},t)),e.jsx(d,{size:"sm",variant:"outline",disabled:n===y,onClick:()=>a(t=>t+1),children:"Next"})]})]}),u&&e.jsx(re,{equipment:u,rooms:x,onClose:()=>g(null)})]})]})]})}function re({equipment:r,rooms:x,onClose:m}){const i=["Furniture","Appliances","Networking","Safety"],j=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Intermittent Issue",color:"bg-yellow-500"},{label:"Needs Cleaning",color:"bg-blue-500"},{label:"For Replacement",color:"bg-orange-500"},{label:"For Disposal",color:"bg-gray-500"},{label:"Condemn",color:"bg-black"}],{data:n,setData:a,put:u,processing:g,errors:s}=I({equipment_code:r.equipment_code||"",equipment_name:r.equipment_name||"",brand:r.brand||"",type:r.type||"",condition:r.condition||"",room_id:r.room_id||""}),h=j.map(l=>l.label),N=l=>{l.preventDefault(),u(route("equipments.update",r.equipment_code),{onSuccess:()=>{M.fire("Updated!","Equipment updated successfully.","success"),m()}})};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg w-full max-w-lg p-6",children:[e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Edit Equipment"}),e.jsxs("form",{onSubmit:N,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Equipment Code"}),e.jsx(E,{value:n.equipment_code,onChange:l=>a("equipment_code",l.target.value),disabled:!0}),s.equipment_code&&e.jsx("p",{className:"text-red-500 text-sm",children:s.equipment_code})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Equipment Name"}),e.jsx(E,{value:n.equipment_name,onChange:l=>a("equipment_name",l.target.value)}),s.equipment_name&&e.jsx("p",{className:"text-red-500 text-sm",children:s.equipment_name})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Brand"}),e.jsx(E,{value:n.brand,onChange:l=>a("brand",l.target.value)}),s.brand&&e.jsx("p",{className:"text-red-500 text-sm",children:s.brand})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Type"}),e.jsxs("select",{className:"w-full border rounded px-2 py-1",value:n.type,onChange:l=>{a("type",l.target.value),a("condition","")},children:[e.jsx("option",{value:"",children:"Select Type"}),i.map(l=>e.jsx("option",{value:l,children:l},l))]}),s.type&&e.jsx("p",{className:"text-red-500 text-sm",children:s.type})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Condition"}),e.jsxs("select",{className:`w-full border rounded px-2 py-1 ${j.find(l=>l.label===n.condition)?.color||""}`,value:n.condition,onChange:l=>a("condition",l.target.value),disabled:!n.type,children:[e.jsx("option",{value:"",children:n.type?"Select Condition":"Select a type first"}),h.map(l=>e.jsx("option",{value:l,children:l},l))]}),s.condition&&e.jsx("p",{className:"text-red-500 text-sm",children:s.condition})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Room"}),e.jsxs("select",{className:"w-full border rounded px-2 py-1",value:n.room_id,onChange:l=>a("room_id",l.target.value),children:[e.jsx("option",{value:"",children:"Select Room"}),x.map(l=>e.jsxs("option",{value:l.id,children:["Room ",l.room_number]},l.id))]}),s.room_id&&e.jsx("p",{className:"text-red-500 text-sm",children:s.room_id})]}),e.jsxs("div",{className:"flex justify-end gap-2 mt-4",children:[e.jsx(d,{type:"button",variant:"outline",onClick:m,disabled:g,children:"Cancel"}),e.jsx(d,{type:"submit",disabled:g,children:"Save"})]})]})]})})}export{De as default};
