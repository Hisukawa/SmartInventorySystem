import{r as o,j as e,t as V,a as B}from"./app-ClqnBpCl.js";import{B as j}from"./button-BYLCZaRq.js";import{C as re,a as oe}from"./card-BhF5qgRi.js";import{S as ne,a as ie,b as ce,c as de}from"./avatar-B482w7hh.js";import"./sweetalert2.esm.all-BQIkj5Wb.js";import{N as he}from"./Notification-D-s7Eql5.js";import{L as I}from"./label-w-IWoGkD.js";import{D as U,a as G,b as K,c as W}from"./dialog-BOSH4QLZ.js";import{T as pe,a as me,b as O,c,d as xe,e as r}from"./table-9ZeNlaCN.js";import{B as ue,a as je,b as be,c as X,d as ge}from"./breadcrumb-oFp3h1EG.js";import{A as fe}from"./app-sidebar-Dimig0NI.js";import{I as J}from"./input-DfVEgHrf.js";import{P as ve,a as ye,b as Ne}from"./popover-DmqnwFfM.js";import{S as N,a as R,b as w,c as S,d as n}from"./select-BW_4OYNP.js";import{P as Re}from"./printer-DwHuXJtz.js";import{C as Q}from"./circle-check-BRyMeU5K.js";import{F as we}from"./funnel-BHvkadD4.js";import{X as Y}from"./index-P8x8rhpB.js";import"./index-CajooHda.js";import"./utils-CBfrqCZ4.js";import"./index-BkpthNKA.js";import"./index-DOOtmeDN.js";import"./dropdown-menu-BP3elfpn.js";import"./index-C7BTKfCZ.js";import"./createLucideIcon-BT26mXyT.js";import"./chevron-right-DY2317w3.js";import"./index-DZHswMUi.js";import"./index-DtToyKaB.js";import"./bell-BKRfxiUU.js";import"./house-BwJ04067.js";import"./user-DLJyA5D4.js";import"./log-out-DKTjI1yg.js";import"./keyboard-B4oIIEqw.js";import"./boxes-DhCY7OSs.js";import"./users-CpH-rXg-.js";import"./chevron-down-g-KNE9SF.js";import"./index-DbsxsCik.js";function Se({filters:l,filterOptions:b,onApplyFilters:P,onResetFilters:h}){const[u,p]=o.useState(""),[g,d]=o.useState("");o.useEffect(()=>{l.condition?(p("condition"),d(l.condition)):l.room?(p("room"),d(l.room)):l.faculty?(p("faculty"),d(l.faculty)):l.reportable_type?(p("reportable_type"),d(l.reportable_type)):(p(""),d(""))},[l]);const v=s=>{const m=s==="all"?"":s;d(m);let f={...l};u&&(f[u]=m),P(f)},_=()=>{p(""),d(""),h()},k=[{value:"condition",label:"Condition"},{value:"room",label:"Room"},{value:"faculty",label:"Faculty"},{value:"reportable_type",label:"Report Type"}];return e.jsxs(ve,{children:[e.jsx(ye,{asChild:!0,children:e.jsxs(j,{className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(we,{className:"h-4 w-4"}),"Filter",(l.condition||l.room||l.faculty||l.reportable_type)&&e.jsx(Y,{className:"h-4 w-4 ml-1 cursor-pointer",onClick:s=>{s.stopPropagation(),s.preventDefault(),_()}})]})}),e.jsxs(Ne,{className:"w-[calc(100vw-2rem)] sm:w-[400px] p-4",children:[e.jsx("h4",{className:"font-medium mb-3 text-lg",children:"Filter Options"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(N,{value:u,onValueChange:s=>{p(s),d("")},children:[e.jsx(R,{className:"w-full",children:e.jsx(w,{placeholder:"Select Field"})}),e.jsx(S,{children:k.map(s=>e.jsx(n,{value:s.value,children:s.label},s.value))})]}),u==="condition"&&e.jsxs(N,{value:g||"all",onValueChange:v,children:[e.jsx(R,{className:"w-full",children:e.jsx(w,{placeholder:"Select Condition"})}),e.jsxs(S,{children:[e.jsx(n,{value:"all",children:"All"}),b.conditions.map((s,m)=>e.jsx(n,{value:s,children:s},m))]})]}),u==="room"&&e.jsxs(N,{value:g||"all",onValueChange:v,children:[e.jsx(R,{className:"w-full",children:e.jsx(w,{placeholder:"Select Room"})}),e.jsxs(S,{children:[e.jsx(n,{value:"all",children:"All"}),Object.entries(b.rooms).map(([s,m])=>e.jsxs(n,{value:s,children:["Room ",m]},s))]})]}),u==="faculty"&&e.jsxs(N,{value:g||"all",onValueChange:v,children:[e.jsx(R,{className:"w-full",children:e.jsx(w,{placeholder:"Select Faculty"})}),e.jsxs(S,{children:[e.jsx(n,{value:"all",children:"All"}),Object.entries(b.faculties).map(([s,m])=>e.jsx(n,{value:s,children:m},s))]})]}),u==="reportable_type"&&e.jsxs(N,{value:g||"all",onValueChange:v,children:[e.jsx(R,{className:"w-full",children:e.jsx(w,{placeholder:"Select Type"})}),e.jsxs(S,{children:[e.jsx(n,{value:"all",children:"All"}),b.reportable_types.map(s=>e.jsx(n,{value:s,children:s},s))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(j,{size:"sm",variant:"outline",onClick:_,className:"w-auto px-3",children:[e.jsx(Y,{className:"mr-1 h-4 w-4"})," Reset"]})})]})]})]})}function ct({reports:l,filters:b={},filterOptions:P}){const[h,u]=o.useState(l),[p,g]=o.useState(b.search||""),[d,v]=o.useState(null),[_,k]=o.useState(!1),s=t=>{v(t),k(!0)},[m,f]=o.useState(!1),[C,z]=o.useState(l),[F,D]=o.useState(""),[E,A]=o.useState(""),[T,Z]=o.useState(!1),ee=t=>{z(t),D(t.condition),A(""),f(!0)},te=t=>{if(!F){V.warning("Select Condition",{description:"Please select a new condition before resolving.",duration:2500});return}Z(!0),B.post(`/admin/faculty-reports/${t.id}/resolve`,{report_id:t.id,old_condition:t.condition,new_condition:F,details:E},{onSuccess:()=>{f(!1),z(null),D(""),A(""),V.success("Resolved!",{description:`Report #${t.id} has been successfully resolved.`,duration:2e3}),u(i=>i.map(a=>a.id===t.id?{...a,resolved:!0,condition:F}:a))},onError:()=>{V.error("Error",{description:"Failed to resolve report. Please try again.",duration:2500})}})},[x,$]=o.useState(1),y=10,L=Math.ceil(h.length/y),q=h.slice((x-1)*y,x*y);function H(t){const i=Object.fromEntries(Object.entries(t).filter(([a,M])=>M!==""&&M!==void 0));B.get(route("admin.reports.index"),{...i,search:p||void 0})}function se(){g(""),B.get(route("admin.reports.index"))}function le(t){t.key==="Enter"&&H(b)}const ae=()=>{if(!h||h.length===0){alert("No reports available to print.");return}const t=window.open("","","width=900,height=700"),i=h.map(a=>`
        <tr>
            <td>${a.id}</td>
            <td>${a.room?.room_number??"N/A"}</td>
            <td>${a.user?.name??"N/A"}</td>
            <td>${a.reportable_type??"N/A"}</td>
            <td>${a.condition??"N/A"}</td>
            <td>${a.remarks??"N/A"}</td>
            <td>${a.created_at?new Date(a.created_at).toLocaleString():"N/A"}</td>
            <td>${a.resolved?"Resolved":"Pending"}</td>
        </tr>
    `).join("");t.document.write(`
        <html>
            <head>
                <title>Faculty Reports</title>
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
                <h2>Faculty Reports</h2>
                <p>Generated on: ${new Date().toLocaleString()}</p>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Room</th>
                            <th>Faculty</th>
                            <th>Report Type</th>
                            <th>Condition</th>
                            <th>Details</th>
                            <th>Date Created</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${i}
                    </tbody>
                </table>
            </body>
        </html>
    `),t.document.close(),t.print()};return e.jsxs(ne,{children:[e.jsx(fe,{}),e.jsxs(ie,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(ce,{}),e.jsx(de,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(ue,{children:e.jsx(je,{children:e.jsxs(be,{children:[e.jsx(X,{href:"#","aria-current":"page",children:"Reports"}),e.jsx(ge,{}),e.jsx(X,{href:"/admin/faculty/reports","aria-current":"page",className:"font-semibold text-foreground",children:"Faculty Reports"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(he,{})]})}),e.jsx("main",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h1",{className:"text-2xl font-bold mb-5",children:"Faculty Reports"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 mb-4",children:[e.jsx(J,{placeholder:"Search reports...",value:p,onChange:t=>g(t.target.value),onKeyDown:le,className:`flex-1 min-w-0 sm:max-w-xs w-full
             border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
             focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
             placeholder:text-[hsl(142,34%,40%)]`}),e.jsx(Se,{filters:b,filterOptions:P,onApplyFilters:H,onResetFilters:se}),e.jsxs(j,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:ae,children:[e.jsx(Re,{className:"h-4 w-4"}),"Print"]})]}),e.jsx(re,{children:e.jsxs(oe,{className:"p-0",children:[e.jsxs(pe,{children:[e.jsx(me,{children:e.jsxs(O,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]",children:[e.jsx(c,{children:"#"}),e.jsx(c,{children:"Faculty"}),e.jsx(c,{children:"Room"}),e.jsx(c,{children:"Reports Type"}),e.jsx(c,{children:"Reports ID"}),e.jsx(c,{children:"Type"}),e.jsx(c,{children:"Code"}),e.jsx(c,{children:"Condition"}),e.jsx(c,{children:"Remarks"}),e.jsx(c,{children:"Photo"}),e.jsx(c,{children:"Date Reported"}),e.jsx(c,{children:"Actions"})]})}),e.jsx(xe,{children:q.length>0?q.map((t,i)=>e.jsxs(O,{children:[e.jsx(r,{children:(x-1)*y+i+1}),e.jsx(r,{children:t.user?.name||"N/A"}),e.jsxs(r,{children:["ROOM"," ",t.room?t.room.room_number:"N/A"]}),e.jsx(r,{children:t.reportable_type}),e.jsx(r,{children:t.reportable_id}),e.jsx(r,{children:t.reportable_type==="peripheral"?t.reportable?.type:t.reportable_type==="system_unit"?"System Unit":t.reportable_type==="equipment"?t.reportable?.equipment_type:"N/A"}),e.jsx(r,{children:t.reportable_type==="peripheral"?t.reportable?.peripheral_code:t.reportable_type==="system_unit"?t.reportable?.unit_code:t.reportable_type==="equipment"?t.reportable?.equipment_code:"N/A"}),e.jsx(r,{children:t.condition}),e.jsx(r,{children:t.remarks}),e.jsx(r,{children:t.photo_url?e.jsx("img",{src:t.photo_url,alt:"Report",className:"w-16 h-16 object-cover rounded cursor-pointer hover:shadow-lg",onClick:()=>s(t.photo_url)}):"No photo"}),e.jsx(r,{children:new Date(t.created_at).toLocaleDateString()}),e.jsx(r,{children:e.jsx("div",{className:"flex gap-2",children:t.resolved?e.jsxs("span",{className:"text-sm font-medium text-green-600 flex items-center gap-1",children:[e.jsx(Q,{className:"w-4 h-4"}),"Resolved"]}):e.jsxs(j,{size:"sm",variant:"secondary",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>ee(t),children:[e.jsx(Q,{className:"w-4 h-4"}),"Resolve"]})})})]},t.id)):e.jsx(O,{children:e.jsx(r,{colSpan:"11",className:"text-center",children:"No reports found."})})})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center mt-4 p-2 gap-2",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Showing"," ",h.length===0?0:(x-1)*y+1," ","–",Math.min(x*y,h.length)," ","of ",h.length," reports"]}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx(j,{variant:"outline",size:"sm",disabled:x===1,onClick:()=>$(x-1),children:"Previous"}),[...Array(L)].map((t,i)=>e.jsx(j,{variant:x===i+1?"default":"outline",size:"sm",onClick:()=>$(i+1),children:i+1},i)),e.jsx(j,{variant:"outline",size:"sm",disabled:x===L,onClick:()=>$(x+1),children:"Next"})]})]})]})})]})}),e.jsx(U,{open:_,onOpenChange:k,children:e.jsxs(G,{className:"flex flex-col items-center",children:[e.jsx(K,{children:e.jsx(W,{children:"Report Photo"})}),d&&e.jsx("img",{src:d,alt:"Report",className:"max-w-full max-h-[80vh] object-contain rounded"})]})}),e.jsx(U,{open:m,onOpenChange:f,children:e.jsxs(G,{className:"max-w-md w-full",children:[e.jsx(K,{children:e.jsxs(W,{children:["Resolve Report #",C?.id]})}),e.jsxs("div",{className:"flex flex-col gap-4 mt-2",children:[C?.remarks&&e.jsxs("div",{children:[e.jsx(I,{className:"text-gray-600",children:"Remarks"}),e.jsx("div",{className:"border rounded-md p-2 text-sm bg-gray-50",children:C.remarks})]}),e.jsxs("div",{children:[e.jsx(I,{children:"Condition"}),e.jsxs(N,{value:F||C?.condition,onValueChange:D,children:[e.jsx(R,{children:e.jsx(w,{placeholder:"Select Condition"})}),e.jsxs(S,{children:[e.jsx(n,{value:"Functional",children:"Functional"}),e.jsx(n,{value:"Needs Repair",children:"Needs Repair"}),e.jsx(n,{value:"Replaced",children:"Replaced"}),e.jsx(n,{value:"Not Repairable",children:"Not Repairable"})]})]})]}),e.jsxs("div",{children:[e.jsx(I,{children:"Resolution Details"}),e.jsx(J,{type:"text",placeholder:"Describe how you fixed it...",value:E,onChange:t=>A(t.target.value)})]}),e.jsxs("div",{className:"flex justify-end gap-2 mt-2",children:[e.jsx(j,{variant:"outline",onClick:()=>f(!1),disabled:T,children:"Cancel"}),e.jsx(j,{onClick:()=>te(C),variant:"secondary",disabled:T,children:T?"Saving...":"Save"})]})]})]})})]})]})}export{ct as default};
