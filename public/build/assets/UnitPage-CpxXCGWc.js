import{r as f,u as L,j as e,a as P,R as D}from"./app-snzW45Zs.js";import{B as g}from"./button-DljaF4-I.js";import{A as O}from"./app-sidebar-BOHKL8_d.js";import{S as G,a as W,b as q,c as H}from"./avatar-xmO2jsRZ.js";import K from"./EditUnitModal-BJ6F33lo.js";import{S as X}from"./sweetalert2.esm.all-BQIkj5Wb.js";import{I as J}from"./input-CAKVJxlN.js";import{N as Q}from"./Notification-zJ4TubON.js";import{T as Y,a as Z,b as U,c as C,d as ee,e as v}from"./table-DwXv_M1J.js";import"./index-D-Sr5AXo.js";import{B as se,a as le,b as te,c as $,d as re}from"./breadcrumb-yWxLRB88.js";import{P as ae,a as oe,b as ne}from"./popover-CXIEhSsb.js";import{S as p,a as u,b as j,c as b,d as o}from"./select-B4M0RU1e.js";import{P as ie}from"./printer-z4upvOo0.js";import{E as ce}from"./eye-DIhA9PL7.js";import{P as de}from"./pen-B2jrr9kt.js";import{F as me}from"./funnel-Dq6A4uHn.js";import{X as M}from"./index-DbODFMcU.js";import"./index-DwPuYfBT.js";import"./utils-CBfrqCZ4.js";import"./dropdown-menu-BpADeDlu.js";import"./index-DS_5vP3t.js";import"./index-CIWvSXd_.js";import"./index-Buv2vO6A.js";import"./createLucideIcon-C7N2W5Mc.js";import"./chevron-right-DFL-1erJ.js";import"./house-kr65TYCm.js";import"./user-D7q_pFdM.js";import"./log-out-BVkrBfoJ.js";import"./keyboard-Bw_Mgp5d.js";import"./boxes-Bt8stP9a.js";import"./users-D01GtTtf.js";import"./chevron-down-B8TOwbzH.js";import"./index-Bcsql08V.js";import"./index-CkICTgTT.js";import"./dialog-ug7CX9jR.js";import"./label-BXFDESUm.js";import"./bell-DWxITiDc.js";import"./index-B7SmeESi.js";function he({filters:r={},filterOptions:m,onApplyFilters:S,onReset:N}){const[c,n]=f.useState(""),[d,x]=f.useState("");f.useEffect(()=>{const h=["unit_code","room_id","processor","ram","storage","gpu","motherboard","condition"].find(w=>!!r[w]);h?(n(h),x(String(r[h]))):(n(""),x(""))},[r]);const A=[{value:"unit_code",label:"Unit Code"},{value:"room_id",label:"Room"},{value:"processor",label:"Processor"},{value:"ram",label:"RAM"},{value:"storage",label:"Storage"},{value:"gpu",label:"GPU"},{value:"motherboard",label:"Motherboard"},{value:"condition",label:"Condition"}];function i(l){const h=l==="all"?"":l;x(h);const w={...r};c&&(w[c]=h),S(w)}const _=!!r.unit_code||!!r.room_id||!!r.processor||!!r.ram||!!r.storage||!!r.gpu||!!r.motherboard||!!r.condition;return e.jsxs(ae,{children:[e.jsx(oe,{asChild:!0,children:e.jsxs(g,{className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(me,{className:"h-4 w-4"}),"Filter",_&&e.jsx(M,{className:"h-4 w-4 ml-1 cursor-pointer",onClick:l=>{l.stopPropagation(),n(""),x(""),N()}})]})}),e.jsxs(ne,{className:"w-[calc(100vw-2rem)] sm:w-[380px] p-4",children:[e.jsx("h4",{className:"font-medium mb-3 text-lg",children:"Filter Options"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(p,{value:c,onValueChange:l=>{n(l),x("")},children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Field"})}),e.jsx(b,{children:A.map(l=>e.jsx(o,{value:l.value,children:l.label},l.value))})]}),c==="unit_code"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Unit Code"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.unit_codes.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="room_id"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Room"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),Object.entries(m.rooms).map(([l,h])=>e.jsxs(o,{value:l,children:["Room ",h]},l))]})]}),c==="processor"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Processor"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.processors.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="ram"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select RAM"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.rams.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="storage"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Storage"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.storages.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="gpu"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select GPU"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.gpus.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="motherboard"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Motherboard"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.motherboards.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="condition"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Condition"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.conditions.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(g,{size:"sm",variant:"outline",onClick:()=>{n(""),x(""),N()},children:[e.jsx(M,{className:"mr-1 h-4 w-4"})," Reset"]})})]})]})]})}function Ye({units:r,rooms:m,filters:S={}}){const[N,c]=f.useState(S.search||""),[n,d]=f.useState(1),[x,A]=f.useState(null),i=10,{delete:_}=L(),l=()=>{X.fire({icon:"success",title:"Updated!",text:"The system unit has been updated successfully."})},h=f.useMemo(()=>{const s=t=>[...new Set(t.filter(a=>a!==null&&a!==""))].sort();return{rooms:Object.fromEntries(m.map(t=>[String(t.id),t.room_number])),unit_codes:s(r.map(t=>t.unit_code)),processors:s(r.map(t=>t.processor)),rams:s(r.map(t=>t.ram)),storages:s(r.map(t=>t.storage)),gpus:s(r.map(t=>t.gpu)),motherboards:s(r.map(t=>t.motherboard)),conditions:s(r.map(t=>t.condition))}},[r,m]);function w(s){const t=Object.fromEntries(Object.entries({...s,search:N||void 0}).filter(([,a])=>a!==""&&a!==void 0));P.get(route("system-units.index"),t,{preserveState:!0,replace:!0})}function V(){c(""),P.get(route("system-units.index"),{},{preserveState:!0,replace:!0})}function T(s){s.key==="Enter"&&w(S)}const y=f.useMemo(()=>{if(!N)return r;const s=N.toLowerCase();return r.filter(t=>{const a=t.unit_code?.toLowerCase()||"",z=t.room?.room_number?.toLowerCase()||"";return a.includes(s)||z.includes(s)})},[r,N]),R=Math.ceil(y.length/i)||1,k=y.slice((n-1)*i,n*i),B={Working:"bg-green-200 text-green-800","Not Working":"bg-red-200 text-red-800","Intermittent Issue":"bg-yellow-200 text-yellow-800","Needs Cleaning":"bg-blue-200 text-blue-800","For Replacement":"bg-orange-200 text-orange-800","For Disposal":"bg-gray-200 text-gray-800",Condemned:"bg-black text-white","Needs Repair":"bg-red-200 text-red-800","No Signal":"bg-red-200 text-red-800","Needs Configuration":"bg-blue-200 text-blue-800","Under Maintenance":"bg-blue-200 text-blue-900","To Be Diagnosed":"bg-blue-100 text-blue-800"},F=s=>{const t=s||"Unknown",a=B[t]||"bg-slate-400 text-white";return{label:t,color:a}},E=f.useRef(null),I=()=>{if(!r||r.length===0){alert("No data available to print.");return}const s=window.open("","","width=900,height=700"),t=r.map(a=>`
        <tr>
            <td>${a.id}</td>
            <td>${a.unit_code}</td>
            <td>${a.room?.room_number??"N/A"}</td>
            <td>${a.serial_number}</td>
            <td>${a.processor}</td>
            <td>${a.ram}</td>
            <td>${a.storage}</td>
            <td>${a.gpu??"N/A"}</td>
            <td>${a.motherboard}</td>
            <td>${a.condition}</td>
            <td>${a.condition_details??"N/A"}</td>
          <td>${a.mr_to?.name??"N/A"}</td>
        </tr>
    `).join("");s.document.write(`
        <html>
            <head>
                <title>Complete System Units Report</title>
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
                <h2>Complete System Units Report</h2>
                <p>Generated on: ${new Date().toLocaleString()}</p>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Unit Code</th>
                            <th>Room</th>
                            <th>Serial Number</th>
                            <th>Processor</th>
                            <th>RAM</th>
                            <th>Storage</th>
                            <th>GPU</th>
                            <th>Motherboard</th>
                            <th>Condition</th>
                            <th>Condition Details</th>
                            <th>Material Responsible</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t}
                    </tbody>
                </table>
            </body>
        </html>
    `),s.document.close(),s.print()};return e.jsxs(G,{children:[e.jsx(O,{}),e.jsxs(W,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(q,{}),e.jsx(H,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(se,{children:e.jsx(le,{children:e.jsxs(te,{children:[e.jsx($,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(re,{}),e.jsx($,{href:"/admin/system-units","aria-current":"page",className:"font-semibold text-foreground",children:"System Unit Lists"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(Q,{})]})}),e.jsxs("main",{className:"w-full px-6 py-4",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"System Units"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center flex-1",children:[e.jsx(J,{placeholder:"Search Unit Code or Room",value:N,onChange:s=>{const t=s.target.value;c(t),d(1)},onKeyDown:T,className:"flex-1 min-w-0 sm:max-w-xs w-full border-[hsl(142,34%,51%)]"}),e.jsx(he,{filters:S,filterOptions:h,onApplyFilters:w,onReset:V}),e.jsxs(g,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:I,children:[e.jsx(ie,{className:"h-4 w-4"}),"Print"]})]}),e.jsx(g,{className:"bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>P.visit(route("admin.system-units.create")),children:"Add New Unit"})]}),e.jsx("div",{className:"overflow-x-auto rounded-lg shadow-lg",children:e.jsxs(Y,{ref:E,className:"w-full bg-white table-fixed",children:[e.jsx(Z,{children:e.jsxs(U,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(C,{className:"px-5 py-1",children:"#"}),e.jsx(C,{className:"px-5 py-1",children:"PC Code"}),e.jsx(C,{className:"px-5 py-1",children:"Room"}),e.jsx(C,{className:"px-5 py-1",children:"Condition"}),e.jsx(C,{className:"px-5 py-1",children:"Action"})]})}),e.jsx(ee,{children:k.length>0?k.map((s,t)=>e.jsxs(U,{className:"hover:shadow-sm",children:[e.jsx(v,{className:"px-5 py-1",children:(n-1)*i+t+1}),e.jsx(v,{className:"px-5 py-1",children:s.unit_code}),e.jsxs(v,{className:"px-5 py-1",children:["ROOM"," ",s.room?.room_number||"N/A"]}),e.jsx(v,{className:"px-5 py-1",children:s.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${F(s.condition).color}`,children:F(s.condition).label}):"N/A"}),e.jsx(v,{children:e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(g,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>P.visit(`/system-units/view/${s.unit_path}`),children:[e.jsx(ce,{className:"h-4 w-4"}),"View"]}),e.jsxs(g,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>{A(s),setShowModal(!0)},children:[e.jsx(de,{className:"h-4 w-4"}),"Edit"]})]})})]},s.id)):e.jsx(U,{children:e.jsx(v,{colSpan:5,className:"text-center py-4",children:"No matching units found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Showing"," ",y.length===0?0:(n-1)*i+1," ","–",Math.min(n*i,y.length)," ","of ",y.length," System Units"]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(g,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>d(s=>s-1),children:"Previous"}),Array.from({length:R},(s,t)=>t+1).filter(s=>s===1||s===R?!0:s>=n-2&&s<=n+2).map((s,t,a)=>e.jsxs(D.Fragment,{children:[t>0&&a[t]-a[t-1]>1&&e.jsx("span",{className:"px-1",children:"..."}),e.jsx(g,{size:"sm",variant:n===s?"default":"outline",onClick:()=>d(s),children:s})]},s)),e.jsx(g,{size:"sm",variant:"outline",disabled:n===R,onClick:()=>d(s=>s+1),children:"Next"})]})]}),x&&e.jsx(K,{unit:x,rooms:m,onClose:()=>A(null),onSuccess:l})]})]})]})}export{Ye as default};
