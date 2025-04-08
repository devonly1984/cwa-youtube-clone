import { snakeCaseToTitle } from "@/lib/utils";
interface VideoFooterProps {
    muxStatus: string|null;
    trackStatus: string|null;
}
const VideoFooter = ({ muxStatus,trackStatus }: VideoFooterProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <p className="text-muted-foreground">Video Status</p>
          <p className="text-sm">
            {snakeCaseToTitle(muxStatus || "preparing")}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <p className="text-muted-foreground">Subtitles Status</p>
          <p className="text-sm">
            {snakeCaseToTitle(trackStatus || "no_subtitles")}
          </p>
        </div>
      </div>
    </>
  );
};
export default VideoFooter