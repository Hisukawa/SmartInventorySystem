import{r as f,u as G,j as e,a as A,R as W}from"./app-CaoI1reZ.js";import{B as b}from"./button-BPLQ4Dkz.js";import{A as q}from"./app-sidebar-z9ZnLlN2.js";import{S as H,a as K,b as X,c as J}from"./avatar-B8CEIOAH.js";import Q from"./EditUnitModal-NElZURxb.js";import{S as Y}from"./sweetalert2.esm.all-BQIkj5Wb.js";import{I as Z}from"./input-Cg0CKgZH.js";import{N as ee}from"./Notification-DgDBBmDu.js";import{T as se,a as te,b as U,c as P,d as le,e as v}from"./table-CpmQhJ6o.js";import"./index-Cei0w3vs.js";import{B as re,a as ae,b as oe,c as F,d as ne}from"./breadcrumb-DDlk8mfn.js";import{P as ie,a as ce,b as de}from"./popover-DxauE5kF.js";import{S as p,a as u,b as j,c as g,d as o}from"./select-DDhQU3R-.js";import{P as me}from"./printer-BvihgZZr.js";import{E as M}from"./eye-BOE3rzKD.js";import{P as E}from"./pen-Cf_enFVM.js";import{i as _,E as he}from"./menu-5e7VlTj6.js";import{F as xe}from"./funnel-DpdapEUG.js";import{X as I}from"./index-DT3YNT8t.js";import"./index-D60rSOOJ.js";import"./utils-CBfrqCZ4.js";import"./dropdown-menu-BL-W4LOU.js";import"./index-Bmtdkwi5.js";import"./index-DeBbGwER.js";import"./index-v4WWQvAS.js";import"./createLucideIcon-Rh--qpmj.js";import"./chevron-right-Bu76VyY5.js";import"./house-CWHpkqnL.js";import"./user-Ba2nzpqc.js";import"./log-out-BZef0rf9.js";import"./keyboard-B6j9SKrE.js";import"./boxes-BFnyI8HH.js";import"./users-Cf_U3PTm.js";import"./chevron-down-Bk0krvjG.js";import"./index-Cl5yurQF.js";import"./index-kj85zsm8.js";import"./dialog-DlMFzN-e.js";import"./label-DPm2Mog5.js";import"./bell-Cw0b7alc.js";import"./index-D-dH2gDf.js";import"./portal-DCsUjKZj.js";import"./use-server-handoff-complete-BlOh29HM.js";import"./with-selector-DKD2atIP.js";function pe({filters:a={},filterOptions:m,onApplyFilters:y,onReset:N}){const[c,n]=f.useState(""),[d,x]=f.useState("");f.useEffect(()=>{const h=["unit_code","room_id","processor","ram","storage","gpu","motherboard","condition"].find(w=>!!a[w]);h?(n(h),x(String(a[h]))):(n(""),x(""))},[a]);const S=[{value:"unit_code",label:"Unit Code"},{value:"room_id",label:"Room"},{value:"processor",label:"Processor"},{value:"ram",label:"RAM"},{value:"storage",label:"Storage"},{value:"gpu",label:"GPU"},{value:"motherboard",label:"Motherboard"},{value:"condition",label:"Condition"}];function i(t){const h=t==="all"?"":t;x(h);const w={...a};c&&(w[c]=h),y(w)}const k=!!a.unit_code||!!a.room_id||!!a.processor||!!a.ram||!!a.storage||!!a.gpu||!!a.motherboard||!!a.condition;return e.jsxs(ie,{children:[e.jsx(ce,{asChild:!0,children:e.jsxs(b,{className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(xe,{className:"h-4 w-4"}),"Filter",k&&e.jsx(I,{className:"h-4 w-4 ml-1 cursor-pointer",onClick:t=>{t.stopPropagation(),n(""),x(""),N()}})]})}),e.jsxs(de,{className:"w-[calc(100vw-2rem)] sm:w-[380px] p-4",children:[e.jsx("h4",{className:"font-medium mb-3 text-lg",children:"Filter Options"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(p,{value:c,onValueChange:t=>{n(t),x("")},children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Field"})}),e.jsx(g,{children:S.map(t=>e.jsx(o,{value:t.value,children:t.label},t.value))})]}),c==="unit_code"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Unit Code"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.unit_codes.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="room_id"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Room"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),Object.entries(m.rooms).map(([t,h])=>e.jsxs(o,{value:t,children:["Room ",h]},t))]})]}),c==="processor"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Processor"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.processors.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="ram"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select RAM"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.rams.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="storage"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Storage"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.storages.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="gpu"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select GPU"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.gpus.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="motherboard"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Motherboard"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.motherboards.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),c==="condition"&&e.jsxs(p,{value:d||"all",onValueChange:i,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Condition"})}),e.jsxs(g,{children:[e.jsx(o,{value:"all",children:"All"}),m.conditions.map(t=>e.jsx(o,{value:t,children:t},t))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(b,{size:"sm",variant:"outline",onClick:()=>{n(""),x(""),N()},children:[e.jsx(I,{className:"mr-1 h-4 w-4"})," Reset"]})})]})]})]})}function rs({units:a,rooms:m,filters:y={}}){const[N,c]=f.useState(y.search||""),[n,d]=f.useState(1),[x,S]=f.useState(null),i=10,{delete:k}=G(),t=()=>{Y.fire({icon:"success",title:"Updated!",text:"The system unit has been updated successfully."})},h=f.useMemo(()=>{const s=l=>[...new Set(l.filter(r=>r!==null&&r!==""))].sort();return{rooms:Object.fromEntries(m.map(l=>[String(l.id),l.room_number])),unit_codes:s(a.map(l=>l.unit_code)),processors:s(a.map(l=>l.processor)),rams:s(a.map(l=>l.ram)),storages:s(a.map(l=>l.storage)),gpus:s(a.map(l=>l.gpu)),motherboards:s(a.map(l=>l.motherboard)),conditions:s(a.map(l=>l.condition))}},[a,m]);function w(s){const l=Object.fromEntries(Object.entries({...s,search:N||void 0}).filter(([,r])=>r!==""&&r!==void 0));A.get(route("system-units.index"),l,{preserveState:!0,replace:!0})}function T(){c(""),A.get(route("system-units.index"),{},{preserveState:!0,replace:!0})}function B(s){s.key==="Enter"&&w(y)}const C=f.useMemo(()=>{if(!N)return a;const s=N.toLowerCase();return a.filter(l=>{const r=l.unit_code?.toLowerCase()||"",O=l.room?.room_number?.toLowerCase()||"";return r.includes(s)||O.includes(s)})},[a,N]),R=Math.ceil(C.length/i)||1,$=C.slice((n-1)*i,n*i),z={Working:"bg-green-200 text-green-800","Not Working":"bg-red-200 text-red-800","Intermittent Issue":"bg-yellow-200 text-yellow-800","Needs Cleaning":"bg-blue-200 text-blue-800","For Replacement":"bg-orange-200 text-orange-800","For Disposal":"bg-gray-200 text-gray-800",Condemned:"bg-black text-white","Needs Repair":"bg-red-200 text-red-800","No Signal":"bg-red-200 text-red-800","Needs Configuration":"bg-blue-200 text-blue-800","Under Maintenance":"bg-blue-200 text-blue-900","To Be Diagnosed":"bg-blue-100 text-blue-800"},V=s=>{const l=s||"Unknown",r=z[l]||"bg-slate-400 text-white";return{label:l,color:r}},L=f.useRef(null),D=()=>{if(!a||a.length===0){alert("No data available to print.");return}const s=window.open("","","width=900,height=700"),l=a.map(r=>`
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
                        ${l}
                    </tbody>
                </table>
            </body>
        </html>
    `),s.document.close(),s.print()};return e.jsxs(H,{children:[e.jsx(q,{}),e.jsxs(K,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(X,{}),e.jsx(J,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(re,{children:e.jsx(ae,{children:e.jsxs(oe,{children:[e.jsx(F,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(ne,{}),e.jsx(F,{href:"/admin/system-units","aria-current":"page",className:"font-semibold text-foreground",children:"System Unit Lists"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(ee,{})]})}),e.jsxs("main",{className:"w-full px-6 py-4",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"System Units"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center flex-1",children:[e.jsx(Z,{placeholder:"Search Unit Code or Room",value:N,onChange:s=>{const l=s.target.value;c(l),d(1)},onKeyDown:B,className:"flex-1 min-w-0 sm:max-w-xs w-full border-[hsl(142,34%,51%)]"}),e.jsx(pe,{filters:y,filterOptions:h,onApplyFilters:w,onReset:T}),e.jsxs(b,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:D,children:[e.jsx(me,{className:"h-4 w-4"}),"Print"]})]}),e.jsx(b,{className:"bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>A.visit(route("admin.system-units.create")),children:"Add New Unit"})]}),e.jsx("div",{className:"overflow-x-auto rounded-lg shadow-lg",children:e.jsxs(se,{ref:L,className:"w-full bg-white table-fixed",children:[e.jsx(te,{children:e.jsxs(U,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(P,{className:"px-5 py-1 text-center",children:"#"}),e.jsx(P,{className:"px-5 py-1 text-center",children:"PC Code"}),e.jsx(P,{className:"px-5 py-1 text-center",children:"Room"}),e.jsx(P,{className:"px-5 py-1 text-center",children:"Condition"}),e.jsx(P,{className:"px-5 py-1 text-center",children:"Action"})]})}),e.jsx(le,{children:$.length>0?$.map((s,l)=>e.jsxs(U,{className:"hover:shadow-sm text-center",children:[e.jsx(v,{className:"px-5 py-2 font-medium align-middle",children:(n-1)*i+l+1}),e.jsx(v,{className:"px-5 py-2 align-middle",children:s.unit_code}),e.jsxs(v,{className:"px-5 py-2 align-middle",children:["ROOM"," ",s.room?.room_number||"N/A"]}),e.jsx(v,{className:"px-5 py-2 align-middle",children:s.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium ${V(s.condition).color}`,children:V(s.condition).label}):"N/A"}),e.jsxs(v,{className:"px-5 py-2 align-middle",children:[e.jsxs("div",{className:"hidden sm:flex justify-center items-center gap-2",children:[e.jsxs(b,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>A.visit(`/system-units/view/${s.unit_path}`),children:[e.jsx(M,{className:"h-4 w-4"})," ","View"]}),e.jsxs(b,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>{S(s),setShowModal(!0)},children:[e.jsx(E,{className:"h-4 w-4"})," ","Edit"]})]}),e.jsx("div",{className:"sm:hidden flex justify-center",children:e.jsxs(_,{as:"div",className:"relative inline-block text-left",children:[e.jsx(_.Button,{className:"p-2 rounded bg-[hsl(142,34%,51%)] text-white",children:e.jsx(he,{className:"h-5 w-5"})}),e.jsx(_.Items,{className:"absolute right-0 mt-2 w-28 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50",children:e.jsxs("div",{className:"px-1 py-1",children:[e.jsx(_.Item,{children:({active:r})=>e.jsxs("button",{className:`${r?"bg-[hsl(142,34%,90%)]":""} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`,onClick:()=>A.visit(`/system-units/view/${s.unit_path}`),children:[e.jsx(M,{className:"h-4 w-4 mr-2"})," ","View"]})}),e.jsx(_.Item,{children:({active:r})=>e.jsxs("button",{className:`${r?"bg-[hsl(142,34%,90%)]":""} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`,onClick:()=>{S(s),setShowModal(!0)},children:[e.jsx(E,{className:"h-4 w-4 mr-2"})," ","Edit"]})})]})})]})})]})]},s.id)):e.jsx(U,{children:e.jsx(v,{colSpan:5,className:"text-center py-4",children:"No matching units found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Showing"," ",C.length===0?0:(n-1)*i+1," ","–",Math.min(n*i,C.length)," ","of ",C.length," System Units"]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(b,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>d(s=>s-1),children:"Previous"}),Array.from({length:R},(s,l)=>l+1).filter(s=>s===1||s===R?!0:s>=n-2&&s<=n+2).map((s,l,r)=>e.jsxs(W.Fragment,{children:[l>0&&r[l]-r[l-1]>1&&e.jsx("span",{className:"px-1",children:"..."}),e.jsx(b,{size:"sm",variant:n===s?"default":"outline",onClick:()=>d(s),children:s})]},s)),e.jsx(b,{size:"sm",variant:"outline",disabled:n===R,onClick:()=>d(s=>s+1),children:"Next"})]})]}),x&&e.jsx(Q,{unit:x,rooms:m,onClose:()=>S(null),onSuccess:t})]})]})]})}export{rs as default};
