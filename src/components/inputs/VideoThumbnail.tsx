import { FALLBACK_IMG } from "@/constants";
import { formatDuration } from "@/lib/utils";
import Image from "next/image";
interface VideoThumbnailProps {
  imageUrl?: string | null;
  title:string;
  previewUrl?:string|null;
  duration:number;
}
const VideoThumbnail = ({
  imageUrl,
  title,
  previewUrl,
  duration,
}: VideoThumbnailProps) => {
  return (
    <div className="relative group">
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          src={imageUrl ?? FALLBACK_IMG}
          alt={title}
          fill
          className="size-full object-cover group-hover:opacity-0"
        />
        <Image
          src={previewUrl ?? FALLBACK_IMG}
          alt={title}
          fill
          className="size-full object-cover group-hover:opacity-100 opacity-0"
          unoptimized={!!previewUrl}
        />
      </div>

      {/**Duration Box */}
      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
        {formatDuration(duration)}
      </div>
    </div>
  );
};
export default VideoThumbnail