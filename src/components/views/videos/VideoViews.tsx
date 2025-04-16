import {CommentSection,SuggestionsSection} from '@/components/subsections/videos'
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
          <div className="xl:hidden block mt-4">
            <SuggestionsSection videoId={videoId} isManual/>
          </div>
          <CommentSection videoId={videoId} />
        </div>
        <div className="hidden xl:block w-full xl:w-[380px] 2xl:w-[460px] shrink-1">
          <SuggestionsSection videoId={videoId} />
        </div>
      </div>
    </div>
  );
};
export default VideoViews