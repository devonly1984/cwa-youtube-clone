import StudioLayout from "@/components/layouts/studio/StudioLayout"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
  return <StudioLayout>{children}</StudioLayout>;
};
export default Layout