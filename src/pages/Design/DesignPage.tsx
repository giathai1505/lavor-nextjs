import PartHeader from "@/components/Common/PartHeader";
import titleBackgroundImage from "@/assets/images/headerPart/7.webp";
import DesignStaticPart2 from "./StaticContent/DesignStaticPart2";
import DesignStaticPart3 from "./StaticContent/DesignStaticPart3";
import DesignPart from "./DesignPart";
import { IYear } from "@/types/type";

interface IPageProps {
  years: IYear[];
}

const DesignPage: React.FC<IPageProps> = ({ years }) => {
  return (
    <div className="design-wrapper">
      <PartHeader
        breadcrumb="Chọn thiết kế"
        title="NỘI THẤT THIẾT KẾ RIÊNG CỦA BẠN"
        backgroundImage={titleBackgroundImage}
      />
      <DesignPart years={years} />
      <DesignStaticPart2 />
      <DesignStaticPart3 />
    </div>
  );
};

export default DesignPage;
