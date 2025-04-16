import StudioView from "@/components/views/studio/StudioView";
import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server"
export const dynamic = "force-dynamic";
const StudioPage = async () => {
  void trpc.studio.getMany.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};
export default StudioPage