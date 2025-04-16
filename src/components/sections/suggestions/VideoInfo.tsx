"use client"
import VideoMenu from "@/components/menus/videos/VideoMenu";
import UserAvatar from "@/components/shared/UserAvatar";
import UserInfo from "@/components/shared/UserInfo";
import { useGetMany } from "@/hooks/useGetMany";
import { SuggestionsGetManyOutput } from "@/types"

import Link from "next/link";

interface VideoInfoProps {
    data: SuggestionsGetManyOutput['items'][number];
    onRemove?:()=>void;
}
const VideoInfo = ({ data, onRemove }: VideoInfoProps) => {

   const { compactDate, compactViews } = useGetMany(data);
        
  return (
    <div className="flex gap-3">
      <Link href={`/users/${data.user.id}`}>
        <UserAvatar imageUrl={data.user.imageUrl} name={data.user.name} />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/videos/${data.id}`}>
          <h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-base break-words">
            {data.title}
          </h3>
        </Link>
        <Link href={`/users/${data.user.id}`}>
          <UserInfo name={data.user.name} />
        </Link>
        <Link href={`/videos/${data.id}`}>
          <p className="text-sm text-gray-600 line-clamp-1">
            {compactViews} Views &bull; {compactDate}
          </p>
        </Link>
      </div>
      <div className="flex-shrink-0">
        <VideoMenu videoId={data.id} onRemove={onRemove} />
      </div>
    </div>
  );
};
export default VideoInfo