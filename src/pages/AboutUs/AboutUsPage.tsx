import AboutUsStaticContentPart1 from "./AboutUsStaticPart1";
import AboutUsStaticContentPart2 from "./AboutUsStaticPart2";
import AboutUsStaticContentPart3 from "./AboutUsStaticPart3";
import PartHeader from "@/components/Common/PartHeader";
import titleBackgroundImage from "@/assets/images/headerPart/2.webp";
import { TRating } from "@/types/type";
import dynamic from "next/dynamic";

const LazyRatingPart = dynamic(() => import("./RatingPart"), {
  loading: () => <p>Loading...</p>,
});

type TPageProps = {
  ratings: TRating[];
};

const AboutUs: React.FC<TPageProps> = ({ ratings }) => {
  return (
    <div className="min-h-[1000px]">
      <PartHeader
        breadcrumb="Về chúng tôi"
        title="VỀ CHÚNG TÔI"
        backgroundImage={titleBackgroundImage}
      />
      <AboutUsStaticContentPart1 />
      <AboutUsStaticContentPart2 />
      <AboutUsStaticContentPart3 />

      <div className="p-5 md:p-10 xl:p-16 bg-[#000000e8] ">
        <LazyRatingPart ratings={ratings} />
      </div>
      
    </div>
  );
};

export default AboutUs;
