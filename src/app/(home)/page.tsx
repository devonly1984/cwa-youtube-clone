import { LOGO_IMG } from "@/constants";
import Image from "next/image";

const HomePage = () => {
  return (
    <div>
      <Image src={LOGO_IMG} height={50} width={50} alt="Logo" />
      <p className="text-xl font-medium tracking-tight">NewTube</p>
    </div>
  );
};
export default HomePage;
