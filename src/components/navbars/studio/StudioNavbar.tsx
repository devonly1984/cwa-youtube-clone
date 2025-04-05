import AuthButton from "@/components/inputs/AuthButton";
import UploadModal from "@/components/modals/studio/UploadModal";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { LOGO_IMG } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export const StudioNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center px-2 pr-5 z-50 h-16 bg-white border-b shadow-sm">
      <div className="flex items-center gap-4 w-full">
        {/**Menu and Logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href="/studio">
            <div className="p-4 flex items-center gap-1">
              <Image src={LOGO_IMG} alt="Logo" width={32} height={32} />
              <p className="text-xl font-semibold tracking-tight">Studio</p>
            </div>
          </Link>
        </div>

        <div className="flex-1" />
        <div className="flex-shrink-0 items-center flex gap-4">
          <UploadModal />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
