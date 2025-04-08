"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface StudioDropDownProps {
  videoId: string;
}
const StudioDropDown = ({videoId}:StudioDropDownProps) => {
  const utils = trpc.useUtils();
  const router = useRouter();
  const remove = trpc.videos.remove.useMutation(
  
    {
      onSuccess:()=>{
        toast.success("Video Deleted Successfully");
        utils.studio.getMany.invalidate()
        router.push("/studio");
      },
      onError:(error)=>{  
        toast.error(`Something went wrong ${error.message}`);
      }
    }
  )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size="icon">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => remove.mutate({ id: videoId })}>
          <TrashIcon className="size-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default StudioDropDown;
