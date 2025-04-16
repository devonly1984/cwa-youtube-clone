"use client";

import FilterCarousel from "@/components/shared/FilterCarousel";
import {CategoriesSkeleton} from "@/components/shared/skeletons";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
interface CategorySectionProps {
    categoryId?:string;
}
const CategoriesSection = ({categoryId}:CategorySectionProps) => {

  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};
const CategoriesSectionSuspense = ({ categoryId }: CategorySectionProps) => {
  const router = useRouter()
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const data = categories.map(({ name, id }) => ({
    value: id,
    label: name,
  }));
  const onSelect = (value:string|null)=>{
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }
    router.push(url.toString());
  }
  return (
    <FilterCarousel
      onSelect={onSelect}
      isLoading={false}
      data={data}
      value={categoryId}
    />
  );
};
export default CategoriesSection;
