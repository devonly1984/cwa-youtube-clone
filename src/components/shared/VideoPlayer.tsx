"use client"
import { FALLBACK_IMG } from '@/constants';
import MuxPlayer from '@mux/mux-player-react'
interface VideoPlayerProps {
  playbackId?: string | null | undefined;
  thumbnailUrl?: string | null | undefined;
  autoPlay?: boolean;
  onPlay?: () => void;
}
const VideoPlayer = ({
  playbackId,
  thumbnailUrl,
  autoPlay,
  onPlay,
}: VideoPlayerProps) => {
    console.log(playbackId)
    if (!playbackId) {
        return null;
    }

  return (
    <MuxPlayer
      playbackId={playbackId}
      poster={thumbnailUrl || FALLBACK_IMG}
      playerInitTime={0}
      autoPlay={autoPlay}
      thumbnailTime={0}
      className="w-full h-full object-contain"
      accentColor="#FF2056"
      onPlay={onPlay}
    />
  );
};
export default VideoPlayer