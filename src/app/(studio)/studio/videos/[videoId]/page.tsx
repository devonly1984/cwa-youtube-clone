import VideoView from "@/components/views/studio/videos/VideoView";
import { HydrateClient, trpc } from "@/trpc/server";
export const dynamic = 'force-dynamic'

interface SingleVideoProps {
  params: Promise<{ videoId: string }>;
}
const SingleVideoPage = async ({ params }: SingleVideoProps) => {
  const { videoId } = await params;
  void trpc.studio.getOne.prefetch({ id: videoId });
  void trpc.categories.getMany.prefetch();
  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
};
export default SingleVideoPage;
