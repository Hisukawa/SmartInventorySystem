import{r as f,u as O,j as e,a as C,R as q}from"./app-D0i8m_8l.js";import{B as x}from"./button-yOuVIg9F.js";import{A as G}from"./app-sidebar-CcMZXN-7.js";import{S as H,a as K,b as X,c as W}from"./avatar-BqS52ZpC.js";import J from"./EditUnitModal-BRoJUUOf.js";import{S as k}from"./sweetalert2.esm.all-BQIkj5Wb.js";import{I as Q}from"./input-OABIeymu.js";import{N as Y}from"./Notification-FEO6dXEE.js";import{T as Z,a as ee,b as R,c as P,d as se,e as y}from"./table-DIGWBOZy.js";import"./index-C-DAYPb5.js";import{B as te,a as le,b as ae,c as V,d as re}from"./breadcrumb-CRkQ-jYj.js";import{P as oe,a as ne,b as ce}from"./popover-CnjaNkqH.js";import{S as u,a as j,b,c as g,d as o}from"./select-BLR1GJBQ.js";import{P as ie}from"./printer-VxmhyN67.js";import{c as E}from"./createLucideIcon-NufmfICA.js";import{E as de}from"./eye-CsECnoig.js";import{P as me}from"./pen-Dr81f4yi.js";import{F as he}from"./funnel-DgIlFA_F.js";import{X as I}from"./index-DjHOqiG8.js";import"./index-CoG7iwtP.js";import"./utils-CBfrqCZ4.js";import"./dropdown-menu-nNOprFGZ.js";import"./index-CcJ7-4MK.js";import"./index-CpC8nfOR.js";import"./index-C5y489q6.js";import"./index-7t7EbyuD.js";import"./chevron-right-DtXgrGsz.js";import"./sparkles-edRazKMq.js";import"./bell-BVcR3ZIR.js";import"./keyboard-DoUlLfop.js";import"./boxes-vE5Yjezp.js";import"./users-CLxr0dYH.js";import"./chevron-down-DdyEyP3J.js";import"./index-NSj8iSsg.js";import"./index-ZXaxZaqM.js";import"./dialog-Bs66JqyI.js";import"./label-6O42sz8w.js";import"./index-BPEQZUl5.js";/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],pe=E("download",xe);/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],je=E("upload",ue),be=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Under Maintenance",color:"bg-yellow-500"},{label:"Needs Upgrade",color:"bg-blue-500"},{label:"For Disposal",color:"bg-gray-500"}];function ge({filters:r={},filterOptions:m,onApplyFilters:S,onReset:N}){const[c,n]=f.useState(""),[i,p]=f.useState("");f.useEffect(()=>{const h=["unit_code","room_id","processor","ram","storage","gpu","motherboard","condition"].find(w=>!!r[w]);h?(n(h),p(String(r[h]))):(n(""),p(""))},[r]);const _=[{value:"unit_code",label:"Unit Code"},{value:"room_id",label:"Room"},{value:"processor",label:"Processor"},{value:"ram",label:"RAM"},{value:"storage",label:"Storage"},{value:"gpu",label:"GPU"},{value:"motherboard",label:"Motherboard"},{value:"condition",label:"Condition"}];function d(t){const h=t==="all"?"":t;p(h);const w={...r};c&&(w[c]=h),S(w)}const U=!!r.unit_code||!!r.room_id||!!r.processor||!!r.ram||!!r.storage||!!r.gpu||!!r.motherboard||!!r.condition;return e.jsxs(oe,{children:[e.jsx(ne,{asChild:!0,children:e.jsxs(x,{className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(he,{className:"h-4 w-4"}),"Filter",U&&e.jsx(I,{className:"h-4 w-4 ml-1 cursor-pointer",onClick:t=>{t.stopPropagation(),n(""),p(""),N()}})]})}),e.jsxs(ce,{className:"w-[calc(100vw-2rem)] sm:w-[380px] p-4",children:[e.jsx("h4",{className:"font-medium mb-3 text-lg",children:"Filter Options"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(u,{value:c,onValueChange:t=>{n(t),p("")},children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Field"})}),e.jsx(g,{children:_.map(t=>e.jsx(o,{value:t.value,children:t.label},t.value))})]}),c==="unit_code"&&e.jsxs(u,{value:i||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Unit Code"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.unit_codes.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="room_id"&&e.jsxs(u,{value:i||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Room"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),Object.entries(m.rooms).map(([t,h])=>e.jsxs(o,{value:t,children:["Room ",h]},t))]})]}),c==="processor"&&e.jsxs(u,{value:i||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Processor"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.processors.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="ram"&&e.jsxs(u,{value:i||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select RAM"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.rams.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="storage"&&e.jsxs(u,{value:i||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Storage"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.storages.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="gpu"&&e.jsxs(u,{value:i||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select GPU"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.gpus.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="motherboard"&&e.jsxs(u,{value:i||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Motherboard"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.motherboards.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="condition"&&e.jsxs(u,{value:i||"all",onValueChange:d,children:[e.jsx(j,{className:"w-full",children:e.jsx(b,{placeholder:"Select Condition"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.conditions.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(x,{size:"sm",variant:"outline",onClick:()=>{n(""),p(""),N()},children:[e.jsx(I,{className:"mr-1 h-4 w-4"})," Reset"]})})]})]})]})}function ls({units:r,rooms:m,filters:S={}}){const[N,c]=f.useState(S.search||""),[n,i]=f.useState(1),[p,_]=f.useState(null),d=10;O();const U=()=>{k.fire({icon:"success",title:"Updated!",text:"The system unit has been updated successfully."})},t=f.useMemo(()=>{const s=l=>[...new Set(l.filter(a=>a!==null&&a!==""))].sort();return{rooms:Object.fromEntries(m.map(l=>[String(l.id),l.room_number])),unit_codes:s(r.map(l=>l.unit_code)),processors:s(r.map(l=>l.processor)),rams:s(r.map(l=>l.ram)),storages:s(r.map(l=>l.storage)),gpus:s(r.map(l=>l.gpu)),motherboards:s(r.map(l=>l.motherboard)),conditions:s(r.map(l=>l.condition))}},[r,m]);function h(s){const l=Object.fromEntries(Object.entries({...s,search:N||void 0}).filter(([,a])=>a!==""&&a!==void 0));C.get(route("system-units.index"),l,{preserveState:!0,replace:!0})}function w(){c(""),C.get(route("system-units.index"),{},{preserveState:!0,replace:!0})}function D(s){s.key==="Enter"&&h(S)}const F=f.useMemo(()=>{if(!N)return r;const s=N.toLowerCase();return r.filter(l=>{const a=l.unit_code?.toLowerCase()||"",v=l.room?.room_number?.toLowerCase()||"";return a.includes(s)||v.includes(s)})},[r,N]),A=Math.ceil(F.length/d)||1,M=F.slice((n-1)*d,n*d),$=s=>be.find(a=>a.label.toLowerCase()===(s||"").toLowerCase())||{label:s||"Unknown",color:"bg-slate-400"},L=f.useRef(null),z=()=>{if(!r||r.length===0){alert("No data available to print.");return}const s=window.open("","","width=900,height=700"),l=r.map(a=>`
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
                        ${l}
                    </tbody>
                </table>
            </body>
        </html>
    `),s.document.close(),s.print()},B=async s=>{const l=s.target.files[0];if(!l)return;const a=new FormData;a.append("file",l);try{const v=await fetch(route("system-units.import"),{method:"POST",headers:{"X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').content},body:a}),T=await v.json();v.ok?k.fire({icon:"success",title:"Import Successful!",text:T.message}).then(()=>{C.reload({only:["units"]})}):k.fire({icon:"error",title:"Import Failed",text:T.error||"There was a problem with the import file."})}catch(v){k.fire({icon:"error",title:"Import Error",text:v.message})}finally{s.target.value=""}};return e.jsxs(H,{children:[e.jsx(G,{}),e.jsxs(K,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(X,{}),e.jsx(W,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(te,{children:e.jsx(le,{children:e.jsxs(ae,{children:[e.jsx(V,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(re,{}),e.jsx(V,{href:"/admin/system-units","aria-current":"page",className:"font-semibold text-foreground",children:"System Unit Lists"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(Y,{})]})}),e.jsxs("main",{className:"w-full px-6 py-4",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"System Units"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(ge,{filters:S,filterOptions:t,onApplyFilters:h,onReset:w}),e.jsxs(x,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:z,children:[e.jsx(ie,{className:"h-4 w-4"}),"Print"]}),e.jsxs("label",{className:"flex items-center gap-2 cursor-pointer bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)] px-4 py-2 rounded-md",children:[e.jsx("input",{type:"file",accept:".csv",onChange:B,className:"hidden"}),e.jsx(je,{className:"h-4 w-4"}),"Import"]}),e.jsxs(x,{className:"flex items-center gap-2 bg-[hsl(142,34%,45%)] text-white border-none hover:bg-[hsl(142,34%,38%)]",onClick:()=>window.location.href=route("system-units.export"),children:[e.jsx(pe,{className:"h-4 w-4"}),"Export"]}),e.jsx(Q,{placeholder:"Search Unit Code or Room",value:N,onChange:s=>{const l=s.target.value;c(l),i(1)},onKeyDown:D,className:`flex-1 min-w-0 sm:max-w-xs w-full
                                border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
                                focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
                                placeholder:text-[hsl(142,34%,40%)]`})]}),e.jsx(x,{className:"bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>C.visit(route("admin.system-units.create")),children:"Add New Unit"})]}),e.jsx("div",{className:"overflow-x-auto rounded-lg shadow-lg",children:e.jsxs(Z,{ref:L,className:"w-full bg-white table-fixed",children:[e.jsx(ee,{children:e.jsxs(R,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(P,{className:"px-5 py-1",children:"#"}),e.jsx(P,{className:"px-5 py-1",children:"PC Code"}),e.jsx(P,{className:"px-5 py-1",children:"Room"}),e.jsx(P,{className:"px-5 py-1",children:"Condition"}),e.jsx(P,{className:"px-5 py-1",children:"Action"})]})}),e.jsx(se,{children:M.length>0?M.map((s,l)=>e.jsxs(R,{className:"hover:shadow-sm",children:[e.jsx(y,{className:"px-5 py-1",children:(n-1)*d+l+1}),e.jsx(y,{className:"px-5 py-1",children:s.unit_code}),e.jsxs(y,{className:"px-5 py-1",children:["ROOM"," ",s.room?.room_number||"N/A"]}),e.jsx(y,{className:"px-5 py-1",children:s.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${$(s.condition).color}`,children:$(s.condition).label}):"N/A"}),e.jsx(y,{children:e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(x,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>C.visit(`/system-units/view/${s.unit_code}`),children:[e.jsx(de,{className:"h-4 w-4"}),"View"]}),e.jsxs(x,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>{_(s),setShowModal(!0)},children:[e.jsx(me,{className:"h-4 w-4"}),"Edit"]})]})})]},s.id)):e.jsx(R,{children:e.jsx(y,{colSpan:5,className:"text-center py-4",children:"No matching units found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Page ",n," of ",A]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(x,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>i(s=>s-1),children:"Previous"}),Array.from({length:A},(s,l)=>l+1).filter(s=>s===1||s===A?!0:s>=n-2&&s<=n+2).map((s,l,a)=>e.jsxs(q.Fragment,{children:[l>0&&a[l]-a[l-1]>1&&e.jsx("span",{className:"px-1",children:"..."}),e.jsx(x,{size:"sm",variant:n===s?"default":"outline",onClick:()=>i(s),children:s})]},s)),e.jsx(x,{size:"sm",variant:"outline",disabled:n===A,onClick:()=>i(s=>s+1),children:"Next"})]})]}),p&&e.jsx(J,{unit:p,rooms:m,onClose:()=>_(null),onSuccess:U})]})]})]})}export{ls as default};
