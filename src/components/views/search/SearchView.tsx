import CategoriesSection from "@/components/sections/search/CategoriesSection";
import ResultsSection from "@/components/sections/search/ResultsSection";

interface SearchViewProps {
  query: string | undefined;
  categoryId: string | undefined;
}
const SearchView = ({ query, categoryId }: SearchViewProps) => {
  return (
    <div className="max-w-[1300px] mx-auto mb-10 flex flex-col gap-y-6 px-4 pt-2.5">
      <CategoriesSection categoryId={categoryId} />
      <ResultsSection query={query} categoryId={categoryId} />
    </div>
  );
};
export default SearchView;
