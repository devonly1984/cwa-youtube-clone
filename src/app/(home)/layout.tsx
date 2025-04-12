import { HomeLayout } from "@/components/layouts/home/HomeLayout";
import { LayoutProps } from "@/types";

const Layout = ({ children }: LayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};
export default Layout;
