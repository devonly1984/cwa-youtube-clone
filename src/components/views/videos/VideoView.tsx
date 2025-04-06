"use client"

import VideoForm from "@/components/forms/studio/VideoForm";

interface VideoViewProps {
    videoId:string;
}
const VideoView = ({videoId}:VideoViewProps) => {
  return (
    <div className="px-4 pt-2.5 max-w-screen-lg">
      <VideoForm videoId={videoId} />
    </div>
  );
};
export default VideoView