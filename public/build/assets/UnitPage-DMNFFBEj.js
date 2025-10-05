import{r as f,u as B,j as e,a as A,R as I}from"./app-T7ShhzOW.js";import{B as g}from"./button-B99-mW68.js";import{A as L}from"./app-sidebar-D-fHolM3.js";import{S as D,a as O,b as G,c as q}from"./avatar-DvwQfjSt.js";import H from"./EditUnitModal-D8pArTRS.js";import{S as K}from"./sweetalert2.esm.all-BQIkj5Wb.js";import{I as W}from"./input-BlB4byOi.js";import{N as X}from"./Notification-BEUTMwJ7.js";import{T as J,a as Q,b as _,c as y,d as Y,e as v}from"./table-BA-Clbh0.js";import"./index-D5ePQjld.js";import{B as Z,a as ee,b as se,c as $,d as le}from"./breadcrumb-r1fRjj5O.js";import{P as te,a as ae,b as re}from"./popover-CM-u2O5j.js";import{S as p,a as u,b as j,c as b,d as o}from"./select-Bgw6tv1G.js";import{P as oe}from"./printer-V9GPXviX.js";import{E as ne}from"./eye-Brq-fWrw.js";import{P as ce}from"./pen-gEYql8Xk.js";import{F as ie}from"./funnel-C3LH1azf.js";import{X as V}from"./index-BlaDKpEl.js";import"./index-DesnNrz7.js";import"./index-Cskt0Npq.js";import"./utils-Bw_DC8MB.js";import"./dropdown-menu-pC45h964.js";import"./index-B94qiQOH.js";import"./index-DkwFQneN.js";import"./chevron-right-CHW-4A2S.js";import"./sparkles-BhqIdFJ3.js";import"./bell-23f0DytG.js";import"./keyboard-DtQd2nQP.js";import"./boxes-DuQ-4ZGI.js";import"./users-DnZTYGAi.js";import"./chevron-down-DB74PhPT.js";import"./index-BBVJepaE.js";import"./index-BFzquDN-.js";import"./dialog-BviqGQK1.js";import"./label-aRlrJUXz.js";import"./index-BJRCs9fl.js";const de=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Under Maintenance",color:"bg-yellow-500"},{label:"Needs Upgrade",color:"bg-blue-500"},{label:"For Disposal",color:"bg-gray-500"}];function me({filters:a={},filterOptions:m,onApplyFilters:S,onReset:N}){const[c,n]=f.useState(""),[i,x]=f.useState("");f.useEffect(()=>{const h=["unit_code","room_id","processor","ram","storage","gpu","motherboard","condition"].find(w=>!!a[w]);h?(n(h),x(String(a[h]))):(n(""),x(""))},[a]);const C=[{value:"unit_code",label:"Unit Code"},{value:"room_id",label:"Room"},{value:"processor",label:"Processor"},{value:"ram",label:"RAM"},{value:"storage",label:"Storage"},{value:"gpu",label:"GPU"},{value:"motherboard",label:"Motherboard"},{value:"condition",label:"Condition"}];function d(l){const h=l==="all"?"":l;x(h);const w={...a};c&&(w[c]=h),S(w)}const U=!!a.unit_code||!!a.room_id||!!a.processor||!!a.ram||!!a.storage||!!a.gpu||!!a.motherboard||!!a.condition;return e.jsxs(te,{children:[e.jsx(ae,{asChild:!0,children:e.jsxs(g,{className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(ie,{className:"h-4 w-4"}),"Filter",U&&e.jsx(V,{className:"h-4 w-4 ml-1 cursor-pointer",onClick:l=>{l.stopPropagation(),n(""),x(""),N()}})]})}),e.jsxs(re,{className:"w-[calc(100vw-2rem)] sm:w-[380px] p-4",children:[e.jsx("h4",{className:"font-medium mb-3 text-lg",children:"Filter Options"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(p,{value:c,onValueChange:l=>{n(l),x("")},children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Field"})}),e.jsx(b,{children:C.map(l=>e.jsx(o,{value:l.value,children:l.label},l.value))})]}),c==="unit_code"&&e.jsxs(p,{value:i||"all",onValueChange:d,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Unit Code"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.unit_codes.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="room_id"&&e.jsxs(p,{value:i||"all",onValueChange:d,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Room"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),Object.entries(m.rooms).map(([l,h])=>e.jsxs(o,{value:l,children:["Room ",h]},l))]})]}),c==="processor"&&e.jsxs(p,{value:i||"all",onValueChange:d,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Processor"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.processors.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="ram"&&e.jsxs(p,{value:i||"all",onValueChange:d,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select RAM"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.rams.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="storage"&&e.jsxs(p,{value:i||"all",onValueChange:d,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Storage"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.storages.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="gpu"&&e.jsxs(p,{value:i||"all",onValueChange:d,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select GPU"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.gpus.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="motherboard"&&e.jsxs(p,{value:i||"all",onValueChange:d,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Motherboard"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.motherboards.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),c==="condition"&&e.jsxs(p,{value:i||"all",onValueChange:d,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Condition"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.conditions.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(g,{size:"sm",variant:"outline",onClick:()=>{n(""),x(""),N()},children:[e.jsx(V,{className:"mr-1 h-4 w-4"})," Reset"]})})]})]})]})}function We({units:a,rooms:m,filters:S={}}){const[N,c]=f.useState(S.search||""),[n,i]=f.useState(1),[x,C]=f.useState(null),d=10;B();const U=()=>{K.fire({icon:"success",title:"Updated!",text:"The system unit has been updated successfully."})},l=f.useMemo(()=>{const s=t=>[...new Set(t.filter(r=>r!==null&&r!==""))].sort();return{rooms:Object.fromEntries(m.map(t=>[String(t.id),t.room_number])),unit_codes:s(a.map(t=>t.unit_code)),processors:s(a.map(t=>t.processor)),rams:s(a.map(t=>t.ram)),storages:s(a.map(t=>t.storage)),gpus:s(a.map(t=>t.gpu)),motherboards:s(a.map(t=>t.motherboard)),conditions:s(a.map(t=>t.condition))}},[a,m]);function h(s){const t=Object.fromEntries(Object.entries({...s,search:N||void 0}).filter(([,r])=>r!==""&&r!==void 0));A.get(route("system-units.index"),t,{preserveState:!0,replace:!0})}function w(){c(""),A.get(route("system-units.index"),{},{preserveState:!0,replace:!0})}function M(s){s.key==="Enter"&&h(S)}const R=f.useMemo(()=>{if(!N)return a;const s=N.toLowerCase();return a.filter(t=>{const r=t.unit_code?.toLowerCase()||"",z=t.room?.room_number?.toLowerCase()||"";return r.includes(s)||z.includes(s)})},[a,N]),P=Math.ceil(R.length/d)||1,k=R.slice((n-1)*d,n*d),F=s=>de.find(r=>r.label.toLowerCase()===(s||"").toLowerCase())||{label:s||"Unknown",color:"bg-slate-400"},T=f.useRef(null),E=()=>{if(!a||a.length===0){alert("No data available to print.");return}const s=window.open("","","width=900,height=700"),t=a.map(r=>`
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
    `),s.document.close(),s.print()};return e.jsxs(D,{children:[e.jsx(L,{}),e.jsxs(O,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(G,{}),e.jsx(q,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(Z,{children:e.jsx(ee,{children:e.jsxs(se,{children:[e.jsx($,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(le,{}),e.jsx($,{href:"/admin/system-units","aria-current":"page",className:"font-semibold text-foreground",children:"System Unit Lists"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(X,{})]})}),e.jsxs("main",{className:"w-full px-6 py-4",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"System Units"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(me,{filters:S,filterOptions:l,onApplyFilters:h,onReset:w}),e.jsxs(g,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:E,children:[e.jsx(oe,{className:"h-4 w-4"}),"Print"]}),e.jsx(W,{placeholder:"Search Unit Code or Room",value:N,onChange:s=>{const t=s.target.value;c(t),i(1)},onKeyDown:M,className:`flex-1 min-w-0 sm:max-w-xs w-full 
                                border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)] 
                                focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)] 
                                placeholder:text-[hsl(142,34%,40%)]`})]}),e.jsx(g,{className:"bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>A.visit(route("admin.system-units.create")),children:"Add New Unit"})]}),e.jsx("div",{className:"overflow-x-auto rounded-lg shadow-lg",children:e.jsxs(J,{ref:T,className:"w-full bg-white table-fixed",children:[e.jsx(Q,{children:e.jsxs(_,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(y,{className:"px-5 py-1",children:"#"}),e.jsx(y,{className:"px-5 py-1",children:"PC Code"}),e.jsx(y,{className:"px-5 py-1",children:"Room"}),e.jsx(y,{className:"px-5 py-1",children:"Condition"}),e.jsx(y,{className:"px-5 py-1",children:"Action"})]})}),e.jsx(Y,{children:k.length>0?k.map((s,t)=>e.jsxs(_,{className:"hover:shadow-sm",children:[e.jsx(v,{className:"px-5 py-1",children:(n-1)*d+t+1}),e.jsx(v,{className:"px-5 py-1",children:s.unit_code}),e.jsxs(v,{className:"px-5 py-1",children:["ROOM"," ",s.room?.room_number||"N/A"]}),e.jsx(v,{className:"px-5 py-1",children:s.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${F(s.condition).color}`,children:F(s.condition).label}):"N/A"}),e.jsx(v,{children:e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(g,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>A.visit(`/system-units/view/${s.unit_code}`),children:[e.jsx(ne,{className:"h-4 w-4"}),"View"]}),e.jsxs(g,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>{C(s),setShowModal(!0)},children:[e.jsx(ce,{className:"h-4 w-4"}),"Edit"]})]})})]},s.id)):e.jsx(_,{children:e.jsx(v,{colSpan:5,className:"text-center py-4",children:"No matching units found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Page ",n," of ",P]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(g,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>i(s=>s-1),children:"Previous"}),Array.from({length:P},(s,t)=>t+1).filter(s=>s===1||s===P?!0:s>=n-2&&s<=n+2).map((s,t,r)=>e.jsxs(I.Fragment,{children:[t>0&&r[t]-r[t-1]>1&&e.jsx("span",{className:"px-1",children:"..."}),e.jsx(g,{size:"sm",variant:n===s?"default":"outline",onClick:()=>i(s),children:s})]},s)),e.jsx(g,{size:"sm",variant:"outline",disabled:n===P,onClick:()=>i(s=>s+1),children:"Next"})]})]}),x&&e.jsx(H,{unit:x,rooms:m,onClose:()=>C(null),onSuccess:U})]})]})]})}export{We as default};
