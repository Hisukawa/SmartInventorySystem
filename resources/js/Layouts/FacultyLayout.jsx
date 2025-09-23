import { Separator } from "@/components/ui/separator";
import { FacultyAppSidebar } from "@/Components/FacultyComponents/faculty-app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function FacultyLayout({ children }) {
  return (
    <SidebarProvider>
      <FacultyAppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6 mx-3" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/faculty/dashboard"
                  aria-current="page"
                  className="font-semibold text-foreground"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main content */}
        <main className="w-full px-6 py-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
