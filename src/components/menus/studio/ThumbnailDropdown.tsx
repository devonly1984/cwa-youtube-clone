"use client";
import ThumbnailModal from "@/components/modals/studio/ThumbnailModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";

import { ImagePlusIcon, MoreVerticalIcon, RotateCcw, SparklesIcon } from "lucide-react";
import { toast } from "sonner";
interface ThumbnailDropdownProps {
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    videoId:string;
}
const ThumbnailDropdown = ({
  open,
  onOpenChange,
  videoId,
}: ThumbnailDropdownProps) => {
  const utils = trpc.useUtils();
  const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
    onSuccess:()=>{
    
      toast.success("Background Job started", {
        description: "This make some time",
      });
    },
    onError:()=>{
      toast.error("Something went wrong");
    }
  })
  const restoreThumbnail = trpc.videos.restoreThumbnail.useMutation({
    onSuccess:()=>{
      utils.studio.getMany.invalidate();
      utils.studio.getOne.invalidate({ id: videoId });
      toast.success("Thumbnail Restored ");
    },
    onError:()=>{
      toast.error("Something went wrong");
    }
  })
  
  return (
    <>
      <ThumbnailModal
        open={open}
        onOpenChange={onOpenChange}
        videoId={videoId}
      />
      ;
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            className="bg-black/50 hover:bg-black/50 absolute top-1 right-1 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 duration-300 size-7"
          >
            <MoreVerticalIcon className="text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right">
          <DropdownMenuItem onClick={() => onOpenChange(true)}>
            <ImagePlusIcon className="size-4 mr-1" />
            Change
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => generateThumbnail.mutate({ id: videoId })}
          >
            <SparklesIcon className="size-4 mr-1" />
            Ai Generated
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => restoreThumbnail.mutate({ id: videoId })}
          >
            <RotateCcw className="size-4 mr-1" />
            Restore
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default ThumbnailDropdown;
