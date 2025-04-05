import CategoriesSection from "@/components/sections/home/CategoriesSection";
import VideosSection from "@/components/sections/home/VideosSection";

interface HomeViewProps {
    categoryId?:string;
}
const HomeView = ({ categoryId }: HomeViewProps) => {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <CategoriesSection categoryId={categoryId} />
      <VideosSection />
    </div>
  );
};
export default HomeView