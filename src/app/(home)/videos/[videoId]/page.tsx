import VideoView from "@/components/views/studio/videos/VideoView";
import { HydrateClient, trpc } from "@/trpc/server";
interface SingleVideoPageProps {
    params: Promise<{videoId:string}>
}
const SingleVideoPage = async({params}:SingleVideoPageProps) => {
    const {videoId} = await params;
    void trpc.studio.getOne.prefetch({ id: videoId });
  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
};
export default SingleVideoPage;
