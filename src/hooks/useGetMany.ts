import { formatDistanceToNow } from "date-fns";
import { useMemo } from "react";

interface useGetManyProps {

        viewCount:number;
        createdAt:Date;

    
}
export const useGetMany = ({viewCount,createdAt}:useGetManyProps)=>{
   
    const compactViews = useMemo(() => {
          return Intl.NumberFormat("en", {
            notation: "compact",
          }).format(viewCount);
        }, [viewCount]);
            const compactDate = useMemo(() => {
              return formatDistanceToNow(createdAt, { addSuffix: true });
            }, [createdAt]);
            return {compactViews,compactDate}
}