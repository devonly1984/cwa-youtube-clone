"use client"

import { useGetOne } from "@/hooks/useGetOne";
import { cn } from "@/lib/utils";
import { VideoGetOneOutput } from "@/types";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

interface VideoDescriptionProps {
    video: VideoGetOneOutput
}
const VideoDescription = ({ video }: VideoDescriptionProps) => {
  const { expandedViews, compactViews, expandedDate, compactDate } =
    useGetOne(video);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      onClick={() => setIsExpanded((current) => !current)}
      className="bg-secondary/50 rounded-xl p-3 cursor-pointer hover:bg-secondary/70 transition"
    >
      <div className="flex gap-2 text-sm mb-2">
        <span className="font-medium">
          {isExpanded ? expandedViews : compactViews} views
        </span>
        <span className="font-medium">
          {isExpanded ? expandedDate : compactDate}
        </span>
      </div>
      <div className="relative">
        <p
          className={cn(
            "text-sm whitespace-pre-wrap ",
            !isExpanded && "line-clamp-2"
          )}
        >
          {video.description || "No Description"}
        </p>
      </div>
      <div className="flex items-center gap-1 mt-4 text-sm font-medium">
        {isExpanded ? (
          <>
            Show Less <ChevronUpIcon className="size-4" />
          </>
        ) : (
          <>
            Show more <ChevronDownIcon className="size-4" />
          </>
        )}
      </div>
    </div>
  );
};
export default VideoDescription
