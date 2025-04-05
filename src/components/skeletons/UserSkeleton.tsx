import { SidebarHeader } from "../ui/sidebar"
import { Skeleton } from "../ui/skeleton"

const UserSkeleton = () => {
  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Skeleton className="size-[112px] rounded-full" />
      <div className="flex flex-col items-center mt-2 gap-y-2">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </SidebarHeader>
  );
}
export default UserSkeleton