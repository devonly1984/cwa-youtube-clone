import { format, formatDistanceToNow } from "date-fns";
import { useMemo } from "react";

interface useGetOneProps {
    viewCounts:number;
    createdAt:Date;
    
}
export const useGetOne = ({viewCounts,createdAt}:useGetOneProps)=>{
     const compactViews = useMemo(()=>{
        return Intl.NumberFormat('en',{
          notation:'compact'
        }).format(viewCounts)
      },[viewCounts])
      const expandedViews = useMemo(()=>{
        return Intl.NumberFormat('en',{
          notation:"standard"
        }).format(viewCounts)
      },[viewCounts])
        const compactDate = useMemo(()=>{
          return formatDistanceToNow(createdAt,{addSuffix:true})
        },[createdAt])
        const expandedDate = useMemo(()=>{
          return format(createdAt, "d MMM yyyy");
        },[createdAt])
      return { expandedViews, compactViews, compactDate, expandedDate };
}