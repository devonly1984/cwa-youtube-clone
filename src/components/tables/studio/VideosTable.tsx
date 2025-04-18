import VideoThumbnail from "@/components/inputs/VideoThumbnail";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { snakeCaseToTitle } from "@/lib/utils";

import { format } from "date-fns";
import { Globe2Icon, LockIcon } from "lucide-react";

import Link from "next/link";

const VideosTable = ({ videos }) => {
  return (
    <div className="border-y">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6 w-[510px]">Video</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Comments</TableHead>
            <TableHead className="text-right pr-6">Like</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.pages
            .flatMap((page) => page.items)
            .map((video) => (
              <Link
                href={`/studio/videos/${video.id}`}
                key={video.id}
                legacyBehavior
              >
                <TableRow className="cursor-pointer">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-4 ">
                      <div className="relative aspect-video w-36 shrink-0">
                        <VideoThumbnail
                          imageUrl={video.thumbnailUrl}
                          previewUrl={video.previewUrl}
                          title={video.title}
                          duration={video.duration || 0}
                        />
                      </div>
                      <div className="flex flex-col overflow-hidden gap-y-1">
                        <span className="text-sm line-clamp-1">
                          {video.title}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {video.description || "No Description"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {video.visibility ? (
                        <LockIcon className="size-4 mr-2" />
                      ) : (
                        <Globe2Icon className="size-4 mr-2" />
                      )}
                      {snakeCaseToTitle(video.visibility)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {snakeCaseToTitle(video.muxStatus) || "Error"}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm truncate">
                    {format(new Date(video.createdAt), "d MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-right text-sm">Views</TableCell>
                  <TableCell className="text-right text-sm">Comments</TableCell>
                  <TableCell className="text-right text-sm pr-6">
                    Likes
                  </TableCell>
                </TableRow>
              </Link>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default VideosTable;
