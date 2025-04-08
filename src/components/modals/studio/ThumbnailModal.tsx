"use client";
import ResponsiveModal from "@/components/modals/studio/ResponsiveModal";
import { UploadDropzone } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";
interface ThumbnailModalProps {
    videoId:string;
    open:boolean;
    onOpenChange:(open:boolean)=>void;
}
const ThumbnailModal = ({
  videoId,
  open,
  onOpenChange,
}: ThumbnailModalProps) => {
const utils = trpc.useUtils();
const onUploadComplete = ()=>{

  utils.studio.getOne.invalidate({ id: videoId });
  utils.studio.getMany.invalidate();
  onOpenChange(false);
}
  return (
    <ResponsiveModal
      title="Upload Thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <UploadDropzone
        endpoint={"thumbnailUploader"}
        input={{ videoId }}
        onClientUploadComplete={onUploadComplete}
      />
    </ResponsiveModal>
  );
};
export default ThumbnailModal;
