import { HomeNavbar } from "@/components/navbars/home/HomeNavbar";
import HomeSidebar from "@/components/sidebars/home/HomeSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutProps } from "@/types";



export const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
