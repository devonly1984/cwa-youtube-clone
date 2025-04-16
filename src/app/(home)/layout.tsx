import { HomeLayout } from "@/components/layouts/home/HomeLayout";
import { LayoutProps } from "@/types";
export const dynamic = "force-dynamic";
const Layout = ({ children }: LayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};
export default Layout;
