import{r as f,u as I,j as e,a as A,R as L}from"./app-tqM93StK.js";import{B as g}from"./button-C0qV_Wus.js";import{A as D}from"./app-sidebar-DFvY8KQB.js";import{S as O,a as G,b as q,c as H}from"./avatar-DEkoVGqY.js";import K from"./EditUnitModal-CpSU5pv2.js";import{S as W}from"./sweetalert2.esm.all-BQIkj5Wb.js";import{I as X}from"./input-Bt8g_NKn.js";import{N as J}from"./Notification-a7dB8cBZ.js";import{T as Q,a as Y,b as _,c as C,d as Z,e as v}from"./table-OuEmgst2.js";import"./index-DXBw7LX5.js";import{B as ee,a as se,b as le,c as $,d as te}from"./breadcrumb-t7_p_k3s.js";import{P as ae,a as re,b as oe}from"./popover-BtvrqoP-.js";import{S as p,a as u,b as j,c as b,d as o}from"./select-CIbonJim.js";import{P as ne}from"./printer-BsfbEKdC.js";import{E as ce}from"./eye-DIlIab3k.js";import{P as ie}from"./pen-OIjUhJvy.js";import{F as de}from"./funnel-BKp5pW71.js";import{X as M}from"./index-QzqoPUuY.js";import"./index-D8oBep_r.js";import"./utils-CBfrqCZ4.js";import"./dropdown-menu-B44_VRFb.js";import"./createLucideIcon-xU8v4Hxv.js";import"./index-34bW-pWL.js";import"./index-CjxWiOdI.js";import"./index-D3j-QZnS.js";import"./chevron-right-CgN_nTOj.js";import"./sparkles-CKKleuDc.js";import"./bell-CNa3Zia9.js";import"./keyboard-CLCviZvM.js";import"./boxes-BIx6e_GR.js";import"./users-CejuCGPm.js";import"./user-CaiDw9fZ.js";import"./chevron-down-3UOoRkJ3.js";import"./index-D_frVUzV.js";import"./index-BFnCgX5j.js";import"./dialog-CLpO3Ymn.js";import"./label-BldxXZlU.js";import"./index-2ow27Y0h.js";const me=[{label:"Functional",color:"bg-green-500"},{label:"Defective",color:"bg-red-500"},{label:"Under Maintenance",color:"bg-yellow-500"},{label:"Needs Upgrade",color:"bg-blue-500"},{label:"For Disposal",color:"bg-gray-500"}];function he({filters:a={},filterOptions:m,onApplyFilters:S,onReset:N}){const[i,n]=f.useState(""),[d,x]=f.useState("");f.useEffect(()=>{const h=["unit_code","room_id","processor","ram","storage","gpu","motherboard","condition"].find(w=>!!a[w]);h?(n(h),x(String(a[h]))):(n(""),x(""))},[a]);const P=[{value:"unit_code",label:"Unit Code"},{value:"room_id",label:"Room"},{value:"processor",label:"Processor"},{value:"ram",label:"RAM"},{value:"storage",label:"Storage"},{value:"gpu",label:"GPU"},{value:"motherboard",label:"Motherboard"},{value:"condition",label:"Condition"}];function c(l){const h=l==="all"?"":l;x(h);const w={...a};i&&(w[i]=h),S(w)}const R=!!a.unit_code||!!a.room_id||!!a.processor||!!a.ram||!!a.storage||!!a.gpu||!!a.motherboard||!!a.condition;return e.jsxs(ae,{children:[e.jsx(re,{asChild:!0,children:e.jsxs(g,{className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(de,{className:"h-4 w-4"}),"Filter",R&&e.jsx(M,{className:"h-4 w-4 ml-1 cursor-pointer",onClick:l=>{l.stopPropagation(),n(""),x(""),N()}})]})}),e.jsxs(oe,{className:"w-[calc(100vw-2rem)] sm:w-[380px] p-4",children:[e.jsx("h4",{className:"font-medium mb-3 text-lg",children:"Filter Options"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(p,{value:i,onValueChange:l=>{n(l),x("")},children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Field"})}),e.jsx(b,{children:P.map(l=>e.jsx(o,{value:l.value,children:l.label},l.value))})]}),i==="unit_code"&&e.jsxs(p,{value:d||"all",onValueChange:c,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Unit Code"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.unit_codes.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="room_id"&&e.jsxs(p,{value:d||"all",onValueChange:c,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Room"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),Object.entries(m.rooms).map(([l,h])=>e.jsxs(o,{value:l,children:["Room ",h]},l))]})]}),i==="processor"&&e.jsxs(p,{value:d||"all",onValueChange:c,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Processor"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.processors.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="ram"&&e.jsxs(p,{value:d||"all",onValueChange:c,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select RAM"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.rams.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="storage"&&e.jsxs(p,{value:d||"all",onValueChange:c,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Storage"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.storages.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="gpu"&&e.jsxs(p,{value:d||"all",onValueChange:c,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select GPU"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.gpus.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="motherboard"&&e.jsxs(p,{value:d||"all",onValueChange:c,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Motherboard"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.motherboards.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),i==="condition"&&e.jsxs(p,{value:d||"all",onValueChange:c,children:[e.jsx(u,{className:"w-full",children:e.jsx(j,{placeholder:"Select Condition"})}),e.jsxs(b,{children:[e.jsx(o,{value:"all",children:"All"}),m.conditions.map(l=>e.jsx(o,{value:l,children:l},l))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(g,{size:"sm",variant:"outline",onClick:()=>{n(""),x(""),N()},children:[e.jsx(M,{className:"mr-1 h-4 w-4"})," Reset"]})})]})]})]})}function Qe({units:a,rooms:m,filters:S={}}){const[N,i]=f.useState(S.search||""),[n,d]=f.useState(1),[x,P]=f.useState(null),c=10,{delete:R}=I(),l=()=>{W.fire({icon:"success",title:"Updated!",text:"The system unit has been updated successfully."})},h=f.useMemo(()=>{const s=t=>[...new Set(t.filter(r=>r!==null&&r!==""))].sort();return{rooms:Object.fromEntries(m.map(t=>[String(t.id),t.room_number])),unit_codes:s(a.map(t=>t.unit_code)),processors:s(a.map(t=>t.processor)),rams:s(a.map(t=>t.ram)),storages:s(a.map(t=>t.storage)),gpus:s(a.map(t=>t.gpu)),motherboards:s(a.map(t=>t.motherboard)),conditions:s(a.map(t=>t.condition))}},[a,m]);function w(s){const t=Object.fromEntries(Object.entries({...s,search:N||void 0}).filter(([,r])=>r!==""&&r!==void 0));A.get(route("system-units.index"),t,{preserveState:!0,replace:!0})}function V(){i(""),A.get(route("system-units.index"),{},{preserveState:!0,replace:!0})}function T(s){s.key==="Enter"&&w(S)}const y=f.useMemo(()=>{if(!N)return a;const s=N.toLowerCase();return a.filter(t=>{const r=t.unit_code?.toLowerCase()||"",B=t.room?.room_number?.toLowerCase()||"";return r.includes(s)||B.includes(s)})},[a,N]),U=Math.ceil(y.length/c)||1,k=y.slice((n-1)*c,n*c),F=s=>me.find(r=>r.label.toLowerCase()===(s||"").toLowerCase())||{label:s||"Unknown",color:"bg-slate-400"},E=f.useRef(null),z=()=>{if(!a||a.length===0){alert("No data available to print.");return}const s=window.open("","","width=900,height=700"),t=a.map(r=>`
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
    `),s.document.close(),s.print()};return e.jsxs(O,{children:[e.jsx(D,{}),e.jsxs(G,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(q,{}),e.jsx(H,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(ee,{children:e.jsx(se,{children:e.jsxs(le,{children:[e.jsx($,{href:"#","aria-current":"page",children:"Assets"}),e.jsx(te,{}),e.jsx($,{href:"/admin/system-units","aria-current":"page",className:"font-semibold text-foreground",children:"System Unit Lists"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(J,{})]})}),e.jsxs("main",{className:"w-full px-6 py-4",children:[e.jsx("h1",{className:"text-2xl font-semibold mb-4",children:"System Units"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(he,{filters:S,filterOptions:h,onApplyFilters:w,onReset:V}),e.jsxs(g,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:z,children:[e.jsx(ne,{className:"h-4 w-4"}),"Print"]}),e.jsx(X,{placeholder:"Search Unit Code or Room",value:N,onChange:s=>{const t=s.target.value;i(t),d(1)},onKeyDown:T,className:`flex-1 min-w-0 sm:max-w-xs w-full
                                border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
                                focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
                                placeholder:text-[hsl(142,34%,40%)]`})]}),e.jsx(g,{className:"bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>A.visit(route("admin.system-units.create")),children:"Add New Unit"})]}),e.jsx("div",{className:"overflow-x-auto rounded-lg shadow-lg",children:e.jsxs(Q,{ref:E,className:"w-full bg-white table-fixed",children:[e.jsx(Y,{children:e.jsxs(_,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10",children:[e.jsx(C,{className:"px-5 py-1",children:"#"}),e.jsx(C,{className:"px-5 py-1",children:"PC Code"}),e.jsx(C,{className:"px-5 py-1",children:"Room"}),e.jsx(C,{className:"px-5 py-1",children:"Condition"}),e.jsx(C,{className:"px-5 py-1",children:"Action"})]})}),e.jsx(Z,{children:k.length>0?k.map((s,t)=>e.jsxs(_,{className:"hover:shadow-sm",children:[e.jsx(v,{className:"px-5 py-1",children:(n-1)*c+t+1}),e.jsx(v,{className:"px-5 py-1",children:s.unit_code}),e.jsxs(v,{className:"px-5 py-1",children:["ROOM"," ",s.room?.room_number||"N/A"]}),e.jsx(v,{className:"px-5 py-1",children:s.condition?e.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-medium text-white ${F(s.condition).color}`,children:F(s.condition).label}):"N/A"}),e.jsx(v,{children:e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(g,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>A.visit(`/system-units/view/${s.unit_code}`),children:[e.jsx(ce,{className:"h-4 w-4"}),"View"]}),e.jsxs(g,{size:"sm",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>{P(s),setShowModal(!0)},children:[e.jsx(ie,{className:"h-4 w-4"}),"Edit"]})]})})]},s.id)):e.jsx(_,{children:e.jsx(v,{colSpan:5,className:"text-center py-4",children:"No matching units found."})})})]})}),e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Showing"," ",y.length===0?0:(n-1)*c+1," ","–",Math.min(n*c,y.length)," ","of ",y.length," System Units"]}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(g,{size:"sm",variant:"outline",disabled:n===1,onClick:()=>d(s=>s-1),children:"Previous"}),Array.from({length:U},(s,t)=>t+1).filter(s=>s===1||s===U?!0:s>=n-2&&s<=n+2).map((s,t,r)=>e.jsxs(L.Fragment,{children:[t>0&&r[t]-r[t-1]>1&&e.jsx("span",{className:"px-1",children:"..."}),e.jsx(g,{size:"sm",variant:n===s?"default":"outline",onClick:()=>d(s),children:s})]},s)),e.jsx(g,{size:"sm",variant:"outline",disabled:n===U,onClick:()=>d(s=>s+1),children:"Next"})]})]}),x&&e.jsx(K,{unit:x,rooms:m,onClose:()=>P(null),onSuccess:l})]})]})]})}export{Qe as default};
