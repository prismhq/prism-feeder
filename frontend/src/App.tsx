import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "./components/AppSidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-base bg-background/50 border-2 border-border" />
            <div className="aspect-video rounded-base bg-background/50 border-2 border-border" />
            <div className="aspect-video rounded-base bg-background/50 border-2 border-border" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-base bg-background/50 border-2 border-border md:min-h-min">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
