import VideosSection from "@/components/sections/videos/Video_VideosSection";


interface VideoViewsProps {
    videoId:string
}

const VideoViews = ({ videoId }: VideoViewsProps) => {
   
  return (
    <div className="flex flex-col max-w-[1700px] mx-auto pt-2.5 px-4 mb-10">
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <VideosSection videoId={videoId} />
        </div>
      </div>
    </div>
  );
};
export default VideoViews