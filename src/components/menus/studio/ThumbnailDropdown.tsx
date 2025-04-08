"use client";
import ThumbnailModal from "@/components/modals/studio/ThumbnailModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { ImagePlusIcon, MoreVerticalIcon, RotateCcw, SparklesIcon } from "lucide-react";
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
          <DropdownMenuItem>
            <SparklesIcon className="size-4 mr-1" />
            Ai Generated
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RotateCcw className="size-4 mr-1" />
            Restore
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default ThumbnailDropdown;
