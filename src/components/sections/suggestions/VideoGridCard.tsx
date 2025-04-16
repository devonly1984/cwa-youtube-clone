import VideoThumbnail from "@/components/inputs/VideoThumbnail";
import { SuggestionsGetManyOutput } from "@/types"
import Link from "next/link";
import VideoInfo from "./VideoInfo";
interface VideoGridCardProps {
    data: SuggestionsGetManyOutput["items"][number];
    onRemove?:()=>void;
}
const VideoGridCard = ({ data, onRemove }: VideoGridCardProps) => {
    
  return (
    <div className="flex flex-col gap-2 w-full group">
      <Link href={`/videos/${data.id}`} className="">
        <VideoThumbnail
          imageUrl={data.thumbnailUrl}
          previewUrl={data.previewUrl}
          title={data.title}
          duration={data.duration}
        />
      </Link>
      <VideoInfo data={data} onRemove={onRemove} />
    </div>
  );
};
export default VideoGridCard