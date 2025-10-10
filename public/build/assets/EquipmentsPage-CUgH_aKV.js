import{r as v,u as R,j as e,a as k,R as O}from"./app-DDnysqsQ.js";import{B as m}from"./button-_HDAPkna.js";import{A as B}from"./app-sidebar-ByKFIo2_.js";import{S as $,a as z,b as F,c as D}from"./avatar-DOsv2aO6.js";import{S as V}from"./sweetalert2.esm.all-BQIkj5Wb.js";import{I as _}from"./input-DpmJIEbT.js";import{N as M}from"./Notification-CcCNIDDe.js";import{T as L,a as U,b as P,c as f,d as H,e as b}from"./table-B6lOqOmI.js";import{B as Q,a as G,b as K,c as q,d as W}from"./breadcrumb-Dg0G5amV.js";import{P as X,a as Y,b as J}from"./popover-DTDEa-Tl.js";import{S as y,a as w,b as C,c as S,d as p}from"./select-B9iBgPsT.js";import{P as Z}from"./printer-CB2Gwaqu.js";import{E as ee}from"./eye-tuLzx6nu.js";import{P as te}from"./pen-D3byACqz.js";import{X as se}from"./index-BqYlAjXl.js";import"./index-BdWf4Sbu.js";import"./utils-CBfrqCZ4.js";import"./dropdown-menu-G7ow7j29.js";import"./createLucideIcon-Dylm4_dP.js";import"./index-BcfBzL9B.js";import"./index-BsL9SdNh.js";import"./index-Ckafv5bi.js";import"./index-DUCpiI1O.js";import"./chevron-right-YlXW9eKp.js";import"./sparkles-BQy7z026.js";import"./bell-BLbVWt7E.js";import"./keyboard-BeloKyZt.js";import"./boxes-DAuUwX8c.js";import"./users-BvkBFUFx.js";import"./chevron-down-d_HQSDc_.js";import"./index-BTnIEj0j.js";import"./index-D_PuXRk7.js";import"./index-C1xYqjNr.js";function le({filters:a,filterOptions:h,onApplyFilters:x}){const[i,j]=v.useState(""),[n,o]=v.useState(""),u=s=>{const d=s==="all"?"":s;o(d),i==="type"?x({...a,type:d}):i==="condition"?x({...a,condition:d}):i==="room"&&x({...a,room_id:d})},g=()=>{j(""),o(""),x({type:"",condition:"",room_id:""})};return e.jsxs(X,{children:[e.jsx(Y,{asChild:!0,children:e.jsx(m,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:"Filters"})}),e.jsx(J,{className:"w-72",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(y,{value:i,onValueChange:s=>{j(s),o("")},children:[e.jsx(w,{children:e.jsx(C,{placeholder:"Select filter field"})}),e.jsxs(S,{children:[e.jsx(p,{value:"type",children:"Type"}),e.jsx(p,{value:"condition",children:"Condition"}),e.jsx(p,{value:"room",children:"Room"})]})]}),i==="type"&&e.jsxs(y,{value:n||"all",onValueChange:u,children:[e.jsx(w,{children:e.jsx(C,{placeholder:"Select Type"})}),e.jsxs(S,{children:[e.jsx(p,{value:"all",children:"All"}),h.types.map(s=>e.jsx(p,{value:s,children:s},s))]})]}),i==="condition"&&e.jsxs(y,{value:n||"all",onValueChange:u,children:[e.jsx(w,{children:e.jsx(C,{placeholder:"Select Condition"})}),e.jsxs(S,{children:[e.jsx(p,{value:"all",children:"All"}),h.conditions.map(s=>e.jsx(p,{value:s,children:s},s))]})]}),i==="room"&&e.jsxs(y,{value:n||"all",onValueChange:u,children:[e.jsx(w,{children:e.jsx(C,{placeholder:"Select Room"})}),e.jsxs(S,{children:[e.jsx(p,{value:"all",children:"All"}),Object.entries(h.rooms).map(([s,d])=>e.jsxs(p,{value:s,children:["Room ",d]},s))]})]}),(i||n)&&e.jsx("div",{className:"flex justify-end",children:e.jsxs(m,{size:"sm",variant:"outline",onClick:g,className:"flex items-center gap-1 text-red-600 hover:bg-red-50",children:[e.jsx(se,{className:"w-4 h-4"}),"Reset"]})})]})})]})}const ne=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Intermittent Issue",color:"bg-yellow-500"},{label:"Needs Cleaning",color:"bg-blue-500"},{label:"For Replacement",color:"bg-orange-500"},{label:"For Disposal",color:"bg-gray-500"},{label:"Condemn",color:"bg-black"}];function Fe({equipments:a,existingRooms:h,filters:x={}}){const[i,j]=v.useState(""),[n,o]=v.useState(1),[u,g]=v.useState(null),s=10;R();const d=t=>ne.find(r=>r.label.toLowerCase()===t.toLowerCase())||{label:t,color:"bg-gray-400"},E=v.useMemo(()=>{const t=r=>[...new Set(r.filter(Boolean))].sort();return{types:t(a.map(r=>r.type)),conditions:t(a.map(r=>r.condition)),rooms:Object.fromEntries(h.map(r=>[String(r.id),r.room_number]))}},[a,h]);function l(t){const r=Object.fromEntries(Object.entries({...t,search:i||void 0}).filter(([,c])=>c!==""&&c!==void 0));k.get("/equipments",r,{preserveState:!0,replace:!0})}const N=Math.ceil(a.length/s)||1,T=a.slice((n-1)*s,n*s),I=()=>{if(!a||a.length===0){alert("No equipment data available to print.");return}const t=window.open("","","width=900,height=700"),r=a.map((c,A)=>`
                <tr>
                    <td>${A+1}</td>
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
                            ${r}
                        </tbody>
                    </table>
                </body>
            </html>
        `),t.document.close(),t.print()};return e.jsxs($,{children:[e.jsx(B,{}),e.jsxs(z,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(F,{}),e.jsx(D,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(Q,{children:e.jsx(G,{children:e.jsxs(K,{children:[e.jsx(q,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(W,{}),e.jsx(q,{href:"/equipments","aria-current":"page",className:"font-semibold text-foreground",children:"Equipments"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(M,{})]})}),e.jsxs("main",{className:"w-full px-6 py-4",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"Equipments"}),e.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(le,{filters:x,filterOptions:E,onApplyFilters:l}),e.jsxs(m,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:I,children:[e.jsx(Z,{className:"h-4 w-4"}),"Print"]}),e.jsx(_,{placeholder:"Search Equipment Code...",value:i,onChange:t=>j(t.target.value),onKeyDown:t=>t.key==="Enter"&&l(x),className:`text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 flex-1 max-w-xs
               border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
               focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
               placeholder:text-[hsl(142,34%,40%)]`})]}),e.jsx(m,{className:"text-sm sm:text-base px-3 py-1 sm:py-2 bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium",onClick:()=>k.visit("/equipments/addequipment"),children:"Add Equipment"})]}),e.jsx("div",{className:"overflow-x-auto rounded-lg border",children:e.jsxs(L,{children:[e.jsx(U,{children:e.jsxs(P,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]",children:[e.jsx(f,{children:"#"}),e.jsx(f,{children:"Equipment Code"}),e.jsx(f,{children:"Equipment Name"})," ",e.jsx(f,{children:"Room"}),e.jsx(f,{children:"Type"}),e.jsx(f,{children:"Condition"}),e.jsx(f,{className:"text-center",children:"Actions"})]})}),e.jsx(H,{children:T.length>0?T.map((t,r)=>e.jsxs(P,{children:[e.jsx(b,{children:(n-1)*s+r+1}),e.jsx(b,{children:t.equipment_code}),e.jsx(b,{children:t.equipment_name})," ",e.jsxs(b,{children:["ROOM"," ",t.room?.room_number||"N/A"]}),e.jsx(b,{children:t.type}),e.jsx(b,{children:t.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${d(t.condition).color}`,children:d(t.condition).label}):"N/A"}),e.jsx(b,{className:"text-center",children:e.jsxs("div",{className:"hidden sm:flex gap-2 justify-center",children:[e.jsxs(m,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>k.visit(`/equipments/view/${t.equipment_code}`),children:[e.jsx(ee,{className:"h-4 w-4"}),"View"]}),e.jsxs(m,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>g(t),children:[e.jsx(te,{className:"h-4 w-4"}),"Edit"]})]})})]},t.id)):e.jsx(P,{children:e.jsx(b,{colSpan:7,className:"text-center py-4",children:"No equipments found."})})})]})}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center mt-4 gap-2",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Page ",n," of ",N]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(m,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>o(t=>t-1),children:"Previous"}),Array.from({length:N},(t,r)=>r+1).filter(t=>t===1||t===N?!0:t>=n-2&&t<=n+2).map((t,r,c)=>e.jsxs(O.Fragment,{children:[r>0&&c[r]-c[r-1]>1&&e.jsx("span",{className:"px-1",children:"..."}),e.jsx(m,{size:"sm",variant:n===t?"default":"outline",onClick:()=>o(t),children:t})]},t)),e.jsx(m,{size:"sm",variant:"outline",disabled:n===N,onClick:()=>o(t=>t+1),children:"Next"})]})]}),u&&e.jsx(re,{equipment:u,rooms:h,onClose:()=>g(null)})]})]})]})}function re({equipment:a,rooms:h,onClose:x}){const i=["Furniture","Appliances","Networking","Safety"],j=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Intermittent Issue",color:"bg-yellow-500"},{label:"Needs Cleaning",color:"bg-blue-500"},{label:"For Replacement",color:"bg-orange-500"},{label:"For Disposal",color:"bg-gray-500"},{label:"Condemn",color:"bg-black"}],{data:n,setData:o,put:u,processing:g,errors:s}=R({equipment_code:a.equipment_code||"",equipment_name:a.equipment_name||"",brand:a.brand||"",type:a.type||"",condition:a.condition||"",room_id:a.room_id||""}),d=j.map(l=>l.label),E=l=>{l.preventDefault(),u(route("equipments.update",a.equipment_code),{onSuccess:()=>{V.fire("Updated!","Equipment updated successfully.","success"),x()}})};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg w-full max-w-lg p-6",children:[e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Edit Equipment"}),e.jsxs("form",{onSubmit:E,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Equipment Code"}),e.jsx(_,{value:n.equipment_code,onChange:l=>o("equipment_code",l.target.value),disabled:!0}),s.equipment_code&&e.jsx("p",{className:"text-red-500 text-sm",children:s.equipment_code})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Equipment Name"}),e.jsx(_,{value:n.equipment_name,onChange:l=>o("equipment_name",l.target.value)}),s.equipment_name&&e.jsx("p",{className:"text-red-500 text-sm",children:s.equipment_name})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Brand"}),e.jsx(_,{value:n.brand,onChange:l=>o("brand",l.target.value)}),s.brand&&e.jsx("p",{className:"text-red-500 text-sm",children:s.brand})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Type"}),e.jsxs("select",{className:"w-full border rounded px-2 py-1",value:n.type,onChange:l=>{o("type",l.target.value),o("condition","")},children:[e.jsx("option",{value:"",children:"Select Type"}),i.map(l=>e.jsx("option",{value:l,children:l},l))]}),s.type&&e.jsx("p",{className:"text-red-500 text-sm",children:s.type})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Condition"}),e.jsxs("select",{className:`w-full border rounded px-2 py-1 ${j.find(l=>l.label===n.condition)?.color||""}`,value:n.condition,onChange:l=>o("condition",l.target.value),disabled:!n.type,children:[e.jsx("option",{value:"",children:n.type?"Select Condition":"Select a type first"}),d.map(l=>e.jsx("option",{value:l,children:l},l))]}),s.condition&&e.jsx("p",{className:"text-red-500 text-sm",children:s.condition})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Room"}),e.jsxs("select",{className:"w-full border rounded px-2 py-1",value:n.room_id,onChange:l=>o("room_id",l.target.value),children:[e.jsx("option",{value:"",children:"Select Room"}),h.map(l=>e.jsxs("option",{value:l.id,children:["Room ",l.room_number]},l.id))]}),s.room_id&&e.jsx("p",{className:"text-red-500 text-sm",children:s.room_id})]}),e.jsxs("div",{className:"flex justify-end gap-2 mt-4",children:[e.jsx(m,{type:"button",variant:"outline",onClick:x,disabled:g,children:"Cancel"}),e.jsx(m,{type:"submit",disabled:g,children:"Save"})]})]})]})})}export{Fe as default};
