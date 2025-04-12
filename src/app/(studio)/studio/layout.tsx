import StudioLayout from "@/components/layouts/studio/StudioLayout"
import { LayoutProps } from "@/types";


const Layout = ({ children }: LayoutProps) => {
  return <StudioLayout>{children}</StudioLayout>;
};
export default Layout