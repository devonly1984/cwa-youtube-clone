import { Control, } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Image from "next/image";
import ThumbnailDropdown from "@/components/menus/studio/ThumbnailDropdown";
import { useState } from "react";

interface ThumbnailUploaderProps {
  videoId:string;
   control:Control
    thumbnailUrl:string;
}
const ThumbnailUploader = ({videoId,control,thumbnailUrl}:ThumbnailUploaderProps) => {
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false)
  return (
    <FormField
      name="thumbnailUrl"
      control={control}
      render={() => (
        <FormItem>
          <FormLabel>Thumbnail</FormLabel>
          <FormControl>
            <div className="p-0.5 border border-dashed border-neutral-400 relative h-[84px] w-[153px] group">
              <Image
                src={thumbnailUrl}
                fill
                alt="Thumbnail"
                className="object-cover"
              />
              <ThumbnailDropdown
                open={isThumbnailModalOpen}
                onOpenChange={setIsThumbnailModalOpen}
                videoId={videoId}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
export default ThumbnailUploader