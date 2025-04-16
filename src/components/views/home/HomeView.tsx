import {CategoriesSection} from "@/components/sections/home";
import HomeVideosSection from "@/components/sections/home/HomeVideosSection";


interface HomeViewProps {
  categoryId?: string;
}
const HomeView = ({ categoryId }: HomeViewProps) => {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <CategoriesSection categoryId={categoryId} />
      <HomeVideosSection categoryId={categoryId}/>
    </div>
  );
};
export default HomeView;
