import{r as f,u as L,j as e,a as C,R as O}from"./app-X2XQLKS3.js";import{B as x}from"./button-C62_EHzm.js";import{A as G}from"./app-sidebar-DleAGgmT.js";import{S as q,a as K,b as H,c as X}from"./avatar-CEgLhWWb.js";import W from"./EditUnitModal-rjr6nkte.js";import{S as _}from"./sweetalert2.esm.all-BQIkj5Wb.js";import{I as J}from"./input-Cq2JkAbx.js";import{N as Q}from"./Notification-B4M9gk23.js";import{T as Y,a as Z,b as k,c as P,d as ee,e as S}from"./table-gmNX_0J6.js";import"./index-BqZIbuVI.js";import{B as se,a as le,b as te,c as I,d as re}from"./breadcrumb-BQWS_-1y.js";import{P as ae,a as oe,b as ne}from"./popover-DjV2oZ4t.js";import{S as u,a as j,b,c as g,d as o}from"./select-BpHKBjTl.js";import{P as ie}from"./printer-ClhM--XY.js";import{U as ce,D as de}from"./upload-Xp23ovNE.js";import{E as me}from"./eye-DcIGipeA.js";import{P as he}from"./pen-rAhiXLQh.js";import{F as xe}from"./funnel-C_-KVArY.js";import{X as M}from"./index-Dz5glkNh.js";import"./index-qYNOf9mi.js";import"./utils-CBfrqCZ4.js";import"./dropdown-menu-BB3Za7hv.js";import"./createLucideIcon-0p_GVwJf.js";import"./index-iDKACU5a.js";import"./index-CE5EMy0D.js";import"./index-BhjrTxbN.js";import"./index-BIgnMwzR.js";import"./chevron-right-D8htQa18.js";import"./sparkles-B2sX7EvK.js";import"./bell-Bcj3VjmY.js";import"./keyboard-dEYIgviQ.js";import"./boxes-BWz8K0Ih.js";import"./users-xZXbU29W.js";import"./chevron-down-Ckf9Hflw.js";import"./index-D_NolL6N.js";import"./index-CDj-ShJ8.js";import"./dialog-CSi9K315.js";import"./label-V_itOdbW.js";import"./index-DjyIBfzh.js";const pe=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Under Maintenance",color:"bg-yellow-500"},{label:"Needs Upgrade",color:"bg-blue-500"},{label:"For Disposal",color:"bg-gray-500"}];function ue({filters:a={},filterOptions:m,onApplyFilters:y,onReset:N}){const[i,n]=f.useState(""),[c,p]=f.useState("");f.useEffect(()=>{const h=["unit_code","room_id","processor","ram","storage","gpu","motherboard","condition"].find(w=>!!a[w]);h?(n(h),p(String(a[h]))):(n(""),p(""))},[a]);const A=[{value:"unit_code",label:"Unit Code"},{value:"room_id",label:"Room"},{value:"processor",label:"Processor"},{value:"ram",label:"RAM"},{value:"storage",label:"Storage"},{value:"gpu",label:"GPU"},{value:"motherboard",label:"Motherboard"},{value:"condition",label:"Condition"}];function d(l){const h=l==="all"?"":l;p(h);const w={...a};i&&(w[i]=h),y(w)}const R=!!a.unit_code||!!a.room_id||!!a.processor||!!a.ram||!!a.storage||!!a.gpu||!!a.motherboard||!!a.condition;return e.jsxs(ae,{children:[e.jsx(oe,{asChild:!0,children:e.jsxs(x,{className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(xe,{className:"h-4 w-4"}),"Filter",R&&e.jsx(M,{className:"h-4 w-4 ml-1 cursor-pointer",onClick:l=>{l.stopPropagation(),n(""),p(""),N()}})]})}),e.jsxs(ne,{className:"w-[calc(100vw-2rem)] sm:w-[380px] p-4",children:[e.jsx("h4",{className:"font-medium mb-3 text-lg",children:"Filter Options"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(u,{value:i,onValueChange:l=>{n(l),p("")},children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Field"})}),e.jsx(g,{children:A.map(l=>e.jsx(o,{value:l.value,children:l.label},l.value))})]}),i==="unit_code"&&e.jsxs(u,{value:c||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Unit Code"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.unit_codes.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="room_id"&&e.jsxs(u,{value:c||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Room"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),Object.entries(m.rooms).map(([l,h])=>e.jsxs(o,{value:l,children:["Room ",h]},l))]})]}),i==="processor"&&e.jsxs(u,{value:c||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Processor"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.processors.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="ram"&&e.jsxs(u,{value:c||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select RAM"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.rams.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="storage"&&e.jsxs(u,{value:c||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Storage"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.storages.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="gpu"&&e.jsxs(u,{value:c||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select GPU"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.gpus.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="motherboard"&&e.jsxs(u,{value:c||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Motherboard"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.motherboards.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="condition"&&e.jsxs(u,{value:c||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Condition"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.conditions.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(x,{size:"sm",variant:"outline",onClick:()=>{n(""),p(""),N()},children:[e.jsx(M,{className:"mr-1 h-4 w-4"})," Reset"]})})]})]})]})}function ss({units:a,rooms:m,filters:y={}}){const[N,i]=f.useState(y.search||""),[n,c]=f.useState(1),[p,A]=f.useState(null),d=10;L();const R=()=>{_.fire({icon:"success",title:"Updated!",text:"The system unit has been updated successfully."})},l=f.useMemo(()=>{const s=t=>[...new Set(t.filter(r=>r!==null&&r!==""))].sort();return{rooms:Object.fromEntries(m.map(t=>[String(t.id),t.room_number])),unit_codes:s(a.map(t=>t.unit_code)),processors:s(a.map(t=>t.processor)),rams:s(a.map(t=>t.ram)),storages:s(a.map(t=>t.storage)),gpus:s(a.map(t=>t.gpu)),motherboards:s(a.map(t=>t.motherboard)),conditions:s(a.map(t=>t.condition))}},[a,m]);function h(s){const t=Object.fromEntries(Object.entries({...s,search:N||void 0}).filter(([,r])=>r!==""&&r!==void 0));C.get(route("system-units.index"),t,{preserveState:!0,replace:!0})}function w(){i(""),C.get(route("system-units.index"),{},{preserveState:!0,replace:!0})}function E(s){s.key==="Enter"&&h(y)}const F=f.useMemo(()=>{if(!N)return a;const s=N.toLowerCase();return a.filter(t=>{const r=t.unit_code?.toLowerCase()||"",v=t.room?.room_number?.toLowerCase()||"";return r.includes(s)||v.includes(s)})},[a,N]),U=Math.ceil(F.length/d)||1,T=F.slice((n-1)*d,n*d),$=s=>pe.find(r=>r.label.toLowerCase()===(s||"").toLowerCase())||{label:s||"Unknown",color:"bg-slate-400"},D=f.useRef(null),z=()=>{if(!a||a.length===0){alert("No data available to print.");return}const s=window.open("","","width=900,height=700"),t=a.map(r=>`
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
    `),s.document.close(),s.print()},B=async s=>{const t=s.target.files[0];if(!t)return;const r=new FormData;r.append("file",t);try{const v=await fetch(route("system-units.import"),{method:"POST",headers:{"X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').content},body:r}),V=await v.json();v.ok?_.fire({icon:"success",title:"Import Successful!",text:V.message}).then(()=>{C.reload({only:["units"]})}):_.fire({icon:"error",title:"Import Failed",text:V.error||"There was a problem with the import file."})}catch(v){_.fire({icon:"error",title:"Import Error",text:v.message})}finally{s.target.value=""}};return e.jsxs(q,{children:[e.jsx(G,{}),e.jsxs(K,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(H,{}),e.jsx(X,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(se,{children:e.jsx(le,{children:e.jsxs(te,{children:[e.jsx(I,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(re,{}),e.jsx(I,{href:"/admin/system-units","aria-current":"page",className:"font-semibold text-foreground",children:"System Unit Lists"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(Q,{})]})}),e.jsxs("main",{className:"w-full px-6 py-4",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"System Units"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(ue,{filters:y,filterOptions:l,onApplyFilters:h,onReset:w}),e.jsxs(x,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:z,children:[e.jsx(ie,{className:"h-4 w-4"}),"Print"]}),e.jsxs("label",{className:"flex items-center gap-2 cursor-pointer bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)] px-4 py-2 rounded-md",children:[e.jsx("input",{type:"file",accept:".csv",onChange:B,className:"hidden"}),e.jsx(ce,{className:"h-4 w-4"}),"Import"]}),e.jsxs(x,{className:"flex items-center gap-2 bg-[hsl(142,34%,45%)] text-white border-none hover:bg-[hsl(142,34%,38%)]",onClick:()=>window.location.href=route("system-units.export"),children:[e.jsx(de,{className:"h-4 w-4"}),"Export"]}),e.jsx(J,{placeholder:"Search Unit Code or Room",value:N,onChange:s=>{const t=s.target.value;i(t),c(1)},onKeyDown:E,className:`flex-1 min-w-0 sm:max-w-xs w-full
                                border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
                                focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
                                placeholder:text-[hsl(142,34%,40%)]`})]}),e.jsx(x,{className:"bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>C.visit(route("admin.system-units.create")),children:"Add New Unit"})]}),e.jsx("div",{className:"overflow-x-auto rounded-lg shadow-lg",children:e.jsxs(Y,{ref:D,className:"w-full bg-white table-fixed",children:[e.jsx(Z,{children:e.jsxs(k,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(P,{className:"px-5 py-1",children:"#"}),e.jsx(P,{className:"px-5 py-1",children:"PC Code"}),e.jsx(P,{className:"px-5 py-1",children:"Room"}),e.jsx(P,{className:"px-5 py-1",children:"Condition"}),e.jsx(P,{className:"px-5 py-1",children:"Action"})]})}),e.jsx(ee,{children:T.length>0?T.map((s,t)=>e.jsxs(k,{className:"hover:shadow-sm",children:[e.jsx(S,{className:"px-5 py-1",children:(n-1)*d+t+1}),e.jsx(S,{className:"px-5 py-1",children:s.unit_code}),e.jsxs(S,{className:"px-5 py-1",children:["ROOM"," ",s.room?.room_number||"N/A"]}),e.jsx(S,{className:"px-5 py-1",children:s.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${$(s.condition).color}`,children:$(s.condition).label}):"N/A"}),e.jsx(S,{children:e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(x,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>C.visit(`/system-units/view/${s.unit_code}`),children:[e.jsx(me,{className:"h-4 w-4"}),"View"]}),e.jsxs(x,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>{A(s),setShowModal(!0)},children:[e.jsx(he,{className:"h-4 w-4"}),"Edit"]})]})})]},s.id)):e.jsx(k,{children:e.jsx(S,{colSpan:5,className:"text-center py-4",children:"No matching units found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Page ",n," of ",U]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(x,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>c(s=>s-1),children:"Previous"}),Array.from({length:U},(s,t)=>t+1).filter(s=>s===1||s===U?!0:s>=n-2&&s<=n+2).map((s,t,r)=>e.jsxs(O.Fragment,{children:[t>0&&r[t]-r[t-1]>1&&e.jsx("span",{className:"px-1",children:"..."}),e.jsx(x,{size:"sm",variant:n===s?"default":"outline",onClick:()=>c(s),children:s})]},s)),e.jsx(x,{size:"sm",variant:"outline",disabled:n===U,onClick:()=>c(s=>s+1),children:"Next"})]})]}),p&&e.jsx(W,{unit:p,rooms:m,onClose:()=>A(null),onSuccess:R})]})]})]})}export{ss as default};
