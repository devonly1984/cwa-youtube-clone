import { ReactNode } from "react";
import { HomeLayout } from "@/components/layouts/home/HomeLayout";
interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};
export default Layout;
