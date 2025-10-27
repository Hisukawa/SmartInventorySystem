import{r as v,u as I,j as e,a as k,R as B}from"./app-tqM93StK.js";import{B as d}from"./button-C0qV_Wus.js";import{A as $}from"./app-sidebar-DFvY8KQB.js";import{S as z,a as F,b as D,c as V}from"./avatar-DEkoVGqY.js";import{S as M}from"./sweetalert2.esm.all-BQIkj5Wb.js";import{I as _}from"./input-Bt8g_NKn.js";import{N as L}from"./Notification-a7dB8cBZ.js";import{T as U,a as H,b as P,c as f,d as Q,e as b}from"./table-OuEmgst2.js";import{B as G,a as K,b as W,c as q,d as X}from"./breadcrumb-t7_p_k3s.js";import{P as Y,a as J,b as Z}from"./popover-BtvrqoP-.js";import{S as y,a as w,b as C,c as S,d as p}from"./select-CIbonJim.js";import{P as ee}from"./printer-BsfbEKdC.js";import{E as te}from"./eye-DIlIab3k.js";import{P as se}from"./pen-OIjUhJvy.js";import{X as le}from"./index-QzqoPUuY.js";import"./index-D8oBep_r.js";import"./utils-CBfrqCZ4.js";import"./dropdown-menu-B44_VRFb.js";import"./createLucideIcon-xU8v4Hxv.js";import"./index-34bW-pWL.js";import"./index-CjxWiOdI.js";import"./index-D3j-QZnS.js";import"./chevron-right-CgN_nTOj.js";import"./sparkles-CKKleuDc.js";import"./bell-CNa3Zia9.js";import"./keyboard-CLCviZvM.js";import"./boxes-BIx6e_GR.js";import"./users-CejuCGPm.js";import"./user-CaiDw9fZ.js";import"./chevron-down-3UOoRkJ3.js";import"./index-D_frVUzV.js";import"./index-BFnCgX5j.js";import"./index-2ow27Y0h.js";function ne({filters:o,filterOptions:h,onApplyFilters:m}){const[i,j]=v.useState(""),[n,a]=v.useState(""),u=s=>{const x=s==="all"?"":s;a(x),i==="type"?m({...o,type:x}):i==="condition"?m({...o,condition:x}):i==="room"&&m({...o,room_id:x})},g=()=>{j(""),a(""),m({type:"",condition:"",room_id:""})};return e.jsxs(Y,{children:[e.jsx(J,{asChild:!0,children:e.jsx(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:"Filters"})}),e.jsx(Z,{className:"w-72",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs(y,{value:i,onValueChange:s=>{j(s),a("")},children:[e.jsx(w,{children:e.jsx(C,{placeholder:"Select filter field"})}),e.jsxs(S,{children:[e.jsx(p,{value:"type",children:"Type"}),e.jsx(p,{value:"condition",children:"Condition"}),e.jsx(p,{value:"room",children:"Room"})]})]}),i==="type"&&e.jsxs(y,{value:n||"all",onValueChange:u,children:[e.jsx(w,{children:e.jsx(C,{placeholder:"Select Type"})}),e.jsxs(S,{children:[e.jsx(p,{value:"all",children:"All"}),h.types.map(s=>e.jsx(p,{value:s,children:s},s))]})]}),i==="condition"&&e.jsxs(y,{value:n||"all",onValueChange:u,children:[e.jsx(w,{children:e.jsx(C,{placeholder:"Select Condition"})}),e.jsxs(S,{children:[e.jsx(p,{value:"all",children:"All"}),h.conditions.map(s=>e.jsx(p,{value:s,children:s},s))]})]}),i==="room"&&e.jsxs(y,{value:n||"all",onValueChange:u,children:[e.jsx(w,{children:e.jsx(C,{placeholder:"Select Room"})}),e.jsxs(S,{children:[e.jsx(p,{value:"all",children:"All"}),Object.entries(h.rooms).map(([s,x])=>e.jsxs(p,{value:s,children:["Room ",x]},s))]})]}),(i||n)&&e.jsx("div",{className:"flex justify-end",children:e.jsxs(d,{size:"sm",variant:"outline",onClick:g,className:"flex items-center gap-1 text-red-600 hover:bg-red-50",children:[e.jsx(le,{className:"w-4 h-4"}),"Reset"]})})]})})]})}const oe=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Intermittent Issue",color:"bg-yellow-500"},{label:"Needs Cleaning",color:"bg-blue-500"},{label:"For Replacement",color:"bg-orange-500"},{label:"For Disposal",color:"bg-gray-500"},{label:"Condemn",color:"bg-black"}];function De({equipments:o,existingRooms:h,filters:m={}}){const[i,j]=v.useState(""),[n,a]=v.useState(1),[u,g]=v.useState(null),s=10,{delete:x}=I(),N=t=>oe.find(r=>r.label.toLowerCase()===t.toLowerCase())||{label:t,color:"bg-gray-400"},l=v.useMemo(()=>{const t=r=>[...new Set(r.filter(Boolean))].sort();return{types:t(o.map(r=>r.type)),conditions:t(o.map(r=>r.condition)),rooms:Object.fromEntries(h.map(r=>[String(r.id),r.room_number]))}},[o,h]);function T(t){const r=Object.fromEntries(Object.entries({...t,search:i||void 0}).filter(([,c])=>c!==""&&c!==void 0));k.get("/equipments",r,{preserveState:!0,replace:!0})}const E=Math.ceil(o.length/s)||1,R=o.slice((n-1)*s,n*s),A=()=>{if(!o||o.length===0){alert("No equipment data available to print.");return}const t=window.open("","","width=900,height=700"),r=o.map((c,O)=>`
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
                            ${r}
                        </tbody>
                    </table>
                </body>
            </html>
        `),t.document.close(),t.print()};return e.jsxs(z,{children:[e.jsx($,{}),e.jsxs(F,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(D,{}),e.jsx(V,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(G,{children:e.jsx(K,{children:e.jsxs(W,{children:[e.jsx(q,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(X,{}),e.jsx(q,{href:"/equipments","aria-current":"page",className:"font-semibold text-foreground",children:"Equipments"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(L,{})]})}),e.jsxs("main",{className:"w-full px-6 py-4",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"Equipments"}),e.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(ne,{filters:m,filterOptions:l,onApplyFilters:T}),e.jsxs(d,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:A,children:[e.jsx(ee,{className:"h-4 w-4"}),"Print"]}),e.jsx(_,{placeholder:"Search Equipment Code...",value:i,onChange:t=>j(t.target.value),onKeyDown:t=>t.key==="Enter"&&T(m),className:`text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 flex-1 max-w-xs
               border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
               focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
               placeholder:text-[hsl(142,34%,40%)]`})]}),e.jsx(d,{className:"text-sm sm:text-base px-3 py-1 sm:py-2 bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium",onClick:()=>k.visit("/equipments/addequipment"),children:"Add Equipment"})]}),e.jsx("div",{className:"overflow-x-auto rounded-lg border",children:e.jsxs(U,{children:[e.jsx(H,{children:e.jsxs(P,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]",children:[e.jsx(f,{children:"#"}),e.jsx(f,{children:"Equipment Code"}),e.jsx(f,{children:"Equipment Name"})," ",e.jsx(f,{children:"Room"}),e.jsx(f,{children:"Type"}),e.jsx(f,{children:"Condition"}),e.jsx(f,{className:"text-center",children:"Actions"})]})}),e.jsx(Q,{children:R.length>0?R.map((t,r)=>e.jsxs(P,{children:[e.jsx(b,{children:(n-1)*s+r+1}),e.jsx(b,{children:t.equipment_code}),e.jsx(b,{children:t.equipment_name})," ",e.jsxs(b,{children:["ROOM"," ",t.room?.room_number||"N/A"]}),e.jsx(b,{children:t.type}),e.jsx(b,{children:t.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${N(t.condition).color}`,children:N(t.condition).label}):"N/A"}),e.jsx(b,{className:"text-center",children:e.jsxs("div",{className:"hidden sm:flex gap-2 justify-center",children:[e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>k.visit(`/equipments/view/${t.equipment_code}`),children:[e.jsx(te,{className:"h-4 w-4"}),"View"]}),e.jsxs(d,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>g(t),children:[e.jsx(se,{className:"h-4 w-4"}),"Edit"]})]})})]},t.id)):e.jsx(P,{children:e.jsx(b,{colSpan:7,className:"text-center py-4",children:"No equipments found."})})})]})}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center mt-4 gap-2",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Showing"," ",o.length===0?0:(n-1)*s+1," ","–",Math.min(n*s,o.length)," ","of ",o.length," equipment"]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(d,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>a(t=>t-1),children:"Previous"}),Array.from({length:E},(t,r)=>r+1).filter(t=>t===1||t===E?!0:t>=n-2&&t<=n+2).map((t,r,c)=>e.jsxs(B.Fragment,{children:[r>0&&c[r]-c[r-1]>1&&e.jsx("span",{className:"px-1",children:"..."}),e.jsx(d,{size:"sm",variant:n===t?"default":"outline",onClick:()=>a(t),children:t})]},t)),e.jsx(d,{size:"sm",variant:"outline",disabled:n===E,onClick:()=>a(t=>t+1),children:"Next"})]})]}),u&&e.jsx(re,{equipment:u,rooms:h,onClose:()=>g(null)})]})]})]})}function re({equipment:o,rooms:h,onClose:m}){const i=["Furniture","Appliances","Networking","Safety"],j=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Intermittent Issue",color:"bg-yellow-500"},{label:"Needs Cleaning",color:"bg-blue-500"},{label:"For Replacement",color:"bg-orange-500"},{label:"For Disposal",color:"bg-gray-500"},{label:"Condemn",color:"bg-black"}],{data:n,setData:a,put:u,processing:g,errors:s}=I({equipment_code:o.equipment_code||"",equipment_name:o.equipment_name||"",brand:o.brand||"",type:o.type||"",condition:o.condition||"",room_id:o.room_id||""}),x=j.map(l=>l.label),N=l=>{l.preventDefault(),u(route("equipments.update",o.equipment_code),{onSuccess:()=>{M.fire("Updated!","Equipment updated successfully.","success"),m()}})};return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg w-full max-w-lg p-6",children:[e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Edit Equipment"}),e.jsxs("form",{onSubmit:N,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Equipment Code"}),e.jsx(_,{value:n.equipment_code,onChange:l=>a("equipment_code",l.target.value),disabled:!0}),s.equipment_code&&e.jsx("p",{className:"text-red-500 text-sm",children:s.equipment_code})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Equipment Name"}),e.jsx(_,{value:n.equipment_name,onChange:l=>a("equipment_name",l.target.value)}),s.equipment_name&&e.jsx("p",{className:"text-red-500 text-sm",children:s.equipment_name})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Brand"}),e.jsx(_,{value:n.brand,onChange:l=>a("brand",l.target.value)}),s.brand&&e.jsx("p",{className:"text-red-500 text-sm",children:s.brand})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Type"}),e.jsxs("select",{className:"w-full border rounded px-2 py-1",value:n.type,onChange:l=>{a("type",l.target.value),a("condition","")},children:[e.jsx("option",{value:"",children:"Select Type"}),i.map(l=>e.jsx("option",{value:l,children:l},l))]}),s.type&&e.jsx("p",{className:"text-red-500 text-sm",children:s.type})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Condition"}),e.jsxs("select",{className:`w-full border rounded px-2 py-1 ${j.find(l=>l.label===n.condition)?.color||""}`,value:n.condition,onChange:l=>a("condition",l.target.value),disabled:!n.type,children:[e.jsx("option",{value:"",children:n.type?"Select Condition":"Select a type first"}),x.map(l=>e.jsx("option",{value:l,children:l},l))]}),s.condition&&e.jsx("p",{className:"text-red-500 text-sm",children:s.condition})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Room"}),e.jsxs("select",{className:"w-full border rounded px-2 py-1",value:n.room_id,onChange:l=>a("room_id",l.target.value),children:[e.jsx("option",{value:"",children:"Select Room"}),h.map(l=>e.jsxs("option",{value:l.id,children:["Room ",l.room_number]},l.id))]}),s.room_id&&e.jsx("p",{className:"text-red-500 text-sm",children:s.room_id})]}),e.jsxs("div",{className:"flex justify-end gap-2 mt-4",children:[e.jsx(d,{type:"button",variant:"outline",onClick:m,disabled:g,children:"Cancel"}),e.jsx(d,{type:"submit",disabled:g,children:"Save"})]})]})]})})}export{De as default};
