import{r as f,u as I,j as e,a as C,R as L}from"./app-Di31QePS.js";import{B as x}from"./button-BOSs5-Bw.js";import{A as D}from"./app-sidebar-JA2ELYIa.js";import{S as O,a as G,b as q,c as H}from"./avatar-CLmULjNZ.js";import K from"./EditUnitModal-PFnMm238.js";import{S as W}from"./sweetalert2.esm.all-BQIkj5Wb.js";import{I as X}from"./input-CSr6fIuN.js";import{N as J}from"./Notification-4GDhfWX2.js";import{T as Q,a as Y,b as _,c as A,d as Z,e as v}from"./table-CJ2xxB_R.js";import"./index-CqE0cEYe.js";import{B as ee,a as se,b as le,c as F,d as te}from"./breadcrumb-BzF23N9r.js";import{P as ae,a as re,b as oe}from"./popover-RKAMC8Sp.js";import{S as u,a as j,b,c as g,d as o}from"./select-1iH1E-sl.js";import{P as ne}from"./printer-DG2ptavQ.js";import{E as ie}from"./eye-l06DEyAF.js";import{P as ce}from"./pen-D2eSiOvu.js";import{T as de}from"./trash-2-DtZ7KBuk.js";import{F as me}from"./funnel-CB_ZMTpW.js";import{X as M}from"./index-Dgq8gXnb.js";import"./index-1pcCnLfL.js";import"./utils-CBfrqCZ4.js";import"./dropdown-menu-DwlcXw75.js";import"./createLucideIcon-0ROLh-G9.js";import"./index-BeuHzciq.js";import"./index-DP8ALGzX.js";import"./index-RXsudbxc.js";import"./chevron-right-DRVY_d4a.js";import"./user-5Fvro5dK.js";import"./keyboard-Ba7FeAWa.js";import"./boxes-lfNeHimY.js";import"./users-CP3mSCFv.js";import"./chevron-down-DsEOygIq.js";import"./index-mNJmlL6r.js";import"./index-CWvUTaNw.js";import"./dialog-B3x4z2K6.js";import"./label-C8ich7pB.js";import"./bell-COgb0iRz.js";import"./index-ZoPFffot.js";const he=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Under Maintenance",color:"bg-yellow-500"},{label:"Needs Upgrade",color:"bg-blue-500"},{label:"For Disposal",color:"bg-gray-500"}];function xe({filters:a={},filterOptions:m,onApplyFilters:S,onReset:N}){const[c,n]=f.useState(""),[d,p]=f.useState("");f.useEffect(()=>{const h=["unit_code","room_id","processor","ram","storage","gpu","motherboard","condition"].find(w=>!!a[w]);h?(n(h),p(String(a[h]))):(n(""),p(""))},[a]);const P=[{value:"unit_code",label:"Unit Code"},{value:"room_id",label:"Room"},{value:"processor",label:"Processor"},{value:"ram",label:"RAM"},{value:"storage",label:"Storage"},{value:"gpu",label:"GPU"},{value:"motherboard",label:"Motherboard"},{value:"condition",label:"Condition"}];function i(l){const h=l==="all"?"":l;p(h);const w={...a};c&&(w[c]=h),S(w)}const R=!!a.unit_code||!!a.room_id||!!a.processor||!!a.ram||!!a.storage||!!a.gpu||!!a.motherboard||!!a.condition;return e.jsxs(ae,{children:[e.jsx(re,{asChild:!0,children:e.jsxs(x,{className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(me,{className:"h-4 w-4"}),"Filter",R&&e.jsx(M,{className:"h-4 w-4 ml-1 cursor-pointer",onClick:l=>{l.stopPropagation(),n(""),p(""),N()}})]})}),e.jsxs(oe,{className:"w-[calc(100vw-2rem)] sm:w-[380px] p-4",children:[e.jsx("h4",{className:"font-medium mb-3 text-lg",children:"Filter Options"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(u,{value:c,onValueChange:l=>{n(l),p("")},children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Field"})}),e.jsx(g,{children:P.map(l=>e.jsx(o,{value:l.value,children:l.label},l.value))})]}),c==="unit_code"&&e.jsxs(u,{value:d||"all",onValueChange:i,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Unit Code"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.unit_codes.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="room_id"&&e.jsxs(u,{value:d||"all",onValueChange:i,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Room"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),Object.entries(m.rooms).map(([l,h])=>e.jsxs(o,{value:l,children:["Room ",h]},l))]})]}),c==="processor"&&e.jsxs(u,{value:d||"all",onValueChange:i,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Processor"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.processors.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="ram"&&e.jsxs(u,{value:d||"all",onValueChange:i,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select RAM"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.rams.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="storage"&&e.jsxs(u,{value:d||"all",onValueChange:i,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Storage"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.storages.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="gpu"&&e.jsxs(u,{value:d||"all",onValueChange:i,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select GPU"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.gpus.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="motherboard"&&e.jsxs(u,{value:d||"all",onValueChange:i,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Motherboard"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.motherboards.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="condition"&&e.jsxs(u,{value:d||"all",onValueChange:i,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Condition"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.conditions.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(x,{size:"sm",variant:"outline",onClick:()=>{n(""),p(""),N()},children:[e.jsx(M,{className:"mr-1 h-4 w-4"})," Reset"]})})]})]})]})}function Ye({units:a,rooms:m,filters:S={}}){const[N,c]=f.useState(S.search||""),[n,d]=f.useState(1),[p,P]=f.useState(null),i=10,{delete:R}=I(),l=()=>{W.fire({icon:"success",title:"Updated!",text:"The system unit has been updated successfully."})},h=f.useMemo(()=>{const s=t=>[...new Set(t.filter(r=>r!==null&&r!==""))].sort();return{rooms:Object.fromEntries(m.map(t=>[String(t.id),t.room_number])),unit_codes:s(a.map(t=>t.unit_code)),processors:s(a.map(t=>t.processor)),rams:s(a.map(t=>t.ram)),storages:s(a.map(t=>t.storage)),gpus:s(a.map(t=>t.gpu)),motherboards:s(a.map(t=>t.motherboard)),conditions:s(a.map(t=>t.condition))}},[a,m]);function w(s){const t=Object.fromEntries(Object.entries({...s,search:N||void 0}).filter(([,r])=>r!==""&&r!==void 0));C.get(route("system-units.index"),t,{preserveState:!0,replace:!0})}function T(){c(""),C.get(route("system-units.index"),{},{preserveState:!0,replace:!0})}function V(s){s.key==="Enter"&&w(S)}const y=f.useMemo(()=>{if(!N)return a;const s=N.toLowerCase();return a.filter(t=>{const r=t.unit_code?.toLowerCase()||"",B=t.room?.room_number?.toLowerCase()||"";return r.includes(s)||B.includes(s)})},[a,N]),U=Math.ceil(y.length/i)||1,$=y.slice((n-1)*i,n*i),k=s=>he.find(r=>r.label.toLowerCase()===(s||"").toLowerCase())||{label:s||"Unknown",color:"bg-slate-400"},z=f.useRef(null),E=()=>{if(!a||a.length===0){alert("No data available to print.");return}const s=window.open("","","width=900,height=700"),t=a.map(r=>`
        <tr>
            <td>${r.id}</td>
            <td>${r.unit_code}</td>
            <td>${r.room?.room_number??"N/A"}</td>
            <td>${r.serial_number}</td>
            <td>${r.processor}</td>
            <td>${r.ram}</td>
            <td>${r.storage}</td>
            <td>${r.gpu??"N/A"}</td>
            <td>${r.motherboard}</td>
            <td>${r.condition}</td>
            <td>${r.condition_details??"N/A"}</td>
          <td>${r.mr_to?.name??"N/A"}</td>
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
    `),s.document.close(),s.print()};return e.jsxs(O,{children:[e.jsx(D,{}),e.jsxs(G,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(q,{}),e.jsx(H,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(ee,{children:e.jsx(se,{children:e.jsxs(le,{children:[e.jsx(F,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(te,{}),e.jsx(F,{href:"/admin/system-units","aria-current":"page",className:"font-semibold text-foreground",children:"System Unit Lists"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(J,{})]})}),e.jsxs("main",{className:"w-full px-6 py-4",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"System Units"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(xe,{filters:S,filterOptions:h,onApplyFilters:w,onReset:T}),e.jsxs(x,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:E,children:[e.jsx(ne,{className:"h-4 w-4"}),"Print"]}),e.jsx(X,{placeholder:"Search Unit Code or Room",value:N,onChange:s=>{const t=s.target.value;c(t),d(1)},onKeyDown:V,className:`flex-1 min-w-0 sm:max-w-xs w-full
                                border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
                                focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
                                placeholder:text-[hsl(142,34%,40%)]`})]}),e.jsx(x,{className:"bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>C.visit(route("admin.system-units.create")),children:"Add New Unit"})]}),e.jsx("div",{className:"overflow-x-auto rounded-lg shadow-lg",children:e.jsxs(Q,{ref:z,className:"w-full bg-white table-fixed",children:[e.jsx(Y,{children:e.jsxs(_,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(A,{className:"px-5 py-1",children:"#"}),e.jsx(A,{className:"px-5 py-1",children:"PC Code"}),e.jsx(A,{className:"px-5 py-1",children:"Room"}),e.jsx(A,{className:"px-5 py-1",children:"Condition"}),e.jsx(A,{className:"px-5 py-1",children:"Action"})]})}),e.jsx(Z,{children:$.length>0?$.map((s,t)=>e.jsxs(_,{className:"hover:shadow-sm",children:[e.jsx(v,{className:"px-5 py-1",children:(n-1)*i+t+1}),e.jsx(v,{className:"px-5 py-1",children:s.unit_code}),e.jsxs(v,{className:"px-5 py-1",children:["ROOM"," ",s.room?.room_number||"N/A"]}),e.jsx(v,{className:"px-5 py-1",children:s.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${k(s.condition).color}`,children:k(s.condition).label}):"N/A"}),e.jsx(v,{children:e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(x,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>C.visit(`/system-units/view/${s.unit_code}`),children:[e.jsx(ie,{className:"h-4 w-4"}),"View"]}),e.jsxs(x,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>{P(s),setShowModal(!0)},children:[e.jsx(ce,{className:"h-4 w-4"}),"Edit"]}),e.jsxs(x,{size:"sm",className:"flex items-center gap-2 bg-red-600 text-white border-none hover:bg-red-700",onClick:()=>{confirm(`Are you sure you want to delete ${s.unit_name}?`)&&C.delete(`/system-units/${s.id}`)},children:[e.jsx(de,{className:"h-4 w-4"}),"Delete"]})]})})]},s.id)):e.jsx(_,{children:e.jsx(v,{colSpan:5,className:"text-center py-4",children:"No matching units found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Showing"," ",y.length===0?0:(n-1)*i+1," ","–",Math.min(n*i,y.length)," ","of ",y.length," System Units"]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(x,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>d(s=>s-1),children:"Previous"}),Array.from({length:U},(s,t)=>t+1).filter(s=>s===1||s===U?!0:s>=n-2&&s<=n+2).map((s,t,r)=>e.jsxs(L.Fragment,{children:[t>0&&r[t]-r[t-1]>1&&e.jsx("span",{className:"px-1",children:"..."}),e.jsx(x,{size:"sm",variant:n===s?"default":"outline",onClick:()=>d(s),children:s})]},s)),e.jsx(x,{size:"sm",variant:"outline",disabled:n===U,onClick:()=>d(s=>s+1),children:"Next"})]})]}),p&&e.jsx(K,{unit:p,rooms:m,onClose:()=>P(null),onSuccess:l})]})]})]})}export{Ye as default};
