import{r as n,j as e,t as O,a as q}from"./app-BIwlyt8C.js";import{B as j}from"./button-Cvjh1GZ1.js";import{C as ie,a as ce}from"./card-C0RzOCM5.js";import{S as de,a as pe,b as he,c as me}from"./avatar-C4XO60we.js";import"./sweetalert2.esm.all-BQIkj5Wb.js";import{N as xe}from"./Notification-DKVJWeTh.js";import{L as B}from"./label-Cd8jull_.js";import{D as W,a as H,b as Y,c as G}from"./dialog-C_6Sayg6.js";import{T as ue,a as be,b as V,c as x,d as je,e as c}from"./table-DwQ2yeli.js";import{B as ge,a as fe,b as Ne,c as K,d as ye}from"./breadcrumb-Dq-G1BxX.js";import{A as ve}from"./app-sidebar-D3sVUVD4.js";import{I as Q}from"./input-DuJpVvIv.js";import{P as Ce,a as _e,b as Re}from"./popover-uK11uE3a.js";import{S as C,a as _,b as R,c as S,d as u}from"./select-Cn-9VPP9.js";import{P as Se}from"./printer-CX5p0_fq.js";import{C as X}from"./circle-check-BiV3PAqX.js";import{F as we}from"./funnel-CTLZA15S.js";import{X as J}from"./index-DeiY3fR0.js";import"./index-CIhkfTGN.js";import"./utils-CBfrqCZ4.js";import"./index-_GrsYgzc.js";import"./index-CROv15xz.js";import"./dropdown-menu-COXCHGXD.js";import"./index-PtQ2pING.js";import"./createLucideIcon-B8B2iXso.js";import"./chevron-right-CPQRjjEL.js";import"./index-ZmtpnWyZ.js";import"./index-CC1TizNa.js";import"./bell-FiFxLgBB.js";import"./house-Ch_sl3RI.js";import"./user-B5GN24-g.js";import"./log-out-BsUZLdLy.js";import"./keyboard-DMtpdZmG.js";import"./boxes-CK2rTsmI.js";import"./users-CNhX2TRz.js";import"./chevron-down-CBOqi84k.js";import"./index-CXcRdS9j.js";function ke({filters:r,filterOptions:g,onApplyFilters:P,onResetFilters:d}){const[b,p]=n.useState(""),[f,i]=n.useState("");n.useEffect(()=>{r.condition?(p("condition"),i(r.condition)):r.room?(p("room"),i(r.room)):r.faculty?(p("faculty"),i(r.faculty)):r.reportable_type?(p("reportable_type"),i(r.reportable_type)):(p(""),i(""))},[r]);const y=l=>{const h=l==="all"?"":l;i(h);let N={...r};b&&(N[b]=h),P(N)},w=()=>{p(""),i(""),d()},k=[{value:"condition",label:"Condition"},{value:"room",label:"Room"},{value:"faculty",label:"Faculty"},{value:"reportable_type",label:"Report Type"}];return e.jsxs(Ce,{children:[e.jsx(_e,{asChild:!0,children:e.jsxs(j,{className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",children:[e.jsx(we,{className:"h-4 w-4"}),"Filter",(r.condition||r.room||r.faculty||r.reportable_type)&&e.jsx(J,{className:"h-4 w-4 ml-1 cursor-pointer",onClick:l=>{l.stopPropagation(),l.preventDefault(),w()}})]})}),e.jsxs(Re,{className:"w-[calc(100vw-2rem)] sm:w-[400px] p-4",children:[e.jsx("h4",{className:"font-medium mb-3 text-lg",children:"Filter Options"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs(C,{value:b,onValueChange:l=>{p(l),i("")},children:[e.jsx(_,{className:"w-full",children:e.jsx(R,{placeholder:"Select Field"})}),e.jsx(S,{children:k.map(l=>e.jsx(u,{value:l.value,children:l.label},l.value))})]}),b==="condition"&&e.jsxs(C,{value:f||"all",onValueChange:y,children:[e.jsx(_,{className:"w-full",children:e.jsx(R,{placeholder:"Select Condition"})}),e.jsxs(S,{children:[e.jsx(u,{value:"all",children:"All"}),g.conditions.map((l,h)=>e.jsx(u,{value:l,children:l},h))]})]}),b==="room"&&e.jsxs(C,{value:f||"all",onValueChange:y,children:[e.jsx(_,{className:"w-full",children:e.jsx(R,{placeholder:"Select Room"})}),e.jsxs(S,{children:[e.jsx(u,{value:"all",children:"All"}),Object.entries(g.rooms).map(([l,h])=>e.jsxs(u,{value:l,children:["Room ",h]},l))]})]}),b==="faculty"&&e.jsxs(C,{value:f||"all",onValueChange:y,children:[e.jsx(_,{className:"w-full",children:e.jsx(R,{placeholder:"Select Faculty"})}),e.jsxs(S,{children:[e.jsx(u,{value:"all",children:"All"}),Object.entries(g.faculties).map(([l,h])=>e.jsx(u,{value:l,children:h},l))]})]}),b==="reportable_type"&&e.jsxs(C,{value:f||"all",onValueChange:y,children:[e.jsx(_,{className:"w-full",children:e.jsx(R,{placeholder:"Select Type"})}),e.jsxs(S,{children:[e.jsx(u,{value:"all",children:"All"}),g.reportable_types.map(l=>e.jsx(u,{value:l,children:l},l))]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsxs(j,{size:"sm",variant:"outline",onClick:w,className:"w-auto px-3",children:[e.jsx(J,{className:"mr-1 h-4 w-4"})," Reset"]})})]})]})]})}function ht({reports:r,filters:g={},filterOptions:P}){const[d,b]=n.useState(r),[p,f]=n.useState(g.search||""),[i,y]=n.useState(null),[w,k]=n.useState(!1),l=t=>{y(t),k(!0)},[h,N]=n.useState(!1),[a,$]=n.useState(r),[A,D]=n.useState(""),[L,T]=n.useState(""),[I,Z]=n.useState(!1),ee=t=>{$(t),D(t.condition),T(""),N(!0)},te=t=>{if(!A){O.warning("Select Condition",{description:"Please select a new condition before resolving.",duration:2500});return}Z(!0),q.post(`/admin/faculty-reports/${t.id}/resolve`,{report_id:t.id,old_condition:t.condition,new_condition:A,details:L},{onSuccess:()=>{N(!1),$(null),D(""),T(""),O.success("Resolved!",{description:`Report #${t.id} has been successfully resolved.`,duration:2e3}),b(o=>o.map(s=>s.id===t.id?{...s,resolved:!0,condition:A}:s))},onError:()=>{O.error("Error",{description:"Failed to resolve report. Please try again.",duration:2500})}})},[m,E]=n.useState(1),v=10,z=Math.ceil(d.length/v),U=d.slice((m-1)*v,m*v);function M(t){const o=Object.fromEntries(Object.entries(t).filter(([s,F])=>F!==""&&F!==void 0));q.get(route("admin.reports.index"),{...o,search:p||void 0})}function se(){f(""),q.get(route("admin.reports.index"))}function le(t){t.key==="Enter"&&M(g)}const ae=()=>{if(!d||d.length===0){alert("No reports available to generate.");return}const t=window.open("","","width=1000,height=700"),o=d.map(s=>{const F=s.reportable_type==="peripheral"?s.reportable?.type??"Peripheral":s.reportable_type==="system_unit"?"System Unit":s.reportable_type==="equipment"?s.reportable?.type||s.reportable?.equipment_type||"Equipment":"N/A",oe=s.reportable_type==="peripheral"?s.reportable?.peripheral_code??"N/A":s.reportable_type==="system_unit"?s.reportable?.unit_code??"N/A":s.reportable_type==="equipment"?s.reportable?.equipment_code??"N/A":"N/A",ne=s.reportable_type==="system_unit"||s.reportable_type==="peripheral"?s.reportable?.serial_number??"N/A":"—";return`
            <tr>
                <td>${s.user?.name??"N/A"}</td>
                <td>ROOM ${s.room?.room_number??"N/A"}</td>
                <td>${F}</td>
                <td>${oe}</td>
                <td>${ne}</td>
                <td>${s.condition??"N/A"}</td>
                <td>${s.remarks??"—"}</td>
                <td>${s.created_at?new Date(s.created_at).toLocaleDateString():"N/A"}</td>
            </tr>
        `}).join("");t.document.write(`
<html>
<head>
    <title>Faculty Reports</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 25px;
        }

        /* HEADER */
        .header {
            display: flex;
            align-items: center;
            border-bottom: 2px solid #2e7d32;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .logo {
            width: 70px;
            height: 70px;
        }
        .header-text {
            flex: 1;
            text-align: center;
        }
        .header-text h3 {
            margin: 0;
            font-size: 18px;
            font-weight: bold;
        }
        .header-text p {
            margin: 2px 0;
            font-size: 13px;
        }

        h4 {
            text-align: center;
            margin: 15px 0 5px;
        }

        .date {
            text-align: right;
            font-size: 12px;
            color: #555;
            margin-bottom: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid #000;
            padding: 6px;
            font-size: 12px;
        }

        th {
            background-color: #2e7d32;
            color: #fff;
            text-align: center;
        }

        td {
            vertical-align: middle;
        }

        tr:nth-child(even) {
            background-color: #f5f5f5;
        }

        @media print {
            body {
                -webkit-print-color-adjust: exact;
            }
        }
    </style>
</head>

<body>

    <!-- SCHOOL HEADER -->
    <div class="header">
        
        <img src="/logo.png" class="logo" alt="School Logo" />
        <div class="header-text">
        <p>Republic Of The Philippines</p>
            <h3>Isabela State University</h3>
            <p>City of Ilagan, Isabela</p>
        </div>
    </div>

    <h4>FACULTY EQUIPMENT & INVENTORY REPORT</h4>

    <div class="date">
        Generated on: ${new Date().toLocaleString()}
    </div>

    <!-- REPORT TABLE -->
            <table>
            <thead>
            <tr>
                <th>Faculty</th>
                <th>Room</th>
                <th>Type</th>
                <th>Code</th>
                <th>Serial Number</th>
                <th>Condition</th>
                <th>Remarks</th>
                <th>Date Reported</th>
            </tr>
        </thead>

        <tbody>
            ${o}
        </tbody>
    </table>

</body>
</html>
`),t.document.close(),t.print()},re={system_unit:["Working","Not Working","Intermittent Issue","Needs Cleaning","For Replacement","For Disposal","Condemned","Needs Repair","No Signal","Needs Configuration","Under Maintenance","To Be Diagnosed"],peripheral:["Working","Not Working","Intermittent Issue","Needs Cleaning","For Replacement","For Disposal","Condemned","Needs Repair","No Signal","Needs Configuration","Under Maintenance","To Be Diagnosed"],equipment:["Working","Not Working","Intermittent Issue","Needs Cleaning","For Replacement","For Disposal","Condemned","Minor Damage","Needs Repair","Intermittent Connectivity","No Signal","Needs Configuration","Expired","Needs Refill","Rusting","To Be Diagnosed"]};return e.jsxs(de,{children:[e.jsx(ve,{}),e.jsxs(pe,{children:[e.jsx("header",{className:"sticky top-0 z-20 bg-white border-b px-6 py-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(he,{}),e.jsx(me,{orientation:"vertical",className:"h-6 mx-3"}),e.jsx(ge,{children:e.jsx(fe,{children:e.jsxs(Ne,{children:[e.jsx(K,{href:"#","aria-current":"page",children:"Reports"}),e.jsx(ye,{}),e.jsx(K,{href:"/admin/faculty/reports","aria-current":"page",className:"font-semibold text-foreground",children:"Faculty Reports"})]})})}),e.jsx("div",{className:"flex-1"}),e.jsx(xe,{})]})}),e.jsx("main",{children:e.jsxs("div",{className:"p-6",children:[e.jsx("h1",{className:"text-2xl font-bold mb-5",children:"Faculty Reports"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 mb-4",children:[e.jsx(Q,{placeholder:"Search reports...",value:p,onChange:t=>f(t.target.value),onKeyDown:le,className:`flex-1 min-w-0 sm:max-w-xs w-full
             border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
             focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
             placeholder:text-[hsl(142,34%,40%)]`}),e.jsx(ke,{filters:g,filterOptions:P,onApplyFilters:M,onResetFilters:se}),e.jsxs(j,{className:"flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]",onClick:ae,children:[e.jsx(Se,{className:"h-4 w-4"}),"Print"]})]}),e.jsx(ie,{children:e.jsxs(ce,{className:"p-0",children:[e.jsxs(ue,{children:[e.jsx(be,{children:e.jsxs(V,{className:"bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]",children:[e.jsx(x,{children:"#"}),e.jsx(x,{children:"Faculty"}),e.jsx(x,{children:"Room"}),e.jsx(x,{children:"Type"}),e.jsx(x,{children:"Code"}),e.jsx(x,{children:"Condition"}),e.jsx(x,{children:"Remarks"}),e.jsx(x,{children:"Photo"}),e.jsx(x,{children:"Date Reported"}),e.jsx(x,{children:"Actions"})]})}),e.jsx(je,{children:U.length>0?U.map((t,o)=>e.jsxs(V,{children:[e.jsx(c,{children:(m-1)*v+o+1}),e.jsx(c,{children:t.user?.name||"N/A"}),e.jsxs(c,{children:["ROOM"," ",t.room?t.room.room_number:"N/A"]}),e.jsx(c,{children:t.reportable_type==="peripheral"?t.reportable?.type:t.reportable_type==="system_unit"?"System Unit":t.reportable_type==="equipment"&&(t.reportable?.type||t.reportable?.equipment_type)||"N/A"}),e.jsx(c,{children:t.reportable_type==="peripheral"?t.reportable?.peripheral_code:t.reportable_type==="system_unit"?t.reportable?.unit_code:t.reportable_type==="equipment"?t.reportable?.equipment_code:"N/A"}),e.jsx(c,{children:t.condition}),e.jsx(c,{children:t.remarks}),e.jsx(c,{children:t.photo_url?e.jsx("img",{src:t.photo_url,alt:"Report",className:"w-16 h-16 object-cover rounded cursor-pointer hover:shadow-lg",onClick:()=>l(t.photo_url)}):"No photo"}),e.jsx(c,{children:new Date(t.created_at).toLocaleDateString()}),e.jsx(c,{children:e.jsx("div",{className:"flex gap-2",children:t.resolved?e.jsxs("span",{className:"text-sm font-medium text-green-600 flex items-center gap-1",children:[e.jsx(X,{className:"w-4 h-4"}),"Resolved"]}):e.jsxs(j,{size:"sm",variant:"secondary",className:"flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]",onClick:()=>ee(t),children:[e.jsx(X,{className:"w-4 h-4"}),"Resolve"]})})})]},t.id)):e.jsx(V,{children:e.jsx(c,{colSpan:"11",className:"text-center",children:"No reports found."})})})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center mt-4 p-2 gap-2",children:[e.jsxs("span",{className:"text-sm text-muted-foreground",children:["Showing"," ",d.length===0?0:(m-1)*v+1," ","–",Math.min(m*v,d.length)," ","of ",d.length," reports"]}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx(j,{variant:"outline",size:"sm",disabled:m===1,onClick:()=>E(m-1),children:"Previous"}),[...Array(z)].map((t,o)=>e.jsx(j,{variant:m===o+1?"default":"outline",size:"sm",onClick:()=>E(o+1),children:o+1},o)),e.jsx(j,{variant:"outline",size:"sm",disabled:m===z,onClick:()=>E(m+1),children:"Next"})]})]})]})})]})}),e.jsx(W,{open:w,onOpenChange:k,children:e.jsxs(H,{className:"flex flex-col items-center",children:[e.jsx(Y,{children:e.jsx(G,{children:"Report Photo"})}),i&&e.jsx("img",{src:i,alt:"Report",className:"max-w-full max-h-[80vh] object-contain rounded"})]})}),e.jsx(W,{open:h,onOpenChange:N,children:e.jsxs(H,{className:"max-w-md w-full rounded-2xl border border-[hsl(142,34%,85%)] shadow-xl bg-white/90 backdrop-blur-lg",children:[e.jsxs(Y,{className:"pb-2",children:[e.jsxs(G,{className:"text-[hsl(142,34%,25%)] text-xl font-semibold",children:["Resolve Report #",a?.id]}),e.jsxs("div",{className:"text-sm text-[hsl(142,34%,30%)] mt-1 flex flex-col gap-0.5",children:[e.jsxs("span",{children:[a?.reportable_type==="system_unit"&&e.jsxs(e.Fragment,{children:["Unit Code:"," ",e.jsx("span",{className:"font-medium text-[hsl(142,34%,45%)]",children:a?.reportable?.unit_code||"N/A"})]}),a?.reportable_type==="equipment"&&e.jsxs(e.Fragment,{children:["Equipment Code:"," ",e.jsx("span",{className:"font-medium text-[hsl(142,34%,45%)]",children:a?.reportable?.equipment_code||"N/A"})]}),a?.reportable_type==="peripheral"&&e.jsxs(e.Fragment,{children:["Peripheral Code:"," ",e.jsx("span",{className:"font-medium text-[hsl(142,34%,45%)]",children:a?.reportable?.peripheral_code||"N/A"})]})]}),e.jsxs("span",{children:["Type:"," ",e.jsx("span",{className:"font-medium text-[hsl(142,34%,45%)]",children:a?.reportable_type==="system_unit"?"System Unit":a?.reportable_type==="equipment"?a?.reportable?.equipment_type||"Equipment":a?.reportable_type==="peripheral"?a?.reportable?.type||"Peripheral":"N/A"})]}),a?.room&&e.jsxs("span",{children:["Room:"," ",e.jsx("span",{className:"font-medium text-[hsl(142,34%,45%)]",children:a.room.room_number})]})]})]}),e.jsxs("div",{className:"flex flex-col gap-5 mt-3",children:[a?.remarks&&e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(B,{className:"text-gray-700 font-medium",children:"Remarks"}),e.jsx("div",{className:"border border-[hsl(142,34%,80%)] rounded-lg p-3 text-sm bg-[hsl(142,34%,96%)]",children:a.remarks})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(B,{className:"text-gray-700 font-medium",children:"Set Condition"}),e.jsxs(C,{value:A||a?.condition,onValueChange:D,children:[e.jsx(_,{className:"rounded-lg border-[hsl(142,34%,75%)] focus:ring-[hsl(142,34%,45%)]",children:e.jsx(R,{placeholder:"Select Condition"})}),e.jsx(S,{children:(()=>{const t=a?.reportable_type;return(re[t]||[]).map(s=>e.jsx(u,{value:s,className:"cursor-pointer",children:s},s))})()})]})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx(B,{className:"text-gray-700 font-medium",children:"Resolution Details"}),e.jsx(Q,{type:"text",placeholder:"Describe how you fixed it...",value:L,onChange:t=>T(t.target.value),className:"rounded-lg border-[hsl(142,34%,75%)] focus:ring-[hsl(142,34%,45%)]"})]}),e.jsxs("div",{className:"flex justify-end gap-3 pt-2",children:[e.jsx(j,{variant:"outline",onClick:()=>N(!1),disabled:I,className:"rounded-lg border-[hsl(142,34%,60%)] text-[hsl(142,34%,30%)] hover:bg-[hsl(142,34%,90%)]",children:"Cancel"}),e.jsx(j,{onClick:()=>te(a),disabled:I,className:"rounded-lg bg-[hsl(142,34%,45%)] text-white hover:bg-[hsl(142,34%,40%)]",children:I?"Saving...":"Save"})]})]})]})})]})]})}export{ht as default};
